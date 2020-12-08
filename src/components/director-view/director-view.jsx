import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Container
} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 

export class DirectorView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render () {

    const {movie} = this.props;

    if(!movie) return null; 

    return (

      <div className='director-view'>
        <Container>
          <div className='director-name'>{movie.Director.Name}</div>
          <div className='director-bio'>{movie.Director.Bio}</div>
          <div className='director-birth'>{movie.Director.Birth}</div>
          <div className='director-death'>{movie.Director.Death}</div>
        </Container>
        <div>
          <Link to = {`/movies/${movie._id}`}>
            <Button className='back-button' variant='link'>BACK</Button>
          </Link>
        </div>
      </div>
    );
  }
}