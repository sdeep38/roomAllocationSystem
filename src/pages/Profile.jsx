import React, { useContext, useState } from 'react'
import '../styles/Profile.css'
import profileImage from '../images/no_image.png'
import Header from '../components/Header'
import { AuthContext } from '../context/authContext'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useRef } from 'react'
import FormError from '../components/FormError'

export default function Profile() {

    const index = 8

    const { currentUser } = useContext(AuthContext)
    const role = currentUser?.authorizedAs

    const navigate = useNavigate()
    const contactInput = useRef(null);
    
    const [userData, setUserData] = useState(null)
    const [newContact, setNewContact] = useState(null)
    const [enableUpdate, setEnableUpdate] = useState(false)
    const [resStatus, setResStatus] = useState(null)
    
    const [activeTab, setActiveTab] = useState('tab1')

    const [inputs, setInputs] = useState({
        password1: "",
        password2: "",
        password0: "",
    })

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.put(`/users/updateUser/?role=${role}`, { contact: newContact })
            console.log(res.data)
            setResStatus(res.data)
        } catch (error) {
            console.log(error)
            setResStatus(error.response.data)
        }

    }

    const handlePasswordChangeForm = async () => {
        try {
            const res = await axios.post(`/auth/changePassword?role=${role}`, inputs)
            console.log(res.data)
            setResStatus(res.data)
        } catch (error) {
            setResStatus(error.response.data)
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
        else if (inputs.password1 !== inputs.password2) {
            alert("ERROR : New Passwords don't match")            
        }
        else {
            console.log(inputs)
            handlePasswordChangeForm()
        }
    }


    useEffect(() => {
        const fetchCurrentUserData = async () => {
            try {
                const res = await axios.get(`/users/getUser/?role=${role}`)
                console.log(res.data)
                setUserData(res.data.dataSet)
                setNewContact(res.data?.dataSet.phone)
                // setUserDataStatus(true)
            } catch (err) {
                console.log(err.response.data)
            }
        }
        if (!userData) fetchCurrentUserData()
    }, [role, userData])

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
                                <span className="user-role">{role}</span>
                            </div>


                        </div>
                        {/* <div className="group-buttons" role='tablist'>
                            <a href="#" className={activeTab === 'tab1' ? 'setting-tabs active' : 'setting-tabs'} onClick={() => setActiveTab('tab1')}>Edit Profile</a>
                            <a href='#' className={activeTab === 'tab2' ? 'setting-tabs active' : 'setting-tabs'} onClick={() => setActiveTab('tab2')}>Change Password</a>
                        </div> */}

                    </div>

                    {/* profile-right */}
                    <div className="col-lg-8">
                        <div className="profile profile-right p-0">
                        {resStatus && <FormError value={resStatus.message} status={(resStatus?.status === 'success' ? 'success' : 'danger')} dismissable={false}/>}
                            {/* {resStatus && <div className={"alert alert-" + (resStatus?.status === 'success' ? 'success' : 'danger') + " d-flex align-items-center mt-3 mb-0 alert-dismissible fade show"} role="alert">
                                <div className='update-status'>
                                    {resStatus.message}
                                </div>
                                <span className="fa fa-xmark btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></span>
                            </div>} */}

                            <ul className="nav nav-tabs mb-4" id="settings-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="true">User Information</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="change-password-tab" data-bs-toggle="tab" data-bs-target="#change-password-tab-pane" type="button" role="tab" aria-controls="change-password-tab-pane" aria-selected="false">Change Password</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                {/* Profile tab */}
                                <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-label="profile-tab"  tabIndex="0">

                                    <form className="row g-3 profile-form px-4 py-2 mb-3">
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
                                                <input type="text" className="form-control profile-input" name='room' id="inputRoom" value={(userData?.block === null) ? 'Not Assigned' : (userData?.block + ' - ' + userData?.room)} disabled={true} />
                                            </div>] :

                                            [<div className="col-8 user-data-wrap" key={index + 3}>
                                                <label htmlFor="inputPosition" className="form-label">Position</label>
                                                <input type="text" className="form-control profile-input" name="roll" id="inputPosition" value={Position[userData?.position]} disabled={true} />
                                            </div>]
                                        }

                                        <div className="col-md-4 user-data-wrap relative">
                                            <label htmlFor="inputPhone" className="form-label">Contact No.</label>
                                            <input type="tel" ref={contactInput} className="form-control profile-input" id="inputPhone" name="phone" value={newContact || ''} onChange={(e) => { setNewContact(e.target.value); }} maxLength="10" disabled={!enableUpdate} />
                                            <span title='Edit Contact Number' className="edit-btn" onClick={() => { setEnableUpdate(!enableUpdate) }}><i className='fa fa-pencil'></i></span>
                                        </div>



                                        <div className="col-12 center">
                                            <button type="submit" className='btn btn-primary btn-sm' onClick={validateForm} disabled={!enableUpdate}>Update</button>
                                        </div>

                                    </form>
                                </div>
                                {/* Change Password tab */}
                                <div className="tab-pane fade" id="change-password-tab-pane" role="tabpanel" aria-label="change-password-tab" tabIndex="0">
                                    <form className='py-4 px-4 mb-3' id='PasswordChangeForm'>
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
                                </div>
                            </div>

                            {/* {activeTab === 'tab1' ? <div className="tab1">

                            </div> : <div className="tab2">

                            </div>} */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
