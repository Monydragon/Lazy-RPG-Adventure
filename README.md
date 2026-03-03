# Lazy RPG Adventure

Initial game design draft: [docs/GAME_DESIGN_V1.md](docs/GAME_DESIGN_V1.md)

## MVP Prototype

Prototype entrypoint: [index.html](index.html)

### Run
1. Open `index.html` directly in a browser, or
2. Serve the folder with a static server (recommended).

PowerShell example:
```powershell
npx --yes serve .
```

### Current Features
- Main menu (`Start Game`, `Load Game`, `Options`, `Exit`)
- Intro sequence with comedic narration
- Character creation (name, combat style, starting city, seed)
- Seed-based procedural overworld with major cities, towns, and dungeons
- Map exploration with step-based random encounters
- Dice-heavy turn-based combat (`d4/d6/d8/d10/d12` damage, `d20` checks)
- Inventory and equipment management
- Save/load via `localStorage`
- Keyboard + gamepad support (browser Gamepad API)

### Controls
- Move: `WASD` / Arrow keys / gamepad left stick or d-pad
- Confirm: `Enter` / `Space` / gamepad `A`
- Back: `Esc` / `Backspace` / gamepad `B`
- Inventory: `I` / gamepad `Y`
- Equipment: `E` / gamepad `X`
- Save: `P` / gamepad `Start`
