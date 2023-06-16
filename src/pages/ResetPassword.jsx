import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import FormError from '../components/FormError'
import { AuthContext } from '../context/authContext'
import '../styles/Login.css'


export default function ResetPassword() {

  const [inputs, setInputs] = useState({
    password1: "",
    password2: "",
  })

  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const [resStatus, setResStatus] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {

    try {
      const res = await axios.post('/auth/resetPassword/', { password: inputs.password1, token: params.get('resetToken'), user: params.get('user'), role: params.get('role') });
      (res.data?.status === 'success') ? navigate('/login?') : setResStatus(res.data)
    }
    catch (err) {
      setResStatus(err.response.data)
    }
  }

  const validateForm = (e) => {
    e.preventDefault()

    if (inputs.password1 === '' || inputs.password2 === '') {
      alert("All fields are required")
    }
    
    else if (inputs.password1 === inputs.password2) {
      console.log(inputs)
      handleSubmit()

    }
    else {
      alert("ERROR : New Passwords don't match")
    }
  }


  return (

    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-sm-12 offset-md-4">
          {resStatus && <FormError value={resStatus.message} status={resStatus.status === 'error' ? 'danger' : 'success'} dismissable={true}/>}

            <div className="form-section">

              <div className="form-top">
                {/* <div className="logo">
                  <img src="https://1000logos.net/wp-content/themes/redwaves-lite/pic/mercedes-logo-sm.png" alt="Logo">
                </div> */}
                <a href='/' className="brand">rk hall</a>
              </div>

              <div className="userform">
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

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
