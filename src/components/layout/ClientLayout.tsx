'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '@/hooks/useLanguage';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/styles/GlobalStyles';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { CartProvider } from '@/hooks/useCart';
import GlobalCart from '@/components/layout/GlobalCart';

interface ClientLayoutProps {
  children: ReactNode;
  lang?: 'tr' | 'en';
}

export default function ClientLayout({ children, lang }: ClientLayoutProps) {
  return (
    <StyledComponentsRegistry>
      <LanguageProvider lang={lang}>
        <CartProvider>
          <GlobalStyles />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1A2635',
                color: '#F5F0EB',
                border: '1px solid rgba(200, 164, 92, 0.2)',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#C8A45C',
                  secondary: '#1A2635',
                },
              },
              error: {
                iconTheme: {
                  primary: '#E74C3C',
                  secondary: '#1A2635',
                },
              },
            }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <GlobalCart />
        </CartProvider>
      </LanguageProvider>
    </StyledComponentsRegistry>
  );
}
