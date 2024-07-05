import React from 'react'
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Welcome = () => {
    
    const verifyHandler = async ()=>{
        try{
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_WEB_API}`

    let response = await fetch(url,{
        method:"POST",
              body:JSON.stringify({
                requestType:"VERIFY_EMAIL",
                idToken:localStorage.getItem("token"),
               
              }),
              headers:{
                "Content-Type":"application/json"
              }
    })
    let data = await response.json()
    console.log(data)
}catch(e){
    console.log("error",e)
}
    }
  return (
    <Container fluid >
      <Row className="header-row">
        <Col>
          <h1 className="welcome-text">Welcome to Expense Tracker!!!</h1>
        </Col>
        <Col xs="auto">
          <Alert variant="light" >
            Your profile is Incomplete.
            <Link to="/completeprofile" >Complete now</Link>
          </Alert>
        </Col>
        <Col xs="auto">
           <Button className='btn btn-secondary btn-sm' onClick={verifyHandler}>Verify Email</Button>
        </Col>
      </Row>
     
    </Container>
  )
}

export default Welcome