import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import {useFormik} from 'formik'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  company: yup.string(),
  message: yup.string()
});

export default ({ handleClose }) => {
  const hireInfo = useFormik({
    validationSchema: schema,
    onSubmit: console.log,
    initialValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    },
  })

  const {values, handleSubmit, handleChange, } = hireInfo
  const {name, email, phone, company, message} = values

  return <>
    <Modal.Body className="form hire-form">
      <h6>Hey, you are falling in love with me, aren't you?</h6>
      <p>Filling out this form is the first step to get me in your team.
        <br />Shhhh! All info you provided is our secret. I'll never share it with anyone else.</p>

      <Form>
        <Form.Group>
          <Form.Control
            value={name}
            name='name'
            onChange={handleChange}
            type="text" placeholder="Full name (required)" />
        </Form.Group>

        <Form.Group>
          <Form.Control value={email} onChange={handleChange} name='email' type="email" placeholder="Email address (required)" />
          <Form.Text className="text-muted">
            Again, I'll never share your info with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Control value={phone} onChange={handleChange} name='phone' type="text" placeholder="Phone number" />
        </Form.Group>

        <Form.Group>
          <Form.Control value={company} onChange={handleChange} name='company' type="text" placeholder="Your company" />
        </Form.Group>

        <Form.Group>
          <Form.Control value={message} onChange={handleChange} name='message' as="textarea" rows="3" placeholder='Your message' />
        </Form.Group>
      </Form>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Send your info
      </Button>
    </Modal.Footer>
  </>
}

