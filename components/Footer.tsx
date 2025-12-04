import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo and tagline */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-neutral-400 hover:text-neutral-100 transition-colors">
              MoodFlix
            </Link>
            <span className="text-neutral-700">·</span>
            <p className="text-sm text-neutral-600">
              Skip the genres. Pick a mood.
            </p>
          </div>

          {/* Credits */}
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <span>
              Powered by{' '}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                TMDB
              </a>
            </span>
            <span className="text-neutral-700">·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
