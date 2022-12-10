import React, { useContext, useState } from 'react'
import '../styles/Profile.css'
import profileImage from '../images/profile.jpg'
import Header from '../components/Header'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

export default function Profile() {

    const { currentUser } = useContext(AuthContext)

    const [formInput, setFormInput] = useState(`${currentUser?.phone}`)

    const [inputs, setInputs] = useState({contact: ""})

    const navigate = useNavigate()

    const enableEdit = (e) => {
        console.log(e.target.value)
    }

    const handleChange = (e) => {
        setFormInput(e.target.value)
        setInputs(next => ({ ...next, [e.target.name]: e.target.value }))
        console.log(inputs)
    }

    const handleSubmit = () => {

    }


    return (
        <>
            <Header currentUser={currentUser} />
            <div className="container spacet50">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="profile profile-left">
                            <div className="profile-img-top">
                                <img src={profileImage} alt="userProfile" />
                                <h4 className="username">{currentUser?.name}</h4>
                                <span className="user-role">Student</span>
                            </div>

                            <ul>
                                <li><a href="/">Change Password</a></li>
                                <li><a href="/">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="profile profile-right p-0">
                            <div className="heading">My Profile</div>
                            <div className="details">

                                <div className="row g-3">
                                    <div className="user-data-wrap">
                                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                                        <input type="email" className="form-input" id="inputEmail4" value={currentUser?.email} readOnly={true} />
                                    </div>
                                    <div className="user-data-wrap">
                                        <label htmlFor="inputPassword4" className="form-label">Roll No</label>
                                        <input type="text" className="form-input" id="inputPassword4" value={currentUser?.roll} readOnly={true} />
                                    </div>
                                    <div className="user-data-wrap">
                                        <label htmlFor="inputCity" className="form-label">Contact Number</label>
                                        <input type="text" className="form-input" id="inputCity" name="contact" value={formInput} onChange={handleChange} maxLength="10" />
                                        <span className="fa fa-pencil edit-btn"></span>
                                    </div>
                                    <div className="user-data-wrap">
                                        <label htmlFor="inputZip" className="form-label">Room Number</label>
                                        <input type="text" className="form-input" id="room_no" value={currentUser?.block + " - " + currentUser?.room} readOnly={true} />
                                    </div>

                                    <div className="col-12">
                                        <button className='btn btn-secondary btn-sm' onClick={() => navigate(-1)}>Back to Dashboard</button>
                                        <button className='btn btn-secondary btn-sm' onClick={handleSubmit}>Done</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
