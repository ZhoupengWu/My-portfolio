---
name: design
description: Design system and UI conventions of Wu Zhoupeng's portfolio (Astro + Tailwind v4). Use whenever you create or change a page, component, layout or style on this site, add a new section, pick colors or typography, or review the visual result, so that new UI matches the existing look in light and dark mode.
---

# Portfolio design system

Playful but tidy: a pastel yellow page, a floating pill-shaped header, white cards with a gentle shadow, and colorful headings in the palette of the original site. Everything is styled with Tailwind utilities on top of the tokens in `src/styles/global.css`. Read that file before inventing any style.

## Principles

1. **Reuse before creating.** Look at `src/components/` and the existing pages first; most new UI is a combination of what exists.
2. **Tokens, not values.** Use theme tokens and semantic colors. Do not write raw hex values, and do not add `dark:` variants (see Color).
3. **Calm layout, colorful type.** Layout stays simple (one column, or a grid of cards); the personality comes from the font and the heading colors.
4. **Accessible by default**, in both color schemes.

## Typography

- Font: **Sour Gummy** (500 and 700), self-hosted and exposed as `--font-sour-gummy`; `font-sans` maps to it. Never load fonts from a CDN.
- Base size is `text-lg` with relaxed leading. Use `text-base`/`text-sm` for secondary text inside cards.
- `h1`, `h2`, `h3` are styled globally in `global.css` (size and color), so write the bare tags and skip utilities. Override only with a clear reason (for example `text-2xl!` for an `h2` inside a card).
- One `h1` per page.

## Color

Two kinds of tokens, both defined in `global.css`:

- **Semantic** (switch automatically between light and dark): `bg-bg`, `bg-surface`, `bg-surface-alt`, `bg-accent-soft`, `text-ink`, `text-muted`, `border-line`, `text-link`, `text-h1`, `text-h2`, `text-h3`. Use these for almost everything. Do not add `dark:` variants.
- **Brand palette** (fixed, from the original site): `verdetto` green, `giallogno` olive, `giallino` cream (the light page color, used by the logo), `fucsia` pink (the accent for hover and focus), `violaccio` indigo (primary buttons and the logo), `rosso` red, `blu`, `azzurretta`, `verdone`, `violetta`. Use them for accents, not for large surfaces.

If a new color is needed, add a token to `global.css` (with a dark value if it is semantic) instead of using a literal.

### Light and dark theme

The palette is switched with `data-theme="light|dark"` on `<html>`. An inline script in `Base.astro` sets it before first paint from the saved choice (`localStorage` key `theme`), falling back to the OS preference; `ThemeToggle.astro` flips and saves it. In `global.css` the dark values live in `:root[data-theme='dark']`, with a media-query copy for visitors without JavaScript. When you change a dark value, change both blocks. To show something only in one theme (for example the sun and moon icons), use an arbitrary variant such as `[[data-theme=dark]_&]:hidden`, not `dark:`.

## Layout

- Wrap page content in `container-site` (max width 64rem, side padding). The header is already constrained to the same width.
- Pages render inside `Base.astro`, which provides the head, header, footer and a skip link. The home hero is just the eyebrow "Hi, I'm", the `h1` "Wu" and two buttons. The footer is pushed to the bottom with a flex column on `body`.
- Card grids: `grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-6`.
- Two-column detail layouts: `grid gap-8 md:grid-cols-[2fr_1fr]`.
- Vertical rhythm: sections are separated with `mt-12`/`mt-16`; page headers use `mt-12 mb-10`.
- Mobile first: layouts must work at 390px wide without horizontal scrolling.

## Components and patterns

- **Page header band** (Education, Skills): `header.bg-accent-soft.mt-12.mb-10.rounded-card.px-6.py-10.text-center` with an `h1` and a one-line `p`.
- **Projects page** (`projects/index.astro` with `ProjectRow.astro`): a plain `h1` with a muted line, a row of filter chips, then one row per project with a `gap-16` rhythm. Each row is a two-column grid on `md` (a 16:10 framed cover next to category and period, the `h2` title, description, technology pills and buttons for Details, GitHub and Live demo); the cover side alternates left and right, and everything stacks on mobile. Covers use `coverFit` as in cards. Categories come from the projects' `category` field.
- **Filter chips**: `rounded-full border` buttons with `aria-pressed`; the pressed chip is an `accent-soft` pill like the active nav link, with the count in muted text. The group is `hidden` in the HTML and shown by script, so without JavaScript all projects are listed. The choice is kept in the URL hash and announced through an `aria-live` region.
- **Card** (`ProjectCard.astro`, used on Home and Education): white surface, `rounded-card`, `shadow-card`, lifts with `-translate-y-2` on hover and focus-within. Takes `href`, `title`, `description`, `label`, `technologies`, and an optional cover. Without a cover it shows the initial letter on `bg-accent-soft`.
- **Cover images**: `coverFit: cover` crops to 200px height; `coverFit: contain` puts a logo on white with padding. Images live in `src/assets/projects/` and go through `astro:assets`.
- **Detail page** (`EntryDetail.astro`): back link, `h1`, cover, Markdown body on the left, a "Details" sidebar and the GitHub/demo buttons on the right.
- **Buttons**: `.btn` (filled indigo, pink on hover) and `.btn-outline`. Both are pill-shaped and lift slightly on hover.
- **Pills** (technology tags): `bg-surface-alt rounded-full px-2.5 py-0.5 text-xs`.
- **Surface panel** (Skills groups): `bg-surface rounded-card p-6 shadow-card`.
- **Header** (`Header.astro`): a sticky, blurred pill (`bg-surface/85 backdrop-blur`, `rounded-full` from `lg`, `rounded-3xl` below) with just the `Logo` on the left (a link home with an `aria-label`, no visible name), links on the right and the theme toggle. The current page is marked with `aria-current="page"` and shown as an `bg-accent-soft` pill in bold. Below `lg` the links collapse into a menu opened by a round button; Escape and choosing a link close it. New pages are added to `NAV_LINKS` in `src/consts.ts`.
- **Footer** (`Footer.astro`): a `bg-surface` card with `rounded-card`, a border and `shadow-card`, aligned with the header width. A single row: the copyright line on the left and the social links as outlined pills on the right (on mobile they stack with the socials on top and the copyright last, via `flex-col-reverse`). No logo, name or page links repeated here: the header already has them. Keep it compact.
- **Logo** (`Logo.astro`): the "ZP" monogram used in the header, same drawing as `public/favicon.svg`: cream rounded strokes on an indigo rounded square, with a thin `ring-line` outline so it stays visible in dark mode.
- **Theme toggle** (`ThemeToggle.astro`): a round `size-10` icon button (moon in light, sun in dark) whose `aria-label` always names the action. It disables transitions for a moment so every color changes at once.
- **Icon buttons**: `border-line bg-surface-alt text-ink size-10 rounded-full border` with `hover:bg-accent-soft`.

Shared patterns that appear on more than one page belong in `@layer components` in `global.css` or in a component, not copied.

## Motion

Short transitions (150-300ms) on `transform` and `color` only. `global.css` already disables them for `prefers-reduced-motion`.

## Accessibility checklist

- Visible focus (a global fucsia outline is set; do not remove it).
- Alt text on every image; decorative elements get `aria-hidden="true"`.
- Link text makes sense out of context ("View on GitHub", not "here").
- Color is never the only signal; contrast is acceptable in both themes.
- Interactive elements are reachable and usable with the keyboard; icon-only buttons have an `aria-label` and set `aria-expanded` when they open something.

## Before finishing a UI change

1. `npm run build` passes.
2. Look at the result with Playwright screenshots at 1100px and 390px wide, in light and dark (`colorScheme: 'dark'` sets the initial theme). Wait about half a second after clicking the theme toggle before a screenshot. Serve the build with `npx astro preview`.
3. Check empty states (no projects, no education entries) and a long title or description.
4. Update `CLAUDE.md` and the README if you added a page, collection or convention.
