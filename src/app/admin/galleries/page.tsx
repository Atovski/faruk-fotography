import { createServerSupabaseClient } from '@/lib/supabase-server';
import GalleriesClient from './GalleriesClient';

export const dynamic = 'force-dynamic';

export default async function GalleriesPage() {
  const supabase = createServerSupabaseClient();
  
  const { data: galleries, error } = await supabase
    .from('film_galleries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching galleries:', error.message);
  }

  return <GalleriesClient galleries={galleries || []} />;
}
