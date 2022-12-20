import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    roll: "",
    phone: "",
  });

  const [Error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/auth/register", inputs)
      console.log(res)
    }
    catch (err) {
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

    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-sm-12 offset-md-4">

            {Error && <div className="alert alert-danger d-flex align-items-center alert-dismissible fade show" role="alert">
              <div>
                {Error}
              </div>
              <span className="fa fa-xmark btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></span>
            </div>}

            <div className="form-section">
              <div className="form-top">
                {/* <div className="logo">
                    <img src="https://1000logos.net/wp-content/themes/redwaves-lite/pic/mercedes-logo-sm.png" alt="Logo">
                  </div> */}
                <a href='/' className="brand">rk hall</a>
              </div>

              <div className="userform">
                <form className="row g-3" id="reg-form" action='#' method='post'>
                  {/* <h3 className="h3 mb-2">User Login</h3> */}

                  <div className="col-12">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-input" id='inputName' name='name' onChange={handleChange} />

                  </div>

                  <div className="col-12">
                    <label htmlFor="inputUsername" className="form-label">Email address</label>
                    <input type="email" className="form-input" id="inputUsername" name='email' onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-input" id="inputPassword" name='password' aria-describedby="keyHelp" onChange={handleChange} />

                  </div>
                  <div className="col-lg-4">
                    <label htmlFor="inputRoll" className="form-label">Roll No.</label>
                    <input type="text" className="form-input" id="inputRoll" name='roll' onChange={handleChange} />
                  </div>
                  {/* <div className="col-lg-4">
                    <label htmlFor="inputPosition" className="form-label">Position</label>
                    <select className="form-select" name='position' id="inputPosition" onChange={handleChange}>
                      <option>Select Position</option>
                      {positionOptions.map((option, index) => {
                        return <option key={index} value={option.value}>{option.label}</option>
                      })}
                    </select>
                  </div> */}

                  <div className="col-lg-8">
                    <label htmlFor="inputContact" className="form-label">Contact</label>
                    <input type="text" className="form-input" id='inputContact' name='phone' onChange={handleChange} />
                  </div>


                  {/* <div className="col-12">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="user_type" id="inlineRadio1" value="admin" onChange={handleChange} />
                      <label className="form-check-label" htmlFor="inlineRadio1">Admin</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="user_type" id="inlineRadio2" value="student" onChange={handleChange} />
                      <label className="form-check-label" htmlFor="inlineRadio2">Student</label>
                    </div>
                  </div> */}

                  <div className="col-12">
                    {/* <a href="#" className="reg-btn">New User</a> */}
                    <button type="submit" id="login-btn" className="btn" onClick={handleSubmit}>Register</button>
                  </div>

                  <div id="keyHelp" className="form-text"><Link className="fpass to-login" to={'/login'}>
                    <span className="fa fa-key"></span> User Login</Link></div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
