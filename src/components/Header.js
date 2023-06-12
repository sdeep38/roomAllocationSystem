import React from 'react'
import Navbar from './Navbar'

export default function Header({ title }) {
    return (
        <>
            <div className="ui-heading">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className='page-title'>{title}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
