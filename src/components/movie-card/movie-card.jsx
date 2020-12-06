import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world which, in this case, is `MainView`, as `MainView` is what’s connected to your database via the movies endpoint of your API
    const { movie, onClick } = this.props;

    return (
      <Col> 
        <CardGroup style={{width: '24rem'}}>
          <Card>
            <Card.Img variant='top' src={movie.ImagePath}/>
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Button className='movie-card-button' onClick={() => onClick(movie)} variant='link'>MORE</Button>
            </Card.Body>
          </Card>
          {/* <Card style={{width: '16rem'}}>
            <Card.Img variant='top' src={movie.ImagePath}/>
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Button className='movie-card-button' onClick={() => onClick(movie)} variant='link'>MORE</Button>
            </Card.Body>
          </Card>
          <Card style={{width: '16rem'}}>
            <Card.Img variant='top' src={movie.ImagePath}/>
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Button className='movie-card-button' onClick={() => onClick(movie)} variant='link'>MORE</Button>
            </Card.Body>
          </Card> */}
        </CardGroup>
      </Col>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};