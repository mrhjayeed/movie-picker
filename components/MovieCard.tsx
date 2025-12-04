'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types';
import { getImageUrl } from '@/lib/tmdb';

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
    <div className="group rounded-lg bg-neutral-900/50 border border-neutral-800 overflow-hidden hover:border-neutral-700 active:bg-neutral-800/50 transition-all">
      <Link href={`/movie/${movie.id}`} className="flex flex-col h-full">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-neutral-900">
          <Image
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-102"
          />

          {/* Rating badge */}
          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-medium text-neutral-100">
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
                absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-all
                ${isFavorite
                  ? 'bg-purple-500/80 text-white'
                  : 'bg-black/40 text-neutral-300 hover:bg-purple-500/60 hover:text-white'
                }
              `}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                className="w-4 h-4"
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
        </div>

        {/* Info */}
        <div className="p-2 sm:p-3">
          <h3 className="font-medium text-xs sm:text-sm text-neutral-100 line-clamp-2 group-hover:text-purple-400 transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5 sm:mt-1">{releaseYear}</p>
        </div>
      </Link>
    </div>
  );
}
