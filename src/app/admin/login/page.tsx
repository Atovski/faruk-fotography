'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { Button } from '@/components/ui/Button';
import { HiLockClosed } from 'react-icons/hi';
import toast from 'react-hot-toast';

const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, ${theme.colors.primaryDark} 0%, ${theme.colors.background} 100%);
`;

const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.lg};
  animation: ${fadeInUp} 0.5s ease;
`;

const LogoArea = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};

  div {
    width: 60px;
    height: 60px;
    background: ${theme.colors.secondary}15;
    color: ${theme.colors.secondary};
    border-radius: ${theme.borderRadius.full};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin: 0 auto ${theme.spacing.md};
  }

  h1 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.xl};
    color: ${theme.colors.text};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.md};
  margin-bottom: ${theme.spacing.lg};
  transition: all ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 2px ${theme.colors.secondary}20;
    outline: none;
  }
`;

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Giriş başarılı');
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        toast.error(data.error || 'Şifre hatalı');
      }
    } catch {
      toast.error('Bağlantı hatası!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginBox>
        <LogoArea>
          <div><HiLockClosed /></div>
          <h1>Yönetici Paneli</h1>
        </LogoArea>
        <form onSubmit={handleLogin}>
          <Input 
            type="password" 
            placeholder="Admin Şifresi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
          <Button type="submit" $variant="primary" $size="lg" $fullWidth disabled={loading}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>
      </LoginBox>
    </LoginWrapper>
  );
}
