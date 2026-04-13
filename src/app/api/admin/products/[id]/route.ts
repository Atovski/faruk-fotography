import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

// PUT update product | DELETE product
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerSupabaseClient();
  const body = await req.json();
  
  const { name, description, price, image_url, images, category_id, subcategory_id, stock, is_active, is_customizable, is_popular } = body;
  
  const { data, error } = await supabase
    .from('products')
    .update({
      name,
      description,
      price: parseFloat(price),
      image_url: image_url || (images && images.length > 0 ? images[0] : ''),
      images: images || [],
      category_id: category_id || null,
      subcategory_id: subcategory_id || null,
      stock: parseInt(stock) || 0,
      is_active: is_active ?? true,
      is_customizable: is_customizable ?? false,
      is_popular: is_popular ?? false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerSupabaseClient();
  
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
