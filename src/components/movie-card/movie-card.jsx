import React from 'react';

// export class MovieCard extends React.Component {
//   render (){ // This is given to the <MovieCard/> component by the outer world which, in this case, is `MainView`, as `MainView` is what’s connected to your database via the movies endpoint of your API
//     const { movie, onClick } = this.props;
//     return (
//       <div onClick={() => onClick(movie)} className='movie-card'>
//         {movie.Title}
//       </div>
//     );
//   }
// }

export class MovieCard extends React.Component {
  render (){ // This is given to the <MovieCard/> component by the outer world which, in this case, is `MainView`, as `MainView` is what’s connected to your database via the movies endpoint of your API
    const { movie, onClick } = this.props;
    return (
      <Card style={{width: '22rem'}} className='movie-card'>
        <Card.Img variant='top' src={movie.ImagePath}/>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <button
            onClick={() => onClick(movie)}
            variant='link'
            className='expand-movie'         
          >
            Details
          </button>
        </Card.Body>
      </Card>     
      // <div onClick={() => onClick(movie)} className='movie-card'>
      //   {movie.Title}
      // </div>
    );
  }
}