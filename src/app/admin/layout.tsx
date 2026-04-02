'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HiHome, HiPhotograph, HiLogout, HiShoppingCart, HiCube } from 'react-icons/hi';
import toast from 'react-hot-toast';

const AdminWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${theme.colors.background};
`;

const Sidebar = styled.aside`
  width: 250px;
  background: ${theme.colors.surface};
  border-right: 1px solid ${theme.colors.glassBorder};
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.xl} 0;
`;

const SidebarLogo = styled.div`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};
  padding: 0 ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['2xl']};
  span {
    color: ${theme.colors.secondary};
  }
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  color: ${({ $active }) => ($active ? theme.colors.secondary : theme.colors.textSecondary)};
  background: ${({ $active }) => ($active ? theme.colors.secondary + '15' : 'transparent')};
  border-right: 3px solid ${({ $active }) => ($active ? theme.colors.secondary : 'transparent')};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  transition: all ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.secondary};
    background: ${theme.colors.secondary}0a;
  }

  svg {
    font-size: 20px;
  }
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  color: ${theme.colors.textMuted};
  background: transparent;
  border: none;
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: all ${theme.transitions.fast};
  margin-top: auto;

  &:hover {
    color: ${theme.colors.error};
    background: ${theme.colors.error}10;
  }
  
  svg {
    font-size: 20px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing['3xl']};
`;

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.4s ease;
`;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      toast.success('Çıkış yapıldı');
      router.push('/admin/login');
      router.refresh();
    } catch {
      toast.error('Hata oluştu');
    }
  };

  return (
    <AdminWrapper>
      <Sidebar>
        <SidebarLogo>Faruk <span>Admin</span></SidebarLogo>
        <NavLinks>
          <NavItem href="/admin/dashboard" $active={pathname === '/admin/dashboard' || pathname === '/admin'}>
            <HiHome /> Dashboard
          </NavItem>
          <NavItem href="/admin/galleries" $active={pathname.startsWith('/admin/galleries')}>
            <HiPhotograph /> Galeriler
          </NavItem>
          <NavItem href="/admin/orders" $active={pathname.startsWith('/admin/orders')}>
            <HiShoppingCart /> Siparişler
          </NavItem>
          <NavItem href="/admin/products" $active={pathname.startsWith('/admin/products')}>
            <HiCube /> Ürünler
          </NavItem>
        </NavLinks>
        
        <LogoutBtn onClick={handleLogout}>
          <HiLogout /> Çıkış Yap
        </LogoutBtn>
      </Sidebar>
      <MainContent>
        <PageContainer>
          {children}
        </PageContainer>
      </MainContent>
    </AdminWrapper>
  );
}
