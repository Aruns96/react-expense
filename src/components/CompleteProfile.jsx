
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


const CompleteProfile = () => {
    
  const [fullName, setFullName] = useState('');
  const [profilePhotoURL, setProfilePhotoURL] = useState('');

  const handleSubmit = (e) => {
   
    
   // console.log('Form submitted', { fullName, profilePhotoURL });
        e.preventDefault()
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_WEB_API}`
        fetch(url
            ,{
              method:"POST",
              body:JSON.stringify({
                idToken:localStorage.getItem("token"),
                displayName:fullName,
                photoUrl:profilePhotoURL,
                returnSecureToken:true
              }),
              headers:{
                "Content-Type":"application/json"
              }
            }
          ).then(res=>{
           
            if(res.ok){
               return res.json()
            }else{
              return res.json().then(data=>{
               
                   let errorMessage = "some error occured.."
                   if(data && data.error && data.error.errors[0].message){
                    errorMessage = data.error.errors[0].message
                   }
                  
                   throw new Error(errorMessage)
                
              })
            }
          }).then(data=>{
           
           console.log("data",data)
           console.log("user sucessfully updated")
          })
          .catch(e=> alert(e.message))
        
          setFullName("")
          setProfilePhotoURL("")
        

  };
  return (
    <Container>
    <Row className="mt-4">
          <Col md={{ span: 8, offset: 2 }}>
            <Form onSubmit={handleSubmit}>
              <h2 className="text-center mb-4">Contact Details</h2>
              <Form.Group as={Row} className="mb-3" controlId="formFullName">
                
                <Col sm={9}>
                  <Form.Control 
                    placeholder='name'
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formProfilePhotoURL">
                
                <Col sm={9}>
                  <Form.Control 
                  placeholder="url"
                    type="text" 
                    value={profilePhotoURL}
                    onChange={(e) => setProfilePhotoURL(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Row />
              <Row>
                <Col>
                  <Button variant="secondary" type="submit" className="update-button">
                    Update
                  </Button>
                </Col>
                
              </Row>
            </Form>
          </Col>
        </Row>
     
    </Container>
  )
}

export default CompleteProfile