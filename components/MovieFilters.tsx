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
        variant={hasFilters ? 'primary' : 'outline'}
        size="md"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
        {hasFilters && (
          <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
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
          
          {/* Dropdown panel */}
          <div className="absolute right-0 mt-2 w-72 p-4 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-20">
            <h3 className="text-lg font-semibold text-white mb-4">Filter Movies</h3>
            
            {/* Year range */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Release Year</label>
              <div className="flex items-center gap-2">
                <select
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">From</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <span className="text-gray-500">-</span>
                <select
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">To</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Minimum rating */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Minimum Rating: {ratingMin || 'Any'}
              </label>
              <input
                type="range"
                min="0"
                max="9"
                step="0.5"
                value={ratingMin || 0}
                onChange={(e) => setRatingMin(e.target.value === '0' ? '' : e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
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
