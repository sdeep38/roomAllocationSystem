import axios from 'axios'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FormError from '../components/FormError'
import '../styles/Login.css'


export default function ResetPassword() {

  const [inputs, setInputs] = useState({
    password1: "",
    password2: "",
  })

  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const [resStatus, setResStatus] = useState(null)
  const [err, setError] = useState(null)

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {

    try {
      const res = await axios.post('/auth/resetPassword/', { password: inputs.password1, token: params.get('resetToken'), user: params.get('user'), role: params.get('role') });
      setResStatus(res.data.message);
    }
    catch (err) {
      setError(err.response.data.message)
    }
  }

  const validateForm = (e) => {
    e.preventDefault();
    setError(null)

    if (inputs.password1 === '' || inputs.password2 === '') {
      setError("All fields are required")
    }
    
    else if (inputs.password1 === inputs.password2) {
      handleSubmit()
    }
    else {
      setError("ERROR : New Passwords don't match")
    }
  }


  return (

    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-sm-12 offset-md-4">
          {resStatus && <FormError value={resStatus.message} status={resStatus.status === 'error' ? 'danger' : 'success'} dismissable={false}/>}
          {err && <FormError value={err} status='danger' dismissable={false}/>}

            <div className="form-section">

              <div className="form-top">
                {/* <div className="logo">
                  <img src="https://1000logos.net/wp-content/themes/redwaves-lite/pic/mercedes-logo-sm.png" alt="Logo">
                </div> */}
                <a href='/' className="brand">rk hall</a>
              </div>

              <div className="userform">
                
                {resStatus?.status === 'success' ?
                  <Link className="success-msg mt-3 text-info text-center" to={'/login'}>Get Back to Login Page</Link>
                  :
                  <form className="row g-3" id="reg-form" action='#' method='post'>

                  <div className="col-12">
                    <label htmlFor="inputPassword" className="form-label">New Password</label>
                    <input type="password" className="form-control login-box-input" id="inputPassword1" name='password1' onChange={handleChange} />

                  </div>
                  <div className="col-12">
                    <label htmlFor="inputPassword" className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control login-box-input" id="inputPassword2" name='password2' onChange={handleChange} />

                  </div>

                  <div className="col-12">
                    {/* <a href="#" className="reg-btn">New User</a> */}
                    <button type="submit" id="login-btn" className="btn" onClick={validateForm}>Submit</button>
                  </div>


                </form>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
