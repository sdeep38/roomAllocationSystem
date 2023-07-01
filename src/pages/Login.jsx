import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormError from '../components/FormError'
import SelectDropdown from '../components/SelectDropdown'
import { AuthContext } from '../context/authContext'
import '../styles/Login.css'


export default function Login() {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    user_type: "",
  })

  const { currentUser } = useContext(AuthContext)

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    try {
      await login(inputs)
      if (currentUser) navigate('/dashboard')
    }
    catch (err) {
      setError(err.response.data)
    }
  }

  const validateForm = (e) => {
    e.preventDefault()

    //valid user type
    if (!inputs.username || !inputs.password || !inputs.user_type) {
      setError({ message: "All fields are required", status: 'error' })
    }
    else {
      console.log(inputs);
      handleSubmit()
    }
  }

  const userRoleOptions = [
    {
      label: "Student",
      value: "student",
    },
    {
      label: "Admin",
      value: "admin",
    }
  ]



  return (

    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-sm-12 offset-md-4">
            {err && <FormError value={err.message} status='danger' />}

            <div className="form-section">

              <div className="form-top">
                {/* <div className="logo">
                  <img src="https://1000logos.net/wp-content/themes/redwaves-lite/pic/mercedes-logo-sm.png" alt="Logo">
                </div> */}
                <Link to={'/login'} className="brand">rk hall</Link>
              </div>

              <div className="userform">
                <form className="row g-3" id="reg-form" action='#' method='post'>
                  {/* <h3 className="h3 mb-2">User Login</h3> */}
                  <div className="col-12">
                    <label htmlFor="inputUsername" className="form-label">Email address</label>
                    <input type="email" className="form-control login-box-input" id="inputUsername" name='username' onChange={handleChange} autoCapitalize='off' autoCorrect='off' autoComplete='off' autoFocus />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control login-box-input" id="inputPassword" name='password' aria-describedby="keyHelp" onChange={handleChange} />

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



                  <div className="col-lg-4">
                    <SelectDropdown placeHolder="Login As" name='user_type' Options={userRoleOptions} isMulti={false} isSearchable={false} onChange={(value) => setInputs(prev => ({ ...prev, user_type: value }))} />

                  </div>
                  <div className="col-lg-8">
                    {/* <a href="#" className="reg-btn">New User</a> */}
                    <button type="submit" id="login-btn" className="btn" onClick={validateForm}>Login</button>
                  </div>

                </form>
                <div id="keyHelp" className="form-text"><Link className="fpass" to={'/fpass'}>
                  <span className="fa fa-key"></span> Forgot Password</Link></div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
