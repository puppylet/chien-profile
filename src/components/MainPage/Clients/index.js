import React from 'react'
import Testimonials from './Testimonials'
import { Row, Col } from 'react-bootstrap'
import Clients from './Clients'
import { useSelector } from 'react-redux'


export default () => {
  const clients = useSelector(state => state.profile.data.client)
  return <>
    <section className='section testimonials mb-0' id='clients'>
      <div className='container'>
        <Row>
          <Col md={12}>
            <div className='section-title'>
              <h2 className='text-dark mb-0'>My Clients</h2>
              <p className='text-muted mb-0'>Clients that used my products</p>
            </div>
          </Col>
        </Row>

        {clients && <Clients clients={clients} />}
      </div>
    </section>

    <Testimonials />
  </>
}
