# MoodFlix Project Instructions

## Project Overview
MoodFlix is a mood-based movie recommendation app built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Tech Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- TMDB API for movie data
- Supabase (optional) for auth and favorites

## Key Files
- `lib/moods.ts` - Mood definitions and TMDB genre mappings
- `lib/tmdb.ts` - TMDB API client functions
- `hooks/useMovies.ts` - Movie fetching hook
- `hooks/useFavorites.ts` - Local storage favorites management
- `app/api/movies/route.ts` - API proxy for TMDB (hides API key)

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Environment Variables Required
- `TMDB_API_KEY` - Get from themoviedb.org/settings/api

## Code Conventions
- Use TypeScript interfaces from `types/index.ts`
- Components use 'use client' directive when needed
- API routes use Next.js Route Handlers
- Styling uses Tailwind CSS with custom utility classes
