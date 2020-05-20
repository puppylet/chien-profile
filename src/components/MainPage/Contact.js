import React, {useState} from 'react'
import ContactForm from './About/ContactForm'
import { Modal } from 'react-bootstrap'
import SuccessIcon from '../common/SuccessIcon'

export default () => {
  const [success, setSuccess] = useState(false)

  const handleClose = () => setSuccess(false)

  const handleSuccess = () => {
    setSuccess(true)
    setTimeout(setSuccess, 5000)
  }

  return <section className='section contact pb-70' id='contact'>
    <div className='container'>
      <div className='row mb-50'>
        <div className='col-md-12'>
          <div className='section-title'>
            <h2 className='text-dark mb-0'>Contact Me</h2>
            <p className='text-muted mb-0'>Feel Free To Contact Me Any Time </p>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-6'>
          <ContactForm onSuccess={handleSuccess} />
        </div>
        <div className='col-lg-6'>
          <h5 className='text-dark'>Let's talk about everything!</h5>
          <p className='text-dark mb-30'>Hey, I know this lengthy letter cannot describe my awesomeness.
            So if you have any more questions, feel free to let me know.
            You will get my answer sooner than you think.</p>
          <div className='contact-info'>
            <div className='item mb-20'>
              <p className='text-dark mb-0'><i className='fas fa-phone base-color' />+84 32 737 8918</p>
            </div>
            <div className='item mb-20'>
              <p className='text-dark mb-0'><i className='fas fa-envelope base-color'> </i> me@chiendezign.info</p>
            </div>
            <div className='item mb-20'>
              <p className='text-dark mb-0'><i
                className='fas fa-map-marker-alt base-color'> </i>Thuan An, Binh Duong, Vietnam</p>
            </div>
            <div className='item'>
              <p className='text-dark mb-0'><i className='fab fab fa-skype base-color'> </i>chiendezign</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal show={success} onHide={handleClose}>
      <Modal.Body>
        <SuccessIcon />
        <h6 className="text-center base-color">Thanks for your info! <br />
          You will get my reply soon.
        </h6>
      </Modal.Body>
    </Modal>
  </section>
}
