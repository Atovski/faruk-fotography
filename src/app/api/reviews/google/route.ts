import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const PLACE_ID = process.env.GOOGLE_PLACE_ID; // The user will need to configure this

  // If environment variables are omitted or missing, we provide a sophisticated mock.
  if (!API_KEY || !PLACE_ID) {
    return NextResponse.json({
      rating: 4.9,
      total_reviews: 145,
      note: 'Mocked data: Please provide GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in .env.local to get live data.',
    });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${API_KEY}`,
      { next: { revalidate: 3600 } } // Cache result for 1 hour to heavily save API costs
    );

    const data = await response.json();

    if (data.status === 'OK' && data.result) {
      return NextResponse.json({
        rating: data.result.rating,
        total_reviews: data.result.user_ratings_total,
      });
    }

    throw new Error('Invalid API response');
  } catch (error) {
    // Fallback on error to ensure frontend UI does not crash
    return NextResponse.json({
      rating: 4.8,
      total_reviews: 140,
      error: 'Failed to fetch live data'
    });
  }
}
