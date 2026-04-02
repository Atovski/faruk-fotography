import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { HiUserGroup, HiPhotograph, HiFilm } from 'react-icons/hi';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const supabase = createServerSupabaseClient();
  
  const { count: gCount } = await supabase
    .from('film_galleries')
    .select('*', { count: 'exact', head: true });

  const { count: pCount } = await supabase
    .from('gallery_photos')
    .select('*', { count: 'exact', head: true });

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Yönetici Özeti</h1>
        <p style={{ color: '#888' }}>Faruk Fotoğrafçılık platformunun genel durumu</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <div style={{ background: '#1B2A4A', padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '32px', color: '#C8A45C' }}><HiPhotograph /></div>
          <div>
            <span style={{ fontSize: '14px', color: '#888' }}>Toplam Galeri</span>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff' }}>{gCount || 0}</div>
          </div>
        </div>
        
        <div style={{ background: '#1B2A4A', padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '32px', color: '#5B9BD5' }}><HiFilm /></div>
          <div>
            <span style={{ fontSize: '14px', color: '#888' }}>Yüklenen Fotoğraf</span>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff' }}>{pCount || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
