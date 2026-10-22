# MBBS Survival Simulator v2

A browser-based, decision-driven medical-college survival RPG built with vanilla HTML, CSS, and JavaScript. Features pixel-inspired scenes, six destinations, branching choices, stat consequences, XP and levels, inventory, a field journal, optional sound, keyboard/touch controls, browser autosave, and multiple endings.

## Play locally

1. Clone or download this repository.
2. Open `index.html` in a modern browser. No build step or package manager is needed.
3. Choose an option with the on-screen buttons or press **1–4**.
4. Travel with the destination buttons or **Q / W / E / R / T / Y**.
5. Press **J** for your field journal. Use **Esc** to close dialogs.

Progress is saved in localStorage on that browser and device. Clearing browser site data removes the save.

## Gameplay

- **Campaign:** 30 in-game days, three decisions per day.
- **Stats:** sanity, energy, knowledge, attendance, cash, reputation, XP and level.
- **Locations:** Medical College, Hostel Room, Chai Canteen, Central Library, Hospital Ward and Viva Arena.
- **Endings:** Legendary Intern, Chai-Powered Genius, Barely Passed, Attendance Disaster, burnout warning, exhaustion and other survival outcomes.
- **Controls:** mouse/touch and keyboard. Sound effects are optional and off by default.
- **Clinical ethics:** the game encourages honesty about what you know and what you have assessed. It is fictional entertainment, not medical advice or a substitute for clinical training.

## Deploy with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**, then save.
4. Wait for the Pages deployment to finish. The expected URL is:

   https://shreebalaji767.github.io/MBBS-Survival-Simulator/

## Project structure

```
MBBS-Survival-Simulator/
├── index.html
├── README.md
├── LICENSE
├── .nojekyll
├── styles/
│   └── main.css
├── src/
│   └── game.js
└── assets/
    └── images/
        └── README.md
```

The pixel-inspired campus is rendered with CSS; no image downloads or JavaScript libraries are required. Google Fonts enhance the pixel aesthetic when online, with monospace fallbacks available.

## Customize

- Add encounters to the `events` array in `src/game.js`.
- Edit starting values in `fresh()`.
- Add destinations in `places` and update scene palettes there.
- Adjust layout, palette, and responsive styles in `styles/main.css`.

## License

MIT. See [LICENSE](LICENSE).
