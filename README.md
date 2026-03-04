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
- Character creation (name, combat style, starting city, difficulty, seed)
- Unified starting stats: `Health 10`, all core combat stats `1`, `CriticalChance 5%`
- Seed-based procedural overworld with major cities, towns, and dungeons
- Added world interactions (`Interact`) for chests, dungeons, and transitions
- Token-based map visuals for player, cities, towns, NPCs, dungeons, chests, transitions, and boss markers
- NPC interactions (`Talk`) with role-based dialog and rewards
- Story journal with dynamic storyline generation per seed
- Procedural quest board tied to generated towns/dungeons/biomes
- Auto-trigger quest/interaction events on world movement (chests, NPC prompts, boss ambushes, quest board prompts)
- Dynamic world event pulses that shift threat, spawn opportunities, and post new activities
- Settlement shops with buy/sell loop and restocking
- Achievements system with unlock tracking
- Map exploration with step-based random encounters
- Dice-heavy turn-based combat (`d4/d6/d8/d10/d12` damage, `d20` checks)
- Expanded melee/ranged/magic unlockable skill sets
- Combat item/skill selection lists (shows available skills/spells and usable combat items)
- Dungeon bosses (scaled to player level) with boss loot, quests, and story triggers
- Inventory and equipment management
- Expanded consumables/materials/treasure loot system
- Equipment level requirements enforced on equip
- Level-up stat point allocation system (`+3` points per level, assign to any stat)
- Save/load via `localStorage`
- Built-in synthesized SFX + mode-based fantasy music (world/combat/victory fanfare) via WebAudio
- Keyboard + gamepad support (browser Gamepad API)
- Right thumb-stick scrolling support for modal/log scroll regions

### Controls
- Move: `WASD` / Arrow keys / gamepad left stick or d-pad
- Interact: `F` / gamepad `RT`
- Confirm: `Enter` / `Space` / gamepad `A`
- Back: `Esc` / `Backspace` / gamepad `B`
- Inventory: `I` / gamepad `Y`
- Equipment: `E` / gamepad `X`
- Level Up: `U`
- Shop: `J` / gamepad `LT`
- Quests: `Q` / gamepad `RB`
- Talk: `T` / gamepad `A` in world
- Story: `O` / gamepad `LB`
- Achievements: `H` / gamepad `View/Back`
- Save: `P` / gamepad `Start`
- Scroll Lists: gamepad right stick
