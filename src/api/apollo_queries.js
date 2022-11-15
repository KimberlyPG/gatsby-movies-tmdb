import {  graphql } from "gatsby";
import { gql } from "@apollo/client";

export const POPULAR_MOVIES = gql`
query{
  popularMovies{
      ok
    error
    movies {
      id
      imdb_id
      adult
      homepage
      name: original_title
      overview
      poster_path
      release_date
      tagline
      vote_average
      vote_count
    }
  }
} 
`;

export const POPULAR_SHOWS = gql`
query{
  popularShows{
      ok
    error
    shows {
      id
      homepage
      name
      type
      original_name
      number_of_seasons
      number_of_episodes
      poster_path
      first_air_date
      original_language
      vote_count
    }
  }
}  
`
export const NOWPLAYING_MOVIES = gql`
  query{
    nowPlayingMovies {
      ok 
      error 
      movies {
        id
        name: original_title
        poster_path
        vote_average
    }
    }
  }  
`