# MBBS Survival Simulator v3.2

A free, text-first, absurd medical question-and-answer chaos game. Each question has four answers, a short explanation, and silly consequences. Built with vanilla HTML, CSS and JavaScript: no bundler, framework or package install required.

## Play

- **Live site (after enabling Pages):** https://shreebalaji767.github.io/MBBS-Survival-Simulator/
- **Local:** download/clone the repository and open `index.html`.
- For service-worker/offline testing locally, use a local HTTP server (for example `python -m http.server 8080`) rather than opening the file directly.

## Features

- 167+ original medical questions with four multiple-choice answers, absurd distractors, and short educational explanations.
- No repeated question within a browser session, including after starting a new run or refreshing; a fresh browser session starts a new question pool.
- Correct answers build knowledge and XP; wrong answers trigger silly chaos and sanity consequences. Consecutive correct answers earn combo bonuses. The 50/50 Chaos Cutter removes two wrong options once per browser session; the absurd dice can grant sanity, grant energy, or tax your sanity.
- **Three game modes:** Classic Chaos, 20-second Blitz, and a 10-question Sprint.
- **Subject rounds:** filter the bank into Anatomy, Physiology, Biochemistry, Microbiology & Immunology, Pharmacology, Pathology, Clinical Basics, Community Medicine, or Mixed Bag.
- **Boss questions:** every fifth question increases the stakes; correct answers earn a bonus, wrong answers cost extra sanity.
- Campaign stats, levels, field journal, local autosave, sound toggle, and multiple endings.
- Save export/import so progress can be backed up or moved to another device.
- Free local-first setup: no paid APIs, subscriptions, build tools, or third-party runtime dependencies. GitHub Pages offers free static hosting within GitHub's usage limits.
- **Daily objectives and 10 achievements**, persisted separately from the campaign save.
- **Daily Knowledge Challenge:** one reward attempt per local calendar day, a consistent question of the day, explanations, and a consecutive-day streak.
- Keyboard, mouse and touch controls, including an on-screen directional pad.
- Larger-text and high-contrast accessibility options.
- Installable Progressive Web App (PWA), service-worker caching and offline launch after the first successful load.
- GitHub Actions syntax and static-file checks.
- Fictional entertainment only; not medical advice or a substitute for supervised clinical education.

## Controls

| Input | Action |
|---|---|
| `1–4` | Choose an event decision |
| `Q W E R T Y` | Legacy keys (travel disabled in quiz mode) |
| Arrow keys | Move the character around the scene |
| On-screen D-pad | Touch movement |
| `J` | Open field journal |
| `Esc` | Close an open dialog |

## GitHub Pages deployment

1. Open repository **Settings → Pages**.
2. Choose **Deploy from a branch**.
3. Select branch **main**, folder **/(root)** and save.
4. Wait for GitHub Pages to publish at the URL above.

## Offline / installable app

The app registers `service-worker.js` on HTTPS or localhost. Static files are cached after a successful first visit. The save uses browser localStorage and remains on that browser/device; clearing site data removes it. The game uses local system fonts and does not need third-party requests to run.

## Project layout

```
.
├── index.html
├── manifest.json
├── service-worker.js
├── assets/icon.svg
├── styles/main.css
├── styles/upgrade.css
├── src/game.js
├── src/upgrade.js
├── tests/smoke-test.js
├── .github/workflows/static-check.yml
├── README.md
└── LICENSE
```

## Customize

- Add question content to `questionBank` in `src/game.js`.
- Add knowledge challenge questions and achievements in `src/upgrade.js`.
- Tune visuals in `styles/main.css` and `styles/upgrade.css`.
- Adjust cached static paths in `service-worker.js` when adding new core files.

## License

MIT. See [LICENSE](LICENSE).
