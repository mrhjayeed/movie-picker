'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Movie, TMDBMovieResponse } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';
import MovieGrid from '@/components/MovieGrid';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/ui/Button';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const { favoriteIds, toggleFavorite } = useFavorites();

  const searchMovies = useCallback(async (searchQuery: string, pageNum: number = 1) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        query: searchQuery,
        page: pageNum.toString(),
      });
      
      const response = await fetch(`/api/movies?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to search movies');
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
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query) {
      searchMovies(query, 1);
    } else {
      setMovies([]);
    }
  }, [query, searchMovies]);

  const loadMore = () => {
    if (query && page < totalPages) {
      searchMovies(query, page + 1);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to moods
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🔍</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Search Movies
            </h1>
          </div>
          
          <div className="max-w-xl">
            <SearchBar
              initialValue={query}
              autoFocus
              placeholder="Search for any movie..."
              navigateOnSearch={true}
            />
          </div>
          
          {query && movies.length > 0 && (
            <p className="text-white/80 mt-4">
              Found {movies.length} results for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="container mx-auto px-4 py-8">
        {!query ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold mb-2">Search for movies</h2>
            <p className="text-gray-400 text-center max-w-md">
              Enter a movie title above to find what you&apos;re looking for
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={() => searchMovies(query, 1)}>Try Again</Button>
          </div>
        ) : isLoading && movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4" />
            <p className="text-gray-400">Searching...</p>
          </div>
        ) : (
          <>
            <MovieGrid
              movies={movies}
              onFavoriteToggle={toggleFavorite}
              favorites={favoriteIds}
              emptyMessage={`No movies found for "${query}"`}
            />

            {movies.length > 0 && page < totalPages && (
              <div className="text-center mt-8">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  size="lg"
                  isLoading={isLoading}
                >
                  Load More Results
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
