---
title: Iter Rectum
description: A browser game against cyberbullying where players pick the right path.
date: 2026-04-30
endDate: 2026-05-19
technologies: [JavaScript, HTML, CSS, Canvas]
category: Game
cover: ../../assets/projects/iter-rectum.jpg
coverAlt: Home page of Iter Rectum with the title in large serif letters on a dark blue background
repo: https://github.com/ZhoupengWu/iter-rectum
featured: true
---

## About the project

Iter Rectum is an educational game that fights cyberbullying and helps players protect their privacy online. The player walks along a road split into three lanes, and each lane holds a different answer to the question on screen. Choosing the right one earns points; choosing the wrong one explains why, so every mistake is a chance to learn.

The game text is in Italian.

### Features

- **Three-lane gameplay:** move between lanes with the arrow keys, or with on-screen buttons on mobile.
- **200 questions** across 11 topics, such as terminology, legal aspects, privacy, empathy and real-life scenarios, at three difficulty levels. Each round has ten of them.
- **Feedback after every answer:** a short explanation of the topic, whether the answer was right or not.
- **Tutorial page** that explains the rules before the first round.

### Technical notes

Everything is vanilla JavaScript drawn on a canvas, with no framework or build step.

- The character's walk cycle is driven by a sine wave: legs move in opposite phase, and arms balance the legs.
- The endless meadow is a pre-rendered offscreen tile drawn twice and scrolled sideways, with grass tufts duplicated across the edges so the loop has no visible seam.
- Questions are loaded from a JSON file, so adding content does not require touching the game logic.
