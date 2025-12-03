'use client';

import Link from 'next/link';
import { moods } from '@/lib/moods';
import { Mood } from '@/types';

interface MoodSelectorProps {
  onMoodSelect?: (mood: Mood) => void;
}

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {moods.map((mood) => (
        <Link
          key={mood.id}
          href={`/results?mood=${mood.id}`}
          onClick={() => onMoodSelect?.(mood)}
          className={`
            group relative overflow-hidden rounded-2xl p-6 md:p-8
            bg-gradient-to-br ${mood.color}
            transition-all duration-300
            hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/20
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
          `}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <span className="text-4xl md:text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">
              {mood.emoji}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
              {mood.label}
            </h3>
            <p className="text-sm text-white/80">
              {mood.description}
            </p>
          </div>

          {/* Hover arrow */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
