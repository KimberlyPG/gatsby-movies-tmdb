import React, {useState, useEffect} from 'react'
import Carousel from 'react-multi-carousel';

import MovieAndTvCard from './MovieAndTv-card';

import 'react-multi-carousel/lib/styles.css';
import { responsive_normal, responsive_large } from '../utils/carousel_responsive';
import { useAppDispatch } from '../app/hooks';
import { addShow } from '../features/showsSlice';

const Movies = ({ movie, type }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addShow(movie));
  }, [])

  console.log("movie", movie)
  return (
    <Carousel responsive={type === 'normal'? responsive_normal: responsive_large} centerMode={true} >
        {movie && movie.map((item) => (
            <div className="h-full p-3">
              <MovieAndTvCard key={item.tmdbId} data={item} name={item.name} type='movie' />
            </div>
        ))}
    </Carousel>
  )
}

export default Movies;