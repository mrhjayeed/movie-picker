# MoodFlix - Mood-Based Movie Picker 🎬

Skip the genres. Pick a mood. Get a movie.

A modern web app that recommends movies based on how you feel, not just traditional genre filters.

## Features

- 🎭 **Mood-Based Selection**: Choose from 8 expressive moods instead of boring genres
- 🎲 **Re-roll Feature**: Not feeling the suggestions? Get a fresh batch instantly
- ❤️ **Favorites**: Save movies you want to watch (stored locally)
- 📱 **Responsive Design**: Works beautifully on desktop and mobile
- 🎬 **Movie Details**: View cast, trailers, and similar movie recommendations
- 🌙 **Dark Theme**: Easy on the eyes for those late-night browsing sessions

## Moods Available

| Mood | What It Means |
|------|---------------|
| 😢 "I want to cry" | Emotional dramas, tearjerkers |
| 🧠 "I want to feel smarter" | Mind-bending thrillers, documentaries |
| 💥 "I want to see things explode" | Action blockbusters, disaster films |
| 😂 "I need to laugh" | Comedies, feel-good films |
| 🌙 "Cozy comfort watch" | Familiar favorites, low-stakes plots |
| 🤯 "Make me question reality" | Sci-fi, psychological thrillers |
| 🏃 "I want to escape" | Fantasy, adventure, world-building |
| 💀 "Scare me" | Horror, suspense |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Movie Data**: TMDB API
- **Database** (optional): Supabase
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd movie-picker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Edit `.env.local` and add your TMDB API key:
   ```env
   TMDB_API_KEY=your_tmdb_api_key_here
   TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
movie-picker/
├── app/
│   ├── layout.tsx            # Root layout with navbar/footer
│   ├── page.tsx              # Home - mood selection
│   ├── globals.css           # Global styles
│   ├── results/
│   │   └── page.tsx          # Movie results based on mood
│   ├── movie/
│   │   └── [id]/
│   │       └── page.tsx      # Individual movie details
│   ├── favorites/
│   │   └── page.tsx          # User's saved favorites
│   └── api/
│       └── movies/
│           └── route.ts      # TMDB API proxy
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── MoodSelector.tsx
│   ├── MovieCard.tsx
│   ├── MovieGrid.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   ├── tmdb.ts               # TMDB API client
│   ├── supabase.ts           # Supabase client
│   ├── moods.ts              # Mood configuration
│   └── utils.ts              # Utility functions
├── hooks/
│   ├── useMovies.ts          # Fetch movies hook
│   └── useFavorites.ts       # Manage favorites hook
├── types/
│   └── index.ts              # TypeScript interfaces
└── public/
    └── images/
        └── no-poster.svg     # Fallback image
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TMDB_API_KEY` | Yes | Your TMDB API key |
| `TMDB_BASE_URL` | No | TMDB API base URL (defaults to v3) |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

## MVP Checklist

- [x] Project setup with Next.js 14 + Tailwind
- [x] TMDB API integration
- [x] Mood selection page
- [x] Results page with movie grid
- [x] Movie detail page
- [x] "Give me another" re-roll button
- [x] Mobile responsive design
- [ ] Deploy to Vercel

## Stretch Goals

- [ ] Supabase auth (Google/GitHub login)
- [ ] Save favorites to database
- [ ] Mood history tracking
- [ ] Share mood + movie on social
- [ ] Dark/light theme toggle
- [ ] Animations with Framer Motion
- [ ] Search functionality
- [ ] Filter by year/rating

## License

MIT

## Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
