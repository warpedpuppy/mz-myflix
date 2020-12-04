import React from 'react'; 
import PropTypes from 'prop-types';
import {MainView} from '../main-view/main-view';

export class MovieView extends React.Component {
  
  constructor() {
    super();
    this.state = {
      visible: true
    };
  }

  render () {
    const {movie, onClick} = this.props;
    const {visible} = this.state

    // next return wont run if this is true
    if(!movie) return null;
    if(!visible) return <MainView/>

    return(

      <div className='movie-view'>
        <img className='movie-poster' src= {movie.ImagePath} />
         <div className='movie-title'>
          <span className='label'>Title: </span>
          <span className='value'>{movie.Title}</span>
        </div>
        <div className='movie-description'>
          <span className='label'>Description: </span>
          <span className='value'>{movie.Description}</span>
        </div>
        <div className='movie-genre'>
          <span className='label'>Genre: </span>
          <span className='value'>{movie.Genre.Name}</span>
        </div>
        <div className='movie-director'>
          <span className='label'>Director: </span>
          <span className='value'>{movie.Director.Name}</span>
        </div>

        <div className='movie-view'>
          {<button onClick={() => {
            this.setState({visible: false})
          }}>
            Home Page
          </button>}
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
//       Description: PropTypes.string.isRequired
//     }).isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.string.isRequired,
//       Death: PropTypes.string
//     }).isRequired,
//     ImagePath: PropTypes.string.isRequired
//     // Featured: PropTypes.bool.isRequired
//   }).isRequired, 
//   onClick: PropTypes.func.isRequired
// };