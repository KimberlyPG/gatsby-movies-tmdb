export type PopularMovies = {
  id: string;
  tmdbId: string;
  adult: boolean;
  homepage: string;
  name: string
  overview: string;
  poster_path: string;
  release_date: Date;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

export type PopularShows = {
  id: string;
  homepage: string;
  name: string;
  type: string;
  original_name: string;
  number_of_seasons: number;
  number_of_episodes: number;
  poster_path: string;
  first_air_date: Date;
  original_language: string;
  vote_count: number;
}