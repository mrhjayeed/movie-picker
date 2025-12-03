'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMoodById } from '@/lib/moods';
import { useMovies } from '@/hooks/useMovies';
import { useFavorites } from '@/hooks/useFavorites';
import MovieGrid from '@/components/MovieGrid';
import Button from '@/components/ui/Button';

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const moodId = searchParams.get('mood');
  const mood = moodId ? getMoodById(moodId) : null;

  const { movies, isLoading, error, page, totalPages, fetchMoviesByMood, loadMore, reroll } = useMovies();
  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (mood) {
      fetchMoviesByMood(mood);
    }
  }, [mood, fetchMoviesByMood]);

  if (!mood) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="text-2xl font-bold mb-4">No mood selected</h1>
        <p className="text-gray-400 mb-8">Please select a mood to get movie recommendations.</p>
        <Link href="/">
          <Button>Pick a Mood</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className={`relative py-12 overflow-hidden bg-gradient-to-br ${mood.color}`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Change mood
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{mood.emoji}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {mood.label}
                </h1>
              </div>
              <p className="text-white/80">{mood.description}</p>
            </div>

            <Button
              onClick={reroll}
              variant="secondary"
              size="lg"
              isLoading={isLoading}
              className="shrink-0"
            >
              🎲 Give me different movies
            </Button>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="container mx-auto px-4 py-8">
        {error && (
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={() => mood && fetchMoviesByMood(mood)}>Try Again</Button>
          </div>
        )}

        {isLoading && movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4" />
            <p className="text-gray-400">Finding movies for your mood...</p>
          </div>
        ) : (
          <>
            <MovieGrid
              movies={movies}
              onFavoriteToggle={toggleFavorite}
              favorites={favoriteIds}
              emptyMessage="No movies found for this mood. Try a different one!"
            />

            {/* Load More */}
            {movies.length > 0 && page < totalPages && (
              <div className="text-center mt-8">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  size="lg"
                  isLoading={isLoading}
                >
                  Load More Movies
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
