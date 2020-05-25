import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ClientItem from './ClientItem'

export default ({ clients }) => <Row className="mt-50">
  <Col md={12}>
    {clients.map((client, index) => <ClientItem
      key={index}
      client={client}
    />)}
  </Col>
</Row>
