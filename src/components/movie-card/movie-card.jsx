import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world which, in this case, is `MainView`, as `MainView` is what’s connected to your database via the movies endpoint of your API
    const { movie } = this.props; //onClick = prop 

    return (
      <Col> 
        <CardGroup style={{width: '24rem'}}>
          <Card>
            <Card.Img variant='top' src={movie.ImagePath}/>
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button className='movie-card-button' variant='link'>OPEN</Button>
              </Link>
            </Card.Body>
          </Card>
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
  // onClick: PropTypes.func.isRequired
};