import React, {useState} from 'react'; 
import axios from 'axios';
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
    // props.onLoggedIn(username);  // Why do I need this? Works fine without it

    axios.post('https://radiant-journey-16913.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering user')
    });
  }

  return (
    <Form className='login-form'>
      <FormGroup>
        <Form.Label>
          <Form.Control type='text' value={username} placeholder='Username' onChange = {e => 
          setUsername(e.target.value)} />
        </Form.Label>
      </FormGroup>
      <FormGroup>
        <Form.Label>
          <Form.Control type='password' value={password} placeholder='Password' onChange = {e => 
          setPassword(e.target.value)} />
        </Form.Label>
      </FormGroup>
      <FormGroup>
        <Form.Label>
          <Form.Control type='email' value={email} placeholder='Email' onChange = {e => 
          setEmail(e.target.value)} />
        </Form.Label>
      </FormGroup>
      <FormGroup>
        <Form.Label>
          <Form.Control type='date' value={birthday} placeholder='Birthday' onChange = {e => 
          setBirthday(e.target.value)} />
        </Form.Label>
      </FormGroup>
      <FormGroup>
        <Button className='login-button' type='button' onClick={handleSubmit}>REGISTER</Button>
      </FormGroup>
    </Form>
  );
}