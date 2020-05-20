import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SuccessIcon from '../common/SuccessIcon'
import HireForm from './About/HireForm'
import { useSelector } from 'react-redux'
import TestimonialForm from './TestimonialForm'
export default () => {

  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const userInfo = useSelector(state => state.user)

  const handleClose = () => {
    setShow(false)
    setSuccess(false)
  }
  const handleShow = () => setShow(true)

  const handleSuccess = () => {
    setSuccess(true)
    setTimeout(setSuccess, 5000)
  }


  return <div id='testimonial_request'>
    <h6>
      Hey, have you been or are you working with me?
      If yes, please let me know how you feel.
    </h6>

    <button className='btn btn-custom white width-100' onClick={handleShow}>Give me a testimonial</button>


    <Modal show={success} onHide={handleClose}>
      <Modal.Body>
        <SuccessIcon/>
        <h6 className="text-center base-color">Thanks for your info! <br />
          You will get my reply soon.
        </h6>
      </Modal.Body>
    </Modal>
    <Modal show={show} onHide={handleClose}>
      <TestimonialForm
        handleClose={handleClose}
        loading={loading}
        showSuccess={handleSuccess}
        onLoadingChanged={setLoading} />
    </Modal>

  </div>
}
