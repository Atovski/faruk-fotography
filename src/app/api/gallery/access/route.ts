import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json({ error: 'Telefon numarası ve erişim kodu gereklidir.' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // 1. Check if gallery exists and credentials match
    const { data: gallery, error: galleryError } = await supabase
      .from('film_galleries')
      .select('*')
      .eq('phone_number', phone)
      .eq('access_code', code.toUpperCase())
      .single();

    if (galleryError || !gallery) {
      return NextResponse.json({ error: 'Galeri bulunamadı veya bilgiler hatalı.' }, { status: 404 });
    }

    // 2. Fetch the photos for this gallery
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
        created_at: gallery.created_at
      },
      photos: photos || [] 
    });

  } catch (error) {
    console.error('Gallery Access API Error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
