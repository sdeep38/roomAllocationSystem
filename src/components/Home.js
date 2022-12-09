import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import '../styles/Home.css'

export default function Home() {

  const { currentUser, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const blockOptions = [
    {
      label: "A",
      value: "A",
    },
    {
      label: "B",
      value: "B",
    },
    {
      label: "C",
      value: "C",
    },
    {
      label: "D",
      value: "D",
    },
    {
      label: "E",
      value: "E",
    },
  ]

  const floorOptions = [
    {
      label: "Ground",
      value: "0",
    },
    {
      label: "First",
      value: "1",
    },
    {
      label: "Second",
      value: "2",
    },
    {
      label: "Third",
      value: "3",
    },
  ]

  const handleOptionChange = (e) => {
    console.log('User Selected value : ', e.target.value)
  }

  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/users/getUsers')
        setStudents(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [])

  return (
    <>
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

      <div className="page-heading">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ui-text">
                <h1>Welcome <span style={{ textTransform: "uppercase" }}>{currentUser?.name}</span></h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-menu">
        <div className="container">
          <div className="row">
            <div className="bottom-nav">
              <ul className="nav-tabs">
                <li className="slide-menu-item"><Link className="item-link active">Dashboard</Link></li>
                <li className="slide-menu-item"><Link className="item-link">Allocate Room</Link></li>
                <li className="slide-menu-item"><Link className="item-link">Room Details</Link></li>
                <li className="slide-menu-item"><Link className="item-link">Free</Link></li>
                <li className="slide-menu-item"><Link className="item-link">Resources</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="container pt-5">
          <div className="row">
            <div className="col-md-8 col-sm-9">
              <div className="room-view-wrapper">
                <h2>Room Details</h2>
                <div className="filter-form">
                  <form className="row row-cols-lg-auto g-3 align-items-center">
                    <div className="col-lg-4">
                      <label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</label>
                      <select className="form-select" id="inlineFormSelectPref" onChange={handleOptionChange}>
                        <option>Select Floor</option>
                        {floorOptions.map((option, index) => {
                          return <option key={index} value={option.value}>{option.label}</option>
                        })}
                      </select>
                    </div>

                    <div className="col-lg-4">
                      <label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</label>
                      <select className="form-select" id="inlineFormSelectPref" onChange={handleOptionChange}>
                        <option>Select Block</option>
                        {blockOptions.map((option, index) => {
                          return <option key={index} value={option.value}>{option.label}</option>
                        })}
                      </select>
                    </div>

                    <div className="col-lg-4">
                      <button type="submit" className="btn btn-primary">Filter</button>
                    </div>
                  </form>
                </div>
                <div className="room-view_table">
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Room Number</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>

                      {students.map((student, index) => {
                        return <tr key={index}>
                        <th scope="row">{student.id}</th>
                        <td>{student.block} - {student.room}</td>
                        <td>{student.name}</td>
                        <td><Link>View</Link></td>
                      </tr>
                      })}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-3">
              <div className="block-right">
                <h4>Student Details</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Name<Link style={{ float: "right" }}>{currentUser.name}</Link></li>
                  <li className="list-group-item">Roll No<Link style={{ float: "right" }}>{currentUser.roll}</Link></li>
                  <li className="list-group-item">Email id<Link style={{ float: "right" }}>{currentUser.email}</Link></li>
                  <li className="list-group-item">Contact No<Link style={{ float: "right" }}>{currentUser.phone}</Link></li>
                  <li className="list-group-item">Room No<Link style={{ float: "right" }}>{currentUser.block} - {currentUser.room}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
