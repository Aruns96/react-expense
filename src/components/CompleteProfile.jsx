
import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const CompleteProfile = () => {
    const history = useHistory();
    let userDetails = localStorage.getItem("user")
    let userObj = JSON.parse(userDetails)
    
  const [fullName, setFullName] = useState(userObj.name);
  const [profilePhotoURL, setProfilePhotoURL] = useState(userObj.ptourl);

  useEffect(()=>{
    async function fetchData(){
        try{
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_WEB_API}`

    let response = await fetch(url,{
        method:"POST",
              body:JSON.stringify({
                idToken:localStorage.getItem("token"),
               
              }),
              headers:{
                "Content-Type":"application/json"
              }
    })
    let data = await response.json()
   // console.log(data.users[0].displayName,data.users[0].photoUrl)
    localStorage.setItem("user",JSON.stringify({name:data.users[0].displayName,ptourl:data.users[0].photoUrl}))
}catch(e){
    console.log("error",e)
}
}
fetchData()
     
  },[])
  
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
           alert("user sucessfully updated")
           history.push("/welcome")
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