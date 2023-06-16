import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import SelectDropdown from '../components/SelectDropdown'
import { AuthContext } from '../context/authContext'

export default function AllocateRooms() {

    const { currentUser } = useContext(AuthContext)

    //filtered allocation data
    const [allocStudentData, setAllocStudentData] = useState(null)
    const [allocRoomData, setAllocRoomData] = useState(null)

    //fetch all data from server
    const [students, setStudents] = useState([])
    const [rooms, setRooms] = useState([])

    //handle preview state
    const [preview, setPreview] = useState(false)

    //successful allocation status
    const [resStatus, setResStatus] = useState(null)

    useEffect(() => {
        const fetchstudentData = async () => {
            try {
                const res = await axios.get('/users/getUsers/blank')
                setStudents(res.data.message)
            } catch (err) {
                console.log(err.response.data.message)
            }
        }

        const fetchroomData = async () => {
            try {
                const res = await axios.get('/rooms/getRooms/0')
                setRooms(res.data.message)
            } catch (err) {
                console.log(err.response.data.message)
            }
        }

        fetchstudentData();
        fetchroomData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put('/rooms/updateRoom/', { field: 'room', studentData: allocStudentData?.roll, roomData: allocRoomData })
            console.log(res.data)
            setResStatus(res.data.message)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const handlePreview = (e) => {
        e.preventDefault();
        (allocStudentData && allocRoomData) ? setPreview(true) : alert('No changes detected')
    }

    return (
        <>

            <Header title={'Room Allocation'} />
            {/* <ScrollMenu /> */}

            <div className="main-content">
                <div className="container pt-5 px-5">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="room-view-wrapper">
                                <h2 className='heading'>Allocate Rooms To Students</h2>
                                
                                <div className="allocate-section template-view mb-5">
                                    <p className="recommended"><span className="label">RECOMMENDED</span>Preview your changes before saving them</p>
                                    
                                    {resStatus && <div className="alert alert-success d-flex align-items-center mb-3 alert-dismissible fade show" role="alert">
                                    <div className='update-status'>
                                        {resStatus}

                                    </div>
                                    <span className="fa fa-xmark btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></span>
                                </div>}
                                    <form className="row row-cols-lg-auto g-3 align-items-center" id='room-allocation-form'>
                                        <div className="col-lg-4">
                                            <select className="form-select" id="inlineFormSelectPref" onChange={(e) => setAllocStudentData(students.filter((student) => student.roll === e.target.value)[0])}>
                                                <option>Select Student</option>
                                                {students.map((student, index) => {
                                                    return <option key={index}>{student.roll}</option>
                                                })}
                                            </select>
                                        </div>
                                        
                                        <div className="col-lg-4">
                                            <select className="form-select" id="inlineFormSelectPref" onChange={(e) => setAllocRoomData(e.target.value)}>
                                                <option>Select Room</option>
                                                {rooms.map((room, index) => {
                                                    return <option key={index}>{room.block + '-' + room.roomno}</option>
                                                })}
                                            </select>
                                        </div>

                                        <div className="col-12">
                                            <button className="btn btn-preview me-3" onClick={handlePreview}>Preview</button>
                                            <button type='submit' className="btn btn-submit" onClick={handleSubmit}>Save Changes</button>

                                        </div>
                                        
                                    </form>

                                    <div className={'allocation-preview' + (preview ? ' show' : '')}>
                                        <h6>Room Allocation Preview</h6>

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <ul className="list-group list-group-flush bg0">
                                                    <li className="list-group-item">Name<Link style={{ float: "right" }}>{allocStudentData?.name}</Link></li>
                                                    <li className="list-group-item">Roll No<Link style={{ float: "right" }}>{allocStudentData?.roll}</Link></li>
                                                    <li className="list-group-item">Email id<Link style={{ float: "right" }}>{allocStudentData?.email}</Link></li>
                                                    <li className="list-group-item">Contact No<Link style={{ float: "right" }}>{allocStudentData?.phone}</Link></li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-6">
                                                <ul className="list-group list-group-flush bg0">
                                                    <li className="list-group-item">Alloted Block<Link style={{ float: "right" }}>{allocRoomData?.split('-')[0]}</Link></li>
                                                    <li className="list-group-item">Alloted Room No<Link style={{ float: "right" }}>{allocRoomData?.split('-')[1]}</Link></li>
                                                </ul>
                                            </div>
                                        </div>


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
