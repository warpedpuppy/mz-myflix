import React from 'react'; 
import axios from 'axios'; 
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {ProfileView} from '../profile-view/profile-view';

import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Container, Grid, Row, Col} from 'react-bootstrap/Container';
import {Navbar} from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

export class MainView extends React.Component {
  
  constructor() {
    super();
    this.state = { // Initial state set to null
      movies: [],
      selectedMovie: null,
      user: null
    };
  }
 
  // One of the hooks available in a React Component
 componentDidMount() {
   let accessToken = localStorage.getItem('token');
   if (accessToken !== null) {
     this.setState({
       user: localStorage.getItem('user')
     });
     this.getMovies(accessToken);
   }
 }

//  When a movie is clicked, this function is called and updated the state of the SelectedMovie property to that movie
//  onMovieClick(movie) {
//    this.setState({
//      selectedMovie: movie
//    });
//  }

 getMovies(token) {
   // axios.get('http://localhost:8080/movies')
   axios.get('https://radiant-journey-16913.herokuapp.com/movies', {
     headers: { Authorization: `Bearer ${token}`}
   })
   .then(response => { //Assign the result to the state
     this.setState({
       movies: response.data
     });
   })
   .catch(function (error) {
     console.log(error);
   });
 }

 /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
 onLoggedIn(authData) {
   console.log(authData);
   this.setState({
     user: authData.user.Username
   });

   localStorage.setItem('token', authData.token);
   localStorage.setItem('user', authData.user.Username);
   this.getMovies(authData.token);
 }

 onLoggedOut() {
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   this.setState({
     user: null
   })
 }

//  returnHome = (e) => {
//    e.preventDefault()
//    this.setState({
//      selectedMovie: undefined
//    });
//  }

 render() {   
  // If the state isn't initialized, this will throw on runtime before the data is initially loaded
  const {movies, selectedMovie, user} = this.state;

  // Registration component
  // if (!user) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />;
   
  // /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView*/
 
    // Before the movies have been loaded
    if (!movies) return <div className='main-view' />; 

    // if (selectedMovie) return <MovieView returnHome={this.returnHome} movie={selectedMovie}/>
   
    return ( /*If the state of `selectedMovie` is not null, that selected movie will be returned. otherwise, all movies will be returned*/
      <Router>
        <div className='main-view'>
        <Link to = {`/profile`}>
          <Button className='nav-button' variant='link'>PROFILE</Button>
        </Link>
        <Link to = {`/`}>
          <Button className='nav-button' variant='link'>HOME</Button>
        </Link>
        <Link to = {`/`}>
          <Button className='nav-button' variant='link' //onClick=
          >Logout</Button>
        </Link>
          <Route exact path='/' render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m} /> )
          }} />
          <Route path='/register' render={() => <RegistrationView /> 
          } />
          <Route path='/profile' render={() => <ProfileView/ >
          } />
          <Route exact path='/movies/:movieId' render={
            ({match}) => <MovieView movie={movies.find(
            m => m._id === match.params.movieId)}/> 
          } />
          <Route exact path='/genres/:name' render={({match}) => {
            if (!movies) <div className='main-view' />;
            return <GenreView genre={movies.find(m =>
            m.Genre.Name === match.params.name).Genre} /> }
          } />
          <Route exact path='/directors/:name' render={({match}) => {
            if (!movies) <div className='main-view' />; 
            return <DirectorView director={movies.find(m => 
            m.Director.Name === match.params.name).Director} />}
          } />
        </div>
      </Router>
    );
  }
}


