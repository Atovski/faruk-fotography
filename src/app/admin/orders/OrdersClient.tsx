'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Button } from '@/components/ui/Button';
import { HiTruck, HiMail, HiPhone, HiLocationMarker, HiCheck, HiClock, HiX } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const PageHeader = styled.div`
  margin-bottom: 32px;
  h1 { font-size: 30px; font-weight: bold; margin-bottom: 4px; }
  p { color: #888; font-size: 14px; }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ $color: string }>`
  background: #1B2A4A;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid ${({ $color }) => $color};
  .num { font-size: 28px; font-weight: bold; color: #fff; }
  .label { font-size: 13px; color: #888; margin-top: 2px; }
`;

const OrderCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const OrderHeader = styled.div<{ $status: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: ${({ $status }) =>
    $status === 'shipped' ? '#E8F5E9' :
    $status === 'delivered' ? '#E3F2FD' :
    '#FFF8E1'};
  cursor: pointer;
  transition: background 0.2s;
  &:hover { opacity: 0.9; }
`;

const OrderNumber = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  h3 { font-family: ${theme.fonts.heading}; font-size: 16px; color: ${theme.colors.text}; margin: 0; }
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $status }) =>
    $status === 'shipped' ? '#4CAF5020' :
    $status === 'delivered' ? '#5B9BD520' :
    '#C8A45C20'};
  color: ${({ $status }) =>
    $status === 'shipped' ? '#4CAF50' :
    $status === 'delivered' ? '#5B9BD5' :
    '#C8A45C'};
`;

const OrderBody = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => $open ? 'block' : 'none'};
  padding: 20px;
`;

const OrderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const InfoBlock = styled.div`
  h4 { font-size: 13px; color: ${theme.colors.secondary}; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  p { font-size: 14px; color: ${theme.colors.textSecondary}; line-height: 1.6; margin: 0; }
  .value { color: ${theme.colors.text}; font-weight: 500; }
`;

const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  th { text-align: left; padding: 8px 12px; font-size: 12px; color: ${theme.colors.secondary}; border-bottom: 1px solid ${theme.colors.glassBorder}; }
  td { padding: 8px 12px; font-size: 14px; color: ${theme.colors.textSecondary}; border-bottom: 1px solid ${theme.colors.glassBorder}; }
  .price { color: ${theme.colors.secondary}; font-weight: 600; }
`;

const TrackingSection = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
  background: #F4F5F7;
  border-radius: 12px;
  margin-top: 16px;

  input {
    flex: 1;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.glassBorder};
    background: #FFFFFF;
    color: ${theme.colors.text};
    font-size: 14px;
    &:focus { outline: none; border-color: ${theme.colors.secondary}; }
  }
`;

const TrackingDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #E8F5E9;
  border-radius: 12px;
  margin-top: 16px;
  .icon { font-size: 24px; color: #2E7D32; }
  .info { flex: 1; }
  .label { font-size: 12px; color: #666; }
  .number { font-size: 16px; color: #2E7D32; font-weight: 700; letter-spacing: 1px; }
  .date { font-size: 11px; color: #666; margin-top: 2px; }
`;

const statusLabels: Record<string, string> = {
  pending: 'Beklemede',
  shipped: 'Kargoya Verildi',
  delivered: 'Teslim Edildi',
};

export default function OrdersClient({ orders }: { orders: any[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});
  const [sending, setSending] = useState<string | null>(null);
  const router = useRouter();

  const pending = orders.filter(o => o.status === 'pending').length;
  const shipped = orders.filter(o => o.status === 'shipped').length;
  const totalRevenue = orders.reduce((s, o) => s + (o.grand_total || 0), 0);

  const handleTrackingSubmit = async (orderId: string) => {
    const trackingNumber = trackingInputs[orderId];
    if (!trackingNumber?.trim()) {
      toast.error('Takip numarası girin.');
      return;
    }

    setSending(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/tracking`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber: trackingNumber.trim() }),
      });

      if (res.ok) {
        toast.success('Kargo takip numarası eklendi ve müşteriye e-posta gönderildi!');
        router.refresh();
      } else {
        toast.error('Hata oluştu.');
      }
    } catch {
      toast.error('Bağlantı hatası.');
    } finally {
      setSending(null);
    }
  };

  return (
    <div>
      <PageHeader>
        <h1>📦 Siparişler</h1>
        <p>Tüm siparişleri görüntüle, kargo takip numarası ekle</p>
      </PageHeader>

      <StatsRow>
        <StatCard $color="#C8A45C">
          <div className="num">{orders.length}</div>
          <div className="label">Toplam Sipariş</div>
        </StatCard>
        <StatCard $color="#FF9800">
          <div className="num">{pending}</div>
          <div className="label">Beklemede</div>
        </StatCard>
        <StatCard $color="#4CAF50">
          <div className="num">{shipped}</div>
          <div className="label">Kargoda</div>
        </StatCard>
        <StatCard $color="#C8A45C">
          <div className="num">₺{totalRevenue.toLocaleString('tr-TR')}</div>
          <div className="label">Toplam Gelir</div>
        </StatCard>
      </StatsRow>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
          Henüz sipariş yok.
        </div>
      ) : (
        orders.map(order => (
          <OrderCard key={order.id}>
            <OrderHeader
              $status={order.status}
              onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
            >
              <OrderNumber>
                <h3>#{order.order_number}</h3>
                <span style={{ color: '#888', fontSize: '13px' }}>
                  {new Date(order.created_at).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </OrderNumber>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#C8A45C', fontWeight: 700, fontSize: '16px' }}>₺{order.grand_total?.toLocaleString('tr-TR')}</span>
                <StatusBadge $status={order.status}>
                  {statusLabels[order.status] || order.status}
                </StatusBadge>
              </div>
            </OrderHeader>

            <OrderBody $open={expandedId === order.id}>
              <OrderGrid>
                <InfoBlock>
                  <h4><HiLocationMarker /> Müşteri & Teslimat</h4>
                  <p>
                    <span className="value">{order.full_name}</span><br />
                    {order.address}<br />
                    {order.district} / {order.city}{order.postal_code ? ` — ${order.postal_code}` : ''}
                  </p>
                </InfoBlock>
                <InfoBlock>
                  <h4><HiMail /> İletişim</h4>
                  <p>
                    📱 <span className="value">{order.phone}</span><br />
                    ✉️ <span className="value">{order.email}</span>
                    {order.note && <><br /><br />📝 <em>{order.note}</em></>}
                  </p>
                </InfoBlock>
              </OrderGrid>

              <ItemsTable>
                <thead>
                  <tr>
                    <th>Ürün</th>
                    <th>Adet</th>
                    <th>Birim</th>
                    <th>Toplam</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order_items?.map((item: any) => (
                    <tr key={item.id}>
                      <td>{item.product_name}</td>
                      <td>{item.quantity}</td>
                      <td>₺{item.price?.toLocaleString('tr-TR')}</td>
                      <td className="price">₺{(item.price * item.quantity)?.toLocaleString('tr-TR')}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'right', color: '#888' }}>Kargo:</td>
                    <td style={{ color: order.shipping_cost === 0 ? '#4CAF50' : '#ccc' }}>
                      {order.shipping_cost === 0 ? 'Ücretsiz' : `₺${order.shipping_cost}`}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'right', fontWeight: 700, color: theme.colors.text }}>Toplam:</td>
                    <td className="price" style={{ fontSize: '16px' }}>₺{order.grand_total?.toLocaleString('tr-TR')}</td>
                  </tr>
                </tbody>
              </ItemsTable>

              {order.tracking_number ? (
                <TrackingDisplay>
                  <div className="icon"><HiTruck /></div>
                  <div className="info">
                    <div className="label">Kargo Takip Numarası</div>
                    <div className="number">{order.tracking_number}</div>
                    {order.tracking_sent_at && (
                      <div className="date">
                        ✉️ E-posta gönderildi: {new Date(order.tracking_sent_at).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </div>
                  <HiCheck style={{ color: '#4CAF50', fontSize: '24px' }} />
                </TrackingDisplay>
              ) : (
                <TrackingSection>
                  <HiTruck style={{ fontSize: '24px', color: '#C8A45C', flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Kargo takip numarası girin..."
                    value={trackingInputs[order.id] || ''}
                    onChange={(e) => setTrackingInputs(prev => ({ ...prev, [order.id]: e.target.value }))}
                  />
                  <Button
                    $variant="primary"
                    $size="sm"
                    onClick={() => handleTrackingSubmit(order.id)}
                    disabled={sending === order.id}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {sending === order.id ? '...' : '📩 Gönder'}
                  </Button>
                </TrackingSection>
              )}
            </OrderBody>
          </OrderCard>
        ))
      )}
    </div>
  );
}
