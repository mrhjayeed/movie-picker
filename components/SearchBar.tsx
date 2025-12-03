'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  initialValue?: string;
  onSearch?: (query: string) => void;
  navigateOnSearch?: boolean;
}

export default function SearchBar({
  placeholder = 'Search movies...',
  className = '',
  autoFocus = false,
  initialValue = '',
  onSearch,
  navigateOnSearch = true,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  // Debounce search
  useEffect(() => {
    if (!onSearch) return;
    
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query.trim());
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        if (navigateOnSearch) {
          router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
        onSearch?.(query.trim());
      }
    },
    [query, router, navigateOnSearch, onSearch]
  );

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
