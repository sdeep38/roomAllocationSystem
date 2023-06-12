import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import SelectDropdown from '../components/SelectDropdown'
import { AuthContext } from '../context/authContext'

export default function AllocateRooms() {

    const { currentUser } = useContext(AuthContext)

    const [allocRoom, setAllocRoom] = useState(null)
    const [allocStudent, setAllocStudent] = useState(null)

    const [allocStudentData, setAllocStudentData] = useState({})
    const [allocRoomData, setAllocRoomData] = useState({})

    //get all data
    const [students, setStudents] = useState([])
    const [rooms, setRooms] = useState([])

    const [preview, setPreview] = useState(false)

    const [resStatus, setResStatus] = useState(null)

    useEffect(() => {
        const fetchstudentData = async () => {
            try {
                const res = await axios.get('/users/getUsers/blank')
                setStudents(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        const fetchroomData = async () => {
            try {
                const res = await axios.get('/rooms/getRooms/0')
                setRooms(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchstudentData();
        fetchroomData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/users/updateUser/${allocStudent}`, { newRoom: allocRoomData })
            setResStatus(res.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const handlePreview = async (e) => {
        e.preventDefault()

        if (allocStudent != null && allocRoom != null) {
            try {
                const res = await axios.get(`/users/getUser/${allocStudent}`)
                setAllocStudentData(res.data[0])
            } catch (err) {
                console.log('studentError : ', err)
            }
    
            try {
                const res = await axios.get(`/rooms/getRoom/${allocRoom}`)
                setAllocRoomData(res.data[0])
            } catch (err) {
                console.log('roomError', err)
            }
    
            setPreview(true)
        }
        else alert('No changes detected')
        
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
                                            {/* <label className="form-label" htmlFor="inlineFormSelectPref">Select Student</label> */}
                                            <select className="form-select" id="inlineFormSelectPref" onChange={(e) => setAllocStudent(e.target.value)}>
                                                <option>Select Student</option>
                                                {students.map((student, index) => {
                                                    return <option key={index} value={student.id}>{student.roll}</option>
                                                })}
                                            </select>
                                        </div>
                                        
                                        <div className="col-lg-4">
                                            {/* <label className="form-label" htmlFor="inlineFormSelectPref">Select Room</label> */}
                                            <select className="form-select" id="inlineFormSelectPref" onChange={(e) => { setAllocRoom(e.target.value); }}>
                                                <option>Select Room</option>
                                                {rooms.map((room, index) => {
                                                    return <option key={index} value={room.id}>{room.block + '-' + room.roomno}</option>
                                                })}
                                            </select>
                                        </div>

                                        <div className="col-12">
                                            <button className="btn btn-preview me-3" onClick={handlePreview}>Preview</button>
                                            <button type='submit' className="btn btn-submit" onClick={handleSubmit}>Save Changes</button>

                                        </div>
                                        
                                    </form>
                                    {/* <div className="col-lg-4 mb-3">
                                    <button className="btn btn-primary" onClick={handlePreview}>Preview</button>
                                </div> */}

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
                                                    <li className="list-group-item">Alloted Block<Link style={{ float: "right" }}>{allocRoomData?.block}</Link></li>
                                                    <li className="list-group-item">Alloted Room No<Link style={{ float: "right" }}>{allocRoomData?.roomno}</Link></li>
                                                </ul>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                {/* <div className="room-view_table">
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

                                            {/* {students.map((student, index) => {
                                                return <tr key={index}>
                                                    <th scope="row">{student.id}</th>
                                                    <td>{student.block} - {student.room}</td>
                                                    <td>{student.name}</td>
                                                    <td><Link onClick={() => {fetchUser(student.id)}}>View</Link></td>
                                                </tr>
                                            })} *

                                        </tbody>
                                    </table>
                                </div> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
