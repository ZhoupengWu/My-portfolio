import { PUBLIC_GITHUB_URL, PUBLIC_INSTAGRAM_URL, PUBLIC_LOCATION, PUBLIC_TIKTOK_URL } from 'astro:env/client';

export const SITE_TITLE = 'Wu Zhoupeng';
export const SITE_DESCRIPTION = "Wu Zhoupeng's portfolio";

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/education', label: 'Education' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
] as const;

/**
 * Card lists with up to this many entries load every cover eagerly. The lists are short and the
 * covers small, and on tall screens more than the first row is above the fold.
 */
export const EAGER_COVERS_LIMIT = 6;

/** Years shown in the footer copyright. Update it by hand. */
export const COPYRIGHT_YEARS = '2025-2026';

// Personal details come from `.env` (see `.env.example`); anything unset is left out.
export const LOCATION: string | undefined = PUBLIC_LOCATION;

export const SOCIALS = [
  { label: 'GitHub', href: PUBLIC_GITHUB_URL },
  { label: 'Instagram', href: PUBLIC_INSTAGRAM_URL },
  { label: 'TikTok', href: PUBLIC_TIKTOK_URL },
].filter((s): s is { label: string; href: string } => Boolean(s.href));
