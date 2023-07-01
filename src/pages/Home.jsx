import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Modal from '../components/Modal'
import SelectDropdown from '../components/SelectDropdown'
import { AuthContext } from '../context/authContext'
import '../styles/Home.css'
import Navbar from '../components/Navbar'

export default function Home() {

    const [modalState, setModalState] = useState(false)

    //get single student data
    const [userData, setUserData] = useState([])

    //get all students data
    const [students, setStudents] = useState(null)

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/users/getUsers/notBlank')
                setStudents(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (!students) {
            fetchData();
        }
    }, [])

    const fetchUser = async (userId) => {
        try {
            const res = await axios.get(`/users/getUser/${userId}`)
            setUserData(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleFilterData = (e) => {
        console.log("Api calling for value = ", e.target.value)
    }

    return (
        <>
            <Header title='Dashboard' />

            {/* <ScrollMenu /> */}
            <div className="main-content">
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="room-view-wrapper">
                                <h2 className='heading'>Room Details</h2>
                                <div className="room-view-section template-view mb-5">
                                    <div className="filter-data d-flex align-items-center justify-content-between mb-1">
                                        <h4 className='heading'>Click on a room to get details</h4>
                                        <ul className="showcase">
                                            <li>
                                                <div className="room"></div>
                                                <small>N/A</small>
                                            </li>
                                            <li>
                                                <div className="room special"></div>
                                                <small>Special</small>
                                            </li>
                                            <li>
                                                <div className="room occupied"></div>
                                                <small>Occupied</small>
                                            </li>
                                            
                                        </ul>
                                        
                                        {currentUser?.authorizedAs === 'admin' && <Link to={'/allocateRooms'} type="button" className="btn btn-outline-success mb-3"><i className='fa fa-plus'></i> New Allocation</Link>}

                                    </div>
                                    
                                    {/* <button type="button" className="btn btn-outline-success mb-3">New Allocation</button> */}

                                    <div className="room-view-grids">
                                        {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">East Wing</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Middle Wing</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">West Wing</button>
                                            </li>

                                        </ul> */}
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                                                <div className="room-grid">
                                                    <div className="container">
                                                        <h3 className="block-id">E-BLOCK</h3>
                                                        <div className="floor floor-0">
                                                            <div className="row justify-content-center">
                                                                <div className='room' onClick={() => setModalState(true)}><span className="room-no">417</span></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>

                                                        </div>
                                                        <div className="floor floor-1">
                                                            <div className="row justify-content-center">
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>

                                                        </div>
                                                        <div className="floor floor-2">
                                                            <div className="row justify-content-center">
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>
                                                        </div>
                                                        <div className="floor floor-3">
                                                            <div className="row justify-content-center">
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room occupied'><span className="room-no">106</span></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room special'><span className="room-no">119</span></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>
                                                        </div>
                                                        <h3 className="block-id">D-BLOCK</h3>
                                                        <div className="floor floor-0">
                                                            <div className="row justify-content-center">
                                                                <div className='room'><span className="room-no">417</span></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>

                                                        </div>
                                                        <div className="floor floor-1">
                                                            <div className="row justify-content-center">
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>

                                                        </div>
                                                        <div className="floor floor-2">
                                                            <div className="row justify-content-center">
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>
                                                        </div>
                                                        <h3 className="block-id">C-BLOCK</h3>
                                                        <div className="floor floor-0">
                                                            <div className="row justify-content-center">
                                                                <div className='room'><span className="room-no">417</span></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>

                                                        </div>
                                                        <div className="floor floor-1">
                                                            <div className="row justify-content-center">
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>

                                                        </div>
                                                        <div className="floor floor-2">
                                                            <div className="row justify-content-center">
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>
                                                        </div>
                                                        <h3 className="block-id">B-BLOCK</h3>
                                                        <div className="floor floor-0">
                                                            <div className="row justify-content-center">
                                                                <div className='room'><span className="room-no">417</span></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>

                                                        </div>
                                                        <div className="floor floor-1">
                                                            <div className="row justify-content-center">
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>

                                                        </div>
                                                        <div className="floor floor-2">
                                                            <div className="row justify-content-center">
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>
                                                        </div>
                                                        <h3 className="block-id">A-BLOCK</h3>
                                                        <div className="floor floor-0">
                                                            <div className="row justify-content-center">
                                                                <div className='room'><span className="room-no">417</span></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>

                                                        </div>
                                                        <div className="floor floor-1">
                                                            <div className="row justify-content-center">
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>

                                                        </div>
                                                        <div className="floor floor-2">
                                                            <div className="row justify-content-center">
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                                <div className='room'></div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>

                                            </div>
                                            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                                                <h1>This is Profile</h1>
                                            </div>
                                            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
                                                <h1>This is Contact</h1>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Modal showModal={modalState} onHide={() => setModalState(false)}></Modal>
        </>
    )
}
