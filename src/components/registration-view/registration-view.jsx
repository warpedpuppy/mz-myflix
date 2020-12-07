import React, {useState} from 'react'; 

import { 
  Container, Row, Col, Form, FormGroup, Label, Input, Button
} from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(username, password, email, birthday);
    props.onLoggedIn(username);
  }

  return (
    <Form className='login-form'>
      <FormGroup>
        <label>
          <input type='text' value={username} placeholder='Username' onChange = {e => 
          setUsername(e.target.value)} />
        </label>
      </FormGroup>
      <FormGroup>
        <label>
          <input type='password' value={password} placeholder='Password' onChange = {e => 
          setPassword(e.target.value)} />
        </label>
      </FormGroup>
      <FormGroup>
        <label>
          <input type='email' value={email} placeholder='Email' onChange = {e => 
          setEmail(e.target.value)} />
        </label>
      </FormGroup>
      <FormGroup>
        <label>
          <input type='date' value={birthday} placeholder='Birthday' onChange = {e => 
          setBirthday(e.target.value)} />
        </label>
      </FormGroup>
      <FormGroup>
        <button className='login-button' type='button' onClick={handleSubmit}>REGISTER</button>
      </FormGroup>
    </Form>
  );
}