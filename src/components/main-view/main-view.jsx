import Config from '../../config.js';
import React from 'react'; 
import axios from 'axios'; 
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {ProfileView} from '../profile-view/profile-view';
import MoviesList from '../movies-list/movies-list';
import {setMovies} from '../../actions/actions';
import {setUser} from '../../actions/actions';

import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Container, Grid, Row, Col} from 'react-bootstrap/Container'
import {Navbar} from 'react-bootstrap/Navbar';


export class MainView extends React.Component {
  
  constructor() {
    super();

    this.state = {
      user: null,
      movies: []
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

 getMovies(token) {
   axios.get(`${Config.API_URL}/movies`, {  
     headers: { Authorization: `Bearer ${token}`}
   })
   .then(response => { //Assign the result to the state
     this.props.setMovies(response.data);
   })
   .catch(function (error) {
     console.log(error);
   });
 }

 getFavouriteMoviesDetails = favouriteMovies => {
   return this.props.movies.filter(movie => favouriteMovies.includes(movie.id));
 }

 /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
 onLoggedIn= authData => {
   console.log(authData);
   this.setState({
     user: authData.user.Username
   });

   localStorage.setItem('token', authData.token);
   localStorage.setItem('user', authData.user.Username);
   this.getMovies(authData.token);
 }

  onLoggedOut = () => {
    // e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

 render() {   

  let {movies} = this.props;
  let {user} = this.state;
 
    // Before the movies have been loaded
    if (!movies) return <div className='main-view' />; 
   
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
          <Button className='nav-button' variant='link' onClick={this.onLoggedOut.bind(this)}
          >LOGOUT</Button>
        </Link>
          <Route exact path='/' render={() => {
            console.log('user= ' ,user);
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return <MoviesList movies={movies} />; 
          }} />
          <Route path='/register' render={() => <RegistrationView /> 
          } />
          <Route path='/profile' render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <ProfileView getFavouriteMoviesDetails={this.getFavouriteMoviesDetails} / >
          }
          } />
          <Route exact path='/movies/:movieId' render={
            ({match}) => <MovieView movie={movies.find(
            m => m.id === match.params.movieId)}/> 
          } />
          <Route exact path='/genres/:name' render={({match}) => {
            if (!movies) return <div className='main-view' />;
            return <GenreView movie={movies.find(m => 
            m.genre.name === match.params.name)} /> }
            } />
          <Route exact path='/directors/:name' render={({match}) => {
            if (!movies) return <div className='main-view' />; 
            return <DirectorView movie={movies.find(m => 
            m.director.name === match.params.name)} />}
          } />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {movies: state.movies, user: state.user}
}

export default connect(mapStateToProps, {setMovies, setUser})(MainView);



