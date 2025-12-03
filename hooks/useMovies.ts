'use client';

import { useState, useCallback } from 'react';
import { Movie, TMDBMovieResponse } from '@/types';
import { Mood } from '@/types';

interface UseMoviesOptions {
  initialPage?: number;
}

interface UseMoviesReturn {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  fetchMoviesByMood: (mood: Mood) => Promise<void>;
  loadMore: () => Promise<void>;
  reroll: () => Promise<void>;
  reset: () => void;
}

export function useMovies(options: UseMoviesOptions = {}): UseMoviesReturn {
  const { initialPage = 1 } = options;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);

  const fetchMoviesByMood = useCallback(async (mood: Mood) => {
    setIsLoading(true);
    setError(null);
    setCurrentMood(mood);
    setPage(1);

    try {
      const params = new URLSearchParams({
        moodId: mood.id,
        page: '1',
      });

      const response = await fetch(`/api/movies?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data: TMDBMovieResponse = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!currentMood || page >= totalPages || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = page + 1;
      const params = new URLSearchParams({
        moodId: currentMood.id,
        page: nextPage.toString(),
      });

      const response = await fetch(`/api/movies?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch more movies');
      }

      const data: TMDBMovieResponse = await response.json();
      setMovies((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [currentMood, page, totalPages, isLoading]);

  const reroll = useCallback(async () => {
    if (!currentMood) return;

    setIsLoading(true);
    setError(null);

    try {
      // Get a random page
      const randomPage = Math.floor(Math.random() * Math.min(totalPages, 20)) + 1;

      const params = new URLSearchParams({
        moodId: currentMood.id,
        page: randomPage.toString(),
      });

      const response = await fetch(`/api/movies?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data: TMDBMovieResponse = await response.json();
      setMovies(data.results);
      setPage(randomPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [currentMood, totalPages]);

  const reset = useCallback(() => {
    setMovies([]);
    setPage(initialPage);
    setTotalPages(0);
    setError(null);
    setCurrentMood(null);
  }, [initialPage]);

  return {
    movies,
    isLoading,
    error,
    page,
    totalPages,
    fetchMoviesByMood,
    loadMore,
    reroll,
    reset,
  };
}
