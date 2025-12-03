'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Pick a Mood', icon: '🎭' },
    { href: '/favorites', label: 'Favorites', icon: '❤️' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">🎬</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MoodFlix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200',
                  isActive(link.href)
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                )}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200',
                    isActive(link.href)
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  )}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
