import { createServerSupabaseClient } from '@/lib/supabase-server';
import GalleryDetailClient from './GalleryDetailClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerSupabaseClient();
  
  // 1. Fetch gallery details
  const { data: gallery, error: galleryError } = await supabase
    .from('film_galleries')
    .select('*')
    .eq('id', id)
    .single();

  if (galleryError || !gallery) {
    return notFound();
  }

  // 2. Fetch existing photos
  const { data: photos, error: photosError } = await supabase
    .from('gallery_photos')
    .select('*')
    .eq('gallery_id', id)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (photosError) {
    console.error('Error fetching photos:', photosError.message);
  }

  // Next.js App Router exposes process.env directly correctly only if it starts with NEXT_PUBLIC to client components.
  // BUT we need the service role key to upload bypassing RLS natively or we use an API route. 
  // It's much safer to use a server action or an API route for uploading, or just expose a presigned URL.
  // For simplicity and to bypass RLS in the client, we will create an API route to handle uploads securely,
  // or use Server Actions. We will pass the IDs to the client.

  return <GalleryDetailClient gallery={gallery} initialPhotos={photos || []} />;
}
