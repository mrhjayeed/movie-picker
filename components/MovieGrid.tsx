'use client';

import { Movie } from '@/types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onFavoriteToggle?: (movie: Movie) => void;
  favorites?: number[];
  showFavoriteButton?: boolean;
  emptyMessage?: string;
}

export default function MovieGrid({
  movies,
  onFavoriteToggle,
  favorites = [],
  showFavoriteButton = true,
  emptyMessage = 'No movies found',
}: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-neutral-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onFavoriteToggle={onFavoriteToggle}
          isFavorite={favorites.includes(movie.id)}
          showFavoriteButton={showFavoriteButton}
        />
      ))}
    </div>
  );
}
