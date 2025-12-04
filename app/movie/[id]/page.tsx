import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMovieDetails, getImageUrl, getBackdropUrl } from '@/lib/tmdb';
import Button from '@/components/ui/Button';
import BackButton from '@/components/BackButton';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = parseInt(id, 10);

  if (isNaN(movieId)) {
    notFound();
  }

  let movie;
  try {
    movie = await getMovieDetails(movieId);
  } catch {
    notFound();
  }

  const director = movie.credits?.crew?.find((c) => c.job === 'Director');
  const cast = movie.credits?.cast?.slice(0, 6) || [];
  const trailer = movie.videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );
  const similarMovies = movie.similar?.results?.slice(0, 6) || [];

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div className="relative h-[30vh] sm:h-[40vh] md:h-[50vh]">
        {movie.backdrop_path ? (
          <Image
            src={getBackdropUrl(movie.backdrop_path)}
            alt={movie.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-20 sm:-mt-28 md:-mt-32 relative z-10">
        <BackButton />

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-6">
          {/* Poster - shown on mobile too */}
          <div className="flex justify-center md:block">
            <div className="relative w-32 sm:w-40 md:w-full aspect-[2/3] rounded-lg overflow-hidden">
              <Image
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 160px, 240px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-neutral-100 mb-2">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-sm text-neutral-500 italic mb-4">
                {movie.tagline}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-400 mb-4">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium text-neutral-100">{movie.vote_average.toFixed(1)}</span>
                <span className="text-neutral-500">({movie.vote_count.toLocaleString()})</span>
              </div>
              
              {movie.release_date && (
                <span>{formatDate(movie.release_date)}</span>
              )}
              
              <span>{formatRuntime(movie.runtime)}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-xs"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-sm font-medium text-neutral-400 mb-2">Overview</h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Director */}
            {director && (
              <div className="mb-6 text-sm">
                <span className="text-neutral-500">Director: </span>
                <span className="text-neutral-100">{director.name}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Trailer
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium text-neutral-100 mb-4">Cast</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {cast.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral-800 mb-1.5">
                    <Image
                      src={getImageUrl(member.profile_path, 'w200')}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium text-neutral-100 truncate">{member.name}</p>
                  <p className="text-xs text-neutral-500 truncate">{member.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <section className="mt-10 pb-10">
            <h2 className="text-lg font-medium text-neutral-100 mb-4">Similar Movies</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {similarMovies.map((similar) => (
                <Link
                  key={similar.id}
                  href={`/movie/${similar.id}`}
                  className="group"
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-neutral-800 mb-1.5 transition-all group-hover:ring-1 group-hover:ring-neutral-700">
                    <Image
                      src={getImageUrl(similar.poster_path, 'w300')}
                      alt={similar.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium text-neutral-300 truncate group-hover:text-purple-400 transition-colors">
                    {similar.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
