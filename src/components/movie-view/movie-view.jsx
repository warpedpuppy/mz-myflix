import React from 'react'; 
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import {Container, Grid, Row, Col} from 'react-bootstrap/Container';

export class MovieView extends React.Component {

  render () {
    const {movie} = this.props; //returnHome

    // next return wont run if this is true
    if(!movie) return null;

    return(

      <div className='movie-view'>
        <img className='movie-poster' src= {movie.ImagePath} />
        <div className='movie-title'>
          <span className='label'><h3>Title</h3> </span>
          <span className='value'>{movie.Title}</span>
        </div>
        <div className='movie-description'>
          <span className='label'><h3>Genre</h3> </span>
          <span className='value'>{movie.Genre.Name}</span>
        </div>
        <div className='movie-genre'>
          <span className='label'><h3>Description</h3> </span>
          <span className='value'>{movie.Description}</span>
        </div>
        <div className='movie-director'>
          <span className='label'><h3>Director</h3> </span>
          <span className='value'>{movie.Director.Name}</span>
        </div>

        <div>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button className='movie-view-button' variant='link'>DIRECTOR</Button>          
          </Link>
        </div>
        <div>
          <Link to={`genres/${movie.Genre.Name}`}>
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


// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string
//     }).isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.string,
//       Death: PropTypes.string
//     }).isRequired,
//     ImagePath: PropTypes.string.isRequired
//   }).isRequired,
//   returnHome: PropTypes.func.isRequired
// };