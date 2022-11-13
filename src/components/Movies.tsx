import React from 'react'
import Carousel from 'react-multi-carousel';

import MovieAndTvCard from './MovieAndTv-card';

import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../utils/carousel_responsive';
import {PopularMoviesType} from "../types/graphql-types"
import { PageProps } from 'gatsby';

type GraphQLResultMovie ={
  popularMovies: {
    ok: boolean;
    error: boolean;
    movies:PopularMoviesType[]
  }
}

const Movies:React.FC<GraphQLResultMovie> = ({ movies }: PopularMoviesType   ) => {
  
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
