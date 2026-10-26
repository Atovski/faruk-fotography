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

/**
 * A roll is one film inside a gallery. The customer who posts four rolls gets
 * one link with four folders in it, instead of four links or one heap.
 */
export async function createRoll(galleryId: string, name: string, filmType: string) {
  const supabase = createServerSupabaseClient();

  // New rolls go to the end of the list the owner already has.
  const { data: last } = await supabase
    .from('gallery_rolls')
    .select('sort_order')
    .eq('gallery_id', galleryId)
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data, error } = await supabase
    .from('gallery_rolls')
    .insert({
      gallery_id: galleryId,
      name: name.trim(),
      film_type: filmType.trim() || null,
      sort_order: (last?.sort_order ?? -1) + 1,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/admin/galleries/${galleryId}`);
  return { success: true, data };
}

export async function renameRoll(rollId: string, name: string, filmType: string) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('gallery_rolls')
    .update({ name: name.trim(), film_type: filmType.trim() || null })
    .eq('id', rollId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/galleries');
  return { success: true, data };
}

export async function deleteRoll(rollId: string) {
  const supabase = createServerSupabaseClient();

  // Same trap as deleteGallery: the row cascade drops gallery_photos but leaves
  // the files sitting in Storage, so they have to go first and by hand.
  const { data: photos } = await supabase
    .from('gallery_photos')
    .select('storage_path')
    .eq('roll_id', rollId);

  const paths = (photos || []).map((p) => p.storage_path);
  for (let i = 0; i < paths.length; i += 100) {
    const { error: storageError } = await supabase.storage
      .from('galleries')
      .remove(paths.slice(i, i + 100));
    if (storageError) {
      return { error: storageError.message };
    }
  }

  const { error } = await supabase
    .from('gallery_rolls')
    .delete()
    .eq('id', rollId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/galleries');
  return { success: true };
}

export async function deleteGallery(id: string) {
  const supabase = createServerSupabaseClient();

  // The row delete cascades to gallery_photos but never touches Storage, so
  // the files have to be removed explicitly or they pile up against the quota.
  const { data: photos } = await supabase
    .from('gallery_photos')
    .select('storage_path')
    .eq('gallery_id', id);

  const paths = (photos || []).map((p) => p.storage_path);
  for (let i = 0; i < paths.length; i += 100) {
    const { error: storageError } = await supabase.storage
      .from('galleries')
      .remove(paths.slice(i, i + 100));
    if (storageError) {
      return { error: storageError.message };
    }
  }

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
