import React, {useState} from 'react'; 
import axios from 'axios'; 
import PropTypes from 'prop-types'; 
import {
  Form, Button, Container, Row, Col, Card, CardGroup
} from 'react-bootstrap'; 
import {Link} from 'react-router-dom';

export class ProfileView extends React.Component {

  constructor(props){
    super();

    this.username = undefined;
    this.password = undefined;
    this.email = undefined;

    this.state = {
      user: null,
      username: '',
      password: '',
      email: '',
      favouriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');

    axios.get(`https://radiant-journey-16913.herokuapp.com/users/:username`, { //${username}
      headers: { Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      this.setState({
        username: response.data.username,
        password: response.data.password,
        email: response.data.email,
        favouriteMovies: response.data.favouriteMovies
      });
    })
    .catch (function (error) {
      console.log(error);
    });
  }

  handleUpdate = (e) => {

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://radiant-journey-16913.herokuapp.com/users/:username`, {
      username: this.username,
      password: this.password,
      email: this.email
    },
    { headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      const data = response.data;
      localStorage.setItem('user', data.username);
      window.open('/users', '_self');
      console.log('Succesful update');
    })
    .catch((e) => {
      console.log(e);
    });
  };

  handleDeregistration = (e) => {

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://radiant-journey-16913.herokuapp.com/users/:username`, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      const data = response.data;
      window.open('/', '_self');
      console.log('Succesful deregister');
    })
    .catch((e) => {
      console.log('unable to deregister')
    });

    this.setState({
      user: null
    });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  removeItem(movie) {

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://radiant-journey-16913.herokuapp.com/users/:username/movies/:movie`, { //${movie}
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      this.setState({
        favouriteMovies: response.data.favouriteMovies
      });
    })
    .catch(function (error) {
      console.log(error)
    });
    console.log('movie removed from favourite movies'); 
  }

  setUsername(input) {
    this.username = input;
  }

  setPassword(input) {
    this.password = input;
  }

  setEmail(input) {
    this.email = input;
  }

  render() {

    const movies = this.props.movies; 
    const username = this.state.username, 
      email = this.state.email,
      favouriteMovies = this.state.favouriteMovies;

    console.log(favouriteMovies);

    return (

      <div className='profile-view'>
        
      </div>

    )
  }

}