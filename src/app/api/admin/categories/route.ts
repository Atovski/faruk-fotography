import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

// GET all categories (flat list, frontend will structure parent/child)
export async function GET() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST create a new category
export async function POST(req: NextRequest) {
  const supabase = createServerSupabaseClient();
  const body = await req.json();
  
  const { name, slug, parent_id, image_url } = body;
  
  if (!name || !slug) {
    return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
  }
  
  const { data, error } = await supabase
    .from('categories')
    .insert({ name, slug, parent_id: parent_id || null, image_url: image_url || '' })
    .select()
    .single();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
