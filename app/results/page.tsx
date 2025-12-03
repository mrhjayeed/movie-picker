'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getMoodById } from '@/lib/moods';
import { useFavorites } from '@/hooks/useFavorites';
import { Movie, TMDBMovieResponse } from '@/types';
import MovieGrid from '@/components/MovieGrid';
import MovieFilters, { FilterValues } from '@/components/MovieFilters';
import Button from '@/components/ui/Button';

function ResultsContent() {
  const searchParams = useSearchParams();
  const moodId = searchParams.get('mood');
  const mood = moodId ? getMoodById(moodId) : null;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<FilterValues>({});
  
  const { favoriteIds, toggleFavorite } = useFavorites();

  const fetchMovies = useCallback(async (pageNum: number = 1, currentFilters: FilterValues = {}) => {
    if (!mood) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        moodId: mood.id,
        page: pageNum.toString(),
      });
      
      if (currentFilters.yearFrom) {
        params.append('yearFrom', currentFilters.yearFrom.toString());
      }
      if (currentFilters.yearTo) {
        params.append('yearTo', currentFilters.yearTo.toString());
      }
      if (currentFilters.ratingMin) {
        params.append('ratingMin', currentFilters.ratingMin.toString());
      }

      const response = await fetch(`/api/movies?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data: TMDBMovieResponse = await response.json();
      
      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      if (pageNum === 1) setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, [mood]);

  useEffect(() => {
    if (mood) {
      fetchMovies(1, filters);
    }
  }, [mood, fetchMovies, filters]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setPage(1);
  };

  const loadMore = () => {
    if (page < totalPages) {
      fetchMovies(page + 1, filters);
    }
  };

  const reroll = async () => {
    if (!mood) return;
    const randomPage = Math.floor(Math.random() * Math.min(totalPages || 10, 20)) + 1;
    fetchMovies(randomPage, filters);
  };

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

            <div className="flex items-center gap-3">
              <MovieFilters onFilterChange={handleFilterChange} isLoading={isLoading} />
              <Button
                onClick={reroll}
                variant="secondary"
                size="md"
                isLoading={isLoading}
                className="shrink-0"
              >
                🎲 Shuffle
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="container mx-auto px-4 py-8">
        {error && (
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={() => fetchMovies(1, filters)}>Try Again</Button>
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
              emptyMessage="No movies found with these filters. Try adjusting them!"
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
