import React, {useState} from 'react'; 
import axios from 'axios'; 
import PropTypes from 'prop-types'; 
import {
  Form, Button, Container, Row, Col, Card, CardGroup
} from 'react-bootstrap'; 
import {Link} from 'react-router-dom';

export class ProfileView extends React.Component {

  constructor(props) {
    super();

  this.Username = undefined;
  this.Password = undefined;
  this.Email = undefined;

  this.state = {
    user: null,
    Username: '',
    Password: '',
    Email: '',
    Birthday: null,
    FavouriteMovies: []
    };
  }

  componentDidMount() {
    
    const getToken = localStorage.getItem('token');
    this.getUser(getToken);
  }

  getUser(token) {

    const user = localStorage.getItem('user');

    axios.get(`https://radiant-journey-16913.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      this.setState({
        username: response.data.Username,
        password: response.data.Password,
        email: response.data.Email,
        birthday: response.data.Birthday,
        favouriteMovies: response.data.FavouriteMovies
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  // UPDATE USER INFO ---------------------------------------------------------------

  handleUpdate = (e) => {

    const user = localStorage.getItem('user'); 
    const token = localStorage.getItem('token'); 

    axios.put(`https://radiant-journey-16913.herokuapp.com/users/${user}`, {
      username: this.Username,
      password: this.Password,
      email: this.Email,
      birthday: this.Birthday
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      const data = response.data;
      localStorage.setItem('user', data.Username);
      window.open('/users', '_self'); 
      console.log('successful update');
    })
    .catch((e) => {
      console.log(e);
    });
  };

  // DEREGISTER USER -----------------------------------------------------------------

  handleDeregistering = (e) => {

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://radiant-journey-16913.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}, 
    })
    .then((response) => {
      const data = response.data;
      window.open('/', '_self'); 
      alert('Account deleted succesfully');
    })
    .catch((e) => {
      alert('error deregistering user');
    });

    this.setState({
      user: null
    });

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Remove movie from favourite movies -----------------------------------------------

  removeMovie(movie) {

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://radiant-journey-16913.herokuapp.com/users/${user}/movies/${movie._id}`, {
      headers: {Authorization: `Bearer ${token}`}, 
    })
    .then((response) => {
      this.setState({
        favouriteMovies: response.data.favouriteMovies
      });
    })
    .catch(function (error) {
      console.log(error); 
    });
    console.log('movie removed from favourite movies')
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input; 
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  render() {

   const movies = this.props.movies;
   const user = this.state.Username,
         favouriteMovies = this.state.FavouriteMovies; 

    console.log(favouriteMovies);

    return (

      <div className = 'profile-view'>
        <Container>
          <CardGroup>
            <Card>
              <h3>{this.state.username}</h3>
              <h5>{this.state.email}</h5>
              <Button className='delete-button' onClick={() => this.handleDeregistering()}>DELETE ACCOUNT</Button>
            </Card>

            <Card>
              <h3>Edit Profile</h3>
              <Form.Group>
                <Form.Control 
                  type='text' placeholder='Enter new username' name='username' 
                  value={this.username} onChange={(e) => this.setUsername(e.target.vlaue)} />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type='password' placeholder='Enter new password' name='password' 
                  value={this.password} onChange={(e) => this.setPassword(e.target.value)}  />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type='email' placeholder='Enter new email' name='email' 
                  value={this.email} onChange={(e) => this.setEmail(e.target.value)}  />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type='date' placeholder='Enter new birthday' name='birthday' 
                  value={this.birthday} onChange={(e) => this.setBirthday(e.target.value)}  />
              </Form.Group>

              <Button className='login-button' onClick={() => this.handleUpdate()}>UPDATE</Button>
            </Card>

            <Container>
              <Card>
                <h3>Favourite Movies</h3>
                {favouriteMovies.map((movie) => {
                 
                 // LINE BELOW NOT WORKING 
                  if (favouriteMovies.length === 0) return <p>There are no movies in your list.</p>;
                  
                  return (
                    <Card key={movie._id} style={{width: '16rem'}}> 
                      <Card.Img variant='top' src={movie.ImagePath} />
                      <Card.Body>
                        <Link to={`/movies/${movie._id}`}>
                          <Button className='login-button' variant='link'>MORE INFO</Button>
                        </Link>
                        <Button className='login-button' variant='link' onClick={() => this.removeMovie(movie)}>REMOVE FROM</Button>
                      </Card.Body>
                    </Card>
                  )
                })}
              </Card>
            </Container> 

          </CardGroup>
        </Container>
      </div>
    )
  }


}