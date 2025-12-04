'use client';

import Link from 'next/link';
import { moods } from '@/lib/moods';
import { Mood } from '@/types';

interface MoodSelectorProps {
  onMoodSelect?: (mood: Mood) => void;
}

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
      {moods.map((mood) => (
        <Link
          key={mood.id}
          href={`/results?mood=${mood.id}`}
          onClick={() => onMoodSelect?.(mood)}
          className="group relative p-3 sm:p-5 rounded-lg bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 active:bg-neutral-800 transition-all focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl">{mood.emoji}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm sm:text-base text-neutral-100 group-hover:text-purple-400 transition-colors">
                {mood.label}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 line-clamp-2 hidden sm:block">
                {mood.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
