import { NextRequest, NextResponse } from 'next/server';
import { discoverMovies, searchMovies } from '@/lib/tmdb';
import { getMoodById } from '@/lib/moods';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const moodId = searchParams.get('moodId');
  const query = searchParams.get('query');
  const page = parseInt(searchParams.get('page') || '1', 10);
  
  // Filter parameters
  const yearFrom = searchParams.get('yearFrom');
  const yearTo = searchParams.get('yearTo');
  const ratingMin = searchParams.get('ratingMin');

  try {
    // If there's a search query, use search endpoint
    if (query) {
      const data = await searchMovies(query, page);
      return NextResponse.json(data);
    }

    // If there's a mood ID, fetch movies based on mood
    if (moodId) {
      const mood = getMoodById(moodId);
      
      if (!mood) {
        return NextResponse.json(
          { message: 'Invalid mood ID' },
          { status: 400 }
        );
      }

      const data = await discoverMovies({
        genreIds: mood.genreIds,
        page,
        sortBy: mood.sortBy || 'popularity.desc',
        voteAverageMin: ratingMin ? parseFloat(ratingMin) : mood.voteAverageMin,
        yearFrom: yearFrom ? parseInt(yearFrom) : undefined,
        yearTo: yearTo ? parseInt(yearTo) : undefined,
      });

      return NextResponse.json(data);
    }

    // Default: return popular movies with optional filters
    const data = await discoverMovies({ 
      page,
      voteAverageMin: ratingMin ? parseFloat(ratingMin) : undefined,
      yearFrom: yearFrom ? parseInt(yearFrom) : undefined,
      yearTo: yearTo ? parseInt(yearTo) : undefined,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Movies API error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
