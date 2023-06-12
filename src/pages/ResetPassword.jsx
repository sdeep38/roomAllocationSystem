import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import FormError from '../components/FormError'
import SelectDropdown from '../components/SelectDropdown'
import { AuthContext } from '../context/authContext'
import '../styles/Login.css'


export default function Login() {

  const [inputs, setInputs] = useState({
    password1: "",
    password2: "",
    user_type: "",
  })

  const location = useLocation()
  const params = new URLSearchParams(location.search)

//   console.log("token : ", params.get('token'))

  const [err, setError] = useState(null)
  const [resStatus, setResStatus] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(inputs)
  }

  const handleSubmit = async () => {

    try {
        const res = await axios.post(`/auth/resetPassword/`, {password: inputs.password1, token: params.get('token'), id: params.get('id')})
        alert(res.data)
        navigate('/login')
    }
    catch (err) {
      if (err.response.status === 500) {
        setError("Server failed to respond")

      } else {
        setError(err.response.data)
      }
    }
  }

  const validateForm = (e) => {
    e.preventDefault()
    if (inputs.password1 === inputs.password2) {
        handleSubmit()
    }
    else{
        setError("ERROR : Passwords don't match")
    }
  }
  

  return (

    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-sm-12 offset-md-4">
            {err && <FormError value={err} status='danger' />}

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
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-input" id="inputPassword1" name='password1' aria-describedby="keyHelp" onChange={handleChange} />

                  </div>
                  <div className="col-12">
                    <label htmlFor="inputPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-input" id="inputPassword2" name='password2' aria-describedby="keyHelp" onChange={handleChange} />

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
                    <button type="submit" id="login-btn" className="btn" onClick={validateForm}>Submit</button>
                  </div>

                  
                </form>

                {resStatus && 
                    <p className="password-reset-link mt-3 text-info">{resStatus}</p>
                }
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
