import { Movie, MovieDetails, TMDBMovieResponse } from '@/types';

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string | null, size: 'w200' | 'w300' | 'w500' | 'w780' | 'original' = 'w500'): string => {
  if (!path) {
    return '/images/no-poster.svg';
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string => {
  if (!path) {
    return '';
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

interface DiscoverParams {
  genreIds?: number[];
  page?: number;
  sortBy?: string;
  voteAverageMin?: number;
  voteCountMin?: number;
  year?: number;
}

// Server-side TMDB API calls
export async function discoverMovies(params: DiscoverParams): Promise<TMDBMovieResponse> {
  const {
    genreIds = [],
    page = 1,
    sortBy = 'popularity.desc',
    voteAverageMin,
    voteCountMin = 100,
  } = params;

  const searchParams = new URLSearchParams({
    api_key: TMDB_API_KEY || '',
    page: page.toString(),
    sort_by: sortBy,
    include_adult: 'false',
    include_video: 'false',
    'vote_count.gte': voteCountMin.toString(),
    language: 'en-US',
  });

  if (genreIds.length > 0) {
    searchParams.append('with_genres', genreIds.join('|'));
  }

  if (voteAverageMin) {
    searchParams.append('vote_average.gte', voteAverageMin.toString());
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?${searchParams.toString()}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const searchParams = new URLSearchParams({
    api_key: TMDB_API_KEY || '',
    append_to_response: 'credits,videos,similar',
    language: 'en-US',
  });

  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}?${searchParams.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

export async function searchMovies(query: string, page = 1): Promise<TMDBMovieResponse> {
  const searchParams = new URLSearchParams({
    api_key: TMDB_API_KEY || '',
    query,
    page: page.toString(),
    include_adult: 'false',
    language: 'en-US',
  });

  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?${searchParams.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

export async function getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<TMDBMovieResponse> {
  const searchParams = new URLSearchParams({
    api_key: TMDB_API_KEY || '',
    language: 'en-US',
  });

  const response = await fetch(
    `${TMDB_BASE_URL}/trending/movie/${timeWindow}?${searchParams.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

// Get random movies from a set of results
export function getRandomMovies(movies: Movie[], count: number): Movie[] {
  const shuffled = [...movies].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
