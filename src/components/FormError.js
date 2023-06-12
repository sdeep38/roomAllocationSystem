import React from 'react'

export default function FormError(props) {
    return (
        <div className={'alert alert-' + (props.status) + ' d-flex align-items-center alert-dismissible fade show'} role="alert">
            <div>
                {props.value}
            </div>
            {/* <span className="fa fa-xmark btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></span> */}
        </div>
    )
}
