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

export type SearchShows = {
  adult: boolean | undefined;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string | undefined;
  original_name: string | undefined;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  first_air_date: string;
  title: string | undefined;
  name: string | undefined;
  origin_country: string[];
  video: boolean;
  vote_average: number;
  vote_count: number;
}

