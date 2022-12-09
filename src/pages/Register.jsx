import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const[inputs, setInputs] = useState({
        name: "",
        phone: "",
        position: "",
        password: "",
        email: "",
    });
    
    const[Error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post("/auth/register", inputs)
            console.log(res)
            navigate("/login");
        }
        catch(err){
            setError(err.response.data)
        }
    }

    const positionOptions = [
        {
          label: "General Secretary",
          value: "gSec",
        },
        {
          label: "Hall President",
          value: "hallPresident",
        },
        {
          label: "Warden",
          value: "Warden",
        },
      ]

    return (
        <div className='auth'>
            <h1>Register</h1>
            <form action="#">
                <input type="text" placeholder='Name' name='name' onChange={handleChange} />
                <input type="text" placeholder='Contact' name='phone' onChange={handleChange} />
                <select className="form-select" name='position' id="inlineFormSelectPref" onChange={handleChange}>
                        <option>Select Position</option>
                        {positionOptions.map((option, index) => {
                          return <option key={index} value = {option.value}>{option.label}</option>
                        })}
                      </select>
                <input type="password" placeholder='Password' name='password' onChange={handleChange} />
                <input type="email" placeholder='Email' name='email' onChange={handleChange} />
                <button onClick={handleSubmit}>Register</button>
            </form>
            {Error && <p style={{color: "red"}}>{Error}</p>}
        </div>
    )
}
