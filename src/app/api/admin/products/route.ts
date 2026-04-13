import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

// GET all products
export async function GET() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, category:category_id(id, name, slug), subcategory:subcategory_id(id, name, slug)')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST create a new product
export async function POST(req: NextRequest) {
  const supabase = createServerSupabaseClient();
  const body = await req.json();
  
  const { name, description, price, image_url, images, category_id, subcategory_id, stock, is_customizable, is_popular } = body;
  
  if (!name || price === undefined) {
    return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
  }
  
  const { data, error } = await supabase
    .from('products')
    .insert({
      name,
      description: description || '',
      price: parseFloat(price),
      image_url: image_url || (images && images.length > 0 ? images[0] : ''),
      images: images || [],
      category_id: category_id || null,
      subcategory_id: subcategory_id || null,
      stock: parseInt(stock) || 0,
      is_customizable: is_customizable || false,
      is_popular: is_popular || false,
    })
    .select()
    .single();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
