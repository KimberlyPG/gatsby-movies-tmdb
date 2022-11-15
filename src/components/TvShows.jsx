import React from 'react'
import Carousel from 'react-multi-carousel';

import MovieAndTvCard from './MovieAndTv-card';

import 'react-multi-carousel/lib/styles.css';
import { responsive_normal } from '../utils/carousel_responsive';

const TvShows = ({ tv, type }) => {
  
  return (
    <Carousel responsive={responsive_normal} centerMode={true} >
        {tv && tv.map((item) => (
            <div className="h-full p-3">
              <MovieAndTvCard key={item.tmdbId} data={item} name={item.name} type='tv' />
            </div>
        ))}
    </Carousel>
  )
}

export default TvShows;
