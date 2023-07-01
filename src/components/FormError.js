import React from 'react'

export default function FormError(props) {
    return (
        <div className={'alert alert-' + (props?.status) + ' d-flex align-items-center alert-dismissible fade show'} role="alert">
            <span className='form-error-title'>
                <i className={"result-mark fa " + (props?.status === 'success' ? 'fa-check' : 'fa-exclamation') + " pe-2"}></i>
                {props.value}
            </span>
            {props.dismissable && <span className="fa fa-xmark btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></span>}
        </div>
    )
}
