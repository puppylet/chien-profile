import React, { useEffect } from 'react'
import { Form, Button, Modal, Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import {post} from '../../../resource/resourceServices'
import {hiring} from '../../../resource/models'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

const phoneRegExp = /^\+?[\d- ]{8,15}$/

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(phoneRegExp)
})

export default ({ handleClose, loading, onLoadingChanged, showSuccess }) => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user)
  const onSubmit = (data, hireInfo) => {
    const {setFieldValue} = hireInfo
    onLoadingChanged(true)
    post(hiring, data).then(() =>{
      dispatch({type: 'GET_USER_INFO', payload: {...data, sentHiring: true}})
      setTimeout(() => {
        setFieldValue('message', '')
        handleClose()
        onLoadingChanged(false)
        showSuccess()
      }, 1000)
    })
  }

  const hireInfo = useFormik({
    validationSchema: schema,
    onSubmit,
    initialValues: {
      title: 'Mr.'
    }
  })

  const { values, handleSubmit, handleChange, setFieldValue } = hireInfo
  const { name, email, phone, company, message, title } = values

  useEffect(() => {
    setFieldValue('title', userInfo.title)
    setFieldValue('name', userInfo.name)
    setFieldValue('email', userInfo.email)
    setFieldValue('phone', userInfo.phone)
    setFieldValue('company', userInfo.company)
    //eslint-disable-next-line
  }, [userInfo])

  const nameError = hireInfo.errors.name && hireInfo.touched.name
  const emailError =hireInfo.errors.email && hireInfo.touched.email
  const phoneError =hireInfo.errors.phone && hireInfo.touched.phone
  return <>
    <Modal.Body className='form hire-form'>
      <h6>Hey, you are falling in love with me, aren't you?</h6>
      <p>Filling out this form is the first step to get me in your team.
        <br />Shhhh! All info you provided is our secret. I'll never share it with anyone else.</p>

      <Form>
        <Form.Row>
          <Form.Group as={Col} md={3}>

            <Form.Control
              as='select'
              value={title}
              name='title'
              onChange={handleChange}
              type='text' placeholder='Title'>
              <option>Mr.</option>
              <option>Ms.</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md={9}>

            <Form.Control
              isInvalid={nameError}
              value={name}
              name='name'
              onChange={handleChange}
              type='text' placeholder='Full name (required)' />
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Control
            isInvalid={emailError}
            value={email}
            onChange={handleChange}
            name='email' type='email'
            placeholder='Email address (required)' />
          <Form.Text className='text-muted'>
            Again, I'll never share your info with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Control
            isInvalid={phoneError}
            value={phone}
            onChange={handleChange}
            name='phone'
            type='text'
            placeholder='Phone number' />
        </Form.Group>

        <Form.Group>
          <Form.Control
            value={company}
            onChange={handleChange}
            name='company'
            type='text'
            placeholder='Your company' />
        </Form.Group>

        <Form.Group>
          <Form.Control
            value={message}
            onChange={handleChange}
            name='message'
            as='textarea'
            rows='3'
            placeholder='Your message' />
        </Form.Group>
      </Form>

    </Modal.Body>
    <Modal.Footer>
      <Button  className='btn-custom grey'  variant='secondary' onClick={handleClose}>
        Close
      </Button>
      <Button variant='primary'  className='btn-custom'  onClick={handleSubmit} disabled={loading}>
        {loading ? 'Sending...' : 'Send your info'}
      </Button>
    </Modal.Footer>
  </>
}

