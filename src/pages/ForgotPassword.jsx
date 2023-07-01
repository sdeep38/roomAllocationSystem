import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormError from '../components/FormError'
import SelectDropdown from '../components/SelectDropdown'
import '../styles/Login.css'


export default function Login() {

  const [inputs, setInputs] = useState({
    username: "",
    user_type: "",
  })


  //request validation status 
  const [resStatus, setResStatus] = useState(null)
  const [err, setError] = useState(null)

  //set inputs
  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  //handle form submission
  const handleSubmit = async () => {
    try {
      const res = await axios.post('/auth/forgotPassword/', inputs)
      setResStatus(res.data)
    }
    catch (err) {
      setResStatus(err.response.data.message)
    }
  }

  //validate form
  const validateForm = (e) => {
    e.preventDefault()
    setError(null)

    let isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (inputs.username.match(isValidEmail) && inputs.user_type) {
      handleSubmit()
    }
    else {
      setError('All Fields are required')
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
            {resStatus && <FormError value={resStatus?.message} status={resStatus?.status === 'success' ? 'success' : 'danger'} dismissable={false}/>}
            {err && <FormError value={err} status='danger' dismissable={false}/>}

            <div className="form-section">

              <div className="form-top">

                <Link href='/login' className="brand">rk hall</Link>
              </div>

              <div className="userform">
                <form className="row g-3" id="reg-form" action='#' method='post'>

                  <div className="col-12">
                    <label htmlFor="inputUsername" className="form-label">Email address</label>
                    <input type="email" className="form-control login-box-input" id="inputUsername" name='username' onChange={handleChange} autoFocus disabled={resStatus?.status === 'success'}/>
                  </div>
                  <div className="col-lg-4">
                  <SelectDropdown placeHolder="Login As" name = 'user_type' Options={userRoleOptions} isMulti={false} isSearchable={false} onChange = {(value) => setInputs(prev => ({...prev, user_type : value }))}/>

                  </div>
                  <div className="col-lg-8">
                    <button type="submit" id="login-btn" className="btn" onClick={validateForm} disabled={resStatus?.status === 'success'}>Submit</button>
                  </div>

                  <div id="keyHelp" className="form-text"><Link className="fpass" to={'/login'}>
                    <span className="fa fa-key"></span> Return to user login</Link></div>
                </form>

                

              {resStatus?.status === 'success' &&
                  <div className="password-reset-link mt-3 text-info text-center">Verification link (valid for 5 min): <a href={resStatus?.link} target='_blank' rel='noopener noreferrer'>verify</a></div>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
