import React, {useState} from 'react'; 
import PropTypes from 'prop-types';
import{RegistrationView} from '../registration-view/registration-view';
import { 
  Container, Row, Col, Form, FormGroup, Label, Input
} from 'react-bootstrap';

import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [ username, setUsername ] = useState(''); 
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
     // Send a request to the server for authentication then call props.onLoggedIn(username) 
     props.onLoggedIn(username);
  };

  return (
    <Form className='login-form'>
      <FormGroup>
        <label>
          <input className='user-input' type='text' value={username} placeholder='Username' onChange = {e => 
          setUsername(e.target.value)} />
        </label>
      </FormGroup>
      <FormGroup>
        <label>
          <input className='password-input' type='password' value={password} placeholder='Password' onChange = {e => 
          setPassword(e.target.value)} />
        </label>
      </FormGroup>
      <FormGroup>
        <Button className='login-button' type='button' onClick={handleSubmit}>LOGIN</Button>
        <Button className='register-button' type='button'>NEW USER</Button>
      </FormGroup>
    </Form>
  );
}
