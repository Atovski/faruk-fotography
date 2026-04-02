import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const supabase = createServerSupabaseClient();
  
  const formData = await req.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 });
  }
  
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  const filePath = `product-images/${fileName}`;
  
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const { error: uploadError } = await supabase.storage
    .from('products')
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });
  
  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }
  
  const { data: publicUrlData } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);
  
  return NextResponse.json({ url: publicUrlData.publicUrl });
}
