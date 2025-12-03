'use client';

import { useState, useCallback, useEffect } from 'react';
import { Movie } from '@/types';

interface FavoriteItem {
  movieId: number;
  title: string;
  posterPath: string | null;
  addedAt: string;
}

interface UseFavoritesReturn {
  favorites: FavoriteItem[];
  favoriteIds: number[];
  isLoading: boolean;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;
  clearFavorites: () => void;
}

const STORAGE_KEY = 'moodflix-favorites';

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoading]);

  const favoriteIds = favorites.map((f) => f.movieId);

  const isFavorite = useCallback(
    (movieId: number) => favoriteIds.includes(movieId),
    [favoriteIds]
  );

  const addFavorite = useCallback((movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.movieId === movie.id)) {
        return prev;
      }
      return [
        ...prev,
        {
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          addedAt: new Date().toISOString(),
        },
      ];
    });
  }, []);

  const removeFavorite = useCallback((movieId: number) => {
    setFavorites((prev) => prev.filter((f) => f.movieId !== movieId));
  }, []);

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    favoriteIds,
    isLoading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
}
