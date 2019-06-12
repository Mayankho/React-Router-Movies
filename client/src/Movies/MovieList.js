import React, { Component } from 'react';
import axios from 'axios';
import { Link }from 'react-router-dom';
import MovieCard from './MovieCard.js'

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/movies')
      .then(response => {
        this.setState(() => ({ movies: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  // So  the div classname is rendering the movies
  // It wouldn't make sense to put the link inside the same classname it seems 
  // So best option is to put it inside of the movie details fuctions

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  const { title, director, metascore, stars } = movie;
 
  return (
    <Link to = {`/movies/${movie.id}`}>
      <MovieCard movie={movie }/>
    
    </Link>
  );
}
