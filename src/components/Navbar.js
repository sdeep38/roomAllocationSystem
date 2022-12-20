import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import '../styles/Home.css'
import profileIcon from '../images/profile-icon.png'
import profileImage from '../images/profile.jpg'
import { useState } from 'react'

export default function Navbar() {

  const { currentUser, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const [menuState, setMenuState] = useState(false)



  return (
    <header>
      <div className="navigation">
        <div className="container">
          <div className="row">
            <div className="nav-ui">
              <nav className="navbar navbar-expand-lg">

                <div className="container-fluid">
                  <Link className="navbar-brand" to={'/dashboard'}>rk hall of residence</Link>
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
                      
                      {currentUser?.auth == 'admin' && <li className="nav-item">
                        <Link className="nav-link" to={'/allocateRooms'}>Allocate Rooms</Link>
                      </li>}
                      

                    </ul>
                    {/* <form className = "d-flex" role="search">
                                        <input className = "form-control me-2" type="search" placeholder="Search"
                                            aria-label="Search">
                                        <button className = "btn btn-outline-success" type="submit">Search</button>
                                    </form> */}
                    <div className="top-right">
                      <Link id="user-logged" title={ currentUser?.resultSet.name }>
                        <img src={profileIcon} alt='Profile' width="40" height="36" onClick={() =>{setMenuState(!menuState)}}/>
                      </Link>
                      <div className={`sub-menu-wrap ${menuState? 'show-menu' : 'hide-menu'}`} id="userMenu">
                        <div className="sub-menu">
                          <div className="user-info">
                            <img src={profileImage} alt='profile-icon' />
                            <h3>{currentUser?.resultSet.name}<span className="role mt-1">{currentUser?.auth}</span></h3>
                          </div>
                          <ul className="user-links">
                            <li><Link id="altpass" to={'/profile'}>
                              <span className="fa fa-pencil"></span>Edit Profile</Link></li>
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
