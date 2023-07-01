import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
  let navigate = useNavigate()
  return (
    <div className="wrapper">
    <div className='container'>
      <div className="row">
        <div className="col-md-4 col-lg-4 offset-lg-4">
          <div className="four-zero-four-bg">
            <h1 className="title text-danger">404</h1>
            <p className="subtitle">Oops! Looks like you took a wrong turn.</p>
            <button className='btn btn-outline-info' onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
