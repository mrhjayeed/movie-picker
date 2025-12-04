'use client';

import { useState } from 'react';
import Button from './ui/Button';

export interface FilterValues {
  yearFrom?: number;
  yearTo?: number;
  ratingMin?: number;
}

interface MovieFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  isLoading?: boolean;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

export default function MovieFilters({ onFilterChange, isLoading }: MovieFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [yearFrom, setYearFrom] = useState<string>('');
  const [yearTo, setYearTo] = useState<string>('');
  const [ratingMin, setRatingMin] = useState<string>('');

  const handleApply = () => {
    onFilterChange({
      yearFrom: yearFrom ? parseInt(yearFrom) : undefined,
      yearTo: yearTo ? parseInt(yearTo) : undefined,
      ratingMin: ratingMin ? parseFloat(ratingMin) : undefined,
    });
  };

  const handleClear = () => {
    setYearFrom('');
    setYearTo('');
    setRatingMin('');
    onFilterChange({});
  };

  const hasFilters = yearFrom || yearTo || ratingMin;

  return (
    <div className="relative">
      {/* Filter toggle button */}
      <Button
        variant={hasFilters ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
        {hasFilters && (
          <span className="ml-0.5 w-4 h-4 text-xs bg-white/20 rounded-full flex items-center justify-center">
            {[yearFrom, yearTo, ratingMin].filter(Boolean).length}
          </span>
        )}
      </Button>

      {/* Filter dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Dropdown panel - full width on mobile */}
          <div className="fixed inset-x-4 top-auto bottom-4 sm:absolute sm:inset-auto sm:right-0 sm:bottom-auto sm:mt-2 w-auto sm:w-72 p-4 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl z-20">
            <h3 className="text-sm font-medium text-neutral-100 mb-3">Filters</h3>
            
            {/* Year range */}
            <div className="mb-4">
              <label className="block text-xs text-neutral-500 mb-1.5">Release Year</label>
              <div className="flex items-center gap-2">
                <select
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-base sm:text-sm text-neutral-100 focus:outline-none focus:border-neutral-600"
                >
                  <option value="">From</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <span className="text-neutral-600">–</span>
                <select
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-base sm:text-sm text-neutral-100 focus:outline-none focus:border-neutral-600"
                >
                  <option value="">To</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Minimum rating */}
            <div className="mb-4">
              <label className="block text-xs text-neutral-500 mb-1.5">
                Min Rating: {ratingMin || 'Any'}
              </label>
              <input
                type="range"
                min="0"
                max="9"
                step="0.5"
                value={ratingMin || 0}
                onChange={(e) => setRatingMin(e.target.value === '0' ? '' : e.target.value)}
                className="w-full h-1.5 bg-neutral-700 rounded-full appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-neutral-600 mt-1">
                <span>Any</span>
                <span>5</span>
                <span>9+</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="flex-1"
                disabled={!hasFilters}
              >
                Clear
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleApply();
                  setIsOpen(false);
                }}
                className="flex-1"
                isLoading={isLoading}
              >
                Apply
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}