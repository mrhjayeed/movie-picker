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
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 overflow-hidden bg-gradient-to-br from-pink-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">❤️</span>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Your Favorites
                </h1>
              </div>
              <p className="text-white/80">
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
                variant="secondary"
                size="lg"
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
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
            <p className="text-gray-400 mb-8 text-center max-w-md">
              Start exploring movies and tap the heart icon to save your favorites!
            </p>
            <Link href="/">
              <Button size="lg">Find Movies</Button>
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
