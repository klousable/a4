import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { registerUser } from "../lib/authenticate";
import { useRouter } from "next/router";

export default function Register() {
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await registerUser(user, password, password2);
      setSuccess(true);
      setWarning("");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setWarning(err.message);
      setSuccess(false);
    }
  }

  return (
    <>
      <br />
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
          <p>Register for an account:</p>
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            id="password2"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>

        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}

        {success && (
          <>
            <br />
            <Alert variant="success">
              Account registered successfully! Redirecting to login...
            </Alert>
          </>
        )}

        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}
