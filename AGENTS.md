## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project overview

Personal portfolio of Wu Zhoupeng, a static Astro site deployed on Vercel. Site language: English only. The previous plain-HTML site lives in `tmp/` as migration reference and is deleted once the migration is complete; do not build on it.

### Layout

- `src/layouts/Base.astro`: shared `<head>`, header and footer. Every page wraps its content in it.
- `src/pages/`: one file per route; `projects/[slug].astro` renders the content collection.
- `src/content/projects/*.md`: one Markdown file per project, validated by `src/content.config.ts`. See the README for the frontmatter fields.
- `src/consts.ts`: site title, nav links, socials. A new page needs a file in `src/pages/` plus an entry in `NAV_LINKS` if it belongs in the menu.
- `src/styles/global.css`: Tailwind v4 entry point with the design tokens.
- `src/assets/`: images and the self-hosted Sour Gummy font files (via `fontProviders.local()` in `astro.config.mjs`).

### Conventions

- Style with Tailwind utility classes; no scoped `<style>` blocks unless a utility cannot express it.
- Use the semantic color tokens (`bg-bg`, `bg-surface`, `text-ink`, `text-muted`, `text-h1`...). They switch between light and dark automatically, so avoid `dark:` variants and raw hex values.
- The brand palette tokens (`verdetto`, `fucsia`, `giallogno`, `violaccio`, `rosso`, `blu`...) are fixed and come from the original site.
- Reusable styles shared by several pages (`.btn`, `.container-site`) live in the `components` layer of `global.css`.
- Keep pages accessible: one `h1` per page, alt text on images, keyboard-reachable navigation.
- Project images go in `src/assets/projects/` and are referenced from frontmatter with a relative path so Astro optimizes them.
- Do not fetch fonts or other assets from third-party CDNs at build time; the build must work offline.

### Checks

- `npm run build` must pass before committing. Run `npx astro check` when touching TypeScript.
- Commit messages and PR descriptions must not contain Claude session links.
