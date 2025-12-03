'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types';
import { getImageUrl } from '@/lib/tmdb';
import Card from './ui/Card';

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle?: (movie: Movie) => void;
  isFavorite?: boolean;
  showFavoriteButton?: boolean;
}

export default function MovieCard({
  movie,
  onFavoriteToggle,
  isFavorite = false,
  showFavoriteButton = true,
}: MovieCardProps) {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  return (
    <Card hoverable className="group h-full flex flex-col">
      <Link href={`/movie/${movie.id}`} className="flex flex-col h-full">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-gray-900">
          <Image
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Rating badge */}
          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-white">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Favorite button */}
          {showFavoriteButton && onFavoriteToggle && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFavoriteToggle(movie);
              }}
              className={`
                absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200
                ${isFavorite
                  ? 'bg-pink-500 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-pink-500 hover:text-white'
                }
              `}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                className="w-5 h-5"
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Info */}
        <div className="flex-1 p-4">
          <h3 className="font-semibold text-white line-clamp-2 group-hover:text-purple-400 transition-colors">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{releaseYear}</p>
        </div>
      </Link>
    </Card>
  );
}
