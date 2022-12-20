import React, { useContext, useState } from 'react'
import '../styles/Profile.css'
import profileImage from '../images/profile.jpg'
import Header from '../components/Header'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useRef } from 'react'

export default function Profile() {

    const { currentUser } = useContext(AuthContext)


    const [userData, setUserData] = useState({
        name: '',
        roll: '',
        phone: '',
        block: '',
        email: '',
        room: '',
    })

    const [newContact, setNewContact] = useState(null)

    const [resStatus, setResStatus] = useState(null)

    const [enableUpdate, setEnableUpdate] = useState(true)

    const contactInput = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newContact == null) {
            alert('No changes detected')
        }
        else {
            try {
                const res = await axios.put(`/users/updateUser/${currentUser?.id}`, { contact: newContact })
                setResStatus(res.data.stat)
            } catch (error) {
                console.log(error)
            }
        }

    }

    const userType = currentUser?.auth

    useEffect(() => {
        const fetchCurrentUserData = async () => {
            try {
                const res = await axios.get(`/users/getUser/${currentUser?.resultSet.id}`)
                setUserData(res.data[0])
            } catch (err) {
                console.log(err.response)
            }
        }
        fetchCurrentUserData();
    })

    const Position = {
        gSec: "General Secretary",
        hallPresident: "Hall President",
        Warden: "Warden",
    }
    return (
        <>
            <Header currentUser={currentUser} />
            <div className="container spacet50">
                <div className="row">

                    {/* profile-left */}
                    <div className="col-lg-4">
                        <div className="profile profile-left">
                            <div className="profile-img-top">
                                <img src={profileImage} alt="userProfile" />
                                <h4 className="username">{currentUser?.resultSet.name}</h4>
                                <span className="user-role">{userType}</span>
                            </div>

                            {/* <ul>
                                <li><a href="/">Change Password</a></li>
                                <li><a href="/">Logout</a></li>
                            </ul> */}
                        </div>
                    </div>

                    {/* profile-right */}
                    <div className="col-lg-8">
                        <div className="profile profile-right p-0">
                            <div className="heading">My Profile</div>

                            {resStatus && <div className="alert alert-success d-flex align-items-center mt-3 mb-0 alert-dismissible fade show" role="alert">
                                <div className='update-status'>
                                    {resStatus}
                                </div>
                                <span className="fa fa-xmark btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></span>
                            </div>}
                            <div className="details">

                                <form className="row g-3">
                                    <div className="user-data-wrap">
                                        <label htmlFor="inputEmail" className="form-label">Email Id</label>
                                        <input type="email" className="form-input w-70" name='email' id="inputEmail" value={userData?.email} readOnly={true} />
                                    </div>
                                    <div className="user-data-wrap">
                                        <label htmlFor="inputPhone" className="form-label">Contact Number</label>
                                        <input type="text" ref={contactInput} className="form-input w-70" id="inputPhone" name="phone" value={newContact || userData?.phone} onChange={(e) => { setNewContact(e.target.value); console.log(newContact) }} maxLength="10" readOnly={enableUpdate} />
                                        <span className="edit-btn" onClick={(state) => { setEnableUpdate(!state); contactInput.current.focus() }}>Edit</span>
                                    </div>

                                    {currentUser.auth === 'student' ?
                                        [<div className="user-data-wrap" key={currentUser?.resultSet.id + 1}>
                                            <label htmlFor="inputRoll" className="form-label">Roll No</label>
                                            <input type="text" className="form-input w-70" name="roll" id="inputRoll" value={userData?.roll} readOnly={true} />
                                        </div>,

                                        <div className="user-data-wrap" key={currentUser?.resultSet.id + 2}>
                                            <label htmlFor="inputRoom" className="form-label">Room Number</label>
                                            <input type="text" className="form-input w-70" name='room' id="inputRoom" value={userData?.block + " - " + userData?.room} readOnly={true} />
                                        </div>] :

                                        [<div className="user-data-wrap" key={currentUser?.resultSet.id + 3}>
                                            <label htmlFor="inputPosition" className="form-label">Position</label>
                                            <input type="text" className="form-input w-70" name="roll" id="inputPosition" value={Position[userData?.position]} readOnly={true} />
                                        </div>]
                                    }
    
                                    <div className="col-12">
                                        <button type="submit" className='btn btn-primary btn-sm' onClick={handleSubmit}>Update</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
