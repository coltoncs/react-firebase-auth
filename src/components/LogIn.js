import React, { useRef, useState } from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logIn } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e){
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      history.push("/")
    } catch {
      setError('Failed to login to account');
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={emailRef} type="email" required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" required />
            </Form.Group>
            
            <Button disabled={loading} className="w-100" type="submit">Log In</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
