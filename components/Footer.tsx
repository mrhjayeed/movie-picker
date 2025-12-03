import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-gray-900/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🎬</span>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MoodFlix
              </span>
            </Link>
            <p className="text-sm text-gray-500">
              Skip the genres. Pick a mood. Get a movie.
            </p>
          </div>

          {/* Credits */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500">
              Powered by{' '}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                TMDB
              </a>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              © {new Date().getFullYear()} MoodFlix. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
