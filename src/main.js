const STORAGE_KEY = "lazy-rpg-adventure-save-v1";
const MAX_LEVEL = 100;
const MAP_WIDTH = 80;
const MAP_HEIGHT = 60;
const TILE_SIZE = 24;
const VIEW_TILES_X = 28;
const VIEW_TILES_Y = 18;
const FULLSCREEN_VIEW_TILES_X = 44;
const FULLSCREEN_VIEW_TILES_Y = 28;
const WORLD_LOG_LIMIT = 16;
const COMBAT_LOG_LIMIT = 16;
const MAP_ZOOM_MIN = 0.35;
const MAP_ZOOM_MAX = 4.2;
const MAP_ZOOM_STEP = 0.25;
const DEFAULT_MAP_ZOOM = 3.2;

const ALL_STATS = [
  "Health",
  "MeleeAttack",
  "MeleeDefense",
  "RangedAttack",
  "RangedDefense",
  "MagicAttack",
  "MagicDefense",
  "CriticalChance",
  "Luck",
];

const TIER_NAMES = [
  "Puny",
  "Common",
  "Sturdy",
  "Fine",
  "Heroic",
  "Mythic",
  "Relic",
  "Legendary",
  "Ancient",
  "Divine",
];

const EQUIPMENT_SLOTS = [
  "Weapon",
  "Head",
  "Chest",
  "Hands",
  "Legs",
  "Accessory1",
  "Accessory2",
];

const BIOME_DATA = {
  road: { color: "#5f5d6b", baseEncounter: 2, label: "Road" },
  plains: { color: "#2f6f54", baseEncounter: 4, label: "Plains" },
  forest: { color: "#1f5a3a", baseEncounter: 6, label: "Forest" },
  swamp: { color: "#35646e", baseEncounter: 8, label: "Swamp" },
  badlands: { color: "#865f43", baseEncounter: 10, label: "Badlands" },
};

const ATTACK_TO_STATS = {
  Melee: { attack: "MeleeAttack", defense: "MeleeDefense" },
  Ranged: { attack: "RangedAttack", defense: "RangedDefense" },
  Magic: { attack: "MagicAttack", defense: "MagicDefense" },
};

const MAJOR_CITIES = [
  { id: "guffinford", name: "Guffinford" },
  { id: "snorvale", name: "Snorvale" },
  { id: "idlehaven", name: "Idlehaven" },
  { id: "dozeburg", name: "Dozeburg" },
];

const TOWN_PREFIXES = ["Moss", "Pebble", "Crook", "Tin", "Pickle", "Bramble", "Dust", "Hollow", "Rattle"];
const TOWN_SUFFIXES = ["wick", "ton", "mere", "bank", "cove", "rest", "ford", "dale", "run"];
const DUNGEON_NAMES = [
  "Boredom Pit",
  "The Mildly Haunted Cellar",
  "Cave of Unpaid Interns",
  "The Damp Spreadsheet",
  "Goblin Parking Garage",
  "Pit of Loud Skeletons",
  "Soggy Ruins",
  "The Bureaucratic Tomb",
];
const TRANSITION_NAMES = ["Moon Gate", "Rift Stair", "Echo Arch", "Lantern Crossing"];
const NPC_NAME_PREFIX = ["Alda", "Bram", "Cori", "Dax", "Elow", "Fenn", "Gora", "Hale", "Iris", "Juno"];
const NPC_NAME_SUFFIX = ["Wright", "Thorn", "Vale", "Mott", "Keen", "Frost", "Gale", "Rune", "Pike", "Dane"];
const NPC_ROLES = ["merchant", "guard", "scholar", "hunter", "healer", "bard"];
const PLAYER_TOKEN_PATHS = {
  Melee: "./src/assets/tokens/player-token-sword.svg",
  Ranged: "./src/assets/tokens/player-token-bow.svg",
  Magic: "./src/assets/tokens/player-token-staff.svg",
};
const FEATURE_TOKEN_PATHS = {
  city: "./src/assets/map-tokens/feature-city.svg",
  town: "./src/assets/map-tokens/feature-town.svg",
  dungeon: "./src/assets/map-tokens/feature-dungeon.svg",
  npc: "./src/assets/map-tokens/feature-npc.svg",
  chest: "./src/assets/map-tokens/feature-chest.svg",
  transition: "./src/assets/map-tokens/feature-transition.svg",
  grave: "./src/assets/map-tokens/feature-grave.svg",
  boss: "./src/assets/map-tokens/feature-boss.svg",
};
const BASE_START_STATS = {
  Health: 50,
  MeleeAttack: 1,
  MeleeDefense: 1,
  RangedAttack: 1,
  RangedDefense: 1,
  MagicAttack: 1,
  MagicDefense: 1,
  CriticalChance: 5,
  Luck: 1,
};
const STAT_POINT_INCREASES = {
  Health: 2,
  MeleeAttack: 1,
  MeleeDefense: 1,
  RangedAttack: 1,
  RangedDefense: 1,
  MagicAttack: 1,
  MagicDefense: 1,
  CriticalChance: 1,
  Luck: 1,
};
const SHOP_CONSUMABLE_PRICES = {
  minor_potion: 16,
  greater_potion: 38,
  mega_potion: 94,
  smoke_bomb: 42,
  fire_bomb: 70,
  focus_tonic: 62,
};

const INTRO_PAGES = [
  "In a world desperate for heroes, destiny chose with confidence. Then destiny tripped over paperwork.",
  "This is the tale of a person of ordinary talent and extraordinary bad timing.",
  "Armed with optimism, poor decisions, and suspiciously pointy equipment, they march toward glory.",
  "Historians will remember this journey. Mostly because nobody else agreed to do it.",
];

const DAMAGE_KINDS_BY_STYLE = {
  Melee: ["Slash", "Pierce", "Blunt"],
  Ranged: ["Pierce", "Blunt", "Slash"],
  Magic: ["Arcane", "Fire", "Ice", "Lightning", "Wind", "Earth", "Water"],
};

const WEAPON_LIBRARY = {
  Melee: [
    {
      id: "melee_dagger",
      name: "Dagger",
      slot: "Weapon",
      attackType: "Melee",
      damageDie: 4,
      speed: 9,
      damageKind: "Pierce",
      hitBonus: 2,
      critBonus: 4,
      summary: "Very fast and precise. Lower base damage, strong crit pressure.",
    },
    {
      id: "melee_short_sword",
      name: "Short Sword",
      slot: "Weapon",
      attackType: "Melee",
      damageDie: 6,
      speed: 7,
      damageKind: "Slash",
      hitBonus: 1,
      critBonus: 2,
      summary: "Balanced starter blade with reliable tempo.",
    },
    {
      id: "melee_longsword",
      name: "Longsword",
      slot: "Weapon",
      attackType: "Melee",
      damageDie: 8,
      speed: 6,
      damageKind: "Slash",
      hitBonus: 0,
      critBonus: 1,
      summary: "Solid reach and damage, slower than light swords.",
    },
    {
      id: "melee_greatsword",
      name: "2H Sword",
      slot: "Weapon",
      attackType: "Melee",
      damageDie: 10,
      speed: 4,
      damageKind: "Slash",
      hitBonus: 0,
      critBonus: 2,
      summary: "Heavy hits with slower swings and lower accuracy.",
    },
    {
      id: "melee_flail",
      name: "Flail",
      slot: "Weapon",
      attackType: "Melee",
      damageDie: 8,
      speed: 5,
      damageKind: "Blunt",
      hitBonus: 1,
      critBonus: 1,
      summary: "Crushing blunt strikes. Excellent into armored targets.",
    },
    {
      id: "melee_spear",
      name: "Spear",
      slot: "Weapon",
      attackType: "Melee",
      damageDie: 7,
      speed: 7,
      damageKind: "Pierce",
      hitBonus: 1,
      critBonus: 1,
      summary: "Reach-focused thrusting weapon with strong accuracy.",
    },
  ],
  Ranged: [
    {
      id: "ranged_shortbow",
      name: "Shortbow",
      slot: "Weapon",
      attackType: "Ranged",
      damageDie: 6,
      speed: 8,
      damageKind: "Pierce",
      hitBonus: 2,
      critBonus: 2,
      summary: "Fast arrows and reliable hit rate at all times.",
    },
    {
      id: "ranged_longbow",
      name: "Longbow",
      slot: "Weapon",
      attackType: "Ranged",
      damageDie: 8,
      speed: 6,
      damageKind: "Pierce",
      hitBonus: 1,
      critBonus: 3,
      summary: "Higher damage and crit pressure with slower draw speed.",
    },
    {
      id: "ranged_crossbow",
      name: "Crossbow",
      slot: "Weapon",
      attackType: "Ranged",
      damageDie: 10,
      speed: 4,
      damageKind: "Pierce",
      hitBonus: 0,
      critBonus: 2,
      summary: "Hard-hitting bolts with lower attack tempo.",
    },
    {
      id: "ranged_repeating",
      name: "Repeating Crossbow",
      slot: "Weapon",
      attackType: "Ranged",
      damageDie: 6,
      speed: 7,
      damageKind: "Pierce",
      hitBonus: 2,
      critBonus: 1,
      summary: "Rapid shots and smooth handling over raw bolt force.",
    },
    {
      id: "ranged_throwing_knives",
      name: "Throwing Knives",
      slot: "Weapon",
      attackType: "Ranged",
      damageDie: 5,
      speed: 9,
      damageKind: "Slash",
      hitBonus: 2,
      critBonus: 4,
      summary: "Very fast style with high crit chance and flexible damage type.",
    },
    {
      id: "ranged_sling",
      name: "Sling",
      slot: "Weapon",
      attackType: "Ranged",
      damageDie: 7,
      speed: 7,
      damageKind: "Blunt",
      hitBonus: 1,
      critBonus: 1,
      summary: "Blunt ranged damage that can punish skeleton-like foes.",
    },
  ],
  Magic: [
    {
      id: "magic_apprentice_wand",
      name: "Apprentice Wand",
      slot: "Weapon",
      attackType: "Magic",
      damageDie: 4,
      speed: 8,
      damageKind: "Arcane",
      hitBonus: 1,
      critBonus: 2,
      summary: "Stable focus for fast casting and arcane pressure.",
    },
    {
      id: "magic_oak_staff",
      name: "Oak Staff",
      slot: "Weapon",
      attackType: "Magic",
      damageDie: 6,
      speed: 6,
      damageKind: "Arcane",
      hitBonus: 1,
      critBonus: 1,
      summary: "Balanced spell focus with stronger base power.",
    },
    {
      id: "magic_fire_rod",
      name: "Fire Rod",
      slot: "Weapon",
      attackType: "Magic",
      damageDie: 7,
      speed: 5,
      damageKind: "Fire",
      hitBonus: 1,
      critBonus: 1,
      summary: "Elemental focus specialized for fire-based pressure.",
    },
    {
      id: "magic_frost_tome",
      name: "Frost Tome",
      slot: "Weapon",
      attackType: "Magic",
      damageDie: 7,
      speed: 5,
      damageKind: "Ice",
      hitBonus: 1,
      critBonus: 1,
      summary: "Steady ice focus with controlled, durable damage output.",
    },
    {
      id: "magic_storm_focus",
      name: "Storm Focus",
      slot: "Weapon",
      attackType: "Magic",
      damageDie: 6,
      speed: 7,
      damageKind: "Lightning",
      hitBonus: 2,
      critBonus: 1,
      summary: "Quick-cast catalyst tuned for lightning techniques.",
    },
    {
      id: "magic_earth_scepter",
      name: "Earth Scepter",
      slot: "Weapon",
      attackType: "Magic",
      damageDie: 8,
      speed: 4,
      damageKind: "Earth",
      hitBonus: 0,
      critBonus: 2,
      summary: "Slow but heavy elemental focus with strong base impact.",
    },
  ],
};

const COMBAT_STYLES = {
  Melee: {
    baseStats: { ...BASE_START_STATS },
    defaultWeaponId: "melee_short_sword",
  },
  Ranged: {
    baseStats: { ...BASE_START_STATS },
    defaultWeaponId: "ranged_shortbow",
  },
  Magic: {
    baseStats: { ...BASE_START_STATS },
    defaultWeaponId: "magic_apprentice_wand",
  },
};

const ENEMY_POOLS = {
  road: [
    { id: "toll_bandit", name: "Toll Bandit", attackType: "Melee", damageDie: 6, crit: 7, weaknesses: ["Blunt"], resistances: ["Pierce"], hpScale: 1.02, offenseScale: 1, defenseScale: 1.04 },
    { id: "aggressive_goose", name: "Aggressive Goose", attackType: "Ranged", damageDie: 4, crit: 10, weaknesses: ["Slash"], resistances: ["Pierce"], hpScale: 0.88, offenseScale: 1.08, defenseScale: 0.9 },
    { id: "accountant_doom", name: "Accountant of Doom", attackType: "Magic", damageDie: 6, crit: 8, weaknesses: ["Blunt", "Lightning"], resistances: ["Arcane", "Water"], hpScale: 1, offenseScale: 1.06, defenseScale: 0.98 },
  ],
  plains: [
    { id: "lazy_slime", name: "Lazy Slime", attackType: "Melee", damageDie: 6, crit: 6, weaknesses: ["Slash", "Fire"], resistances: ["Blunt"], hpScale: 1.07, offenseScale: 0.95, defenseScale: 0.96 },
    { id: "horned_rabbit", name: "Horned Rabbit", attackType: "Ranged", damageDie: 6, crit: 9, weaknesses: ["Pierce"], resistances: ["Blunt"], hpScale: 0.92, offenseScale: 1.12, defenseScale: 0.92 },
    { id: "wandering_squire", name: "Wandering Squire", attackType: "Melee", damageDie: 8, crit: 7, weaknesses: ["Blunt"], resistances: ["Slash"], hpScale: 1.08, offenseScale: 1.02, defenseScale: 1.06 },
  ],
  forest: [
    { id: "moss_goblin", name: "Moss Goblin", attackType: "Melee", damageDie: 8, crit: 8, weaknesses: ["Slash", "Fire"], resistances: ["Pierce"], hpScale: 1.04, offenseScale: 1.03, defenseScale: 1.02 },
    { id: "twig_archer", name: "Twig Archer", attackType: "Ranged", damageDie: 8, crit: 10, weaknesses: ["Slash", "Fire"], resistances: ["Pierce"], hpScale: 0.95, offenseScale: 1.1, defenseScale: 0.94 },
    { id: "mushroom_hexer", name: "Mushroom Hexer", attackType: "Magic", damageDie: 8, crit: 9, weaknesses: ["Fire", "Slash"], resistances: ["Water", "Earth"], hpScale: 1, offenseScale: 1.08, defenseScale: 0.99 },
  ],
  swamp: [
    { id: "bog_lurker", name: "Bog Lurker", attackType: "Melee", damageDie: 10, crit: 8, weaknesses: ["Fire", "Slash"], resistances: ["Blunt", "Water"], hpScale: 1.12, offenseScale: 1.05, defenseScale: 1.08 },
    { id: "leech_sniper", name: "Leech Sniper", attackType: "Ranged", damageDie: 8, crit: 11, weaknesses: ["Blunt", "Fire"], resistances: ["Pierce"], hpScale: 0.98, offenseScale: 1.14, defenseScale: 0.96 },
    { id: "mud_oracle", name: "Mud Oracle", attackType: "Magic", damageDie: 10, crit: 9, weaknesses: ["Lightning", "Ice"], resistances: ["Earth", "Water"], hpScale: 1.05, offenseScale: 1.08, defenseScale: 1.04 },
  ],
  badlands: [
    { id: "dust_marauder", name: "Dust Marauder", attackType: "Melee", damageDie: 10, crit: 9, weaknesses: ["Pierce"], resistances: ["Slash", "Earth"], hpScale: 1.1, offenseScale: 1.08, defenseScale: 1.1 },
    { id: "scorpion_ballista", name: "Scorpion Ballista", attackType: "Ranged", damageDie: 10, crit: 12, weaknesses: ["Blunt"], resistances: ["Pierce", "Slash"], hpScale: 1.02, offenseScale: 1.16, defenseScale: 1.04 },
    { id: "ash_warlock", name: "Ash Warlock", attackType: "Magic", damageDie: 12, crit: 10, weaknesses: ["Water", "Pierce"], resistances: ["Fire", "Arcane"], hpScale: 1.07, offenseScale: 1.1, defenseScale: 1.05 },
  ],
};

const DIFFICULTY_PRESETS = {
  Easy: {
    enemyHp: 0.78,
    enemyAttack: 0.78,
    enemyDefense: 0.82,
    playerDamage: 1.14,
    xp: 1.2,
    loot: 1.2,
    bossBoost: 1.5,
    summary: "Most forgiving combat tuning with strong rewards.",
    deathRule: "On defeat: lose nothing and return at full HP.",
    deathMode: "none",
    deathRestoreRatio: 1,
  },
  Normal: {
    enemyHp: 0.92,
    enemyAttack: 0.92,
    enemyDefense: 0.94,
    playerDamage: 1.03,
    xp: 1,
    loot: 1,
    bossBoost: 1.68,
    summary: "Balanced baseline with moderate challenge and rewards.",
    deathRule: "On defeat: lose a chunk of gold, then respawn in town.",
    deathMode: "gold",
    deathRestoreRatio: 0.7,
    deathGoldLossRate: 0.2,
    deathGoldLossFlat: 8,
    deathGoldLossPerLevel: 3,
  },
  Hard: {
    enemyHp: 1.08,
    enemyAttack: 1.08,
    enemyDefense: 1.04,
    playerDamage: 0.94,
    xp: 1.12,
    loot: 1.15,
    bossBoost: 1.88,
    summary: "Tighter fights and stronger bosses with better loot.",
    deathRule: "On defeat: equipped gear drops on the map and must be recovered.",
    deathMode: "gear",
    deathRestoreRatio: 0.65,
  },
  Legendary: {
    enemyHp: 1.28,
    enemyAttack: 1.22,
    enemyDefense: 1.12,
    playerDamage: 0.88,
    xp: 1.25,
    loot: 1.3,
    bossBoost: 2.1,
    summary: "Relentless combat pressure tuned for high-risk play.",
    deathRule: "On defeat: lose gold and drop equipped gear for later recovery.",
    deathMode: "gear_gold",
    deathRestoreRatio: 0.6,
    deathGoldLossRate: 0.26,
    deathGoldLossFlat: 12,
    deathGoldLossPerLevel: 4,
  },
};

const WEAPON_ABILITY_SETS = {
  Melee: [
    { level: 1, name: "Sweeping Slash", damageDice: [6], hitBonus: 1, attackScale: 0.62, defenseScale: 0.28, critBonus: 2, damageKind: "Slash" },
    { level: 4, name: "Shieldbreaker", damageDice: [8], hitBonus: 2, attackScale: 0.66, defenseScale: 0.22, critBonus: 3, damageKind: "Blunt" },
    { level: 8, name: "Relentless Cleave", damageDice: [8, 4], hitBonus: 2, attackScale: 0.69, defenseScale: 0.18, critBonus: 4, damageKind: null },
    { level: 12, name: "Earthsplitter", damageDice: [10, 4], hitBonus: 3, attackScale: 0.72, defenseScale: 0.15, critBonus: 5, damageKind: "Blunt" },
    { level: 17, name: "Iron Tempest", damageDice: [10, 6], hitBonus: 3, attackScale: 0.75, defenseScale: 0.12, critBonus: 6, damageKind: null },
    { level: 24, name: "Colossus Crash", damageDice: [12, 8], hitBonus: 4, attackScale: 0.8, defenseScale: 0.1, critBonus: 8, damageKind: "Blunt" },
    { level: 32, name: "Worldrender", damageDice: [12, 10], hitBonus: 4, attackScale: 0.84, defenseScale: 0.08, critBonus: 10, damageKind: null },
  ],
  Ranged: [
    { level: 1, name: "Quick Volley", damageDice: [4, 4], hitBonus: 3, attackScale: 0.55, defenseScale: 0.26, critBonus: 6, damageKind: null },
    { level: 4, name: "Piercing Shot", damageDice: [8], hitBonus: 4, attackScale: 0.58, defenseScale: 0.22, critBonus: 9, damageKind: "Pierce" },
    { level: 8, name: "Ricochet Bolt", damageDice: [6, 6], hitBonus: 4, attackScale: 0.61, defenseScale: 0.18, critBonus: 11, damageKind: null },
    { level: 12, name: "Rain of Arrows", damageDice: [6, 6, 4], hitBonus: 5, attackScale: 0.64, defenseScale: 0.17, critBonus: 12, damageKind: "Pierce" },
    { level: 17, name: "Sniper's Oath", damageDice: [12], hitBonus: 6, attackScale: 0.66, defenseScale: 0.15, critBonus: 15, damageKind: "Pierce" },
    { level: 24, name: "Starfall Volley", damageDice: [8, 8, 6], hitBonus: 6, attackScale: 0.7, defenseScale: 0.13, critBonus: 17, damageKind: null },
    { level: 32, name: "Zero Wind Barrage", damageDice: [10, 10, 8], hitBonus: 7, attackScale: 0.75, defenseScale: 0.1, critBonus: 20, damageKind: "Pierce" },
  ],
  Magic: [
    { level: 1, name: "Air Strike", damageDice: [6], hitBonus: 2, attackScale: 0.62, defenseScale: 0.25, critBonus: 2, damageKind: "Wind" },
    { level: 3, name: "Water Strike", damageDice: [8], hitBonus: 2, attackScale: 0.65, defenseScale: 0.22, critBonus: 3, damageKind: "Water" },
    { level: 6, name: "Earth Strike", damageDice: [10], hitBonus: 2, attackScale: 0.67, defenseScale: 0.2, critBonus: 4, damageKind: "Earth" },
    { level: 9, name: "Fire Strike", damageDice: [12], hitBonus: 3, attackScale: 0.7, defenseScale: 0.18, critBonus: 5, damageKind: "Fire" },
    { level: 13, name: "Storm Lance", damageDice: [10, 6], hitBonus: 3, attackScale: 0.73, defenseScale: 0.16, critBonus: 6, damageKind: "Lightning" },
    { level: 18, name: "Glacial Crown", damageDice: [10, 8], hitBonus: 4, attackScale: 0.76, defenseScale: 0.14, critBonus: 7, damageKind: "Ice" },
    { level: 24, name: "Volcanic Wake", damageDice: [12, 10], hitBonus: 4, attackScale: 0.8, defenseScale: 0.12, critBonus: 8, damageKind: "Fire" },
    { level: 32, name: "Astral Cataclysm", damageDice: [12, 12, 10], hitBonus: 5, attackScale: 0.86, defenseScale: 0.09, critBonus: 10, damageKind: "Arcane" },
  ],
};

const RARITY_DATA = {
  Common: { weight: 58, modScale: 1, color: "#c8d2e6" },
  Uncommon: { weight: 24, modScale: 1.2, color: "#79c784" },
  Rare: { weight: 11, modScale: 1.45, color: "#65a8ff" },
  Epic: { weight: 5, modScale: 1.8, color: "#c37af5" },
  Legendary: { weight: 2, modScale: 2.2, color: "#ffbf5d" },
};

const CONSUMABLE_DEFS = {
  minor_potion: { id: "minor_potion", name: "Minor Potion", description: "Recover 24 Health.", heal: 24, rarity: "Common" },
  greater_potion: { id: "greater_potion", name: "Greater Potion", description: "Recover 56 Health.", heal: 56, rarity: "Uncommon" },
  mega_potion: { id: "mega_potion", name: "Mega Potion", description: "Recover 120 Health.", heal: 120, rarity: "Rare" },
  smoke_bomb: { id: "smoke_bomb", name: "Smoke Bomb", description: "Escape from battle instantly.", flee: true, rarity: "Uncommon" },
  fire_bomb: { id: "fire_bomb", name: "Fire Bomb", description: "Deal 40 + 1d12 fire damage.", damage: 40, die: 12, rarity: "Rare" },
  focus_tonic: { id: "focus_tonic", name: "Focus Tonic", description: "Gain +8 Critical Chance for 3 turns.", critBuff: 8, buffTurns: 3, rarity: "Rare" },
};

const MATERIAL_DEFS = {
  slime_gel: { id: "slime_gel", name: "Slime Gel", description: "Sticky material from basic monsters." },
  iron_scrap: { id: "iron_scrap", name: "Iron Scrap", description: "Useful for improvised upgrades." },
  arcane_dust: { id: "arcane_dust", name: "Arcane Dust", description: "Shimmering residue from magic foes." },
  beast_fang: { id: "beast_fang", name: "Beast Fang", description: "Sharp and probably still warm." },
};

const TREASURE_DEFS = {
  old_coin: { id: "old_coin", name: "Old Coin", description: "A relic worth selling." },
  royal_seal: { id: "royal_seal", name: "Royal Seal", description: "Collectors pay good gold for this." },
  dragon_lacquer: { id: "dragon_lacquer", name: "Dragon Lacquer", description: "Rare luxury crafting fluid." },
};

const BOSS_TITLES = [
  "Overdue Ogre",
  "The Tax Dragon",
  "Moss Tyrant",
  "The Bureau Lich",
  "Clockwork Minotaur",
  "Titan of Naps",
  "Abyssal Bookkeeper",
];

const NPC_DIALOG = {
  city: [
    "A guard squints and asks if you are licensed for heroism.",
    "A bard sings your name with suspicious confidence.",
    "A merchant whispers: 'Buy low, sell high, avoid ogres.'",
    "A guild clerk marks your name in the ledger under 'unlikely success stories.'",
    "A retired knight says, 'Good armor is expensive, but so is a funeral.'",
    "A cartographer offers directions that somehow end in a bakery.",
  ],
  town: [
    "A villager points at a dungeon and says, 'Please go bother that instead of us.'",
    "A blacksmith offers advice: 'Hit first, apologize later.'",
    "A child asks if your sword can cut homework in half.",
    "A miller asks you to keep slimes away from the grain.",
    "A courier swears the roads are safer since you started traveling them.",
    "An innkeeper keeps a tab labeled 'hero incidents'.",
  ],
  wild: [
    "A traveling cleric blesses your backpack and leaves before questions.",
    "A ranger warns: 'If the bushes hiss, run.'",
    "A wandering cook hands you stew and refuses to explain what was in it.",
    "A scavenger points toward smoke and says treasure usually burns there.",
    "A hermit claims the moon owes them money.",
    "A masked hunter asks if you are here for bounties or bad decisions.",
  ],
};

const NPC_ROLE_DIALOG = {
  merchant: [
    "Best prices in three biomes, worst prices in the other two.",
    "If you clear that dungeon, I can reopen my supply route.",
    "I sell maps, rope, and confidence. Confidence costs extra.",
  ],
  guard: [
    "Patrol reports say the roads are calmer when you are nearby.",
    "The watch captain posted a bounty board in the square.",
    "Stay sharp. Monsters love lazy heroes with expensive gear.",
  ],
  scholar: [
    "Ancient stones react to travelers with unfinished business.",
    "The ruins were once a city. It had worse taxes than this one.",
    "I can decode relics if you bring me enough fragments.",
  ],
  hunter: [
    "Tracks head east. Big claws. Bigger attitude.",
    "Badlands beasts fear arrows, but not enough.",
    "If you hear silence in the forest, something noticed you first.",
  ],
  healer: [
    "Keep your potions dry and your bandages cleaner than your sword.",
    "Your pulse says brave, your bruises say reckless.",
    "I can patch you up, but please stop testing gravity in dungeons.",
  ],
  bard: [
    "Your legend now has three versions and two of them are flattering.",
    "Songs travel faster than heroes. Pay your tab before fame arrives.",
    "If you slay another tyrant, I can rhyme it with 'pantry'.",
  ],
};

const STORY_CHAPTERS = [
  { title: "Chapter 1 - Clerical Error", text: "The realm mistakenly designates you as Champion. Nobody has fixed the paperwork yet." },
  { title: "Chapter 2 - Rumors in the Streets", text: "Locals begin to recognize your face and your increasingly expensive repairs." },
  { title: "Chapter 3 - First Boss Falls", text: "News spreads: the dungeons are not safe from you anymore." },
  { title: "Chapter 4 - Hunter of Tyrants", text: "You become known as a breaker of lairs and paperwork alike." },
  { title: "Chapter 5 - Legend of the Lazy Hero", text: "Your saga is told in taverns, often with dramatic exaggeration and fewer pants." },
];

const ACHIEVEMENT_DEFS = [
  { id: "first_blood", name: "First Blood", description: "Win your first encounter." },
  { id: "boss_hunter", name: "Boss Hunter", description: "Defeat your first dungeon boss." },
  { id: "boss_breaker", name: "Boss Breaker", description: "Defeat 5 dungeon bosses." },
  { id: "socialite", name: "Socialite", description: "Talk to NPCs 10 times." },
  { id: "pack_rat", name: "Pack Rat", description: "Carry at least 20 item stacks." },
  { id: "apprentice", name: "Apprentice", description: "Reach level 10." },
  { id: "veteran", name: "Veteran", description: "Reach level 25." },
  { id: "legend", name: "Legend", description: "Reach level 50." },
];

const MUSIC_THEMES = {
  menu: {
    stepMs: 560,
    bass: [110, 123, 98, 110, 131, 123, 110, 98],
    chords: [
      [220, 277, 330, 440],
      [246, 311, 369, 493],
      [196, 247, 294, 392],
      [220, 277, 330, 440],
      [262, 330, 392, 523],
      [246, 311, 369, 493],
      [220, 277, 330, 440],
      [196, 247, 294, 392],
    ],
    melody: [440, 523, 587, 659, 740, 659, 587, 523],
    counter: [330, 392, 440, 494, 523, 494, 440, 392],
    bassWave: "triangle",
    chordWave: "sine",
    melodyWave: "triangle",
    counterWave: "sine",
    bassGain: 0.1,
    chordGain: 0.06,
    melodyGain: 0.095,
    counterGain: 0.05,
    percussionPattern: ["kick", "hat", "none", "hat", "kick", "hat", "snare", "hat"],
    percussionGain: 0.03,
  },
  world: {
    stepMs: 620,
    bass: [98, 110, 87, 98, 98, 117, 87, 82],
    chords: [
      [196, 247, 294, 392],
      [220, 277, 330, 440],
      [174, 220, 262, 349],
      [196, 247, 294, 392],
      [196, 247, 311, 392],
      [233, 294, 349, 466],
      [174, 220, 262, 349],
      [164, 208, 247, 330],
    ],
    melody: [392, 440, 494, 523, 587, 523, 494, 440],
    counter: [294, 330, 349, 392, 440, 392, 349, 330],
    bassWave: "sawtooth",
    chordWave: "sine",
    melodyWave: "triangle",
    counterWave: "sine",
    bassGain: 0.11,
    chordGain: 0.06,
    melodyGain: 0.09,
    counterGain: 0.05,
    percussionPattern: ["kick", "hat", "none", "hat", "kick", "hat", "snare", "hat"],
    percussionGain: 0.035,
  },
  worldForest: {
    stepMs: 650,
    bass: [87, 92, 98, 104, 98, 92, 87, 82],
    chords: [
      [174, 220, 262, 349],
      [185, 233, 277, 370],
      [196, 247, 294, 392],
      [208, 262, 311, 415],
      [196, 247, 294, 392],
      [185, 233, 277, 370],
      [174, 220, 262, 349],
      [165, 208, 247, 330],
    ],
    melody: [349, 392, 440, 466, 523, 466, 440, 392],
    counter: [262, 294, 311, 349, 392, 349, 311, 294],
    bassWave: "triangle",
    chordWave: "triangle",
    melodyWave: "sine",
    counterWave: "sine",
    bassGain: 0.1,
    chordGain: 0.058,
    melodyGain: 0.082,
    counterGain: 0.046,
    percussionPattern: ["kick", "none", "hat", "none", "kick", "hat", "none", "hat"],
    percussionGain: 0.028,
  },
  worldSwamp: {
    stepMs: 680,
    bass: [73, 78, 82, 87, 82, 78, 73, 69],
    chords: [
      [146, 185, 220, 277],
      [155, 196, 233, 294],
      [164, 208, 247, 311],
      [146, 185, 220, 277],
      [138, 174, 208, 262],
      [146, 185, 220, 277],
      [155, 196, 233, 294],
      [130, 164, 196, 247],
    ],
    melody: [294, 311, 349, 392, 415, 392, 349, 311],
    counter: [220, 233, 262, 277, 311, 277, 262, 233],
    bassWave: "sawtooth",
    chordWave: "triangle",
    melodyWave: "square",
    counterWave: "sine",
    bassGain: 0.11,
    chordGain: 0.06,
    melodyGain: 0.082,
    counterGain: 0.044,
    percussionPattern: ["kick", "hat", "snare", "none", "kick", "hat", "none", "hat"],
    percussionGain: 0.034,
  },
  worldBadlands: {
    stepMs: 600,
    bass: [82, 87, 98, 92, 82, 98, 92, 87],
    chords: [
      [164, 208, 247, 330],
      [174, 220, 262, 349],
      [196, 247, 294, 392],
      [185, 233, 277, 370],
      [174, 220, 262, 349],
      [196, 247, 294, 392],
      [185, 233, 277, 370],
      [174, 220, 262, 349],
    ],
    melody: [392, 440, 466, 523, 587, 523, 466, 440],
    counter: [294, 330, 349, 392, 440, 392, 349, 330],
    bassWave: "sawtooth",
    chordWave: "square",
    melodyWave: "triangle",
    counterWave: "triangle",
    bassGain: 0.12,
    chordGain: 0.064,
    melodyGain: 0.1,
    counterGain: 0.05,
    percussionPattern: ["kick", "hat", "snare", "hat", "kick", "hat", "snare", "hat"],
    percussionGain: 0.042,
  },
  worldTown: {
    stepMs: 640,
    bass: [98, 104, 110, 117, 110, 104, 98, 92],
    chords: [
      [196, 247, 294, 392],
      [208, 262, 311, 415],
      [220, 277, 330, 440],
      [233, 294, 349, 466],
      [220, 277, 330, 440],
      [208, 262, 311, 415],
      [196, 247, 294, 392],
      [185, 233, 277, 370],
    ],
    melody: [392, 440, 494, 523, 587, 523, 494, 440],
    counter: [294, 330, 349, 392, 440, 392, 349, 330],
    bassWave: "triangle",
    chordWave: "sine",
    melodyWave: "triangle",
    counterWave: "sine",
    bassGain: 0.1,
    chordGain: 0.06,
    melodyGain: 0.092,
    counterGain: 0.048,
    percussionPattern: ["kick", "none", "hat", "none", "kick", "hat", "none", "hat"],
    percussionGain: 0.026,
  },
  worldDungeon: {
    stepMs: 520,
    bass: [73, 69, 65, 62, 73, 69, 65, 58],
    chords: [
      [146, 174, 220, 277],
      [138, 165, 208, 262],
      [130, 155, 196, 247],
      [123, 146, 185, 233],
      [146, 174, 220, 277],
      [138, 165, 208, 262],
      [130, 155, 196, 247],
      [116, 146, 174, 220],
    ],
    melody: [330, 349, 392, 415, 466, 415, 392, 349],
    counter: [247, 262, 294, 311, 349, 311, 294, 262],
    bassWave: "sawtooth",
    chordWave: "triangle",
    melodyWave: "square",
    counterWave: "triangle",
    bassGain: 0.13,
    chordGain: 0.068,
    melodyGain: 0.104,
    counterGain: 0.05,
    percussionPattern: ["kick", "hat", "snare", "hat", "kick", "hat", "snare", "hat"],
    percussionGain: 0.046,
  },
  combat: {
    stepMs: 410,
    bass: [110, 98, 92, 87, 123, 110, 98, 92],
    chords: [
      [220, 262, 330, 392],
      [196, 247, 311, 392],
      [185, 233, 294, 370],
      [174, 220, 277, 349],
      [233, 277, 349, 466],
      [220, 262, 330, 440],
      [196, 247, 311, 392],
      [185, 233, 294, 370],
    ],
    melody: [440, 523, 587, 659, 698, 659, 587, 523],
    counter: [220, 247, 262, 294, 330, 294, 262, 247],
    bassWave: "sawtooth",
    chordWave: "square",
    melodyWave: "square",
    counterWave: "triangle",
    bassGain: 0.13,
    chordGain: 0.07,
    melodyGain: 0.115,
    counterGain: 0.05,
    percussionPattern: ["kick", "hat", "snare", "hat", "kick", "hat", "snare", "hat"],
    percussionGain: 0.05,
  },
  victory: {
    stepMs: 260,
    bass: [131, 147, 165, 196, 220, 196, 165, 131],
    chords: [
      [262, 330, 392],
      [294, 370, 440],
      [330, 415, 494],
      [392, 494, 587],
      [440, 554, 659],
      [392, 494, 587],
      [330, 415, 494],
      [262, 330, 392],
    ],
    melody: [523, 587, 659, 784, 880, 784, 659, 587],
    bassWave: "triangle",
    chordWave: "sine",
    melodyWave: "triangle",
    counter: [330, 370, 415, 494, 554, 494, 415, 370],
    counterWave: "sine",
    bassGain: 0.09,
    chordGain: 0.06,
    melodyGain: 0.09,
    counterGain: 0.05,
    percussionPattern: ["kick", "hat", "none", "hat", "kick", "hat", "snare", "hat"],
    percussionGain: 0.03,
  },
};

const CONTROL_PROMPTS = {
  keyboard: {
    interact: "Action [F]",
    character: "Character [C]",
    shop: "Shop [Action]",
    talk: "Talk [Action]",
    save: "Save [P]",
    menu: "Menu [M]",
    hint: "Keyboard: Move WASD/Arrows. Character menu C. Map fullscreen V. Zoom +/-/0. Quick open: I/E/U/Q/K/O/H.",
  },
  controller: {
    interact: "Action (A)",
    character: "Character (Y)",
    shop: "Shop (Action)",
    talk: "Talk (Action)",
    save: "Save (START)",
    menu: "Menu (B)",
    hint: "Controller: Move D-pad/Left Stick. A = contextual action. Character menu Y. Fullscreen map X. Zoom LB/RB. Scroll Right Stick.",
  },
};

const CHARACTER_MODAL_TABS = ["character", "inventory", "equipment", "levelup", "quests", "bestiary", "story", "achievements"];

const els = {
  screens: {
    menu: document.getElementById("screen-menu"),
    intro: document.getElementById("screen-intro"),
    create: document.getElementById("screen-create"),
    options: document.getElementById("screen-options"),
    world: document.getElementById("screen-world"),
    combat: document.getElementById("screen-combat"),
  },
  menuMessage: document.getElementById("menu-message"),
  introText: document.getElementById("intro-text"),
  introNext: document.getElementById("intro-next"),
  introSkip: document.getElementById("intro-skip"),
  nameInput: document.getElementById("name-input"),
  styleButtons: document.getElementById("style-buttons"),
  weaponButtons: document.getElementById("weapon-buttons"),
  weaponInfo: document.getElementById("weapon-info"),
  cityButtons: document.getElementById("city-buttons"),
  difficultyButtons: document.getElementById("difficulty-buttons"),
  difficultyInfo: document.getElementById("difficulty-info"),
  seedInput: document.getElementById("seed-input"),
  seedRandom: document.getElementById("seed-random"),
  createStart: document.getElementById("create-start"),
  createBack: document.getElementById("create-back"),
  optionCombatLog: document.getElementById("option-combat-log"),
  optionControllerVibe: document.getElementById("option-controller-vibe"),
  optionSfx: document.getElementById("option-sfx"),
  optionMusic: document.getElementById("option-music"),
  optionAutoLevel: document.getElementById("option-auto-level"),
  optionDebug: document.getElementById("option-debug"),
  optionMasterVolume: document.getElementById("option-master-volume"),
  optionMasterVolumeValue: document.getElementById("option-master-volume-value"),
  optionMusicVolume: document.getElementById("option-music-volume"),
  optionMusicVolumeValue: document.getElementById("option-music-volume-value"),
  optionSfxVolume: document.getElementById("option-sfx-volume"),
  optionSfxVolumeValue: document.getElementById("option-sfx-volume-value"),
  optionsBack: document.getElementById("options-back"),
  mapCanvas: document.getElementById("map-canvas"),
  mapLegend: document.getElementById("map-legend"),
  playerSummary: document.getElementById("player-summary"),
  playerStats: document.getElementById("player-stats"),
  worldContext: document.getElementById("world-context"),
  worldLog: document.getElementById("world-log"),
  worldInteract: document.getElementById("world-interact"),
  worldCharacter: document.getElementById("world-character"),
  worldShop: document.getElementById("world-shop"),
  worldTalk: document.getElementById("world-talk"),
  worldSave: document.getElementById("world-save"),
  worldMenu: document.getElementById("world-menu"),
  worldMapToggle: document.getElementById("world-map-toggle"),
  worldMapZoomOut: document.getElementById("world-map-zoom-out"),
  worldMapZoomIn: document.getElementById("world-map-zoom-in"),
  worldMapZoomReset: document.getElementById("world-map-zoom-reset"),
  worldControlsHint: document.getElementById("world-controls-hint"),
  worldShortcutsHint: document.getElementById("world-shortcuts-hint"),
  combatPlayer: document.getElementById("combat-player"),
  combatEnemy: document.getElementById("combat-enemy"),
  combatTitle: document.getElementById("combat-title"),
  combatLog: document.getElementById("combat-log"),
  combatActions: document.getElementById("combat-actions"),
  combatReturn: document.getElementById("combat-return"),
  modalBackdrop: document.getElementById("modal-backdrop"),
  modalTitle: document.getElementById("modal-title"),
  modalContent: document.getElementById("modal-content"),
  modalClose: document.getElementById("modal-close"),
};

const ctx = els.mapCanvas.getContext("2d");

const state = {
  screen: "menu",
  introIndex: 0,
  creation: {
    name: "",
    style: "Melee",
    weaponId: getDefaultWeaponIdForStyle("Melee"),
    cityId: MAJOR_CITIES[0].id,
    difficulty: "Normal",
    seed: randomSeed(),
  },
  options: {
    verboseCombatLog: true,
    gamepadEnabled: true,
    sfxEnabled: true,
    musicEnabled: true,
    autoLevelUp: false,
    debugMode: false,
    masterVolume: 0.8,
    musicVolume: 0.9,
    sfxVolume: 0.9,
  },
  game: null,
  combat: null,
  modal: null,
  modalData: null,
  inputMode: "keyboard",
  focusables: [],
  focusIndex: 0,
  gamepad: { previousButtons: [], axisXReadyAt: 0, axisYReadyAt: 0, scrollReadyAt: 0 },
  map: {
    fullscreen: false,
    zoom: DEFAULT_MAP_ZOOM,
  },
  assets: {
    playerTokens: { Melee: null, Ranged: null, Magic: null },
    featureTokens: {},
  },
  audio: {
    context: null,
    master: null,
    musicBus: null,
    sfxBus: null,
    started: false,
    mode: "world",
    step: 0,
    intervalId: null,
    victoryTimeoutId: null,
  },
};

initialize();

function initialize() {
  loadPlayerTokenAssets();
  loadFeatureTokenAssets();
  bindEvents();
  updateOptionsUi();
  updateControlPromptUi();
  updateMapUi();
  renderCreationSelectors();
  renderIntro();
  els.seedInput.value = state.creation.seed;
  showScreen("menu");
  requestAnimationFrame(gamepadLoop);
}

function loadPlayerTokenAssets() {
  Object.entries(PLAYER_TOKEN_PATHS).forEach(([style, path]) => {
    const img = new Image();
    img.decoding = "async";
    img.src = path;
    img.onload = () => {
      if (state.screen === "world") renderWorld();
    };
    state.assets.playerTokens[style] = img;
  });
}

function loadFeatureTokenAssets() {
  Object.entries(FEATURE_TOKEN_PATHS).forEach(([key, path]) => {
    const img = new Image();
    img.decoding = "async";
    img.src = path;
    img.onload = () => {
      if (state.screen === "world") renderWorld();
    };
    state.assets.featureTokens[key] = img;
  });
}

function bindEvents() {
  document.querySelectorAll(".menu-btn").forEach((button) => {
    button.addEventListener("click", () => handleMenuAction(button.dataset.menuAction));
  });

  els.introNext.addEventListener("click", onIntroNext);
  els.introSkip.addEventListener("click", () => {
    state.introIndex = 0;
    showScreen("create");
  });

  els.styleButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-style]");
    if (!button) return;
    state.creation.style = button.dataset.style;
    const selected = getWeaponTemplateForStyle(state.creation.style, state.creation.weaponId);
    state.creation.weaponId = selected ? selected.id : getDefaultWeaponIdForStyle(state.creation.style);
    renderCreationSelectors();
  });

  els.weaponButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-weapon-id]");
    if (!button) return;
    state.creation.weaponId = button.dataset.weaponId;
    renderCreationSelectors();
  });

  els.cityButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-city-id]");
    if (!button) return;
    state.creation.cityId = button.dataset.cityId;
    renderCreationSelectors();
  });

  els.difficultyButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-difficulty]");
    if (!button) return;
    state.creation.difficulty = button.dataset.difficulty;
    renderCreationSelectors();
  });

  els.seedRandom.addEventListener("click", () => {
    const seed = randomSeed();
    state.creation.seed = seed;
    els.seedInput.value = seed;
  });
  els.nameInput.addEventListener("input", () => {
    state.creation.name = els.nameInput.value;
  });
  els.seedInput.addEventListener("input", () => {
    state.creation.seed = els.seedInput.value;
  });

  els.createStart.addEventListener("click", beginAdventure);
  els.createBack.addEventListener("click", () => showScreen("menu"));
  els.optionsBack.addEventListener("click", () => showScreen("menu"));

  els.optionCombatLog.addEventListener("change", () => {
    state.options.verboseCombatLog = !!els.optionCombatLog.checked;
  });
  els.optionControllerVibe.addEventListener("change", () => {
    state.options.gamepadEnabled = !!els.optionControllerVibe.checked;
  });
  els.optionSfx.addEventListener("change", () => {
    state.options.sfxEnabled = !!els.optionSfx.checked;
    applyAudioMixLevels();
  });
  els.optionMusic.addEventListener("change", () => {
    state.options.musicEnabled = !!els.optionMusic.checked;
    applyAudioMixLevels();
    if (state.options.musicEnabled) {
      ensureAudioStarted();
      syncMusicForCurrentContext();
    } else {
      clearVictoryMusicTimer();
      stopMusicLoop();
    }
  });
  els.optionAutoLevel.addEventListener("change", () => {
    state.options.autoLevelUp = !!els.optionAutoLevel.checked;
    updateControlPromptUi();
    if (!state.options.autoLevelUp || !state.game?.player) return;
    if ((state.game.player.unspentStatPoints || 0) <= 0) return;
    const info = applyAutoLevelWithReview(state.game.player);
    if (info?.summary) addWorldLog(`Auto-level applied pending points: ${info.summary}. Review in Level Up if you want to edit.`);
    renderWorld();
    if (state.modal === "levelup") renderModal();
  });
  els.optionDebug.addEventListener("change", () => {
    state.options.debugMode = !!els.optionDebug.checked;
    updateControlPromptUi();
    if (!state.game) return;
    if (state.options.debugMode) {
      addWorldLog("Debug mode enabled. Hotkeys: Ctrl+Shift+L level, G gold, H heal, X XP.");
    } else {
      addWorldLog("Debug mode disabled.");
    }
    renderWorldLog();
  });
  els.optionMasterVolume.addEventListener("input", () => {
    state.options.masterVolume = clamp((Number(els.optionMasterVolume.value) || 0) / 100, 0, 1);
    updateOptionsUi();
    applyAudioMixLevels();
  });
  els.optionMusicVolume.addEventListener("input", () => {
    state.options.musicVolume = clamp((Number(els.optionMusicVolume.value) || 0) / 100, 0, 1);
    updateOptionsUi();
    applyAudioMixLevels();
  });
  els.optionSfxVolume.addEventListener("input", () => {
    state.options.sfxVolume = clamp((Number(els.optionSfxVolume.value) || 0) / 100, 0, 1);
    updateOptionsUi();
    applyAudioMixLevels();
  });

  els.worldInteract.addEventListener("click", handleWorldInteract);
  els.worldCharacter.addEventListener("click", openCharacterMenu);
  els.worldShop.addEventListener("click", handleWorldInteract);
  els.worldTalk.addEventListener("click", handleWorldInteract);
  els.worldSave.addEventListener("click", saveGame);
  els.worldMenu.addEventListener("click", requestMainMenuReturn);
  if (els.worldMapToggle) els.worldMapToggle.addEventListener("click", toggleMapFullscreen);
  if (els.worldMapZoomOut) els.worldMapZoomOut.addEventListener("click", () => changeMapZoom(-MAP_ZOOM_STEP));
  if (els.worldMapZoomIn) els.worldMapZoomIn.addEventListener("click", () => changeMapZoom(MAP_ZOOM_STEP));
  if (els.worldMapZoomReset) els.worldMapZoomReset.addEventListener("click", resetMapZoom);

  els.combatActions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    playerCombatAction(button.dataset.action);
  });
  els.combatReturn.addEventListener("click", endCombatAndReturnToWorld);

  els.modalClose.addEventListener("click", closeModal);
  els.modalContent.addEventListener("click", onModalAction);
  els.modalBackdrop.addEventListener("click", (event) => {
    if (event.target === els.modalBackdrop) closeModal();
  });

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("pointerdown", ensureAudioStarted, { once: true });
  document.addEventListener("click", () => playSfx("click"));
  window.addEventListener("resize", () => {
    if (state.screen === "world" && state.game) renderWorld();
  });
}

function onKeyDown(event) {
  ensureAudioStarted();
  const key = event.key;
  const lower = key.toLowerCase();
  if (!event.repeat && !event.ctrlKey && !event.altKey && !event.metaKey) {
    setInputMode("keyboard");
  }

  if (state.modal) {
    if (key === "Escape" || key === "Backspace") {
      closeModal();
      event.preventDefault();
      return;
    }
    if (key === "ArrowUp") {
      moveFocus(-1);
      event.preventDefault();
      return;
    }
    if (key === "ArrowDown") {
      moveFocus(1);
      event.preventDefault();
      return;
    }
    if (key === "Enter" || key === " ") {
      activateFocused();
      event.preventDefault();
    }
    return;
  }

  const activeTag = document.activeElement ? document.activeElement.tagName : "";
  const typingInInput = activeTag === "INPUT" || activeTag === "TEXTAREA";

  if (handleDebugHotkeys(event, lower, typingInInput)) return;

  if (usesFocusNavigation() && !typingInInput) {
    if (key === "ArrowUp" || key === "ArrowLeft") {
      moveFocus(-1);
      event.preventDefault();
      return;
    }
    if (key === "ArrowDown" || key === "ArrowRight") {
      moveFocus(1);
      event.preventDefault();
      return;
    }
    if (key === "Enter" || key === " ") {
      activateFocused();
      event.preventDefault();
      return;
    }
    if (key === "Escape" || key === "Backspace") {
      handleBackAction();
      event.preventDefault();
      return;
    }
  }

  if (state.screen !== "world" || !state.game || state.combat) return;

  if (lower === "v") {
    toggleMapFullscreen();
    event.preventDefault();
    return;
  }
  if (key === "+" || key === "=") {
    changeMapZoom(MAP_ZOOM_STEP);
    event.preventDefault();
    return;
  }
  if (key === "-" || key === "_") {
    changeMapZoom(-MAP_ZOOM_STEP);
    event.preventDefault();
    return;
  }
  if (key === "0") {
    resetMapZoom();
    event.preventDefault();
    return;
  }

  let moved = false;
  if (key === "ArrowUp" || lower === "w") moved = movePlayer(0, -1);
  if (key === "ArrowDown" || lower === "s") moved = movePlayer(0, 1);
  if (key === "ArrowLeft" || lower === "a") moved = movePlayer(-1, 0);
  if (key === "ArrowRight" || lower === "d") moved = movePlayer(1, 0);

  if (moved) {
    event.preventDefault();
    return;
  }

  if (lower === "c") {
    openCharacterMenu();
    event.preventDefault();
  } else if (lower === "i") {
    openModal("inventory");
    event.preventDefault();
  } else if (lower === "f") {
    handleWorldInteract();
    event.preventDefault();
  } else if (lower === "e") {
    openModal("equipment");
    event.preventDefault();
  } else if (lower === "j") {
    handleWorldInteract();
    event.preventDefault();
  } else if (lower === "u") {
    openLevelUpModal();
    event.preventDefault();
  } else if (lower === "q") {
    openModal("quests");
    event.preventDefault();
  } else if (lower === "k") {
    openModal("bestiary");
    event.preventDefault();
  } else if (lower === "t") {
    handleWorldInteract();
    event.preventDefault();
  } else if (lower === "o") {
    openModal("story");
    event.preventDefault();
  } else if (lower === "h") {
    openModal("achievements");
    event.preventDefault();
  } else if (lower === "p" && !typingInInput) {
    saveGame();
    event.preventDefault();
  } else if (lower === "m") {
    requestMainMenuReturn();
    event.preventDefault();
  } else if (key === "Enter") {
    describeCurrentTile();
    event.preventDefault();
  }
}

function handleDebugHotkeys(event, lower, typingInInput) {
  if (!state.options.debugMode) return false;
  if (typingInInput) return false;
  if (state.screen !== "world" || !state.game || state.combat || state.modal) return false;
  if (!(event.ctrlKey && event.shiftKey)) return false;

  const player = state.game.player;
  if (lower === "l") {
    gainXp(player, xpToNextLevel(player.level));
    addWorldLog("Debug: granted enough XP for one level.");
    renderWorld();
    event.preventDefault();
    return true;
  }
  if (lower === "x") {
    gainXp(player, 2500);
    addWorldLog("Debug: granted 2500 XP.");
    renderWorld();
    event.preventDefault();
    return true;
  }
  if (lower === "g") {
    player.gold += 500;
    addWorldLog("Debug: added 500 gold.");
    renderWorld();
    event.preventDefault();
    return true;
  }
  if (lower === "h") {
    player.currentHealth = player.derivedStats.Health;
    addWorldLog("Debug: HP fully restored.");
    renderWorld();
    event.preventDefault();
    return true;
  }
  return false;
}

function handleMenuAction(action) {
  if (action === "start") {
    state.introIndex = 0;
    renderIntro();
    showScreen("intro");
    return;
  }
  if (action === "load") {
    if (!loadGame()) {
      els.menuMessage.textContent = "No saved game found yet.";
    }
    return;
  }
  if (action === "options") {
    updateOptionsUi();
    showScreen("options");
    return;
  }
  if (action === "exit") {
    els.menuMessage.textContent = "Exit is brave, but browsers do not let games close tabs.";
  }
}

function onIntroNext() {
  if (state.introIndex < INTRO_PAGES.length - 1) {
    state.introIndex += 1;
    renderIntro();
    return;
  }
  state.introIndex = 0;
  showScreen("create");
}

function renderIntro() {
  els.introText.textContent = INTRO_PAGES[state.introIndex];
  els.introNext.textContent = state.introIndex === INTRO_PAGES.length - 1 ? "To Character Creation" : "Continue";
}

function renderCreationSelectors() {
  if (document.activeElement !== els.nameInput) els.nameInput.value = state.creation.name;
  if (document.activeElement !== els.seedInput) els.seedInput.value = state.creation.seed;

  els.styleButtons.innerHTML = Object.keys(COMBAT_STYLES)
    .map((style) => {
      const selected = state.creation.style === style ? "selected" : "";
      return `<button class="focusable ${selected}" data-style="${style}">${style}</button>`;
    })
    .join("");

  const availableWeapons = getWeaponsForStyle(state.creation.style);
  if (!availableWeapons.length) {
    state.creation.weaponId = null;
    els.weaponButtons.innerHTML = "<p>No weapons available for this style.</p>";
    els.weaponInfo.innerHTML = "<p>Select a combat style to preview weapons.</p>";
  } else {
    if (!availableWeapons.some((weapon) => weapon.id === state.creation.weaponId)) {
      state.creation.weaponId = getDefaultWeaponIdForStyle(state.creation.style);
    }
    const selectedWeapon = getWeaponTemplateForStyle(state.creation.style, state.creation.weaponId);
    els.weaponButtons.innerHTML = availableWeapons
      .map((weapon) => {
        const selected = state.creation.weaponId === weapon.id ? "selected" : "";
        return `<button class="focusable ${selected}" data-weapon-id="${weapon.id}">${weapon.name}</button>`;
      })
      .join("");
    if (selectedWeapon) {
      const hitBonus = getWeaponHitModifier(selectedWeapon);
      const hitText = hitBonus >= 0 ? `+${hitBonus}` : `${hitBonus}`;
      els.weaponInfo.innerHTML = `
        <p><strong>${escapeHtml(selectedWeapon.name)}</strong> (${escapeHtml(selectedWeapon.attackType)})</p>
        <div class="weapon-pills">
          <span class="weapon-pill">Damage 1d${selectedWeapon.damageDie}</span>
          <span class="weapon-pill">Type ${escapeHtml(selectedWeapon.damageKind)}</span>
          <span class="weapon-pill">Speed ${getWeaponSpeed(selectedWeapon)}</span>
          <span class="weapon-pill">Hit ${hitText}</span>
          <span class="weapon-pill">Crit +${getWeaponCritBonus(selectedWeapon)}</span>
        </div>
        <p>${escapeHtml(selectedWeapon.summary || "No description.")}</p>
      `;
    } else {
      els.weaponInfo.innerHTML = "<p>No weapon selected.</p>";
    }
  }

  els.cityButtons.innerHTML = MAJOR_CITIES.map((city) => {
    const selected = state.creation.cityId === city.id ? "selected" : "";
    return `<button class="focusable ${selected}" data-city-id="${city.id}">${city.name}</button>`;
  }).join("");

  els.difficultyButtons.innerHTML = Object.keys(DIFFICULTY_PRESETS).map((difficulty) => {
    const selected = state.creation.difficulty === difficulty ? "selected" : "";
    return `<button class="focusable ${selected}" data-difficulty="${difficulty}">${difficulty}</button>`;
  }).join("");
  const selectedDifficulty = getDifficulty(state.creation.difficulty);
  if (els.difficultyInfo) {
    els.difficultyInfo.innerHTML = `
      <p><strong>${escapeHtml(state.creation.difficulty)}</strong>: ${escapeHtml(selectedDifficulty.summary || "Balanced challenge.")}</p>
      <p><strong>Defeat Rule:</strong> ${escapeHtml(selectedDifficulty.deathRule || "No special rule.")}</p>
    `;
  }

  updateFocusables();
}

function beginAdventure() {
  const name = els.nameInput.value.trim();
  const seed = els.seedInput.value.trim();
  if (!name) {
    addMenuMessage("Name your hero first.");
    return;
  }

  state.creation.name = name;
  state.creation.seed = seed || randomSeed();
  ensureAudioStarted();

  const world = generateWorld(state.creation.seed);
  const spawnCity = world.majorCityById[state.creation.cityId] || world.majorCities[0];
  const chosenWeapon = getWeaponTemplateForStyle(state.creation.style, state.creation.weaponId);
  const player = createPlayer(state.creation.name, state.creation.style, chosenWeapon);
  player.position.x = spawnCity.x;
  player.position.y = spawnCity.y;
  revealAround(world, player.position.x, player.position.y, 2);
  const storyline = generateDynamicStoryline(world, state.creation.seed, spawnCity);
  const quests = normalizeQuestList(generateProceduralQuests(world, state.creation.seed));

  state.game = {
    seed: state.creation.seed,
    difficulty: state.creation.difficulty,
    world,
    player,
    stepCount: 0,
    startingCityId: spawnCity.id,
    storyIndex: 0,
    storyline,
    quests,
    bestiary: {},
    worldLog: [],
    achievements: [],
    meta: {
      wins: 0,
      losses: 0,
      enemiesDefeated: 0,
      bossesDefeated: 0,
      npcsTalked: 0,
      questsCompleted: 0,
      potionsUsed: 0,
      chestsOpened: 0,
      transitionsUsed: 0,
      tilesDiscovered: countDiscoveredTiles(world),
      totalGoldFound: 0,
    },
    pendingLevelUp: false,
    pendingLevelUpReview: false,
    lastAutoLevelUp: null,
    dynamic: {
      threat: 0,
      lastEventStep: 0,
    },
    runtimeRng: createRng(hashString(`${state.creation.seed}|runtime`)),
  };

  addStartingItems(player);
  recalculatePlayerStats(player, true);
  player.currentHealth = player.derivedStats.Health;
  const difficultyInfo = getDifficulty();
  addWorldLog(`Welcome, ${player.name}. ${spawnCity.name} pretends this is a normal day.`);
  addWorldLog(`Difficulty: ${state.game.difficulty}. ${difficultyInfo.summary}`);
  addWorldLog(`Defeat Rule: ${difficultyInfo.deathRule}`);
  addWorldLog("Explore towns, dungeons, NPC camps, and chests. Use Interact on special locations.");
  addWorldLog(`Active quests posted: ${state.game.quests.filter((quest) => !quest.claimed).length}.`);
  renderWorld();
  showScreen("world");
  syncMusicForCurrentContext();
}

function createPlayer(name, style, selectedWeapon = null) {
  const styleData = COMBAT_STYLES[style] || COMBAT_STYLES.Melee;
  const styleKey = COMBAT_STYLES[style] ? style : "Melee";
  const starterTemplate = selectedWeapon || getDefaultWeaponForStyle(styleKey);
  const player = {
    name,
    style,
    level: 1,
    xp: 0,
    gold: 0,
    baseStats: copyStats(styleData.baseStats),
    derivedStats: createZeroStats(),
    currentHealth: styleData.baseStats.Health,
    activeEffects: [],
    position: { x: 0, y: 0 },
    equipment: { Weapon: null, Head: null, Chest: null, Hands: null, Legs: null, Accessory1: null, Accessory2: null },
    bag: [],
    unspentStatPoints: 0,
  };
  player.equipment.Weapon = createStarterWeapon(starterTemplate);
  return player;
}

function addStartingItems(player) {
  addConsumableToBag(player, "minor_potion", 4);
  addConsumableToBag(player, "smoke_bomb", 1);
  addConsumableToBag(player, "fire_bomb", 1);
  player.gold = 50;
}

function showScreen(screen) {
  state.screen = screen;
  Object.keys(els.screens).forEach((key) => {
    els.screens[key].classList.toggle("active", key === screen);
  });
  if (screen === "world") {
    renderWorld();
  }
  if (screen === "combat") {
    renderCombat();
  }
  syncMusicForCurrentContext();
  if (screen === "world" && hasPendingLevelUpFlow() && !state.combat) {
    openLevelUpModal();
  }
  updateControlPromptUi();
  updateFocusables();
}

function addMenuMessage(message) {
  if (!els.menuMessage) return;
  els.menuMessage.textContent = message;
}

function renderWorld() {
  if (!state.game) return;
  setMapFullscreen(state.map.fullscreen);
  updateMapUi();
  renderPlayerPanel();
  renderWorldLog();
  renderWorldContext();
  drawMap();
  if (state.screen === "world" && !state.combat) syncMusicForCurrentContext();
}

function renderPlayerPanel() {
  const { player } = state.game;
  const nextXp = xpToNextLevel(player.level);
  const chapter = getCurrentStoryChapter();
  const activeStyle = getActiveAttackStyle(player);
  const unlocked = getUnlockedAbilitiesForStyle(player, activeStyle);
  const activeSkill = unlocked[unlocked.length - 1];
  const nextSkill = getNextAbilityForStyle(player, activeStyle);
  const equippedWeaponSummary = player.equipment.Weapon ? summarizeWeaponForUi(player.equipment.Weapon) : "None";
  const difficulty = getDifficulty();
  els.playerSummary.innerHTML = `
    <p><strong>${escapeHtml(player.name)}</strong> (${player.style})</p>
    <p>Difficulty ${state.game.difficulty}</p>
    <p>${escapeHtml(difficulty.deathRule || "")}</p>
    <p>Level ${player.level} | XP ${player.xp}/${nextXp}</p>
    <p>HP ${player.currentHealth}/${player.derivedStats.Health}</p>
    <p>Unspent Stat Points ${player.unspentStatPoints || 0}</p>
    <p>Gold ${player.gold}</p>
    <p>${escapeHtml(chapter.title)}</p>
    <p>Weapon ${escapeHtml(equippedWeaponSummary)}</p>
    <p>${activeStyle} ${activeStyle === "Magic" ? "Spell" : "Skill"}: ${escapeHtml(activeSkill.name)}</p>
    <p>${nextSkill ? `Next unlock Lv ${nextSkill.level}: ${escapeHtml(nextSkill.name)}` : "All known skills unlocked."}</p>
    <p>Position ${player.position.x}, ${player.position.y}</p>
    <p>Seed <code>${escapeHtml(state.game.seed)}</code></p>
  `;
  const statRows = ALL_STATS.map((stat) => `<span>${stat}</span><strong>${player.derivedStats[stat]}</strong>`).join("");
  els.playerStats.innerHTML = `<div class="stat-grid">${statRows}</div>`;
}

function renderWorldLog() {
  const lines = state.game.worldLog.slice(-WORLD_LOG_LIMIT);
  els.worldLog.innerHTML = lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("");
  els.worldLog.scrollTop = els.worldLog.scrollHeight;
}

function renderWorldContext() {
  const { world, player } = state.game;
  const tile = world.tiles[player.position.y][player.position.x];
  const feature = getFeatureAt(world, player.position.x, player.position.y);
  const biomeLabel = BIOME_DATA[tile.biome].label;
  const threat = state.game.dynamic?.threat || 0;
  const encounterChance = feature && (feature.type === "city" || feature.type === "town")
    ? 0
    : getEncounterChancePercent(tile.biome, player.level);
  if (feature) {
    if (feature.type === "dungeon") {
      const bossState = feature.bossDefeated ? "Boss Defeated" : `Boss: ${feature.bossName}`;
      els.worldContext.textContent = `${biomeLabel} - ${feature.name} (dungeon). ${bossState}. Press Interact to delve. Encounter chance: ${encounterChance.toFixed(1)}% | Threat ${threat}`;
    } else if (feature.type === "chest") {
      els.worldContext.textContent = `${biomeLabel} - ${feature.name}. ${feature.opened ? "Opened already." : "Press Interact to open."} Encounter chance: ${encounterChance.toFixed(1)}% | Threat ${threat}`;
    } else if (feature.type === "transition") {
      els.worldContext.textContent = `${biomeLabel} - ${feature.name}. Press Interact to travel to ${feature.targetName || "another region"}.`;
    } else if (feature.type === "npc") {
      els.worldContext.textContent = `${biomeLabel} - ${feature.name} (${feature.role}). Press Talk or Interact to speak. Encounter chance: ${encounterChance.toFixed(1)}% | Threat ${threat}`;
    } else if (feature.type === "city" || feature.type === "town") {
      const shopText = feature.hasShop ? "Shop available." : "No shop.";
      const innText = feature.hasInn ? "Inn available." : "No inn services.";
      els.worldContext.textContent = `${biomeLabel} - ${feature.name} (${feature.type}). Safe zone. ${shopText} ${innText} Press Shop, Character, or Interact.`;
    } else if (feature.type === "grave") {
      const count = Array.isArray(feature.items) ? feature.items.length : 0;
      els.worldContext.textContent = `${biomeLabel} - ${feature.name}. Dropped gear cache (${count} item${count === 1 ? "" : "s"}). Press Interact to recover equipment.`;
    } else {
      els.worldContext.textContent = `${biomeLabel} - ${feature.name} (${feature.type}). Encounter chance: ${encounterChance.toFixed(1)}% | Threat ${threat}`;
    }
  } else {
    els.worldContext.textContent = `${biomeLabel}. Encounter chance: ${encounterChance.toFixed(1)}% | Threat ${threat}`;
  }
}

function setMapFullscreen(enabled) {
  state.map.fullscreen = !!enabled;
  if (els.screens.world) {
    els.screens.world.classList.toggle("map-fullscreen", state.map.fullscreen);
  }
  updateMapUi();
  updateControlPromptUi();
}

function toggleMapFullscreen() {
  if (state.screen !== "world" || !state.game || state.combat || state.modal) return;
  setMapFullscreen(!state.map.fullscreen);
  renderWorld();
}

function changeMapZoom(delta) {
  if (!state.game) return;
  const next = clamp(Number(state.map.zoom || 1) + delta, MAP_ZOOM_MIN, MAP_ZOOM_MAX);
  if (Math.abs(next - state.map.zoom) < 0.0001) return;
  state.map.zoom = next;
  updateMapUi();
  updateControlPromptUi();
  renderWorld();
}

function resetMapZoom() {
  if (!state.game) return;
  state.map.zoom = DEFAULT_MAP_ZOOM;
  updateMapUi();
  updateControlPromptUi();
  renderWorld();
}

function updateMapUi() {
  if (els.worldMapToggle) {
    els.worldMapToggle.textContent = state.map.fullscreen ? "Exit Fullscreen Map" : "Fullscreen Map";
  }
  if (els.mapLegend) {
    const zoomText = `${Math.round((state.map.zoom || 1) * 100)}%`;
    els.mapLegend.textContent = `Map icons: City, House (town), Stairs, Chest, NPC, Boss, Shop badge ($), Inn badge (I). Zoom ${zoomText}.`;
  }
}

function ensureMapCanvasSize() {
  if (!els.mapCanvas) return;
  const rect = els.mapCanvas.getBoundingClientRect();
  const width = Math.max(320, Math.floor(rect.width || 0));
  const height = Math.max(220, Math.floor(rect.height || 0));
  if (els.mapCanvas.width !== width) els.mapCanvas.width = width;
  if (els.mapCanvas.height !== height) els.mapCanvas.height = height;
}

function drawMap() {
  if (!state.game) return;
  ensureMapCanvasSize();
  const { world, player } = state.game;
  const baseTilesX = state.map.fullscreen ? FULLSCREEN_VIEW_TILES_X : VIEW_TILES_X;
  const baseTilesY = state.map.fullscreen ? FULLSCREEN_VIEW_TILES_Y : VIEW_TILES_Y;
  const zoom = clamp(state.map.zoom || 1, MAP_ZOOM_MIN, MAP_ZOOM_MAX);
  const viewTilesX = clamp(Math.round(baseTilesX / zoom), 8, world.width);
  const viewTilesY = clamp(Math.round(baseTilesY / zoom), 6, world.height);
  const cameraX = clamp(player.position.x - Math.floor(viewTilesX / 2), 0, world.width - viewTilesX);
  const cameraY = clamp(player.position.y - Math.floor(viewTilesY / 2), 0, world.height - viewTilesY);
  const tileSize = Math.max(8, Math.floor(Math.min(els.mapCanvas.width / viewTilesX, els.mapCanvas.height / viewTilesY)));
  const drawWidth = tileSize * viewTilesX;
  const drawHeight = tileSize * viewTilesY;
  const offsetX = Math.floor((els.mapCanvas.width - drawWidth) / 2);
  const offsetY = Math.floor((els.mapCanvas.height - drawHeight) / 2);

  ctx.clearRect(0, 0, els.mapCanvas.width, els.mapCanvas.height);
  ctx.fillStyle = "#0b1219";
  ctx.fillRect(0, 0, els.mapCanvas.width, els.mapCanvas.height);

  for (let sy = 0; sy < viewTilesY; sy += 1) {
    for (let sx = 0; sx < viewTilesX; sx += 1) {
      const wx = cameraX + sx;
      const wy = cameraY + sy;
      const tile = world.tiles[wy][wx];
      const discovered = world.discovered[wy][wx];
      const px = offsetX + sx * tileSize;
      const py = offsetY + sy * tileSize;
      ctx.fillStyle = discovered ? BIOME_DATA[tile.biome].color : "#0a0d12";
      ctx.fillRect(px, py, tileSize, tileSize);
      ctx.strokeStyle = "rgba(0,0,0,0.22)";
      ctx.strokeRect(px, py, tileSize, tileSize);
    }
  }

  world.features.forEach((feature) => {
    if (feature.x < cameraX || feature.y < cameraY || feature.x >= cameraX + viewTilesX || feature.y >= cameraY + viewTilesY) return;
    if (!world.discovered[feature.y][feature.x]) return;
    drawFeatureSymbol(feature, offsetX + (feature.x - cameraX) * tileSize, offsetY + (feature.y - cameraY) * tileSize, tileSize);
  });

  const px = offsetX + (player.position.x - cameraX) * tileSize;
  const py = offsetY + (player.position.y - cameraY) * tileSize;
  drawPlayerToken(player, px, py, tileSize);
}

function drawPlayerToken(player, sx, sy, tileSize = TILE_SIZE) {
  const style = getActiveAttackStyle(player);
  const token = state.assets.playerTokens[style];
  if (token && token.complete && token.naturalWidth > 0) {
    const pad = Math.max(1, Math.floor(tileSize * 0.1));
    ctx.drawImage(token, sx + pad, sy + pad, tileSize - pad * 2, tileSize - pad * 2);
    return;
  }

  // Fallback marker while assets are loading or unavailable.
  const px = sx;
  const py = sy;
  ctx.fillStyle = "#f4f7ff";
  ctx.beginPath();
  ctx.moveTo(px + tileSize / 2, py + 3);
  ctx.lineTo(px + 3, py + tileSize - 3);
  ctx.lineTo(px + tileSize - 3, py + tileSize - 3);
  ctx.closePath();
  ctx.fill();
}

function drawFeatureSymbol(feature, sx, sy, tileSize = TILE_SIZE) {
  const pad = Math.max(1, Math.floor(tileSize * 0.1));
  const left = sx + pad;
  const top = sy + pad;
  const size = Math.max(6, tileSize - pad * 2);
  const isBossDungeon = feature.type === "dungeon" && !feature.bossDefeated;

  ctx.save();
  ctx.translate(left, top);
  ctx.lineWidth = Math.max(1, Math.floor(size * 0.08));

  if (feature.type === "city") {
    ctx.fillStyle = "#1f3f66";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#9ed0ff";
    ctx.fillRect(size * 0.14, size * 0.58, size * 0.72, size * 0.26);
    ctx.fillRect(size * 0.18, size * 0.36, size * 0.17, size * 0.22);
    ctx.fillRect(size * 0.42, size * 0.22, size * 0.19, size * 0.36);
    ctx.fillRect(size * 0.66, size * 0.42, size * 0.16, size * 0.16);
  } else if (feature.type === "town") {
    ctx.fillStyle = "#29593a";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#d7c39a";
    ctx.beginPath();
    ctx.moveTo(size * 0.15, size * 0.54);
    ctx.lineTo(size * 0.5, size * 0.24);
    ctx.lineTo(size * 0.85, size * 0.54);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(size * 0.2, size * 0.54, size * 0.6, size * 0.3);
    ctx.fillStyle = "#7f5a2d";
    ctx.fillRect(size * 0.46, size * 0.63, size * 0.12, size * 0.21);
  } else if (feature.type === "dungeon") {
    ctx.fillStyle = "#5f2f2f";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#d2d9df";
    ctx.fillRect(size * 0.12, size * 0.66, size * 0.76, size * 0.12);
    ctx.fillRect(size * 0.2, size * 0.5, size * 0.6, size * 0.12);
    ctx.fillRect(size * 0.28, size * 0.34, size * 0.44, size * 0.12);
    ctx.fillRect(size * 0.36, size * 0.18, size * 0.28, size * 0.12);
  } else if (feature.type === "transition") {
    ctx.fillStyle = "#2e2d5f";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#e8d5ff";
    ctx.fillRect(size * 0.12, size * 0.7, size * 0.7, size * 0.1);
    ctx.fillRect(size * 0.2, size * 0.54, size * 0.62, size * 0.1);
    ctx.fillRect(size * 0.28, size * 0.38, size * 0.54, size * 0.1);
    ctx.fillRect(size * 0.36, size * 0.22, size * 0.46, size * 0.1);
    ctx.strokeStyle = "#e8d5ff";
    ctx.beginPath();
    ctx.moveTo(size * 0.78, size * 0.18);
    ctx.lineTo(size * 0.92, size * 0.18);
    ctx.lineTo(size * 0.92, size * 0.82);
    ctx.stroke();
  } else if (feature.type === "chest") {
    ctx.fillStyle = feature.opened ? "#6a5d49" : "#7a4e1f";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = feature.opened ? "#9b8f77" : "#f1b35e";
    ctx.fillRect(size * 0.15, size * 0.5, size * 0.7, size * 0.28);
    ctx.fillRect(size * 0.15, size * 0.35, size * 0.7, size * 0.12);
    ctx.fillStyle = "#3b2d1d";
    ctx.fillRect(size * 0.46, size * 0.46, size * 0.08, size * 0.2);
  } else if (feature.type === "npc") {
    ctx.fillStyle = "#2f4b5c";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#d6e6f6";
    ctx.fillRect(size * 0.4, size * 0.18, size * 0.2, size * 0.2);
    ctx.fillRect(size * 0.33, size * 0.42, size * 0.34, size * 0.34);
    ctx.fillRect(size * 0.22, size * 0.5, size * 0.12, size * 0.22);
    ctx.fillRect(size * 0.66, size * 0.5, size * 0.12, size * 0.22);
  } else if (feature.type === "grave") {
    ctx.fillStyle = "#4a4355";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#d9cee8";
    ctx.fillRect(size * 0.44, size * 0.2, size * 0.12, size * 0.54);
    ctx.fillRect(size * 0.3, size * 0.35, size * 0.4, size * 0.12);
    ctx.fillStyle = "#b9a7cf";
    ctx.fillRect(size * 0.22, size * 0.74, size * 0.56, size * 0.1);
  } else {
    ctx.fillStyle = "#6a6f7a";
    ctx.fillRect(0, 0, size, size);
  }

  ctx.strokeStyle = "rgba(14,18,24,0.7)";
  ctx.strokeRect(0.5, 0.5, size - 1, size - 1);
  ctx.restore();

  if ((feature.type === "city" || feature.type === "town") && feature.hasInn) {
    drawFeatureBadge(sx, sy, tileSize, "I", "#4f6e2e", "top-left");
  }
  if ((feature.type === "city" || feature.type === "town") && feature.hasShop) {
    drawFeatureBadge(sx, sy, tileSize, "$", "#6d5021", "top-right");
  }
  if (isBossDungeon) {
    drawFeatureBadge(sx, sy, tileSize, "B", "#7a2525", "top-right");
  }
}

function drawFeatureBadge(sx, sy, tileSize, label, bgColor, corner = "top-right") {
  const size = Math.max(9, Math.floor(tileSize * 0.38));
  const pad = Math.max(1, Math.floor(tileSize * 0.05));
  let x = sx + tileSize - size - pad;
  let y = sy + pad;
  if (corner === "top-left") x = sx + pad;
  if (corner === "bottom-left") {
    x = sx + pad;
    y = sy + tileSize - size - pad;
  }
  if (corner === "bottom-right") y = sy + tileSize - size - pad;
  ctx.fillStyle = bgColor;
  ctx.fillRect(x, y, size, size);
  ctx.strokeStyle = "#141b23";
  ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
  ctx.fillStyle = "#f3f6fb";
  ctx.font = `${Math.max(8, Math.floor(size * 0.62))}px "Trebuchet MS", "Segoe UI", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + size / 2, y + size / 2 + 0.2);
}

function movePlayer(dx, dy) {
  if (!state.game || state.combat || state.modal) return false;
  const { world, player } = state.game;
  const nx = clamp(player.position.x + dx, 0, world.width - 1);
  const ny = clamp(player.position.y + dy, 0, world.height - 1);
  if (nx === player.position.x && ny === player.position.y) return false;
  player.position.x = nx;
  player.position.y = ny;
  state.game.stepCount += 1;
  revealAround(world, nx, ny, 2);
  state.game.meta.tilesDiscovered = countDiscoveredTiles(world);
  playSfx("move");
  const feature = getFeatureAt(world, nx, ny);
  if (feature?.type === "city" || feature?.type === "town") addWorldLog(`Arrived at ${feature.name}. This is a safe location.`);
  if (feature?.type === "dungeon") addWorldLog(`You stand at ${feature.name}. Press Interact to enter.`);
  if (feature?.type === "chest" && !feature.opened) addWorldLog(`A chest waits here. Press Interact.`);
  if (feature?.type === "transition") addWorldLog(`${feature.name} hums softly. Press Interact to travel.`);
  if (feature?.type === "npc") addWorldLog(`${feature.name} (${feature.role}) is here.`);
  if (feature?.type === "grave") addWorldLog("Your dropped gear cache is here. Press Interact to recover it.");
  if (feature?.type === "city" || feature?.type === "town" || feature?.type === "npc") {
    updateQuestProgress("visitFeature", { feature });
  }
  const autoTriggered = maybeAutoTriggerFeatureEvent(feature);
  if (!autoTriggered && !state.modal && !state.combat) {
    tryTriggerEncounter(feature);
  }
  maybeTriggerDynamicWorldEvent(feature);
  checkAchievements();
  renderWorld();
  return true;
}

function describeCurrentTile() {
  if (!state.game) return;
  const { world, player } = state.game;
  const tile = world.tiles[player.position.y][player.position.x];
  const feature = getFeatureAt(world, player.position.x, player.position.y);
  if (feature) addWorldLog(`${feature.name}: a ${feature.type} in the ${BIOME_DATA[tile.biome].label}.`);
  else addWorldLog(`You scout the ${BIOME_DATA[tile.biome].label}. The grass judges you silently.`);
  renderWorldLog();
}

function restAtInn(feature = null) {
  if (!state.game) return;
  const player = state.game.player;
  const targetName = feature?.name || "the local inn";
  const missingHp = Math.max(0, player.derivedStats.Health - player.currentHealth);
  if (missingHp <= 0) {
    addWorldLog(`You rest briefly at ${targetName}, but already feel fully restored.`);
    return;
  }
  const cost = Math.max(8, Math.floor(player.level * 1.4));
  if (player.gold < cost) {
    addWorldLog(`Innkeeper asks for ${cost} gold. You only have ${player.gold}.`);
    return;
  }
  player.gold -= cost;
  player.currentHealth = player.derivedStats.Health;
  addWorldLog(`You rest at ${targetName} for ${cost} gold and recover to full health.`);
  playSfx("potion");
  renderWorld();
}

function getWorldInteractionActions(feature, allowInspect = false) {
  const actions = [];
  if (!feature) {
    actions.push({
      id: "inspect",
      label: "Inspect Area",
      description: "Look at the current tile.",
    });
    return actions;
  }

  if (feature.type === "chest") {
    actions.push({ id: "open-chest", label: feature.opened ? "Inspect Chest" : "Open Chest", description: feature.name });
  } else if (feature.type === "transition") {
    actions.push({ id: "use-transition", label: "Use Transition", description: `Travel via ${feature.name}` });
  } else if (feature.type === "npc") {
    actions.push({ id: "talk", label: "Talk", description: `${feature.name} (${feature.role || "npc"})` });
  } else if (feature.type === "grave") {
    actions.push({ id: "recover-gear", label: "Recover Gear", description: feature.name });
  } else if (feature.type === "dungeon") {
    actions.push({
      id: "enter-dungeon",
      label: feature.bossDefeated ? "Delve Deeper" : "Challenge Boss",
      description: feature.name,
    });
  } else if (feature.type === "city" || feature.type === "town") {
    actions.push({ id: "talk", label: "Talk To Locals", description: `${feature.name} gossip and rumors` });
    if (feature.hasShop) actions.push({ id: "open-shop", label: "Visit Shop", description: `${feature.name} merchants` });
    if (feature.hasInn) actions.push({ id: "rest-inn", label: "Rest At Inn", description: "Restore HP for gold" });
  }

  if (allowInspect) {
    actions.push({ id: "inspect", label: "Inspect Area", description: "Read tile details" });
  }
  return actions;
}

function executeWorldInteractionAction(actionId, feature = null) {
  if (!state.game || state.combat) return;
  const { world, player } = state.game;
  const activeFeature = feature || getFeatureAt(world, player.position.x, player.position.y);
  if (actionId === "inspect") {
    describeCurrentTile();
    return;
  }
  if (actionId === "open-chest") {
    if (!activeFeature || activeFeature.type !== "chest") return addWorldLog("No chest here.");
    openChest(activeFeature);
    return;
  }
  if (actionId === "use-transition") {
    if (!activeFeature || activeFeature.type !== "transition") return addWorldLog("No transition gate here.");
    useTransition(activeFeature);
    return;
  }
  if (actionId === "talk") {
    talkToNpc();
    return;
  }
  if (actionId === "recover-gear") {
    if (!activeFeature || activeFeature.type !== "grave") return addWorldLog("No dropped gear cache here.");
    recoverDroppedGear(activeFeature);
    return;
  }
  if (actionId === "open-shop") {
    if (!activeFeature || (activeFeature.type !== "city" && activeFeature.type !== "town")) return addWorldLog("No shop here.");
    if (!activeFeature.hasShop) return addWorldLog(`${activeFeature.name} has no active merchants right now.`);
    openShopAtFeature(activeFeature);
    return;
  }
  if (actionId === "rest-inn") {
    if (!activeFeature || (activeFeature.type !== "city" && activeFeature.type !== "town") || !activeFeature.hasInn) {
      addWorldLog("No inn services are available here.");
      return;
    }
    restAtInn(activeFeature);
    return;
  }
  if (actionId === "enter-dungeon") {
    if (!activeFeature || activeFeature.type !== "dungeon") return addWorldLog("No dungeon entrance here.");
    if (!activeFeature.bossDefeated) {
      maybeTriggerDungeonBoss(activeFeature);
      return;
    }
    const tile = world.tiles[player.position.y][player.position.x];
    const depthEnemy = generateEnemy(tile.biome, player.level + 1, state.game.runtimeRng, {
      name: `${activeFeature.name} Delver`,
      featureId: activeFeature.id,
    });
    addWorldLog(`You delve deeper into ${activeFeature.name}.`);
    startCombat(depthEnemy, tile.biome);
    return;
  }
}

function openInteractionMenu(actions, feature = null) {
  if (!state.game || !actions || !actions.length) return;
  state.modal = "interaction";
  state.modalData = {
    featureId: feature?.id || null,
    featureName: feature?.name || "Current Tile",
    options: actions.map((action) => ({ id: action.id, label: action.label, description: action.description || "" })),
  };
  els.modalBackdrop.classList.remove("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "false");
  renderModal();
}

function handleWorldInteract() {
  if (!state.game || state.combat || state.modal) return;
  const { world, player } = state.game;
  const feature = getFeatureAt(world, player.position.x, player.position.y);
  const actions = getWorldInteractionActions(feature, false);
  if (!actions.length) {
    describeCurrentTile();
    return;
  }
  if (actions.length === 1) {
    executeWorldInteractionAction(actions[0].id, feature);
    return;
  }
  openInteractionMenu(actions, feature);
}

function openCurrentShop() {
  if (!state.game || state.combat) return;
  const feature = getFeatureAt(state.game.world, state.game.player.position.x, state.game.player.position.y);
  if (!feature) return addWorldLog("No shop here. Visit a town or city.");
  executeWorldInteractionAction("open-shop", feature);
}

function maybeAutoTriggerFeatureEvent(feature) {
  if (!state.game || !feature || state.combat || state.modal) return false;
  if (feature.type === "chest" && !feature.opened) {
    addWorldLog(`Auto-event: ${feature.name} is opened.`);
    openChest(feature);
    return true;
  }
  if (feature.type === "npc") {
    const lastStep = Number.isFinite(feature.lastAutoTalkStep) ? feature.lastAutoTalkStep : -999;
    if (state.game.stepCount - lastStep >= 10) {
      feature.lastAutoTalkStep = state.game.stepCount;
      addWorldLog(`Auto-event: ${feature.name} calls you over.`);
      talkToNpc();
      return true;
    }
  }
  if (feature.type === "dungeon" && !feature.bossDefeated) {
    addWorldLog(`Auto-event: ${feature.bossName || "The boss"} senses your presence.`);
    return maybeTriggerDungeonBoss(feature);
  }
  if ((feature.type === "city" || feature.type === "town") && hasUnclaimedCompletedQuest()) {
    const lastPrompt = Number.isFinite(feature.lastAutoQuestPromptStep) ? feature.lastAutoQuestPromptStep : -999;
    if (state.game.stepCount - lastPrompt >= 8) {
      feature.lastAutoQuestPromptStep = state.game.stepCount;
      addWorldLog("Auto-event: Completed quests are ready to claim.");
      openModal("quests");
      return true;
    }
  }
  return false;
}

function maybeTriggerDynamicWorldEvent(feature) {
  if (!state.game || state.combat || state.modal) return;
  const game = state.game;
  const dynamic = game.dynamic || (game.dynamic = { threat: 0, lastEventStep: 0 });
  if (game.stepCount < 8) return;
  if (game.stepCount - dynamic.lastEventStep < 12) return;
  const rng = game.runtimeRng;
  if (rng.next() > 0.17) return;
  dynamic.lastEventStep = game.stepCount;
  const roll = rng.next();

  if (roll < 0.24) {
    dynamic.threat = clamp(dynamic.threat + 1, 0, 6);
    addWorldLog(`World Event: Monster pressure rises. Threat ${dynamic.threat}.`);
    return;
  }
  if (roll < 0.46) {
    addReplacementQuest();
    addWorldLog("World Event: New quest rumors spread across settlements.");
    return;
  }
  if (roll < 0.64) {
    if (spawnDynamicChestNearPlayer()) {
      addWorldLog("World Event: Scouts reveal a hidden cache nearby.");
      return;
    }
  }
  if (roll < 0.84) {
    const gold = rng.int(10, 35);
    game.player.gold += gold;
    game.meta.totalGoldFound += gold;
    addWorldLog(`World Event: A caravan rewards you with ${gold} gold.`);
    return;
  }
  dynamic.threat = Math.max(0, dynamic.threat - 1);
  addWorldLog(`World Event: Patrols steady the roads. Threat ${dynamic.threat}.`);
}

function spawnDynamicChestNearPlayer() {
  if (!state.game) return false;
  const { world, player, runtimeRng } = state.game;
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const x = clamp(player.position.x + runtimeRng.int(-6, 6), 0, world.width - 1);
    const y = clamp(player.position.y + runtimeRng.int(-6, 6), 0, world.height - 1);
    const key = featureKey(x, y);
    if (world.featureLookup[key]) continue;
    const chest = {
      id: `chest_dynamic_${createItemUid()}`,
      name: "Hidden Cache",
      type: "chest",
      x,
      y,
      opened: false,
    };
    world.features.push(chest);
    world.featureLookup[key] = chest;
    return true;
  }
  return false;
}

function hasUnclaimedCompletedQuest() {
  return !!state.game?.quests?.some((quest) => quest.completed && !quest.claimed);
}

function tryTriggerEncounter(feature) {
  if (!state.game) return;
  const { world, player, runtimeRng } = state.game;
  const tile = world.tiles[player.position.y][player.position.x];
  const safeZone = feature && (feature.type === "city" || feature.type === "town" || feature.type === "npc" || feature.type === "transition" || feature.type === "grave");
  if (safeZone) return;
  let chance = getEncounterChancePercent(tile.biome, player.level);
  if (feature?.type === "dungeon") chance += 6;
  if (state.game.difficulty === "Easy") chance -= 1;
  if (state.game.difficulty === "Legendary") chance += 2;
  chance = clamp(chance, 2, 45);
  if (runtimeRng.next() * 100 < chance) {
    const enemy = generateEnemy(tile.biome, player.level, runtimeRng);
    startCombat(enemy, tile.biome);
  }
}

function maybeTriggerDungeonBoss(feature) {
  if (!state.game || !feature || feature.type !== "dungeon" || feature.bossDefeated || state.combat) return false;
  const tile = state.game.world.tiles[state.game.player.position.y][state.game.player.position.x];
  const enemy = generateEnemy(tile.biome, state.game.player.level, state.game.runtimeRng, {
    boss: true,
    name: feature.bossName || state.game.runtimeRng.pick(BOSS_TITLES),
    featureId: feature.id,
  });
  startCombat(enemy, tile.biome);
  addWorldLog(`Boss encounter: ${enemy.name} rises from ${feature.name}.`);
  return true;
}

function getEncounterChancePercent(biome, level) {
  const threat = state.game?.dynamic?.threat || 0;
  return clamp(BIOME_DATA[biome].baseEncounter + level * 0.15 + threat * 0.8, 2, 45);
}

function startCombat(enemy, biome) {
  const bestiaryUpdate = registerBestiaryEncounter(enemy, biome);
  state.combat = {
    enemy,
    biome,
    phase: "player",
    log: [`A ${enemy.isBoss ? "BOSS " : ""}${enemy.name} (Lv ${enemy.level}) appears from the ${BIOME_DATA[biome].label}!`],
    result: null,
    playerDefending: false,
    turn: 1,
  };
  if (bestiaryUpdate.discovered) {
    addWorldLog(`Bestiary discovered: ${enemy.speciesName || enemy.name}.`);
  }
  addWorldLog(`Encounter: ${enemy.name} ambushes you.`);
  playSfx(enemy.isBoss ? "boss" : "encounter");
  showScreen("combat");
}

function renderCombat() {
  if (!state.combat || !state.game) return;
  const { player } = state.game;
  const { enemy } = state.combat;
  const activeStyle = getActiveAttackStyle(player);
  const unlocked = getUnlockedAbilitiesForStyle(player, activeStyle);
  const activeSkill = unlocked[unlocked.length - 1];
  const enemyEntry = getBestiaryEntry(enemy.speciesId);
  const knownWeaknesses = enemyEntry?.knownWeaknesses?.length ? enemyEntry.knownWeaknesses.join(", ") : "Unknown";
  const knownResistances = enemyEntry?.knownResistances?.length ? enemyEntry.knownResistances.join(", ") : "Unknown";
  const effectText = player.activeEffects.length
    ? player.activeEffects.map((effect) => `${effect.name} (${effect.turns}t)`).join(", ")
    : "None";
  const playerWeaponSummary = player.equipment.Weapon ? summarizeWeaponForUi(player.equipment.Weapon) : "None";
  els.combatTitle.textContent = `Combat - ${enemy.name}${enemy.isBoss ? " [Boss]" : ""}`;
  els.combatPlayer.innerHTML = `
    <p><strong>${escapeHtml(player.name)}</strong> (Lv ${player.level})</p>
    <p>HP ${player.currentHealth}/${player.derivedStats.Health}</p>
    <p>Difficulty ${state.game.difficulty}</p>
    <p>Effects ${escapeHtml(effectText)}</p>
    <p>Style ${player.style}</p>
    <p>Weapon ${escapeHtml(playerWeaponSummary)}</p>
    <p>${activeStyle} ${activeStyle === "Magic" ? "Spell" : "Skill"} ${escapeHtml(activeSkill.name)}</p>
  `;
  els.combatEnemy.innerHTML = `
    <p><strong>${escapeHtml(enemy.name)}</strong> (Lv ${enemy.level})</p>
    <p>Species ${escapeHtml(enemy.speciesName || enemy.name)}</p>
    <p>HP ${enemy.currentHealth}/${enemy.stats.Health}</p>
    <p>Attack ${enemy.attackType}</p>
    <p>Damage 1d${enemy.damageDie} ${escapeHtml(enemy.damageKind || defaultDamageKindForAttackType(enemy.attackType))}</p>
    <p>Known Weaknesses ${escapeHtml(knownWeaknesses)}</p>
    <p>Known Resistances ${escapeHtml(knownResistances)}</p>
    <p>Type ${enemy.isBoss ? "Boss" : "Normal"}</p>
  `;

  const lines = state.combat.log.slice(-COMBAT_LOG_LIMIT);
  els.combatLog.innerHTML = lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("");

  const canAct = state.combat.phase === "player";
  [...els.combatActions.querySelectorAll("button[data-action]")].forEach((button) => {
    button.disabled = !canAct;
  });

  if (state.combat.result) {
    els.combatReturn.classList.remove("hidden");
    els.combatReturn.textContent = "Return to Map";
  } else {
    els.combatReturn.classList.add("hidden");
  }
  updateFocusables();
}

function playerCombatAction(action) {
  if (!state.combat || !state.game || state.combat.phase !== "player") return;
  if (action === "attack") return resolvePlayerAttack({ kind: "attack" });
  if (action === "skill") return openCombatSkillSelection();
  if (action === "item") return openCombatItemSelection();
  if (action === "defend") {
    state.combat.playerDefending = true;
    pushCombatLog("You brace for impact. Dramatically.");
    queueEnemyTurn();
    return;
  }
  if (action === "flee") {
    const luckBonus = Math.floor(state.game.player.derivedStats.Luck / 2);
    const fleeRoll = rollDie(state.game.runtimeRng, 20) + luckBonus;
    const target = 12 + Math.floor(state.combat.enemy.level / 2);
    if (fleeRoll >= target) {
      pushCombatLog(`Flee roll ${fleeRoll} vs ${target}: success. You retreat with dignity.`);
      finalizeCombat("fled");
    } else {
      pushCombatLog(`Flee roll ${fleeRoll} vs ${target}: failed. The enemy disagrees.`);
      queueEnemyTurn();
    }
  }
}

function resolvePlayerAttack({ kind, abilityOverride = null }) {
  const player = state.game.player;
  const enemy = state.combat.enemy;
  const difficulty = getDifficulty();
  const profile = getPlayerAttackProfile(kind, abilityOverride);
  const attackStats = ATTACK_TO_STATS[profile.attackType];
  const attackValue = player.derivedStats[attackStats.attack];
  const defenseValue = enemy.stats[attackStats.defense];
  const hitRoll = rollDie(state.game.runtimeRng, 20) + attackValue + profile.hitBonus;
  const target = defenseValue + 10;

  if (hitRoll < target) {
    pushCombatLog(`${profile.label} misses (${hitRoll} vs ${target}).`);
    queueEnemyTurn();
    return;
  }

  let damage = 0;
  profile.damageDice.forEach((die) => {
    damage += rollDie(state.game.runtimeRng, die);
  });
  damage += Math.floor(attackValue * profile.attackScale);
  damage -= Math.floor(defenseValue * profile.defenseScale);
  damage = Math.floor(damage * difficulty.playerDamage);
  damage = Math.max(1, damage);

  const critThreshold = Math.max(1, Math.floor((player.derivedStats.CriticalChance + profile.critBonus + getPlayerEffectCritBonus(player)) / 5));
  const critRoll = rollDie(state.game.runtimeRng, 20);
  const critical = critRoll <= critThreshold;
  if (critical) damage = Math.max(1, Math.floor(damage * 1.5));

  const affinity = getEnemyAffinityResult(enemy, profile.damageKind);
  if (affinity.multiplier !== 1) {
    damage = Math.max(1, Math.floor(damage * affinity.multiplier));
  }
  recordBestiaryAffinity(enemy, profile.damageKind, affinity.kind);

  enemy.currentHealth = clamp(enemy.currentHealth - damage, 0, enemy.stats.Health);
  const damageTag = profile.damageKind ? ` ${profile.damageKind}` : "";
  const affinitySuffix = affinity.kind === "weak" ? " Weakness hit." : affinity.kind === "resist" ? " Enemy resisted." : "";
  if (state.options.verboseCombatLog) {
    pushCombatLog(`${profile.label}${damageTag} hits for ${damage}.${affinitySuffix} [hit ${hitRoll}/${target}, crit ${critRoll}<=${critThreshold}${critical ? " YES" : ""}, x${affinity.multiplier.toFixed(2)}]`);
  } else {
    pushCombatLog(`${profile.label}${damageTag} hits for ${damage}${critical ? " (critical)" : ""}.${affinitySuffix}`);
  }
  playSfx(critical ? "crit" : "hit");
  if (enemy.currentHealth <= 0) finalizeCombat("won");
  else queueEnemyTurn();
}

function getPlayerAttackProfile(kind, abilityOverride = null) {
  const player = state.game.player;
  const weapon = player.equipment.Weapon;
  const attackType = getActiveAttackStyle(player);
  const weaponDie = weapon ? weapon.damageDie : 4;
  const weaponHitBonus = getWeaponHitModifier(weapon);
  const weaponCritBonus = getWeaponCritBonus(weapon);
  const weaponDamageKind = getWeaponDamageKind(weapon, attackType);
  const weaponSpeed = getWeaponSpeed(weapon);
  if (kind === "attack") {
    return {
      label: "Attack",
      attackType,
      damageDice: [weaponDie],
      hitBonus: Math.floor(player.derivedStats.Luck / 6) + weaponHitBonus,
      attackScale: 0.52 + weaponSpeed * 0.008,
      defenseScale: 0.35,
      critBonus: weaponCritBonus,
      damageKind: weaponDamageKind,
    };
  }
  const abilities = getUnlockedAbilitiesForStyle(player, attackType);
  const chosen = abilityOverride || abilities[abilities.length - 1];
  const abilityDice = [...chosen.damageDice];
  abilityDice[0] = Math.max(abilityDice[0], weaponDie);
  return {
    label: chosen.name,
    attackType,
    damageDice: abilityDice,
    hitBonus: chosen.hitBonus + Math.floor(weaponHitBonus / 2),
    attackScale: chosen.attackScale + weaponSpeed * 0.003,
    defenseScale: chosen.defenseScale,
    critBonus: chosen.critBonus + weaponCritBonus,
    damageKind: chosen.damageKind || weaponDamageKind,
  };
}

function getActiveAttackStyle(player) {
  if (player.equipment.Weapon && player.equipment.Weapon.attackType) return player.equipment.Weapon.attackType;
  return player.style;
}

function getUnlockedAbilitiesForStyle(player, style) {
  const abilities = WEAPON_ABILITY_SETS[style] || WEAPON_ABILITY_SETS[player.style] || WEAPON_ABILITY_SETS.Melee;
  const unlocked = abilities.filter((ability) => player.level >= ability.level);
  if (unlocked.length > 0) return unlocked;
  return [abilities[0]];
}

function getNextAbilityForStyle(player, style) {
  const abilities = WEAPON_ABILITY_SETS[style] || WEAPON_ABILITY_SETS[player.style] || WEAPON_ABILITY_SETS.Melee;
  return abilities.find((ability) => ability.level > player.level) || null;
}

function announceAbilityUnlocks(previousLevel, currentLevel) {
  if (!state.game || currentLevel <= previousLevel) return;
  Object.entries(WEAPON_ABILITY_SETS).forEach(([style, abilities]) => {
    abilities
      .filter((ability) => ability.level > previousLevel && ability.level <= currentLevel)
      .forEach((ability) => {
        const type = style === "Magic" ? "spell" : "skill";
        addWorldLog(`New ${style} ${type} unlocked: ${ability.name} (Lv ${ability.level}).`);
      });
  });
}

function getCurrentStoryChapter() {
  const chapters = state.game?.storyline && state.game.storyline.length ? state.game.storyline : STORY_CHAPTERS;
  const index = clamp(state.game?.storyIndex || 0, 0, chapters.length - 1);
  return chapters[index];
}

function openCombatSkillSelection() {
  if (!state.combat || !state.game || state.combat.phase !== "player") return;
  const player = state.game.player;
  const style = getActiveAttackStyle(player);
  const abilities = getUnlockedAbilitiesForStyle(player, style);
  if (!abilities.length) {
    pushCombatLog("No skills are available.");
    return;
  }
  state.modal = "combatSkill";
  state.modalData = { style };
  els.modalBackdrop.classList.remove("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "false");
  renderModal();
}

function openCombatItemSelection() {
  if (!state.combat || !state.game || state.combat.phase !== "player") return;
  const combatItems = state.game.player.bag.filter((item) => {
    if (item.kind !== "consumable" || item.quantity <= 0) return false;
    const definition = CONSUMABLE_DEFS[item.id];
    return !!definition && (definition.heal || definition.damage || definition.flee || definition.critBuff);
  });
  if (!combatItems.length) {
    pushCombatLog("No usable combat items available.");
    return;
  }
  state.modal = "combatItem";
  state.modalData = null;
  els.modalBackdrop.classList.remove("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "false");
  renderModal();
}

function useCombatItem(forcedUid = null) {
  const player = state.game.player;
  const deficit = player.derivedStats.Health - player.currentHealth;
  const chosen = forcedUid
    ? player.bag.find((item) => item.uid === forcedUid && item.kind === "consumable" && item.quantity > 0)
    : chooseBestCombatConsumable(player, deficit);
  if (!chosen) return pushCombatLog("No usable combat items available.");

  const definition = CONSUMABLE_DEFS[chosen.id];
  if (!definition) return pushCombatLog("Item fizzles awkwardly.");

  if (definition.heal) {
    if (deficit <= 0) return pushCombatLog("Health already full.");
    const healAmount = definition.heal + rollDie(state.game.runtimeRng, 8);
    player.currentHealth = clamp(player.currentHealth + healAmount, 0, player.derivedStats.Health);
    consumeStack(player, chosen.uid);
    pushCombatLog(`You use ${definition.name} and recover ${healAmount} Health.`);
    state.game.meta.potionsUsed += 1;
    playSfx("potion");
    queueEnemyTurn();
    return;
  }

  if (definition.damage) {
    const bonus = rollDie(state.game.runtimeRng, definition.die || 6);
    const damage = definition.damage + bonus;
    state.combat.enemy.currentHealth = clamp(state.combat.enemy.currentHealth - damage, 0, state.combat.enemy.stats.Health);
    consumeStack(player, chosen.uid);
    pushCombatLog(`You throw ${definition.name} for ${damage} damage.`);
    playSfx("bomb");
    if (state.combat.enemy.currentHealth <= 0) finalizeCombat("won");
    else queueEnemyTurn();
    return;
  }

  if (definition.flee) {
    consumeStack(player, chosen.uid);
    pushCombatLog(`${definition.name} erupts. You escape cleanly.`);
    playSfx("flee");
    finalizeCombat("fled");
    return;
  }

  if (definition.critBuff) {
    consumeStack(player, chosen.uid);
    applyPlayerEffect(player, {
      id: "focus_tonic",
      name: "Focused",
      critBonus: definition.critBuff,
      turns: definition.buffTurns || 3,
    });
    pushCombatLog(`${definition.name} sharpens your senses.`);
    playSfx("buff");
    queueEnemyTurn();
    return;
  }

  pushCombatLog("That item cannot be used right now.");
}

function allocateStatPoint(stat) {
  if (!state.game || !state.game.player) return;
  const player = state.game.player;
  if (!ALL_STATS.includes(stat)) return;
  if (!player.unspentStatPoints || player.unspentStatPoints <= 0) return;
  const amount = STAT_POINT_INCREASES[stat] || 1;
  player.baseStats[stat] += amount;
  player.unspentStatPoints -= 1;
  recalculatePlayerStats(player, true);
  addWorldLog(`${stat} increased by ${amount}.`);
  state.game.pendingLevelUp = (player.unspentStatPoints || 0) > 0 || hasPendingAutoLevelReview();
  if (player.unspentStatPoints <= 0 && !hasPendingAutoLevelReview()) {
    addWorldLog("All level-up points spent.");
  }
}

function autoAllocateStatPoints(player, budget = null) {
  if (!player) return null;
  const available = player.unspentStatPoints || 0;
  const pointsToSpend = budget == null ? available : clamp(Math.floor(budget), 0, available);
  if (pointsToSpend <= 0) return null;

  const style = getActiveAttackStyle(player);
  const primaryAttack = `${style}Attack`;
  const primaryDefense = `${style}Defense`;
  const cycle = [primaryAttack, "Health", primaryDefense];
  const spent = {};

  for (let index = 0; index < pointsToSpend; index += 1) {
    let stat = cycle[index % cycle.length];
    if (index % 5 === 4) stat = "CriticalChance";
    const amount = STAT_POINT_INCREASES[stat] || 1;
    player.baseStats[stat] += amount;
    player.unspentStatPoints -= 1;
    spent[stat] = (spent[stat] || 0) + amount;
  }

  recalculatePlayerStats(player, true);
  if (state.game) state.game.pendingLevelUp = (player.unspentStatPoints || 0) > 0;
  return spent;
}

function formatAllocationSummary(spent) {
  if (!spent) return "";
  const entries = Object.entries(spent);
  if (!entries.length) return "";
  return entries.map(([stat, value]) => `${stat} +${value}`).join(", ");
}

function hasPendingAutoLevelReview() {
  return !!(state.game && state.game.pendingLevelUpReview && state.game.lastAutoLevelUp);
}

function hasPendingLevelUpFlow() {
  if (!state.game || !state.game.player) return false;
  if (hasPendingAutoLevelReview()) return true;
  return !!(state.game.pendingLevelUp && (state.game.player.unspentStatPoints || 0) > 0);
}

function applyAutoLevelWithReview(player) {
  if (!state.game || !player) return null;
  const pointsBefore = player.unspentStatPoints || 0;
  if (pointsBefore <= 0) return null;
  const baseStatsBefore = copyStats(player.baseStats);
  const spent = autoAllocateStatPoints(player);
  const pointsAfter = player.unspentStatPoints || 0;
  const pointsSpent = Math.max(0, pointsBefore - pointsAfter);
  if (!spent || pointsSpent <= 0) return null;
  const summary = formatAllocationSummary(spent);
  state.game.lastAutoLevelUp = {
    summary,
    spent,
    pointsBefore,
    pointsSpent,
    level: player.level,
    baseStatsBefore,
  };
  state.game.pendingLevelUpReview = true;
  state.game.pendingLevelUp = (player.unspentStatPoints || 0) > 0;
  return state.game.lastAutoLevelUp;
}

function keepAutoLevelAllocation() {
  if (!state.game || !hasPendingAutoLevelReview()) return;
  const info = state.game.lastAutoLevelUp;
  state.game.pendingLevelUpReview = false;
  state.game.lastAutoLevelUp = null;
  state.game.pendingLevelUp = (state.game.player.unspentStatPoints || 0) > 0;
  if (info?.summary) addWorldLog(`Auto-level kept: ${info.summary}.`);
}

function revertAutoLevelAllocation() {
  if (!state.game || !hasPendingAutoLevelReview()) return false;
  const player = state.game.player;
  const info = state.game.lastAutoLevelUp;
  if (!info || !info.baseStatsBefore) return false;
  player.baseStats = copyStats(info.baseStatsBefore);
  player.unspentStatPoints = Math.max(0, info.pointsBefore || 0);
  recalculatePlayerStats(player, true);
  state.game.pendingLevelUpReview = false;
  state.game.lastAutoLevelUp = null;
  state.game.pendingLevelUp = player.unspentStatPoints > 0;
  addWorldLog("Auto-level reverted. Allocate points manually.");
  return true;
}

function openLevelUpModal() {
  if (!state.game || state.combat) return;
  const points = state.game.player.unspentStatPoints || 0;
  if (points <= 0 && !hasPendingAutoLevelReview()) {
    addWorldLog("No stat points available.");
    return;
  }
  state.game.pendingLevelUp = points > 0 || hasPendingAutoLevelReview();
  state.modal = "levelup";
  state.modalData = null;
  els.modalBackdrop.classList.remove("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "false");
  renderModal();
}

function queueEnemyTurn() {
  if (!state.combat || !state.game) return;
  state.combat.phase = "enemy";
  renderCombat();
  window.setTimeout(() => {
    if (!state.combat || !state.game || state.combat.phase !== "enemy") return;
    resolveEnemyTurn();
  }, 450);
}

function resolveEnemyTurn() {
  const player = state.game.player;
  const enemy = state.combat.enemy;
  const attackStats = ATTACK_TO_STATS[enemy.attackType];
  const attackValue = enemy.stats[attackStats.attack];
  const defenseValue = player.derivedStats[attackStats.defense];
  const hitRoll = rollDie(state.game.runtimeRng, 20) + attackValue;
  const target = defenseValue + 10;
  if (hitRoll < target) {
    pushCombatLog(`${enemy.name} misses (${hitRoll} vs ${target}).`);
    state.combat.playerDefending = false;
    tickPlayerEffects(player);
    state.combat.turn += 1;
    state.combat.phase = "player";
    return renderCombat();
  }

  let damage = rollDie(state.game.runtimeRng, enemy.damageDie);
  damage += Math.floor(attackValue * 0.36);
  damage -= Math.floor(defenseValue * 0.35);
  damage = Math.max(1, damage);
  const critRoll = rollDie(state.game.runtimeRng, 20);
  const critThreshold = Math.max(1, Math.floor(enemy.stats.CriticalChance / 5));
  if (critRoll <= critThreshold) damage = Math.max(1, Math.floor(damage * 1.5));
  if (state.combat.playerDefending) damage = Math.max(1, Math.floor(damage * 0.6));

  player.currentHealth = clamp(player.currentHealth - damage, 0, player.derivedStats.Health);
  pushCombatLog(`${enemy.name} hits for ${damage}.`);
  playSfx(critRoll <= critThreshold ? "crit" : "hit");
  state.combat.playerDefending = false;
  tickPlayerEffects(player);
  state.combat.turn += 1;

  if (player.currentHealth <= 0) return finalizeCombat("lost");
  state.combat.phase = "player";
  renderCombat();
}

function pushCombatLog(line) {
  if (!state.combat) return;
  state.combat.log.push(line);
  if (state.combat.log.length > COMBAT_LOG_LIMIT) state.combat.log = state.combat.log.slice(-COMBAT_LOG_LIMIT);
  renderCombat();
}

function finalizeCombat(result) {
  if (!state.combat || !state.game) return;
  state.combat.result = result;
  state.combat.phase = "done";

  if (result === "won") {
    const enemy = state.combat.enemy;
    recordBestiaryKill(enemy);
    const xpGain = Math.floor((20 + enemy.level * 8 + (enemy.isBoss ? 90 : 0)) * getDifficulty().xp);
    gainXp(state.game.player, xpGain);
    addWorldLog(`Victory over ${enemy.name}. Gained ${xpGain} XP.`);
    pushCombatLog(`Victory. You gain ${xpGain} XP.`);
    state.game.meta.wins += 1;
    state.game.meta.enemiesDefeated += 1;
    updateQuestProgress("enemyDefeated", { enemy, biome: state.combat.biome });
    if (enemy.isBoss) {
      state.game.meta.bossesDefeated += 1;
      markBossDefeated(enemy.featureId);
      updateQuestProgress("bossDefeated", { featureId: enemy.featureId, enemy });
      advanceStoryIfNeeded("boss");
      addWorldLog(`Boss defeated: ${enemy.name}.`);
      playSfx("bossWin");
      triggerVictoryFanfare(true);
    } else {
      playSfx("victory");
      triggerVictoryFanfare(false);
    }
    maybeDropLoot(enemy);
  } else if (result === "fled") {
    addWorldLog("You escaped combat.");
    pushCombatLog("You fled from battle.");
    playSfx("flee");
  } else if (result === "lost") {
    const player = state.game.player;
    const world = state.game.world;
    const difficulty = getDifficulty();
    const defeatSpot = { x: player.position.x, y: player.position.y };
    const penaltyLines = applyDeathPenalty(player, world, difficulty, defeatSpot.x, defeatSpot.y);
    const spawn = world.majorCityById[state.game.startingCityId] || world.majorCities[0];
    player.position.x = spawn.x;
    player.position.y = spawn.y;
    const restoreRatio = Number.isFinite(difficulty.deathRestoreRatio) ? difficulty.deathRestoreRatio : 0.7;
    player.currentHealth = clamp(Math.floor(player.derivedStats.Health * restoreRatio), 1, player.derivedStats.Health);
    addWorldLog(`Defeat. You wake up in ${spawn.name} with bruised pride.`);
    penaltyLines.forEach((line) => addWorldLog(line));
    pushCombatLog("Defeat. You are dragged back to a city.");
    if (penaltyLines.length) pushCombatLog(`Penalty: ${penaltyLines.join(" ")}`);
    state.game.meta.losses += 1;
    playSfx("defeat");
  }
  checkAchievements();
  renderCombat();
}

function applyDeathPenalty(player, world, difficulty, x, y) {
  const lines = [];
  if (!player || !world || !difficulty) return lines;

  if (difficulty.deathMode === "gold" || difficulty.deathMode === "gear_gold") {
    const goldLoss = calculateDeathGoldLoss(player, difficulty);
    if (goldLoss > 0) {
      player.gold = Math.max(0, player.gold - goldLoss);
      lines.push(`You lost ${goldLoss} gold.`);
    } else {
      lines.push("You had no gold to lose.");
    }
  }

  if (difficulty.deathMode === "gear" || difficulty.deathMode === "gear_gold") {
    const dropResult = dropEquippedGearCache(player, world, x, y);
    if (dropResult.count > 0) {
      lines.push(`Dropped ${dropResult.count} equipped item${dropResult.count === 1 ? "" : "s"} at ${dropResult.x}, ${dropResult.y}.`);
    } else {
      lines.push("No equipped gear was dropped.");
    }
  }

  if (difficulty.deathMode === "none") {
    lines.push("No death penalty on this difficulty.");
  }

  return lines;
}

function calculateDeathGoldLoss(player, difficulty) {
  if (!player || player.gold <= 0) return 0;
  const lossRate = Number.isFinite(difficulty.deathGoldLossRate) ? difficulty.deathGoldLossRate : 0;
  const flat = Number.isFinite(difficulty.deathGoldLossFlat) ? difficulty.deathGoldLossFlat : 0;
  const levelScale = Number.isFinite(difficulty.deathGoldLossPerLevel) ? difficulty.deathGoldLossPerLevel : 0;
  let loss = Math.floor(player.gold * lossRate + flat + player.level * levelScale);
  loss = Math.max(loss, Math.min(player.gold, player.level + 4));
  return clamp(loss, 0, player.gold);
}

function dropEquippedGearCache(player, world, x, y) {
  if (!player || !world) return { count: 0, x, y };
  const dropped = [];
  EQUIPMENT_SLOTS.forEach((slot) => {
    if (!player.equipment[slot]) return;
    dropped.push(player.equipment[slot]);
    player.equipment[slot] = null;
  });
  if (!dropped.length) return { count: 0, x, y };
  recalculatePlayerStats(player, true);

  const dropSpot = findNearestOpenFeatureTile(world, x, y, state.game?.runtimeRng);
  if (!dropSpot) {
    dropped.forEach((item) => addItemToBag(player, item));
    return { count: 0, x, y };
  }

  const key = featureKey(dropSpot.x, dropSpot.y);
  const existing = world.featureLookup[key];
  if (existing && existing.type === "grave") {
    existing.items = Array.isArray(existing.items) ? existing.items.concat(dropped) : [...dropped];
    revealAround(world, dropSpot.x, dropSpot.y, 1);
    return { count: dropped.length, x: dropSpot.x, y: dropSpot.y };
  }

  const cache = {
    id: `grave_${createItemUid()}`,
    name: "Dropped Gear Cache",
    type: "grave",
    x: dropSpot.x,
    y: dropSpot.y,
    items: dropped,
  };
  world.features.push(cache);
  world.featureLookup[key] = cache;
  revealAround(world, dropSpot.x, dropSpot.y, 1);
  return { count: dropped.length, x: dropSpot.x, y: dropSpot.y };
}

function findNearestOpenFeatureTile(world, x, y, rng) {
  if (!world) return null;
  const originX = clamp(x, 0, world.width - 1);
  const originY = clamp(y, 0, world.height - 1);
  if (!world.featureLookup[featureKey(originX, originY)]) return { x: originX, y: originY };

  for (let radius = 1; radius <= 8; radius += 1) {
    const candidates = [];
    for (let oy = -radius; oy <= radius; oy += 1) {
      for (let ox = -radius; ox <= radius; ox += 1) {
        if (Math.max(Math.abs(ox), Math.abs(oy)) !== radius) continue;
        const nx = originX + ox;
        const ny = originY + oy;
        if (nx < 0 || ny < 0 || nx >= world.width || ny >= world.height) continue;
        if (world.featureLookup[featureKey(nx, ny)]) continue;
        candidates.push({ x: nx, y: ny });
      }
    }
    if (candidates.length) return rng ? rng.pick(candidates) : candidates[0];
  }

  for (let ny = 0; ny < world.height; ny += 1) {
    for (let nx = 0; nx < world.width; nx += 1) {
      if (!world.featureLookup[featureKey(nx, ny)]) return { x: nx, y: ny };
    }
  }
  return null;
}

function maybeDropLoot(enemy) {
  const player = state.game.player;
  const rng = state.game.runtimeRng;
  const difficulty = getDifficulty();
  const lootLines = [];

  const goldGain = Math.floor((8 + enemy.level * 3 + rng.int(0, 14)) * (enemy.isBoss ? 2.2 : 1) * difficulty.loot);
  player.gold += goldGain;
  state.game.meta.totalGoldFound += goldGain;
  lootLines.push(`${goldGain} gold`);

  const equipmentDropChance = clamp(24 + player.derivedStats.Luck * 0.45 + (enemy.isBoss ? 42 : 0), 10, 95);
  if (rng.next() * 100 < equipmentDropChance) {
    const item = generateEquipmentDrop(player.level, rng, { boss: enemy.isBoss });
    addItemToBag(player, item);
    lootLines.push(item.name);
  }

  const consumableDrops = enemy.isBoss ? 3 : rng.int(0, 2);
  for (let i = 0; i < consumableDrops; i += 1) {
    const dropId = rollConsumableDrop(rng, enemy.isBoss);
    addConsumableToBag(player, dropId, 1);
    lootLines.push(CONSUMABLE_DEFS[dropId].name);
  }

  if (rng.next() * 100 < (enemy.isBoss ? 90 : 45)) {
    const materialId = rng.pick(Object.keys(MATERIAL_DEFS));
    addStackableLoot(player, "material", MATERIAL_DEFS[materialId], rng.int(1, enemy.isBoss ? 4 : 2));
    lootLines.push(MATERIAL_DEFS[materialId].name);
  }

  if (enemy.isBoss || rng.next() * 100 < 14) {
    const treasureId = rng.pick(Object.keys(TREASURE_DEFS));
    addStackableLoot(player, "treasure", TREASURE_DEFS[treasureId], 1);
    lootLines.push(TREASURE_DEFS[treasureId].name);
  }

  pushCombatLog(`Loot: ${lootLines.join(", ")}.`);
  addWorldLog(`Loot acquired: ${lootLines.join(", ")}.`);
}

function generateEquipmentDrop(playerLevel, rng, options = {}) {
  const tier = tierForLevel(playerLevel);
  const slot = rng.pick(EQUIPMENT_SLOTS);
  const slotLabel = slot.replace("Accessory1", "Accessory").replace("Accessory2", "Accessory");
  const prefixes = ["Bent", "Dusty", "Nimble", "Sharp", "Odd", "Lucky", "Stubborn", "Ancient", "Heroic", "Divine"];
  const rarity = rollEquipmentRarity(playerLevel, rng, options.boss);
  const rarityScale = RARITY_DATA[rarity].modScale;
  const attackType = slot === "Weapon" ? rng.pick(["Melee", "Ranged", "Magic"]) : null;
  const damageKindPool = attackType ? getDamageKindsForAttackType(attackType) : [];
  const damageKind = slot === "Weapon" ? rng.pick(damageKindPool) : null;
  const damageDie = slot === "Weapon" ? rng.pick([4, 6, 8, 10, 12]) : 0;
  const speedBase = slot === "Weapon" ? rng.int(3, 8) : 0;
  const speed = slot === "Weapon" ? clamp(speedBase + (damageDie <= 6 ? 1 : 0) - (damageDie >= 10 ? 1 : 0), 2, 10) : 0;
  const hitBonus = slot === "Weapon" ? rng.int(0, 2) : 0;
  const critBonus = slot === "Weapon" ? rng.int(0, 3) : 0;
  const item = {
    uid: createItemUid(),
    kind: "equipment",
    slot,
    attackType,
    damageDie,
    damageKind,
    speed,
    hitBonus,
    critBonus,
    tier,
    rarity,
    levelReq: (tier - 1) * 10 + 1,
    name: `${rarity} ${prefixes[clamp(tier - 1, 0, prefixes.length - 1)]} ${slotLabel} (${TIER_NAMES[tier - 1]})`,
    modifiers: createZeroStats(),
  };
  item.modifiers.Health = Math.floor(rng.int(0, 5 + tier * 3) * rarityScale);
  item.modifiers.MeleeAttack = Math.floor(rng.int(0, 1 + tier) * rarityScale);
  item.modifiers.MeleeDefense = Math.floor(rng.int(0, 1 + tier) * rarityScale);
  item.modifiers.RangedAttack = Math.floor(rng.int(0, 1 + tier) * rarityScale);
  item.modifiers.RangedDefense = Math.floor(rng.int(0, 1 + tier) * rarityScale);
  item.modifiers.MagicAttack = Math.floor(rng.int(0, 1 + tier) * rarityScale);
  item.modifiers.MagicDefense = Math.floor(rng.int(0, 1 + tier) * rarityScale);
  item.modifiers.CriticalChance = Math.floor(rng.int(0, 1 + Math.ceil(tier / 2)) * rarityScale);
  item.modifiers.Luck = Math.floor(rng.int(0, 1 + Math.ceil(tier / 2)) * rarityScale);
  ensureEquipmentHasMeaningfulBonus(item, rng);
  return item;
}

function ensureEquipmentHasMeaningfulBonus(item, rng) {
  if (!item || !item.modifiers) return;
  if (item.slot === "Weapon") {
    const attackStat = `${item.attackType}Attack`;
    item.modifiers[attackStat] = Math.max(1, item.modifiers[attackStat] || 0);
    return;
  }
  item.modifiers.Health = Math.max(1, item.modifiers.Health || 0);
  const defenseStats = ["MeleeDefense", "RangedDefense", "MagicDefense"];
  const hasDefense = defenseStats.some((stat) => (item.modifiers[stat] || 0) > 0);
  if (!hasDefense) {
    const pick = rng.pick(defenseStats);
    item.modifiers[pick] = 1;
  }
}

function endCombatAndReturnToWorld() {
  if (!state.combat || !state.combat.result) return;
  state.combat = null;
  clearVictoryMusicTimer();
  showScreen("world");
  if (hasPendingLevelUpFlow()) {
    openLevelUpModal();
  }
}

function gainXp(player, amount) {
  const levelBefore = player.level;
  player.xp += amount;
  let levelsGained = 0;
  while (player.level < MAX_LEVEL) {
    const need = xpToNextLevel(player.level);
    if (player.xp < need) break;
    player.xp -= need;
    levelUp(player);
    levelsGained += 1;
  }
  if (levelsGained > 0) {
    recalculatePlayerStats(player, true);
    player.currentHealth = clamp(player.currentHealth + levelsGained * 2, 1, player.derivedStats.Health);
    addWorldLog(`Level up. ${player.name} is now level ${player.level}.`);
    const gainedPoints = levelsGained * 3;
    if (state.options.autoLevelUp) {
      const info = applyAutoLevelWithReview(player);
      if (info?.summary) {
        addWorldLog(`Auto-level allocated: ${info.summary}. Check Level Up to keep or switch to manual.`);
        if (state.combat) pushCombatLog(`Auto-level: ${info.summary}. You can review it in Level Up.`);
      }
      state.game.pendingLevelUp = hasPendingLevelUpFlow();
    } else {
      addWorldLog(`You gained ${gainedPoints} stat points. Open Level Up to assign them.`);
      if (state.combat) pushCombatLog(`Level up! ${gainedPoints} stat points available.`);
      state.game.pendingLevelUp = true;
    }
    announceAbilityUnlocks(levelBefore, player.level);
    updateQuestProgress("levelUp", { level: player.level });
    advanceStoryIfNeeded("level");
    checkAchievements();
    if (!state.combat && state.screen === "world" && hasPendingLevelUpFlow()) openLevelUpModal();
  }
}

function levelUp(player) {
  player.level += 1;
  player.unspentStatPoints = (player.unspentStatPoints || 0) + 3;
}

function xpToNextLevel(level) {
  return 80 + level * 22;
}

function openCharacterMenu() {
  if (!state.game || state.combat) return;
  state.modal = "character";
  state.modalData = null;
  els.modalBackdrop.classList.remove("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "false");
  renderModal();
}

function openModal(type) {
  if (!state.game || state.combat) return;
  state.modal = type;
  state.modalData = null;
  els.modalBackdrop.classList.remove("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "false");
  renderModal();
}

function closeModal() {
  state.modal = null;
  state.modalData = null;
  els.modalBackdrop.classList.add("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "true");
  updateFocusables();
}

function cycleCharacterModalTab(direction) {
  if (!state.modal || !state.game) return false;
  const currentIndex = CHARACTER_MODAL_TABS.indexOf(state.modal);
  if (currentIndex < 0) return false;
  const nextIndex = (currentIndex + direction + CHARACTER_MODAL_TABS.length) % CHARACTER_MODAL_TABS.length;
  state.modal = CHARACTER_MODAL_TABS[nextIndex];
  state.modalData = null;
  renderModal();
  return true;
}

function renderModal() {
  if (!state.modal || !state.game) return;
  const player = state.game.player;

  if (state.modal === "character") {
    els.modalTitle.textContent = "Character Menu";
    const chapter = getCurrentStoryChapter();
    const detailsRows = [
      `Level ${player.level} | XP ${player.xp}/${xpToNextLevel(player.level)}`,
      `Gold ${player.gold} | HP ${player.currentHealth}/${player.derivedStats.Health}`,
      `Battles Won ${state.game.meta.wins} | Losses ${state.game.meta.losses}`,
      `Enemies Defeated ${state.game.meta.enemiesDefeated} | Bosses ${state.game.meta.bossesDefeated}`,
      `Quests Completed ${state.game.meta.questsCompleted} | NPC Talks ${state.game.meta.npcsTalked}`,
      `Chests Opened ${state.game.meta.chestsOpened} | Transitions ${state.game.meta.transitionsUsed}`,
      `Tiles Discovered ${state.game.meta.tilesDiscovered} | Gold Found ${state.game.meta.totalGoldFound}`,
      `Current Chapter: ${chapter.title}`,
    ].map((line) => `<li>${escapeHtml(line)}</li>`).join("");
    els.modalContent.innerHTML = `
      <div class="button-row">
        <button class="focusable" data-modal-action="open-character-section" data-target="inventory">Inventory</button>
        <button class="focusable" data-modal-action="open-character-section" data-target="equipment">Equipment</button>
        <button class="focusable" data-modal-action="open-character-section" data-target="levelup">Level Up</button>
        <button class="focusable" data-modal-action="open-character-section" data-target="quests">Quests</button>
        <button class="focusable" data-modal-action="open-character-section" data-target="bestiary">Bestiary</button>
        <button class="focusable" data-modal-action="open-character-section" data-target="story">Story</button>
        <button class="focusable" data-modal-action="open-character-section" data-target="achievements">Achievements</button>
      </div>
      <h4>Journey Summary</h4>
      <ul class="log-list">${detailsRows}</ul>
    `;
  } else if (state.modal === "inventory") {
    els.modalTitle.textContent = "Inventory";
    const consumables = player.bag.filter((item) => item.kind === "consumable");
    const equipment = player.bag.filter((item) => item.kind === "equipment");
    const materials = player.bag.filter((item) => item.kind === "material");
    const treasures = player.bag.filter((item) => item.kind === "treasure");

    const consumableRows = consumables.length
      ? consumables
        .map((item) => `
          <div class="item-row">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <p>${escapeHtml(item.description)} (x${item.quantity})</p>
            </div>
            <button class="focusable" data-modal-action="use-item" data-item-id="${item.uid}">Use</button>
          </div>
        `)
        .join("")
      : "<p>No consumables.</p>";

    const equipmentRows = equipment.length
      ? equipment
        .map((item) => `
          <div class="item-row">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <p>${escapeHtml(item.rarity || "Common")} | ${escapeHtml(item.slot)} | Req Lv ${item.levelReq || 1} | ${summarizeModifiers(item.modifiers)}${item.slot === "Weapon" ? ` | ${escapeHtml(summarizeWeaponForUi(item))}` : ""}</p>
            </div>
            <button class="focusable" data-modal-action="equip-item" data-item-id="${item.uid}">Equip</button>
          </div>
        `)
        .join("")
      : "<p>No equipment in bag.</p>";

    const materialRows = materials.length
      ? materials.map((item) => `<div class="item-row"><div><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.description)} (x${item.quantity})</p></div><span>Material</span></div>`).join("")
      : "<p>No materials.</p>";

    const treasureRows = treasures.length
      ? treasures.map((item) => `<div class="item-row"><div><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.description)} (x${item.quantity})</p></div><span>Treasure</span></div>`).join("")
      : "<p>No treasure items.</p>";

    els.modalContent.innerHTML = `
      <h4>Consumables</h4>
      <div class="modal-list">${consumableRows}</div>
      <h4>Bag Equipment</h4>
      <div class="modal-list">${equipmentRows}</div>
      <h4>Materials</h4>
      <div class="modal-list">${materialRows}</div>
      <h4>Treasures</h4>
      <div class="modal-list">${treasureRows}</div>
    `;
  } else if (state.modal === "equipment") {
    els.modalTitle.textContent = "Equipment";
    const equippedRows = EQUIPMENT_SLOTS.map((slot) => {
      const item = player.equipment[slot];
      if (!item) {
        return `<div class="item-row"><div><strong>${slot}</strong><p>Empty</p></div><span>-</span></div>`;
      }
      return `
        <div class="item-row">
          <div>
            <strong>${slot}</strong>
            <p>${escapeHtml(item.rarity || "Common")} | ${escapeHtml(item.name)} | Req Lv ${item.levelReq || 1} | ${summarizeModifiers(item.modifiers)}${slot === "Weapon" ? ` | ${escapeHtml(summarizeWeaponForUi(item))}` : ""}</p>
          </div>
          <button class="focusable" data-modal-action="unequip-slot" data-slot="${slot}">Unequip</button>
        </div>
      `;
    }).join("");
    els.modalContent.innerHTML = `<h4>Equipped Gear</h4><div class="modal-list">${equippedRows}</div>`;
  } else if (state.modal === "story") {
    els.modalTitle.textContent = "Story Journal";
    const chapters = state.game.storyline && state.game.storyline.length ? state.game.storyline : STORY_CHAPTERS;
    const unlocked = chapters.slice(0, clamp(state.game.storyIndex + 1, 1, chapters.length));
    const chapterRows = unlocked.map((chapter, index) => `
      <div class="item-row">
        <div>
          <strong>${escapeHtml(chapter.title)}</strong>
          <p>${escapeHtml(chapter.text)}</p>
        </div>
        <span>${index === unlocked.length - 1 ? "Current" : "Read"}</span>
      </div>
    `).join("");
    els.modalContent.innerHTML = `
      <div class="modal-list">${chapterRows}</div>
      <p>Bosses defeated: ${state.game.meta.bossesDefeated}</p>
      <p>NPC talks: ${state.game.meta.npcsTalked}</p>
      <p>Quests completed: ${state.game.meta.questsCompleted}</p>
    `;
  } else if (state.modal === "combatSkill") {
    const player = state.game.player;
    const style = state.modalData?.style || getActiveAttackStyle(player);
    const abilities = getUnlockedAbilitiesForStyle(player, style);
    const rows = abilities.map((ability, index) => `
      <div class="item-row">
        <div>
          <strong>${escapeHtml(ability.name)}</strong>
          <p>Unlock Lv ${ability.level} | Dice ${ability.damageDice.map((die) => `1d${die}`).join(" + ")} | Hit +${ability.hitBonus}${ability.damageKind ? ` | Type ${escapeHtml(ability.damageKind)}` : ""}</p>
        </div>
        <button class="focusable" data-modal-action="combat-use-skill" data-skill-index="${index}">Use</button>
      </div>
    `).join("");
    els.modalTitle.textContent = `${style === "Magic" ? "Spells" : "Skills"} (${style})`;
    els.modalContent.innerHTML = `<div class="modal-list">${rows}</div>`;
  } else if (state.modal === "combatItem") {
    const combatItems = state.game.player.bag.filter((item) => {
      if (item.kind !== "consumable" || item.quantity <= 0) return false;
      const definition = CONSUMABLE_DEFS[item.id];
      return !!definition && (definition.heal || definition.damage || definition.flee || definition.critBuff);
    });
    const rows = combatItems.map((item) => `
      <div class="item-row">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <p>${escapeHtml(item.description)} (x${item.quantity})</p>
        </div>
        <button class="focusable" data-modal-action="combat-use-item" data-item-id="${item.uid}">Use</button>
      </div>
    `).join("");
    els.modalTitle.textContent = "Combat Items";
    els.modalContent.innerHTML = `<div class="modal-list">${rows || "<p>No usable combat items.</p>"}</div>`;
  } else if (state.modal === "interaction") {
    const options = Array.isArray(state.modalData?.options) ? state.modalData.options : [];
    const locationName = state.modalData?.featureName || "Current Tile";
    els.modalTitle.textContent = "Choose Interaction";
    if (!options.length) {
      els.modalContent.innerHTML = "<p>No interactions available.</p>";
    } else {
      const rows = options.map((option) => `
        <div class="item-row">
          <div>
            <strong>${escapeHtml(option.label || "Action")}</strong>
            <p>${escapeHtml(option.description || "")}</p>
          </div>
          <button class="focusable" data-modal-action="choose-interaction" data-interaction-id="${escapeHtml(option.id || "")}">Select</button>
        </div>
      `).join("");
      els.modalContent.innerHTML = `
        <p><strong>Location:</strong> ${escapeHtml(locationName)}</p>
        <div class="modal-list">${rows}</div>
      `;
    }
  } else if (state.modal === "levelup") {
    const player = state.game.player;
    const points = player.unspentStatPoints || 0;
    const review = hasPendingAutoLevelReview() ? state.game.lastAutoLevelUp : null;
    els.modalTitle.textContent = "Level Up";
    if (points <= 0 && !review) {
      els.modalContent.innerHTML = "<p>No unspent stat points.</p>";
    } else {
      const autoState = state.options.autoLevelUp ? "ON" : "OFF";
      const rows = points > 0
        ? ALL_STATS.map((stat) => `
          <div class="item-row">
            <div>
              <strong>${stat}</strong>
              <p>Current ${player.baseStats[stat]} | +${STAT_POINT_INCREASES[stat] || 1} per point</p>
            </div>
            <button class="focusable" data-modal-action="levelup-add-stat" data-stat="${stat}">Add</button>
          </div>
        `).join("")
        : "<p>No manual points currently available. Use Switch To Manual to restore points.</p>";
      const reviewSummary = review?.summary
        ? `<p><strong>Last Auto Allocation:</strong> ${escapeHtml(review.summary)} (Lv ${review.level})</p>`
        : "";
      const reviewActions = review
        ? `<div class="button-row">
            <button class="focusable" data-modal-action="levelup-keep-auto">Keep Auto Result</button>
            <button class="focusable" data-modal-action="levelup-revert-auto">Switch To Manual</button>
          </div>`
        : "";
      els.modalContent.innerHTML = `
        ${reviewSummary}
        <p><strong>Unspent Points:</strong> ${points}</p>
        <p>Auto Level Up option: <strong>${autoState}</strong></p>
        ${points > 0 ? `<div class="button-row"><button class="focusable" data-modal-action="levelup-auto">Auto Allocate All</button></div>` : ""}
        ${reviewActions}
        <div class="modal-list">${rows}</div>
      `;
    }
  } else if (state.modal === "quests") {
    els.modalTitle.textContent = "Quest Board";
    const quests = (state.game.quests || []).slice(-12);
    if (!quests.length) {
      els.modalContent.innerHTML = "<p>No quests available yet.</p>";
    } else {
      const rows = quests.map((quest) => {
        const status = quest.claimed ? "Claimed" : quest.completed ? "Completed" : "Active";
        const reward = [];
        if (quest.reward?.gold) reward.push(`${quest.reward.gold}g`);
        if (quest.reward?.xp) reward.push(`${quest.reward.xp} XP`);
        if (quest.reward?.consumableId) {
          reward.push(`${quest.reward.consumableQty || 1}x ${CONSUMABLE_DEFS[quest.reward.consumableId]?.name || quest.reward.consumableId}`);
        }
        return `
          <div class="item-row">
            <div>
              <strong>[${status}] ${escapeHtml(quest.title)}</strong>
              <p>${escapeHtml(quest.description)}</p>
              <p>Progress ${quest.progress}/${quest.target} | Reward: ${escapeHtml(reward.join(", ") || "None")}</p>
            </div>
            ${quest.completed && !quest.claimed ? `<button class="focusable" data-modal-action="claim-quest" data-quest-id="${quest.id}">Claim</button>` : "<span>-</span>"}
          </div>
        `;
      }).join("");
      els.modalContent.innerHTML = `<div class="modal-list">${rows}</div>`;
    }
  } else if (state.modal === "bestiary") {
    els.modalTitle.textContent = "Bestiary";
    const entries = Object.values(state.game.bestiary || {})
      .sort((a, b) => {
        if ((b.kills || 0) !== (a.kills || 0)) return (b.kills || 0) - (a.kills || 0);
        if ((b.seen || 0) !== (a.seen || 0)) return (b.seen || 0) - (a.seen || 0);
        return String(a.name || "").localeCompare(String(b.name || ""));
      });
    if (!entries.length) {
      els.modalContent.innerHTML = "<p>No creatures logged yet. Enter combat to discover enemies.</p>";
    } else {
      const rows = entries.map((entry) => {
        const weak = entry.knownWeaknesses?.length ? entry.knownWeaknesses.join(", ") : "Unknown";
        const resist = entry.knownResistances?.length ? entry.knownResistances.join(", ") : "Unknown";
        const tested = entry.testedKinds?.length ? entry.testedKinds.join(", ") : "None";
        return `
          <div class="item-row">
            <div>
              <strong>${escapeHtml(entry.name)}${entry.isBossSeen ? " [Boss seen]" : ""}</strong>
              <p>Seen ${entry.seen || 0} | Kills ${entry.kills || 0} | Attack ${escapeHtml(entry.attackType || "Unknown")} | Damage 1d${entry.damageDie || 0}</p>
              <p>Known Weaknesses: ${escapeHtml(weak)}</p>
              <p>Known Resistances: ${escapeHtml(resist)}</p>
              <p>Tested Types: ${escapeHtml(tested)}</p>
            </div>
            <span>${escapeHtml(BIOME_DATA[entry.firstBiome]?.label || "Unknown")}</span>
          </div>
        `;
      }).join("");
      const totalSeen = entries.reduce((sum, entry) => sum + (entry.seen || 0), 0);
      const totalKills = entries.reduce((sum, entry) => sum + (entry.kills || 0), 0);
      els.modalContent.innerHTML = `
        <p>Species logged: ${entries.length} | Total sightings: ${totalSeen} | Total kills: ${totalKills}</p>
        <div class="modal-list">${rows}</div>
      `;
    }
  } else if (state.modal === "shop") {
    const shopFeature = state.modalData?.feature || null;
    els.modalTitle.textContent = shopFeature ? `${shopFeature.name} Shop` : "Shop";
    if (!shopFeature || !shopFeature.hasShop) {
      els.modalContent.innerHTML = "<p>No shop is available here.</p>";
    } else {
      maybeRestockShop(shopFeature);
      const stock = shopFeature.shopStock || [];
      const rows = stock.length ? stock.map((entry) => {
        if (entry.kind === "consumable") {
          const def = CONSUMABLE_DEFS[entry.itemId];
          return `
            <div class="item-row">
              <div>
                <strong>${escapeHtml(def ? def.name : entry.itemId)}</strong>
                <p>${escapeHtml(def ? def.description : "Consumable")} (Stock ${entry.quantity})</p>
              </div>
              <button class="focusable" data-modal-action="buy-shop-item" data-shop-item-id="${entry.id}">Buy ${entry.price}g</button>
            </div>
          `;
        }
        const item = entry.item;
        return `
          <div class="item-row">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <p>${escapeHtml(item.rarity || "Common")} | ${escapeHtml(item.slot)} | Req Lv ${item.levelReq || 1} | ${summarizeModifiers(item.modifiers)}${item.slot === "Weapon" ? ` | ${escapeHtml(summarizeWeaponForUi(item))}` : ""}</p>
            </div>
            <button class="focusable" data-modal-action="buy-shop-item" data-shop-item-id="${entry.id}">Buy ${entry.price}g</button>
          </div>
        `;
      }).join("") : "<p>Shop shelves are currently empty.</p>";
      els.modalContent.innerHTML = `
        <p>Gold: ${state.game.player.gold}</p>
        <div class="modal-list">${rows}</div>
        <div class="button-row">
          <button class="focusable" data-modal-action="sell-loot">Sell Materials + Treasure</button>
        </div>
      `;
    }
  } else if (state.modal === "npc") {
    const title = state.modalData?.speaker ? `Conversation - ${state.modalData.speaker}` : "Town Gossip";
    els.modalTitle.textContent = title;
    const data = state.modalData || { text: "Nobody is around." };
    const rewardText = data.reward ? `<p><strong>Reward:</strong> ${escapeHtml(data.reward)}</p>` : "";
    const questHint = data.questHint ? `<p><strong>Rumor:</strong> ${escapeHtml(data.questHint)}</p>` : "";
    els.modalContent.innerHTML = `<p>${escapeHtml(data.text)}</p>${rewardText}${questHint}`;
  } else if (state.modal === "achievements") {
    els.modalTitle.textContent = "Achievements";
    const unlockedSet = new Set(state.game.achievements);
    const rows = ACHIEVEMENT_DEFS.map((entry) => {
      const unlocked = unlockedSet.has(entry.id);
      return `
        <div class="item-row">
          <div>
            <strong>${unlocked ? "[Unlocked]" : "[Locked]"} ${escapeHtml(entry.name)}</strong>
            <p>${escapeHtml(entry.description)}</p>
          </div>
          <span>${unlocked ? "Done" : "-"}</span>
        </div>
      `;
    }).join("");
    els.modalContent.innerHTML = `<div class="modal-list">${rows}</div>`;
  }

  updateFocusables();
}

function onModalAction(event) {
  const button = event.target.closest("button[data-modal-action]");
  if (!button || !state.game) return;
  const player = state.game.player;
  const action = button.dataset.modalAction;

  if (action === "open-character-section") {
    const target = button.dataset.target;
    if (!target) return;
    if (target === "levelup") {
      if ((player.unspentStatPoints || 0) <= 0 && !hasPendingAutoLevelReview()) {
        addWorldLog("No stat points available.");
        return;
      }
      state.modal = "levelup";
      state.modalData = null;
      renderModal();
      return;
    }
    state.modal = target;
    state.modalData = null;
    renderModal();
    return;
  }

  if (action === "use-item") {
    const uid = button.dataset.itemId;
    const item = player.bag.find((entry) => entry.uid === uid && entry.kind === "consumable");
    if (!item) return;
    const definition = CONSUMABLE_DEFS[item.id];
    if (!definition) return;
    if (definition.heal) {
      if (player.currentHealth >= player.derivedStats.Health) addWorldLog("Health already full.");
      else {
        player.currentHealth = clamp(player.currentHealth + definition.heal, 0, player.derivedStats.Health);
        consumeStack(player, uid);
        state.game.meta.potionsUsed += 1;
        addWorldLog(`${definition.name} used.`);
        playSfx("potion");
      }
    } else if (definition.critBuff) {
      applyPlayerEffect(player, { id: definition.id, name: "Focused", critBonus: definition.critBuff, turns: definition.buffTurns || 3 });
      consumeStack(player, uid);
      addWorldLog(`${definition.name} consumed. Focus increased.`);
      playSfx("buff");
    } else {
      addWorldLog(`${definition.name} can only be used in combat.`);
    }
    renderWorld();
    renderModal();
    return;
  }

  if (action === "combat-use-skill") {
    const player = state.game.player;
    const style = getActiveAttackStyle(player);
    const abilities = getUnlockedAbilitiesForStyle(player, style);
    const index = Number(button.dataset.skillIndex);
    const selected = Number.isFinite(index) ? abilities[index] : null;
    if (!selected) return;
    closeModal();
    resolvePlayerAttack({ kind: "skill", abilityOverride: selected });
    return;
  }

  if (action === "combat-use-item") {
    const uid = button.dataset.itemId;
    if (!uid) return;
    closeModal();
    useCombatItem(uid);
    return;
  }

  if (action === "choose-interaction") {
    const actionId = button.dataset.interactionId;
    if (!actionId) return;
    const world = state.game.world;
    const featureId = state.modalData?.featureId || null;
    const feature = featureId ? world.features.find((entry) => entry.id === featureId) : null;
    closeModal();
    executeWorldInteractionAction(actionId, feature || null);
    return;
  }

  if (action === "levelup-add-stat") {
    const stat = button.dataset.stat;
    allocateStatPoint(stat);
    renderWorld();
    renderModal();
    return;
  }

  if (action === "levelup-auto") {
    const info = applyAutoLevelWithReview(player);
    if (!info?.summary) addWorldLog("No stat points available.");
    else addWorldLog(`Auto-level allocated: ${info.summary}. Choose Keep or Switch To Manual if needed.`);
    renderWorld();
    renderModal();
    return;
  }

  if (action === "levelup-keep-auto") {
    keepAutoLevelAllocation();
    renderWorld();
    renderModal();
    return;
  }

  if (action === "levelup-revert-auto") {
    revertAutoLevelAllocation();
    renderWorld();
    renderModal();
    return;
  }

  if (action === "claim-quest") {
    const questId = button.dataset.questId;
    if (!questId) return;
    claimQuestReward(questId);
    renderWorld();
    renderModal();
    return;
  }

  if (action === "buy-shop-item") {
    const shopId = button.dataset.shopItemId;
    if (!shopId) return;
    buyShopItem(shopId);
    renderWorld();
    renderModal();
    return;
  }

  if (action === "sell-loot") {
    const sold = sellMaterialsAndTreasure();
    if (sold <= 0) addWorldLog("No materials or treasure to sell.");
    else {
      addWorldLog(`Sold gathered loot for ${sold} gold.`);
      playSfx("shop");
    }
    renderWorld();
    renderModal();
    return;
  }

  if (action === "equip-item") {
    const uid = button.dataset.itemId;
    const item = player.bag.find((entry) => entry.uid === uid && entry.kind === "equipment");
    if (!item) return;
    if (player.level < item.levelReq) {
      addWorldLog(`Level ${item.levelReq} required to equip ${item.name}.`);
      renderWorldLog();
      return;
    }
    equipFromBag(player, uid);
    addWorldLog(`Equipped ${item.name}.`);
    renderWorld();
    renderModal();
    return;
  }

  if (action === "unequip-slot") {
    const slot = button.dataset.slot;
    const item = player.equipment[slot];
    if (!slot || !item) return;
    player.equipment[slot] = null;
    addItemToBag(player, item);
    recalculatePlayerStats(player, true);
    addWorldLog(`Unequipped ${item.name}.`);
    renderWorld();
    renderModal();
  }
}

function equipFromBag(player, uid) {
  const index = player.bag.findIndex((entry) => entry.uid === uid && entry.kind === "equipment");
  if (index < 0) return;
  const item = player.bag[index];
  player.bag.splice(index, 1);
  const previous = player.equipment[item.slot];
  player.equipment[item.slot] = item;
  if (previous) addItemToBag(player, previous);
  recalculatePlayerStats(player, true);
}

function addItemToBag(player, item) {
  if (item.kind === "consumable" || item.kind === "material" || item.kind === "treasure") {
    const existing = player.bag.find((entry) => entry.kind === item.kind && entry.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
      return;
    }
  }
  player.bag.push(item);
}

function consumeStack(player, uid) {
  const index = player.bag.findIndex((entry) => entry.uid === uid);
  if (index < 0) return;
  player.bag[index].quantity -= 1;
  if (player.bag[index].quantity <= 0) player.bag.splice(index, 1);
}

function findConsumableStack(player, id) {
  return player.bag.find((item) => item.kind === "consumable" && item.id === id);
}

function addConsumableToBag(player, id, quantity = 1) {
  const definition = CONSUMABLE_DEFS[id];
  if (!definition) return;
  addItemToBag(player, {
    uid: createItemUid(),
    kind: "consumable",
    id: definition.id,
    name: definition.name,
    quantity,
    description: definition.description,
    heal: definition.heal || 0,
    rarity: definition.rarity || "Common",
    flee: !!definition.flee,
    damage: definition.damage || 0,
    die: definition.die || 0,
    critBuff: definition.critBuff || 0,
    buffTurns: definition.buffTurns || 0,
  });
}

function addStackableLoot(player, kind, definition, quantity) {
  addItemToBag(player, {
    uid: createItemUid(),
    kind,
    id: definition.id,
    name: definition.name,
    description: definition.description,
    quantity,
  });
}

function recalculatePlayerStats(player, keepHealthRatio = false) {
  const previousMax = player.derivedStats.Health > 0 ? player.derivedStats.Health : player.baseStats.Health;
  const newStats = copyStats(player.baseStats);
  EQUIPMENT_SLOTS.forEach((slot) => {
    const equipped = player.equipment[slot];
    if (!equipped) return;
    ALL_STATS.forEach((stat) => {
      newStats[stat] += equipped.modifiers[stat] || 0;
    });
  });
  newStats.Health = Math.max(1, Math.floor(newStats.Health));
  ALL_STATS.forEach((stat) => {
    if (stat !== "Health") newStats[stat] = Math.max(0, Math.floor(newStats[stat]));
  });
  player.derivedStats = newStats;
  if (keepHealthRatio && previousMax > 0) {
    const ratio = player.currentHealth / previousMax;
    player.currentHealth = clamp(Math.round(player.derivedStats.Health * ratio), 1, player.derivedStats.Health);
  } else {
    player.currentHealth = clamp(player.currentHealth, 1, player.derivedStats.Health);
  }
}

function createZeroStats() {
  return {
    Health: 0,
    MeleeAttack: 0,
    MeleeDefense: 0,
    RangedAttack: 0,
    RangedDefense: 0,
    MagicAttack: 0,
    MagicDefense: 0,
    CriticalChance: 0,
    Luck: 0,
  };
}

function copyStats(stats) {
  const copy = createZeroStats();
  ALL_STATS.forEach((stat) => {
    copy[stat] = stats[stat] || 0;
  });
  return copy;
}

function createStarterWeapon(template) {
  const chosen = template || getDefaultWeaponForStyle("Melee");
  const attackType = chosen.attackType || "Melee";
  const modifiers = createZeroStats();
  if (attackType === "Melee") modifiers.MeleeAttack = 1;
  if (attackType === "Ranged") modifiers.RangedAttack = 1;
  if (attackType === "Magic") modifiers.MagicAttack = 1;
  return {
    uid: createItemUid(),
    kind: "equipment",
    slot: "Weapon",
    attackType,
    damageDie: chosen.damageDie || 6,
    damageKind: chosen.damageKind || defaultDamageKindForAttackType(attackType),
    speed: getWeaponSpeed(chosen),
    hitBonus: Number.isFinite(chosen.hitBonus) ? chosen.hitBonus : 0,
    critBonus: getWeaponCritBonus(chosen),
    tier: 1,
    rarity: "Common",
    levelReq: 1,
    name: chosen.name || "Rusty Weapon",
    modifiers,
  };
}

function createItemUid() {
  return `itm_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

function generateWorld(seedText) {
  const rng = createRng(hashString(seedText));
  const tiles = [];
  for (let y = 0; y < MAP_HEIGHT; y += 1) {
    const row = [];
    for (let x = 0; x < MAP_WIDTH; x += 1) {
      const roll = rng.next();
      let biome = "plains";
      if (roll < 0.08) biome = "road";
      else if (roll < 0.46) biome = "plains";
      else if (roll < 0.72) biome = "forest";
      else if (roll < 0.89) biome = "swamp";
      else biome = "badlands";
      row.push({ biome });
    }
    tiles.push(row);
  }
  smoothBiomes(tiles);

  const discovered = Array.from({ length: MAP_HEIGHT }, () => Array(MAP_WIDTH).fill(false));
  const features = [];
  const occupied = new Set();
  const majorCities = [];
  const majorCityById = {};

  MAJOR_CITIES.forEach((city, index) => {
    const spot = findPlacementSpot(rng, occupied, tiles);
    const entry = {
      ...city,
      type: "city",
      x: spot.x,
      y: spot.y,
      hasShop: true,
      hasInn: true,
      shopTier: clamp(2 + index, 2, 8),
      shopStock: [],
      lastRestockStep: 0,
    };
    features.push(entry);
    occupied.add(featureKey(spot.x, spot.y));
    majorCities.push(entry);
    majorCityById[entry.id] = entry;
  });

  majorCities.slice().sort((a, b) => a.x - b.x).forEach((city, index, list) => {
    if (index === list.length - 1) return;
    carveRoad(tiles, city.x, city.y, list[index + 1].x, list[index + 1].y);
  });

  const townCount = rng.int(8, 13);
  for (let i = 0; i < townCount; i += 1) {
    const spot = findPlacementSpot(rng, occupied, tiles);
    const townName = `${rng.pick(TOWN_PREFIXES)}${rng.pick(TOWN_SUFFIXES)}`;
    features.push({
      id: `town_${i}`,
      name: townName,
      type: "town",
      x: spot.x,
      y: spot.y,
      hasShop: rng.next() > 0.18,
      hasInn: rng.next() > 0.24,
      shopTier: rng.int(1, 6),
      shopStock: [],
      lastRestockStep: 0,
    });
    occupied.add(featureKey(spot.x, spot.y));
  }

  const dungeonCount = rng.int(9, 14);
  for (let i = 0; i < dungeonCount; i += 1) {
    const spot = findPlacementSpot(rng, occupied, tiles, true);
    const dungeonName = `${rng.pick(DUNGEON_NAMES)} ${i + 1}`;
    features.push({
      id: `dungeon_${i}`,
      name: dungeonName,
      type: "dungeon",
      x: spot.x,
      y: spot.y,
      bossName: rng.pick(BOSS_TITLES),
      bossDefeated: false,
    });
    occupied.add(featureKey(spot.x, spot.y));
  }

  const settlementFeatures = features.filter((feature) => feature.type === "city" || feature.type === "town");
  const npcCount = rng.int(14, 24);
  for (let i = 0; i < npcCount; i += 1) {
    const role = rng.pick(NPC_ROLES);
    const attachToSettlement = rng.next() < 0.65 && settlementFeatures.length > 0;
    const settlement = attachToSettlement ? rng.pick(settlementFeatures) : null;
    const spot = settlement
      ? findNearbyPlacement(rng, occupied, tiles, settlement.x, settlement.y, 5, true)
      : findPlacementSpot(rng, occupied, tiles, true);
    const zone = settlement ? settlement.type : "wild";
    const npcName = `${rng.pick(NPC_NAME_PREFIX)} ${rng.pick(NPC_NAME_SUFFIX)}`;
    features.push({
      id: `npc_${i}`,
      name: npcName,
      type: "npc",
      role,
      zone,
      homeId: settlement ? settlement.id : null,
      x: spot.x,
      y: spot.y,
    });
    occupied.add(featureKey(spot.x, spot.y));
  }

  const dungeonFeatures = features.filter((feature) => feature.type === "dungeon");
  const chestCount = rng.int(18, 28);
  for (let i = 0; i < chestCount; i += 1) {
    const nearDungeon = rng.next() < 0.6 && dungeonFeatures.length > 0;
    const targetDungeon = nearDungeon ? rng.pick(dungeonFeatures) : null;
    const spot = targetDungeon
      ? findNearbyPlacement(rng, occupied, tiles, targetDungeon.x, targetDungeon.y, 7, true)
      : findPlacementSpot(rng, occupied, tiles, true);
    features.push({
      id: `chest_${i}`,
      name: `Travel Chest ${i + 1}`,
      type: "chest",
      x: spot.x,
      y: spot.y,
      opened: false,
    });
    occupied.add(featureKey(spot.x, spot.y));
  }

  const transitionPairs = 2;
  for (let i = 0; i < transitionPairs; i += 1) {
    const label = TRANSITION_NAMES[i % TRANSITION_NAMES.length];
    const pairId = `transition_pair_${i}`;
    const leftSpot = findPlacementSpot(rng, occupied, tiles, true);
    occupied.add(featureKey(leftSpot.x, leftSpot.y));
    const rightSpot = findPlacementSpot(rng, occupied, tiles, true);
    occupied.add(featureKey(rightSpot.x, rightSpot.y));
    features.push({
      id: `${pairId}_a`,
      type: "transition",
      pairId,
      name: `${label} A`,
      x: leftSpot.x,
      y: leftSpot.y,
      targetName: `${label} B`,
    });
    features.push({
      id: `${pairId}_b`,
      type: "transition",
      pairId,
      name: `${label} B`,
      x: rightSpot.x,
      y: rightSpot.y,
      targetName: `${label} A`,
    });
  }

  features.forEach((feature) => {
    if ((feature.type === "city" || feature.type === "town") && feature.hasShop) {
      feature.shopStock = generateShopStock(rng, feature.shopTier || 1, feature.type === "city");
    }
  });

  return {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles,
    discovered,
    features,
    majorCities,
    majorCityById,
    featureLookup: buildFeatureLookup(features),
  };
}

function findNearbyPlacement(rng, occupied, tiles, centerX, centerY, radius = 5, allowHarsh = false) {
  for (let attempts = 0; attempts < 120; attempts += 1) {
    const x = clamp(centerX + rng.int(-radius, radius), 2, MAP_WIDTH - 3);
    const y = clamp(centerY + rng.int(-radius, radius), 2, MAP_HEIGHT - 3);
    const key = featureKey(x, y);
    if (occupied.has(key)) continue;
    if (!allowHarsh && tiles[y][x].biome === "swamp") continue;
    return { x, y };
  }
  return findPlacementSpot(rng, occupied, tiles, allowHarsh);
}

function generateShopStock(rng, tier, cityShop = false) {
  const stock = [];
  const consumablePool = Object.keys(CONSUMABLE_DEFS);
  const consumableEntries = cityShop ? 5 : 3;
  for (let i = 0; i < consumableEntries; i += 1) {
    const itemId = rng.pick(consumablePool);
    stock.push({
      id: createItemUid(),
      kind: "consumable",
      itemId,
      quantity: cityShop ? rng.int(2, 7) : rng.int(1, 5),
      price: Math.floor((SHOP_CONSUMABLE_PRICES[itemId] || 20) * (cityShop ? 1.05 : 1)),
    });
  }

  const gearEntries = cityShop ? 4 : 2;
  for (let i = 0; i < gearEntries; i += 1) {
    const level = clamp((tier - 1) * 10 + rng.int(1, 10), 1, MAX_LEVEL);
    const item = generateEquipmentDrop(level, rng);
    stock.push({
      id: createItemUid(),
      kind: "equipment",
      item,
      quantity: 1,
      price: getShopPriceForEquipment(item),
    });
  }
  return stock;
}

function getShopPriceForEquipment(item) {
  const rarityScale = RARITY_DATA[item.rarity || "Common"]?.modScale || 1;
  const weaponBonus = item.slot === "Weapon" ? 1.35 : 1;
  const dieBonus = item.slot === "Weapon" ? (item.damageDie || 4) * 4 : 0;
  return Math.floor((22 + item.levelReq * 3 + item.tier * 14 + dieBonus) * rarityScale * weaponBonus);
}

function requestMainMenuReturn() {
  if (!state.game || state.screen !== "world") {
    showScreen("menu");
    return;
  }
  const ok = window.confirm("Return to Main Menu? Unsaved progress since your last save may be lost.");
  if (!ok) return;
  closeModal();
  showScreen("menu");
}

function smoothBiomes(tiles) {
  for (let pass = 0; pass < 2; pass += 1) {
    const next = tiles.map((row) => row.map((cell) => ({ ...cell })));
    for (let y = 1; y < MAP_HEIGHT - 1; y += 1) {
      for (let x = 1; x < MAP_WIDTH - 1; x += 1) {
        const counts = { road: 0, plains: 0, forest: 0, swamp: 0, badlands: 0 };
        for (let oy = -1; oy <= 1; oy += 1) {
          for (let ox = -1; ox <= 1; ox += 1) {
            counts[tiles[y + oy][x + ox].biome] += 1;
          }
        }
        let dominant = tiles[y][x].biome;
        let highest = -1;
        Object.keys(counts).forEach((biome) => {
          if (counts[biome] > highest) {
            dominant = biome;
            highest = counts[biome];
          }
        });
        next[y][x].biome = dominant;
      }
    }
    for (let y = 0; y < MAP_HEIGHT; y += 1) {
      for (let x = 0; x < MAP_WIDTH; x += 1) {
        tiles[y][x].biome = next[y][x].biome;
      }
    }
  }
}

function findPlacementSpot(rng, occupied, tiles, allowHarsh = false) {
  for (let attempts = 0; attempts < 700; attempts += 1) {
    const x = rng.int(2, MAP_WIDTH - 3);
    const y = rng.int(2, MAP_HEIGHT - 3);
    const key = featureKey(x, y);
    if (occupied.has(key)) continue;
    if (!allowHarsh && tiles[y][x].biome === "swamp") continue;
    let tooClose = false;
    for (const existing of occupied) {
      const [ex, ey] = existing.split(",").map(Number);
      if (Math.abs(ex - x) + Math.abs(ey - y) < 5) {
        tooClose = true;
        break;
      }
    }
    if (!tooClose) return { x, y };
  }
  return { x: rng.int(2, MAP_WIDTH - 3), y: rng.int(2, MAP_HEIGHT - 3) };
}

function carveRoad(tiles, ax, ay, bx, by) {
  let x = ax;
  let y = ay;
  while (x !== bx || y !== by) {
    tiles[y][x].biome = "road";
    if (x < bx) x += 1;
    else if (x > bx) x -= 1;
    if (y < by) y += 1;
    else if (y > by) y -= 1;
    tiles[y][x].biome = "road";
  }
}

function revealAround(world, x, y, radius) {
  for (let oy = -radius; oy <= radius; oy += 1) {
    for (let ox = -radius; ox <= radius; ox += 1) {
      const nx = x + ox;
      const ny = y + oy;
      if (nx < 0 || ny < 0 || nx >= world.width || ny >= world.height) continue;
      world.discovered[ny][nx] = true;
    }
  }
}

function featureKey(x, y) {
  return `${x},${y}`;
}

function buildFeatureLookup(features) {
  const lookup = {};
  features.forEach((feature) => {
    lookup[featureKey(feature.x, feature.y)] = feature;
  });
  return lookup;
}

function getFeatureAt(world, x, y) {
  return world.featureLookup[featureKey(x, y)] || null;
}

function addWorldLog(message) {
  if (!state.game) return;
  state.game.worldLog.push(message);
  if (state.game.worldLog.length > WORLD_LOG_LIMIT) state.game.worldLog = state.game.worldLog.slice(-WORLD_LOG_LIMIT);
  renderWorldLog();
}

function openShopAtFeature(feature) {
  if (!state.game || !feature || !feature.hasShop) {
    addWorldLog("No shop at this location.");
    return;
  }
  state.modal = "shop";
  state.modalData = { feature };
  els.modalBackdrop.classList.remove("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "false");
  renderModal();
}

function maybeRestockShop(feature) {
  if (!state.game || !feature || !feature.hasShop) return;
  feature.shopStock = feature.shopStock || [];
  if (feature.shopStock.length === 0) {
    feature.shopStock = generateShopStock(state.game.runtimeRng, feature.shopTier || 1, feature.type === "city");
    feature.lastRestockStep = state.game.stepCount;
    return;
  }
  const restockEvery = 120;
  if ((state.game.stepCount - (feature.lastRestockStep || 0)) < restockEvery) return;
  feature.lastRestockStep = state.game.stepCount;
  const rng = state.game.runtimeRng;
  const added = generateShopStock(rng, feature.shopTier || 1, feature.type === "city");
  feature.shopStock = [...feature.shopStock, ...added].slice(-10);
}

function buyShopItem(shopItemId) {
  if (!state.game || !shopItemId) return;
  const player = state.game.player;
  const feature = state.modalData?.feature;
  if (!feature || !feature.hasShop || !feature.shopStock) return;
  const entryIndex = feature.shopStock.findIndex((entry) => entry.id === shopItemId);
  if (entryIndex < 0) return;
  const entry = feature.shopStock[entryIndex];
  if (player.gold < entry.price) {
    addWorldLog("Not enough gold.");
    return;
  }
  player.gold -= entry.price;
  if (entry.kind === "consumable") {
    addConsumableToBag(player, entry.itemId, 1);
    entry.quantity -= 1;
    addWorldLog(`Bought ${CONSUMABLE_DEFS[entry.itemId]?.name || entry.itemId} for ${entry.price} gold.`);
  } else if (entry.kind === "equipment") {
    addItemToBag(player, entry.item);
    entry.quantity = 0;
    addWorldLog(`Bought ${entry.item.name} for ${entry.price} gold.`);
  }
  feature.shopStock = feature.shopStock.filter((stockEntry) => stockEntry.quantity > 0);
  playSfx("shop");
}

function sellMaterialsAndTreasure() {
  if (!state.game) return 0;
  const player = state.game.player;
  let total = 0;
  player.bag = player.bag.filter((item) => {
    if (item.kind === "material") {
      total += item.quantity * 12;
      return false;
    }
    if (item.kind === "treasure") {
      total += item.quantity * 34;
      return false;
    }
    return true;
  });
  if (total > 0) player.gold += total;
  return total;
}

function recoverDroppedGear(feature) {
  if (!state.game || !feature || feature.type !== "grave") return;
  const player = state.game.player;
  const cachedItems = Array.isArray(feature.items) ? feature.items : [];
  const gear = cachedItems.filter((item) => item && item.kind === "equipment");
  if (!gear.length) {
    addWorldLog("The dropped gear cache is empty.");
    removeWorldFeature(feature);
    renderWorld();
    return;
  }

  gear.forEach((item) => {
    item.modifiers = copyStats(item.modifiers || {});
    normalizeWeaponItem(item);
    addItemToBag(player, item);
  });
  addWorldLog(`Recovered ${gear.length} dropped gear item${gear.length === 1 ? "" : "s"} into your inventory.`);
  removeWorldFeature(feature);
  playSfx("chest");
  renderWorld();
}

function removeWorldFeature(feature) {
  if (!state.game || !feature) return;
  const world = state.game.world;
  world.features = world.features.filter((entry) => entry.id !== feature.id);
  const key = featureKey(feature.x, feature.y);
  if (world.featureLookup[key] && world.featureLookup[key].id === feature.id) {
    delete world.featureLookup[key];
  }
}

function openChest(feature) {
  if (!state.game || !feature || feature.type !== "chest") return;
  if (feature.opened) {
    addWorldLog(`${feature.name} is empty.`);
    return;
  }
  const { player, runtimeRng } = state.game;
  feature.opened = true;
  const rewards = [];
  const gold = runtimeRng.int(20, 65) + player.level * 2;
  player.gold += gold;
  state.game.meta.totalGoldFound += gold;
  rewards.push(`${gold} gold`);

  if (runtimeRng.next() < 0.7) {
    const consumableId = runtimeRng.pick(["minor_potion", "greater_potion", "focus_tonic", "smoke_bomb"]);
    const qty = runtimeRng.int(1, 2);
    addConsumableToBag(player, consumableId, qty);
    rewards.push(`${qty}x ${CONSUMABLE_DEFS[consumableId].name}`);
  }
  if (runtimeRng.next() < 0.35) {
    const item = generateEquipmentDrop(player.level + runtimeRng.int(0, 3), runtimeRng);
    addItemToBag(player, item);
    rewards.push(item.name);
  }
  if (runtimeRng.next() < 0.45) {
    const materialId = runtimeRng.pick(Object.keys(MATERIAL_DEFS));
    const qty = runtimeRng.int(1, 3);
    addStackableLoot(player, "material", MATERIAL_DEFS[materialId], qty);
    rewards.push(`${qty}x ${MATERIAL_DEFS[materialId].name}`);
  }

  state.game.meta.chestsOpened += 1;
  updateQuestProgress("chestOpened", { featureId: feature.id });
  addWorldLog(`${feature.name} opened: ${rewards.join(", ")}.`);
  playSfx("chest");
  renderWorld();
}

function useTransition(feature) {
  if (!state.game || !feature || feature.type !== "transition") return;
  const target = state.game.world.features.find((entry) => entry.type === "transition" && entry.pairId === feature.pairId && entry.id !== feature.id);
  if (!target) {
    addWorldLog("This gate is dormant.");
    return;
  }
  state.game.player.position.x = target.x;
  state.game.player.position.y = target.y;
  revealAround(state.game.world, target.x, target.y, 2);
  state.game.stepCount += 1;
  state.game.meta.transitionsUsed += 1;
  updateQuestProgress("transitionUsed", { fromId: feature.id, toId: target.id });
  addWorldLog(`${feature.name} shifts you to ${target.name}.`);
  playSfx("transition");
  renderWorld();
}

function generateDynamicStoryline(world, seedText, startingCity) {
  const rng = createRng(hashString(`${seedText}|storyline`));
  const towns = world.features.filter((feature) => feature.type === "town");
  const dungeons = world.features.filter((feature) => feature.type === "dungeon");
  const transitions = world.features.filter((feature) => feature.type === "transition");
  const npcs = world.features.filter((feature) => feature.type === "npc");
  const threat = rng.pick(["Ash Regent", "Ledger Wyrm", "Mire Sovereign", "Clock Tyrant", "Rift Magistrate"]);
  const relic = rng.pick(["Sunseal", "Night Compass", "Storm Archive", "Silent Crown", "Oath Prism"]);
  const town = towns.length ? rng.pick(towns) : { name: "Hollow Run" };
  const dungeon = dungeons.length ? rng.pick(dungeons) : { name: "Forgotten Cellar" };
  const gate = transitions.length ? rng.pick(transitions) : { name: "Old Gate" };
  const npc = npcs.length ? rng.pick(npcs) : { name: "A tired courier" };
  return [
    {
      title: "Chapter 1 - Clerical Error",
      text: `In ${startingCity.name}, the council accidentally names you Realm Protector while filing tax waivers.`,
    },
    {
      title: `Chapter 2 - Rumors of ${town.name}`,
      text: `${town.name} reports raids linked to the ${relic}. Locals ask you to investigate before trade collapses.`,
    },
    {
      title: "Chapter 3 - Voices on the Road",
      text: `${npc.name} confirms the enemy known as ${threat} is arming camps across nearby routes.`,
    },
    {
      title: `Chapter 4 - The Gate of ${gate.name}`,
      text: `Ancient transition stones awaken. You use ${gate.name} to track supply lines between regions.`,
    },
    {
      title: `Chapter 5 - Siege of ${dungeon.name}`,
      text: `Inside ${dungeon.name}, clues reveal a war chest funding ${threat}'s armies.`,
    },
    {
      title: "Chapter 6 - Oath of the Lazy Hero",
      text: `With quests completed and bosses broken, you forge the ${relic} into a symbol of resistance.`,
    },
    {
      title: "Chapter 7 - Realm Restored",
      text: `The campaign ends with taverns singing your name. Mostly in tune.`,
    },
  ];
}

function generateProceduralQuests(world, seedText) {
  const rng = createRng(hashString(`${seedText}|quests`));
  const quests = [];
  const dungeons = world.features.filter((feature) => feature.type === "dungeon");
  const towns = world.features.filter((feature) => feature.type === "town");
  const transitions = world.features.filter((feature) => feature.type === "transition");
  const biomes = Object.keys(BIOME_DATA);

  const questReward = (goldMin, goldMax, xpMin, xpMax) => ({
    gold: rng.int(goldMin, goldMax),
    xp: rng.int(xpMin, xpMax),
    consumableId: rng.pick(["minor_potion", "greater_potion", "focus_tonic"]),
    consumableQty: rng.int(1, 2),
  });

  const shuffledDungeons = dungeons.slice().sort(() => rng.next() - 0.5);
  shuffledDungeons.slice(0, 2).forEach((dungeon, index) => {
    quests.push({
      id: `quest_clear_${dungeon.id}`,
      type: "clear_dungeon",
      title: `Clear ${dungeon.name}`,
      description: `Defeat the boss in ${dungeon.name}.`,
      featureId: dungeon.id,
      target: 1,
      progress: 0,
      completed: false,
      claimed: false,
      reward: questReward(90 + index * 20, 160 + index * 30, 80 + index * 20, 140 + index * 25),
    });
  });

  const targetBiome = rng.pick(biomes);
  quests.push({
    id: `quest_hunt_${targetBiome}`,
    type: "defeat_biome",
    title: `${BIOME_DATA[targetBiome].label} Sweep`,
    description: `Defeat 5 enemies in the ${BIOME_DATA[targetBiome].label}.`,
    biome: targetBiome,
    target: 5,
    progress: 0,
    completed: false,
    claimed: false,
    reward: questReward(70, 130, 70, 120),
  });

  quests.push({
    id: "quest_talk_network",
    type: "npc_talks",
    title: "Build Local Trust",
    description: "Talk to 4 NPCs in towns, cities, or camps.",
    target: 4,
    progress: 0,
    completed: false,
    claimed: false,
    reward: questReward(60, 110, 60, 110),
  });

  quests.push({
    id: "quest_chest_runner",
    type: "open_chests",
    title: "Chest Runner",
    description: "Open 3 adventure chests across the world.",
    target: 3,
    progress: 0,
    completed: false,
    claimed: false,
    reward: questReward(80, 140, 70, 130),
  });

  if (towns.length > 0) {
    const targetTown = rng.pick(towns);
    quests.push({
      id: `quest_visit_${targetTown.id}`,
      type: "visit_feature",
      title: `Visit ${targetTown.name}`,
      description: `Travel to ${targetTown.name} and report in.`,
      featureId: targetTown.id,
      target: 1,
      progress: 0,
      completed: false,
      claimed: false,
      reward: questReward(50, 95, 55, 95),
    });
  }

  if (transitions.length > 0) {
    quests.push({
      id: "quest_transition_scout",
      type: "use_transition",
      title: "Waygate Scout",
      description: "Use region transitions 2 times.",
      target: 2,
      progress: 0,
      completed: false,
      claimed: false,
      reward: questReward(65, 110, 65, 110),
    });
  }

  return quests.slice(0, 8);
}

function addReplacementQuest() {
  if (!state.game) return;
  const activeQuests = state.game.quests.filter((quest) => !quest.claimed);
  if (activeQuests.length >= 8) return;
  const rng = state.game.runtimeRng;
  const world = state.game.world;
  const pool = [];
  const randomBiome = rng.pick(Object.keys(BIOME_DATA));
  pool.push({
    id: `quest_repeat_hunt_${createItemUid()}`,
    type: "defeat_biome",
    title: `Patrol ${BIOME_DATA[randomBiome].label}`,
    description: `Defeat 4 enemies in the ${BIOME_DATA[randomBiome].label}.`,
    biome: randomBiome,
    target: 4,
    progress: 0,
    completed: false,
    claimed: false,
    reward: { gold: rng.int(60, 120), xp: rng.int(60, 120), consumableId: "greater_potion", consumableQty: 1 },
  });
  pool.push({
    id: `quest_repeat_talk_${createItemUid()}`,
    type: "npc_talks",
    title: "Hear Local Rumors",
    description: "Talk to 3 NPCs.",
    target: 3,
    progress: 0,
    completed: false,
    claimed: false,
    reward: { gold: rng.int(50, 95), xp: rng.int(55, 95), consumableId: "focus_tonic", consumableQty: 1 },
  });
  pool.push({
    id: `quest_repeat_chest_${createItemUid()}`,
    type: "open_chests",
    title: "Treasure Sweep",
    description: "Open 2 chests.",
    target: 2,
    progress: 0,
    completed: false,
    claimed: false,
    reward: { gold: rng.int(65, 120), xp: rng.int(60, 110), consumableId: "smoke_bomb", consumableQty: 1 },
  });
  const availableDungeon = world.features.find((feature) => feature.type === "dungeon" && !feature.bossDefeated);
  if (availableDungeon) {
    pool.push({
      id: `quest_repeat_clear_${createItemUid()}`,
      type: "clear_dungeon",
      title: `Boss Hunt: ${availableDungeon.name}`,
      description: `Defeat the boss in ${availableDungeon.name}.`,
      featureId: availableDungeon.id,
      target: 1,
      progress: 0,
      completed: false,
      claimed: false,
      reward: { gold: rng.int(95, 180), xp: rng.int(90, 170), consumableId: "mega_potion", consumableQty: 1 },
    });
  }
  const quest = rng.pick(pool);
  state.game.quests.push(quest);
  addWorldLog(`New quest posted: ${quest.title}.`);
}

function updateQuestProgress(eventType, payload = {}) {
  if (!state.game || !state.game.quests) return;
  let changed = false;
  let completedNow = false;
  state.game.quests.forEach((quest) => {
    if (quest.claimed || quest.completed) return;
    let delta = 0;

    if (quest.type === "clear_dungeon" && eventType === "bossDefeated" && payload.featureId === quest.featureId) delta = 1;
    if (quest.type === "defeat_biome" && eventType === "enemyDefeated" && payload.biome === quest.biome) delta = 1;
    if (quest.type === "npc_talks" && eventType === "npcTalk") delta = 1;
    if (quest.type === "open_chests" && eventType === "chestOpened") delta = 1;
    if (quest.type === "visit_feature" && eventType === "visitFeature" && payload.feature?.id === quest.featureId) delta = 1;
    if (quest.type === "use_transition" && eventType === "transitionUsed") delta = 1;

    if (delta <= 0) return;
    quest.progress = clamp(quest.progress + delta, 0, quest.target);
    changed = true;
    if (quest.progress >= quest.target) {
      quest.completed = true;
      completedNow = true;
      addWorldLog(`Quest complete: ${quest.title}. Claim reward from Quests.`);
      playSfx("quest");
    }
  });
  if (changed && state.modal === "quests") renderModal();
  if (completedNow && !state.combat && !state.modal && state.screen === "world") {
    openModal("quests");
  }
}

function claimQuestReward(questId) {
  if (!state.game || !questId) return;
  const quest = state.game.quests.find((entry) => entry.id === questId);
  if (!quest || !quest.completed || quest.claimed) return;
  quest.claimed = true;
  const rewardParts = [];
  if (quest.reward?.gold) {
    state.game.player.gold += quest.reward.gold;
    rewardParts.push(`${quest.reward.gold} gold`);
  }
  if (quest.reward?.xp) {
    gainXp(state.game.player, quest.reward.xp);
    rewardParts.push(`${quest.reward.xp} XP`);
  }
  if (quest.reward?.consumableId) {
    addConsumableToBag(state.game.player, quest.reward.consumableId, quest.reward.consumableQty || 1);
    rewardParts.push(`${quest.reward.consumableQty || 1}x ${CONSUMABLE_DEFS[quest.reward.consumableId]?.name || quest.reward.consumableId}`);
  }
  state.game.meta.questsCompleted += 1;
  addWorldLog(`Quest reward claimed: ${quest.title} (${rewardParts.join(", ")}).`);
  playSfx("quest");
  advanceStoryIfNeeded("quest");
  addReplacementQuest();
}

function getQuestRumor() {
  if (!state.game || !state.game.quests) return "";
  const openQuests = state.game.quests.filter((quest) => !quest.completed && !quest.claimed);
  if (!openQuests.length) return "";
  const quest = state.game.runtimeRng.pick(openQuests);
  if (quest.type === "clear_dungeon") return `A bounty is open for ${quest.title}.`;
  if (quest.type === "defeat_biome") return `Hunters need help in the ${BIOME_DATA[quest.biome]?.label || quest.biome}.`;
  if (quest.type === "open_chests") return "Scouts reported old chests hidden off the roads.";
  if (quest.type === "visit_feature") return "A town wants a status report from the roads.";
  if (quest.type === "use_transition") return "The waygates are unstable but rewarding to map.";
  return "The quest board keeps filling faster than anyone expected.";
}

function normalizeQuestList(list) {
  return (list || []).map((quest) => ({
    ...quest,
    target: Math.max(1, Number.isFinite(quest.target) ? quest.target : 1),
    progress: Math.max(0, Number.isFinite(quest.progress) ? quest.progress : 0),
    completed: !!quest.completed,
    claimed: !!quest.claimed,
    reward: quest.reward || { gold: 0, xp: 0 },
  }));
}

function talkToNpc() {
  if (!state.game || state.combat) return;
  const { world, player, runtimeRng } = state.game;
  const feature = getFeatureAt(world, player.position.x, player.position.y);
  const zone = feature?.type === "city" ? "city" : feature?.type === "town" ? "town" : feature?.type === "npc" ? (feature.zone || "wild") : "wild";
  const speaker = feature?.type === "npc" ? feature.name : `${zone[0].toUpperCase()}${zone.slice(1)} Local`;
  const roleLine = feature?.type === "npc" ? runtimeRng.pick(NPC_ROLE_DIALOG[feature.role] || NPC_ROLE_DIALOG.guard) : "";
  const baseLine = runtimeRng.pick(NPC_DIALOG[zone]);
  const text = roleLine ? `${roleLine} ${baseLine}` : baseLine;

  let rewardLine = "";
  const rewardRoll = runtimeRng.next();
  if (rewardRoll < 0.25) {
    const gold = runtimeRng.int(8, 30);
    player.gold += gold;
    state.game.meta.totalGoldFound += gold;
    rewardLine = `${gold} gold`;
  } else if (rewardRoll < 0.5) {
    const drop = runtimeRng.pick(["minor_potion", "greater_potion", "focus_tonic"]);
    addConsumableToBag(player, drop, 1);
    rewardLine = CONSUMABLE_DEFS[drop].name;
  } else if (rewardRoll < 0.57) {
    player.currentHealth = clamp(player.currentHealth + 20, 0, player.derivedStats.Health);
    rewardLine = "20 Health restored";
  }

  state.game.meta.npcsTalked += 1;
  updateQuestProgress("npcTalk", { zone, role: feature?.role || null });
  const questHint = getQuestRumor();
  state.modal = "npc";
  state.modalData = {
    speaker,
    text,
    reward: rewardLine || "No reward this time.",
    questHint,
  };
  addWorldLog(`NPC: ${text}${rewardLine ? ` Reward: ${rewardLine}.` : ""}`);
  playSfx("talk");
  advanceStoryIfNeeded("talk");
  checkAchievements();
  renderWorld();
  els.modalBackdrop.classList.remove("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "false");
  renderModal();
}

function markBossDefeated(featureId) {
  if (!state.game || !featureId) return;
  const feature = state.game.world.features.find((entry) => entry.id === featureId);
  if (feature) feature.bossDefeated = true;
}

function getEnemyScaleFromPlayer(level) {
  const player = state.game?.player;
  if (!player?.derivedStats) return { hp: 1, offense: 1, defense: 1 };

  const { derivedStats } = player;
  const attackAvg = (derivedStats.MeleeAttack + derivedStats.RangedAttack + derivedStats.MagicAttack) / 3;
  const defenseAvg = (derivedStats.MeleeDefense + derivedStats.RangedDefense + derivedStats.MagicDefense) / 3;
  const expectedAttack = 1.7 + level * 0.52;
  const expectedDefense = 1.5 + level * 0.48;
  const expectedHealth = 50 + level * 6;
  const attackRatio = clamp(attackAvg / Math.max(1, expectedAttack), 0.65, 1.4);
  const defenseRatio = clamp(defenseAvg / Math.max(1, expectedDefense), 0.65, 1.4);
  const healthRatio = clamp(derivedStats.Health / Math.max(10, expectedHealth), 0.8, 1.3);

  return {
    hp: clamp(attackRatio * 0.45 + healthRatio * 0.55, 0.78, 1.28),
    offense: clamp(attackRatio * 0.55 + defenseRatio * 0.45, 0.7, 1.3),
    defense: clamp(attackRatio * 0.5 + defenseRatio * 0.5, 0.7, 1.3),
  };
}

function generateEnemy(biome, playerLevel, rng, options = {}) {
  const template = rng.pick(ENEMY_POOLS[biome] || ENEMY_POOLS.plains);
  const difficulty = getDifficulty();
  const level = clamp(playerLevel, 1, MAX_LEVEL);
  const growth = Math.pow(level, 0.88);
  const attackBase = 2.2 + growth * 0.66 + rng.next() * 0.8;
  const defenseBase = 1.8 + growth * 0.62 + rng.next() * 0.7;
  const healthBase = 9 + growth * 2.8 + rng.int(0, 5);
  const playerScale = getEnemyScaleFromPlayer(level);
  const lowLevelHpScale = clamp(0.82 + level * 0.035, 0.82, 1);
  const lowLevelStatScale = clamp(0.74 + level * 0.05, 0.74, 1);
  const bossMult = options.boss ? difficulty.bossBoost : 1;
  const hpScale = template.hpScale || 1;
  const offenseScale = template.offenseScale || 1;
  const defenseScale = template.defenseScale || 1;
  const stats = createZeroStats();
  stats.Health = Math.max(5, Math.floor(healthBase * difficulty.enemyHp * bossMult * hpScale * playerScale.hp * lowLevelHpScale));
  stats.MeleeAttack = Math.max(1, Math.floor(attackBase * difficulty.enemyAttack * bossMult * offenseScale * playerScale.offense * lowLevelStatScale));
  stats.MeleeDefense = Math.max(0, Math.floor(defenseBase * difficulty.enemyDefense * bossMult * defenseScale * playerScale.defense * lowLevelStatScale));
  stats.RangedAttack = Math.max(1, Math.floor(attackBase * difficulty.enemyAttack * bossMult * offenseScale * playerScale.offense * lowLevelStatScale));
  stats.RangedDefense = Math.max(0, Math.floor(defenseBase * difficulty.enemyDefense * bossMult * defenseScale * playerScale.defense * lowLevelStatScale));
  stats.MagicAttack = Math.max(1, Math.floor(attackBase * difficulty.enemyAttack * bossMult * offenseScale * playerScale.offense * lowLevelStatScale));
  stats.MagicDefense = Math.max(0, Math.floor(defenseBase * difficulty.enemyDefense * bossMult * defenseScale * playerScale.defense * lowLevelStatScale));
  stats.CriticalChance = Math.floor((template.crit + Math.floor(level / 12)) * (options.boss ? 1.15 : 1));
  stats.Luck = 4 + Math.floor(level / 10);
  const specialistBonus = Math.max(1, Math.floor(level * 0.26));
  if (template.attackType === "Melee") stats.MeleeAttack += specialistBonus;
  if (template.attackType === "Ranged") stats.RangedAttack += specialistBonus;
  if (template.attackType === "Magic") stats.MagicAttack += specialistBonus;
  const defaultKind = defaultDamageKindForAttackType(template.attackType);
  return {
    speciesId: template.id || toId(template.name),
    speciesName: template.name,
    name: options.name || template.name,
    level,
    attackType: template.attackType,
    damageDie: template.damageDie,
    damageKind: template.damageKind || defaultKind,
    weaknesses: [...(template.weaknesses || [])],
    resistances: [...(template.resistances || [])],
    isBoss: !!options.boss,
    featureId: options.featureId || null,
    stats,
    currentHealth: stats.Health,
  };
}

function saveGame() {
  if (!state.game) return;
  const payload = {
    version: 1,
    savedAt: new Date().toISOString(),
    options: state.options,
    game: serializeGame(state.game),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  addWorldLog("Game saved.");
}

function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return false;
  }
  if (!parsed || !parsed.game) return false;
  state.options = normalizeOptions({ ...state.options, ...(parsed.options || {}) });
  updateOptionsUi();
  applyAudioMixLevels();
  state.game = hydrateGame(parsed.game);
  state.combat = null;
  closeModal();
  renderWorld();
  showScreen("world");
  addWorldLog(`Loaded save from ${parsed.savedAt || "unknown time"}.`);
  checkAchievements();
  if (state.options.musicEnabled) ensureAudioStarted();
  syncMusicForCurrentContext();
  return true;
}

function serializeGame(game) {
  return {
    seed: game.seed,
    difficulty: game.difficulty,
    world: { ...game.world, featureLookup: undefined, majorCityById: undefined },
    player: game.player,
    stepCount: game.stepCount,
    startingCityId: game.startingCityId,
    storyIndex: game.storyIndex,
    storyline: game.storyline,
    quests: game.quests,
    bestiary: game.bestiary,
    worldLog: game.worldLog,
    achievements: game.achievements,
    meta: game.meta,
    pendingLevelUp: !!game.pendingLevelUp,
    pendingLevelUpReview: !!game.pendingLevelUpReview,
    lastAutoLevelUp: game.lastAutoLevelUp ? {
      ...game.lastAutoLevelUp,
      baseStatsBefore: copyStats(game.lastAutoLevelUp.baseStatsBefore || {}),
    } : null,
    dynamic: game.dynamic,
    runtimeRngState: game.runtimeRng.getState(),
  };
}

function hydrateGame(saved) {
  const world = saved.world;
  (world.features || []).forEach((feature, index) => {
    if (feature.type === "dungeon") {
      feature.bossName = feature.bossName || BOSS_TITLES[index % BOSS_TITLES.length];
      feature.bossDefeated = !!feature.bossDefeated;
    } else if (feature.type === "chest") {
      feature.opened = !!feature.opened;
    } else if (feature.type === "npc") {
      feature.role = feature.role || "guard";
      feature.zone = feature.zone || "wild";
    } else if (feature.type === "transition") {
      feature.targetName = feature.targetName || "Unknown Gate";
    } else if (feature.type === "city" || feature.type === "town") {
      feature.hasShop = feature.hasShop !== false;
      feature.hasInn = feature.hasInn !== false;
      feature.shopTier = feature.shopTier || 1;
      feature.shopStock = feature.shopStock || [];
      feature.lastRestockStep = Number.isFinite(feature.lastRestockStep) ? feature.lastRestockStep : 0;
    } else if (feature.type === "grave") {
      feature.items = Array.isArray(feature.items) ? feature.items : [];
      feature.items = feature.items
        .filter((item) => item && item.kind === "equipment")
        .map((item) => {
          item.modifiers = copyStats(item.modifiers || {});
          normalizeWeaponItem(item);
          return item;
        });
    }
  });
  world.featureLookup = buildFeatureLookup(world.features || []);
  world.majorCityById = {};
  (world.majorCities || []).forEach((city) => { world.majorCityById[city.id] = city; });
  const player = saved.player;
  player.baseStats = copyStats(player.baseStats);
  player.derivedStats = copyStats(player.derivedStats || player.baseStats);
  player.activeEffects = player.activeEffects || [];
  player.gold = Number.isFinite(player.gold) ? player.gold : 0;
  player.unspentStatPoints = Number.isFinite(player.unspentStatPoints) ? player.unspentStatPoints : 0;
  EQUIPMENT_SLOTS.forEach((slot) => {
    if (!player.equipment[slot]) return;
    player.equipment[slot].modifiers = copyStats(player.equipment[slot].modifiers || {});
    normalizeWeaponItem(player.equipment[slot]);
  });
  player.bag.forEach((item) => {
    if (item.kind !== "equipment") return;
    item.modifiers = copyStats(item.modifiers || {});
    normalizeWeaponItem(item);
  });
  recalculatePlayerStats(player, true);
  return {
    seed: saved.seed,
    difficulty: saved.difficulty || "Normal",
    world,
    player,
    stepCount: saved.stepCount || 0,
    startingCityId: saved.startingCityId || MAJOR_CITIES[0].id,
    storyIndex: clamp(saved.storyIndex || 0, 0, (saved.storyline?.length || STORY_CHAPTERS.length) - 1),
    storyline: saved.storyline && saved.storyline.length ? saved.storyline : generateDynamicStoryline(world, saved.seed, world.majorCities?.[0] || MAJOR_CITIES[0]),
    quests: normalizeQuestList(saved.quests && saved.quests.length ? saved.quests : generateProceduralQuests(world, saved.seed)),
    bestiary: normalizeBestiary(saved.bestiary),
    worldLog: saved.worldLog || [],
    achievements: saved.achievements || [],
    meta: {
      wins: saved.meta?.wins || 0,
      losses: saved.meta?.losses || 0,
      enemiesDefeated: saved.meta?.enemiesDefeated || 0,
      bossesDefeated: saved.meta?.bossesDefeated || 0,
      npcsTalked: saved.meta?.npcsTalked || 0,
      questsCompleted: saved.meta?.questsCompleted || 0,
      potionsUsed: saved.meta?.potionsUsed || 0,
      chestsOpened: saved.meta?.chestsOpened || 0,
      transitionsUsed: saved.meta?.transitionsUsed || 0,
      tilesDiscovered: saved.meta?.tilesDiscovered || countDiscoveredTiles(world),
      totalGoldFound: saved.meta?.totalGoldFound || 0,
    },
    pendingLevelUp: !!saved.pendingLevelUp || player.unspentStatPoints > 0 || (!!saved.pendingLevelUpReview && !!saved.lastAutoLevelUp),
    pendingLevelUpReview: !!saved.pendingLevelUpReview && !!saved.lastAutoLevelUp,
    lastAutoLevelUp: saved.lastAutoLevelUp ? {
      ...saved.lastAutoLevelUp,
      baseStatsBefore: copyStats(saved.lastAutoLevelUp.baseStatsBefore || {}),
    } : null,
    dynamic: {
      threat: saved.dynamic?.threat || 0,
      lastEventStep: saved.dynamic?.lastEventStep || 0,
    },
    runtimeRng: createRng(saved.runtimeRngState || hashString(`${saved.seed}|runtime`)),
  };
}

function usesFocusNavigation() {
  if (state.modal) return true;
  return ["menu", "intro", "create", "options", "combat"].includes(state.screen);
}

function updateFocusables() {
  if (state.modal) {
    state.focusables = [
      ...els.modalContent.querySelectorAll("button.focusable:not([disabled]):not(.hidden)"),
      els.modalClose,
    ];
  } else {
    if (!usesFocusNavigation()) {
      clearFocusStyles();
      state.focusables = [];
      return;
    }
    const activeScreen = els.screens[state.screen];
    state.focusables = [...activeScreen.querySelectorAll("button.focusable:not([disabled]):not(.hidden)")];
  }
  if (state.focusables.length === 0) {
    clearFocusStyles();
    return;
  }
  state.focusIndex = clamp(state.focusIndex, 0, state.focusables.length - 1);
  applyFocusStyles();
}

function clearFocusStyles() {
  document.querySelectorAll("button.focusable.focused").forEach((button) => button.classList.remove("focused"));
}

function applyFocusStyles() {
  clearFocusStyles();
  const button = state.focusables[state.focusIndex];
  if (!button) return;
  button.classList.add("focused");
  button.scrollIntoView({ block: "nearest" });
}

function moveFocus(delta) {
  if (state.focusables.length === 0) return;
  state.focusIndex = (state.focusIndex + delta + state.focusables.length) % state.focusables.length;
  applyFocusStyles();
}

function activateFocused() {
  const target = state.focusables[state.focusIndex];
  if (target) target.click();
}

function handleBackAction() {
  if (state.modal) return closeModal();
  if (state.screen === "intro" || state.screen === "create" || state.screen === "options") return showScreen("menu");
  if (state.screen === "combat" && state.combat?.result) return endCombatAndReturnToWorld();
  if (state.screen === "world") requestMainMenuReturn();
}

function gamepadLoop(now) {
  if (state.options.gamepadEnabled) pollGamepad(now);
  requestAnimationFrame(gamepadLoop);
}

function pollGamepad(now) {
  const list = navigator.getGamepads ? navigator.getGamepads() : [];
  const pad = list && list[0];
  if (!pad) {
    state.gamepad.previousButtons = [];
    return;
  }

  const pressed = pad.buttons.map((button) => !!button.pressed);
  const edge = (index) => pressed[index] && !state.gamepad.previousButtons[index];
  const axisX = pad.axes[0] || 0;
  const axisY = pad.axes[1] || 0;
  const rightAxisY = pad.axes[3] || 0;
  const controllerActive = pressed.some(Boolean) || Math.abs(axisX) > 0.35 || Math.abs(axisY) > 0.35 || Math.abs(rightAxisY) > 0.35;

  if (controllerActive) setInputMode("controller");
  if (!state.audio.started && controllerActive) ensureAudioStarted();
  handleGamepadScroll(rightAxisY, now);

  if (usesFocusNavigation()) {
    if (state.modal && edge(4) && cycleCharacterModalTab(-1)) {
      state.gamepad.previousButtons = pressed;
      return;
    }
    if (state.modal && edge(5) && cycleCharacterModalTab(1)) {
      state.gamepad.previousButtons = pressed;
      return;
    }
    if (edge(12) || (axisY < -0.55 && now >= state.gamepad.axisYReadyAt)) {
      moveFocus(-1);
      state.gamepad.axisYReadyAt = now + 180;
    } else if (edge(13) || (axisY > 0.55 && now >= state.gamepad.axisYReadyAt)) {
      moveFocus(1);
      state.gamepad.axisYReadyAt = now + 180;
    } else if (edge(14) || (axisX < -0.55 && now >= state.gamepad.axisXReadyAt)) {
      moveFocus(-1);
      state.gamepad.axisXReadyAt = now + 180;
    } else if (edge(15) || (axisX > 0.55 && now >= state.gamepad.axisXReadyAt)) {
      moveFocus(1);
      state.gamepad.axisXReadyAt = now + 180;
    }
    if (edge(0)) activateFocused();
    if (edge(1)) handleBackAction();
    state.gamepad.previousButtons = pressed;
    return;
  }

  if (state.screen === "world" && state.game && !state.modal && !state.combat) {
    if (edge(2)) toggleMapFullscreen();
    if (edge(4)) changeMapZoom(-MAP_ZOOM_STEP);
    if (edge(5)) changeMapZoom(MAP_ZOOM_STEP);
    if (edge(12) || (axisY < -0.55 && now >= state.gamepad.axisYReadyAt)) {
      movePlayer(0, -1);
      state.gamepad.axisYReadyAt = now + 140;
    } else if (edge(13) || (axisY > 0.55 && now >= state.gamepad.axisYReadyAt)) {
      movePlayer(0, 1);
      state.gamepad.axisYReadyAt = now + 140;
    } else if (edge(14) || (axisX < -0.55 && now >= state.gamepad.axisXReadyAt)) {
      movePlayer(-1, 0);
      state.gamepad.axisXReadyAt = now + 140;
    } else if (edge(15) || (axisX > 0.55 && now >= state.gamepad.axisXReadyAt)) {
      movePlayer(1, 0);
      state.gamepad.axisXReadyAt = now + 140;
    }
    if (edge(3)) openCharacterMenu();
    if (edge(0)) handleWorldInteract();
    if (edge(9)) saveGame();
    if (edge(1)) requestMainMenuReturn();
  }
  state.gamepad.previousButtons = pressed;
}

function handleGamepadScroll(axisY, now) {
  if (Math.abs(axisY) < 0.45 || now < state.gamepad.scrollReadyAt) return;
  const target = getActiveScrollableElement();
  if (!target) return;
  const magnitude = Math.max(22, Math.round(Math.abs(axisY) * 52));
  target.scrollTop += axisY > 0 ? magnitude : -magnitude;
  state.gamepad.scrollReadyAt = now + 60;
}

function getActiveScrollableElement() {
  if (state.modal) {
    const modalWindow = document.getElementById("modal-window");
    if (modalWindow && modalWindow.scrollHeight > modalWindow.clientHeight + 2) return modalWindow;
    const modalScrollable = [...els.modalContent.querySelectorAll("*")].find((node) => node.scrollHeight > node.clientHeight + 2);
    if (modalScrollable) return modalScrollable;
  }
  if (state.screen === "world" && els.worldLog && els.worldLog.scrollHeight > els.worldLog.clientHeight + 2) return els.worldLog;
  if (state.screen === "combat" && els.combatLog && els.combatLog.scrollHeight > els.combatLog.clientHeight + 2) return els.combatLog;
  return null;
}

function getDifficulty(key = null) {
  const keyToUse = key || state.game?.difficulty || state.creation.difficulty || "Normal";
  return DIFFICULTY_PRESETS[keyToUse] || DIFFICULTY_PRESETS.Normal;
}

function rollEquipmentRarity(level, rng, isBoss = false) {
  const entries = Object.entries(RARITY_DATA).map(([name, data]) => ({ name, weight: data.weight }));
  const levelBonus = Math.floor(level / 12);
  entries.forEach((entry) => {
    if (entry.name === "Rare") entry.weight += levelBonus;
    if (entry.name === "Epic") entry.weight += Math.floor(levelBonus / 2);
    if (entry.name === "Legendary") entry.weight += Math.floor(levelBonus / 3);
  });
  if (isBoss) {
    entries.forEach((entry) => {
      if (entry.name === "Epic") entry.weight += 4;
      if (entry.name === "Legendary") entry.weight += 2;
    });
  }
  return weightedPick(entries, rng);
}

function rollConsumableDrop(rng, isBoss = false) {
  const table = [
    { id: "minor_potion", weight: 45 },
    { id: "greater_potion", weight: 26 },
    { id: "smoke_bomb", weight: 12 },
    { id: "focus_tonic", weight: 10 },
    { id: "mega_potion", weight: isBoss ? 14 : 5 },
    { id: "fire_bomb", weight: isBoss ? 12 : 4 },
  ];
  return weightedPick(table, rng, "id");
}

function weightedPick(entries, rng, valueKey = "name") {
  let total = 0;
  entries.forEach((entry) => {
    total += entry.weight;
  });
  let roll = rng.next() * total;
  for (const entry of entries) {
    roll -= entry.weight;
    if (roll <= 0) return entry[valueKey];
  }
  return entries[entries.length - 1][valueKey];
}

function chooseBestCombatConsumable(player, hpDeficit) {
  const consumables = player.bag.filter((item) => item.kind === "consumable" && item.quantity > 0);
  if (consumables.length === 0) return null;
  const healthPct = player.currentHealth / player.derivedStats.Health;
  if (healthPct < 0.28) {
    return findConsumableStack(player, "mega_potion")
      || findConsumableStack(player, "greater_potion")
      || findConsumableStack(player, "minor_potion")
      || findConsumableStack(player, "smoke_bomb")
      || consumables[0];
  }
  if (hpDeficit > 36) {
    return findConsumableStack(player, "greater_potion")
      || findConsumableStack(player, "minor_potion")
      || findConsumableStack(player, "focus_tonic")
      || consumables[0];
  }
  if (findConsumableStack(player, "focus_tonic")) return findConsumableStack(player, "focus_tonic");
  if (findConsumableStack(player, "fire_bomb")) return findConsumableStack(player, "fire_bomb");
  return findConsumableStack(player, "minor_potion") || consumables[0];
}

function applyPlayerEffect(player, effect) {
  const existing = player.activeEffects.find((entry) => entry.id === effect.id);
  if (existing) {
    existing.turns = Math.max(existing.turns, effect.turns);
    return;
  }
  player.activeEffects.push({ ...effect });
}

function tickPlayerEffects(player) {
  if (!player.activeEffects.length) return;
  player.activeEffects.forEach((effect) => {
    effect.turns -= 1;
  });
  player.activeEffects = player.activeEffects.filter((effect) => effect.turns > 0);
}

function getPlayerEffectCritBonus(player) {
  return player.activeEffects.reduce((sum, effect) => sum + (effect.critBonus || 0), 0);
}

function advanceStoryIfNeeded(reason) {
  if (!state.game) return;
  const game = state.game;
  const chapters = game.storyline && game.storyline.length ? game.storyline : STORY_CHAPTERS;
  let target = game.storyIndex;
  if ((reason === "talk" || reason === "quest") && game.meta.npcsTalked >= 2) target = Math.max(target, 1);
  if (game.meta.questsCompleted >= 1) target = Math.max(target, 2);
  if (game.meta.bossesDefeated >= 1) target = Math.max(target, 3);
  if ((reason === "quest" || reason === "level") && game.meta.transitionsUsed >= 1 && game.meta.questsCompleted >= 2) target = Math.max(target, 4);
  if ((reason === "boss" || reason === "level") && game.meta.bossesDefeated >= 3 && game.player.level >= 14) target = Math.max(target, 5);
  if (game.meta.bossesDefeated >= 5 && game.meta.questsCompleted >= 4 && game.player.level >= 22) target = Math.max(target, 6);
  target = clamp(target, 0, chapters.length - 1);
  if (target !== game.storyIndex) {
    game.storyIndex = target;
    addWorldLog(`Story advanced: ${chapters[game.storyIndex].title}.`);
  }
}

function checkAchievements() {
  if (!state.game) return;
  const game = state.game;
  const unlocked = new Set(game.achievements);
  const attemptUnlock = (id) => {
    if (unlocked.has(id)) return;
    unlocked.add(id);
    game.achievements.push(id);
    const definition = ACHIEVEMENT_DEFS.find((entry) => entry.id === id);
    addWorldLog(`Achievement unlocked: ${definition ? definition.name : id}.`);
    playSfx("achievement");
  };

  if (game.meta.wins >= 1) attemptUnlock("first_blood");
  if (game.meta.bossesDefeated >= 1) attemptUnlock("boss_hunter");
  if (game.meta.bossesDefeated >= 5) attemptUnlock("boss_breaker");
  if (game.meta.npcsTalked >= 10) attemptUnlock("socialite");
  if (game.player.bag.length >= 20) attemptUnlock("pack_rat");
  if (game.player.level >= 10) attemptUnlock("apprentice");
  if (game.player.level >= 25) attemptUnlock("veteran");
  if (game.player.level >= 50) attemptUnlock("legend");
}

function countDiscoveredTiles(world) {
  let total = 0;
  for (let y = 0; y < world.height; y += 1) {
    for (let x = 0; x < world.width; x += 1) {
      if (world.discovered[y][x]) total += 1;
    }
  }
  return total;
}

function randomSeed() {
  return `seed-${Math.random().toString(36).slice(2, 10)}`;
}

function createRng(seed) {
  let stateValue = (seed >>> 0) || 1;
  return {
    next() {
      stateValue = (stateValue + 0x6d2b79f5) >>> 0;
      let t = stateValue;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
    int(min, max) {
      return Math.floor(this.next() * (max - min + 1)) + min;
    },
    pick(list) {
      return list[Math.floor(this.next() * list.length)];
    },
    getState() {
      return stateValue >>> 0;
    },
  };
}

function hashString(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function rollDie(rng, sides) {
  return rng.int(1, sides);
}

function tierForLevel(level) {
  return clamp(Math.floor((level - 1) / 10) + 1, 1, 10);
}

function getWeaponsForStyle(style) {
  return WEAPON_LIBRARY[style] || WEAPON_LIBRARY.Melee || [];
}

function getDefaultWeaponIdForStyle(style) {
  const styleData = COMBAT_STYLES[style] || COMBAT_STYLES.Melee;
  if (styleData?.defaultWeaponId) return styleData.defaultWeaponId;
  return getWeaponsForStyle(style)[0]?.id || null;
}

function getDefaultWeaponForStyle(style) {
  const id = getDefaultWeaponIdForStyle(style);
  return getWeaponTemplateForStyle(style, id) || getWeaponsForStyle(style)[0] || null;
}

function getWeaponTemplateForStyle(style, weaponId) {
  const list = getWeaponsForStyle(style);
  if (!list.length) return null;
  if (weaponId) {
    const found = list.find((entry) => entry.id === weaponId);
    if (found) return found;
  }
  return list[0];
}

function getDamageKindsForAttackType(attackType) {
  return DAMAGE_KINDS_BY_STYLE[attackType] || DAMAGE_KINDS_BY_STYLE.Melee;
}

function defaultDamageKindForAttackType(attackType) {
  const kinds = getDamageKindsForAttackType(attackType);
  return kinds[0] || "Slash";
}

function inferAttackTypeFromModifiers(item) {
  if (!item?.modifiers) return "Melee";
  const attackValues = [
    { key: "Melee", value: item.modifiers.MeleeAttack || 0 },
    { key: "Ranged", value: item.modifiers.RangedAttack || 0 },
    { key: "Magic", value: item.modifiers.MagicAttack || 0 },
  ];
  attackValues.sort((a, b) => b.value - a.value);
  return attackValues[0].key;
}

function normalizeWeaponItem(item) {
  if (!item || item.slot !== "Weapon") return item;
  item.attackType = item.attackType || inferAttackTypeFromModifiers(item);
  item.damageDie = Number.isFinite(item.damageDie) ? Math.max(2, item.damageDie) : 4;
  item.damageKind = item.damageKind || defaultDamageKindForAttackType(item.attackType);
  item.speed = Number.isFinite(item.speed) ? clamp(Math.floor(item.speed), 1, 10) : 5;
  item.hitBonus = Number.isFinite(item.hitBonus) ? Math.floor(item.hitBonus) : 0;
  item.critBonus = Number.isFinite(item.critBonus) ? Math.floor(item.critBonus) : 0;
  return item;
}

function getWeaponSpeed(weapon) {
  if (!weapon) return 5;
  normalizeWeaponItem(weapon);
  return weapon.speed;
}

function getWeaponCritBonus(weapon) {
  if (!weapon) return 0;
  normalizeWeaponItem(weapon);
  return weapon.critBonus;
}

function getWeaponHitModifier(weapon) {
  if (!weapon) return 0;
  normalizeWeaponItem(weapon);
  const speedBonus = Math.floor((weapon.speed - 5) / 2);
  return weapon.hitBonus + speedBonus;
}

function getWeaponDamageKind(weapon, fallbackAttackType = "Melee") {
  if (!weapon) return defaultDamageKindForAttackType(fallbackAttackType);
  normalizeWeaponItem(weapon);
  return weapon.damageKind;
}

function summarizeWeaponForUi(weapon) {
  if (!weapon) return "None";
  normalizeWeaponItem(weapon);
  const hit = getWeaponHitModifier(weapon);
  const hitText = hit >= 0 ? `+${hit}` : `${hit}`;
  return `1d${weapon.damageDie} ${weapon.attackType} ${weapon.damageKind} SPD ${weapon.speed} HIT ${hitText} CRIT +${weapon.critBonus}`;
}

function getEnemyAffinityResult(enemy, damageKind) {
  if (!damageKind) return { kind: "normal", multiplier: 1 };
  const weaknesses = enemy?.weaknesses || [];
  const resistances = enemy?.resistances || [];
  const weak = weaknesses.includes(damageKind);
  const resist = resistances.includes(damageKind);
  if (weak && !resist) return { kind: "weak", multiplier: enemy?.isBoss ? 1.24 : 1.35 };
  if (resist && !weak) return { kind: "resist", multiplier: enemy?.isBoss ? 0.82 : 0.72 };
  return { kind: "normal", multiplier: 1 };
}

function ensureBestiaryState() {
  if (!state.game) return {};
  if (!state.game.bestiary || typeof state.game.bestiary !== "object") state.game.bestiary = {};
  return state.game.bestiary;
}

function getBestiaryEntry(speciesId) {
  if (!state.game || !speciesId) return null;
  return ensureBestiaryState()[speciesId] || null;
}

function registerBestiaryEncounter(enemy, biome) {
  if (!state.game || !enemy) return { discovered: false, entry: null };
  const bestiary = ensureBestiaryState();
  const speciesId = enemy.speciesId || toId(enemy.speciesName || enemy.name || "unknown_enemy");
  let entry = bestiary[speciesId];
  let discovered = false;
  if (!entry) {
    discovered = true;
    entry = {
      speciesId,
      name: enemy.speciesName || enemy.name,
      attackType: enemy.attackType || "Melee",
      damageDie: enemy.damageDie || 4,
      firstBiome: biome || "plains",
      seen: 0,
      kills: 0,
      knownWeaknesses: [],
      knownResistances: [],
      testedKinds: [],
      isBossSeen: false,
      lastSeenLevel: enemy.level || 1,
    };
    bestiary[speciesId] = entry;
  }
  entry.seen = (entry.seen || 0) + 1;
  entry.lastSeenLevel = Math.max(entry.lastSeenLevel || 1, enemy.level || 1);
  if (enemy.isBoss) entry.isBossSeen = true;
  return { discovered, entry };
}

function recordBestiaryAffinity(enemy, damageKind, resultKind) {
  if (!state.game || !enemy || !damageKind) return;
  const speciesId = enemy.speciesId || toId(enemy.speciesName || enemy.name || "unknown_enemy");
  const entry = getBestiaryEntry(speciesId) || registerBestiaryEncounter(enemy, state.combat?.biome || "plains").entry;
  if (!entry) return;
  entry.testedKinds = uniqueStringList([...(entry.testedKinds || []), damageKind]);
  if (resultKind === "weak") {
    entry.knownWeaknesses = uniqueStringList([...(entry.knownWeaknesses || []), damageKind]);
  } else if (resultKind === "resist") {
    entry.knownResistances = uniqueStringList([...(entry.knownResistances || []), damageKind]);
  }
}

function recordBestiaryKill(enemy) {
  if (!state.game || !enemy) return;
  const speciesId = enemy.speciesId || toId(enemy.speciesName || enemy.name || "unknown_enemy");
  const entry = getBestiaryEntry(speciesId) || registerBestiaryEncounter(enemy, state.combat?.biome || "plains").entry;
  if (!entry) return;
  entry.kills = (entry.kills || 0) + 1;
}

function normalizeBestiary(savedBestiary) {
  const normalized = {};
  Object.entries(savedBestiary || {}).forEach(([speciesId, entry]) => {
    if (!entry || typeof entry !== "object") return;
    normalized[speciesId] = {
      speciesId,
      name: entry.name || speciesId,
      attackType: entry.attackType || "Melee",
      damageDie: Number.isFinite(entry.damageDie) ? entry.damageDie : 4,
      firstBiome: entry.firstBiome || "plains",
      seen: Math.max(0, Number.isFinite(entry.seen) ? entry.seen : 0),
      kills: Math.max(0, Number.isFinite(entry.kills) ? entry.kills : 0),
      knownWeaknesses: uniqueStringList(entry.knownWeaknesses || []),
      knownResistances: uniqueStringList(entry.knownResistances || []),
      testedKinds: uniqueStringList(entry.testedKinds || []),
      isBossSeen: !!entry.isBossSeen,
      lastSeenLevel: Math.max(1, Number.isFinite(entry.lastSeenLevel) ? entry.lastSeenLevel : 1),
    };
  });
  return normalized;
}

function uniqueStringList(values) {
  return [...new Set((values || [])
    .filter((value) => value !== null && value !== undefined)
    .map((value) => String(value))
    .filter((value) => value.length > 0))];
}

function toId(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function summarizeModifiers(mods) {
  const highlights = [];
  if (mods.Health) highlights.push(`HP+${mods.Health}`);
  if (mods.MeleeAttack) highlights.push(`MA+${mods.MeleeAttack}`);
  if (mods.RangedAttack) highlights.push(`RA+${mods.RangedAttack}`);
  if (mods.MagicAttack) highlights.push(`MG+${mods.MagicAttack}`);
  if (mods.CriticalChance) highlights.push(`CR+${mods.CriticalChance}`);
  if (mods.Luck) highlights.push(`LU+${mods.Luck}`);
  return highlights.length ? highlights.join(", ") : "No major bonuses";
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setInputMode(mode) {
  if (!CONTROL_PROMPTS[mode] || state.inputMode === mode) return;
  state.inputMode = mode;
  updateControlPromptUi();
}

function updateControlPromptUi() {
  const prompts = CONTROL_PROMPTS[state.inputMode] || CONTROL_PROMPTS.keyboard;
  if (els.worldInteract) els.worldInteract.textContent = prompts.interact;
  if (els.worldCharacter) els.worldCharacter.textContent = prompts.character;
  if (els.worldShop) els.worldShop.textContent = prompts.shop;
  if (els.worldTalk) els.worldTalk.textContent = prompts.talk;
  if (els.worldSave) els.worldSave.textContent = prompts.save;
  if (els.worldMenu) els.worldMenu.textContent = prompts.menu;
  if (els.worldControlsHint) {
    const modeLabel = state.inputMode === "controller" ? "Controller detected" : "Keyboard detected";
    els.worldControlsHint.textContent = `${modeLabel}. ${prompts.hint}`;
  }
  if (els.worldShortcutsHint) {
    const shoulderHint = state.inputMode === "controller" ? " Use LB/RB to switch character tabs." : "";
    const autoHint = state.options.autoLevelUp ? " Auto-level is ON." : "";
    const debugHint = state.options.debugMode ? " Debug hotkeys: Ctrl+Shift+L/G/H/X." : "";
    const mapHint = ` Map ${state.map.fullscreen ? "fullscreen" : "windowed"} at ${Math.round((state.map.zoom || 1) * 100)}% zoom.`;
    els.worldShortcutsHint.textContent = `Character menu includes Inventory, Equipment, Level Up, Quests, Bestiary, Story, Achievements, and journey stats.${shoulderHint}${mapHint}${autoHint}${debugHint}`;
  }
}

function normalizeOptions(options) {
  const next = { ...(options || {}) };
  next.verboseCombatLog = next.verboseCombatLog !== false;
  next.gamepadEnabled = next.gamepadEnabled !== false;
  next.sfxEnabled = next.sfxEnabled !== false;
  next.musicEnabled = next.musicEnabled !== false;
  next.autoLevelUp = !!next.autoLevelUp;
  next.debugMode = !!next.debugMode;
  const masterVolume = Number(next.masterVolume);
  const musicVolume = Number(next.musicVolume);
  const sfxVolume = Number(next.sfxVolume);
  next.masterVolume = clamp(Number.isFinite(masterVolume) ? masterVolume : 0.8, 0, 1);
  next.musicVolume = clamp(Number.isFinite(musicVolume) ? musicVolume : 0.9, 0, 1);
  next.sfxVolume = clamp(Number.isFinite(sfxVolume) ? sfxVolume : 0.9, 0, 1);
  return next;
}

function updateOptionsUi() {
  state.options = normalizeOptions(state.options);
  if (els.optionCombatLog) els.optionCombatLog.checked = !!state.options.verboseCombatLog;
  if (els.optionControllerVibe) els.optionControllerVibe.checked = !!state.options.gamepadEnabled;
  if (els.optionSfx) els.optionSfx.checked = !!state.options.sfxEnabled;
  if (els.optionMusic) els.optionMusic.checked = !!state.options.musicEnabled;
  if (els.optionAutoLevel) els.optionAutoLevel.checked = !!state.options.autoLevelUp;
  if (els.optionDebug) els.optionDebug.checked = !!state.options.debugMode;
  if (els.optionMasterVolume) els.optionMasterVolume.value = String(Math.round(state.options.masterVolume * 100));
  if (els.optionMusicVolume) els.optionMusicVolume.value = String(Math.round(state.options.musicVolume * 100));
  if (els.optionSfxVolume) els.optionSfxVolume.value = String(Math.round(state.options.sfxVolume * 100));
  if (els.optionMasterVolumeValue) els.optionMasterVolumeValue.textContent = `${Math.round(state.options.masterVolume * 100)}%`;
  if (els.optionMusicVolumeValue) els.optionMusicVolumeValue.textContent = `${Math.round(state.options.musicVolume * 100)}%`;
  if (els.optionSfxVolumeValue) els.optionSfxVolumeValue.textContent = `${Math.round(state.options.sfxVolume * 100)}%`;
}

function applyAudioMixLevels() {
  if (!state.audio.started || !state.audio.context || !state.audio.master || !state.audio.musicBus || !state.audio.sfxBus) return;
  const now = state.audio.context.currentTime;
  const masterTarget = clamp(state.options.masterVolume * 1.35, 0, 1.35);
  const musicTarget = state.options.musicEnabled ? clamp(0.12 + state.options.musicVolume * 1.15, 0, 1.3) : 0;
  const sfxTarget = state.options.sfxEnabled ? clamp(0.12 + state.options.sfxVolume * 1.15, 0, 1.3) : 0;
  state.audio.master.gain.cancelScheduledValues(now);
  state.audio.master.gain.setTargetAtTime(masterTarget, now, 0.02);
  state.audio.musicBus.gain.cancelScheduledValues(now);
  state.audio.musicBus.gain.setTargetAtTime(musicTarget, now, 0.02);
  state.audio.sfxBus.gain.cancelScheduledValues(now);
  state.audio.sfxBus.gain.setTargetAtTime(sfxTarget, now, 0.02);
}

function ensureAudioStarted() {
  if (state.audio.started && state.audio.context) {
    if (state.audio.context.state === "suspended") {
      state.audio.context.resume().catch(() => {});
    }
    applyAudioMixLevels();
    if (state.options.musicEnabled && !state.audio.intervalId) startMusicLoop();
    return;
  }
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return;
  const context = new AudioCtor();
  const master = context.createGain();
  const musicBus = context.createGain();
  const sfxBus = context.createGain();
  master.gain.value = 0.9;
  musicBus.gain.value = 0.9;
  sfxBus.gain.value = 0.9;
  musicBus.connect(master);
  sfxBus.connect(master);
  master.connect(context.destination);
  state.audio.context = context;
  state.audio.master = master;
  state.audio.musicBus = musicBus;
  state.audio.sfxBus = sfxBus;
  state.audio.started = true;
  state.audio.step = 0;
  state.audio.mode = resolveMusicModeForCurrentContext();
  if (context.state === "suspended") {
    context.resume().catch(() => {});
  }
  applyAudioMixLevels();
  if (state.options.musicEnabled) startMusicLoop();
}

function playSfx(type) {
  if (!state.options.sfxEnabled || !state.audio.started || !state.audio.context || !state.audio.sfxBus) return;
  const ctxAudio = state.audio.context;
  const now = ctxAudio.currentTime;
  const normalizedType = type === "damage" ? "hit" : type;
  const pulse = (freq, duration, gain, shape = "triangle", delay = 0) => {
    const oscillator = ctxAudio.createOscillator();
    const node = ctxAudio.createGain();
    oscillator.type = shape;
    oscillator.frequency.setValueAtTime(freq, now + delay);
    node.gain.setValueAtTime(0, now + delay);
    node.gain.linearRampToValueAtTime(gain, now + delay + 0.01);
    node.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);
    oscillator.connect(node);
    node.connect(state.audio.sfxBus);
    oscillator.start(now + delay);
    oscillator.stop(now + delay + duration + 0.03);
  };
  const noiseBurst = (duration, gain, delay = 0, highpass = 450) => {
    const length = Math.max(1, Math.floor(ctxAudio.sampleRate * duration));
    const buffer = ctxAudio.createBuffer(1, length, ctxAudio.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      channel[i] = Math.random() * 2 - 1;
    }
    const source = ctxAudio.createBufferSource();
    const filter = ctxAudio.createBiquadFilter();
    const node = ctxAudio.createGain();
    source.buffer = buffer;
    filter.type = "highpass";
    filter.frequency.setValueAtTime(highpass, now + delay);
    node.gain.setValueAtTime(0.0001, now + delay);
    node.gain.linearRampToValueAtTime(gain, now + delay + 0.01);
    node.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
    source.connect(filter);
    filter.connect(node);
    node.connect(state.audio.sfxBus);
    source.start(now + delay);
    source.stop(now + delay + duration + 0.03);
  };

  if (normalizedType === "click") pulse(440, 0.08, 0.05, "square");
  else if (normalizedType === "move") pulse(220, 0.05, 0.04, "triangle");
  else if (normalizedType === "encounter") {
    pulse(156, 0.3, 0.09, "sawtooth");
    pulse(208, 0.28, 0.06, "square", 0.09);
    noiseBurst(0.12, 0.04, 0.02, 600);
  } else if (normalizedType === "boss") {
    pulse(120, 0.42, 0.1, "sawtooth");
    pulse(86, 0.45, 0.09, "triangle", 0.1);
    noiseBurst(0.2, 0.05, 0.04, 550);
  } else if (normalizedType === "hit") {
    pulse(260, 0.08, 0.075, "square");
    noiseBurst(0.07, 0.03, 0, 780);
  } else if (normalizedType === "crit") {
    pulse(520, 0.12, 0.09, "sawtooth");
    pulse(740, 0.1, 0.06, "triangle", 0.05);
  } else if (normalizedType === "potion") {
    pulse(500, 0.12, 0.06, "triangle");
    pulse(700, 0.12, 0.05, "triangle", 0.08);
  } else if (normalizedType === "bomb") {
    pulse(140, 0.2, 0.09, "square");
    pulse(100, 0.25, 0.07, "sawtooth", 0.1);
    noiseBurst(0.16, 0.05, 0.02, 500);
  } else if (normalizedType === "buff") {
    pulse(650, 0.15, 0.06, "sine");
    pulse(870, 0.14, 0.05, "sine", 0.08);
  } else if (normalizedType === "flee") {
    pulse(340, 0.08, 0.05, "triangle");
    pulse(290, 0.08, 0.04, "triangle", 0.08);
  } else if (normalizedType === "victory") {
    pulse(440, 0.12, 0.07, "triangle");
    pulse(550, 0.12, 0.07, "triangle", 0.1);
    pulse(660, 0.16, 0.08, "triangle", 0.2);
  } else if (normalizedType === "bossWin") {
    pulse(392, 0.16, 0.08, "triangle");
    pulse(523, 0.16, 0.08, "triangle", 0.14);
    pulse(659, 0.2, 0.09, "triangle", 0.3);
  } else if (normalizedType === "fanfare") {
    pulse(523, 0.14, 0.09, "triangle");
    pulse(659, 0.14, 0.08, "triangle", 0.12);
    pulse(784, 0.18, 0.1, "triangle", 0.24);
    pulse(988, 0.22, 0.08, "sine", 0.42);
  } else if (normalizedType === "defeat") {
    pulse(220, 0.24, 0.08, "sawtooth");
    pulse(175, 0.28, 0.07, "sawtooth", 0.16);
    noiseBurst(0.14, 0.03, 0.04, 700);
  } else if (normalizedType === "achievement") {
    pulse(780, 0.15, 0.08, "sine");
    pulse(1040, 0.2, 0.07, "sine", 0.08);
  } else if (normalizedType === "talk") {
    pulse(360, 0.06, 0.05, "triangle");
    pulse(420, 0.06, 0.04, "triangle", 0.05);
  } else if (normalizedType === "chest") {
    pulse(280, 0.1, 0.06, "triangle");
    pulse(640, 0.14, 0.07, "sine", 0.08);
  } else if (normalizedType === "shop") {
    pulse(520, 0.09, 0.05, "sine");
    pulse(740, 0.08, 0.05, "sine", 0.07);
  } else if (normalizedType === "transition") {
    pulse(300, 0.2, 0.07, "sine");
    pulse(900, 0.22, 0.05, "triangle", 0.08);
  } else if (normalizedType === "quest") {
    pulse(600, 0.12, 0.07, "sine");
    pulse(820, 0.12, 0.06, "sine", 0.1);
    pulse(1020, 0.14, 0.05, "sine", 0.2);
  }
}

function startMusicLoop() {
  if (!state.audio.started || !state.audio.context || !state.audio.musicBus) return;
  if (state.audio.intervalId) return;
  const ctxAudio = state.audio.context;
  const theme = MUSIC_THEMES[state.audio.mode] || MUSIC_THEMES.world;
  state.audio.step = 0;
  state.audio.intervalId = window.setInterval(() => {
    if (!state.options.musicEnabled || !state.audio.started || !state.audio.context || !state.audio.musicBus) return;
    const now = ctxAudio.currentTime;
    const activeTheme = MUSIC_THEMES[state.audio.mode] || MUSIC_THEMES.world;
    const step = state.audio.step;
    const bass = activeTheme.bass[step % activeTheme.bass.length];
    const chord = activeTheme.chords[step % activeTheme.chords.length];
    const melody = activeTheme.melody[step % activeTheme.melody.length];
    const counter = activeTheme.counter ? activeTheme.counter[step % activeTheme.counter.length] : null;
    const percussion = activeTheme.percussionPattern ? activeTheme.percussionPattern[step % activeTheme.percussionPattern.length] : "none";
    const stepDuration = activeTheme.stepMs / 1000;
    const bassGain = activeTheme.bassGain || 0.1;
    const chordGain = activeTheme.chordGain || 0.055;
    const melodyGain = activeTheme.melodyGain || 0.085;
    const counterGain = activeTheme.counterGain || 0.04;
    const percussionGain = activeTheme.percussionGain || 0.03;

    playMusicTone(bass, now, stepDuration * 0.92, bassGain, activeTheme.bassWave);
    chord.forEach((freq, idx) => {
      playMusicTone(freq, now + idx * 0.004, stepDuration * 0.86, Math.max(0.018, chordGain - idx * 0.008), activeTheme.chordWave);
    });
    if (melody && (state.audio.mode !== "world" || step % 2 === 0)) {
      playMusicTone(melody, now + 0.03, stepDuration * 0.56, melodyGain, activeTheme.melodyWave);
    }
    if (counter && (state.audio.mode !== "world" || step % 2 === 1)) {
      playMusicTone(counter, now + stepDuration * 0.32, stepDuration * 0.42, counterGain, activeTheme.counterWave || "sine");
    }
    if (percussion && percussion !== "none") {
      playMusicPercussion(percussion, now, stepDuration, percussionGain);
    }
    state.audio.step += 1;
  }, theme.stepMs);
}

function stopMusicLoop() {
  clearVictoryMusicTimer();
  if (!state.audio.intervalId) return;
  window.clearInterval(state.audio.intervalId);
  state.audio.intervalId = null;
}

function playMusicTone(freq, startAt, duration, gainValue, wave = "sine") {
  if (!state.audio.context || !state.audio.musicBus || !freq) return;
  const osc = state.audio.context.createOscillator();
  const gain = state.audio.context.createGain();
  osc.type = wave;
  osc.frequency.setValueAtTime(freq, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.linearRampToValueAtTime(gainValue, startAt + Math.min(0.04, duration * 0.35));
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  osc.connect(gain);
  gain.connect(state.audio.musicBus);
  osc.start(startAt);
  osc.stop(startAt + duration + 0.02);
}

function playMusicPercussion(kind, startAt, stepDuration, baseGain) {
  if (!state.audio.context || !state.audio.musicBus) return;
  const ctxAudio = state.audio.context;
  if (kind === "kick") {
    playMusicTone(62, startAt, Math.min(0.18, stepDuration * 0.44), baseGain * 1.9, "sine");
    playMusicTone(44, startAt + 0.01, Math.min(0.16, stepDuration * 0.38), baseGain * 1.2, "triangle");
    return;
  }
  const length = Math.max(1, Math.floor(ctxAudio.sampleRate * Math.min(0.14, stepDuration * 0.36)));
  const buffer = ctxAudio.createBuffer(1, length, ctxAudio.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    channel[i] = Math.random() * 2 - 1;
  }
  const source = ctxAudio.createBufferSource();
  const filter = ctxAudio.createBiquadFilter();
  const gain = ctxAudio.createGain();
  source.buffer = buffer;
  if (kind === "snare") {
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1800, startAt);
    gain.gain.setValueAtTime(baseGain * 1.5, startAt);
  } else {
    filter.type = "highpass";
    filter.frequency.setValueAtTime(5000, startAt);
    gain.gain.setValueAtTime(baseGain * 0.95, startAt);
  }
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + Math.min(0.12, stepDuration * 0.32));
  source.connect(filter);
  filter.connect(gain);
  gain.connect(state.audio.musicBus);
  source.start(startAt);
  source.stop(startAt + Math.min(0.16, stepDuration * 0.38));
}

function resolveWorldMusicMode() {
  if (!state.game || !state.game.world || !state.game.player) return "world";
  const { world, player } = state.game;
  const feature = getFeatureAt(world, player.position.x, player.position.y);
  const tile = world.tiles[player.position.y]?.[player.position.x];
  if (feature?.type === "dungeon") return "worldDungeon";
  if (feature?.type === "city" || feature?.type === "town") return "worldTown";
  if (!tile) return "world";
  if (tile.biome === "forest") return "worldForest";
  if (tile.biome === "swamp") return "worldSwamp";
  if (tile.biome === "badlands") return "worldBadlands";
  return "world";
}

function resolveMusicModeForCurrentContext() {
  if (state.screen === "combat") return "combat";
  if (state.screen === "world") return resolveWorldMusicMode();
  return "menu";
}

function syncMusicForCurrentContext() {
  if (state.audio.victoryTimeoutId && state.audio.mode === "victory") return;
  const mode = resolveMusicModeForCurrentContext();
  setMusicMode(mode);
  if (state.options.musicEnabled && state.audio.started && !state.audio.intervalId) startMusicLoop();
}

function setMusicMode(mode) {
  const nextMode = MUSIC_THEMES[mode] ? mode : "menu";
  if (state.audio.mode === nextMode) return;
  state.audio.mode = nextMode;
  state.audio.step = 0;
  if (state.audio.started && state.options.musicEnabled) {
    stopMusicLoop();
    startMusicLoop();
  }
}

function triggerVictoryFanfare(isBoss) {
  playSfx("fanfare");
  if (!state.audio.started || !state.options.musicEnabled) return;
  setMusicMode("victory");
  clearVictoryMusicTimer();
  const duration = isBoss ? 4600 : 3300;
  state.audio.victoryTimeoutId = window.setTimeout(() => {
    state.audio.victoryTimeoutId = null;
    const nextMode = state.combat && !state.combat.result ? "combat" : resolveWorldMusicMode();
    setMusicMode(nextMode);
  }, duration);
}

function clearVictoryMusicTimer() {
  if (!state.audio.victoryTimeoutId) return;
  window.clearTimeout(state.audio.victoryTimeoutId);
  state.audio.victoryTimeoutId = null;
}
