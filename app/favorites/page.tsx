'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { Movie } from '@/types';
import MovieGrid from '@/components/MovieGrid';
import Button from '@/components/ui/Button';

// Hydration-safe mounting check
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function FavoritesPage() {
  const { favorites, favoriteIds, toggleFavorite, clearFavorites, isLoading } = useFavorites();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Convert favorites to Movie format for MovieGrid
  const favoriteMovies: Movie[] = favorites.map((fav) => ({
    id: fav.movieId,
    title: fav.title,
    overview: '',
    poster_path: fav.posterPath,
    backdrop_path: null,
    release_date: '',
    vote_average: 0,
    vote_count: 0,
    genre_ids: [],
    popularity: 0,
    adult: false,
    original_language: '',
    original_title: '',
    video: false,
  }));

  if (!mounted || isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-8 border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-neutral-100">
                Favorites
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                {favorites.length === 0
                  ? 'Movies you love will appear here'
                  : `${favorites.length} movie${favorites.length === 1 ? '' : 's'} saved`}
              </p>
            </div>

            {favorites.length > 0 && (
              <Button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all favorites?')) {
                    clearFavorites();
                  }
                }}
                variant="ghost"
                size="sm"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-neutral-500 mb-4">No favorites yet</p>
            <Link href="/">
              <Button size="sm">Find Movies</Button>
            </Link>
          </div>
        ) : (
          <MovieGrid
            movies={favoriteMovies}
            onFavoriteToggle={(movie) => toggleFavorite(movie)}
            favorites={favoriteIds}
            showFavoriteButton={true}
          />
        )}
      </section>
    </div>
  );
}
