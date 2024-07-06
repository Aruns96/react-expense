import { Button, Form, Card } from "react-bootstrap";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const sendResetEmailHandler = async () => {
    setLoading(true);
    const req = {
      email: emailRef.current.value,
      requestType: "PASSWORD_RESET",
    };
    try {
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_WEB_API}`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(req),
      });
      const data = await response.json();
      console.log(data);
      alert("check your registerd mail");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);

    history.replace("/login");
  };
  return (
    <Form>
      <Card style={{ width: "30rem" }} className="mx-auto mt-5">
        <Card.Body>
          <Card.Title>Reset Password</Card.Title>
          <Card.Subtitle className="mb-2 text-muted mt-3">
            Enter the email with which you have registered
          </Card.Subtitle>
          <Card.Text>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
          </Card.Text>
          <Button variant="dark" onClick={sendResetEmailHandler}>
            {!loading ? "Send Link" : "Sending.."}
          </Button>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default ForgotPassword;
