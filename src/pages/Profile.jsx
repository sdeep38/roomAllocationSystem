import React, { useContext, useState } from 'react'
import '../styles/Profile.css'
import profileImage from '../images/blank-profile.png'
import Header from '../components/Header'
import { AuthContext } from '../context/authContext'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useRef } from 'react'

export default function Profile() {

    const index = 8
    
    const { logout, currentUser } = useContext(AuthContext)
    
    const navigate = useNavigate()
    const contactInput = useRef(null);
    
    const [userData, setUserData] = useState(null)
    const [newContact, setNewContact] = useState(null)
    const [enableUpdate, setEnableUpdate] = useState(false)
    const [resStatus, setResStatus] = useState(null)
    
    const [activeTab, setActiveTab] = useState('tab1')
    const userType = currentUser?.authorizedAs

    const [inputs, setInputs] = useState({
        password1: "",
        password2: "",
        password0: "",
        userId: "",
    })
    
    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.put('/users/updateUser/', { contact: newContact })
            console.log(res.data)
            setResStatus(res.data)
        } catch (error) {
            console.log(error)
        }

    }

    const handlePasswordChangeForm = async () => {
        try {
            const res = await axios.post('/auth/changePassword', inputs)
            console.log(res.data)
            if(res.data.status === 'success'){
                setResStatus(res.data.message)
            }
            else if(res.data.status === 'error') {
                alert(res.data.message)
            }
        } catch (error) {
            alert(error.response.data)
        }

    }

    const validateForm = (e) => {
        e.preventDefault()

        if (newContact === null || newContact === userData?.phone) {
            alert('No changes detected')
        }
        else {
            const choice = window.confirm('Are you sure you want to make the changes ?')
            choice === true ? handleSubmit() : setEnableUpdate(false)
        }
    }

    const validatePasswordForm = (e) => {
        e.preventDefault()
        if (inputs.password0 === '' || inputs.password1 === '' || inputs.password2 === '') {
            alert("All fields are required")
        }
        else if (inputs.password0 === inputs.password1) {
            alert("New Password should be different from old password")
        }
        else if (inputs.password1 === inputs.password2) {
            setInputs({ userId: userData?.roll })
            console.log(inputs)
            // handlePasswordChangeForm()

        }
        else {
            alert("ERROR : New Passwords don't match")
        }
    }


    useEffect(() => {
        const fetchCurrentUserData = async () => {
            try {
                const res = await axios.get('/users/getUser/')
                console.log(res.data)
                setUserData(res.data.dataSet)
                // setUserDataStatus(true)
            } catch (err) {
                console.log(err.response.data)
            }
        }
        if(!userData) fetchCurrentUserData()
    }, [])

    const Position = {
        gSec: "General Secretary",
        hallPresident: "Hall President",
        Warden: "Warden",
    }


    return (
        <>
            <Header title='Settings' />
            <div className="container spacet50">
                <div className="row">

                    {/* profile-left */}
                    <div className="col-lg-4">
                        <div className="profile profile-left">
                            <div className="profile-img-top">
                                <img src={profileImage} alt="userProfile" />
                                <h4 className="username">{currentUser?.username}</h4>
                                <span className="user-role">{userType}</span>
                            </div>


                        </div>
                        <div className="group-buttons" role='tablist'>
                            <a href="#" className={activeTab === 'tab1' ? 'setting-tabs active' : 'setting-tabs'} onClick={() => setActiveTab('tab1')}>Edit Profile</a>
                            <a href='#' className={activeTab === 'tab2' ? 'setting-tabs active' : 'setting-tabs'} onClick={() => setActiveTab('tab2')}>Change Password</a>
                        </div>

                    </div>

                    {/* profile-right */}
                    <div className="col-lg-8">
                        <div className="profile profile-right p-0">
                            {resStatus && <div className={"alert " + (resStatus.status === 'success' ? 'alert-success' : 'alert-danger') + " d-flex align-items-center mt-3 mb-0 alert-dismissible fade show"} role="alert">
                                <div className='update-status'>
                                    {resStatus.message}
                                </div>
                                <span className="fa fa-xmark btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></span>
                            </div>}

                            {activeTab === 'tab1' ? <div className="tab1">
                                <div className="heading mb-3">User Information</div>

                                <form className="row g-3 profile-form">
                                    <div className="col-12 user-data-wrap">
                                        <label htmlFor="inputName" className="form-label">Name</label>
                                        <input type="text" className="form-control profile-input" name='name' id="inputName" value={currentUser?.username} disabled={true} />
                                    </div>

                                    <div className="col-md-12 user-data-wrap">
                                        <label htmlFor="inputEmail" className="form-label">Email Address</label>
                                        <input type="email" className="form-control profile-input" name='email' id="inputEmail" value={userData?.email} disabled={true} />
                                    </div>

                                    {currentUser?.authorizedAs === 'student' ?
                                        [<div className="col-md-4 user-data-wrap" key={index + 1}>
                                            <label htmlFor="inputRoll" className="form-label">Roll No.</label>
                                            <input type="text" className="form-control profile-input" name="roll" id="inputRoll" value={userData?.roll} disabled={true} />
                                        </div>,

                                        <div className="col-md-4 user-data-wrap" key={index + 2}>
                                            <label htmlFor="inputRoom" className="form-label">Room</label>
                                            <input type="text" className="form-control profile-input" name='room' id="inputRoom" value={(userData?.block === null) ? 'Not Assigned' : (userData?.block + '-' + userData?.room)} disabled={true} />
                                        </div>] :

                                        [<div className="col-8 user-data-wrap" key={index + 3}>
                                            <label htmlFor="inputPosition" className="form-label">Position</label>
                                            <input type="text" className="form-control profile-input" name="roll" id="inputPosition" value={Position[userData?.position]} disabled={true} />
                                        </div>]
                                    }

                                    <div className="col-md-4 user-data-wrap relative">
                                        <label htmlFor="inputPhone" className="form-label">Contact No.</label>
                                        <input type="tel" ref={contactInput} className="form-control profile-input" id="inputPhone" name="phone" value={newContact || userData?.phone} onChange={(e) => { setNewContact(e.target.value); }} maxLength="10" disabled={!enableUpdate} />
                                        <span className="edit-btn" onClick={() => { setEnableUpdate(!enableUpdate) }}><i className='fa fa-pencil'></i></span>
                                    </div>



                                    <div className="col-12 center">
                                        <button type="submit" className='btn btn-primary btn-sm' onClick={validateForm} disabled={!enableUpdate}>Update</button>
                                    </div>

                                </form>
                            </div> : <div className="tab2">
                                <div className="heading mb-3">Change Password</div>
                                <form className='pt-3' id='PasswordChangeForm'>
                                    <div className="row mb-3">
                                        <label htmlFor="inputCurrentPassword" className="col-sm-4 form-label">Current Password</label>
                                        <div className="col-sm-8">
                                            <input type="password" className="form-control profile-input" id="inputCurrentPassword" name='password0' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputNewPassword1" className="col-sm-4 form-label">New Password</label>
                                        <div className="col-sm-8">
                                            <input type="password" className="form-control profile-input" id="inputNewPassword1" name='password1' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputNewPassword2" className="col-sm-4 form-label">Confirm New Password</label>
                                        <div className="col-sm-8">
                                            <input type="password" className="form-control profile-input" id="inputNewPassword2" name='password2' onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="row mb-3 center">
                                        <button type="submit" className='col-sm-2 btn btn-primary btn-sm mt-3' onClick={validatePasswordForm}>Submit</button>
                                    </div>
                                </form>
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
