import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Container
} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 

export class GenreView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {movie} = this.props;

    if(!movie) return null;

    console.log('movie = ', movie);

    return (
      <div className= 'genre-view'>
        <Container>
          <div className='genre-name'>{movie.Genre.Name}</div>
          <div className='genre-description'>{movie.Genre.Description}</div>
          <Row>
            <Link to = {`/movies/${movie._id}`}>
              <Button className='back-button' variant='link'>BACK</Button>
            </Link>
          </Row>
        </Container>
      </div>
    )
  }
}