import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormError from '../components/FormError'
import SelectDropdown from '../components/SelectDropdown'
import { AuthContext } from '../context/authContext'
import '../styles/Login.css'


export default function Login() {

  const [inputs, setInputs] = useState({
    username: "",
    user_type: "",
  })


  const [err, setError] = useState({ isErr: false, value: '', status: '' })
  const [resStatus, setResStatus] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`/auth/forgotPassword/`, inputs)
      setResStatus(res.data)
      console.log(res.data)
    }
    catch (err) {
      if (err.response.status === 500) {
        setError("Server failed to respond")

      } else {
        setError({ isErr: true, value: err.response.data, status: 'danger' })
      }
    }
  }

  const validateForm = (e) => {
    e.preventDefault()

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (inputs.username.match(isValidEmail)) {
      handleSubmit()
    }
    else {
      setError({ isErr: true, value: "Invalid Email", status: 'danger' })
    }
  }


  return (

    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-sm-12 offset-md-4">
            {err.isErr && <FormError value={err.value} status={err.status} />}

            <div className="form-section">

              <div className="form-top">

                <a href='/' className="brand">rk hall</a>
              </div>

              <div className="userform">
                <form className="row g-3" id="reg-form" action='#' method='post'>

                  <div className="col-12">
                    <label htmlFor="inputUsername" className="form-label">Email address</label>
                    <input type="email" className="form-control login-box-input" id="inputUsername" name='username' onChange={handleChange} autoCapitalize='off' autoCorrect='off' autoComplete='off' autoFocus disabled={resStatus}/>
                  </div>
                  <div className="col-12">
                    <button type="submit" id="login-btn" className="btn" onClick={validateForm} disabled={resStatus}>Submit</button>
                  </div>

                  <div id="keyHelp" className="form-text"><Link className="fpass" to={'/login'}>
                    <span className="fa fa-key"></span> Return to user login</Link></div>
                </form>

                


              </div>
              {resStatus &&
                  <div className="password-reset-link mt-3 text-info">Click Here : <a href={resStatus.link} target='_blank'>{resStatus.link}</a></div>
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
