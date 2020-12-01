import React from 'react'; 
import axios from 'axios'; 
import PropTypes from 'prop-types';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {LoginView} from '../login-view/login-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = { // Initial state set to null
      movies: null,
      selectedMovie: null,
      user: null
    };
  }
 // One of the hooks available in a React Component
 componentDidMount() {
  axios.get('http://localhost:8080/movies')
  //  axios.get('https://radiant-journey-16913.herokuapp.com/movies')
   .then(response => {
    //  Assign the result to the state
    this.setState({
      movies: response.data
    });
   })
   .catch(function(error){
     console.log(error);
   });
 }

//  When a movie is clicked, this function is called and updated the state of the SelectedMovie property to that movie
 onMovieClick(movie) {
   this.setState({
     selectedMovie: movie
   });
 }

 onLoggedIn(user) {
   this.setState ({
     user
   });
 }

 render() {   
  // If the state isn't initialized, this will throw on runtime before the data is initially loaded
  const {movies, selectedMovie, user} = this.state;
    // /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView*/
  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
  // Before the movies have been loaded
  if (!movies) return <div className='main-view' />; 

  return ( /*If the state of `selectedMovie` is not null, that selected movie will be returned. otherwise, all movies will be returned*/
    <div className='main-view'> 
      {selectedMovie
        ? <MovieView movie={selectedMovie}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} 
          movie={movie} 
          onClick= {movie => this.onMovieClick(movie)}/>
        ))
      }
     </div>
  );
 }
}

MainView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }).isRequired,
    ImagePath: PropTypes.string.isRequired
    // Featured: PropTypes.bool.isRequired
  }).isRequired, 
  onClick: PropTypes.func.isRequired
};