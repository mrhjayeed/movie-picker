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

  const fetchMovies = useCallback(async (pageNum: number = 1, currentFilters: FilterValues = {}, isReroll: boolean = false) => {
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
      
      if (pageNum === 1 || isReroll) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      if (pageNum === 1 || isReroll) setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, [mood]);

  // Initial load only when mood changes
  useEffect(() => {
    if (mood) {
      setFilters({});
      fetchMovies(1, {});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    fetchMovies(1, newFilters);
  };

  const loadMore = () => {
    if (page < totalPages && !isLoading) {
      fetchMovies(page + 1, filters);
    }
  };

  const reroll = async () => {
    if (!mood || isLoading) return;
    const maxPage = Math.min(totalPages || 10, 20);
    const randomPage = Math.floor(Math.random() * maxPage) + 1;
    fetchMovies(randomPage, filters, true);
  };

  if (!mood) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-neutral-100 mb-3">No mood selected</h1>
        <p className="text-neutral-500 mb-6">Please select a mood to get recommendations.</p>
        <Link href="/">
          <Button>Pick a Mood</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-8 border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300 mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to moods
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{mood.emoji}</span>
              <div>
                <h1 className="text-xl font-semibold text-neutral-100">
                  {mood.label}
                </h1>
                <p className="text-sm text-neutral-500">{mood.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 relative z-20">
              <MovieFilters onFilterChange={handleFilterChange} isLoading={isLoading} />
              <Button
                onClick={reroll}
                variant="outline"
                size="sm"
                isLoading={isLoading}
                className="shrink-0"
              >
                Shuffle
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="container mx-auto px-4 py-8">
        {error && (
          <div className="text-center py-8">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <Button onClick={() => fetchMovies(1, filters)} variant="outline" size="sm">Try Again</Button>
          </div>
        )}

        {isLoading && movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent mb-3" />
            <p className="text-sm text-neutral-500">Finding movies...</p>
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
                  size="sm"
                  isLoading={isLoading}
                >
                  Load More
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
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent" />
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
