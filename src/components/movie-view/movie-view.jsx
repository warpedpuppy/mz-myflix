import Config from '../../config.js';
import React from 'react'; 
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import {Container, Grid, Row, Col} from 'react-bootstrap/Container';

import {ProfileView} from '../profile-view/profile-view';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {
      favouriteMovies: []
    };
  }


  addMovie(movie) {
    const userId = localStorage.getItem('user');
    const token = localStorage.getItem('token'); 

    axios(`${Config.API_URL}/users/${userId}/movies/${movie.id}`, {  
      method: 'POST', 
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      this.setState({
        favouriteMovies: response.data.favouriteMovies
      });
      alert('Movie added to your favourites')
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  render () {
    const {movie} = this.props; //returnHome

    // next return wont run if this is true
    if(!movie) return null;

    return(

      <div className='movie-view'>
        <img className='movie-poster' src= {movie.imagePath} />
        <div className='movie-title'>
          <span className='label'><h3>Title</h3> </span>
          <span className='value'>{movie.title}</span>
        </div>
        <div className='movie-description'>
          <span className='label'><h3>Genre</h3> </span>
          <span className='value'>{movie.genre.name}</span>
        </div>
        <div className='movie-genre'>
          <span className='label'><h3>Description</h3> </span>
          <span className='value'>{movie.description}</span>
        </div>
        <div className='movie-director'>
          <span className='label'><h3>Director</h3> </span>
          <span className='value'>{movie.director.name}</span>
        </div>

        <div>
          <Button className='movie-view-button' onClick={() => 
          this.addMovie(movie)}>
            ADD TO FAVOURITES
          </Button>
        </div>
        <div>
          <Link to={`/directors/${movie.director.name}`}>
            <Button className='movie-view-button' variant='link'>DIRECTOR</Button>          
          </Link>
        </div>
        <div>
          <Link to={`/genres/${movie.genre.name}`}>
            <Button className='movie-view-button' variant='link'>GENRE</Button>
          </Link>
        </div>

        <div className='movie-view'>
          <Link to = {`/`}>
            <Button className='movie-view-button' variant='link'>HOME</Button>
          </Link>
        </div>

      </div>
    );
  }
}


MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string,
      death: PropTypes.string
    }).isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired,
};