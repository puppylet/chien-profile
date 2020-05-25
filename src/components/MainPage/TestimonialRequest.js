import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SuccessIcon from '../common/SuccessIcon'
import { useDispatch, useSelector } from 'react-redux'
import TestimonialForm from './TestimonialForm'
export default () => {
  const dispatch = useDispatch()
  const isStranger = useSelector(state => state.user.isStranger)
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setShow(false)
    setSuccess(false)
  }
  const handleShow = () => setShow(true)

  const handleSuccess = () => {
    setSuccess(true)
    setTimeout(setSuccess, 5000)
  }

  const handleStranger = () => {
    dispatch({type: 'GET_USER_INFO', payload: {isStranger: true}})
  }

  return <div id='testimonial_request' className={isStranger ? 'stranger' : ''}>
    <h6>
      Hey, have you been or are you working with me?
      If yes, please let me know how you feel.
    </h6>

    <a className="hide_testimonial_request" href='javascript:' onClick={handleStranger}>I'm stranger. Please hide this.</a>

    <button className='btn btn-custom white width-100' onClick={handleShow}>Give me a testimonial</button>


    <Modal show={success} onHide={handleClose}>
      <Modal.Body>
        <SuccessIcon/>
        <h6 className="text-center base-color">Thanks for thinking about me like that! <br />
          You quote will be displayed after you reload this page.
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
