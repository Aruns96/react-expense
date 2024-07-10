import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SignUp = () => {
    const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_WEB_API}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: confirmPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "some error occured..";
            if (data && data.error && data.error.errors[0].message) {
              errorMessage = data.error.errors[0].message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("data", data);
        console.log("user sucessfully registered");
        history.push('/login')
      })
      .catch((e) => alert(e.message));

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <>
      <h2 className="text-center mb-4">Sign Up</h2>
      <Container className="d-flex align-items-center justify-content-center flex-grow-1">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button className="d-block mx-auto" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;
