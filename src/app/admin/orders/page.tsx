import { createServerSupabaseClient } from '@/lib/supabase-server';
import OrdersClient from './OrdersClient';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const supabase = createServerSupabaseClient();

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Orders fetch error:', error);
  }

  return <OrdersClient orders={orders || []} />;
}
