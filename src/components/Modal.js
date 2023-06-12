import React from 'react'
import { useState } from 'react'

export default function Modal({ showModal, onHide }) {

    return (
        <>

            <div className={`modal fade${showModal ? ' show open-modal' : ''}`} tabIndex="-1" id='exampleModal' role='dialog'>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">E - 417</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onHide}></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Status<span className="badge bg-primary rounded-pill">OCCUPIED</span></li>
                                <li className="list-group-item">Accomodation<span className="text-primary fw-600">3 sharing</span></li>
                                <li className="list-group-item">Vacancies<span className="text-danger fw-600">0</span></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
