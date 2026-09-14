'use client';

import { useEffect } from 'react';
import { classifyContactLink, trackEvent } from '@/lib/analytics';

/**
 * WhatsApp/phone/email/map links are scattered across many components, so a
 * single delegated listener tracks all of them, including ones added later.
 */
export default function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const event = classifyContactLink(href);
      if (!event) return;
      trackEvent(event, {
        link_id: link.id || undefined,
        link_text: link.textContent?.trim().slice(0, 50) || link.getAttribute('aria-label') || undefined,
      });
    };

    // Capture phase so handlers that stop propagation don't hide the click.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
