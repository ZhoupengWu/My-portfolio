# Wu Zhoupeng — Portfolio

Personal portfolio built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). Static output, deployed on Vercel.

## Structure

```text
src/
├── assets/fonts/        # Sour Gummy (self-hosted, loaded via Astro's Fonts API)
├── assets/projects/     # project cover images
├── components/          # Header, Footer, ProjectCard
├── content/projects/    # one Markdown file per project
├── content/education/   # learning repos (Rust, Go...), shown at /education
├── data/skills.ts       # skill groups for /skills
├── layouts/Base.astro   # shared <head>, header and footer
├── pages/               # index, about, skills, contact, 404, projects/ and education/
├── styles/global.css    # Tailwind entry point: design tokens (colors, light/dark theme) and base styles
├── consts.ts            # site title, nav links, socials
└── content.config.ts    # schema of the projects collection
```

## Adding a page

Create a file in `src/pages/` (e.g. `src/pages/uses.astro`), wrap it in `Base`, and add an entry to `NAV_LINKS` in `src/consts.ts` if it should appear in the menu.

## Adding a project

Create `src/content/projects/<slug>.md`:

```md
---
title: My Project
description: One-line summary shown on the card.
date: 2025-01-01
endDate: 2025-02-01        # optional
technologies: [Python, PostgreSQL]
category: Bot              # also becomes a filter chip on /projects
cover: ../../assets/projects/my-project.png   # optional
coverAlt: Screenshot of My Project             # optional
repo: https://github.com/user/repo             # optional
demo: https://example.com                      # optional
featured: true             # show on the home page
draft: false               # true hides it everywhere
---

## About the project

Markdown body…
```

## Adding an education repo

Create `src/content/education/<slug>.md` with `title`, `description`, `date` (when you started), `technologies`, `status` (`in-progress` or `completed`), `repo`, and optionally `topics` (a short list of what the repo covers so far, shown on its card). It appears at `/education`, and its technologies show up on `/skills` marked as "Learning" until a project uses them too.

## Configuration

Personal details are read from environment variables, declared in `astro.config.mjs` (`env.schema`) and imported through `astro:env/client` in `src/consts.ts`.

```sh
cp .env.example .env
```

| Variable               | Used for                          |
| :--------------------- | :-------------------------------- |
| `PUBLIC_LOCATION`      | Location on About and Contact     |
| `PUBLIC_GITHUB_URL`    | GitHub link in the footer         |
| `PUBLIC_INSTAGRAM_URL` | Instagram link in the footer      |
| `PUBLIC_TIKTOK_URL`    | TikTok link in the footer         |

All of them are optional: a missing variable hides the related content instead of breaking the build. `.env` is git-ignored, so on Vercel add the same variables in **Project Settings → Environment Variables**. The values still end up in the generated HTML, so only use public information.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start the dev server at `localhost:4321`    |
| `npm run build`   | Build the production site to `./dist/`      |
| `npm run preview` | Preview the production build locally        |

## Deploy

Import the repository in Vercel: the Astro preset is detected automatically (build command `npm run build`, output `dist`).

## License

All rights reserved. See [LICENSE.md](./LICENSE.md).
