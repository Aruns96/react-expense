import React from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <Container fluid >
      <Row className="header-row">
        <Col>
          <h1 className="welcome-text">Welcome to Expense Tracker!!!</h1>
        </Col>
        <Col xs="auto">
          <Alert variant="light" >
            Your profile is Incomplete.
            <Link to="/completeprofile" className="complete-link">Complete now</Link>
          </Alert>
        </Col>
      </Row>
      {/* Add your main content here */}
    </Container>
  )
}

export default Welcome