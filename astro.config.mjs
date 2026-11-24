// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const latin = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const latinExt = 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';

/** @param {number} weight */
const variants = (weight) =>
  [
    { src: [`./src/assets/fonts/sour-gummy-latin-${weight}-normal.woff2`], unicodeRange: [latin] },
    { src: [`./src/assets/fonts/sour-gummy-latin-ext-${weight}-normal.woff2`], unicodeRange: [latinExt] },
  ].map((v) => ({ ...v, weight, style: 'normal' }));

// https://astro.build/config
export default defineConfig({
  // Personal details live in `.env` (see `.env.example`). All fields are optional:
  // a missing value simply hides the related content.
  env: {
    schema: {
      PUBLIC_LOCATION: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_GITHUB_URL: envField.string({ context: 'client', access: 'public', optional: true, url: true }),
      PUBLIC_INSTAGRAM_URL: envField.string({ context: 'client', access: 'public', optional: true, url: true }),
      PUBLIC_TIKTOK_URL: envField.string({ context: 'client', access: 'public', optional: true, url: true }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Sour Gummy',
      cssVariable: '--font-sour-gummy',
      fallbacks: ['system-ui', 'sans-serif'],
      options: { variants: [...variants(500), ...variants(700)] },
    },
  ],
});
