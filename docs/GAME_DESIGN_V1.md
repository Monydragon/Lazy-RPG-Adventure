# Lazy RPG Adventure - Game Design v1

## 1. High Concept
`Lazy RPG Adventure` is a web-based, dice-heavy, turn-based RPG with minimalist visuals:
- No character art.
- World shown as a map with simple colored shapes.
- UI around map is text + buttons.
- Tone is comedic, with a narrator-style intro in 3rd person (Bard's Tale style humor).

## 2. Core Design Pillars
1. Tactical randomness: dice-driven outcomes with readable odds.
2. Fast turn flow: simple choices, meaningful builds.
3. Exploration pressure: danger spikes outside cities.
4. Zero-art readability: color, symbols, and text clarity carry the experience.

## 3. Player Flow
1. Main Menu
2. Intro Sequence
3. Character Creation
4. Starting City Arrival
5. Overworld Exploration
6. Encounter (turn-based combat)
7. Loot + XP + Return Loop
8. Progression (levels, gear tiers, new zones)

## 4. Main Menu
Buttons:
- `Start Game`
- `Load Game`
- `Options`
- `Exit`

Controller behavior:
- D-pad / left stick: move selection
- `A` / `Cross`: confirm
- `B` / `Circle`: back

## 5. Start Game Sequence
### 5.1 Intro (Narrated, 3rd Person Comedy)
The game opens with a short narrated sequence about the protagonist's incompetence and accidental heroism.

Example tone:
> "In a world desperate for heroes, fate selected... this person. Not by prophecy. By clerical error."

### 5.2 Character Creation
Player chooses:
1. Character Name
2. Starting Combat Style
3. Starting City

Combat style starts with stat biases and a starter weapon:
- `Melee`: high melee attack/defense
- `Ranged`: high ranged attack/crit chance
- `Magic`: high magic attack/luck

## 6. Stats
Primary stats (all equipment can modify all stats):
- `Health`
- `MeleeAttack`
- `MeleeDefense`
- `RangedAttack`
- `RangedDefense`
- `MagicAttack`
- `MagicDefense`
- `CriticalChance`
- `Luck`

Recommended stat model:
- All combat stats are integers.
- `CriticalChance` is a percentage value (0-100), but practical caps apply.
- `Luck` affects loot quality rolls, escape odds, and rare event chance.
- V1 level cap is `100`.

## 7. World Structure (Procedural + Seeded)
Each new game is generated from a seed (player-entered or auto-generated).

### 7.1 Generated Content
- Overworld map
- Defined major cities (handcrafted templates placed by seed)
- Procedurally generated towns
- Dungeons
- Optional landmarks/events

### 7.2 Seed Rules
- Same seed = same world layout/content.
- Seed controls:
  - Region placement
  - Defined city placement
  - Generated town count
  - Dungeon count/difficulty bands
  - Encounter tables per biome
  - Shop inventory pools

### 7.3 Exploration Rule
- Inside city: safe zone (shops, inn, quests, inventory management)
- Outside city: chance-based encounter checks every movement step with linear scaling

### 7.4 Encounter Frequency (Linear by Biome + Level)
Formula:
- `EncounterChancePerStep = clamp(BiomeBase + (PlayerLevel * LevelFactor), MinChance, MaxChance)`

V1 defaults:
- `LevelFactor = 0.15%`
- `MinChance = 2%`
- `MaxChance = 35%`

Biome base examples:
- Road: `2%`
- Plains: `4%`
- Forest: `6%`
- Swamp: `8%`
- Badlands: `10%`

## 8. Combat System (Turn-Based, Dragon Quest Style)
### 8.0 Dice Model (DnD-style mixed dice)
Use these dice in combat:
- `d4`, `d6`, `d8`, `d10`, `d12` for weapon and spell damage
- `d20` for checks and rolls (initiative, hit, defend/flee checks, some status checks)

Starter weapon dice examples:
- Dagger/Wand: `1d4`
- Shortsword/Staff: `1d6`
- Sword/Bow: `1d8`
- Greatsword/Crossbow: `1d10`
- Greataxe/Warhammer: `1d12`

### 8.1 Turn Order
- Initiative roll each round:
  - `1d20 + LuckModifier + equipment/skill bonuses`

### 8.2 Player Turn Actions
- `Attack`
- `Skill` (unlocks later)
- `Item`
- `Defend`
- `Flee`

### 8.3 Hit and Damage Framework (v1)
- Hit roll: `1d20 + AttackStat + AccuracyBonus` vs `TargetDefense + 10`
- Damage roll:
  - Base: `WeaponDamageDie + AttackStatScaling`
  - Reduced by relevant defense
  - Minimum damage floor: `1`
- Crit check:
  - `d20 <= max(1, floor(CriticalChance / 5))`
  - Crit multiplier default: `1.5x`

### 8.4 Stat Matchups
- Melee attacks use `MeleeAttack` vs `MeleeDefense`
- Ranged attacks use `RangedAttack` vs `RangedDefense`
- Magic attacks use `MagicAttack` vs `MagicDefense`

### 8.5 Magic System Scope (v1)
Magic is intentionally simple in v1, with elemental spells inspired by classic RuneScape-style spell groups:
- `Air`
- `Water`
- `Earth`
- `Fire`

V1 magic depth rules:
- Small spell list per element
- Linear unlocks by level
- No deep branching talent tree in v1

## 9. Inventory and Equipment
### 9.1 Core Screens
- `Inventory`: consumables, materials, quest items
- `Equipment`: slots + stat comparison

Suggested slots:
- Weapon
- Head
- Chest
- Hands
- Legs
- Accessory 1
- Accessory 2

### 9.2 Equipment Scaling by Tier
New equipment tier every 10 levels.

| Player Level | Tier # | Tier Name |
|---|---:|---|
| 1-10 | 1 | Puny |
| 11-20 | 2 | Common |
| 21-30 | 3 | Sturdy |
| 31-40 | 4 | Fine |
| 41-50 | 5 | Heroic |
| 51-60 | 6 | Mythic |
| 61-70 | 7 | Relic |
| 71-80 | 8 | Legendary |
| 81-90 | 9 | Ancient |
| 91-100 | 10 | Divine |

Tier behavior:
- Each tier increases total stat budget and affix pool quality.
- Lower tiers can roll high variance but lower ceilings.
- Shops in higher-level cities bias toward local tier ranges.

## 10. Controller Support (Web)
Use browser `Gamepad API` with keyboard parity.

Required support:
- Full navigation in menus
- Exploration movement
- Combat action selection
- Inventory/equipment management

Fallback:
- Keyboard and mouse must remain fully playable.

## 11. UI Layout (No-Art Style)
### 11.1 Screen Composition
- Center: map grid/scene (colored shapes)
- Left panel: player stats + status
- Right panel: log + context actions
- Bottom panel: action buttons/hints

### 11.2 Visual Language
- Cities: blue square
- Towns: green circle
- Dungeons: red diamond
- Player: white triangle
- Enemy markers: orange hex

Keep color palette high-contrast and colorblind-safe.

## 12. Save/Load
Save data includes:
- Seed
- Player identity/build
- World state (visited nodes, cleared dungeons, active quests)
- Inventory/equipment
- Position and progression flags

Load Game returns player to latest saved state in generated world.

## 13. Technical Target (Web)
Recommended stack for this project:
- `TypeScript`
- `HTML5 Canvas` for map/shapes
- Lightweight UI layer for menus/panels (vanilla DOM or simple framework)
- Local save via `localStorage` initially, then optional cloud save later

## 14. First Build Roadmap
### Milestone 1 - Playable Skeleton
- Main menu
- Intro text sequence
- Character creation
- Seeded overworld with city + wilderness
- Step-based random encounters
- Basic 1v1 turn combat

### Milestone 2 - Progression Core
- XP + leveling
- Equipment slots + stat modifiers
- Tiered loot tables
- Inventory + item use

### Milestone 3 - World Depth
- Multiple cities/dungeons
- Shop + inn + quest board loop
- Enemy families by region

### Milestone 4 - Quality + Input
- Full controller support and rebinding
- Better balancing and combat log clarity
- Save/load robustness and edge-case handling

## 15. Locked v1 Decisions
1. Final level cap: `100`.
2. Dice model: DnD-style mixed dice for damage (`d4`, `d6`, `d8`, `d10`, `d12`) and `d20` for checks/rolls.
3. Encounter frequency: linear formula by biome base chance plus level scaling.
4. Cities: defined major cities plus mostly generated towns/world content for unique runs.
5. Magic depth: simple elemental spell system in v1 (no deep skill tree yet).
