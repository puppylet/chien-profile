import React, { useState, useEffect } from 'react'
import { Form, Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import { post } from '../../../resource/resourceServices'
import { contact } from '../../../resource/models'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required()
})

export default ({ onSuccess }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const onSubmit = (data, contactInfo) => {
    const { setFieldValue, setFieldTouched } = contactInfo
    setLoading(true)
    post(contact, data).then(() => setTimeout(() => {
      setFieldValue('message', '')
      setFieldTouched('message', false)
      setFieldValue('subject', '')
      setFieldTouched('subject', false)
      dispatch({ type: 'GET_USER_INFO', payload: { ...data, sentContact: true } })
      onSuccess()
      setLoading()
      }, 1000)
    )
  }

  const contactInfo = useFormik({
    validationSchema,
    onSubmit,
    initialValues: { title: 'Mr.', subject: '', message: '', name: '', email: '' }
  })

  const { values, handleSubmit, handleChange, setFieldValue, resetForm } = contactInfo
  const { name, email, subject, message, title } = values

  const userInfo = useSelector(state => state.user)
  useEffect(() => {
    setFieldValue('title', userInfo.title)
    setFieldValue('name', userInfo.name)
    setFieldValue('email', userInfo.email)
  }, [userInfo])

  const nameError = contactInfo.errors.name && contactInfo.touched.name
  const emailError = contactInfo.errors.email && contactInfo.touched.email
  const subjectError = contactInfo.errors.subject && contactInfo.touched.subject
  const messageError = contactInfo.errors.message && contactInfo.touched.message

  return <Form className='form contact_form'>
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
          type='text' placeholder='Full name' />
      </Form.Group>
    </Form.Row>

    <Form.Group>
      <Form.Control
        isInvalid={emailError}
        value={email}
        onChange={handleChange}
        name='email' type='email'
        placeholder='Email address' />
      <Form.Text className='text-muted'>
        I'll never share your info with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group>
      <Form.Control
        isInvalid={subjectError}
        value={subject}
        onChange={handleChange}
        name='subject'
        type='text'
        placeholder='Subject' />
    </Form.Group>

    <Form.Group>
      <Form.Control
        isInvalid={messageError}
        value={message}
        onChange={handleChange}
        name='message'
        as='textarea'
        rows='3'
        placeholder='Your message' />
      <Form.Text>
        All above fields are required.
      </Form.Text>
      {/*<ErrorMessage name='subject' />*/}
    </Form.Group>

    <button type='button' className='btn-custom grey' onClick={resetForm}>Clear form</button>

    <button type='button' className='btn-custom hire_me' onClick={handleSubmit} disabled={loading}>
      <span>
        {!loading && <i className='fas fa-paper-plane' />}
        {loading && <i className='fa fa-spin fa-spinner' />}
      </span>
      <span> Send Message</span>
    </button>
  </Form>
}

