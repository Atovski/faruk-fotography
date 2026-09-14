import { sendGAEvent } from '@next/third-parties/google';

/**
 * GA4 event names used as conversions. They are imported into Google Ads, so
 * renaming one silently breaks the matching Ads conversion action.
 */
export type ConversionEvent =
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click'
  | 'directions_click'
  | 'generate_lead'
  | 'purchase';

export function trackEvent(name: ConversionEvent, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  try {
    sendGAEvent('event', name, { page_path: window.location.pathname, ...params });
  } catch {
    // Analytics must never break the page (ad blockers, GA not loaded yet).
  }
}

/** Maps a clicked link to the contact event it represents, if any. */
export function classifyContactLink(href: string): ConversionEvent | null {
  if (href.startsWith('tel:')) return 'phone_click';
  if (href.startsWith('mailto:')) return 'email_click';
  if (/^https?:\/\/(api\.)?(wa\.me|whatsapp\.com)/.test(href)) return 'whatsapp_click';
  if (/^https?:\/\/(maps\.app\.goo\.gl|(www\.)?google\.[a-z.]+\/maps)/.test(href)) return 'directions_click';
  return null;
}
