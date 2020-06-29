import React, { useEffect, useState } from 'react'
import { Form, Button, Modal, Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import {post} from '../../resource/resourceServices'
import {testimonial} from '../../resource/models'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

const schema = yup.object({
  name: yup.string().required()
})

export default ({ handleClose, loading, onLoadingChanged, showSuccess }) => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user)
  const [file, setFile] = useState()
  const onSubmit = (data, testimonialInfo) => {
    const {setFieldValue} = testimonialInfo
    onLoadingChanged(true)
    data.relationship = data.relationTime + ' ' + data.relationType
    data.avatar = file
    console.log('data', data)
    post(testimonial, data).then(() =>{
      dispatch({type: 'GET_USER_INFO', payload: {...data, sentTestimonial: true, avatar: undefined}})
      setTimeout(() => {
        setFieldValue('message', '')
        handleClose()
        onLoadingChanged(false)
        showSuccess()
      }, 1000)
    }).catch(error =>{
      console.log(error)
      onLoadingChanged(false)
    })
  }

  const testimonialInfo = useFormik({
    validationSchema: schema,
    onSubmit,
    initialValues: {
      title: 'Mr.',
      name: '',
      position: '',
      company: '',
      message: '',
      relationType: 'customer',
      relationTime: 'former'
    }
  })

  const { values, handleSubmit, handleChange, setFieldValue } = testimonialInfo
  const { name, position, company, message, title, relationTime, relationType } = values

  useEffect(() => {
    setFieldValue('title', userInfo.title)
    setFieldValue('name', userInfo.name)
    setFieldValue('company', userInfo.company)
    //eslint-disable-next-line
  }, [userInfo])

  const handleFileChange = event => {
    const {value, files} = event.target
    const formContent = {fileName: value}
    const reader = new window.FileReader()
    formContent.file = files[0]
    reader.readAsDataURL(files[0])
    reader.onload = () => setFile(reader.result)
  }



  const nameError = testimonialInfo.errors.name && testimonialInfo.touched.name
  return <>
    <Modal.Header>Give Me A Testimonial</Modal.Header>
    <Modal.Body className='form hire-form'>
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
            value={company}
            onChange={handleChange}
            name='company'
            type='text'
            placeholder='Your company' />
        </Form.Group>

        <Form.Group>
          <Form.Control
            value={position}
            onChange={handleChange}
            name='position'
            type='text'
            placeholder='Your position' />
        </Form.Group>

        <strong>You are my</strong>
        <Form.Row>
          <Form.Group as={Col} md={5}>

            <Form.Control
              as='select'
              value={relationTime}
              name='relationTime'
              onChange={handleChange}>
              <option value="former">Former</option>
              <option value="current">Current</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md={7}>

            <Form.Control
              as='select'
              value={relationType}
              name='relationType'
              onChange={handleChange}>
              <option value="customer">Customer</option>
              <option value="boss">Boss</option>
              <option value="teammate">Teammate</option>
              <option value="subordinate">Subordinate</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <b>Your photo</b>
        <Form.Group>
          <Form.Control
            name='message'
            onChange={handleFileChange}
            type='file' />
        </Form.Group>

        <Form.Group>
          <Form.Control
            value={message}
            onChange={handleChange}
            name='message'
            as='textarea'
            rows='3'
            placeholder='Your quote' />
        </Form.Group>
      </Form>

    </Modal.Body>
    <Modal.Footer>
      <Button  className='btn-custom grey'  variant='secondary' onClick={handleClose}>
        Close
      </Button>
      <Button variant='primary'  className='btn-custom'  onClick={handleSubmit} disabled={loading}>
        {loading ? 'Sending...' : 'Send your words'}
      </Button>
    </Modal.Footer>
  </>
}

