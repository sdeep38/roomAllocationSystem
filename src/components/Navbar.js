import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import '../styles/Home.css'

export default function Navbar() {

  const { currentUser, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header>
        <div className="navigation">
          <div className="container">
            <div className="row">
              <div className="nav-ui">
                <nav className="navbar navbar-expand-lg">

                  <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>rk hall of residence</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                      aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <Link className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link">Link</Link>
                        </li>
                        <li className="nav-item dropdown">
                          <Link className="nav-link dropdown-toggle" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                          </Link>
                          <ul className="dropdown-menu">
                            <li><Link className="dropdown-item">Action</Link></li>
                            <li><Link className="dropdown-item">Another action</Link></li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li><Link className="dropdown-item">Something else here</Link></li>
                          </ul>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" id="logout" onClick={handleLogout}>
                            Logout</Link>
                        </li>

                      </ul>
                      {/* <form className = "d-flex" role="search">
                                        <input className = "form-control me-2" type="search" placeholder="Search"
                                            aria-label="Search">
                                        <button className = "btn btn-outline-success" type="submit">Search</button>
                                    </form> */}
                      <div className="top-right">
                        <Link id="user-logged" title="Soumyadeep Saha">
                          <img src="../images/profile-icon.png" alt="Profile" width="40" height="36"
                          />
                        </Link>
                        <div className="sub-menu-wrap" id="userMenu">
                          <div className="sub-menu">
                            <div className="user-info">
                              <img src='./images/profile.jpg' alt='profile-icon' />
                              <h3>{currentUser?.name}<span className="role">{currentUser?.user_type}</span></h3>
                            </div>
                            <ul className="user-links">
                              <li><Link id="altpass">
                                <span className="fa fa-pencil"></span>Change Password</Link></li>
                              <li><Link id="logout" onClick={handleLogout}>
                                <span className="fa fa-sign-out"></span>Logout</Link></li>
                            </ul>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
  )
}
