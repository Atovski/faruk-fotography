import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: galleryId } = await params;
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // Use original file name but sanitize it for URL safety
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const timestamp = Date.now();
    const storagePath = `${galleryId}/${timestamp}_${safeName}`;

    // Upload to Supabase Storage matching precisely using the buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from('galleries')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Storage error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get the Public URL
    const { data: publicUrlData } = supabase.storage
      .from('galleries')
      .getPublicUrl(storagePath);

    const publicUrl = publicUrlData.publicUrl;

    // Save metadata to gallery_photos table
    const { data: photoData, error: dbError } = await supabase
      .from('gallery_photos')
      .insert({
        gallery_id: galleryId,
        file_name: file.name,
        storage_path: storagePath,
        public_url: publicUrl,
        sort_order: 0
      })
      .select()
      .single();

    if (dbError) {
      console.error('DB Insert error:', dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, photo: photoData });
  } catch (error) {
    console.error('API Parse error:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}
