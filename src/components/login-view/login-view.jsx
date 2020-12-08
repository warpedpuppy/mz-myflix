import React, {useState} from 'react'; 
import axios from 'axios';
import{RegistrationView} from '../registration-view/registration-view';
import { 
  Button, Container, Row, Col, Form, FormGroup, Label, Input
} from 'react-bootstrap';


export function LoginView(props) {
  const [ username, setUsername ] = useState(''); 
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    
    // Send a request to the server for authentication
    axios.post('https://radiant-journey-16913.herokuapp.com/login', {
      Username: username, /* test111 */
      Password: password  /* $test111 */
 
    })
    .then (response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('user doesnt exist')
    });    
  };

  return (
    <Form className='login-form'>
      <FormGroup controlId='FormBasicUsername'>
        <Form.Label>
          <Form.Control className='user-input' type='text' value={username} placeholder='Username' onChange = {e => 
          setUsername(e.target.value)} />
        </Form.Label>
      </FormGroup>
      <FormGroup controlId='FormBasicPassword'>
        <Form.Label>
          <Form.Control className='password-input' type='password' value={password} placeholder='Password' onChange = {e => 
          setPassword(e.target.value)} />
        </Form.Label>
      </FormGroup>
      <FormGroup>
        <Button className='login-button' type='button' onClick={handleSubmit}>LOGIN</Button>
        <Button className='register-button' type='button'>NEW USER</Button>
      </FormGroup>
    </Form>
  );
}
