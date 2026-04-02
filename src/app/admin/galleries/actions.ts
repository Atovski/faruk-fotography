'use server';

import { createServerSupabaseClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function createGallery(formData: FormData) {
  const supabase = createServerSupabaseClient();
  
  const phone_number = formData.get('phone_number')?.toString() || '';
  const customer_name = formData.get('customer_name')?.toString() || '';
  const film_type = formData.get('film_type')?.toString() || '';
  
  // Generate random 6-character access code (e.g., A7B4X9)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no confusing I/1/0/O
  let access_code = '';
  for (let i = 0; i < 6; i++) {
    access_code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const { data, error } = await supabase
    .from('film_galleries')
    .insert([{
      phone_number,
      customer_name,
      film_type,
      access_code,
      status: 'ready'
    }])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/galleries');
  return { success: true, data };
}

export async function deleteGallery(id: string) {
  const supabase = createServerSupabaseClient();
  
  const { error } = await supabase
    .from('film_galleries')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/galleries');
  return { success: true };
}

export async function deletePhoto(id: string, storagePath: string) {
  const supabase = createServerSupabaseClient();
  
  // 1. Delete from Storage
  const { error: storageError } = await supabase.storage
    .from('galleries')
    .remove([storagePath]);

  // 2. Delete from Database
  const { error: dbError } = await supabase
    .from('gallery_photos')
    .delete()
    .eq('id', id);

  if (storageError || dbError) {
    return { error: 'Fotoğraf silinirken bir hata oluştu.' };
  }

  // Not strictly revalidating a static path, but forces refresh on clients using this path
  revalidatePath('/admin/galleries');
  return { success: true };
}
