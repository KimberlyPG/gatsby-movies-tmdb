import React, { FC } from 'react';
import Carousel from 'react-multi-carousel';

import MovieAndTvCard from './MovieAndTv-card';

import 'react-multi-carousel/lib/styles.css';
import { PopularMovies } from '../types/graphql-types';
import { responsive_normal, responsive_large } from '../utils/carousel_responsive';

type MoviesProps = {
  ok?: boolean;
  error?: boolean;
  movie: PopularMovies[] | undefined;
  type:string
}

const Movies: FC<MoviesProps> = ({ movie, type }) => {
  console.log("movies", movie)
  return (
    <Carousel responsive={type === 'normal'? responsive_normal: responsive_large} centerMode={true} >
        {movie && movie.map((item) => (
            <div className="h-full p-3">
              <MovieAndTvCard key={item.tmdbId} data={item} name={item.name} type='movie' posterType={type} />
            </div>
        ))}
    </Carousel>
  )
}

export default Movies;
