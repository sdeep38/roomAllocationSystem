import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import ScrollMenu from '../components/ScrollMenu'
import { AuthContext } from '../context/authContext'
import '../styles/Home.css'

export default function Home() {

    const { currentUser } = useContext(AuthContext)

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

    //get all students data
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

    //get single student data
    const [userData, setUserData] = useState([])

    const fetchUser = async (userId) => {
        try {
            const res = await axios.get(`/users/getUser/${userId}`)
            setUserData(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>

            <Header currentUser = {currentUser}/>
            <ScrollMenu />

            <div className="main-content">
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <div className="room-view-wrapper">
                                <h2>Room Details</h2>
                                <div className="filter-form">
                                    <form className="row row-cols-lg-auto g-3 align-items-center">
                                        <div className="col-lg-4">
                                            <label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</label>
                                            <select className="form-select" id="inlineFormSelectPref">
                                                <option>Select Floor</option>
                                                {floorOptions.map((option, index) => {
                                                    return <option key={index} value={option.value}>{option.label}</option>
                                                })}
                                            </select>
                                        </div>

                                        <div className="col-lg-4">
                                            <label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</label>
                                            <select className="form-select" id="inlineFormSelectPref">
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
                                                    <td><Link onClick={() => {fetchUser(student.id)}}>View</Link></td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="block-right">
                                <h4>Student Details</h4>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Name<Link style={{ float: "right" }}>{userData[0]?.name}</Link></li>
                                    <li className="list-group-item">Roll No<Link style={{ float: "right" }}>{userData[0]?.roll}</Link></li>
                                    <li className="list-group-item">Email id<Link style={{ float: "right" }}>{userData[0]?.email}</Link></li>
                                    <li className="list-group-item">Contact No<Link style={{ float: "right" }}>{userData[0]?.phone}</Link></li>
                                    <li className="list-group-item">Room No<Link style={{ float: "right" }}>{userData[0]?.block} - {userData[0]?.room}</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
