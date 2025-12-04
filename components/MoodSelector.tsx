'use client';

import Link from 'next/link';
import { moods } from '@/lib/moods';
import { Mood } from '@/types';

interface MoodSelectorProps {
  onMoodSelect?: (mood: Mood) => void;
}

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {moods.map((mood) => (
        <Link
          key={mood.id}
          href={`/results?mood=${mood.id}`}
          onClick={() => onMoodSelect?.(mood)}
          className="group relative p-5 rounded-lg bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{mood.emoji}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-neutral-100 group-hover:text-purple-400 transition-colors">
                {mood.label}
              </h3>
              <p className="text-sm text-neutral-500 mt-0.5 line-clamp-2">
                {mood.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
