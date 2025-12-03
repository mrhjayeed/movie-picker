import { Mood } from '@/types';

// TMDB Genre IDs Reference:
// 28: Action, 12: Adventure, 16: Animation, 35: Comedy, 80: Crime
// 99: Documentary, 18: Drama, 10751: Family, 14: Fantasy, 36: History
// 27: Horror, 10402: Music, 9648: Mystery, 10749: Romance, 878: Sci-Fi
// 10770: TV Movie, 53: Thriller, 10752: War, 37: Western

export const moods: Mood[] = [
  {
    id: 'cry',
    emoji: '😢',
    label: 'I want to cry',
    description: 'Emotional dramas and tearjerkers',
    color: 'from-blue-500 to-indigo-600',
    genreIds: [18, 10749], // Drama, Romance
    voteAverageMin: 7.0,
  },
  {
    id: 'smart',
    emoji: '🧠',
    label: 'I want to feel smarter',
    description: 'Mind-bending thrillers and documentaries',
    color: 'from-purple-500 to-violet-600',
    genreIds: [99, 9648, 878], // Documentary, Mystery, Sci-Fi
    voteAverageMin: 7.5,
  },
  {
    id: 'explode',
    emoji: '💥',
    label: 'I want to see things explode',
    description: 'Action blockbusters and disaster films',
    color: 'from-orange-500 to-red-600',
    genreIds: [28, 12], // Action, Adventure
    sortBy: 'popularity.desc',
  },
  {
    id: 'laugh',
    emoji: '😂',
    label: 'I need to laugh',
    description: 'Comedies and feel-good films',
    color: 'from-yellow-400 to-orange-500',
    genreIds: [35], // Comedy
    voteAverageMin: 6.5,
  },
  {
    id: 'cozy',
    emoji: '🌙',
    label: 'Cozy comfort watch',
    description: 'Familiar favorites and low-stakes plots',
    color: 'from-amber-400 to-yellow-500',
    genreIds: [10751, 35, 16], // Family, Comedy, Animation
    voteAverageMin: 6.5,
  },
  {
    id: 'reality',
    emoji: '🤯',
    label: 'Make me question reality',
    description: 'Sci-fi and psychological thrillers',
    color: 'from-pink-500 to-purple-600',
    genreIds: [878, 53, 9648], // Sci-Fi, Thriller, Mystery
    voteAverageMin: 7.0,
  },
  {
    id: 'escape',
    emoji: '🏃',
    label: 'I want to escape',
    description: 'Fantasy, adventure, and world-building',
    color: 'from-emerald-500 to-teal-600',
    genreIds: [14, 12, 878], // Fantasy, Adventure, Sci-Fi
    voteAverageMin: 6.5,
  },
  {
    id: 'scare',
    emoji: '💀',
    label: 'Scare me',
    description: 'Horror and suspense',
    color: 'from-gray-700 to-gray-900',
    genreIds: [27, 53], // Horror, Thriller
    voteAverageMin: 6.0,
  },
];

export const getMoodById = (id: string): Mood | undefined => {
  return moods.find((mood) => mood.id === id);
};

export const getMoodByGenre = (genreId: number): Mood[] => {
  return moods.filter((mood) => mood.genreIds.includes(genreId));
};
