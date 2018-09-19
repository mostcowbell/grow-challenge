import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Routes from './Routes'
import 'bootstrap/dist/css/bootstrap.css'

export default () => (
  <Container>
    <Row>
      <Col>
        <h1 className='text-center mb-5 mt-5'>Who's My Representative?</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <Routes />
      </Col>
    </Row>
  </Container>
)
