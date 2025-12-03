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
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">🎬</div>
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
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
