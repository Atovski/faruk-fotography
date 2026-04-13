import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token gereklidir.' }, { status: 400 });
    }

    // Validate UUID format to prevent injection
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(token)) {
      return NextResponse.json({ error: 'Geçersiz token formatı.' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // 1. Find gallery by access_token
    const { data: gallery, error: galleryError } = await supabase
      .from('film_galleries')
      .select('*')
      .eq('access_token', token)
      .single();

    if (galleryError || !gallery) {
      return NextResponse.json({ error: 'Galeri bulunamadı veya bağlantı geçersiz.' }, { status: 404 });
    }

    // 2. Fetch photos
    const { data: photos, error: photosError } = await supabase
      .from('gallery_photos')
      .select('id, file_name, public_url, created_at')
      .eq('gallery_id', gallery.id)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (photosError) {
      return NextResponse.json({ error: 'Fotoğraflar yüklenirken bir sorun oluştu.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      gallery: {
        id: gallery.id,
        film_type: gallery.film_type,
        status: gallery.status,
        created_at: gallery.created_at,
      },
      photos: photos || [],
    });

  } catch (error) {
    console.error('Magic Link API Error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
