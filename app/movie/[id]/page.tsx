import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMovieDetails, getImageUrl, getBackdropUrl } from '@/lib/tmdb';
import Button from '@/components/ui/Button';

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
  const cast = movie.credits?.cast?.slice(0, 8) || [];
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
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div className="relative h-[50vh] md:h-[60vh]">
        {movie.backdrop_path ? (
          <Image
            src={getBackdropUrl(movie.backdrop_path)}
            alt={movie.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-gray-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-48 relative z-10">
        <Link
          href="javascript:history.back()"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Poster */}
          <div className="hidden md:block">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-lg text-purple-400 italic mb-4">
                &ldquo;{movie.tagline}&rdquo;
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-white">{movie.vote_average.toFixed(1)}</span>
                <span>({movie.vote_count.toLocaleString()} votes)</span>
              </div>
              
              {movie.release_date && (
                <span>{formatDate(movie.release_date)}</span>
              )}
              
              <span>{formatRuntime(movie.runtime)}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Director */}
            {director && (
              <div className="mb-6">
                <span className="text-gray-400">Director: </span>
                <span className="text-white font-medium">{director.name}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch Trailer
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {cast.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-800 mb-2">
                    <Image
                      src={getImageUrl(member.profile_path, 'w200')}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-white truncate">{member.name}</p>
                  <p className="text-xs text-gray-500 truncate">{member.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <section className="mt-12 pb-12">
            <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {similarMovies.map((similar) => (
                <Link
                  key={similar.id}
                  href={`/movie/${similar.id}`}
                  className="group"
                >
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 mb-2 transition-transform group-hover:scale-105">
                    <Image
                      src={getImageUrl(similar.poster_path, 'w300')}
                      alt={similar.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-white truncate group-hover:text-purple-400 transition-colors">
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
