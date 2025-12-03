// Movie type from TMDB API
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

// Extended movie details from TMDB
export interface MovieDetails extends Movie {
  runtime: number | null;
  genres: Genre[];
  tagline: string | null;
  budget: number;
  revenue: number;
  status: string;
  production_companies: ProductionCompany[];
  spoken_languages: SpokenLanguage[];
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  videos?: {
    results: Video[];
  };
  similar?: {
    results: Movie[];
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

// Mood configuration
export interface Mood {
  id: string;
  emoji: string;
  label: string;
  description: string;
  color: string;
  genreIds: number[];
  keywords?: number[];
  sortBy?: string;
  voteAverageMin?: number;
}

// TMDB API response types
export interface TMDBMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Favorites
export interface Favorite {
  id: string;
  user_id: string;
  movie_id: number;
  movie_title: string;
  movie_poster: string | null;
  created_at: string;
}

// User type for Supabase auth
export interface User {
  id: string;
  email: string;
  created_at: string;
}

// API error response
export interface APIError {
  message: string;
  status: number;
}
