import React, { useRef, useState } from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e){
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwords do not match')
    }

    const promises = []
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
      history.push('/');
    }).catch(() => {
      setError('Failed to update profile')
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={emailRef} type="email" required defaultValue={currentUser.email}/>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="Leave blank to keep the same"/>
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control ref={passwordConfirmRef} type="password" placeholder="Leave blank to keep the same" />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/">Cancel</Link>
      </div>
    </>
  )
}
