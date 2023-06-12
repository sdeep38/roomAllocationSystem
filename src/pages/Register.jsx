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

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/auth/register", inputs)
      console.log(res.data.message)
    }
    catch (err) {
      setError(err.response.data)
    }
  }

  const validateForm = async (e) => {
    e.preventDefault()

    //valid user type
    if (!inputs) {
      setError("All fields are mandatory")
    }
    else{
      console.log(inputs)
      handleSubmit()
    }
  }

  return (

    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-sm-12 offset-md-4">

            {Error && <div className={"alert " + (Error.status === 'error' ? 'alert-danger' : 'alert-success') + " d-flex align-items-center alert-dismissible fade show"} role="alert">
              <div>
                {Error.message}
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
                    <input type="text" className="form-control login-box-input" id='inputName' name='name' onChange={handleChange} />

                  </div>

                  <div className="col-12">
                    <label htmlFor="inputUsername" className="form-label">Email address</label>
                    <input type="email" className="form-control login-box-input" id="inputUsername" name='email' onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control login-box-input" id="inputPassword" name='password' aria-describedby="keyHelp" onChange={handleChange} />

                  </div>
                  <div className="col-lg-4">
                    <label htmlFor="inputRoll" className="form-label">Roll No.</label>
                    <input type="text" className="form-control login-box-input" id="inputRoll" name='roll' onChange={handleChange} />
                  </div>
                  

                  <div className="col-lg-8">
                    <label htmlFor="inputContact" className="form-label">Contact</label>
                    <input type="text" className="form-control login-box-input" id='inputContact' name='phone' onChange={handleChange} />
                  </div>

                  <div className="col-12">
                    {/* <a href="#" className="reg-btn">New User</a> */}
                    <button type="submit" id="login-btn" className="btn" onClick={validateForm}>Register</button>
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
