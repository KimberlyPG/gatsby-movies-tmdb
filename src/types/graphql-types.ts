type PosterPath  = {
  original: string;
}

export type PopularMovies = {
  id: string;
  tmdbId: string;
  adult: boolean;
  homepage: string;
  name: string
  overview: string;
  poster_path: PosterPath;
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
  poster_path: PosterPath;
  first_air_date: Date;
  original_language: string;
  vote_count: number;
}

export type SearchMovies = {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export type SearchTv = {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}
