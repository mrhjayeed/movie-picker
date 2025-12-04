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
      <section className="py-8 border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-semibold text-neutral-100 mb-4">
            Search Movies
          </h1>
          
          <div className="max-w-md">
            <SearchBar
              initialValue={query}
              autoFocus
              placeholder="Search for any movie..."
              navigateOnSearch={true}
            />
          </div>
          
          {query && movies.length > 0 && (
            <p className="text-sm text-neutral-500 mt-3">
              {movies.length} results for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="container mx-auto px-4 py-8">
        {!query ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-neutral-500">
              Enter a movie title to search
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <Button onClick={() => searchMovies(query, 1)} variant="outline" size="sm">Try Again</Button>
          </div>
        ) : isLoading && movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent mb-3" />
            <p className="text-sm text-neutral-500">Searching...</p>
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

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
