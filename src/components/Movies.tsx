import React, { FC } from 'react';
import Carousel from 'react-multi-carousel';

import MovieAndTvCard from './MovieAndTv-card';

import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../utils/carousel_responsive';
import { PopularMovies } from '../types/graphql-types';

type MoviesProps = {
  ok?: boolean;
  error?: boolean;
  movies: PopularMovies[] | undefined;
}

const Movies: FC<MoviesProps> = ({ movies }) => {
  
  return (
    <Carousel responsive={responsive} centerMode={true} >
        {movies && movies.map((item) => (
            <div className="h-full p-3">
              <MovieAndTvCard key={item.tmdbId} data={item} name={item.name} type='movie' />
            </div>
        ))}
    </Carousel>
  )
}

export default Movies;
