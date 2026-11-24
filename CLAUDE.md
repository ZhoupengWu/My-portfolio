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

Personal portfolio of Wu Zhoupeng, a static Astro site deployed on Vercel. Site language: English only.

### Layout

- `src/layouts/Base.astro`: shared `<head>`, header and footer. Every page wraps its content in it.
- `src/pages/`: one file per route; `projects/[slug].astro` renders the content collection.
- `src/content/projects/*.md`: one Markdown file per project, validated by `src/content.config.ts`. See the README for the frontmatter fields.
- `src/content/education/*.md`: repositories used to learn a language or tool (work in progress by nature), rendered at `/education`.
- `src/data/skills.ts`: skill groups for `/skills`; each skill is linked automatically to the projects and education entries whose `technologies` contain its name.
- `src/components/`: `ProjectCard` (cards for both collections) and `EntryDetail` (shared detail layout).
- `src/consts.ts`: site title, nav links, copyright years, and the personal details (location, socials) read from `.env`. A new page needs a file in `src/pages/` plus an entry in `NAV_LINKS` if it belongs in the menu.
- `src/styles/global.css`: Tailwind v4 entry point with the design tokens.
- `src/assets/`: images and the self-hosted Sour Gummy font files (via `fontProviders.local()` in `astro.config.mjs`).
- `CLAUDE.md` is the source file for these instructions; `AGENTS.md` is a symlink to it.

### Conventions

- For any UI work, follow the design system in `.claude/skills/design/SKILL.md`.
- Style with Tailwind utility classes; no scoped `<style>` blocks unless a utility cannot express it.
- Use the semantic color tokens (`bg-bg`, `bg-surface`, `text-ink`, `text-muted`, `text-h1`...). They switch between light and dark automatically, so avoid `dark:` variants and raw hex values.
- The brand palette tokens (`verdetto`, `fucsia`, `giallogno`, `violaccio`, `rosso`, `blu`...) are fixed and come from the original site.
- Reusable styles shared by several pages (`.btn`, `.container-site`) live in the `components` layer of `global.css`.
- Keep pages accessible: one `h1` per page, alt text on images, keyboard-reachable navigation.
- Project images go in `src/assets/projects/` and are referenced from frontmatter with a relative path so Astro optimizes them.
- Personal details (location, social links) come from environment variables, not from the code: declare them in `env.schema` in `astro.config.mjs`, import them from `astro:env/client`, and document them in `.env.example` and the README. They must stay optional so the build works without `.env`. Never commit `.env`.
- Above-the-fold images must load eagerly (`loading="eager"`). `ProjectCard` takes an `eager` prop: Home passes it for its featured cards, and the Projects and Education lists pass it for every card up to `EAGER_COVERS_LIMIT` (in `src/consts.ts`). Astro's dev toolbar audit flags eager images below the fold (`perf-use-loading-lazy`) and lazy ones above it (`perf-use-loading-eager`) depending on the window size, so no static value is warning-free everywhere; with short lists the cost of eager is negligible, so revisit the limit if a list grows.
- Favicons live in `public/`: `favicon.svg` is the source (indigo rounded square with a yellow "W"), `favicon.ico` (16/32/48) and `apple-touch-icon.png` (180) are generated from it.
- Do not fetch fonts or other assets from third-party CDNs at build time; the build must work offline.

### Checks

- `npm run build` must pass before committing. Run `npx astro check` when touching TypeScript.
- Commit messages and PR descriptions must not contain Claude session links.
