import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import '../styles/Login.css'

export default function Login() {

  const [inputs, setInputs] = useState({
    roll: "",
    password: "",
    user_type: "",
  })


  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate('/dashboard')
    }
    catch (err) {
      if (err.response.status === 500) {
        setError("Server failed to respond")

      } else {
        setError(err.response.data)
      }
    }
  }



  return (

    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-sm-12 offset-md-4">
            {err && <div className="alert alert-danger d-flex align-items-center" role="alert">
              <div>
                {err}
              </div>
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
                    <label htmlFor="inputRoll" className="form-label">Username</label>
                    <input type="text" className="form-input" id="inputRoll" name='roll' onChange={handleChange} autoCapitalize='off' autoCorrect='off' autoComplete='username'/>
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-input" id="inputPassword" name='password' aria-describedby="keyHelp" onChange={handleChange} />

                  </div>

                  <div className="col-12">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="user_type" id="inlineRadio1" value="admin" onChange={handleChange} />
                      <label className="form-check-label" htmlFor="inlineRadio1">Admin</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="user_type" id="inlineRadio2" value="student" onChange={handleChange} />
                      <label className="form-check-label" htmlFor="inlineRadio2">Student</label>
                    </div>
                  </div>

                  <div className="col-12">
                    {/* <a href="#" className="reg-btn">New User</a> */}
                    <button type="submit" id="login-btn" className="btn" onClick={handleSubmit}>Login</button>
                  </div>

                  <div id="keyHelp" className="form-text"><Link className="fpass" to={'/'}>
                    <span className="fa fa-key"></span> Forgot Password</Link></div>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
