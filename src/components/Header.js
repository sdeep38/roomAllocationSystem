import React from 'react'
import Navbar from './Navbar'

export default function Header({currentUser}) {
    return (
        <>
            <Navbar />
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
        </>
    )
}
