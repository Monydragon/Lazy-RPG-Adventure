const STORAGE_KEY = "lazy-rpg-adventure-save-v1";
const SAVE_SLOT_INDEX_KEY = "lazy-rpg-adventure-save-slots-v2";
const SAVE_SLOT_KEY_PREFIX = "lazy-rpg-adventure-save-slot-v2:";
const MAX_LEVEL = 100;
const MAP_WIDTH = 80;
const MAP_HEIGHT = 60;
const TILE_SIZE = 24;
const VIEW_TILES_X = 28;
const VIEW_TILES_Y = 18;
const FULLSCREEN_VIEW_TILES_X = 44;
const FULLSCREEN_VIEW_TILES_Y = 28;
const PORTRAIT_VIEW_TILES_X = 18;
const PORTRAIT_VIEW_TILES_Y = 30;
const PORTRAIT_FULLSCREEN_VIEW_TILES_X = 24;
const PORTRAIT_FULLSCREEN_VIEW_TILES_Y = 40;
const WORLD_LOG_LIMIT = 16;
const COMBAT_LOG_LIMIT = 16;
const MAP_ZOOM_MIN = 0.35;
const MAP_ZOOM_MAX = 4.2;
const MAP_ZOOM_STEP = 0.25;
const DEFAULT_MAP_ZOOM = 3.2;
const WEAPON_MASTERY_REQUIREMENT_MULTIPLIER = 5;
const GATHERING_BIOME_TUNING = {
  road: { zoneWidth: 0.28, speed: 0.92 },
  plains: { zoneWidth: 0.26, speed: 1 },
  forest: { zoneWidth: 0.23, speed: 1.08 },
  swamp: { zoneWidth: 0.2, speed: 1.16 },
  badlands: { zoneWidth: 0.18, speed: 1.24 },
};
const GATHERING_RESOURCE_TUNING = {
  tree: { zoneWidth: 1.08, speed: 0.94, prompt: "Chop on the clean grain." },
  herb: { zoneWidth: 1.12, speed: 0.98, prompt: "Pluck cleanly without bruising the patch." },
  ore: { zoneWidth: 0.9, speed: 1.08, prompt: "Strike the fracture line." },
  crystal: { zoneWidth: 0.84, speed: 1.12, prompt: "Crack the seam before the crystal splinters." },
  hide: { zoneWidth: 0.98, speed: 1, prompt: "Harvest the leafhide where the bark peels cleanly." },
  fishing: { zoneWidth: 1, speed: 1.02, prompt: "Set the hook on the strongest bite." },
  tidepool: { zoneWidth: 1.06, speed: 0.98, prompt: "Sweep the net when the school turns toward shore." },
};
const GATHERING_TIMING_TIERS = {
  miss: { key: "miss", name: "Miss", quantityScale: 0.72, xpScale: 0.68, chanceBonus: -0.08, flatBonus: 0, guaranteedPrimary: 1, color: "#d57a7a", score: 0.35 },
  good: { key: "good", name: "Good", quantityScale: 1.02, xpScale: 1, chanceBonus: 0.02, flatBonus: 0, guaranteedPrimary: 1, color: "#9eb0c8", score: 1 },
  great: { key: "great", name: "Great", quantityScale: 1.34, xpScale: 1.18, chanceBonus: 0.1, flatBonus: 0, guaranteedPrimary: 1, color: "#7bcf94", score: 1.45 },
  perfect: { key: "perfect", name: "Perfect", quantityScale: 1.72, xpScale: 1.42, chanceBonus: 0.18, flatBonus: 1, guaranteedPrimary: 1, color: "#f4b942", score: 1.95 },
};

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

function weaponTemplate(id, name, attackType, weaponFamily, damageDie, speed, damageKind, hitBonus, critBonus, summary) {
  return {
    id,
    name,
    slot: "Weapon",
    attackType,
    weaponFamily,
    damageDie,
    speed,
    damageKind,
    hitBonus,
    critBonus,
    summary,
  };
}

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
const DEBUG_CRAFTING_AREA_ID = "DEBUG_CRAFTING";
const DEBUG_CRAFTING_RESOURCE_LEVELS = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const DEBUG_CRAFTING_RESOURCE_KINDS = ["tree", "herb", "hide", "ore", "crystal", "fishing", "tidepool"];
const GATHERING_PROGRESS_LEVELS = DEBUG_CRAFTING_RESOURCE_LEVELS;
const CRAFTING_SITE_NAMES = {
  Clothier: ["Needle Camp", "Threadline Canopy", "Pattern Tent"],
  Smithing: ["Field Forge", "Ember Anvil", "Coalbreak Stand"],
  Woodworking: ["Fletcher Camp", "Bentwood Bench", "Shaper's Rack"],
  Cooking: ["Camp Kitchen", "Provision Stove", "Stew Line"],
  Leatherworking: ["Hidebinder Stand", "Stitch Rack", "Travel Tannery"],
  Alchemy: ["Reagent Shelter", "Alembic Cart", "Distiller Camp"],
  Jewelcrafting: ["Gemsetter Table", "Facet Lamp", "Stonebench"],
};
const CRAFTING_SITE_BIOMES = {
  Clothier: ["plains", "forest", "road"],
  Smithing: ["badlands", "road", "plains"],
  Woodworking: ["forest", "plains"],
  Cooking: ["road", "plains", "swamp"],
  Leatherworking: ["forest", "plains", "swamp"],
  Alchemy: ["swamp", "forest", "road"],
  Jewelcrafting: ["badlands", "road", "forest"],
};
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
  trail_skewers: 22,
  greater_potion: 38,
  smoked_filet: 44,
  mega_potion: 94,
  smoke_bomb: 42,
  fire_bomb: 70,
  focus_tonic: 62,
  hearty_stew: 34,
  anglers_stew: 56,
  battle_broth: 88,
  hero_feast: 144,
  prime_elixir: 230,
  volatile_flask: 152,
  precision_elixir: 132,
  trail_repel: 30,
  strong_repel: 76,
  grand_repel: 160,
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

const DEFAULT_WEAPON_FAMILY_BY_STYLE = {
  Melee: "sword",
  Ranged: "bow",
  Magic: "wand",
};

const WEAPON_FAMILY_DEFS = {
  dagger: { name: "Dagger", style: "Melee", discipline: "Rogue", strengths: "Fast crit chains and precise piercing.", weaknesses: "Lower reach and lighter base impact." },
  sword: { name: "Sword", style: "Melee", discipline: "Swordmaster", strengths: "Balanced slashing combos and all-around control.", weaknesses: "Less specialized than hammers or polearms." },
  axe: { name: "Axe", style: "Melee", discipline: "Marauder", strengths: "Heavy cleaves and armor-breaking pressure.", weaknesses: "Lower accuracy and slower recovery." },
  hammer: { name: "Hammer/Mace", style: "Melee", discipline: "Breaker", strengths: "Crushing blunt damage and strong anti-armor hits.", weaknesses: "Slow tempo against nimble foes." },
  flail: { name: "Flail", style: "Melee", discipline: "Chainwarden", strengths: "Mixed blunt and piercing coverage with tricky angles.", weaknesses: "Less stable timing than straight blades." },
  spear: { name: "Spear", style: "Melee", discipline: "Lancer", strengths: "Reach, accuracy, and precise piercing pressure.", weaknesses: "Less effective when enemies shrug off pierce." },
  polearm: { name: "Polearm", style: "Melee", discipline: "Dragoon", strengths: "Wide sweeps and long reach.", weaknesses: "Heavier commitment per swing." },
  quarterstaff: { name: "Quarterstaff", style: "Melee", discipline: "Staff Adept", strengths: "Quick blunt chains and safe control patterns.", weaknesses: "Lower burst than the heaviest melee arms." },
  bow: { name: "Bow", style: "Ranged", discipline: "Archer", strengths: "Accurate sustained fire and strong piercing pressure.", weaknesses: "Less burst than crossbows." },
  crossbow: { name: "Crossbow", style: "Ranged", discipline: "Marksman", strengths: "Heavy bolts and excellent single-hit burst.", weaknesses: "Slower reload cycle." },
  thrown: { name: "Thrown", style: "Ranged", discipline: "Skirmisher", strengths: "Flexible damage types and high crit pressure.", weaknesses: "Lower base power than dedicated launchers." },
  sling: { name: "Sling", style: "Ranged", discipline: "Stonecaller", strengths: "Reliable blunt ranged damage and control shots.", weaknesses: "Lower piercing access." },
  wand: { name: "Wand", style: "Magic", discipline: "Arcanist", strengths: "Fast precise casting and strong arcane crit chains.", weaknesses: "Lighter base spell impact." },
  magic_staff: { name: "Staff", style: "Magic", discipline: "Invoker", strengths: "Stable channels and heavy ritual spell scaling.", weaknesses: "Slower wind-up than wands or foci." },
  rod: { name: "Rod", style: "Magic", discipline: "Elementalist", strengths: "Direct elemental damage and clear weakness coverage.", weaknesses: "Can stall when the element is resisted." },
  tome: { name: "Tome", style: "Magic", discipline: "Runesage", strengths: "Layered prepared spells and flexible elements.", weaknesses: "More setup-heavy than fast catalysts." },
  focus: { name: "Focus", style: "Magic", discipline: "Stormcaller", strengths: "Quick multi-hit casting and precise lightning or wind pressure.", weaknesses: "Lower single-hit force than staves or scepters." },
  scepter: { name: "Scepter", style: "Magic", discipline: "Geomancer", strengths: "Heavy earth and water force with crushing finishes.", weaknesses: "Slow tempo and lower crit reliability." },
  orb: { name: "Orb", style: "Magic", discipline: "Voidbinder", strengths: "Versatile spell rotation and high ceiling finishers.", weaknesses: "Less straightforward than rods or wands." },
};
const WEAPON_FAMILY_ORDER = Object.keys(WEAPON_FAMILY_DEFS);

const WEAPON_LIBRARY = {
  Melee: [
    weaponTemplate("melee_dagger", "Dagger", "Melee", "dagger", 4, 9, "Pierce", 2, 4, "Very fast and precise. Lower base damage, strong crit pressure."),
    weaponTemplate("melee_stiletto", "Stiletto", "Melee", "dagger", 5, 9, "Pierce", 3, 4, "Needle-thin duelist blade built to pierce weak points."),
    weaponTemplate("melee_short_sword", "Short Sword", "Melee", "sword", 6, 7, "Slash", 1, 2, "Balanced starter blade with reliable tempo."),
    weaponTemplate("melee_longsword", "Longsword", "Melee", "sword", 8, 6, "Slash", 0, 1, "Solid reach and damage, slower than light swords."),
    weaponTemplate("melee_rapier", "Rapier", "Melee", "sword", 7, 8, "Pierce", 2, 3, "Fencing blade with strong hit rate and dueling crits."),
    weaponTemplate("melee_scimitar", "Scimitar", "Melee", "sword", 7, 8, "Slash", 1, 3, "Curved blade that favors fast slashing strings."),
    weaponTemplate("melee_greatsword", "2H Sword", "Melee", "sword", 10, 4, "Slash", 0, 2, "Heavy hits with slower swings and lower accuracy."),
    weaponTemplate("melee_falchion", "Falchion", "Melee", "sword", 9, 5, "Slash", 0, 3, "Wide slashes with high crit finish potential."),
    weaponTemplate("melee_battleaxe", "Battleaxe", "Melee", "axe", 9, 5, "Slash", 0, 2, "Brutal chopping axe that rewards committed swings."),
    weaponTemplate("melee_greataxe", "Greataxe", "Melee", "axe", 11, 3, "Slash", -1, 3, "Massive cleaver with huge hits and risky timing."),
    weaponTemplate("melee_club", "Club", "Melee", "hammer", 6, 7, "Blunt", 1, 0, "Simple blunt weapon that batters fragile targets."),
    weaponTemplate("melee_mace", "Mace", "Melee", "hammer", 7, 6, "Blunt", 1, 1, "Steady crushing strikes tuned for armored enemies."),
    weaponTemplate("melee_warhammer", "Warhammer", "Melee", "hammer", 9, 4, "Blunt", 0, 2, "Heavy blunt force with excellent stagger potential."),
    weaponTemplate("melee_maul", "Maul", "Melee", "hammer", 11, 3, "Blunt", -1, 2, "Two-handed crusher built for devastating impact."),
    weaponTemplate("melee_flail", "Flail", "Melee", "flail", 8, 5, "Blunt", 1, 1, "Crushing blunt strikes. Excellent into armored targets."),
    weaponTemplate("melee_morningstar", "Morningstar", "Melee", "flail", 8, 5, "Pierce", 0, 2, "Spiked head trades smoother arcs for nastier punctures."),
    weaponTemplate("melee_spear", "Spear", "Melee", "spear", 7, 7, "Pierce", 1, 1, "Reach-focused thrusting weapon with strong accuracy."),
    weaponTemplate("melee_trident", "Trident", "Melee", "spear", 8, 6, "Pierce", 1, 2, "Three-pronged piercer with stronger catch-and-twist damage."),
    weaponTemplate("melee_pike", "Pike", "Melee", "spear", 9, 5, "Pierce", 1, 1, "Long battlefield lance that favors precise heavy thrusts."),
    weaponTemplate("melee_glaive", "Glaive", "Melee", "polearm", 9, 5, "Slash", 0, 2, "Long sweeping blade with broad zone control."),
    weaponTemplate("melee_halberd", "Halberd", "Melee", "polearm", 10, 4, "Slash", 0, 2, "Polearm that mixes chop, hook, and thrust pressure."),
    weaponTemplate("melee_quarterstaff", "Quarterstaff", "Melee", "quarterstaff", 7, 7, "Blunt", 1, 1, "Disciplined blunt style with strong flow and mobility."),
  ],
  Ranged: [
    weaponTemplate("ranged_shortbow", "Shortbow", "Ranged", "bow", 6, 8, "Pierce", 2, 2, "Fast arrows and reliable hit rate at all times."),
    weaponTemplate("ranged_longbow", "Longbow", "Ranged", "bow", 8, 6, "Pierce", 1, 3, "Higher damage and crit pressure with slower draw speed."),
    weaponTemplate("ranged_recurve_bow", "Recurve Bow", "Ranged", "bow", 7, 8, "Pierce", 2, 2, "Responsive bow with strong sustained accuracy."),
    weaponTemplate("ranged_greatbow", "Greatbow", "Ranged", "bow", 10, 4, "Pierce", 0, 4, "Towering bow tuned for brutal single-arrow damage."),
    weaponTemplate("ranged_crossbow", "Crossbow", "Ranged", "crossbow", 10, 4, "Pierce", 0, 2, "Hard-hitting bolts with lower attack tempo."),
    weaponTemplate("ranged_hand_crossbow", "Hand Crossbow", "Ranged", "crossbow", 6, 8, "Pierce", 2, 3, "Compact bolt launcher with fast draw and finishers."),
    weaponTemplate("ranged_heavy_crossbow", "Heavy Crossbow", "Ranged", "crossbow", 12, 3, "Pierce", -1, 3, "Siege-grade bolt power with a slower cadence."),
    weaponTemplate("ranged_repeating", "Repeating Crossbow", "Ranged", "crossbow", 6, 7, "Pierce", 2, 1, "Rapid shots and smooth handling over raw bolt force."),
    weaponTemplate("ranged_throwing_knives", "Throwing Knives", "Ranged", "thrown", 5, 9, "Slash", 2, 4, "Very fast style with high crit chance and flexible damage type."),
    weaponTemplate("ranged_throwing_axes", "Throwing Axes", "Ranged", "thrown", 7, 7, "Slash", 1, 3, "Heavier thrown blades with nastier cleaving hits."),
    weaponTemplate("ranged_javelins", "Javelins", "Ranged", "thrown", 7, 7, "Pierce", 1, 2, "Thrown spears that reward accurate punctures."),
    weaponTemplate("ranged_chakram", "Chakram", "Ranged", "thrown", 6, 8, "Slash", 2, 3, "Circular blades that chain cleanly through skirmishes."),
    weaponTemplate("ranged_throwing_hammers", "Throwing Hammers", "Ranged", "thrown", 7, 6, "Blunt", 1, 2, "Compact blunt projectiles that crack tough targets."),
    weaponTemplate("ranged_darts", "Darts", "Ranged", "thrown", 5, 9, "Pierce", 3, 2, "Needle-fast missiles for relentless pressure."),
    weaponTemplate("ranged_sling", "Sling", "Ranged", "sling", 7, 7, "Blunt", 1, 1, "Blunt ranged damage that can punish skeleton-like foes."),
    weaponTemplate("ranged_staff_sling", "Staff Sling", "Ranged", "sling", 9, 5, "Blunt", 1, 1, "Longer sling with heavier stones and deeper knockback."),
  ],
  Magic: [
    weaponTemplate("magic_apprentice_wand", "Apprentice Wand", "Magic", "wand", 4, 8, "Arcane", 1, 2, "Stable focus for fast casting and arcane pressure."),
    weaponTemplate("magic_crystal_wand", "Crystal Wand", "Magic", "wand", 5, 9, "Arcane", 2, 3, "Refined wand that sharpens precise arcane bursts."),
    weaponTemplate("magic_oak_staff", "Oak Staff", "Magic", "magic_staff", 6, 6, "Arcane", 1, 1, "Balanced spell focus with stronger base power."),
    weaponTemplate("magic_archmage_staff", "Archmage Staff", "Magic", "magic_staff", 8, 5, "Arcane", 1, 2, "Long ritual staff for heavier channeling magic."),
    weaponTemplate("magic_fire_rod", "Fire Rod", "Magic", "rod", 7, 5, "Fire", 1, 1, "Elemental focus specialized for fire-based pressure."),
    weaponTemplate("magic_frost_rod", "Frost Rod", "Magic", "rod", 7, 6, "Ice", 1, 2, "Cold-aligned rod that rewards steady elemental pressure."),
    weaponTemplate("magic_frost_tome", "Frost Tome", "Magic", "tome", 7, 5, "Ice", 1, 1, "Steady ice focus with controlled, durable damage output."),
    weaponTemplate("magic_runebound_grimoire", "Runebound Grimoire", "Magic", "tome", 8, 4, "Arcane", 1, 2, "Prepared spellbook built for layered magical barrages."),
    weaponTemplate("magic_storm_focus", "Storm Focus", "Magic", "focus", 6, 7, "Lightning", 2, 1, "Quick-cast catalyst tuned for lightning techniques."),
    weaponTemplate("magic_gale_focus", "Gale Focus", "Magic", "focus", 6, 8, "Wind", 2, 2, "Swift focus that turns movement into sharp spell tempo."),
    weaponTemplate("magic_earth_scepter", "Earth Scepter", "Magic", "scepter", 8, 4, "Earth", 0, 2, "Slow but heavy elemental focus with strong base impact."),
    weaponTemplate("magic_tide_scepter", "Tide Scepter", "Magic", "scepter", 8, 5, "Water", 1, 1, "Regal focus that batters foes with tidal force."),
    weaponTemplate("magic_astral_orb", "Astral Orb", "Magic", "orb", 7, 6, "Arcane", 1, 3, "Floating catalyst with flexible astral spell patterns."),
    weaponTemplate("magic_void_orb", "Void Orb", "Magic", "orb", 8, 5, "Arcane", 0, 3, "Dense orb that trades speed for volatile finishers."),
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
  dagger: [
    { level: 1, name: "Quick Stab", damageDice: [4, 4], hitBonus: 3, attackScale: 0.52, defenseScale: 0.24, critBonus: 8, damageKind: "Pierce" },
    { level: 4, name: "Kidney Strike", damageDice: [8], hitBonus: 4, attackScale: 0.56, defenseScale: 0.22, critBonus: 10, damageKind: "Pierce" },
    { level: 8, name: "Twinfang Rush", damageDice: [6, 6], hitBonus: 4, attackScale: 0.59, defenseScale: 0.18, critBonus: 12, damageKind: null },
    { level: 14, name: "Shadow Needle", damageDice: [10, 4], hitBonus: 5, attackScale: 0.63, defenseScale: 0.16, critBonus: 14, damageKind: "Pierce" },
    { level: 22, name: "Bleeding Constellation", damageDice: [8, 8, 6], hitBonus: 5, attackScale: 0.67, defenseScale: 0.13, critBonus: 16, damageKind: null },
    { level: 32, name: "Last Whisper", damageDice: [12, 10], hitBonus: 6, attackScale: 0.72, defenseScale: 0.1, critBonus: 19, damageKind: "Pierce" },
  ],
  sword: [
    { level: 1, name: "Sweeping Slash", damageDice: [6], hitBonus: 1, attackScale: 0.62, defenseScale: 0.28, critBonus: 2, damageKind: "Slash" },
    { level: 4, name: "Riposte Line", damageDice: [8], hitBonus: 2, attackScale: 0.66, defenseScale: 0.22, critBonus: 4, damageKind: "Slash" },
    { level: 8, name: "Cross Cut", damageDice: [8, 4], hitBonus: 2, attackScale: 0.69, defenseScale: 0.18, critBonus: 5, damageKind: null },
    { level: 14, name: "Crescent Drive", damageDice: [10, 4], hitBonus: 3, attackScale: 0.72, defenseScale: 0.16, critBonus: 6, damageKind: "Slash" },
    { level: 22, name: "King's Measure", damageDice: [10, 8], hitBonus: 3, attackScale: 0.76, defenseScale: 0.12, critBonus: 8, damageKind: null },
    { level: 32, name: "Zenith Sever", damageDice: [12, 10], hitBonus: 4, attackScale: 0.82, defenseScale: 0.09, critBonus: 10, damageKind: "Slash" },
  ],
  axe: [
    { level: 1, name: "Hooking Chop", damageDice: [8], hitBonus: 0, attackScale: 0.64, defenseScale: 0.26, critBonus: 2, damageKind: "Slash" },
    { level: 4, name: "Armor Rend", damageDice: [10], hitBonus: 1, attackScale: 0.68, defenseScale: 0.2, critBonus: 3, damageKind: "Slash" },
    { level: 8, name: "Reaving Arc", damageDice: [8, 6], hitBonus: 1, attackScale: 0.72, defenseScale: 0.18, critBonus: 4, damageKind: null },
    { level: 14, name: "Headsman's Oath", damageDice: [12], hitBonus: 2, attackScale: 0.75, defenseScale: 0.16, critBonus: 6, damageKind: "Slash" },
    { level: 22, name: "Fell Horizon", damageDice: [10, 8, 6], hitBonus: 2, attackScale: 0.79, defenseScale: 0.13, critBonus: 7, damageKind: null },
    { level: 32, name: "Bloodmoon Cleave", damageDice: [12, 12], hitBonus: 3, attackScale: 0.84, defenseScale: 0.1, critBonus: 9, damageKind: "Slash" },
  ],
  hammer: [
    { level: 1, name: "Shieldbreaker", damageDice: [8], hitBonus: 1, attackScale: 0.66, defenseScale: 0.22, critBonus: 3, damageKind: "Blunt" },
    { level: 4, name: "Bone Shaker", damageDice: [10], hitBonus: 1, attackScale: 0.69, defenseScale: 0.2, critBonus: 4, damageKind: "Blunt" },
    { level: 8, name: "Meteor Maul", damageDice: [10, 4], hitBonus: 2, attackScale: 0.72, defenseScale: 0.18, critBonus: 5, damageKind: null },
    { level: 14, name: "Sundering Toll", damageDice: [12, 4], hitBonus: 2, attackScale: 0.76, defenseScale: 0.15, critBonus: 6, damageKind: "Blunt" },
    { level: 22, name: "Titan Anvil", damageDice: [12, 8], hitBonus: 3, attackScale: 0.8, defenseScale: 0.12, critBonus: 8, damageKind: "Blunt" },
    { level: 32, name: "Worldbreaker", damageDice: [14, 10], hitBonus: 3, attackScale: 0.85, defenseScale: 0.09, critBonus: 10, damageKind: "Blunt" },
  ],
  flail: [
    { level: 1, name: "Chain Lash", damageDice: [6, 4], hitBonus: 2, attackScale: 0.6, defenseScale: 0.25, critBonus: 4, damageKind: "Blunt" },
    { level: 4, name: "Spiked Swing", damageDice: [8], hitBonus: 2, attackScale: 0.64, defenseScale: 0.22, critBonus: 5, damageKind: "Pierce" },
    { level: 8, name: "Iron Orbit", damageDice: [6, 6, 4], hitBonus: 3, attackScale: 0.67, defenseScale: 0.18, critBonus: 7, damageKind: null },
    { level: 14, name: "Cagebreaker", damageDice: [10, 6], hitBonus: 3, attackScale: 0.71, defenseScale: 0.16, critBonus: 8, damageKind: "Blunt" },
    { level: 22, name: "Ruin Carousel", damageDice: [8, 8, 6], hitBonus: 4, attackScale: 0.75, defenseScale: 0.13, critBonus: 10, damageKind: null },
    { level: 32, name: "Catastrophe Chain", damageDice: [10, 10, 8], hitBonus: 4, attackScale: 0.8, defenseScale: 0.1, critBonus: 12, damageKind: "Blunt" },
  ],
  spear: [
    { level: 1, name: "Long Thrust", damageDice: [6], hitBonus: 3, attackScale: 0.6, defenseScale: 0.24, critBonus: 3, damageKind: "Pierce" },
    { level: 4, name: "Pinning Jab", damageDice: [8], hitBonus: 4, attackScale: 0.63, defenseScale: 0.2, critBonus: 4, damageKind: "Pierce" },
    { level: 8, name: "Skewer Drive", damageDice: [8, 4], hitBonus: 4, attackScale: 0.67, defenseScale: 0.17, critBonus: 6, damageKind: null },
    { level: 14, name: "Dragonlance", damageDice: [10, 6], hitBonus: 5, attackScale: 0.71, defenseScale: 0.15, critBonus: 7, damageKind: "Pierce" },
    { level: 22, name: "Horizon Impaler", damageDice: [10, 8], hitBonus: 5, attackScale: 0.75, defenseScale: 0.12, critBonus: 9, damageKind: "Pierce" },
    { level: 32, name: "Starpiercer", damageDice: [12, 10], hitBonus: 6, attackScale: 0.8, defenseScale: 0.09, critBonus: 11, damageKind: "Pierce" },
  ],
  polearm: [
    { level: 1, name: "Glaive Sweep", damageDice: [6, 6], hitBonus: 2, attackScale: 0.61, defenseScale: 0.26, critBonus: 3, damageKind: "Slash" },
    { level: 4, name: "Reaper Hook", damageDice: [8], hitBonus: 3, attackScale: 0.65, defenseScale: 0.22, critBonus: 4, damageKind: "Slash" },
    { level: 8, name: "Halberd Vault", damageDice: [8, 6], hitBonus: 3, attackScale: 0.69, defenseScale: 0.18, critBonus: 6, damageKind: null },
    { level: 14, name: "Cyclone Reach", damageDice: [10, 6], hitBonus: 4, attackScale: 0.72, defenseScale: 0.16, critBonus: 7, damageKind: "Slash" },
    { level: 22, name: "Bannerfall", damageDice: [10, 8, 6], hitBonus: 4, attackScale: 0.77, defenseScale: 0.12, critBonus: 8, damageKind: null },
    { level: 32, name: "Dragoon Eclipse", damageDice: [12, 10, 8], hitBonus: 5, attackScale: 0.82, defenseScale: 0.1, critBonus: 10, damageKind: "Slash" },
  ],
  quarterstaff: [
    { level: 1, name: "Vaulting Strike", damageDice: [6], hitBonus: 2, attackScale: 0.58, defenseScale: 0.26, critBonus: 4, damageKind: "Blunt" },
    { level: 4, name: "Twin End Flurry", damageDice: [4, 4, 4], hitBonus: 3, attackScale: 0.61, defenseScale: 0.22, critBonus: 5, damageKind: "Blunt" },
    { level: 8, name: "Monk's Wheel", damageDice: [8, 4], hitBonus: 3, attackScale: 0.65, defenseScale: 0.19, critBonus: 7, damageKind: null },
    { level: 14, name: "Temple Rush", damageDice: [8, 8], hitBonus: 4, attackScale: 0.69, defenseScale: 0.16, critBonus: 8, damageKind: "Blunt" },
    { level: 22, name: "Echoing Palm", damageDice: [10, 8, 4], hitBonus: 4, attackScale: 0.74, defenseScale: 0.13, critBonus: 10, damageKind: null },
    { level: 32, name: "Heavenly Stafffall", damageDice: [12, 10, 6], hitBonus: 5, attackScale: 0.79, defenseScale: 0.1, critBonus: 12, damageKind: "Blunt" },
  ],
  bow: [
    { level: 1, name: "Quick Volley", damageDice: [4, 4], hitBonus: 3, attackScale: 0.55, defenseScale: 0.26, critBonus: 6, damageKind: null },
    { level: 4, name: "Piercing Shot", damageDice: [8], hitBonus: 4, attackScale: 0.58, defenseScale: 0.22, critBonus: 9, damageKind: "Pierce" },
    { level: 8, name: "Hunter's Rain", damageDice: [6, 6], hitBonus: 4, attackScale: 0.61, defenseScale: 0.18, critBonus: 11, damageKind: null },
    { level: 14, name: "Falcon Mark", damageDice: [10, 4], hitBonus: 5, attackScale: 0.65, defenseScale: 0.16, critBonus: 13, damageKind: "Pierce" },
    { level: 22, name: "Sky Burial", damageDice: [8, 8, 6], hitBonus: 6, attackScale: 0.7, defenseScale: 0.13, critBonus: 16, damageKind: null },
    { level: 32, name: "Thousand Branches", damageDice: [10, 10, 8], hitBonus: 7, attackScale: 0.75, defenseScale: 0.1, critBonus: 19, damageKind: "Pierce" },
  ],
  crossbow: [
    { level: 1, name: "Bolt Drive", damageDice: [8], hitBonus: 2, attackScale: 0.6, defenseScale: 0.24, critBonus: 4, damageKind: "Pierce" },
    { level: 4, name: "Crank Burst", damageDice: [8, 4], hitBonus: 3, attackScale: 0.63, defenseScale: 0.2, critBonus: 6, damageKind: "Pierce" },
    { level: 8, name: "Armor Drill", damageDice: [10], hitBonus: 4, attackScale: 0.66, defenseScale: 0.17, critBonus: 8, damageKind: "Pierce" },
    { level: 14, name: "Deadeye Stake", damageDice: [12], hitBonus: 5, attackScale: 0.7, defenseScale: 0.15, critBonus: 10, damageKind: "Pierce" },
    { level: 22, name: "Siege Salvo", damageDice: [10, 8, 6], hitBonus: 5, attackScale: 0.75, defenseScale: 0.12, critBonus: 12, damageKind: null },
    { level: 32, name: "Ballista Verdict", damageDice: [14, 10], hitBonus: 6, attackScale: 0.8, defenseScale: 0.09, critBonus: 14, damageKind: "Pierce" },
  ],
  thrown: [
    { level: 1, name: "Fan of Steel", damageDice: [4, 4], hitBonus: 3, attackScale: 0.56, defenseScale: 0.25, critBonus: 7, damageKind: null },
    { level: 4, name: "Skirmisher's Arc", damageDice: [6, 6], hitBonus: 4, attackScale: 0.59, defenseScale: 0.21, critBonus: 9, damageKind: null },
    { level: 8, name: "Razor Wheel", damageDice: [8, 4], hitBonus: 4, attackScale: 0.63, defenseScale: 0.18, critBonus: 11, damageKind: "Slash" },
    { level: 14, name: "Hunting Javelin", damageDice: [10, 4], hitBonus: 5, attackScale: 0.66, defenseScale: 0.15, critBonus: 13, damageKind: "Pierce" },
    { level: 22, name: "Storm of Edges", damageDice: [8, 8, 6], hitBonus: 6, attackScale: 0.71, defenseScale: 0.12, critBonus: 15, damageKind: null },
    { level: 32, name: "Endless Pursuit", damageDice: [10, 10, 8], hitBonus: 7, attackScale: 0.76, defenseScale: 0.1, critBonus: 17, damageKind: null },
  ],
  sling: [
    { level: 1, name: "Stone Crack", damageDice: [6], hitBonus: 3, attackScale: 0.57, defenseScale: 0.24, critBonus: 4, damageKind: "Blunt" },
    { level: 4, name: "Skip Shot", damageDice: [6, 4], hitBonus: 4, attackScale: 0.6, defenseScale: 0.21, critBonus: 5, damageKind: "Blunt" },
    { level: 8, name: "Lead Rain", damageDice: [6, 6, 4], hitBonus: 4, attackScale: 0.64, defenseScale: 0.18, critBonus: 7, damageKind: null },
    { level: 14, name: "Concussion Arc", damageDice: [10, 4], hitBonus: 5, attackScale: 0.68, defenseScale: 0.15, critBonus: 8, damageKind: "Blunt" },
    { level: 22, name: "Giant-Feller", damageDice: [12, 6], hitBonus: 5, attackScale: 0.72, defenseScale: 0.12, critBonus: 10, damageKind: "Blunt" },
    { level: 32, name: "Avalanche Pocket", damageDice: [12, 8, 6], hitBonus: 6, attackScale: 0.77, defenseScale: 0.1, critBonus: 12, damageKind: "Blunt" },
  ],
  wand: [
    { level: 1, name: "Arc Bolt", damageDice: [6], hitBonus: 2, attackScale: 0.6, defenseScale: 0.25, critBonus: 4, damageKind: "Arcane" },
    { level: 4, name: "Prism Needle", damageDice: [8], hitBonus: 3, attackScale: 0.63, defenseScale: 0.21, critBonus: 6, damageKind: "Arcane" },
    { level: 8, name: "Mana Lance", damageDice: [8, 4], hitBonus: 3, attackScale: 0.67, defenseScale: 0.18, critBonus: 8, damageKind: null },
    { level: 14, name: "Star Stitch", damageDice: [10, 4], hitBonus: 4, attackScale: 0.71, defenseScale: 0.16, critBonus: 10, damageKind: "Arcane" },
    { level: 22, name: "Comet String", damageDice: [10, 8], hitBonus: 4, attackScale: 0.76, defenseScale: 0.12, critBonus: 12, damageKind: null },
    { level: 32, name: "Astral Thread", damageDice: [12, 10], hitBonus: 5, attackScale: 0.81, defenseScale: 0.09, critBonus: 14, damageKind: "Arcane" },
  ],
  magic_staff: [
    { level: 1, name: "Resonant Pulse", damageDice: [6], hitBonus: 2, attackScale: 0.63, defenseScale: 0.24, critBonus: 2, damageKind: "Arcane" },
    { level: 4, name: "Leyline Burst", damageDice: [8], hitBonus: 2, attackScale: 0.66, defenseScale: 0.21, critBonus: 3, damageKind: "Arcane" },
    { level: 8, name: "Aether Column", damageDice: [10], hitBonus: 3, attackScale: 0.69, defenseScale: 0.18, critBonus: 4, damageKind: "Arcane" },
    { level: 14, name: "Grand Invocation", damageDice: [10, 6], hitBonus: 3, attackScale: 0.73, defenseScale: 0.15, critBonus: 6, damageKind: null },
    { level: 22, name: "Celestial Chorus", damageDice: [12, 8], hitBonus: 4, attackScale: 0.78, defenseScale: 0.12, critBonus: 7, damageKind: "Arcane" },
    { level: 32, name: "World Tree Descent", damageDice: [12, 10, 8], hitBonus: 4, attackScale: 0.84, defenseScale: 0.09, critBonus: 9, damageKind: "Arcane" },
  ],
  rod: [
    { level: 1, name: "Ember Spear", damageDice: [6], hitBonus: 2, attackScale: 0.62, defenseScale: 0.24, critBonus: 3, damageKind: "Fire" },
    { level: 4, name: "Frostbrand Ray", damageDice: [8], hitBonus: 2, attackScale: 0.65, defenseScale: 0.21, critBonus: 4, damageKind: "Ice" },
    { level: 8, name: "Thunder Lash", damageDice: [10], hitBonus: 3, attackScale: 0.68, defenseScale: 0.18, critBonus: 5, damageKind: "Lightning" },
    { level: 14, name: "Faultline Burst", damageDice: [10, 6], hitBonus: 3, attackScale: 0.72, defenseScale: 0.15, critBonus: 6, damageKind: "Earth" },
    { level: 22, name: "Tempest Furnace", damageDice: [12, 8], hitBonus: 4, attackScale: 0.77, defenseScale: 0.12, critBonus: 7, damageKind: "Fire" },
    { level: 32, name: "Elemental Collapse", damageDice: [12, 10, 8], hitBonus: 5, attackScale: 0.83, defenseScale: 0.09, critBonus: 9, damageKind: null },
  ],
  tome: [
    { level: 1, name: "Rune Sever", damageDice: [6], hitBonus: 3, attackScale: 0.61, defenseScale: 0.24, critBonus: 3, damageKind: "Arcane" },
    { level: 4, name: "Frost Page", damageDice: [8], hitBonus: 3, attackScale: 0.64, defenseScale: 0.21, critBonus: 4, damageKind: "Ice" },
    { level: 8, name: "Hex Spiral", damageDice: [8, 4], hitBonus: 4, attackScale: 0.68, defenseScale: 0.18, critBonus: 6, damageKind: null },
    { level: 14, name: "Binding Chapter", damageDice: [10, 6], hitBonus: 4, attackScale: 0.71, defenseScale: 0.15, critBonus: 7, damageKind: "Water" },
    { level: 22, name: "Final Verse", damageDice: [10, 8, 6], hitBonus: 5, attackScale: 0.76, defenseScale: 0.12, critBonus: 8, damageKind: null },
    { level: 32, name: "Forbidden Index", damageDice: [12, 10, 8], hitBonus: 5, attackScale: 0.82, defenseScale: 0.09, critBonus: 10, damageKind: "Arcane" },
  ],
  focus: [
    { level: 1, name: "Spark Needle", damageDice: [6], hitBonus: 3, attackScale: 0.6, defenseScale: 0.24, critBonus: 5, damageKind: "Lightning" },
    { level: 4, name: "Gale Ring", damageDice: [8], hitBonus: 3, attackScale: 0.63, defenseScale: 0.21, critBonus: 6, damageKind: "Wind" },
    { level: 8, name: "Storm Lance", damageDice: [10, 6], hitBonus: 4, attackScale: 0.67, defenseScale: 0.18, critBonus: 8, damageKind: "Lightning" },
    { level: 14, name: "Flash Step Sigil", damageDice: [8, 8, 6], hitBonus: 4, attackScale: 0.71, defenseScale: 0.15, critBonus: 10, damageKind: null },
    { level: 22, name: "Zero Wind Barrage", damageDice: [10, 10, 8], hitBonus: 5, attackScale: 0.76, defenseScale: 0.12, critBonus: 12, damageKind: "Wind" },
    { level: 32, name: "Tempest Core", damageDice: [12, 10, 10], hitBonus: 6, attackScale: 0.82, defenseScale: 0.09, critBonus: 14, damageKind: "Lightning" },
  ],
  scepter: [
    { level: 1, name: "Stone Crush", damageDice: [8], hitBonus: 1, attackScale: 0.65, defenseScale: 0.23, critBonus: 3, damageKind: "Earth" },
    { level: 4, name: "Tidal Crown", damageDice: [8, 4], hitBonus: 2, attackScale: 0.68, defenseScale: 0.2, critBonus: 4, damageKind: "Water" },
    { level: 8, name: "Kingbreaker Quake", damageDice: [10, 6], hitBonus: 2, attackScale: 0.72, defenseScale: 0.17, critBonus: 5, damageKind: "Earth" },
    { level: 14, name: "Crown of Salt", damageDice: [12, 6], hitBonus: 3, attackScale: 0.76, defenseScale: 0.15, critBonus: 6, damageKind: "Water" },
    { level: 22, name: "Continental Fall", damageDice: [12, 8], hitBonus: 3, attackScale: 0.8, defenseScale: 0.12, critBonus: 8, damageKind: "Earth" },
    { level: 32, name: "Sovereign Rupture", damageDice: [14, 10], hitBonus: 4, attackScale: 0.85, defenseScale: 0.09, critBonus: 10, damageKind: "Earth" },
  ],
  orb: [
    { level: 1, name: "Orbit Shard", damageDice: [6], hitBonus: 2, attackScale: 0.61, defenseScale: 0.24, critBonus: 4, damageKind: "Arcane" },
    { level: 4, name: "Chaos Sphere", damageDice: [8], hitBonus: 3, attackScale: 0.64, defenseScale: 0.21, critBonus: 5, damageKind: "Arcane" },
    { level: 8, name: "Gravity Well", damageDice: [8, 6], hitBonus: 3, attackScale: 0.68, defenseScale: 0.18, critBonus: 7, damageKind: null },
    { level: 14, name: "Lunar Collapse", damageDice: [10, 6], hitBonus: 4, attackScale: 0.72, defenseScale: 0.15, critBonus: 8, damageKind: "Wind" },
    { level: 22, name: "Star Choir", damageDice: [10, 8, 6], hitBonus: 4, attackScale: 0.77, defenseScale: 0.12, critBonus: 10, damageKind: null },
    { level: 32, name: "Celestial Nova", damageDice: [12, 10, 8], hitBonus: 5, attackScale: 0.83, defenseScale: 0.09, critBonus: 12, damageKind: "Arcane" },
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
  trail_skewers: { id: "trail_skewers", name: "Trail Skewers", description: "Recover 28 Health.", heal: 28, rarity: "Common" },
  greater_potion: { id: "greater_potion", name: "Greater Potion", description: "Recover 56 Health.", heal: 56, rarity: "Uncommon" },
  smoked_filet: { id: "smoked_filet", name: "Smoked Filet", description: "Recover 64 Health.", heal: 64, rarity: "Uncommon" },
  mega_potion: { id: "mega_potion", name: "Mega Potion", description: "Recover 120 Health.", heal: 120, rarity: "Rare" },
  smoke_bomb: { id: "smoke_bomb", name: "Smoke Bomb", description: "Escape from battle instantly.", flee: true, rarity: "Uncommon" },
  fire_bomb: { id: "fire_bomb", name: "Fire Bomb", description: "Deal 40 + 1d12 fire damage.", damage: 40, die: 12, rarity: "Rare" },
  focus_tonic: { id: "focus_tonic", name: "Focus Tonic", description: "Gain +8 Critical Chance for 3 turns.", critBuff: 8, buffTurns: 3, rarity: "Rare" },
  hearty_stew: { id: "hearty_stew", name: "Hearty Stew", description: "Recover 42 Health.", heal: 42, rarity: "Uncommon" },
  anglers_stew: { id: "anglers_stew", name: "Angler's Stew", description: "Recover 72 Health.", heal: 72, rarity: "Rare" },
  battle_broth: { id: "battle_broth", name: "Battle Broth", description: "Recover 116 Health.", heal: 116, rarity: "Rare" },
  hero_feast: { id: "hero_feast", name: "Hero Feast", description: "Recover 192 Health.", heal: 192, rarity: "Epic" },
  prime_elixir: { id: "prime_elixir", name: "Prime Elixir", description: "Recover 250 Health.", heal: 250, rarity: "Legendary" },
  volatile_flask: { id: "volatile_flask", name: "Volatile Flask", description: "Deal 82 + 1d18 fire damage.", damage: 82, die: 18, rarity: "Epic" },
  precision_elixir: { id: "precision_elixir", name: "Precision Elixir", description: "Gain +14 Critical Chance for 4 turns.", critBuff: 14, buffTurns: 4, rarity: "Epic" },
  trail_repel: { id: "trail_repel", name: "Trail Repel", description: "Repel random encounters for 40 steps.", repelSteps: 40, rarity: "Common" },
  strong_repel: { id: "strong_repel", name: "Strong Repel", description: "Repel random encounters for 90 steps.", repelSteps: 90, rarity: "Rare" },
  grand_repel: { id: "grand_repel", name: "Grand Repel", description: "Repel random encounters for 180 steps.", repelSteps: 180, rarity: "Epic" },
};

const MATERIAL_DEFS = {
  slime_gel: { id: "slime_gel", name: "Slime Gel", description: "Sticky material from basic monsters." },
  iron_scrap: { id: "iron_scrap", name: "Iron Scrap", description: "Useful for improvised upgrades." },
  arcane_dust: { id: "arcane_dust", name: "Arcane Dust", description: "Shimmering residue from magic foes." },
  beast_fang: { id: "beast_fang", name: "Barbed Spine", description: "A sharp spine or fang used for hooks, studs, and reinforced trims." },
  hardwood_log: { id: "hardwood_log", name: "Hardwood Log", description: "Strong timber from old growth trees." },
  fiber_bundle: { id: "fiber_bundle", name: "Fiber Bundle", description: "Plant fibers useful for bindings and cloth wraps." },
  herb_bundle: { id: "herb_bundle", name: "Herb Bundle", description: "Fresh medicinal herbs for cooking and alchemy." },
  iron_ore: { id: "iron_ore", name: "Iron Ore", description: "Raw ore ready for smelting and smithing." },
  silver_ore: { id: "silver_ore", name: "Silver Ore", description: "Precious ore used for rings, chains, and accessory settings." },
  gem_shard: { id: "gem_shard", name: "Gem Shard", description: "Cuttable gemstone fragments prized by jewelcrafters." },
  beast_hide: { id: "beast_hide", name: "Leafhide Sheet", description: "Dense bark-fiber sheets cured into leather-like crafting stock." },
  fresh_fish: { id: "fresh_fish", name: "Fresh Fish", description: "A fresh catch that can be cooked into restorative food." },
  river_scale: { id: "river_scale", name: "River Scale", description: "A gleaming scale used in alchemy and trade." },
};

const RESOURCE_REQUIREMENT_BANDS = {
  tree: {
    road: [1, 10],
    plains: [1, 20],
    forest: [10, 35],
    swamp: [20, 55],
    badlands: [35, 80],
  },
  herb: {
    road: [1, 10],
    plains: [1, 20],
    forest: [5, 30],
    swamp: [15, 50],
    badlands: [30, 70],
  },
  hide: {
    road: [1, 10],
    plains: [1, 20],
    forest: [10, 35],
    swamp: [20, 50],
    badlands: [30, 70],
  },
  ore: {
    road: [5, 15],
    plains: [5, 20],
    forest: [10, 35],
    swamp: [20, 55],
    badlands: [30, 80],
  },
  crystal: {
    road: [15, 30],
    plains: [15, 30],
    forest: [20, 45],
    swamp: [30, 65],
    badlands: [45, 100],
  },
  fishing: {
    road: [1, 15],
    plains: [1, 20],
    forest: [5, 20],
    swamp: [10, 40],
    badlands: [20, 50],
  },
  tidepool: {
    road: [10, 30],
    plains: [15, 40],
    forest: [15, 35],
    swamp: [20, 60],
    badlands: [25, 70],
  },
};

const SKILL_CAP_LEVEL = 100;
const SKILL_DEFS = {
  Botany: { role: "Gathering", summary: "Harvest herbs, timber, fibers, and leafhide from natural nodes." },
  Mining: { role: "Gathering", summary: "Extract ore, crystals, gems, and metal components." },
  Fishing: { role: "Gathering", summary: "Catch fish, scales, gel, and spines from waterside nodes." },
  Clothier: { role: "Crafting", summary: "Tailor wraps, robes, and travelwear from fibers and arcane cloth." },
  Smithing: { role: "Crafting", summary: "Forge weapons and metal armor." },
  Woodworking: { role: "Crafting", summary: "Craft bows, staves, and wood gear." },
  Cooking: { role: "Crafting", summary: "Cook restorative meals." },
  Leatherworking: { role: "Crafting", summary: "Process hides into protective gear." },
  Alchemy: { role: "Crafting", summary: "Brew potions, tonics, and utility mixtures." },
  Jewelcrafting: { role: "Crafting", summary: "Set rings, charms, brooches, and other accessory gear from precious ore and gems." },
};
const SKILL_ORDER = Object.keys(SKILL_DEFS);

const RESOURCE_NODE_DEFS = {
  tree: {
    label: "Tree Grove",
    actionLabel: "Gather Wood",
    skill: "Botany",
    xpMin: 8,
    xpMax: 14,
    minCharges: 2,
    maxCharges: 4,
    respawnSteps: 20,
    placementBiomes: ["forest", "plains"],
    drops: [
      { id: "hardwood_log", chance: 1, min: 1, max: 2 },
      { id: "fiber_bundle", chance: 0.5, min: 1, max: 2 },
      { id: "herb_bundle", chance: 0.24, min: 1, max: 1 },
    ],
  },
  herb: {
    label: "Herb Patch",
    actionLabel: "Harvest Herbs",
    skill: "Botany",
    xpMin: 7,
    xpMax: 13,
    minCharges: 2,
    maxCharges: 4,
    respawnSteps: 16,
    placementBiomes: ["forest", "plains", "swamp"],
    drops: [
      { id: "herb_bundle", chance: 1, min: 1, max: 3 },
      { id: "slime_gel", chance: 0.28, min: 1, max: 1 },
    ],
  },
  ore: {
    label: "Ore Vein",
    actionLabel: "Mine Vein",
    skill: "Mining",
    xpMin: 9,
    xpMax: 15,
    minCharges: 2,
    maxCharges: 3,
    respawnSteps: 24,
    placementBiomes: ["badlands", "swamp", "forest"],
    drops: [
      { id: "iron_ore", chance: 1, min: 1, max: 2 },
      { id: "iron_scrap", chance: 0.5, min: 1, max: 2 },
      { id: "silver_ore", chance: 0.34, min: 1, max: 1 },
      { id: "gem_shard", chance: 0.16, min: 1, max: 1 },
      { id: "arcane_dust", chance: 0.12, min: 1, max: 1 },
    ],
  },
  crystal: {
    label: "Crystal Seam",
    actionLabel: "Mine Crystals",
    skill: "Mining",
    xpMin: 10,
    xpMax: 17,
    minCharges: 2,
    maxCharges: 3,
    respawnSteps: 24,
    placementBiomes: ["badlands", "swamp", "forest"],
    drops: [
      { id: "arcane_dust", chance: 1, min: 1, max: 2 },
      { id: "gem_shard", chance: 0.68, min: 1, max: 2 },
      { id: "silver_ore", chance: 0.5, min: 1, max: 2 },
      { id: "iron_scrap", chance: 0.34, min: 1, max: 2 },
    ],
  },
  hide: {
    label: "Leatherleaf Thicket",
    actionLabel: "Harvest Leafhide",
    skill: "Botany",
    xpMin: 8,
    xpMax: 14,
    minCharges: 2,
    maxCharges: 4,
    respawnSteps: 20,
    placementBiomes: ["plains", "forest", "swamp"],
    drops: [
      { id: "beast_hide", chance: 1, min: 1, max: 2 },
      { id: "fiber_bundle", chance: 0.56, min: 1, max: 2 },
      { id: "beast_fang", chance: 0.22, min: 1, max: 1 },
    ],
  },
  fishing: {
    label: "Fishing Spot",
    actionLabel: "Cast Line",
    skill: "Fishing",
    xpMin: 10,
    xpMax: 16,
    minCharges: 2,
    maxCharges: 4,
    respawnSteps: 18,
    placementBiomes: ["swamp", "plains", "road"],
    minigameId: "fishing_basic_v1",
  },
  tidepool: {
    label: "Tidepool",
    actionLabel: "Sweep Tidepool",
    skill: "Fishing",
    xpMin: 9,
    xpMax: 16,
    minCharges: 2,
    maxCharges: 4,
    respawnSteps: 18,
    placementBiomes: ["swamp", "road", "plains"],
    minigameId: "fishing_basic_v1",
  },
};

const CRAFTING_TOOL_DEFS = {
  clothier_kit: {
    id: "clothier_kit",
    name: "Tailor's Satchel",
    skill: "Clothier",
    description: "Needles, thread, and cutting tools for field tailoring.",
    shopPrice: 100,
  },
  smithing_kit: {
    id: "smithing_kit",
    name: "Portable Forge Kit",
    skill: "Smithing",
    description: "Compact forge tools that let you work metal outside a town smithy.",
    shopPrice: 180,
  },
  woodworking_kit: {
    id: "woodworking_kit",
    name: "Fletcher's Tool Roll",
    skill: "Woodworking",
    description: "Knives, clamps, and shaping tools for bows, staves, and carved gear.",
    shopPrice: 130,
  },
  cooking_kit: {
    id: "cooking_kit",
    name: "Camp Cookware Set",
    skill: "Cooking",
    description: "Travel pots and knives for cooking away from a proper kitchen.",
    shopPrice: 95,
  },
  leatherworking_kit: {
    id: "leatherworking_kit",
    name: "Tanner's Kit",
    skill: "Leatherworking",
    description: "Awls, punches, and waxed thread for hideworking in the field.",
    shopPrice: 120,
  },
  alchemy_kit: {
    id: "alchemy_kit",
    name: "Field Alembic",
    skill: "Alchemy",
    description: "Portable glassware and burners for mixing reagents on the road.",
    shopPrice: 170,
  },
  jewelcrafting_kit: {
    id: "jewelcrafting_kit",
    name: "Jeweler's Roll",
    skill: "Jewelcrafting",
    description: "Files, clamps, and gem-setting tools for accessory crafting in the field.",
    shopPrice: 165,
  },
};
const CRAFTING_TOOL_BY_SKILL = Object.fromEntries(
  Object.values(CRAFTING_TOOL_DEFS).map((tool) => [tool.skill, tool.id]),
);
const CRAFTING_TOOL_ORDER = Object.keys(CRAFTING_TOOL_DEFS);

const CRAFTING_STATION_DEFS = {
  clothier_station: {
    id: "clothier_station",
    name: "Camp Loom",
    skill: "Clothier",
    description: "A fold-out loom and cutting bench that gives Clothier full workshop support in the field.",
    shopPrice: 320,
  },
  smithing_station: {
    id: "smithing_station",
    name: "Portable Smithy",
    skill: "Smithing",
    description: "A heavy portable anvil, tongs, and coal rig that turns any campsite into a smithing station.",
    shopPrice: 460,
  },
  woodworking_station: {
    id: "woodworking_station",
    name: "Field Workbench",
    skill: "Woodworking",
    description: "A collapsible bench with clamps and shaping rests for bow, staff, and woodwork crafting.",
    shopPrice: 360,
  },
  cooking_station: {
    id: "cooking_station",
    name: "Expedition Stove",
    skill: "Cooking",
    description: "A reinforced camp stove that gives cooking full station support outside town.",
    shopPrice: 280,
  },
  leatherworking_station: {
    id: "leatherworking_station",
    name: "Hide Rack Stand",
    skill: "Leatherworking",
    description: "Portable frame and stitching stand used to process hides with workshop-grade tension.",
    shopPrice: 340,
  },
  alchemy_station: {
    id: "alchemy_station",
    name: "Reagent Bench",
    skill: "Alchemy",
    description: "A travel alchemy bench with stable burners and mounts for precise brewing in the field.",
    shopPrice: 430,
  },
  jewelcrafting_station: {
    id: "jewelcrafting_station",
    name: "Gemsetter Bench",
    skill: "Jewelcrafting",
    description: "A portable jeweler's bench with a lamp, vice, and setter tools for workshop-grade accessory crafting.",
    shopPrice: 410,
  },
};
const CRAFTING_STATION_BY_SKILL = Object.fromEntries(
  Object.values(CRAFTING_STATION_DEFS).map((station) => [station.skill, station.id]),
);
const CRAFTING_STATION_ORDER = Object.keys(CRAFTING_STATION_DEFS);

const CRAFTING_SKILL_TUNING = {
  Clothier: { zoneWidth: 0.28, perfectWidth: 0.082, speed: 0.98, prompt: "Set the stitch on the clean seam." },
  Smithing: { zoneWidth: 0.24, perfectWidth: 0.07, speed: 1.08, prompt: "Strike when the billet flashes bright." },
  Woodworking: { zoneWidth: 0.27, perfectWidth: 0.078, speed: 1, prompt: "Cut with the grain before the flex slips." },
  Cooking: { zoneWidth: 0.29, perfectWidth: 0.086, speed: 0.96, prompt: "Pull the dish at the moment it turns." },
  Leatherworking: { zoneWidth: 0.27, perfectWidth: 0.08, speed: 1.02, prompt: "Punch and stitch before the hide twists." },
  Alchemy: { zoneWidth: 0.23, perfectWidth: 0.068, speed: 1.1, prompt: "Stop on the stable reaction window." },
  Jewelcrafting: { zoneWidth: 0.25, perfectWidth: 0.072, speed: 1.04, prompt: "Set the stone when the mount lines up cleanly." },
};

const CRAFTING_QUALITY_TIERS = {
  rough: {
    key: "rough",
    name: "Rough",
    score: 0.45,
    xpScale: 0.72,
    statScale: 0.84,
    quantityScale: 0.72,
    flatQuantity: 0,
    rarityBonus: -1,
    levelBonus: -6,
    tierBonus: -1,
    damageBonus: -1,
    hitBonus: 0,
    critBonus: 0,
    labelPrefix: "Rough",
  },
  good: {
    key: "good",
    name: "Good",
    score: 1,
    xpScale: 1,
    statScale: 1,
    quantityScale: 1,
    flatQuantity: 0,
    rarityBonus: 0,
    levelBonus: 0,
    tierBonus: 0,
    damageBonus: 0,
    hitBonus: 0,
    critBonus: 0,
    labelPrefix: "",
  },
  great: {
    key: "great",
    name: "Great",
    score: 1.42,
    xpScale: 1.2,
    statScale: 1.15,
    quantityScale: 1.22,
    flatQuantity: 0,
    rarityBonus: 1,
    levelBonus: 3,
    tierBonus: 0,
    damageBonus: 1,
    hitBonus: 1,
    critBonus: 1,
    labelPrefix: "Fine",
  },
  perfect: {
    key: "perfect",
    name: "Perfect",
    score: 1.95,
    xpScale: 1.42,
    statScale: 1.34,
    quantityScale: 1.45,
    flatQuantity: 1,
    rarityBonus: 1,
    levelBonus: 6,
    tierBonus: 0,
    damageBonus: 2,
    hitBonus: 1,
    critBonus: 2,
    labelPrefix: "Masterwork",
  },
};

const CRAFTING_RESULT_THRESHOLDS = {
  rough: 0,
  good: 0.22,
  great: 0.56,
  perfect: 0.86,
};

const CRAFTING_CONDITION_DEFS = {
  Normal: { key: "Normal", label: "Normal", qualityMultiplier: 1, progressMultiplier: 1, cpMultiplier: 1, durabilityMultiplier: 1, description: "Stable state." },
  Good: { key: "Good", label: "Good", qualityMultiplier: 1.35, progressMultiplier: 1, cpMultiplier: 1, durabilityMultiplier: 1, description: "Quality actions hit harder." },
  Excellent: { key: "Excellent", label: "Excellent", qualityMultiplier: 1.85, progressMultiplier: 1, cpMultiplier: 1, durabilityMultiplier: 1, description: "Big quality spike this step." },
  Poor: { key: "Poor", label: "Poor", qualityMultiplier: 0.55, progressMultiplier: 1, cpMultiplier: 1, durabilityMultiplier: 1, description: "Quality actions are dulled." },
  Sturdy: { key: "Sturdy", label: "Sturdy", qualityMultiplier: 1, progressMultiplier: 1, cpMultiplier: 1, durabilityMultiplier: 0.5, description: "Durability costs are halved." },
  Pliant: { key: "Pliant", label: "Pliant", qualityMultiplier: 1, progressMultiplier: 1, cpMultiplier: 0.5, durabilityMultiplier: 1, description: "CP costs are halved." },
  Malleable: { key: "Malleable", label: "Malleable", qualityMultiplier: 1, progressMultiplier: 1.35, cpMultiplier: 1, durabilityMultiplier: 1, description: "Progress actions hit harder." },
};

const CRAFTING_ACTION_DEFS = {
  basic_synthesis: {
    id: "basic_synthesis",
    name: "Basic Synthesis",
    unlockSkill: null,
    unlockLevel: 1,
    cpCost: 0,
    durabilityCost: 10,
    progressMultiplier: 1,
    qualityMultiplier: 0,
    description: "Steady progress with no CP cost.",
  },
  basic_touch: {
    id: "basic_touch",
    name: "Basic Touch",
    unlockSkill: null,
    unlockLevel: 1,
    cpCost: 18,
    durabilityCost: 10,
    progressMultiplier: 0,
    qualityMultiplier: 1,
    innerQuietGain: 1,
    description: "Reliable quality gain that builds Inner Quiet.",
  },
  masters_mend: {
    id: "masters_mend",
    name: "Master's Mend",
    unlockSkill: "Leatherworking",
    unlockLevel: 7,
    cpCost: 88,
    durabilityCost: 0,
    durabilityRestore: 30,
    description: "Restore durability and stabilize the craft.",
  },
  observe: {
    id: "observe",
    name: "Observe",
    unlockSkill: "Jewelcrafting",
    unlockLevel: 10,
    cpCost: 7,
    durabilityCost: 0,
    setsObserved: true,
    description: "Pause to line up the next focused action.",
  },
  veneration: {
    id: "veneration",
    name: "Veneration",
    unlockSkill: "Smithing",
    unlockLevel: 15,
    cpCost: 18,
    durabilityCost: 0,
    buffId: "veneration",
    buffTurns: 4,
    description: "Boost progress actions for the next 4 steps.",
  },
  innovation: {
    id: "innovation",
    name: "Innovation",
    unlockSkill: "Clothier",
    unlockLevel: 15,
    cpCost: 18,
    durabilityCost: 0,
    buffId: "innovation",
    buffTurns: 4,
    description: "Boost quality actions for the next 4 steps.",
  },
  waste_not: {
    id: "waste_not",
    name: "Waste Not",
    unlockSkill: "Leatherworking",
    unlockLevel: 20,
    cpCost: 56,
    durabilityCost: 0,
    buffId: "waste_not",
    buffTurns: 4,
    description: "Halve durability loss for the next 4 steps.",
  },
  tricks_of_trade: {
    id: "tricks_of_trade",
    name: "Tricks of the Trade",
    unlockSkill: "Alchemy",
    unlockLevel: 20,
    cpCost: 0,
    durabilityCost: 0,
    cpRestore: 20,
    allowedConditions: ["Good", "Excellent", "Pliant"],
    description: "Recover CP when the craft condition opens up.",
  },
  great_strides: {
    id: "great_strides",
    name: "Great Strides",
    unlockSkill: "Jewelcrafting",
    unlockLevel: 25,
    cpCost: 32,
    durabilityCost: 0,
    buffId: "great_strides",
    buffTurns: 1,
    description: "Double the next quality action.",
  },
  delicate_synthesis: {
    id: "delicate_synthesis",
    name: "Delicate Synthesis",
    unlockSkill: "Cooking",
    unlockLevel: 28,
    cpCost: 32,
    durabilityCost: 10,
    progressMultiplier: 1.05,
    qualityMultiplier: 0.72,
    innerQuietGain: 1,
    description: "Advance progress and quality at the same time.",
  },
  precise_touch: {
    id: "precise_touch",
    name: "Precise Touch",
    unlockSkill: "Woodworking",
    unlockLevel: 30,
    cpCost: 18,
    durabilityCost: 10,
    progressMultiplier: 0,
    qualityMultiplier: 1.55,
    innerQuietGain: 2,
    allowedConditions: ["Good", "Excellent"],
    description: "Big quality gain when the condition is favorable.",
  },
  focused_synthesis: {
    id: "focused_synthesis",
    name: "Focused Synthesis",
    unlockSkill: "Smithing",
    unlockLevel: 35,
    cpCost: 5,
    durabilityCost: 10,
    progressMultiplier: 1.8,
    qualityMultiplier: 0,
    requiresObserved: true,
    description: "Heavy progress after an Observe setup.",
  },
  focused_touch: {
    id: "focused_touch",
    name: "Focused Touch",
    unlockSkill: "Clothier",
    unlockLevel: 35,
    cpCost: 18,
    durabilityCost: 10,
    progressMultiplier: 0,
    qualityMultiplier: 1.7,
    innerQuietGain: 2,
    requiresObserved: true,
    description: "Heavy quality after an Observe setup.",
  },
  prudent_touch: {
    id: "prudent_touch",
    name: "Prudent Touch",
    unlockSkill: "Leatherworking",
    unlockLevel: 45,
    cpCost: 25,
    durabilityCost: 5,
    progressMultiplier: 0,
    qualityMultiplier: 1.2,
    innerQuietGain: 1,
    description: "Efficient touch that preserves durability.",
  },
  manipulation: {
    id: "manipulation",
    name: "Manipulation",
    unlockSkill: "Alchemy",
    unlockLevel: 45,
    cpCost: 96,
    durabilityCost: 0,
    buffId: "manipulation",
    buffTurns: 6,
    description: "Recover durability after each step for 6 steps.",
  },
  groundwork: {
    id: "groundwork",
    name: "Groundwork",
    unlockSkill: "Smithing",
    unlockLevel: 55,
    cpCost: 18,
    durabilityCost: 20,
    progressMultiplier: 2.35,
    qualityMultiplier: 0,
    description: "Massive progress at a heavy durability cost.",
  },
  byregots_blessing: {
    id: "byregots_blessing",
    name: "Byregot's Blessing",
    unlockSkill: "Jewelcrafting",
    unlockLevel: 60,
    cpCost: 24,
    durabilityCost: 10,
    progressMultiplier: 0,
    qualityMultiplier: 1.15,
    consumesInnerQuiet: true,
    requiresInnerQuiet: 1,
    description: "Convert Inner Quiet stacks into a finishing quality burst.",
  },
};

const CRAFTING_ACTION_ORDER = [
  "basic_synthesis",
  "basic_touch",
  "masters_mend",
  "observe",
  "veneration",
  "innovation",
  "waste_not",
  "tricks_of_trade",
  "great_strides",
  "delicate_synthesis",
  "precise_touch",
  "focused_synthesis",
  "focused_touch",
  "prudent_touch",
  "manipulation",
  "groundwork",
  "byregots_blessing",
];

const BASE_CRAFTING_RECIPES = [
  {
    id: "cloth_travelers_wraps",
    skill: "Clothier",
    minLevel: 1,
    name: "Stitch Traveler Wraps",
    description: "Tailor durable cloth wrappings for agile adventuring.",
    costs: [{ id: "fiber_bundle", qty: 4 }, { id: "herb_bundle", qty: 1 }],
    output: {
      kind: "equipment",
      equipment: {
        slot: "Hands",
        name: "Traveler Wraps",
        levelReqBase: 1,
        modifiers: { Health: 5, RangedDefense: 1, MagicDefense: 1, Luck: 1 },
      },
    },
    xp: 15,
  },
  {
    id: "cloth_spellweave_robe",
    skill: "Clothier",
    minLevel: 6,
    name: "Tailor Spellweave Robe",
    description: "Craft a lined robe that favors magic and light defense.",
    costs: [{ id: "fiber_bundle", qty: 5 }, { id: "arcane_dust", qty: 2 }, { id: "beast_hide", qty: 1 }],
    output: {
      kind: "equipment",
      equipment: {
        slot: "Chest",
        name: "Spellweave Robe",
        levelReqBase: 4,
        modifiers: { Health: 7, MagicAttack: 2, MagicDefense: 2, RangedDefense: 1 },
      },
    },
    xp: 22,
  },
  {
    id: "smith_iron_blade",
    skill: "Smithing",
    minLevel: 1,
    name: "Forge Iron Blade",
    description: "Craft a balanced melee weapon.",
    costs: [{ id: "iron_ore", qty: 4 }, { id: "hardwood_log", qty: 1 }],
    output: {
      kind: "equipment",
      equipment: {
        slot: "Weapon",
        attackType: "Melee",
        weaponFamily: "sword",
        name: "Forged Iron Blade",
        levelReqBase: 1,
        damageDie: 8,
        speed: 6,
        damageKind: "Slash",
        hitBonus: 1,
        critBonus: 2,
        summary: "Balanced forged blade with reliable sword techniques.",
        modifiers: { MeleeAttack: 2 },
      },
    },
    xp: 16,
  },
  {
    id: "smith_reinforced_helm",
    skill: "Smithing",
    minLevel: 5,
    name: "Forge Reinforced Helm",
    description: "Craft a sturdy metal helm.",
    costs: [{ id: "iron_ore", qty: 5 }, { id: "beast_hide", qty: 2 }],
    output: {
      kind: "equipment",
      equipment: {
        slot: "Head",
        name: "Reinforced Helm",
        levelReqBase: 3,
        modifiers: { Health: 6, MeleeDefense: 2, RangedDefense: 1 },
      },
    },
    xp: 20,
  },
  {
    id: "wood_hunter_bow",
    skill: "Woodworking",
    minLevel: 1,
    name: "Carve Hunter Bow",
    description: "Craft a ranged weapon from hardwood and fibers.",
    costs: [{ id: "hardwood_log", qty: 4 }, { id: "fiber_bundle", qty: 2 }],
    output: {
      kind: "equipment",
      equipment: {
        slot: "Weapon",
        attackType: "Ranged",
        weaponFamily: "bow",
        name: "Hunter Bow",
        levelReqBase: 1,
        damageDie: 8,
        speed: 7,
        damageKind: "Pierce",
        hitBonus: 1,
        critBonus: 3,
        summary: "Reliable bow that supports classic archer pressure.",
        modifiers: { RangedAttack: 2 },
      },
    },
    xp: 16,
  },
  {
    id: "wood_oak_focus_staff",
    skill: "Woodworking",
    minLevel: 6,
    name: "Shape Oak Focus Staff",
    description: "Craft a stable magic staff.",
    costs: [{ id: "hardwood_log", qty: 4 }, { id: "arcane_dust", qty: 2 }],
    output: {
      kind: "equipment",
      equipment: {
        slot: "Weapon",
        attackType: "Magic",
        weaponFamily: "magic_staff",
        name: "Oak Focus Staff",
        levelReqBase: 4,
        damageDie: 7,
        speed: 6,
        damageKind: "Arcane",
        hitBonus: 1,
        critBonus: 2,
        summary: "Stable staff for invoker-style spellcasting.",
        modifiers: { MagicAttack: 2 },
      },
    },
    xp: 22,
  },
  {
    id: "cook_hearty_stew",
    skill: "Cooking",
    minLevel: 1,
    name: "Cook Hearty Stew",
    description: "Prepare restorative food from fish and herbs.",
    costs: [{ id: "fresh_fish", qty: 2 }, { id: "herb_bundle", qty: 2 }],
    output: { kind: "consumable", id: "hearty_stew", quantity: 2 },
    xp: 14,
  },
  {
    id: "cook_anglers_stew",
    skill: "Cooking",
    minLevel: 8,
    name: "Cook Angler's Stew",
    description: "Prepare an advanced meal for stronger healing.",
    costs: [{ id: "fresh_fish", qty: 3 }, { id: "herb_bundle", qty: 3 }, { id: "river_scale", qty: 1 }],
    output: { kind: "consumable", id: "anglers_stew", quantity: 1 },
    xp: 24,
  },
  {
    id: "leather_hunters_vest",
    skill: "Leatherworking",
    minLevel: 1,
    name: "Stitch Hunter's Vest",
    description: "Craft light defensive armor from hides.",
    costs: [{ id: "beast_hide", qty: 4 }, { id: "fiber_bundle", qty: 2 }],
    output: {
      kind: "equipment",
      equipment: {
        slot: "Chest",
        name: "Hunter's Vest",
        levelReqBase: 2,
        modifiers: { Health: 8, MeleeDefense: 2, RangedDefense: 2 },
      },
    },
    xp: 17,
  },
  {
    id: "leather_tracker_gloves",
    skill: "Leatherworking",
    minLevel: 5,
    name: "Stitch Tracker Gloves",
    description: "Craft gloves with balanced offense and control.",
    costs: [{ id: "beast_hide", qty: 3 }, { id: "hardwood_log", qty: 1 }],
    output: {
      kind: "equipment",
      equipment: {
        slot: "Hands",
        name: "Tracker Gloves",
        levelReqBase: 4,
        modifiers: { MeleeAttack: 1, RangedAttack: 1, CriticalChance: 2 },
      },
    },
    xp: 20,
  },
  {
    id: "alchemy_greater_potion",
    skill: "Alchemy",
    minLevel: 1,
    name: "Brew Greater Potion",
    description: "Refine herbal reagents into a stronger potion.",
    costs: [{ id: "herb_bundle", qty: 3 }, { id: "slime_gel", qty: 2 }],
    output: { kind: "consumable", id: "greater_potion", quantity: 1 },
    xp: 16,
  },
  {
    id: "alchemy_focus_tonic",
    skill: "Alchemy",
    minLevel: 7,
    name: "Distill Focus Tonic",
    description: "Produce a combat tonic for critical precision.",
    costs: [{ id: "herb_bundle", qty: 3 }, { id: "arcane_dust", qty: 2 }, { id: "river_scale", qty: 1 }],
    output: { kind: "consumable", id: "focus_tonic", quantity: 1 },
    xp: 24,
  },
  {
    id: "jewel_apprentice_ring",
    skill: "Jewelcrafting",
    minLevel: 1,
    name: "Set Apprentice Ring",
    description: "Mount a simple gemstone into a light silver band.",
    costs: [{ id: "silver_ore", qty: 2 }, { id: "gem_shard", qty: 1 }],
    output: {
      kind: "equipment",
      equipment: {
        slot: "Accessory1",
        name: "Apprentice Ring",
        levelReqBase: 1,
        modifiers: { Health: 4, CriticalChance: 1, Luck: 1 },
      },
    },
    xp: 16,
  },
  {
    id: "jewel_guardian_charm",
    skill: "Jewelcrafting",
    minLevel: 7,
    name: "Assemble Guardian Charm",
    description: "Craft a warded charm with balanced defenses for long trips.",
    costs: [{ id: "silver_ore", qty: 3 }, { id: "gem_shard", qty: 2 }, { id: "arcane_dust", qty: 1 }],
    output: {
      kind: "equipment",
      equipment: {
        slot: "Accessory2",
        name: "Guardian Charm",
        levelReqBase: 5,
        modifiers: { Health: 6, MeleeDefense: 1, RangedDefense: 1, MagicDefense: 1, Luck: 1 },
      },
    },
    xp: 24,
  },
];

const CRAFTING_RECIPE_STAGE_LEVELS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const CRAFTING_RECIPE_STAGE_NAMES = ["Journeyman", "Sturdy", "Veteran", "Knight", "Runed", "Warborn", "Heroic", "Relic", "Ancient", "Ascendant"];
const CRAFTING_RECIPE_VERBS = {
  Clothier: "Tailor",
  Smithing: "Forge",
  Woodworking: "Shape",
  Cooking: "Prepare",
  Leatherworking: "Stitch",
  Alchemy: "Distill",
};
const CRAFTING_RECIPE_BLUEPRINTS = {
  Clothier: [
    {
      key: "wayfarer_wraps",
      baseName: "Wayfarer Wraps",
      description: "Tailor quick-travel wraps that keep hands steady and ward off light elemental pressure.",
      costs: [{ id: "fiber_bundle", qty: 4, scale: 0.8 }, { id: "herb_bundle", qty: 1, scale: 0.35 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Hands",
          name: "Wayfarer Wraps",
          levelReqBase: 10,
          modifiers: { Health: 5, RangedDefense: 1, MagicDefense: 1, Luck: 1 },
        },
      },
      baseXp: 20,
    },
    {
      key: "mystic_hood",
      baseName: "Mystic Hood",
      description: "Sew a hood lined for focus and magical insulation.",
      costs: [{ id: "fiber_bundle", qty: 5, scale: 0.9 }, { id: "arcane_dust", qty: 2, scale: 0.45 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Head",
          name: "Mystic Hood",
          levelReqBase: 10,
          modifiers: { Health: 6, MagicAttack: 2, MagicDefense: 2, Luck: 1 },
        },
      },
      baseXp: 22,
    },
    {
      key: "spellcoat",
      baseName: "Spellcoat",
      description: "Tailor a robe-coat that balances travel durability and spell throughput.",
      costs: [{ id: "fiber_bundle", qty: 6, scale: 1 }, { id: "arcane_dust", qty: 2, scale: 0.5 }, { id: "beast_hide", qty: 1, scale: 0.2 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Chest",
          name: "Spellcoat",
          levelReqBase: 10,
          modifiers: { Health: 8, MagicAttack: 2, MagicDefense: 3, RangedDefense: 1 },
        },
      },
      baseXp: 24,
    },
    {
      key: "wind_sash",
      baseName: "Wind Sash",
      description: "Thread a charm sash that improves evasive travel and lucky finds.",
      costs: [{ id: "fiber_bundle", qty: 4, scale: 0.7 }, { id: "herb_bundle", qty: 2, scale: 0.35 }, { id: "arcane_dust", qty: 1, scale: 0.25 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Accessory1",
          name: "Wind Sash",
          levelReqBase: 10,
          modifiers: { Health: 4, MagicDefense: 2, Luck: 2, CriticalChance: 1 },
        },
      },
      baseXp: 23,
    },
  ],
  Smithing: [
    {
      key: "trail_blade",
      baseName: "Trail Blade",
      description: "Forge a balanced blade for reliable melee pressure.",
      costs: [{ id: "iron_ore", qty: 4, scale: 0.9 }, { id: "hardwood_log", qty: 1, scale: 0.15 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Weapon",
          attackType: "Melee",
          weaponFamily: "sword",
          name: "Trail Blade",
          levelReqBase: 10,
          damageDie: 8,
          speed: 6,
          damageKind: "Slash",
          hitBonus: 1,
          critBonus: 2,
          summary: "Balanced forged sword with dependable tempo.",
          modifiers: { MeleeAttack: 2 },
        },
      },
      baseXp: 21,
    },
    {
      key: "warden_helm",
      baseName: "Warden Helm",
      description: "Shape a durable helm that stabilizes incoming melee and ranged hits.",
      costs: [{ id: "iron_ore", qty: 5, scale: 0.95 }, { id: "beast_hide", qty: 2, scale: 0.25 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Head",
          name: "Warden Helm",
          levelReqBase: 10,
          modifiers: { Health: 7, MeleeDefense: 2, RangedDefense: 2 },
        },
      },
      baseXp: 22,
    },
    {
      key: "bulwark_plate",
      baseName: "Bulwark Plate",
      description: "Forge a chestpiece built for front-line punishment.",
      costs: [{ id: "iron_ore", qty: 6, scale: 1 }, { id: "iron_scrap", qty: 3, scale: 0.5 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Chest",
          name: "Bulwark Plate",
          levelReqBase: 10,
          modifiers: { Health: 10, MeleeDefense: 3, RangedDefense: 2 },
        },
      },
      baseXp: 25,
    },
    {
      key: "striker_gauntlets",
      baseName: "Striker Gauntlets",
      description: "Temper gauntlets that turn controlled swings into heavy impact.",
      costs: [{ id: "iron_ore", qty: 5, scale: 0.85 }, { id: "beast_fang", qty: 1, scale: 0.2 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Hands",
          name: "Striker Gauntlets",
          levelReqBase: 10,
          modifiers: { Health: 6, MeleeAttack: 2, MeleeDefense: 2, CriticalChance: 1 },
        },
      },
      baseXp: 23,
    },
    {
      key: "dragoon_spear",
      baseName: "Dragoon Spear",
      description: "Forge a long spear with strong reach and precise finishing pressure.",
      costs: [{ id: "iron_ore", qty: 5, scale: 0.95 }, { id: "hardwood_log", qty: 2, scale: 0.2 }, { id: "beast_fang", qty: 1, scale: 0.15 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Weapon",
          attackType: "Melee",
          weaponFamily: "spear",
          name: "Dragoon Spear",
          levelReqBase: 10,
          damageDie: 8,
          speed: 7,
          damageKind: "Pierce",
          hitBonus: 2,
          critBonus: 2,
          summary: "Reach-heavy spear that rewards clean timing and hit rate.",
          modifiers: { MeleeAttack: 2, Luck: 1 },
        },
      },
      baseXp: 24,
    },
  ],
  Woodworking: [
    {
      key: "hunter_bow",
      baseName: "Hunter Bow",
      description: "Shape a dependable bow from seasoned timber and bindings.",
      costs: [{ id: "hardwood_log", qty: 4, scale: 0.8 }, { id: "fiber_bundle", qty: 2, scale: 0.3 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Weapon",
          attackType: "Ranged",
          weaponFamily: "bow",
          name: "Hunter Bow",
          levelReqBase: 10,
          damageDie: 8,
          speed: 7,
          damageKind: "Pierce",
          hitBonus: 1,
          critBonus: 3,
          summary: "Reliable bow built for steady ranged pressure.",
          modifiers: { RangedAttack: 2 },
        },
      },
      baseXp: 21,
    },
    {
      key: "oak_focus_staff",
      baseName: "Oak Focus Staff",
      description: "Shape a stable casting staff from old wood and arcane dust.",
      costs: [{ id: "hardwood_log", qty: 4, scale: 0.85 }, { id: "arcane_dust", qty: 2, scale: 0.45 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Weapon",
          attackType: "Magic",
          weaponFamily: "magic_staff",
          name: "Oak Focus Staff",
          levelReqBase: 10,
          damageDie: 7,
          speed: 6,
          damageKind: "Arcane",
          hitBonus: 1,
          critBonus: 2,
          summary: "Stable focus staff that rewards measured spellcasting.",
          modifiers: { MagicAttack: 2, MagicDefense: 1 },
        },
      },
      baseXp: 23,
    },
    {
      key: "fletcher_gloves",
      baseName: "Fletcher Gloves",
      description: "Craft gloves that improve precision and string control.",
      costs: [{ id: "hardwood_log", qty: 3, scale: 0.65 }, { id: "fiber_bundle", qty: 2, scale: 0.35 }, { id: "beast_hide", qty: 1, scale: 0.2 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Hands",
          name: "Fletcher Gloves",
          levelReqBase: 10,
          modifiers: { Health: 5, RangedAttack: 2, CriticalChance: 2, Luck: 1 },
        },
      },
      baseXp: 22,
    },
    {
      key: "runed_talisman",
      baseName: "Runed Talisman",
      description: "Carve a talisman that enhances magical control and ranged steadiness.",
      costs: [{ id: "hardwood_log", qty: 3, scale: 0.6 }, { id: "arcane_dust", qty: 2, scale: 0.35 }, { id: "fiber_bundle", qty: 1, scale: 0.15 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Accessory1",
          name: "Runed Talisman",
          levelReqBase: 10,
          modifiers: { Health: 4, RangedAttack: 1, MagicAttack: 2, MagicDefense: 1, Luck: 1 },
        },
      },
      baseXp: 23,
    },
  ],
  Cooking: [
    {
      key: "trail_skewers",
      baseName: "Trail Skewers",
      description: "Prepare quick trail food that keeps a party moving.",
      costs: [{ id: "fresh_fish", qty: 2, scale: 0.3 }, { id: "herb_bundle", qty: 1, scale: 0.25 }],
      output: { kind: "consumable", id: "trail_skewers", quantity: 2 },
      quantityStep: 4,
      baseXp: 19,
    },
    {
      key: "smoked_filet",
      baseName: "Smoked Filet",
      description: "Slow-cook fish and herbs into a dependable recovery meal.",
      costs: [{ id: "fresh_fish", qty: 3, scale: 0.35 }, { id: "herb_bundle", qty: 2, scale: 0.25 }],
      output: { kind: "consumable", id: "smoked_filet", quantity: 2 },
      quantityStep: 4,
      baseXp: 21,
    },
    {
      key: "anglers_stew",
      baseName: "Angler's Stew",
      description: "Cook a restorative stew from river fish, herbs, and choice scales.",
      costs: [{ id: "fresh_fish", qty: 3, scale: 0.4 }, { id: "herb_bundle", qty: 3, scale: 0.35 }, { id: "river_scale", qty: 1, scale: 0.1 }],
      output: { kind: "consumable", id: "anglers_stew", quantity: 1 },
      quantityStep: 3,
      baseXp: 22,
    },
    {
      key: "battle_broth",
      baseName: "Battle Broth",
      description: "Reduce a dense broth built for deep dungeon recovery.",
      costs: [{ id: "fresh_fish", qty: 4, scale: 0.45 }, { id: "herb_bundle", qty: 3, scale: 0.35 }, { id: "beast_hide", qty: 1, scale: 0.1 }],
      output: { kind: "consumable", id: "battle_broth", quantity: 1 },
      quantityStep: 3,
      baseXp: 24,
    },
    {
      key: "hero_feast",
      baseName: "Hero Feast",
      description: "Prepare an extravagant meal worthy of endgame hunts.",
      costs: [{ id: "fresh_fish", qty: 4, scale: 0.45 }, { id: "herb_bundle", qty: 4, scale: 0.4 }, { id: "river_scale", qty: 2, scale: 0.18 }],
      output: { kind: "consumable", id: "hero_feast", quantity: 1 },
      quantityStep: 4,
      baseXp: 26,
    },
  ],
  Leatherworking: [
    {
      key: "hunters_vest",
      baseName: "Hunter Vest",
      description: "Stitch a practical leather vest for steady field defense.",
      costs: [{ id: "beast_hide", qty: 4, scale: 0.85 }, { id: "fiber_bundle", qty: 2, scale: 0.25 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Chest",
          name: "Hunter Vest",
          levelReqBase: 10,
          modifiers: { Health: 8, MeleeDefense: 2, RangedDefense: 2 },
        },
      },
      baseXp: 21,
    },
    {
      key: "tracker_gloves",
      baseName: "Tracker Gloves",
      description: "Cut gloves that keep grip and shot control under pressure.",
      costs: [{ id: "beast_hide", qty: 3, scale: 0.7 }, { id: "hardwood_log", qty: 1, scale: 0.15 }, { id: "fiber_bundle", qty: 1, scale: 0.2 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Hands",
          name: "Tracker Gloves",
          levelReqBase: 10,
          modifiers: { Health: 5, MeleeAttack: 1, RangedAttack: 2, CriticalChance: 2 },
        },
      },
      baseXp: 22,
    },
    {
      key: "stalker_boots",
      baseName: "Stalker Boots",
      description: "Craft low-profile boots built for long hunts and clean footing.",
      costs: [{ id: "beast_hide", qty: 4, scale: 0.8 }, { id: "fiber_bundle", qty: 2, scale: 0.25 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Legs",
          name: "Stalker Boots",
          levelReqBase: 10,
          modifiers: { Health: 7, MeleeDefense: 2, RangedDefense: 2, Luck: 1 },
        },
      },
      baseXp: 23,
    },
    {
      key: "hide_hood",
      baseName: "Hide Hood",
      description: "Shape a hunter's hood that sharpens awareness and ranged defense.",
      costs: [{ id: "beast_hide", qty: 3, scale: 0.7 }, { id: "beast_fang", qty: 1, scale: 0.15 }, { id: "fiber_bundle", qty: 1, scale: 0.2 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Head",
          name: "Hide Hood",
          levelReqBase: 10,
          modifiers: { Health: 6, RangedAttack: 1, RangedDefense: 2, Luck: 2 },
        },
      },
      baseXp: 22,
    },
  ],
  Alchemy: [
    {
      key: "greater_potion",
      baseName: "Greater Potion",
      description: "Refine herbs and gel into a dependable healing draught.",
      costs: [{ id: "herb_bundle", qty: 3, scale: 0.35 }, { id: "slime_gel", qty: 2, scale: 0.25 }],
      output: { kind: "consumable", id: "greater_potion", quantity: 2 },
      quantityStep: 4,
      baseXp: 20,
    },
    {
      key: "focus_tonic",
      baseName: "Focus Tonic",
      description: "Stabilize arcane reagents into a sharper critical tonic.",
      costs: [{ id: "herb_bundle", qty: 3, scale: 0.3 }, { id: "arcane_dust", qty: 2, scale: 0.35 }, { id: "river_scale", qty: 1, scale: 0.08 }],
      output: { kind: "consumable", id: "focus_tonic", quantity: 1 },
      quantityStep: 3,
      baseXp: 22,
    },
    {
      key: "volatile_flask",
      baseName: "Volatile Flask",
      description: "Bottle an unstable offensive reagent for combat burst.",
      costs: [{ id: "slime_gel", qty: 3, scale: 0.35 }, { id: "arcane_dust", qty: 2, scale: 0.3 }, { id: "beast_fang", qty: 1, scale: 0.08 }],
      output: { kind: "consumable", id: "volatile_flask", quantity: 1 },
      quantityStep: 3,
      baseXp: 24,
    },
    {
      key: "prime_elixir",
      baseName: "Prime Elixir",
      description: "Distill a top-end restorative elixir for level-cap content.",
      costs: [{ id: "herb_bundle", qty: 4, scale: 0.4 }, { id: "arcane_dust", qty: 3, scale: 0.35 }, { id: "river_scale", qty: 1, scale: 0.12 }],
      output: { kind: "consumable", id: "prime_elixir", quantity: 1 },
      quantityStep: 4,
      baseXp: 25,
    },
    {
      key: "precision_elixir",
      baseName: "Precision Elixir",
      description: "Prepare a refined elixir that sharply raises finishing accuracy.",
      costs: [{ id: "herb_bundle", qty: 3, scale: 0.35 }, { id: "arcane_dust", qty: 3, scale: 0.35 }, { id: "beast_fang", qty: 1, scale: 0.1 }],
      output: { kind: "consumable", id: "precision_elixir", quantity: 1 },
      quantityStep: 4,
      baseXp: 24,
    },
  ],
  Jewelcrafting: [
    {
      key: "sunband",
      baseName: "Sunband Ring",
      description: "Set a bright stone into a precise ring that improves finishing accuracy and luck.",
      costs: [{ id: "silver_ore", qty: 3, scale: 0.45 }, { id: "gem_shard", qty: 2, scale: 0.35 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Accessory1",
          name: "Sunband Ring",
          levelReqBase: 10,
          modifiers: { Health: 4, CriticalChance: 2, Luck: 2 },
        },
      },
      baseXp: 22,
    },
    {
      key: "ward_charm",
      baseName: "Ward Charm",
      description: "Assemble a balanced charm that shores up all three defense lanes.",
      costs: [{ id: "silver_ore", qty: 3, scale: 0.4 }, { id: "gem_shard", qty: 2, scale: 0.35 }, { id: "arcane_dust", qty: 1, scale: 0.12 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Accessory2",
          name: "Ward Charm",
          levelReqBase: 10,
          modifiers: { Health: 6, MeleeDefense: 1, RangedDefense: 1, MagicDefense: 2, Luck: 1 },
        },
      },
      baseXp: 23,
    },
    {
      key: "hunters_brooch",
      baseName: "Hunter Brooch",
      description: "Pin a cut gem into a brooch tuned for scouting, ranged focus, and clean crit setups.",
      costs: [{ id: "silver_ore", qty: 3, scale: 0.4 }, { id: "gem_shard", qty: 2, scale: 0.35 }, { id: "beast_fang", qty: 1, scale: 0.1 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Accessory1",
          name: "Hunter Brooch",
          levelReqBase: 10,
          modifiers: { Health: 5, RangedAttack: 2, CriticalChance: 1, Luck: 2 },
        },
      },
      baseXp: 24,
    },
    {
      key: "focus_loop",
      baseName: "Focus Loop",
      description: "Bind arcane dust and gemstone facets into a loop for caster control.",
      costs: [{ id: "silver_ore", qty: 3, scale: 0.4 }, { id: "gem_shard", qty: 2, scale: 0.35 }, { id: "arcane_dust", qty: 2, scale: 0.18 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Accessory2",
          name: "Focus Loop",
          levelReqBase: 10,
          modifiers: { Health: 4, MagicAttack: 2, MagicDefense: 2, CriticalChance: 1 },
        },
      },
      baseXp: 24,
    },
    {
      key: "sovereign_seal",
      baseName: "Sovereign Seal",
      description: "Craft a premium seal that gives broad accessory value for late-game builds.",
      costs: [{ id: "silver_ore", qty: 4, scale: 0.5 }, { id: "gem_shard", qty: 3, scale: 0.4 }, { id: "river_scale", qty: 1, scale: 0.12 }],
      output: {
        kind: "equipment",
        equipment: {
          slot: "Accessory1",
          name: "Sovereign Seal",
          levelReqBase: 10,
          modifiers: { Health: 7, MeleeAttack: 1, MagicDefense: 2, CriticalChance: 1, Luck: 2 },
        },
      },
      baseXp: 25,
    },
  ],
};

function scaleCraftingTemplateModifiers(modifiers = {}, stageIndex = 0) {
  const progress = stageIndex + 1;
  const scaled = {};
  Object.entries(modifiers).forEach(([stat, value]) => {
    const baseValue = Math.max(0, Number(value) || 0);
    const growth = stat === "Health"
      ? progress * 3
      : stat === "CriticalChance" || stat === "Luck"
        ? Math.floor(progress * 0.8)
        : Math.ceil(progress * 1.1);
    scaled[stat] = Math.max(1, baseValue + growth);
  });
  return scaled;
}

function buildScaledRecipeCosts(costs = [], stageIndex = 0) {
  const progress = stageIndex + 1;
  return costs.map((cost) => ({
    id: cost.id,
    qty: Math.max(1, Math.floor((cost.qty || 1) + progress * (cost.scale || 0.3))),
  }));
}

function buildProgressionRecipe(skillName, blueprint, stageIndex) {
  const minLevel = CRAFTING_RECIPE_STAGE_LEVELS[stageIndex];
  const stageName = CRAFTING_RECIPE_STAGE_NAMES[stageIndex];
  const verb = CRAFTING_RECIPE_VERBS[skillName] || "Craft";
  const recipeName = `${verb} ${stageName} ${blueprint.baseName}`;
  const description = `${blueprint.description} Tuned for ${skillName.toLowerCase()} progression through level ${minLevel}.`;
  const costs = buildScaledRecipeCosts(blueprint.costs, stageIndex);
  const xp = Math.max(20, Math.round((blueprint.baseXp || 20) + (stageIndex + 1) * 8));
  if (blueprint.output?.kind === "equipment") {
    const template = blueprint.output.equipment || {};
    const equipment = {
      ...template,
      name: `${stageName} ${template.name || blueprint.baseName}`.trim(),
      levelReqBase: minLevel,
      modifiers: scaleCraftingTemplateModifiers(template.modifiers || {}, stageIndex),
    };
    if (equipment.slot === "Weapon") {
      equipment.damageDie = Math.max(4, Math.floor((template.damageDie || 6) + Math.floor((stageIndex + 1) / 2)));
      equipment.hitBonus = Math.floor((template.hitBonus || 0) + Math.floor((stageIndex + 1) / 3));
      equipment.critBonus = Math.floor((template.critBonus || 0) + Math.floor((stageIndex + 1) / 2));
      equipment.speed = clamp((template.speed || 6) + (stageIndex >= 7 ? 1 : 0), 2, 10);
    }
    return {
      id: `${toId(skillName)}_${blueprint.key}_${minLevel}`,
      skill: skillName,
      minLevel,
      name: recipeName,
      description,
      costs,
      output: { kind: "equipment", equipment },
      xp,
    };
  }
  const output = {
    ...blueprint.output,
    quantity: Math.max(1, Math.floor((blueprint.output?.quantity || 1) + Math.floor((stageIndex + 1) / (blueprint.quantityStep || 4)))),
  };
  return {
    id: `${toId(skillName)}_${blueprint.key}_${minLevel}`,
    skill: skillName,
    minLevel,
    name: recipeName,
    description,
    costs,
    output,
    xp,
  };
}

function buildTieredCraftingRecipes() {
  const recipes = [];
  Object.entries(CRAFTING_RECIPE_BLUEPRINTS).forEach(([skillName, blueprints]) => {
    CRAFTING_RECIPE_STAGE_LEVELS.forEach((level, stageIndex) => {
      const blueprint = blueprints[stageIndex % blueprints.length];
      recipes.push(buildProgressionRecipe(skillName, blueprint, stageIndex));
    });
  });
  return recipes;
}

const CRAFTING_RECIPES = [...BASE_CRAFTING_RECIPES, ...buildTieredCraftingRecipes()];

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

const QUEST_BOARD_ACTIVE_TARGET = 10;
const QUEST_ARCHIVE_LIMIT = 40;
const QUEST_STAGE_LABELS = ["Local", "Road", "Frontier", "Guild", "Expedition", "Veteran", "Heroic", "Mythic"];
const QUEST_QUALITY_ORDER = { rough: 0, good: 1, great: 2, perfect: 3 };
const QUEST_ROLE_TARGETS = ["merchant", "guard", "scholar", "hunter", "healer", "bard"];
const QUEST_VISIT_VERBS = ["Check In With", "Report To", "Survey", "Reinforce", "Secure"];
const QUEST_DUNGEON_VERBS = ["Break", "Silence", "Clear", "Seal", "Crack"];
const QUEST_BIOME_ACTIONS = {
  road: ["Patrol", "Escort", "Sweep"],
  plains: ["Sweep", "Thin", "Drive Back"],
  forest: ["Cull", "Track", "Purge"],
  swamp: ["Burn Out", "Thin", "Map"],
  badlands: ["Hunt", "Break", "Push Through"],
};
const GATHERING_SKILL_QUEST_COPY = {
  Botany: {
    title: ["Herbal Relief", "Field Salves", "Rootstock Reserve"],
    description: "Gather {target} total materials with Botany to keep fibers, herbs, and leafhide stocked.",
  },
  Mining: {
    title: ["Ore Ledger", "Forge Reserve", "Vein Survey"],
    description: "Gather {target} total materials with Mining for ore, crystal, and gem supply.",
  },
  Fishing: {
    title: ["Camp Rations", "River Supply", "Fresh Catch Circuit"],
    description: "Gather {target} total materials with Fishing to feed the road crews and stock scales, gel, and spines.",
  },
};
const CRAFTING_SKILL_QUEST_COPY = {
  Clothier: ["Tailor Field Gear", "Repair Marching Wraps", "Stitch Weatherproof Layers"],
  Smithing: ["Forge Frontline Steel", "Temper Spare Weapons", "Rebuild the Watch Rack"],
  Woodworking: ["Shape Trail Weapons", "Refit Expedition Frames", "Carve Ranged Stock"],
  Cooking: ["Prepare Camp Stores", "Cook for the Vanguard", "Stock the Road Kitchens"],
  Leatherworking: ["Patch Travel Harness", "Cut New Field Hides", "Bind Scout Armor"],
  Alchemy: ["Distill Combat Tonics", "Brew Expedition Drafts", "Stabilize Reagent Stock"],
  Jewelcrafting: ["Set Lucky Charms", "Mount Warding Stones", "Assemble Signal Brooches"],
};
const NPC_TEMPERAMENTS = ["brisk", "dry", "warm", "paranoid", "measured", "cheerful", "weary", "boastful"];
const NPC_QUIRKS = [
  "counts wagon wheels under their breath",
  "keeps checking the skyline for trouble",
  "talks like every rumor should be invoiced",
  "treats every campfire like a strategy table",
  "swears the roads listen back at night",
  "never stops polishing a lucky charm",
  "remembers the name of every beast they have ever hated",
  "trusts maps more than mayors",
];
const NPC_WORLD_REACTIONS = [
  "The roads feel thinner this week, but trouble is learning new routes.",
  "Every victory buys peace for about ten minutes before the next mess arrives.",
  "People are sleeping easier, which usually means monsters are planning overtime.",
  "Supply lines are breathing again, but the wilds still look hungry.",
  "The settlements are steadier than they were, though nobody trusts calm for long.",
];

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
    options: "Options [N]",
    menu: "Menu [M]",
    hint: "Keyboard: Move WASD/Arrows. Character menu C. Map fullscreen V. Zoom +/-/0. Quick open: I/E/U/Y/Q/K/O/H/R/N.",
  },
  controller: {
    interact: "Action (A)",
    character: "Character (Y)",
    shop: "Shop (Action)",
    talk: "Talk (Action)",
    save: "Save (START)",
    options: "Options (VIEW)",
    menu: "Menu (B)",
    hint: "Controller: Move D-pad/Left Stick. A = contextual action. Character menu Y. Fullscreen map X. Zoom LB/RB. VIEW opens options. Scroll Right Stick. Crafting via Interact in towns/cities.",
  },
};

const CHARACTER_MODAL_TABS = ["character", "inventory", "equipment", "crafting", "skills", "mastery", "levelup", "quests", "bestiary", "story", "achievements"];
const CHARACTER_MODAL_LABELS = {
  character: "Summary",
  inventory: "Inventory",
  equipment: "Equipment",
  crafting: "Crafting",
  skills: "Skills",
  mastery: "Mastery",
  levelup: "Level Up",
  quests: "Quests",
  bestiary: "Bestiary",
  story: "Story",
  achievements: "Achievements",
};
const INVENTORY_TABS = [
  { id: "consumables", label: "Consumables" },
  { id: "equipment", label: "Equipment" },
  { id: "tools", label: "Tools" },
  { id: "stations", label: "Stations" },
  { id: "materials", label: "Materials" },
  { id: "treasures", label: "Treasure" },
];
const CRAFTING_SKILL_TABS = SKILL_ORDER
  .filter((skillName) => SKILL_DEFS[skillName].role === "Crafting")
  .map((skillName) => ({ id: skillName, label: skillName }));

const els = {
  app: document.getElementById("app"),
  screens: {
    menu: document.getElementById("screen-menu"),
    load: document.getElementById("screen-load"),
    intro: document.getElementById("screen-intro"),
    create: document.getElementById("screen-create"),
    options: document.getElementById("screen-options"),
    world: document.getElementById("screen-world"),
    combat: document.getElementById("screen-combat"),
  },
  menuMessage: document.getElementById("menu-message"),
  loadSummary: document.getElementById("load-summary"),
  loadSlots: document.getElementById("load-slots"),
  loadBack: document.getElementById("load-back"),
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
  worldInteractPopup: document.getElementById("world-interact-popup"),
  mapLegend: document.getElementById("map-legend"),
  playerSummary: document.getElementById("player-summary"),
  playerStats: document.getElementById("player-stats"),
  worldContext: document.getElementById("world-context"),
  worldLog: document.getElementById("world-log"),
  worldSkills: document.getElementById("world-skills"),
  worldHudLayout: document.getElementById("world-hud-layout"),
  worldInteract: document.getElementById("world-interact"),
  worldDebug: document.getElementById("world-debug"),
  worldCharacter: document.getElementById("world-character"),
  worldShop: document.getElementById("world-shop"),
  worldTalk: document.getElementById("world-talk"),
  worldSave: document.getElementById("world-save"),
  worldOptions: document.getElementById("world-options"),
  worldMenu: document.getElementById("world-menu"),
  worldMapToggle: document.getElementById("world-map-toggle"),
  worldViewportMode: document.getElementById("world-viewport-mode"),
  worldViewportOrientation: document.getElementById("world-viewport-orientation"),
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
  modalWindow: document.getElementById("modal-window"),
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
    debugNoEncounters: false,
    masterVolume: 0.8,
    musicVolume: 0.9,
    sfxVolume: 0.9,
  },
  game: null,
  combat: null,
  modal: null,
  modalData: null,
  characterUi: {
    inventoryTab: INVENTORY_TABS[0].id,
    craftingSkill: CRAFTING_SKILL_TABS[0]?.id || "Clothier",
  },
  gathering: null,
  craftingRun: null,
  saveSlots: [],
  activeSaveSlotId: null,
  optionsReturnScreen: "menu",
  inputMode: "keyboard",
  focusables: [],
  focusIndex: 0,
  gamepad: { previousButtons: [], axisXReadyAt: 0, axisYReadyAt: 0, scrollReadyAt: 0 },
  map: {
    fullscreen: false,
    zoom: DEFAULT_MAP_ZOOM,
    hudLayout: "side",
    viewportMode: "fit",
    viewportOrientation: "landscape",
  },
  mapRender: null,
  debug: {
    returnPosition: null,
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
  state.saveSlots = refreshSaveSlots();
  state.map = normalizeMapViewState(state.map);
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
  if (els.loadBack) {
    els.loadBack.addEventListener("click", () => showScreen("menu"));
  }
  if (els.loadSlots) {
    els.loadSlots.addEventListener("click", onLoadScreenAction);
  }

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
    focusButtonByDataset("style", state.creation.style);
  });

  els.weaponButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-weapon-id]");
    if (!button) return;
    state.creation.weaponId = button.dataset.weaponId;
    renderCreationSelectors();
    focusButtonByDataset("weaponId", state.creation.weaponId);
  });

  els.cityButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-city-id]");
    if (!button) return;
    state.creation.cityId = button.dataset.cityId;
    renderCreationSelectors();
    focusButtonByDataset("cityId", state.creation.cityId);
  });

  els.difficultyButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-difficulty]");
    if (!button) return;
    state.creation.difficulty = button.dataset.difficulty;
    renderCreationSelectors();
    focusButtonByDataset("difficulty", state.creation.difficulty);
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
  els.optionsBack.addEventListener("click", closeOptionsScreen);

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
      addWorldLog("Debug mode enabled. Hotkeys: Ctrl+Shift+D menu, L level, G gold, H heal, X XP.");
    } else {
      if (state.modal === "debug") closeModal();
      addWorldLog("Debug mode disabled.");
    }
    renderWorld();
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
  if (els.worldDebug) els.worldDebug.addEventListener("click", openDebugMenu);
  els.worldCharacter.addEventListener("click", openCharacterMenu);
  els.worldShop.addEventListener("click", handleWorldInteract);
  els.worldTalk.addEventListener("click", handleWorldInteract);
  els.worldSave.addEventListener("click", saveGame);
  if (els.worldOptions) els.worldOptions.addEventListener("click", () => openOptionsScreen("world"));
  els.worldMenu.addEventListener("click", requestMainMenuReturn);
  if (els.worldMapToggle) els.worldMapToggle.addEventListener("click", toggleMapFullscreen);
  if (els.worldHudLayout) els.worldHudLayout.addEventListener("click", toggleWorldHudLayout);
  if (els.worldViewportMode) els.worldViewportMode.addEventListener("click", cycleWorldViewportMode);
  if (els.worldViewportOrientation) els.worldViewportOrientation.addEventListener("click", cycleWorldViewportOrientation);
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
    if (handleCraftingEncounterHotkey(key)) {
      event.preventDefault();
      return;
    }
    if (key === "Escape" || key === "Backspace") {
      closeModal();
      event.preventDefault();
      return;
    }
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
  if (lower === "b") {
    toggleWorldHudLayout();
    event.preventDefault();
    return;
  }
  if (lower === "x") {
    cycleWorldViewportMode();
    event.preventDefault();
    return;
  }
  if (lower === "z") {
    cycleWorldViewportOrientation();
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
  } else if (lower === "y") {
    openModal("skills");
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
  } else if (lower === "n") {
    openOptionsScreen("world");
    event.preventDefault();
  } else if (lower === "r") {
    openCurrentCrafting();
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
  if (lower === "d") {
    openDebugMenu();
    event.preventDefault();
    return true;
  }
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
    showLoadScreen();
    return;
  }
  if (action === "options") {
    openOptionsScreen("menu");
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
      const family = getWeaponFamilyDefinition(selectedWeapon, selectedWeapon.attackType);
      els.weaponInfo.innerHTML = `
        <p><strong>${escapeHtml(selectedWeapon.name)}</strong> (${escapeHtml(selectedWeapon.attackType)} / ${escapeHtml(family.discipline)})</p>
        <div class="weapon-pills">
          <span class="weapon-pill">Damage 1d${selectedWeapon.damageDie}</span>
          <span class="weapon-pill">${escapeHtml(family.name)}</span>
          <span class="weapon-pill">Type ${escapeHtml(selectedWeapon.damageKind)}</span>
          <span class="weapon-pill">Speed ${getWeaponSpeed(selectedWeapon)}</span>
          <span class="weapon-pill">Hit ${hitText}</span>
          <span class="weapon-pill">Crit +${getWeaponCritBonus(selectedWeapon)}</span>
        </div>
        <p>${escapeHtml(selectedWeapon.summary || "No description.")}</p>
        <p><strong>Strengths:</strong> ${escapeHtml(family.strengths)}</p>
        <p><strong>Tradeoffs:</strong> ${escapeHtml(family.weaknesses)}</p>
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

  state.activeSaveSlotId = null;
  state.debug.returnPosition = null;
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
    playTimeMs: 0,
    sessionStartedAt: 0,
    questCycle: 0,
    runtimeRng: createRng(hashString(`${state.creation.seed}|runtime`)),
  };

  rebalanceWorldResourceNodes(world, player);
  addStartingItems(player);
  recalculatePlayerStats(player, true);
  player.currentHealth = player.derivedStats.Health;
  const difficultyInfo = getDifficulty();
  addWorldLog(`Welcome, ${player.name}. ${spawnCity.name} pretends this is a normal day.`);
  addWorldLog(`Difficulty: ${state.game.difficulty}. ${difficultyInfo.summary}`);
  addWorldLog(`Defeat Rule: ${difficultyInfo.deathRule}`);
  addWorldLog("Explore towns, dungeons, NPC camps, chests, and resource nodes. Use Interact on special locations.");
  addWorldLog("Gather through Botany, Mining, and Fishing nodes across the map. Craft in towns, cities, and field workshops.");
  addWorldLog(`Active quests posted: ${state.game.quests.filter((quest) => !quest.claimed).length}.`);
  renderWorld();
  showScreen("world");
  syncMusicForCurrentContext();
}

function createPlayer(name, style, selectedWeapon = null) {
  const styleData = COMBAT_STYLES[style] || COMBAT_STYLES.Melee;
  const styleKey = COMBAT_STYLES[style] ? style : "Melee";
  const starterTemplate = selectedWeapon || getDefaultWeaponForStyle(styleKey);
  const starterFamilyKey = getWeaponFamilyKey(starterTemplate, styleKey);
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
    worldEffects: [],
    position: { x: 0, y: 0 },
    equipment: { Weapon: null, Head: null, Chest: null, Hands: null, Legs: null, Accessory1: null, Accessory2: null },
    bag: [],
    unspentStatPoints: 0,
    skills: createDefaultSkillState(),
    weaponMastery: createDefaultWeaponMasteryState({ [starterFamilyKey]: 1 }),
  };
  player.equipment.Weapon = createStarterWeapon(starterTemplate);
  normalizeWeaponItem(player.equipment.Weapon);
  syncPlayerStyleToWeapon(player);
  return player;
}

function addStartingItems(player) {
  addConsumableToBag(player, "minor_potion", 4);
  addConsumableToBag(player, "smoke_bomb", 1);
  addConsumableToBag(player, "fire_bomb", 1);
  player.gold = 50;
}

function isGameplayScreen(screen) {
  return screen === "world" || screen === "combat";
}

function getCurrentGamePlayTimeMs(game) {
  if (!game) return 0;
  const stored = Math.max(0, Math.floor(game.playTimeMs || 0));
  if (!game.sessionStartedAt) return stored;
  return stored + Math.max(0, Date.now() - game.sessionStartedAt);
}

function syncGamePlaytimeForScreenChange(previousScreen, nextScreen) {
  const game = state.game;
  if (!game || previousScreen === nextScreen) return;
  const wasPlaying = isGameplayScreen(previousScreen);
  const willPlay = isGameplayScreen(nextScreen);
  if (wasPlaying && !willPlay) {
    game.playTimeMs = getCurrentGamePlayTimeMs(game);
    game.sessionStartedAt = 0;
  } else if (!wasPlaying && willPlay) {
    game.sessionStartedAt = Date.now();
  }
}

function formatPlayTime(ms) {
  const totalMinutes = Math.max(0, Math.floor((ms || 0) / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours <= 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

function formatTimestamp(value) {
  if (!value) return "Unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function showScreen(screen) {
  const previousScreen = state.screen;
  syncGamePlaytimeForScreenChange(previousScreen, screen);
  state.screen = screen;
  if (els.app) els.app.dataset.screen = screen;
  Object.keys(els.screens).forEach((key) => {
    els.screens[key].classList.toggle("active", key === screen);
  });
  if (screen === "load") {
    renderLoadScreen();
  }
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

function openOptionsScreen(returnScreen = "menu") {
  if (returnScreen === "world" && (state.screen !== "world" || !state.game || state.combat || state.modal)) return;
  const fromWorld = returnScreen === "world" && state.game && !state.combat;
  state.optionsReturnScreen = fromWorld ? "world" : "menu";
  updateOptionsUi();
  showScreen("options");
}

function closeOptionsScreen() {
  const target = state.optionsReturnScreen === "world" && state.game ? "world" : "menu";
  showScreen(target);
}

function addMenuMessage(message) {
  if (!els.menuMessage) return;
  els.menuMessage.textContent = message;
}

function showLoadScreen() {
  state.saveSlots = refreshSaveSlots();
  showScreen("load");
}

function renderLoadScreen() {
  if (!els.loadSlots || !els.loadSummary) return;
  const slots = refreshSaveSlots();
  if (!slots.length) {
    els.loadSummary.textContent = "0 save slots found. Start a new run, then save to create your first slot.";
    els.loadSlots.innerHTML = "<p>No local save slots found yet.</p>";
    return;
  }
  const newest = slots[0];
  els.loadSummary.textContent = `${slots.length} save slot${slots.length === 1 ? "" : "s"} stored locally. Most recent save: ${formatTimestamp(newest.savedAt)}.`;
  els.loadSlots.innerHTML = slots.map((slot) => {
    const active = slot.id === state.activeSaveSlotId;
    const chapterText = slot.chapterTitle || "Unknown chapter";
    const locationText = slot.location || "Unknown location";
    const activeTag = active ? '<span class="save-slot-pill active">Active Run</span>' : "";
    return `
      <div class="item-row save-slot-row">
        <div class="save-slot-copy">
          <strong>${escapeHtml(slot.label || "Adventure Slot")}</strong>
          <div>${activeTag}<span class="save-slot-pill">Lv ${slot.level || 1}</span><span class="save-slot-pill">${escapeHtml(slot.difficulty || "Normal")}</span><span class="save-slot-pill">${escapeHtml(formatPlayTime(slot.playTimeMs || 0))}</span></div>
          <p>${escapeHtml(slot.playerName || "Unnamed Hero")} | Saved ${escapeHtml(formatTimestamp(slot.savedAt))}</p>
          <p>${escapeHtml(locationText)} | ${escapeHtml(chapterText)}</p>
          <p>Quests ${slot.questsCompleted || 0} | Bosses ${slot.bossesDefeated || 0} | Seed <code>${escapeHtml(slot.seed || "unknown")}</code></p>
        </div>
        <div class="item-actions">
          <button class="focusable" data-load-action="load-slot" data-slot-id="${slot.id}">Load</button>
          <button class="focusable" data-load-action="delete-slot" data-slot-id="${slot.id}">Delete</button>
        </div>
      </div>
    `;
  }).join("");
}

function onLoadScreenAction(event) {
  const button = event.target.closest("button[data-load-action]");
  if (!button) return;
  const slotId = button.dataset.slotId;
  if (!slotId) return;
  if (button.dataset.loadAction === "load-slot") {
    const ok = loadGame(slotId);
    if (!ok) {
      renderLoadScreen();
      if (els.loadSummary) els.loadSummary.textContent = "That save slot could not be loaded. It may be corrupted or incomplete.";
    }
    return;
  }
  if (button.dataset.loadAction === "delete-slot") {
    deleteSaveSlot(slotId);
    renderLoadScreen();
  }
}

function renderWorld() {
  if (!state.game) return;
  setMapFullscreen(state.map.fullscreen);
  updateMapUi();
  renderPlayerPanel();
  renderWorldLog();
  renderWorldSkillsPanel();
  renderWorldContext();
  drawMap();
  renderWorldInteractPopup();
  if (state.screen === "world" && !state.combat) syncMusicForCurrentContext();
}

function renderPlayerPanel() {
  const { player } = state.game;
  const skills = ensurePlayerSkills(player);
  const nextXp = xpToNextLevel(player.level);
  const chapter = getCurrentStoryChapter();
  const activeStyle = getActiveAttackStyle(player);
  const activeWeapon = player.equipment.Weapon;
  const weaponFamily = getWeaponFamilyDefinition(activeWeapon, activeStyle);
  const discipline = getWeaponDiscipline(activeWeapon, activeStyle);
  const mastery = getWeaponMasterySnapshot(player, activeWeapon, activeStyle);
  const activeSkill = mastery.unlocked[mastery.unlocked.length - 1] || null;
  const nextSkill = mastery.next;
  const equippedWeaponSummary = player.equipment.Weapon ? summarizeWeaponForUi(player.equipment.Weapon) : "None";
  const topSkill = SKILL_ORDER
    .map((name) => ({ name, level: skills[name]?.level || 1 }))
    .sort((a, b) => b.level - a.level)[0];
  const activeSaveSlot = state.saveSlots.find((entry) => entry.id === state.activeSaveSlotId) || null;
  const gatheringPreview = `Bot ${skills.Botany.level} | Min ${skills.Mining.level} | Fish ${skills.Fishing.level}`;
  const craftingPreview = `Cloth ${skills.Clothier.level} | Smith ${skills.Smithing.level} | Jewel ${skills.Jewelcrafting.level}`;
  const activeRepel = getActiveRepelEffect(player);
  const worldEffectText = activeRepel
    ? `${activeRepel.name} (${activeRepel.steps} steps)`
    : "None";
  const difficulty = getDifficulty();
  els.playerSummary.innerHTML = `
    <p><strong>${escapeHtml(player.name)}</strong> (${escapeHtml(discipline)})</p>
    <p>Difficulty ${state.game.difficulty}</p>
    <p>${escapeHtml(difficulty.deathRule || "")}</p>
    <p>Level ${player.level} | XP ${player.xp}/${nextXp}</p>
    <p>HP ${player.currentHealth}/${player.derivedStats.Health}</p>
    <p>Unspent Stat Points ${player.unspentStatPoints || 0}</p>
    <p>Gold ${player.gold}</p>
    <p>World Effects ${escapeHtml(worldEffectText)}</p>
    <p>Play Time ${escapeHtml(formatPlayTime(getCurrentGamePlayTimeMs(state.game)))}</p>
    <p>Save Slot ${escapeHtml(activeSaveSlot?.label || "Unsaved run")}</p>
    <p>Top Skill ${escapeHtml(topSkill?.name || "None")} Lv ${topSkill?.level || 1}</p>
    <p>${escapeHtml(gatheringPreview)}</p>
    <p>${escapeHtml(craftingPreview)}</p>
    <p>${escapeHtml(chapter.title)}</p>
    <p>Style ${escapeHtml(activeStyle)} | Weapon Class ${escapeHtml(weaponFamily.name)}</p>
    <p>Weapon ${escapeHtml(equippedWeaponSummary)}</p>
    <p>Mastery ${mastery.masteryPoints} | Uses ${mastery.entry.uses} | Techniques ${mastery.learnedCount}/${mastery.totalCount}</p>
    <p>${activeSkill ? `${escapeHtml(discipline)} ${activeStyle === "Magic" ? "Spell" : "Technique"}: ${escapeHtml(activeSkill.name)}` : `${escapeHtml(discipline)} techniques are still unlearned. Use the weapon class to build mastery.`}</p>
    <p>${nextSkill ? `${escapeHtml(weaponFamily.name)} mastery ${mastery.nextRequirement}: ${escapeHtml(nextSkill.name)} (${mastery.nextRequirement - mastery.masteryPoints} to go)` : "All weapon-class techniques learned. Mastery remains uncapped."}</p>
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

function renderWorldSkillsPanel() {
  if (!els.worldSkills || !state.game?.player) return;
  const skills = ensurePlayerSkills(state.game.player);
  const renderSkillRow = (skillName) => {
    const entry = skills[skillName] || { level: 1, xp: 0 };
    const nextXp = xpToNextSkillLevel(entry.level);
    const capped = entry.level >= SKILL_CAP_LEVEL;
    const progressValue = capped ? 100 : Math.floor((entry.xp / Math.max(1, nextXp)) * 100);
    const xpText = capped ? "MAX" : `${entry.xp}/${nextXp} XP`;
    return `
      <div class="hub-skill-row">
        <div class="hub-skill-head">
          <span>${escapeHtml(skillName)}</span>
          <strong>Lv ${entry.level}</strong>
        </div>
        <div class="hub-skill-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progressValue}" aria-label="${escapeHtml(skillName)} experience">
          <span class="hub-skill-fill" style="width:${progressValue}%"></span>
        </div>
        <div class="hub-skill-meta">
          <span>${xpText}</span>
          <span>${capped ? "Maxed" : `${progressValue}%`}</span>
        </div>
      </div>
    `;
  };
  const gatheringRows = SKILL_ORDER
    .filter((skillName) => SKILL_DEFS[skillName].role === "Gathering")
    .map(renderSkillRow)
    .join("");
  const craftingRows = SKILL_ORDER
    .filter((skillName) => SKILL_DEFS[skillName].role === "Crafting")
    .map(renderSkillRow)
    .join("");

  els.worldSkills.innerHTML = `
    <h4>Skills</h4>
    <p class="hint">Gathering</p>
    <div class="hub-skill-list">${gatheringRows}</div>
    <p class="hint">Crafting</p>
    <div class="hub-skill-list">${craftingRows}</div>
  `;
}

function isSafeWorldFeature(feature) {
  return !!feature && (
    feature.type === "city"
    || feature.type === "town"
    || feature.type === "npc"
    || feature.type === "transition"
    || feature.type === "grave"
    || feature.type === "debug"
  );
}

function getEncounterSuppressionState(world, player, feature = null) {
  if (!world || !player) return { active: true, reason: "No world data." };
  if (isInDebugCraftingArea(world, player.position.x, player.position.y)) {
    return { active: true, reason: `${DEBUG_CRAFTING_AREA_ID} safe zone.` };
  }
  if (isSafeWorldFeature(feature)) {
    return { active: true, reason: "Safe zone." };
  }
  if (state.options.debugMode && state.options.debugNoEncounters) {
    return { active: true, reason: "Debug encounters disabled." };
  }
  const repel = getActiveRepelEffect(player);
  if (repel) {
    return {
      active: true,
      reason: `${repel.name} active (${repel.steps} step${repel.steps === 1 ? "" : "s"} left).`,
      effect: repel,
    };
  }
  return { active: false, reason: "" };
}

function getWorldEncounterChance(world, player, feature = null) {
  if (!world || !player) return 0;
  if (getEncounterSuppressionState(world, player, feature).active) return 0;
  const tile = world.tiles?.[player.position.y]?.[player.position.x];
  if (!tile) return 0;
  let chance = getEncounterChancePercent(tile.biome, player.level);
  if (feature?.type === "dungeon") chance += 6;
  if (state.game?.difficulty === "Easy") chance -= 1;
  if (state.game?.difficulty === "Legendary") chance += 2;
  return clamp(chance, 0, 45);
}

function getWorldInteractPopupData(feature) {
  if (!feature || !state.game) return null;
  const prompts = CONTROL_PROMPTS[state.inputMode] || CONTROL_PROMPTS.keyboard;
  if (feature.type === "resource") {
    const def = getResourceNodeDef(feature.resourceKind);
    const status = getResourceNodeStatus(feature, state.game.stepCount);
    const requirement = getResourceRequirementState(feature, state.game.player);
    return {
      title: `${prompts.interact}: ${status.ready ? def.actionLabel : `Check ${feature.name}`}`,
      detail: !status.ready
        ? `Respawns in ${status.stepsRemaining} step${status.stepsRemaining === 1 ? "" : "s"}. ${formatResourceRequirementLine(requirement)}.`
        : formatResourceRequirementLine(requirement),
      state: !status.ready ? "depleted" : (requirement.met ? "ready" : "locked"),
    };
  }
  if (feature.type === "crafting") {
    return {
      title: `${prompts.interact}: Use ${feature.skillFocus} workshop`,
      detail: feature.isDebug ? "Debug workshop. No encounters in this yard." : "Field workshop for synthesis encounters.",
      state: "ready",
    };
  }
  if (feature.type === "debug") {
    return state.options.debugMode
      ? {
        title: `${prompts.interact}: Open Debug Menu`,
        detail: "Teleport, boost tester skills, or grant crafting materials.",
        state: "ready",
      }
      : {
        title: "DEBUG_CRAFTING",
        detail: "Enable Debug Mode in Options to use tester tools.",
        state: "locked",
      };
  }
  if (feature.type === "dungeon") {
    return {
      title: `${prompts.interact}: ${feature.bossDefeated ? "Delve Deeper" : "Challenge Boss"}`,
      detail: feature.bossDefeated ? "Boss defeated. The depths are still hostile." : `Boss: ${feature.bossName || "Unknown"}.`,
      state: "ready",
    };
  }
  if (feature.type === "npc") {
    return {
      title: `${prompts.interact}: Talk to ${feature.name}`,
      detail: `${feature.role || "Traveler"} camp. Safe tile.`,
      state: "ready",
    };
  }
  if (feature.type === "transition") {
    return {
      title: `${prompts.interact}: Travel`,
      detail: `Leads to ${feature.targetName || "another region"}.`,
      state: "ready",
    };
  }
  if (feature.type === "chest") {
    return {
      title: `${prompts.interact}: ${feature.opened ? "Inspect Chest" : "Open Chest"}`,
      detail: feature.opened ? "Already opened." : "Recover the cache inside.",
      state: feature.opened ? "depleted" : "ready",
    };
  }
  if (feature.type === "grave") {
    return {
      title: `${prompts.interact}: Recover Gear`,
      detail: "Safe tile containing your dropped equipment.",
      state: "ready",
    };
  }
  if (feature.type === "city" || feature.type === "town") {
    return {
      title: `${prompts.interact}: Open ${feature.name}`,
      detail: "Safe settlement tile with local services and crafting.",
      state: "ready",
    };
  }
  return null;
}

function hideWorldInteractPopup() {
  if (!els.worldInteractPopup) return;
  els.worldInteractPopup.classList.add("hidden");
  els.worldInteractPopup.setAttribute("aria-hidden", "true");
}

function renderWorldInteractPopup() {
  if (!els.worldInteractPopup || !state.game || state.screen !== "world" || state.combat || state.modal || !state.mapRender) {
    hideWorldInteractPopup();
    return;
  }
  const { world, player } = state.game;
  const feature = getFeatureAt(world, player.position.x, player.position.y);
  const popupData = getWorldInteractPopupData(feature);
  if (!popupData) {
    hideWorldInteractPopup();
    return;
  }
  const localX = player.position.x - state.mapRender.cameraX;
  const localY = player.position.y - state.mapRender.cameraY;
  const centerX = els.mapCanvas.offsetLeft + state.mapRender.offsetX + ((localX + 0.5) * state.mapRender.tileSize);
  const topY = els.mapCanvas.offsetTop + state.mapRender.offsetY + (localY * state.mapRender.tileSize);
  const minLeft = els.mapCanvas.offsetLeft + 36;
  const maxLeft = els.mapCanvas.offsetLeft + els.mapCanvas.clientWidth - 36;
  els.worldInteractPopup.dataset.state = popupData.state || "ready";
  els.worldInteractPopup.innerHTML = `
    <strong>${escapeHtml(popupData.title)}</strong>
    <small>${escapeHtml(popupData.detail || "")}</small>
  `;
  els.worldInteractPopup.style.left = `${clamp(centerX, minLeft, maxLeft)}px`;
  els.worldInteractPopup.style.top = `${Math.max(els.mapCanvas.offsetTop + 24, topY - 8)}px`;
  els.worldInteractPopup.classList.remove("hidden");
  els.worldInteractPopup.setAttribute("aria-hidden", "false");
}

function renderWorldContext() {
  const { world, player } = state.game;
  const tile = world.tiles[player.position.y][player.position.x];
  const feature = getFeatureAt(world, player.position.x, player.position.y);
  const biomeLabel = BIOME_DATA[tile.biome].label;
  const threat = state.game.dynamic?.threat || 0;
  const inDebugArea = isInDebugCraftingArea(world, player.position.x, player.position.y);
  const suppression = getEncounterSuppressionState(world, player, feature);
  const encounterChance = getWorldEncounterChance(world, player, feature);
  const areaPrefix = inDebugArea && feature?.type !== "debug" ? `${getDebugCraftingArea(world)?.name || DEBUG_CRAFTING_AREA_ID} - ` : "";
  const safetyText = encounterChance <= 0
    ? `${suppression.reason || "No random encounters."} Threat ${threat}`
    : `Encounter chance: ${encounterChance.toFixed(1)}% | Threat ${threat}`;
  if (feature) {
    if (feature.type === "dungeon") {
      const bossState = feature.bossDefeated ? "Boss Defeated" : `Boss: ${feature.bossName}`;
      els.worldContext.textContent = `${areaPrefix}${biomeLabel} - ${feature.name} (dungeon). ${bossState}. Press Interact to delve. ${safetyText}`;
    } else if (feature.type === "chest") {
      els.worldContext.textContent = `${areaPrefix}${biomeLabel} - ${feature.name}. ${feature.opened ? "Opened already." : "Press Interact to open."} ${safetyText}`;
    } else if (feature.type === "transition") {
      els.worldContext.textContent = `${areaPrefix}${biomeLabel} - ${feature.name}. Press Interact to travel to ${feature.targetName || "another region"}. ${safetyText}`;
    } else if (feature.type === "npc") {
      els.worldContext.textContent = `${areaPrefix}${biomeLabel} - ${feature.name} (${feature.role}). Press Talk or Interact to speak. ${safetyText}`;
    } else if (feature.type === "resource") {
      const def = getResourceNodeDef(feature.resourceKind);
      const status = getResourceNodeStatus(feature, state.game.stepCount);
      const requirement = getResourceRequirementState(feature, player);
      if (status.ready) {
        const passText = `${status.charges} timing pass${status.charges === 1 ? "" : "es"}`;
        const actionText = requirement.met
          ? `Press Interact to ${def.actionLabel.toLowerCase()}.`
          : "Your gathering level is too low right now.";
        els.worldContext.textContent = `${areaPrefix}${biomeLabel} - ${feature.name} (${def.label}). ${status.charges}/${status.maxCharges} resources ready (${passText}). ${formatResourceRequirementLine(requirement)}. ${actionText} ${safetyText}`;
      } else {
        els.worldContext.textContent = `${areaPrefix}${biomeLabel} - ${feature.name} (${def.label}). Depleted, respawns in ${status.stepsRemaining} step${status.stepsRemaining === 1 ? "" : "s"}. ${formatResourceRequirementLine(requirement)}. ${safetyText}`;
      }
    } else if (feature.type === "crafting") {
      const workshopType = feature.isDebug ? "debug workshop" : "field workshop";
      els.worldContext.textContent = `${areaPrefix}${biomeLabel} - ${feature.name}. ${feature.skillFocus} ${workshopType}. Press Interact to craft with encounter rules and workshop bonuses. ${safetyText}`;
    } else if (feature.type === "debug") {
      const debugText = state.options.debugMode
        ? "Press Interact or use the Debug button to open tester tools."
        : "Enable Debug Mode in Options to unlock tester tools.";
      els.worldContext.textContent = `${areaPrefix}${biomeLabel} - ${feature.name}. Safe debug yard with every gathering node tier and all crafting workshops. ${debugText} ${safetyText}`;
    } else if (feature.type === "city" || feature.type === "town") {
      const shopText = feature.hasShop ? "Shop available." : "No shop.";
      const innText = feature.hasInn ? "Inn available." : "No inn services.";
      els.worldContext.textContent = `${areaPrefix}${biomeLabel} - ${feature.name} (${feature.type}). ${safetyText} ${shopText} ${innText} Crafting available. Press Shop, Character, or Interact.`;
    } else if (feature.type === "grave") {
      const count = Array.isArray(feature.items) ? feature.items.length : 0;
      els.worldContext.textContent = `${areaPrefix}${biomeLabel} - ${feature.name}. Dropped gear cache (${count} item${count === 1 ? "" : "s"}). Press Interact to recover equipment. ${safetyText}`;
    } else {
      els.worldContext.textContent = `${areaPrefix}${biomeLabel} - ${feature.name} (${feature.type}). ${safetyText}`;
    }
  } else if (inDebugArea) {
    els.worldContext.textContent = `${areaPrefix}${biomeLabel}. Safe debug yard. No encounters. Every gatherable resource and every crafting workshop is laid out here for testing.`;
  } else {
    els.worldContext.textContent = `${biomeLabel}. ${safetyText}`;
  }
}

function setMapFullscreen(enabled) {
  state.map.fullscreen = !!enabled;
  updateMapUi();
  updateControlPromptUi();
}

function toggleMapFullscreen() {
  if (state.screen !== "world" || !state.game || state.combat || state.modal) return;
  setMapFullscreen(!state.map.fullscreen);
  renderWorld();
}

function toggleWorldHudLayout() {
  if (state.screen !== "world" || !state.game || state.combat || state.modal) return;
  state.map.hudLayout = state.map.hudLayout === "stacked" ? "side" : "stacked";
  updateMapUi();
  updateControlPromptUi();
  renderWorld();
}

function cycleWorldViewportMode() {
  if (state.screen !== "world" || !state.game || state.combat || state.modal) return;
  state.map.viewportMode = state.map.viewportMode === "native" ? "fit" : "native";
  updateMapUi();
  updateControlPromptUi();
  renderWorld();
}

function cycleWorldViewportOrientation() {
  if (state.screen !== "world" || !state.game || state.combat || state.modal) return;
  state.map.viewportOrientation = state.map.viewportOrientation === "portrait" ? "landscape" : "portrait";
  updateMapUi();
  updateControlPromptUi();
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
  state.map = normalizeMapViewState(state.map);
  if (els.app) {
    els.app.dataset.viewportMode = state.map.viewportMode;
    els.app.dataset.viewportOrientation = state.map.viewportOrientation;
  }
  if (els.screens.world) {
    els.screens.world.classList.toggle("map-fullscreen", state.map.fullscreen);
    els.screens.world.classList.toggle("hud-stacked", state.map.hudLayout === "stacked");
    els.screens.world.classList.toggle("viewport-native-landscape", state.map.viewportMode === "native" && state.map.viewportOrientation === "landscape");
    els.screens.world.classList.toggle("viewport-native-portrait", state.map.viewportMode === "native" && state.map.viewportOrientation === "portrait");
  }
  if (els.worldMapToggle) {
    els.worldMapToggle.textContent = state.map.fullscreen ? "Restore HUD View" : "Expand Viewport";
  }
  if (els.worldHudLayout) {
    els.worldHudLayout.textContent = state.map.hudLayout === "stacked" ? "HUD: Stacked" : "HUD: Side";
  }
  if (els.worldViewportMode) {
    els.worldViewportMode.textContent = state.map.viewportMode === "native" ? "Viewport: Native" : "Viewport: Fit";
  }
  if (els.worldViewportOrientation) {
    els.worldViewportOrientation.textContent = `Orientation: ${state.map.viewportOrientation === "portrait" ? "Portrait" : "Landscape"}`;
  }
  if (els.mapLegend) {
    const zoomText = `${Math.round((state.map.zoom || 1) * 100)}%`;
    const layoutText = state.map.hudLayout === "stacked" ? "stacked HUD" : "side HUD";
    const viewportText = state.map.viewportMode === "native"
      ? `Native ${state.map.viewportOrientation}`
      : "Fit-to-window";
    els.mapLegend.textContent = `Map icons: City, Town, Dungeon, Chest, NPC, Boss, Workshop, DEBUG_CRAFTING, resources (tree/herb/leafhide/ore/crystal/fish/tidepool). Resource top-left badge shows required level, bottom-right shows charges or depletion. Shop badge ($), Inn badge (I). Zoom ${zoomText}. ${viewportText} viewport with ${layoutText}.`;
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
  const portraitViewport = state.map.viewportMode === "native" && state.map.viewportOrientation === "portrait";
  const baseTilesX = portraitViewport
    ? (state.map.fullscreen ? PORTRAIT_FULLSCREEN_VIEW_TILES_X : PORTRAIT_VIEW_TILES_X)
    : (state.map.fullscreen ? FULLSCREEN_VIEW_TILES_X : VIEW_TILES_X);
  const baseTilesY = portraitViewport
    ? (state.map.fullscreen ? PORTRAIT_FULLSCREEN_VIEW_TILES_Y : PORTRAIT_VIEW_TILES_Y)
    : (state.map.fullscreen ? FULLSCREEN_VIEW_TILES_Y : VIEW_TILES_Y);
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
  state.mapRender = {
    cameraX,
    cameraY,
    tileSize,
    drawWidth,
    drawHeight,
    offsetX,
    offsetY,
    viewTilesX,
    viewTilesY,
  };

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
  } else if (feature.type === "resource") {
    refreshResourceNode(feature, state.game?.stepCount || 0);
    if (feature.resourceKind === "tree") {
      ctx.fillStyle = "#284d2f";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#86c980";
      ctx.beginPath();
      ctx.arc(size * 0.5, size * 0.38, size * 0.24, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#5f3d1f";
      ctx.fillRect(size * 0.44, size * 0.5, size * 0.12, size * 0.3);
    } else if (feature.resourceKind === "herb") {
      ctx.fillStyle = "#264d31";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#8ad987";
      ctx.fillRect(size * 0.24, size * 0.48, size * 0.08, size * 0.32);
      ctx.fillRect(size * 0.46, size * 0.38, size * 0.08, size * 0.42);
      ctx.fillRect(size * 0.68, size * 0.46, size * 0.08, size * 0.34);
      ctx.fillStyle = "#bde8a4";
      ctx.fillRect(size * 0.2, size * 0.36, size * 0.16, size * 0.1);
      ctx.fillRect(size * 0.42, size * 0.28, size * 0.16, size * 0.1);
      ctx.fillRect(size * 0.64, size * 0.34, size * 0.16, size * 0.1);
    } else if (feature.resourceKind === "ore") {
      ctx.fillStyle = "#3b3f4a";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#a3adbc";
      ctx.beginPath();
      ctx.moveTo(size * 0.2, size * 0.72);
      ctx.lineTo(size * 0.34, size * 0.34);
      ctx.lineTo(size * 0.56, size * 0.26);
      ctx.lineTo(size * 0.78, size * 0.6);
      ctx.lineTo(size * 0.6, size * 0.8);
      ctx.lineTo(size * 0.3, size * 0.8);
      ctx.closePath();
      ctx.fill();
    } else if (feature.resourceKind === "crystal") {
      ctx.fillStyle = "#273245";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#8bc3ff";
      ctx.beginPath();
      ctx.moveTo(size * 0.24, size * 0.76);
      ctx.lineTo(size * 0.38, size * 0.3);
      ctx.lineTo(size * 0.5, size * 0.16);
      ctx.lineTo(size * 0.66, size * 0.34);
      ctx.lineTo(size * 0.76, size * 0.7);
      ctx.lineTo(size * 0.58, size * 0.82);
      ctx.lineTo(size * 0.34, size * 0.82);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#d8ecff";
      ctx.fillRect(size * 0.47, size * 0.24, size * 0.06, size * 0.28);
    } else if (feature.resourceKind === "hide") {
      ctx.fillStyle = "#35533a";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#9bc38f";
      ctx.beginPath();
      ctx.moveTo(size * 0.5, size * 0.16);
      ctx.lineTo(size * 0.74, size * 0.42);
      ctx.lineTo(size * 0.62, size * 0.82);
      ctx.lineTo(size * 0.38, size * 0.82);
      ctx.lineTo(size * 0.26, size * 0.42);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#6c8f59";
      ctx.fillRect(size * 0.47, size * 0.2, size * 0.06, size * 0.56);
    } else {
      ctx.fillStyle = "#24506a";
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = "#9fd2ef";
      ctx.beginPath();
      ctx.moveTo(size * 0.14, size * 0.34);
      ctx.quadraticCurveTo(size * 0.36, size * 0.24, size * 0.58, size * 0.34);
      ctx.quadraticCurveTo(size * 0.78, size * 0.44, size * 0.92, size * 0.34);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(size * 0.1, size * 0.56);
      ctx.quadraticCurveTo(size * 0.32, size * 0.46, size * 0.56, size * 0.56);
      ctx.quadraticCurveTo(size * 0.76, size * 0.66, size * 0.9, size * 0.56);
      ctx.stroke();
      ctx.fillStyle = "#e2f7ff";
      ctx.beginPath();
      ctx.moveTo(size * 0.28, size * 0.52);
      ctx.lineTo(size * 0.48, size * 0.44);
      ctx.lineTo(size * 0.6, size * 0.52);
      ctx.lineTo(size * 0.48, size * 0.6);
      ctx.closePath();
      ctx.fill();
      if (feature.resourceKind === "tidepool") {
        ctx.fillStyle = "#7fe2ff";
        ctx.beginPath();
        ctx.arc(size * 0.68, size * 0.34, size * 0.08, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (feature.type === "crafting") {
    ctx.fillStyle = "#4e3a22";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#dfb578";
    ctx.fillRect(size * 0.18, size * 0.58, size * 0.64, size * 0.12);
    ctx.fillRect(size * 0.26, size * 0.28, size * 0.12, size * 0.34);
    ctx.fillRect(size * 0.46, size * 0.22, size * 0.12, size * 0.4);
    ctx.fillRect(size * 0.36, size * 0.36, size * 0.32, size * 0.1);
    ctx.fillStyle = "#f1e2b3";
    ctx.fillRect(size * 0.62, size * 0.18, size * 0.12, size * 0.12);
  } else if (feature.type === "grave") {
    ctx.fillStyle = "#4a4355";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#d9cee8";
    ctx.fillRect(size * 0.44, size * 0.2, size * 0.12, size * 0.54);
    ctx.fillRect(size * 0.3, size * 0.35, size * 0.4, size * 0.12);
    ctx.fillStyle = "#b9a7cf";
    ctx.fillRect(size * 0.22, size * 0.74, size * 0.56, size * 0.1);
  } else if (feature.type === "debug") {
    ctx.fillStyle = "#2a314f";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "#9bc2ff";
    ctx.strokeRect(size * 0.16, size * 0.2, size * 0.68, size * 0.46);
    ctx.fillStyle = "#9bc2ff";
    ctx.fillRect(size * 0.24, size * 0.3, size * 0.16, size * 0.1);
    ctx.fillRect(size * 0.46, size * 0.3, size * 0.22, size * 0.1);
    ctx.fillRect(size * 0.24, size * 0.46, size * 0.44, size * 0.08);
    ctx.fillStyle = "#f4b942";
    ctx.beginPath();
    ctx.arc(size * 0.72, size * 0.74, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
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
  if (feature.type === "resource") {
    const requirement = getResourceRequirementState(feature);
    drawFeatureBadge(sx, sy, tileSize, `${requirement.requiredLevel}`, requirement.met ? "#2f5d8c" : "#7b3f3f", "top-left");
    const status = getResourceNodeStatus(feature, state.game?.stepCount || 0);
    if (status.ready) {
      drawFeatureBadge(sx, sy, tileSize, `${status.charges}`, "#2a6739", "bottom-right");
    } else {
      drawFeatureBadge(sx, sy, tileSize, "X", "#6d2b2b", "bottom-right");
    }
  }
  if (feature.type === "crafting") {
    drawFeatureBadge(sx, sy, tileSize, String(feature.skillFocus || "C").charAt(0), "#7a5d2e", "bottom-left");
  }
  if (isBossDungeon) {
    drawFeatureBadge(sx, sy, tileSize, "B", "#7a2525", "top-right");
  }
}

function drawFeatureBadge(sx, sy, tileSize, label, bgColor, corner = "top-right") {
  const text = String(label || "");
  const size = Math.max(9, Math.floor(tileSize * 0.38));
  const width = Math.max(size, Math.floor(size * (text.length >= 3 ? 1.55 : (text.length === 2 ? 1.2 : 1))));
  const pad = Math.max(1, Math.floor(tileSize * 0.05));
  let x = sx + tileSize - width - pad;
  let y = sy + pad;
  if (corner === "top-left") x = sx + pad;
  if (corner === "bottom-left") {
    x = sx + pad;
    y = sy + tileSize - size - pad;
  }
  if (corner === "bottom-right") y = sy + tileSize - size - pad;
  ctx.fillStyle = bgColor;
  ctx.fillRect(x, y, width, size);
  ctx.strokeStyle = "#141b23";
  ctx.strokeRect(x + 0.5, y + 0.5, width - 1, size - 1);
  ctx.fillStyle = "#f3f6fb";
  ctx.font = `${Math.max(7, Math.floor(size * (text.length >= 3 ? 0.5 : 0.62)))}px "Trebuchet MS", "Segoe UI", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + width / 2, y + size / 2 + 0.2);
}

function movePlayer(dx, dy) {
  if (!state.game || state.combat || state.modal) return false;
  const { world, player } = state.game;
  const nx = clamp(player.position.x + dx, 0, world.width - 1);
  const ny = clamp(player.position.y + dy, 0, world.height - 1);
  if (nx === player.position.x && ny === player.position.y) return false;
  const wasInDebugArea = isInDebugCraftingArea(world, player.position.x, player.position.y);
  player.position.x = nx;
  player.position.y = ny;
  state.game.stepCount += 1;
  const expiredWorldEffects = tickWorldEffects(player);
  revealAround(world, nx, ny, 2);
  state.game.meta.tilesDiscovered = countDiscoveredTiles(world);
  playSfx("move");
  const feature = getFeatureAt(world, nx, ny);
  const nowInDebugArea = isInDebugCraftingArea(world, nx, ny);
  if (!wasInDebugArea && nowInDebugArea) {
    addWorldLog("Entered DEBUG_CRAFTING. Encounters are disabled in this testing yard.");
  }
  if (feature?.type === "city" || feature?.type === "town") addWorldLog(`Arrived at ${feature.name}. This is a safe location.`);
  if (feature?.type === "dungeon") addWorldLog(`You stand at ${feature.name}. Press Interact to enter.`);
  if (feature?.type === "chest" && !feature.opened) addWorldLog(`A chest waits here. Press Interact.`);
  if (feature?.type === "transition") addWorldLog(`${feature.name} hums softly. Press Interact to travel.`);
  if (feature?.type === "npc") addWorldLog(`${feature.name} (${feature.role}) is here.`);
  if (feature?.type === "resource") {
    const def = getResourceNodeDef(feature.resourceKind);
    const status = getResourceNodeStatus(feature, state.game.stepCount);
    const requirement = getResourceRequirementState(feature, player);
    if (status.ready) {
      const readinessText = requirement.met
        ? `Press Interact to ${def.actionLabel.toLowerCase()}.`
        : `Locked. ${formatResourceRequirementLine(requirement)}`;
      addWorldLog(`${feature.name} is ready with ${status.charges} pull${status.charges === 1 ? "" : "s"}. ${readinessText}`);
    } else {
      addWorldLog(`${feature.name} is depleted. It will recover in ${status.stepsRemaining} step${status.stepsRemaining === 1 ? "" : "s"}. ${formatResourceRequirementLine(requirement)}.`);
    }
  }
  if (feature?.type === "crafting") addWorldLog(`${feature.name} is set up for ${feature.skillFocus}. Press Interact to start a crafting encounter.`);
  if (feature?.type === "debug") {
    const debugPrompt = state.options.debugMode
      ? "Press Interact to open the debug menu."
      : "Enable Debug Mode in Options to use tester tools.";
    addWorldLog(`${feature.name} is active. ${debugPrompt}`);
  }
  if (feature?.type === "grave") addWorldLog("Your dropped gear cache is here. Press Interact to recover it.");
  if (feature?.type === "city" || feature?.type === "town" || feature?.type === "npc") {
    updateQuestProgress("visitFeature", { feature });
  }
  const autoTriggered = maybeAutoTriggerFeatureEvent(feature);
  if (!autoTriggered && !state.modal && !state.combat) {
    tryTriggerEncounter(feature);
  }
  expiredWorldEffects.forEach((effect) => addWorldLog(`${effect.name} wore off.`));
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
  if (feature?.type === "resource") {
    const def = getResourceNodeDef(feature.resourceKind);
    const status = getResourceNodeStatus(feature, state.game.stepCount);
    const requirement = getResourceRequirementState(feature, player);
    if (status.ready) {
      addWorldLog(`${feature.name}: ${def.label} in the ${BIOME_DATA[tile.biome].label}. ${status.charges}/${status.maxCharges} resources ready (${status.charges} timing pass${status.charges === 1 ? "" : "es"}). ${formatResourceRequirementLine(requirement)}.`);
    } else {
      addWorldLog(`${feature.name}: ${def.label} in the ${BIOME_DATA[tile.biome].label}. Respawns in ${status.stepsRemaining} step${status.stepsRemaining === 1 ? "" : "s"}. ${formatResourceRequirementLine(requirement)}.`);
    }
  } else if (feature?.type === "crafting") {
    addWorldLog(`${feature.name}: ${feature.skillFocus} workshop in the ${BIOME_DATA[tile.biome].label}. Use Interact to craft with full field support.`);
  } else if (feature?.type === "debug") {
    const debugPrompt = state.options.debugMode
      ? "Use Interact to open tester tools."
      : "Enable Debug Mode in Options to use tester tools.";
    addWorldLog(`${feature.name}: safe debug yard in the ${BIOME_DATA[tile.biome].label}. ${debugPrompt}`);
  } else if (feature) addWorldLog(`${feature.name}: a ${feature.type} in the ${BIOME_DATA[tile.biome].label}.`);
  else if (isInDebugCraftingArea(world, player.position.x, player.position.y)) {
    addWorldLog(`${DEBUG_CRAFTING_AREA_ID}: safe testing yard in the ${BIOME_DATA[tile.biome].label}. Every resource and workshop is nearby.`);
  }
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
  } else if (feature.type === "resource") {
    const def = getResourceNodeDef(feature.resourceKind);
    const status = getResourceNodeStatus(feature, state.game?.stepCount || 0);
    const requirement = getResourceRequirementState(feature, state.game?.player);
    actions.push({
      id: "gather-resource",
      label: status.ready ? def.actionLabel : `${def.actionLabel} (Depleted)`,
      description: status.ready
        ? `${feature.name} | ${formatResourceRequirementLine(requirement)} | ${status.charges} pass${status.charges === 1 ? "" : "es"}`
        : `Respawns in ${status.stepsRemaining} step${status.stepsRemaining === 1 ? "" : "s"} | ${formatResourceRequirementLine(requirement)}`,
      });
  } else if (feature.type === "crafting") {
    actions.push({
      id: "open-crafting",
      label: "Use Workshop",
      description: `${feature.skillFocus} field workshop`,
    });
  } else if (feature.type === "debug" && state.options.debugMode) {
    actions.push({
      id: "open-debug-menu",
      label: "Open Debug Menu",
      description: "Tester travel, skill boosts, and material grants",
    });
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
    actions.push({ id: "open-crafting", label: "Craft Gear", description: "Use local workshops for crafting" });
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
  if (actionId === "open-debug-menu") {
    openDebugMenu();
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
  if (actionId === "gather-resource") {
    if (!activeFeature || activeFeature.type !== "resource") return addWorldLog("No resource node here.");
    gatherResourceNode(activeFeature);
    return;
  }
  if (actionId === "recover-gear") {
    if (!activeFeature || activeFeature.type !== "grave") return addWorldLog("No dropped gear cache here.");
    recoverDroppedGear(activeFeature);
    return;
  }
  if (actionId === "open-crafting") {
    openCraftingMenu(activeFeature);
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

function openCurrentCrafting() {
  if (!state.game || state.combat) return;
  const feature = getFeatureAt(state.game.world, state.game.player.position.x, state.game.player.position.y);
  openCraftingMenu(feature || null);
}

function revealWorldArea(world, area, padding = 0) {
  if (!world || !area) return;
  for (let y = area.y - padding; y < area.y + area.height + padding; y += 1) {
    for (let x = area.x - padding; x < area.x + area.width + padding; x += 1) {
      if (x < 0 || y < 0 || x >= world.width || y >= world.height) continue;
      world.discovered[y][x] = true;
    }
  }
}

function teleportPlayerToWorldPosition(x, y, label, options = {}) {
  if (!state.game) return false;
  const { world, player } = state.game;
  player.position.x = clamp(x, 0, world.width - 1);
  player.position.y = clamp(y, 0, world.height - 1);
  if (options.revealArea) revealWorldArea(world, options.revealArea, options.revealPadding || 0);
  revealAround(world, player.position.x, player.position.y, options.revealRadius || 2);
  state.game.meta.tilesDiscovered = countDiscoveredTiles(world);
  addWorldLog(`Debug: teleported to ${label}.`);
  renderWorld();
  return true;
}

function teleportToDebugCraftingArea() {
  if (!state.game) return false;
  const area = getDebugCraftingArea(state.game.world);
  if (!area) {
    addWorldLog("Debug area is unavailable in this world.");
    return false;
  }
  state.debug.returnPosition = { x: state.game.player.position.x, y: state.game.player.position.y };
  return teleportPlayerToWorldPosition(area.entryX, area.entryY, area.name || DEBUG_CRAFTING_AREA_ID, {
    revealArea: area,
    revealPadding: 1,
    revealRadius: 3,
  });
}

function returnFromDebugCraftingArea() {
  if (!state.game) return false;
  if (!state.debug.returnPosition) {
    addWorldLog("Debug: no return point stored.");
    return false;
  }
  const returnPosition = { ...state.debug.returnPosition };
  state.debug.returnPosition = null;
  return teleportPlayerToWorldPosition(returnPosition.x, returnPosition.y, "previous position");
}

function setSkillLevelsByRole(role, targetLevel = SKILL_CAP_LEVEL) {
  if (!state.game) return false;
  const skills = ensurePlayerSkills(state.game.player);
  let changed = 0;
  SKILL_ORDER.forEach((skillName) => {
    if (SKILL_DEFS[skillName]?.role !== role) return;
    skills[skillName].level = clamp(targetLevel, 1, SKILL_CAP_LEVEL);
    skills[skillName].xp = 0;
    changed += 1;
  });
  if (changed <= 0) return false;
  if (role === "Gathering") rebalanceWorldResourceNodes(state.game.world, state.game.player);
  addWorldLog(`Debug: all ${role.toLowerCase()} skills set to Lv ${targetLevel}.`);
  renderWorld();
  return true;
}

function grantDebugMaterialCache(quantity = 25) {
  if (!state.game) return false;
  Object.values(MATERIAL_DEFS).forEach((definition) => {
    addStackableLoot(state.game.player, "material", definition, quantity);
  });
  addWorldLog(`Debug: granted ${quantity}x of every crafting material.`);
  renderWorld();
  return true;
}

function openDebugMenu() {
  if (!state.game || state.combat) return;
  if (!state.options.debugMode) {
    addWorldLog("Enable Debug Mode in Options to use tester tools.");
    renderWorldLog();
    return;
  }
  openModal("debug");
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
  if (isInDebugCraftingArea(game.world, game.player.position.x, game.player.position.y)) return;
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
    const added = ensureQuestBoardDepth();
    if (added > 0) addWorldLog("World Event: New quest rumors spread across settlements.");
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
  if (isInDebugCraftingArea(world, player.position.x, player.position.y)) return false;
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const x = clamp(player.position.x + runtimeRng.int(-6, 6), 0, world.width - 1);
    const y = clamp(player.position.y + runtimeRng.int(-6, 6), 0, world.height - 1);
    if (isInDebugCraftingArea(world, x, y)) continue;
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
  const chance = getWorldEncounterChance(world, player, feature);
  if (chance <= 0) return;
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
  const activeWeapon = player.equipment.Weapon;
  const weaponFamily = getWeaponFamilyDefinition(activeWeapon, activeStyle);
  const discipline = getWeaponDiscipline(activeWeapon, activeStyle);
  const mastery = getWeaponMasterySnapshot(player, activeWeapon, activeStyle);
  const activeSkill = mastery.unlocked[mastery.unlocked.length - 1] || null;
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
    <p>Style ${escapeHtml(activeStyle)} | Class ${escapeHtml(discipline)}</p>
    <p>Weapon Class ${escapeHtml(weaponFamily.name)}</p>
    <p>Weapon ${escapeHtml(playerWeaponSummary)}</p>
    <p>Mastery ${mastery.masteryPoints} | Uses ${mastery.entry.uses} | Hits ${mastery.entry.hits}</p>
    <p>${activeSkill ? `${escapeHtml(discipline)} ${activeStyle === "Magic" ? "Spell" : "Technique"} ${escapeHtml(activeSkill.name)}` : `${escapeHtml(discipline)} has no learned techniques yet.`}</p>
    <p>${mastery.next ? `Next ${activeStyle === "Magic" ? "spell" : "technique"} ${escapeHtml(mastery.next.name)} at mastery ${mastery.nextRequirement}.` : "All weapon-class techniques learned. Mastery keeps climbing."}</p>
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
  const swapButton = els.combatActions.querySelector("button[data-action='swap-weapon']");
  if (swapButton) {
    const swappable = state.game.player.bag.some((item) => item.kind === "equipment" && item.slot === "Weapon" && player.level >= (item.levelReq || 1));
    swapButton.disabled = !canAct || !swappable;
  }

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
  if (action === "swap-weapon") return openCombatWeaponSelection();
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
  if (!profile) {
    pushCombatLog("You have not learned any techniques for this weapon class yet.");
    return;
  }
  const attackStats = ATTACK_TO_STATS[profile.attackType];
  const attackValue = player.derivedStats[attackStats.attack];
  const defenseValue = enemy.stats[attackStats.defense];
  const hitRoll = rollDie(state.game.runtimeRng, 20) + attackValue + profile.hitBonus;
  const target = defenseValue + 10;

  if (hitRoll < target) {
    const masteryGain = awardWeaponMastery(player, player.equipment.Weapon, {
      kind,
      hit: false,
      enemyLevel: enemy.level,
      enemyBoss: enemy.isBoss,
      style: profile.attackType,
    });
    pushCombatLog(`${profile.label} misses (${hitRoll} vs ${target}).${formatWeaponMasteryGain(masteryGain)}`);
    announceWeaponMasteryUnlocks(masteryGain);
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
  const defeatedEnemy = enemy.currentHealth <= 0;
  const masteryGain = awardWeaponMastery(player, player.equipment.Weapon, {
    kind,
    hit: true,
    critical,
    affinityKind: affinity.kind,
    killedEnemy: defeatedEnemy,
    enemyLevel: enemy.level,
    enemyBoss: enemy.isBoss,
    style: profile.attackType,
  });
  const damageTag = profile.damageKind ? ` ${profile.damageKind}` : "";
  const affinitySuffix = affinity.kind === "weak" ? " Weakness hit." : affinity.kind === "resist" ? " Enemy resisted." : "";
  if (state.options.verboseCombatLog) {
    pushCombatLog(`${profile.label}${damageTag} hits for ${damage}.${affinitySuffix} [hit ${hitRoll}/${target}, crit ${critRoll}<=${critThreshold}${critical ? " YES" : ""}, x${affinity.multiplier.toFixed(2)}]${formatWeaponMasteryGain(masteryGain)}`);
  } else {
    pushCombatLog(`${profile.label}${damageTag} hits for ${damage}${critical ? " (critical)" : ""}.${affinitySuffix}${formatWeaponMasteryGain(masteryGain)}`);
  }
  announceWeaponMasteryUnlocks(masteryGain);
  playSfx(critical ? "crit" : "hit");
  if (defeatedEnemy) finalizeCombat("won");
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
  const abilities = getUnlockedAbilitiesForStyle(player, attackType, weapon);
  const chosen = abilityOverride || abilities[abilities.length - 1];
  if (!chosen) return null;
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
  return player.style || "Melee";
}

function getUnlockedAbilitiesForStyle(player, style, weapon = null) {
  const snapshot = getWeaponMasterySnapshot(player, weapon || player?.equipment?.Weapon || getDefaultWeaponForStyle(style || player?.style || "Melee"), style || player?.style || "Melee");
  return snapshot.unlocked;
}

function getNextAbilityForStyle(player, style, weapon = null) {
  const snapshot = getWeaponMasterySnapshot(player, weapon || player?.equipment?.Weapon || getDefaultWeaponForStyle(style || player?.style || "Melee"), style || player?.style || "Melee");
  return snapshot.next || null;
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
  const weapon = player.equipment.Weapon;
  state.modal = "combatSkill";
  state.modalData = { style, familyKey: getWeaponFamilyKey(weapon, style) };
  els.modalBackdrop.classList.remove("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "false");
  renderModal();
}

function openCombatWeaponSelection() {
  if (!state.combat || !state.game || state.combat.phase !== "player") return;
  const weapons = state.game.player.bag.filter((item) => item.kind === "equipment" && item.slot === "Weapon");
  if (!weapons.length) {
    pushCombatLog("No spare weapons are available.");
    return;
  }
  state.modal = "combatWeapon";
  state.modalData = null;
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
  syncPlayerStyleToWeapon(player);
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

function buildConsumableWeightTable(level, isBoss = false, shopStock = false) {
  const tier = tierForLevel(level);
  return [
    { id: "minor_potion", weight: clamp(34 - tier * 3, shopStock ? 2 : 0, 34) },
    { id: "trail_skewers", weight: clamp(28 - tier * 2, 2, 28) },
    { id: "greater_potion", weight: clamp(16 + tier * 2, 8, 34) },
    { id: "smoked_filet", weight: clamp(14 + tier * 2, 6, 30) },
    { id: "hearty_stew", weight: clamp(10 + tier, 4, 18) },
    { id: "anglers_stew", weight: tier >= 2 ? clamp(4 + tier * 2, 0, 20) : 0 },
    { id: "battle_broth", weight: tier >= 4 ? clamp(3 + tier * 2, 0, 18) : 0 },
    { id: "hero_feast", weight: tier >= 6 ? clamp(2 + tier, 0, 14) : 0 },
    { id: "mega_potion", weight: tier >= 4 ? clamp((shopStock ? 3 : 1) + tier * 2 + (isBoss ? 6 : 0), 0, 20) : (isBoss ? 4 : 0) },
    { id: "prime_elixir", weight: tier >= 8 ? clamp((isBoss ? 5 : 2) + tier, 0, 16) : 0 },
    { id: "focus_tonic", weight: clamp(9 + tier * 2 + (isBoss ? 3 : 0), 8, 24) },
    { id: "precision_elixir", weight: tier >= 6 ? clamp(3 + tier + (isBoss ? 3 : 0), 0, 18) : 0 },
    { id: "fire_bomb", weight: tier >= 3 ? clamp(5 + tier + (isBoss ? 4 : 0), 0, 18) : 0 },
    { id: "volatile_flask", weight: tier >= 6 ? clamp(4 + tier + (isBoss ? 4 : 0), 0, 18) : 0 },
    { id: "smoke_bomb", weight: clamp(8 + (isBoss ? 2 : 0), 6, 14) },
    { id: "trail_repel", weight: clamp((shopStock ? 12 : 8) - Math.floor(tier / 2), 4, 14) },
    { id: "strong_repel", weight: tier >= 3 ? clamp((shopStock ? 4 : 2) + tier * 2 + (isBoss ? 1 : 0), 0, 16) : 0 },
    { id: "grand_repel", weight: tier >= 6 ? clamp((shopStock ? 3 : 1) + tier + (isBoss ? 2 : 0), 0, 12) : 0 },
  ].filter((entry) => entry.weight > 0);
}

function buildMaterialWeightTable(level, biome = "plains", highQuality = false) {
  const tier = tierForLevel(level);
  const forestBonus = biome === "forest" ? 1 : 0;
  const plainsBonus = biome === "plains" ? 1 : 0;
  const swampBonus = biome === "swamp" ? 1 : 0;
  const badlandsBonus = biome === "badlands" ? 1 : 0;
  const roadBonus = biome === "road" ? 1 : 0;
  return [
    { id: "slime_gel", weight: clamp(22 - tier * 2 + swampBonus * 8, 4, 26) },
    { id: "iron_scrap", weight: clamp(20 - Math.floor(tier / 2) + badlandsBonus * 6, 6, 24) },
    { id: "fiber_bundle", weight: clamp(16 - Math.floor(tier / 3) + (forestBonus + plainsBonus) * 5, 6, 22) },
    { id: "herb_bundle", weight: clamp(14 - Math.floor(tier / 3) + (forestBonus + swampBonus) * 7, 5, 24) },
    { id: "iron_ore", weight: clamp(8 + tier * 2 + badlandsBonus * 8 + (highQuality ? 3 : 0), 8, 34) },
    { id: "silver_ore", weight: clamp(4 + tier * 2 + badlandsBonus * 6 + (highQuality ? 2 : 0), 4, 22) },
    { id: "gem_shard", weight: clamp((tier >= 2 ? 2 + tier : 0) + badlandsBonus * 4 + swampBonus * 2 + (highQuality ? 2 : 0), 0, 18) },
    { id: "beast_hide", weight: clamp(8 + tier * 2 + (forestBonus + plainsBonus) * 4, 8, 28) },
    { id: "beast_fang", weight: clamp(4 + Math.floor(tier * 1.5) + (forestBonus + plainsBonus) * 3 + (highQuality ? 2 : 0), 4, 20) },
    { id: "hardwood_log", weight: clamp(8 + tier * 2 + forestBonus * 8 + (highQuality ? 2 : 0), 8, 30) },
    { id: "arcane_dust", weight: clamp(4 + tier * 2 + (swampBonus + badlandsBonus) * 4 + (highQuality ? 3 : 0), 4, 26) },
    { id: "river_scale", weight: clamp((tier >= 3 ? 3 + tier : 0) + (swampBonus + roadBonus) * 5 + (highQuality ? 2 : 0), 0, 16) },
  ].filter((entry) => entry.weight > 0);
}

function rollMaterialIdForLevel(level, rng, options = {}) {
  const table = buildMaterialWeightTable(level, options.biome || "plains", !!options.highQuality);
  return weightedPick(table, rng, "id");
}

function getMaterialShopPrice(materialId, quantity, tier) {
  const basePrices = {
    slime_gel: 8,
    iron_scrap: 9,
    fiber_bundle: 9,
    herb_bundle: 10,
    iron_ore: 13,
    silver_ore: 17,
    gem_shard: 21,
    beast_hide: 13,
    beast_fang: 18,
    hardwood_log: 14,
    arcane_dust: 18,
    river_scale: 22,
  };
  const base = basePrices[materialId] || 12;
  return Math.floor(base * Math.max(1, quantity) * (1 + Math.max(0, tier - 1) * 0.06));
}

function maybeDropLoot(enemy) {
  const player = state.game.player;
  const rng = state.game.runtimeRng;
  const difficulty = getDifficulty();
  const biome = state.combat?.biome || "plains";
  const lootLines = [];

  const goldGain = Math.floor((8 + enemy.level * 3 + rng.int(0, 14)) * (enemy.isBoss ? 2.2 : 1) * difficulty.loot);
  player.gold += goldGain;
  state.game.meta.totalGoldFound += goldGain;
  lootLines.push(`${goldGain} gold`);

  const equipmentDropChance = clamp(24 + player.derivedStats.Luck * 0.45 + (enemy.isBoss ? 42 : 0), 10, 95);
  if (rng.next() * 100 < equipmentDropChance) {
    const item = generateEquipmentDrop(enemy.level + rng.int(-1, enemy.isBoss ? 4 : 2), rng, { boss: enemy.isBoss });
    addItemToBag(player, item);
    lootLines.push(item.name);
  }

  const consumableDrops = enemy.isBoss ? 3 : rng.int(0, 2);
  for (let i = 0; i < consumableDrops; i += 1) {
    const dropId = rollConsumableDrop(rng, enemy.level, enemy.isBoss);
    addConsumableToBag(player, dropId, 1);
    lootLines.push(CONSUMABLE_DEFS[dropId].name);
  }

  if (rng.next() * 100 < (enemy.isBoss ? 90 : 45)) {
    const materialId = rollMaterialIdForLevel(enemy.level, rng, { biome, highQuality: enemy.isBoss });
    const quantity = rng.int(1, enemy.isBoss ? 4 : 2) + (enemy.level >= 60 ? 1 : 0);
    addStackableLoot(player, "material", MATERIAL_DEFS[materialId], quantity);
    lootLines.push(`${quantity}x ${MATERIAL_DEFS[materialId].name}`);
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
  const level = clamp(Math.round(playerLevel), 1, MAX_LEVEL);
  const tier = tierForLevel(level);
  const tierStart = (tier - 1) * 10 + 1;
  const tierEnd = Math.min(MAX_LEVEL, tier * 10);
  const levelReq = clamp(level + rng.int(options.boss ? -1 : -3, options.boss ? 2 : 1), tierStart, tierEnd);
  const tierProgress = clamp((levelReq - tierStart) / Math.max(1, tierEnd - tierStart), 0, 1);
  const powerBand = tier + tierProgress;
  const slot = rng.pick(EQUIPMENT_SLOTS);
  const slotLabel = slot.replace("Accessory1", "Accessory").replace("Accessory2", "Accessory");
  const prefixes = ["Bent", "Dusty", "Nimble", "Sharp", "Odd", "Lucky", "Stubborn", "Ancient", "Heroic", "Divine"];
  const rarity = rollEquipmentRarity(levelReq, rng, options.boss);
  const rarityScale = RARITY_DATA[rarity].modScale;
  const attackType = slot === "Weapon" ? rng.pick(["Melee", "Ranged", "Magic"]) : null;
  const chosenTemplate = slot === "Weapon" ? rng.pick(getWeaponsForStyle(attackType)) : null;
  const tierBonus = Math.floor((powerBand - 1) / 2.4);
  const damageKind = slot === "Weapon" ? chosenTemplate.damageKind : null;
  const damageDie = slot === "Weapon" ? Math.max(3, chosenTemplate.damageDie + tierBonus) : 0;
  const speed = slot === "Weapon" ? clamp(chosenTemplate.speed + rng.int(-1, 1), 2, 10) : 0;
  const hitBonus = slot === "Weapon" ? Math.floor((chosenTemplate.hitBonus || 0) + Math.floor(powerBand / 3) + rng.int(0, 1)) : 0;
  const critBonus = slot === "Weapon" ? Math.floor((chosenTemplate.critBonus || 0) + Math.floor(rarityScale - 1) + Math.floor(powerBand / 3) + rng.int(0, 1)) : 0;
  const item = {
    uid: createItemUid(),
    kind: "equipment",
    slot,
    attackType: slot === "Weapon" ? chosenTemplate.attackType : attackType,
    weaponTemplateId: slot === "Weapon" ? chosenTemplate.id : null,
    weaponFamily: slot === "Weapon" ? chosenTemplate.weaponFamily : null,
    damageDie,
    damageKind,
    speed,
    hitBonus,
    critBonus,
    tier,
    rarity,
    levelReq,
    name: slot === "Weapon"
      ? `${rarity} ${prefixes[clamp(tier - 1, 0, prefixes.length - 1)]} ${chosenTemplate.name} (${TIER_NAMES[tier - 1]})`
      : `${rarity} ${prefixes[clamp(tier - 1, 0, prefixes.length - 1)]} ${slotLabel} (${TIER_NAMES[tier - 1]})`,
    summary: slot === "Weapon" ? chosenTemplate.summary || "" : "",
    modifiers: createZeroStats(),
  };
  item.modifiers.Health = Math.floor(rng.int(1 + Math.floor(powerBand * 2), 5 + Math.floor(powerBand * 3.6)) * rarityScale);
  item.modifiers.MeleeAttack = Math.floor(rng.int(0, 1 + Math.ceil(powerBand)) * rarityScale);
  item.modifiers.MeleeDefense = Math.floor(rng.int(0, 1 + Math.ceil(powerBand)) * rarityScale);
  item.modifiers.RangedAttack = Math.floor(rng.int(0, 1 + Math.ceil(powerBand)) * rarityScale);
  item.modifiers.RangedDefense = Math.floor(rng.int(0, 1 + Math.ceil(powerBand)) * rarityScale);
  item.modifiers.MagicAttack = Math.floor(rng.int(0, 1 + Math.ceil(powerBand)) * rarityScale);
  item.modifiers.MagicDefense = Math.floor(rng.int(0, 1 + Math.ceil(powerBand)) * rarityScale);
  item.modifiers.CriticalChance = Math.floor(rng.int(0, 1 + Math.ceil(powerBand / 2)) * rarityScale);
  item.modifiers.Luck = Math.floor(rng.int(0, 1 + Math.ceil(powerBand / 2)) * rarityScale);
  ensureEquipmentHasMeaningfulBonus(item, rng);
  if (slot === "Weapon") normalizeWeaponItem(item);
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
  hideWorldInteractPopup();
  els.modalBackdrop.classList.remove("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "false");
  renderModal();
}

function closeModal() {
  if (state.modal === "gathering") {
    if (state.gathering && !state.gathering.completed) {
      finalizeGatheringSequence({ canceled: true, closeAfter: true });
    } else {
      stopGatheringSequenceTimers();
      state.gathering = null;
    }
  } else if (state.modal === "crafting") {
    stopCraftingRunTimers();
    if (state.craftingRun && !state.craftingRun.completed) {
      addWorldLog(`${state.craftingRun.recipe?.name || "Craft"} abandoned. No materials were committed.`);
    }
    state.craftingRun = null;
  }
  state.modal = null;
  state.modalData = null;
  els.modalBackdrop.classList.add("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "true");
  if (state.screen === "world" && state.game && !state.combat) renderWorld();
  updateFocusables();
}

function cycleCharacterModalTab(direction) {
  if (!state.modal || !state.game) return false;
  const currentIndex = CHARACTER_MODAL_TABS.indexOf(state.modal);
  if (currentIndex < 0) return false;
  if (state.modal === "crafting") {
    stopCraftingRunTimers();
    if (state.craftingRun && !state.craftingRun.completed) {
      addWorldLog(`${state.craftingRun.recipe?.name || "Craft"} abandoned. No materials were committed.`);
    }
    state.craftingRun = null;
  }
  const nextIndex = (currentIndex + direction + CHARACTER_MODAL_TABS.length) % CHARACTER_MODAL_TABS.length;
  state.modal = CHARACTER_MODAL_TABS[nextIndex];
  state.modalData = null;
  if (state.screen === "world" && state.game && !state.combat) renderWorld();
  renderModal();
  return true;
}

function isCharacterModal(type) {
  return CHARACTER_MODAL_TABS.includes(type);
}

function renderModalTabStrip(tabs, activeId, action, dataKey = "target") {
  const buttons = tabs.map((tab) => {
    const isActive = tab.id === activeId;
    return `<button class="focusable ${isActive ? "selected" : ""}" data-modal-action="${action}" data-${dataKey}="${escapeHtml(tab.id)}">${escapeHtml(tab.label)}</button>`;
  }).join("");
  return `<div class="modal-tab-strip">${buttons}</div>`;
}

function getActiveInventoryTab() {
  const valid = new Set(INVENTORY_TABS.map((tab) => tab.id));
  const tab = state.characterUi?.inventoryTab;
  return valid.has(tab) ? tab : INVENTORY_TABS[0].id;
}

function setActiveInventoryTab(tabId) {
  if (!INVENTORY_TABS.some((tab) => tab.id === tabId)) return false;
  state.characterUi.inventoryTab = tabId;
  return true;
}

function getActiveCraftingSkillTab() {
  const valid = new Set(CRAFTING_SKILL_TABS.map((tab) => tab.id));
  const tab = state.characterUi?.craftingSkill;
  return valid.has(tab) ? tab : CRAFTING_SKILL_TABS[0]?.id || "Clothier";
}

function setActiveCraftingSkillTab(skillName) {
  if (!CRAFTING_SKILL_TABS.some((tab) => tab.id === skillName)) return false;
  state.characterUi.craftingSkill = skillName;
  return true;
}

function getAllocatedStatPoints(player) {
  if (!player?.baseStats) return 0;
  return ALL_STATS.reduce((sum, stat) => {
    const base = BASE_START_STATS[stat] || 0;
    const current = player.baseStats[stat] || 0;
    const step = STAT_POINT_INCREASES[stat] || 1;
    return sum + Math.max(0, Math.floor((current - base) / Math.max(1, step)));
  }, 0);
}

function renderInventoryTabContent(player) {
  const activeTab = getActiveInventoryTab();
  const consumables = player.bag.filter((item) => item.kind === "consumable");
  const equipment = player.bag.filter((item) => item.kind === "equipment");
  const tools = getOwnedCraftingTools(player);
  const stations = getOwnedCraftingStations(player);
  const materials = player.bag.filter((item) => item.kind === "material");
  const treasures = player.bag.filter((item) => item.kind === "treasure");
  let body = "";
  let summary = "";

  if (activeTab === "consumables") {
    summary = `Stacks ${consumables.length} | Support items scale into level ${MAX_LEVEL} content through cooking and alchemy.`;
    body = consumables.length
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
  } else if (activeTab === "equipment") {
    summary = `Bag gear ${equipment.length} | Crafted items can roll past found gear when skill and timing are high enough.`;
    body = equipment.length
      ? equipment
        .map((item) => `
          <div class="item-row">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <p>${escapeHtml(item.rarity || "Common")} | ${escapeHtml(item.slot)} | Req Lv ${item.levelReq || 1}${item.craftQuality ? ` | Crafted ${escapeHtml(item.craftQuality)}` : ""} | ${summarizeModifiers(item.modifiers)}${item.slot === "Weapon" ? ` | ${escapeHtml(summarizeWeaponForUi(item))}` : ""}</p>
            </div>
            <button class="focusable" data-modal-action="equip-item" data-item-id="${item.uid}">Equip</button>
          </div>
        `)
        .join("")
      : "<p>No equipment in bag.</p>";
  } else if (activeTab === "tools") {
    summary = `Owned kits ${tools.length}/${CRAFTING_TOOL_ORDER.length} | Field crafting still works with tools if no town workshop or station is active.`;
    body = tools.length
      ? tools
        .map((item) => {
          const stationDef = getCraftingStationDefForSkill(item.skill);
          const stationStatus = stationDef && playerHasStation(player, stationDef.id) ? ` | Station: ${stationDef.name}` : "";
          return `<div class="item-row"><div><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.description)} (${escapeHtml(item.skill)})${escapeHtml(stationStatus)}</p></div><span>Tool</span></div>`;
        })
        .join("")
      : "<p>No crafting tools.</p>";
  } else if (activeTab === "stations") {
    summary = `Owned stations ${stations.length}/${CRAFTING_STATION_ORDER.length} | Deploy one to open that skill with workshop rules anywhere.`;
    body = stations.length
      ? stations
        .map((item) => `
          <div class="item-row">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <p>${escapeHtml(item.description)} (${escapeHtml(item.skill)})</p>
            </div>
            <button class="focusable" data-modal-action="use-station" data-item-id="${item.uid}">Deploy</button>
          </div>
        `)
        .join("")
      : "<p>No portable crafting stations owned.</p>";
  } else if (activeTab === "materials") {
    summary = `Material stacks ${materials.length} | Drops, salvage, shops, and gathering now feed the full 1-100 crafting range.`;
    body = materials.length
      ? materials.map((item) => `<div class="item-row"><div><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.description)} (x${item.quantity})</p></div><span>Material</span></div>`).join("")
      : "<p>No materials.</p>";
  } else {
    summary = `Treasure stacks ${treasures.length} | Vendor these when you want raw gold instead of crafting inputs.`;
    body = treasures.length
      ? treasures.map((item) => `<div class="item-row"><div><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.description)} (x${item.quantity})</p></div><span>Treasure</span></div>`).join("")
      : "<p>No treasure items.</p>";
  }

  return `
    ${renderModalTabStrip(INVENTORY_TABS, activeTab, "switch-inventory-tab", "tab")}
    <p>${escapeHtml(summary)}</p>
    <div class="modal-list">${body}</div>
  `;
}

function renderCraftingMenuContent(player, context) {
  const activeSkill = getActiveCraftingSkillTab();
  const skillEntry = getPlayerSkillEntry(player, activeSkill) || { level: 1, xp: 0 };
  const nextSkillXp = xpToNextSkillLevel(skillEntry.level);
  const toolDef = getCraftingToolDefForSkill(activeSkill);
  const stationDef = getCraftingStationDefForSkill(activeSkill);
  const support = getCraftingContextSupport(context, activeSkill);
  const activeStationDef = context.stationDef || null;
  const ownsTool = toolDef ? playerHasTool(player, toolDef.id) : true;
  const ownsStation = stationDef ? playerHasStation(player, stationDef.id) : false;
  const workshopSource = context.feature?.type === "crafting" ? "Field workshop" : "Town workshop";
  const skillRecipes = CRAFTING_RECIPES
    .filter((recipe) => recipe.skill === activeSkill)
    .sort((a, b) => a.minLevel - b.minLevel || a.name.localeCompare(b.name));
  const rangeText = skillRecipes.length
    ? `${skillRecipes[0].minLevel}-${skillRecipes[skillRecipes.length - 1].minLevel}`
    : "1-100";
  const modeText = context.hasWorkshop
    ? `${workshopSource} active at ${context.label}.`
    : support.stationDef
      ? `${support.stationDef.name} is deployed for ${activeSkill}; that skill crafts and recycles with workshop support.`
      : activeStationDef
        ? `${activeStationDef.name} is deployed for ${activeStationDef.skill}, but ${activeSkill} still follows field tool rules here.`
        : `Field mode active. ${toolDef?.name || "Matching tools"} is required for ${activeSkill} crafting and recycling.`;
  const toolText = toolDef ? `${toolDef.name}: ${ownsTool ? "Owned" : "Missing"}` : "No tool required.";
  const stationText = stationDef ? `${stationDef.name}: ${support.stationDef ? "Active" : ownsStation ? "Owned" : "Missing"}` : "No station available.";
  const topActions = activeStationDef
    ? `<div class="button-row"><button class="focusable" data-modal-action="clear-crafting-station">Pack Up ${escapeHtml(activeStationDef.name)}</button></div>`
    : "";
  const actionRows = getCraftingActionLibrary(player)
    .map((action) => {
      const costParts = [];
      if ((action.cpCost || 0) > 0) costParts.push(`${action.cpCost} CP`);
      if ((action.durabilityCost || 0) > 0) costParts.push(`${action.durabilityCost} Dur`);
      if (action.durabilityRestore) costParts.push(`+${action.durabilityRestore} Dur`);
      if (action.cpRestore) costParts.push(`+${action.cpRestore} CP`);
      const costText = costParts.length ? costParts.join(" | ") : "No direct cost";
      return `
        <div class="item-row">
          <div>
            <strong>${escapeHtml(action.name)}</strong>
            <p>${escapeHtml(action.description)}</p>
            <p>${escapeHtml(costText)}</p>
          </div>
          <span>${escapeHtml(action.unlock.label)}</span>
        </div>
      `;
    }).join("");
  const recipeRows = skillRecipes.length
    ? skillRecipes.map((recipe) => {
      const check = evaluateCraftingRecipe(player, recipe, context);
      const costText = recipe.costs
        .map((cost) => {
          const owned = getMaterialCount(player, cost.id);
          const def = MATERIAL_DEFS[cost.id];
          return `${owned}/${cost.qty} ${def ? def.name : cost.id}`;
        })
        .join(", ");
      const outputText = describeCraftingRecipeOutput(recipe);
      const methodText = check.hasWorkshop
        ? check.stationDef
          ? `Station: ${check.stationDef.name}`
          : "Workshop access"
        : check.toolDef
          ? `Tool: ${check.toolDef.name}`
          : "Field-ready";
      const disabled = check.ok ? "" : "disabled";
      return `
        <div class="item-row">
          <div>
            <strong>${escapeHtml(recipe.name)} (Lv ${recipe.minLevel})</strong>
            <p>${escapeHtml(recipe.description)}</p>
            <p>Cost: ${escapeHtml(costText)}</p>
            <p>${escapeHtml(methodText)} | Output: ${escapeHtml(outputText)} | ${check.ok ? "Ready" : escapeHtml(check.reason)}</p>
          </div>
          <div class="item-actions">
            <button class="focusable" data-modal-action="craft-recipe" data-recipe-id="${recipe.id}" ${disabled}>Craft</button>
          </div>
        </div>
      `;
    }).join("")
    : "<p>No recipes mapped to this skill yet.</p>";
  const recyclableBag = player.bag
    .filter((item) => item.kind === "equipment")
    .filter((item) => inferDesynthSkillForItem(item) === activeSkill);
  const recyclableEquipped = EQUIPMENT_SLOTS
    .map((slot) => ({ slot, item: player.equipment[slot] }))
    .filter((entry) => entry.item && inferDesynthSkillForItem(entry.item) === activeSkill);
  const recycleRows = [...recyclableEquipped.map((entry) => ({ source: "equipped", slot: entry.slot, item: entry.item })), ...recyclableBag.map((item) => ({ source: "bag", slot: "", item }))];
  const recycleMarkup = recycleRows.length
    ? recycleRows.map((entry) => {
      const check = evaluateDesynthAction(player, entry.item, context);
      const preview = getDesynthPreviewText(entry.item);
      const disabled = check.ok ? "" : "disabled";
      return `
        <div class="item-row">
          <div>
            <strong>${escapeHtml(entry.item.name)}${entry.source === "equipped" ? ` (${escapeHtml(entry.slot)})` : ""}</strong>
            <p>${escapeHtml(entry.item.rarity || "Common")} | Req Lv ${entry.item.levelReq || 1} | Recycles with ${escapeHtml(check.skillName || inferDesynthSkillForItem(entry.item))}</p>
            <p>Breaks down into: ${escapeHtml(preview)} | ${check.ok ? "Ready" : escapeHtml(check.reason)}</p>
          </div>
          <div class="item-actions">
            ${entry.source === "equipped"
              ? `<button class="focusable" data-modal-action="desynth-equipped-slot" data-slot="${entry.slot}" ${disabled}>Desynth</button>`
              : `<button class="focusable" data-modal-action="desynth-bag-item" data-item-id="${entry.item.uid}" ${disabled}>Desynth</button>`}
          </div>
        </div>
      `;
    }).join("")
    : `<p>No ${escapeHtml(activeSkill)} gear is available to recycle.</p>`;

  return `
    ${renderModalTabStrip(CRAFTING_SKILL_TABS, activeSkill, "switch-crafting-skill", "skill")}
    <p><strong>${escapeHtml(activeSkill)}</strong> Lv ${skillEntry.level}/${SKILL_CAP_LEVEL} (${skillEntry.level >= SKILL_CAP_LEVEL ? "MAX" : `${skillEntry.xp}/${nextSkillXp} XP`})</p>
    <p>Recipe range ${escapeHtml(rangeText)} | Recipes ${skillRecipes.length} | ${escapeHtml(toolText)} | ${escapeHtml(stationText)}</p>
    <p>${escapeHtml(modeText)}</p>
    <p>Crafting now runs as a step-based synthesis encounter with shared actions unlocked by leveling any crafting class.</p>
    ${topActions}
    <div class="modal-list">${recipeRows}</div>
    <h4>Shared Actions</h4>
    <div class="modal-list">${actionRows}</div>
    <h4>${escapeHtml(activeSkill)} Recycling</h4>
    <div class="modal-list">${recycleMarkup}</div>
  `;
}

function renderShopStockRow(entry, player) {
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
  if (entry.kind === "material") {
    const def = MATERIAL_DEFS[entry.itemId];
    return `
      <div class="item-row">
        <div>
          <strong>${entry.quantity}x ${escapeHtml(def ? def.name : entry.itemId)}</strong>
          <p>${escapeHtml(def ? def.description : "Crafting materials")} | Scaled crafting stock</p>
        </div>
        <button class="focusable" data-modal-action="buy-shop-item" data-shop-item-id="${entry.id}">Buy ${entry.price}g</button>
      </div>
    `;
  }
  if (entry.kind === "tool") {
    const def = CRAFTING_TOOL_DEFS[entry.itemId];
    const owned = playerHasTool(player, entry.itemId);
    return `
      <div class="item-row">
        <div>
          <strong>${escapeHtml(def ? def.name : entry.itemId)}</strong>
          <p>${escapeHtml(def ? def.description : "Crafting tool")} (${escapeHtml(def?.skill || "Crafting")})</p>
        </div>
        <button class="focusable" data-modal-action="buy-shop-item" data-shop-item-id="${entry.id}" ${owned ? "disabled" : ""}>${owned ? "Owned" : `Buy ${entry.price}g`}</button>
      </div>
    `;
  }
  if (entry.kind === "station") {
    const def = CRAFTING_STATION_DEFS[entry.itemId];
    const owned = playerHasStation(player, entry.itemId);
    return `
      <div class="item-row">
        <div>
          <strong>${escapeHtml(def ? def.name : entry.itemId)}</strong>
          <p>${escapeHtml(def ? def.description : "Portable crafting station")} (${escapeHtml(def?.skill || "Crafting")})</p>
        </div>
        <button class="focusable" data-modal-action="buy-shop-item" data-shop-item-id="${entry.id}" ${owned ? "disabled" : ""}>${owned ? "Owned" : `Buy ${entry.price}g`}</button>
      </div>
    `;
  }
  const item = entry.item;
  return `
    <div class="item-row">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <p>${escapeHtml(item.rarity || "Common")} | ${escapeHtml(item.slot)} | Req Lv ${item.levelReq || 1}${item.craftQuality ? ` | Crafted ${escapeHtml(item.craftQuality)}` : ""} | ${summarizeModifiers(item.modifiers)}${item.slot === "Weapon" ? ` | ${escapeHtml(summarizeWeaponForUi(item))}` : ""}</p>
      </div>
      <button class="focusable" data-modal-action="buy-shop-item" data-shop-item-id="${entry.id}">Buy ${entry.price}g</button>
    </div>
  `;
}

function getCraftingActionHotkey(index) {
  if (index < 0) return "";
  if (index < 9) return String(index + 1);
  if (index === 9) return "0";
  return "";
}

function getCraftingHotkeyIndex(key) {
  if (!/^[0-9]$/.test(key || "")) return -1;
  if (key === "0") return 9;
  return Math.max(0, Number(key) - 1);
}

function getCraftingEncounterActions(player, craftingRun) {
  if (!player || !craftingRun) return [];
  return CRAFTING_ACTION_ORDER
    .map((actionId) => getCraftingActionDef(actionId))
    .filter((actionDef) => isCraftingActionUnlocked(player, actionDef))
    .map((actionDef, index) => {
      const actionState = getCraftingActionState(craftingRun, actionDef, player);
      const cpCost = actionState.cpCost ?? actionDef.cpCost ?? 0;
      const durabilityCost = actionState.durabilityCost ?? getCraftingDurabilityCost(craftingRun, actionDef);
      const tags = [];
      if (cpCost > 0) tags.push(`${cpCost} CP`);
      if (durabilityCost > 0) tags.push(`${durabilityCost} Dur`);
      if (actionDef.allowedConditions?.length) tags.push(actionDef.allowedConditions.join("/"));
      if (actionDef.requiresObserved) tags.push("After Observe");
      if (actionDef.requiresInnerQuiet) tags.push(`IQ ${actionDef.requiresInnerQuiet}+`);
      return {
        index,
        hotkey: getCraftingActionHotkey(index),
        actionDef,
        actionState,
        tags,
      };
    });
}

function handleCraftingEncounterHotkey(key) {
  if (!state.game || state.modal !== "crafting" || !state.craftingRun || state.craftingRun.completed) return false;
  const actionIndex = getCraftingHotkeyIndex(key);
  if (actionIndex < 0) return false;
  const actionEntry = getCraftingEncounterActions(state.game.player, state.craftingRun)[actionIndex];
  if (!actionEntry) return false;
  if (!actionEntry.actionState.ok) {
    addWorldLog(actionEntry.actionState.reason || "That action cannot be used right now.");
    renderModal();
    return true;
  }
  useCraftingAction(actionEntry.actionDef.id);
  return true;
}

function renderModal() {
  if (!state.modal || !state.game) return;
  hideWorldInteractPopup();
  if (els.modalWindow) {
    els.modalWindow.classList.toggle("modal-craft-encounter", state.modal === "crafting" && !!state.craftingRun && !state.craftingRun.completed);
  }
  const player = state.game.player;
  els.modalClose.textContent = "Close";
  els.modalClose.disabled = false;

  if (state.modal === "character") {
    els.modalTitle.textContent = "Character Menu";
    const chapter = getCurrentStoryChapter();
    const skills = ensurePlayerSkills(player);
    const masteryState = ensurePlayerWeaponMastery(player);
    const activeSaveSlot = state.saveSlots.find((entry) => entry.id === state.activeSaveSlotId) || null;
    const gatheringLevel = SKILL_ORDER
      .filter((name) => SKILL_DEFS[name].role === "Gathering")
      .reduce((sum, name) => sum + (skills[name]?.level || 1), 0);
    const craftingLevel = SKILL_ORDER
      .filter((name) => SKILL_DEFS[name].role === "Crafting")
      .reduce((sum, name) => sum + (skills[name]?.level || 1), 0);
    const maxGatheringLevel = SKILL_ORDER.filter((name) => SKILL_DEFS[name].role === "Gathering").length * SKILL_CAP_LEVEL;
    const maxCraftingLevel = SKILL_ORDER.filter((name) => SKILL_DEFS[name].role === "Crafting").length * SKILL_CAP_LEVEL;
    const totalWeaponMastery = Object.values(masteryState).reduce((sum, entry) => sum + (entry.points || 0), 0);
    const trainedWeaponClasses = Object.values(masteryState).filter((entry) => (entry.points || 0) > 0).length;
    const allocatedPoints = getAllocatedStatPoints(player);
    const maxStatPoints = (MAX_LEVEL - 1) * 3;
    const detailsRows = [
      `Level ${player.level}/${MAX_LEVEL} | XP ${player.level >= MAX_LEVEL ? "MAX" : `${player.xp}/${xpToNextLevel(player.level)}`}`,
      `Gold ${player.gold} | HP ${player.currentHealth}/${player.derivedStats.Health}`,
      `Play Time ${formatPlayTime(getCurrentGamePlayTimeMs(state.game))} | Save Slot ${activeSaveSlot?.label || "Unsaved run"}`,
      `Allocated Stat Points ${allocatedPoints}/${maxStatPoints} | Unspent ${player.unspentStatPoints || 0}`,
      `Battles Won ${state.game.meta.wins} | Losses ${state.game.meta.losses}`,
      `Enemies Defeated ${state.game.meta.enemiesDefeated} | Bosses ${state.game.meta.bossesDefeated}`,
      `Quests Completed ${state.game.meta.questsCompleted} | NPC Talks ${state.game.meta.npcsTalked}`,
      `Chests Opened ${state.game.meta.chestsOpened} | Transitions ${state.game.meta.transitionsUsed}`,
      `Tiles Discovered ${state.game.meta.tilesDiscovered} | Gold Found ${state.game.meta.totalGoldFound}`,
      `Gathering Skill Total ${gatheringLevel}/${maxGatheringLevel} | Crafting Skill Total ${craftingLevel}/${maxCraftingLevel}`,
      `Weapon Mastery Total ${totalWeaponMastery} | Trained Classes ${trainedWeaponClasses}`,
      `Current Chapter: ${chapter.title}`,
    ].map((line) => `<li>${escapeHtml(line)}</li>`).join("");
    els.modalContent.innerHTML = `
      <p>Use LB/RB on controller to move across the character tabs. Inventory and crafting now keep their own sub-tabs inside this shell.</p>
      <h4>Journey Summary</h4>
      <ul class="log-list">${detailsRows}</ul>
    `;
  } else if (state.modal === "inventory") {
    els.modalTitle.textContent = "Inventory";
    els.modalContent.innerHTML = renderInventoryTabContent(player);
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
            <p>${escapeHtml(item.rarity || "Common")} | ${escapeHtml(item.name)} | Req Lv ${item.levelReq || 1}${item.craftQuality ? ` | Crafted ${escapeHtml(item.craftQuality)}` : ""} | ${summarizeModifiers(item.modifiers)}${slot === "Weapon" ? ` | ${escapeHtml(summarizeWeaponForUi(item))}` : ""}</p>
          </div>
          <button class="focusable" data-modal-action="unequip-slot" data-slot="${slot}">Unequip</button>
        </div>
      `;
    }).join("");
    els.modalContent.innerHTML = `<h4>Equipped Gear</h4><div class="modal-list">${equippedRows}</div>`;
  } else if (state.modal === "skills") {
    els.modalTitle.textContent = "Skills";
    const skills = ensurePlayerSkills(player);
    const rows = SKILL_ORDER.map((skillName) => {
      const entry = skills[skillName] || { level: 1, xp: 0 };
      const next = xpToNextSkillLevel(entry.level);
      const progress = entry.level >= SKILL_CAP_LEVEL ? "MAX" : `${entry.xp}/${next}`;
      const info = SKILL_DEFS[skillName];
      return `
        <div class="item-row">
          <div>
            <strong>${escapeHtml(skillName)} (${escapeHtml(info.role)})</strong>
            <p>Level ${entry.level}/${SKILL_CAP_LEVEL} | XP ${progress}</p>
            <p>${escapeHtml(info.summary)}</p>
          </div>
          <span>${entry.level >= SKILL_CAP_LEVEL ? "Maxed" : "Training"}</span>
        </div>
      `;
    }).join("");
    const gatheringTotal = SKILL_ORDER
      .filter((name) => SKILL_DEFS[name].role === "Gathering")
      .reduce((sum, name) => sum + (skills[name]?.level || 1), 0);
    const craftingTotal = SKILL_ORDER
      .filter((name) => SKILL_DEFS[name].role === "Crafting")
      .reduce((sum, name) => sum + (skills[name]?.level || 1), 0);
    const maxGatheringTotal = SKILL_ORDER.filter((name) => SKILL_DEFS[name].role === "Gathering").length * SKILL_CAP_LEVEL;
    const maxCraftingTotal = SKILL_ORDER.filter((name) => SKILL_DEFS[name].role === "Crafting").length * SKILL_CAP_LEVEL;
    els.modalContent.innerHTML = `
      <p>Gathering total level: ${gatheringTotal}/${maxGatheringTotal} | Crafting total level: ${craftingTotal}/${maxCraftingTotal}</p>
      <p>Weapon classes use a separate mastery system that grows from combat usage.</p>
      <div class="modal-list">${rows}</div>
    `;
  } else if (state.modal === "mastery") {
    els.modalTitle.textContent = "Weapon Mastery";
    const renderMasteryRow = (familyKey) => {
      const info = WEAPON_FAMILY_DEFS[familyKey];
      const snapshot = getWeaponMasterySnapshot(player, familyKey, info.style);
      const currentTechnique = snapshot.unlocked.length
        ? snapshot.unlocked[snapshot.unlocked.length - 1].name
        : "None learned yet";
      const nextLine = snapshot.next
        ? `${snapshot.next.name} at mastery ${snapshot.nextRequirement} (${snapshot.nextRequirement - snapshot.masteryPoints} to go)`
        : "All techniques learned. Mastery keeps growing with no cap.";
      return `
        <div class="item-row">
          <div>
            <strong>${escapeHtml(info.name)} (${escapeHtml(info.discipline)})</strong>
            <p>${escapeHtml(info.style)} | Mastery ${snapshot.masteryPoints} | Uses ${snapshot.entry.uses} | Hits ${snapshot.entry.hits} | Kills ${snapshot.entry.kills}</p>
            <div class="hub-skill-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${snapshot.progressPercent}" aria-label="${escapeHtml(info.name)} mastery progress">
              <span class="hub-skill-fill" style="width:${snapshot.progressPercent}%"></span>
            </div>
            <p>Current technique: ${escapeHtml(currentTechnique)}</p>
            <p>${escapeHtml(nextLine)}</p>
          </div>
          <span>${snapshot.learnedCount}/${snapshot.totalCount}</span>
        </div>
      `;
    };
    const meleeRows = WEAPON_FAMILY_ORDER.filter((familyKey) => WEAPON_FAMILY_DEFS[familyKey].style === "Melee").map(renderMasteryRow).join("");
    const rangedRows = WEAPON_FAMILY_ORDER.filter((familyKey) => WEAPON_FAMILY_DEFS[familyKey].style === "Ranged").map(renderMasteryRow).join("");
    const magicRows = WEAPON_FAMILY_ORDER.filter((familyKey) => WEAPON_FAMILY_DEFS[familyKey].style === "Magic").map(renderMasteryRow).join("");
    els.modalContent.innerHTML = `
      <p>Weapon mastery grows from attacks, landed hits, criticals, weakness exploitation, and kill pressure. It never caps.</p>
      <h4>Melee Classes</h4>
      <div class="modal-list">${meleeRows}</div>
      <h4>Ranged Classes</h4>
      <div class="modal-list">${rangedRows}</div>
      <h4>Magic Classes</h4>
      <div class="modal-list">${magicRows}</div>
    `;
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
    const weapon = player.equipment.Weapon;
    const snapshot = getWeaponMasterySnapshot(player, state.modalData?.familyKey || weapon, style);
    const family = snapshot.family;
    const discipline = family.discipline;
    const rows = snapshot.abilities.map((ability, index) => {
      const requirement = getAbilityMasteryRequirement(ability);
      const unlocked = snapshot.masteryPoints >= requirement;
      const status = unlocked ? "Ready" : `${requirement - snapshot.masteryPoints} mastery to go`;
      return `
      <div class="item-row">
        <div>
          <strong>${escapeHtml(ability.name)}</strong>
          <p>Requires Mastery ${requirement} | Dice ${ability.damageDice.map((die) => `1d${die}`).join(" + ")} | Hit +${ability.hitBonus}${ability.damageKind ? ` | Type ${escapeHtml(ability.damageKind)}` : ""}</p>
          <p>${escapeHtml(status)}</p>
        </div>
        <button class="focusable" data-modal-action="combat-use-skill" data-skill-index="${index}" ${unlocked ? "" : "disabled"}>${unlocked ? "Use" : "Locked"}</button>
      </div>
    `;
    }).join("");
    els.modalTitle.textContent = `${style === "Magic" ? "Spells" : "Techniques"} (${discipline})`;
    els.modalContent.innerHTML = `
      <p><strong>Style:</strong> ${escapeHtml(style)} | <strong>Weapon Class:</strong> ${escapeHtml(family.name)}</p>
      <p><strong>Mastery:</strong> ${snapshot.masteryPoints} | <strong>Uses:</strong> ${snapshot.entry.uses} | <strong>Learned:</strong> ${snapshot.learnedCount}/${snapshot.totalCount}</p>
      <div class="hub-skill-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${snapshot.progressPercent}" aria-label="${escapeHtml(family.name)} mastery progress">
        <span class="hub-skill-fill" style="width:${snapshot.progressPercent}%"></span>
      </div>
      <p><strong>Strengths:</strong> ${escapeHtml(family.strengths)} <strong>Tradeoffs:</strong> ${escapeHtml(family.weaknesses)}</p>
      <p>${snapshot.next ? `Next unlock: ${escapeHtml(snapshot.next.name)} at mastery ${snapshot.nextRequirement}.` : "All techniques learned. Mastery keeps climbing beyond the final unlock."}</p>
      <div class="modal-list">${rows}</div>
    `;
  } else if (state.modal === "combatWeapon") {
    const player = state.game.player;
    const current = player.equipment.Weapon;
    const currentStyle = getActiveAttackStyle(player);
    const rows = player.bag
      .filter((item) => item.kind === "equipment" && item.slot === "Weapon")
      .map((item) => {
        normalizeWeaponItem(item);
        const family = getWeaponFamilyDefinition(item, item.attackType);
        const mastery = getWeaponMasterySnapshot(player, item, item.attackType);
        const disabled = player.level < (item.levelReq || 1) ? "disabled" : "";
        const lockedText = player.level < (item.levelReq || 1) ? ` | Requires Lv ${item.levelReq}` : "";
        return `
          <div class="item-row">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <p>${escapeHtml(item.attackType)} | ${escapeHtml(family.discipline)} | ${escapeHtml(summarizeWeaponForUi(item))}${lockedText}</p>
              <p>Mastery ${mastery.masteryPoints} | Learned ${mastery.learnedCount}/${mastery.totalCount}${mastery.next ? ` | Next ${escapeHtml(mastery.next.name)} at ${mastery.nextRequirement}` : " | All techniques learned"}</p>
              <p>${escapeHtml(family.strengths)} Tradeoff: ${escapeHtml(family.weaknesses)}</p>
            </div>
            <button class="focusable" data-modal-action="combat-swap-weapon" data-item-id="${item.uid}" ${disabled}>Equip</button>
          </div>
        `;
      }).join("");
    const currentFamily = getWeaponFamilyDefinition(current, currentStyle);
    const currentMastery = getWeaponMasterySnapshot(player, current, currentStyle);
    els.modalTitle.textContent = "Swap Weapon";
    els.modalContent.innerHTML = `
      <p><strong>No turn cost.</strong> Equipping a different weapon updates your style and weapon class immediately.</p>
      <p><strong>Current:</strong> ${escapeHtml(current?.name || "None")} | ${escapeHtml(currentStyle)} | ${escapeHtml(currentFamily.discipline)} | Mastery ${currentMastery.masteryPoints}</p>
      <div class="modal-list">${rows || "<p>No extra weapons in the bag.</p>"}</div>
    `;
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
  } else if (state.modal === "debug") {
    const debugArea = getDebugCraftingArea(state.game.world);
    const returnPosition = state.debug.returnPosition;
    const travelRows = [
      {
        id: "debug-teleport-crafting",
        label: `Teleport to ${debugArea?.name || DEBUG_CRAFTING_AREA_ID}`,
        description: "Safe tester yard with every resource type, level band, and crafting bench.",
        disabled: !debugArea,
      },
      {
        id: "debug-return-position",
        label: "Return to Last Position",
        description: returnPosition ? `Stored tile ${returnPosition.x}, ${returnPosition.y}.` : "No previous debug teleport is stored yet.",
        disabled: !returnPosition,
      },
    ];
    const utilityRows = [
      {
        id: "debug-toggle-encounters",
        label: state.options.debugNoEncounters ? "Enable Random Encounters" : "Disable Random Encounters",
        description: state.options.debugNoEncounters
          ? "Turns world encounters back on outside safe zones and active repels."
          : "Globally suppresses random encounters while debug mode stays enabled.",
        disabled: false,
      },
      {
        id: "debug-max-gathering",
        label: "Max Gathering Skills",
        description: "Sets Botany, Mining, and Fishing to Lv 100 for progression and gate testing.",
        disabled: false,
      },
      {
        id: "debug-max-crafting",
        label: "Max Crafting Skills",
        description: "Sets every crafting class to Lv 100, unlocking shared cross-class actions.",
        disabled: false,
      },
      {
        id: "debug-grant-materials",
        label: "Grant Material Cache",
        description: "Adds 25 of every crafting material to the bag for recipe testing.",
        disabled: false,
      },
    ];
    const renderDebugRow = (entry) => `
      <div class="item-row">
        <div>
          <strong>${escapeHtml(entry.label)}</strong>
          <p>${escapeHtml(entry.description)}</p>
        </div>
        <button class="focusable" data-modal-action="${escapeHtml(entry.id)}" ${entry.disabled ? "disabled" : ""}>Use</button>
      </div>
    `;
    els.modalTitle.textContent = "Debug Menu";
    els.modalContent.innerHTML = `
      <p>Tester tools for crafting and gathering validation. DEBUG_CRAFTING is always a no-encounter zone.</p>
      <h4>Travel</h4>
      <div class="modal-list">${travelRows.map(renderDebugRow).join("")}</div>
      <h4>Boosts</h4>
      <div class="modal-list">${utilityRows.map(renderDebugRow).join("")}</div>
    `;
  } else if (state.modal === "gathering") {
    const gathering = state.gathering;
    if (!gathering) {
      els.modalTitle.textContent = "Gathering";
      els.modalContent.innerHTML = "<p>No active gathering attempt.</p>";
    } else {
      const biomeLabel = BIOME_DATA[gathering.biome]?.label || "Unknown";
      const round = gathering.round || {
        zoneStart: 0.3,
        zoneWidth: 0.24,
        perfectStart: 0.39,
        perfectWidth: 0.08,
        prompt: "Time your gather.",
      };
      const resultChips = gathering.results.length
        ? gathering.results.map((result) => `<span class="timing-chip" data-tier="${escapeHtml(result.key)}">#${result.roundNumber} ${escapeHtml(result.name)}</span>`).join("")
        : '<span class="timing-chip" data-tier="pending">No passes completed yet.</span>';
      if (gathering.completed) {
        const rewardSummary = gathering.rewardSummary || {
          rewardParts: [],
          bonusParts: [],
          bonusLabel: "",
          xpTotal: 0,
          resultSummary: "no successful passes",
          roundsUsed: gathering.results.length,
          roundsTotal: gathering.totalRounds,
          earlyStop: false,
        };
        const rewardRows = rewardSummary.rewardParts.length
          ? rewardSummary.rewardParts.map((part) => `<li>${escapeHtml(part)}</li>`).join("")
          : "<li>No materials recovered.</li>";
        const bonusText = rewardSummary.bonusParts.length
          ? `<p class="timing-note"><strong>${escapeHtml(rewardSummary.bonusLabel || "Full clear bonus")}:</strong> ${escapeHtml(rewardSummary.bonusParts.join(", "))}</p>`
          : "";
        els.modalTitle.textContent = `${gathering.featureName} Results`;
        els.modalClose.textContent = "Done";
        els.modalContent.innerHTML = `
          <div class="timing-minigame">
            <div class="timing-meta">
              <span><strong>${escapeHtml(gathering.skillName)}</strong> Lv ${gathering.skillLevel}</span>
              <span>${escapeHtml(biomeLabel)}</span>
            </div>
            <p>${rewardSummary.earlyStop ? "Gathering ended early." : "Gathering complete."} Timing summary: ${escapeHtml(rewardSummary.resultSummary)}.</p>
            <p>Passes cleared ${rewardSummary.roundsUsed}/${rewardSummary.roundsTotal} | XP ${rewardSummary.xpTotal}</p>
            ${bonusText}
            <div class="timing-chip-row">${resultChips}</div>
            <h4>Yield</h4>
            <ul class="log-list">${rewardRows}</ul>
          </div>
        `;
      } else {
        const zoneLeft = round.zoneStart * 100;
        const zoneWidth = round.zoneWidth * 100;
        const perfectLeft = round.perfectStart * 100;
        const perfectWidth = round.perfectWidth * 100;
        const statusText = gathering.waitingResult
          ? `${gathering.lastResult?.name || "Locked"} timing recorded.`
          : "Stop the marker inside the bright band for peak yield.";
        const strikeLabel = isFishingResourceKind(gathering.resourceKind) ? "Set Hook" : "Lock Timing";
        const nodePrompt = gathering.totalRounds > 1
          ? `This node has ${gathering.totalRounds} linked pulls; clear every pass for a full clear bonus.`
          : "Single pull node. Better timing still improves yield and XP.";
        els.modalTitle.textContent = `${gathering.featureName} Gathering`;
        els.modalClose.textContent = "Cancel Gathering";
        els.modalContent.innerHTML = `
          <div class="timing-minigame">
            <div class="timing-meta">
              <span><strong>${escapeHtml(gathering.skillName)}</strong> Lv ${gathering.skillLevel}</span>
              <span>Pass ${gathering.roundIndex + 1}/${gathering.totalRounds}</span>
              <span>${gathering.totalRounds} pull${gathering.totalRounds === 1 ? "" : "s"} in node</span>
              <span>${escapeHtml(biomeLabel)}</span>
            </div>
            <p>${escapeHtml(round.prompt)} Yield scales with timing quality and skill level. ${escapeHtml(nodePrompt)}</p>
            <div class="timing-track" aria-label="${escapeHtml(gathering.featureName)} timing track">
              <span class="timing-zone" style="left:${zoneLeft}%;width:${zoneWidth}%"></span>
              <span class="timing-perfect" style="left:${perfectLeft}%;width:${perfectWidth}%"></span>
              <span id="gathering-marker" class="timing-marker" style="left:${clamp(gathering.progress * 100, 0, 100)}%"></span>
            </div>
            <div class="timing-meta">
              <span id="gathering-readout">${Math.round(gathering.progress * 100)}% sweep</span>
              <span>${escapeHtml(statusText)}</span>
            </div>
            <div class="timing-chip-row">${resultChips}</div>
            <div class="button-row">
              <button class="focusable" data-modal-action="gathering-stop" ${gathering.waitingResult ? "disabled" : ""}>${strikeLabel}</button>
            </div>
          </div>
        `;
      }
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
        const qualityLine = quest.type === "craft_skill" && quest.minQuality ? ` | Quality ${quest.minQuality}+` : "";
        const focusLine = quest.skill ? ` | ${quest.skill}` : quest.biome ? ` | ${BIOME_DATA[quest.biome]?.label || quest.biome}` : quest.role ? ` | ${quest.role}` : "";
        return `
          <div class="item-row">
            <div>
              <strong>[${status}] ${escapeHtml(quest.title)}</strong>
              <p>${escapeHtml(quest.description)}</p>
              <p>${escapeHtml(quest.rank || QUEST_STAGE_LABELS[0])} | Rec Lv ${quest.recommendedLevel || 1}${escapeHtml(focusLine)}${escapeHtml(qualityLine)}</p>
              <p>Progress ${quest.progress}/${quest.target} | Reward: ${escapeHtml(reward.join(", ") || "None")}</p>
            </div>
            ${quest.completed && !quest.claimed ? `<button class="focusable" data-modal-action="claim-quest" data-quest-id="${quest.id}">Claim</button>` : "<span>-</span>"}
          </div>
        `;
      }).join("");
      const activeCount = state.game.quests.filter((quest) => !quest.claimed).length;
      els.modalContent.innerHTML = `<p>Board depth ${activeCount}/${QUEST_BOARD_ACTIVE_TARGET} active contracts. New quests scale off level, bosses, quest clears, and play time.</p><div class="modal-list">${rows}</div>`;
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
  } else if (state.modal === "crafting") {
    const context = getCurrentCraftingContext(state.modalData?.feature || null, state.modalData?.stationId || null);
    const craftingRun = state.craftingRun;
    if (craftingRun) {
      const progressPercent = clamp(Math.round((craftingRun.progress / Math.max(1, craftingRun.maxProgress)) * 100), 0, 100);
      const qualityPercent = clamp(Math.round((craftingRun.quality / Math.max(1, craftingRun.maxQuality)) * 100), 0, 100);
      const condition = getCraftingConditionDef(craftingRun.condition);
      const historyRows = (craftingRun.history || [])
        .slice()
        .reverse()
        .map((line) => `<li>${escapeHtml(line)}</li>`)
        .join("");
      const activeBuffs = [
        craftingRun.innerQuiet > 0 ? `Inner Quiet ${craftingRun.innerQuiet}` : null,
        craftingRun.buffs.veneration > 0 ? `Veneration ${craftingRun.buffs.veneration}` : null,
        craftingRun.buffs.innovation > 0 ? `Innovation ${craftingRun.buffs.innovation}` : null,
        craftingRun.buffs.waste_not > 0 ? `Waste Not ${craftingRun.buffs.waste_not}` : null,
        craftingRun.buffs.manipulation > 0 ? `Manipulation ${craftingRun.buffs.manipulation}` : null,
        craftingRun.buffs.great_strides > 0 ? "Great Strides" : null,
      ].filter(Boolean);
      if (craftingRun.completed) {
        const summary = craftingRun.summary || {
          craftedName: "Unknown item",
          recipeXp: 0,
          quality: CRAFTING_QUALITY_TIERS.good,
          methodText: context.label,
          failureReason: "Synthesis ended unexpectedly.",
        };
        const success = craftingRun.success !== false && !!summary.ok;
        const qualityChip = success
          ? `<span class="timing-chip" data-tier="${escapeHtml(craftingRun.result?.key || "good")}">${escapeHtml(summary.quality?.name || craftingRun.result?.name || "Good")}</span>`
          : `<span class="timing-chip" data-tier="rough">Failed</span>`;
        els.modalTitle.textContent = `${craftingRun.recipe.name} Result`;
        els.modalContent.innerHTML = `
          <div class="crafting-board">
            <div class="timing-meta">
              <span><strong>${escapeHtml(craftingRun.skillName)}</strong> Lv ${craftingRun.skillLevel}</span>
              <span>${escapeHtml(craftingRun.context.label)}</span>
              <span>Steps ${craftingRun.step}</span>
            </div>
            <div class="craft-gauge-group">
              <div class="craft-gauge">
                <div class="craft-gauge-label"><span>Progress</span><span>${craftingRun.progress}/${craftingRun.maxProgress}</span></div>
                <div class="craft-gauge-track"><span class="craft-gauge-fill" data-kind="progress" style="width:${progressPercent}%"></span></div>
              </div>
              <div class="craft-gauge">
                <div class="craft-gauge-label"><span>Quality</span><span>${craftingRun.quality}/${craftingRun.maxQuality}</span></div>
                <div class="craft-gauge-track"><span class="craft-gauge-fill" data-kind="quality" style="width:${qualityPercent}%"></span></div>
              </div>
            </div>
            <p>${success ? `${escapeHtml(summary.craftedName)} completed with ${escapeHtml(summary.quality?.name || "Good")} quality.` : escapeHtml(summary.failureReason || "Synthesis failed.")}</p>
            <p>Method: ${escapeHtml(summary.methodText)} | Recipe XP ${summary.recipeXp}</p>
            <p>Durability ${craftingRun.durability}/${craftingRun.maxDurability} | CP ${craftingRun.cp}/${craftingRun.maxCp}</p>
            <div class="timing-chip-row">${qualityChip}</div>
            <h4>Craft Log</h4>
            <ul class="log-list">${historyRows || "<li>No actions logged.</li>"}</ul>
            <div class="button-row">
              <button class="focusable" data-modal-action="crafting-finish">Back To Recipes</button>
            </div>
          </div>
        `;
      } else {
        const toolLine = craftingRun.hasWorkshop
          ? craftingRun.stationDef
            ? `${craftingRun.stationDef.name} is providing full workshop support.`
            : "Local workshop support is active."
          : `${craftingRun.toolDef?.name || "Field kit"} is driving this field craft.`;
        const encounterActions = getCraftingEncounterActions(player, craftingRun);
        const actionButtons = encounterActions.map((entry) => {
          const detailText = entry.actionState.ok
            ? (entry.tags.join(" | ") || "No added cost")
            : `${entry.tags.join(" | ") || "Unavailable"} | ${entry.actionState.reason}`;
          return `
            <button class="focusable craft-action-button" data-modal-action="crafting-use-action" data-craft-action="${escapeHtml(entry.actionDef.id)}" ${entry.actionState.ok ? "" : "disabled"}>
              ${entry.hotkey ? `<span class="craft-action-key">${escapeHtml(entry.hotkey)}</span>` : ""}
              <strong>${escapeHtml(entry.actionDef.name)}</strong>
              <small>${escapeHtml(entry.actionDef.description)}</small>
              <span class="craft-action-meta">${escapeHtml(detailText)}</span>
            </button>
          `;
        }).join("");
        els.modalTitle.textContent = `${craftingRun.recipe.name} Crafting`;
        els.modalClose.textContent = "Abandon Synthesis";
        els.modalContent.innerHTML = `
          <div class="craft-encounter-window">
            <div class="craft-encounter-main">
              <section class="craft-encounter-panel crafting-board">
                <div class="timing-meta">
                  <span><strong>${escapeHtml(craftingRun.skillName)}</strong> Lv ${craftingRun.skillLevel}</span>
                  <span>${escapeHtml(craftingRun.context.label)}</span>
                  <span>Step ${craftingRun.step + 1}</span>
                </div>
                <div class="craft-summary-copy">
                  <p>Dedicated synthesis window: push progress, raise quality, manage durability, and spend CP carefully.</p>
                  <p>${escapeHtml(toolLine)}</p>
                  ${craftingRun.siteBonus?.text ? `<p>${escapeHtml(craftingRun.siteBonus.text)}</p>` : ""}
                  <p>${escapeHtml(condition.description)}</p>
                </div>
                <div class="craft-gauge-group">
                  <div class="craft-gauge">
                    <div class="craft-gauge-label"><span>Progress</span><span>${craftingRun.progress}/${craftingRun.maxProgress}</span></div>
                    <div class="craft-gauge-track"><span class="craft-gauge-fill" data-kind="progress" style="width:${progressPercent}%"></span></div>
                  </div>
                  <div class="craft-gauge">
                    <div class="craft-gauge-label"><span>Quality</span><span>${craftingRun.quality}/${craftingRun.maxQuality}</span></div>
                    <div class="craft-gauge-track"><span class="craft-gauge-fill" data-kind="quality" style="width:${qualityPercent}%"></span></div>
                  </div>
                </div>
                <div class="craft-status-grid">
                  <div class="craft-status-card">
                    <strong>Durability</strong>
                    <span>${craftingRun.durability}/${craftingRun.maxDurability}</span>
                  </div>
                  <div class="craft-status-card">
                    <strong>CP</strong>
                    <span>${craftingRun.cp}/${craftingRun.maxCp}</span>
                  </div>
                  <div class="craft-status-card">
                    <strong>Condition</strong>
                    <span class="craft-status-chip" data-condition="${escapeHtml(condition.key)}">${escapeHtml(condition.label)}</span>
                  </div>
                  <div class="craft-status-card">
                    <strong>Stats</strong>
                    <span>Craft ${craftingRun.craftsmanship} | Ctrl ${craftingRun.control}</span>
                  </div>
                </div>
                <div class="craft-buff-row">${activeBuffs.length ? activeBuffs.map((buff) => `<span class="craft-buff-chip">${escapeHtml(buff)}</span>`).join("") : '<span class="craft-buff-chip">No active buffs</span>'}</div>
              </section>
              <aside class="craft-encounter-panel craft-log-panel">
                <h4>Craft Log</h4>
                <ul class="log-list craft-log-list">${historyRows || "<li>No actions logged.</li>"}</ul>
              </aside>
            </div>
            <div class="craft-action-dock">
              <div class="timing-meta">
                <span>Use mouse, controller focus + confirm, or keyboard hotkeys 1-0.</span>
                <span>${encounterActions.length} actions available</span>
              </div>
              <div class="craft-action-grid">${actionButtons}</div>
            </div>
          </div>
        `;
      }
    } else {
      els.modalTitle.textContent = `${context.label} Crafting`;
      els.modalContent.innerHTML = renderCraftingMenuContent(player, context);
    }
  } else if (state.modal === "shop") {
    const shopFeature = state.modalData?.feature || null;
    els.modalTitle.textContent = shopFeature ? `${shopFeature.name} Shop` : "Shop";
    if (!shopFeature || !shopFeature.hasShop) {
      els.modalContent.innerHTML = "<p>No shop is available here.</p>";
    } else {
      maybeRestockShop(shopFeature);
      const stock = shopFeature.shopStock || [];
      const rows = stock.length ? stock.map((entry) => renderShopStockRow(entry, player)).join("") : "<p>Shop shelves are currently empty.</p>";
      els.modalContent.innerHTML = `
        <p>Gold: ${state.game.player.gold} | Shop tier ${(shopFeature.shopTier || 1) * 10}/100 stock band</p>
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

  if (isCharacterModal(state.modal)) {
    const tabStrip = renderModalTabStrip(
      CHARACTER_MODAL_TABS.map((tabId) => ({ id: tabId, label: CHARACTER_MODAL_LABELS[tabId] || tabId })),
      state.modal,
      "open-character-section",
      "target",
    );
    els.modalContent.innerHTML = `${tabStrip}${els.modalContent.innerHTML}`;
  }

  updateFocusables();
  if (state.modal === "gathering") {
    if (state.gathering?.completed) {
      state.focusIndex = Math.max(0, state.focusables.length - 1);
      applyFocusStyles();
    } else {
      focusButtonByDataset("modalAction", "gathering-stop");
    }
  } else if (state.modal === "crafting" && state.craftingRun) {
    if (state.craftingRun.completed) {
      focusButtonByDataset("modalAction", "crafting-finish");
    } else {
      focusButtonByDataset("craftAction", "basic_synthesis");
    }
  }
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
      state.modal = "levelup";
      state.modalData = null;
      renderModal();
      return;
    }
    if (target === "crafting") {
      openCraftingMenu(null, { skillName: getActiveCraftingSkillTab() });
      return;
    }
    state.modal = target;
    state.modalData = null;
    renderModal();
    return;
  }

  if (action === "switch-inventory-tab") {
    const tabId = button.dataset.tab;
    if (!tabId || !setActiveInventoryTab(tabId)) return;
    renderModal();
    return;
  }

  if (action === "switch-crafting-skill") {
    const skillName = button.dataset.skill;
    if (!skillName || !setActiveCraftingSkillTab(skillName)) return;
    renderModal();
    return;
  }

  if (action === "clear-crafting-station") {
    if (state.modalData) state.modalData.stationId = null;
    renderModal();
    return;
  }

  if (action === "gathering-stop") {
    resolveGatheringTimingInput();
    return;
  }

  if (action === "crafting-stop") {
    resolveCraftingTimingInput();
    return;
  }

  if (action === "crafting-use-action") {
    const craftAction = button.dataset.craftAction;
    if (!craftAction) return;
    useCraftingAction(craftAction);
    return;
  }

  if (action === "crafting-finish") {
    stopCraftingRunTimers();
    state.craftingRun = null;
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
    } else if (definition.repelSteps) {
      applyWorldEffect(player, {
        id: definition.id,
        name: definition.name,
        steps: definition.repelSteps,
        repel: true,
      });
      consumeStack(player, uid);
      addWorldLog(`${definition.name} used. Random encounters are repelled for ${definition.repelSteps} steps.`);
      playSfx("buff");
    } else {
      addWorldLog(`${definition.name} can only be used in combat.`);
    }
    renderWorld();
    renderModal();
    return;
  }

  if (action === "use-station") {
    const uid = button.dataset.itemId;
    const station = player.bag.find((entry) => entry.uid === uid && entry.kind === "station");
    if (!station) return;
    addWorldLog(`${station.name} deployed for ${station.skill}.`);
    openCraftingMenu(null, { stationId: station.id, skillName: station.skill });
    return;
  }

  if (action === "combat-use-skill") {
    const player = state.game.player;
    const style = getActiveAttackStyle(player);
    const weapon = player.equipment.Weapon;
    const snapshot = getWeaponMasterySnapshot(player, weapon, style);
    const index = Number(button.dataset.skillIndex);
    const selected = Number.isFinite(index) ? snapshot.abilities[index] : null;
    const requirement = selected ? getAbilityMasteryRequirement(selected) : Infinity;
    if (!selected || snapshot.masteryPoints < requirement) {
      addWorldLog("That technique is not mastered yet.");
      renderModal();
      return;
    }
    closeModal();
    resolvePlayerAttack({ kind: "skill", abilityOverride: selected });
    return;
  }

  if (action === "combat-swap-weapon") {
    const uid = button.dataset.itemId;
    const item = player.bag.find((entry) => entry.uid === uid && entry.kind === "equipment" && entry.slot === "Weapon");
    if (!item) return;
    if (player.level < (item.levelReq || 1)) {
      pushCombatLog(`Level ${item.levelReq} required to equip ${item.name}.`);
      renderModal();
      return;
    }
    const result = equipFromBag(player, uid);
    if (!result) return;
    closeModal();
    const family = getWeaponFamilyDefinition(result.item, result.nextStyle);
    const styleLine = result.previousStyle !== result.nextStyle ? ` Style shifts to ${result.nextStyle}.` : "";
    pushCombatLog(`Weapon swap: ${result.item.name} equipped. Class is now ${family.discipline}.${styleLine} No turn spent.`);
    renderCombat();
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

  if (action === "debug-teleport-crafting") {
    closeModal();
    teleportToDebugCraftingArea();
    return;
  }

  if (action === "debug-return-position") {
    closeModal();
    returnFromDebugCraftingArea();
    return;
  }

  if (action === "debug-toggle-encounters") {
    state.options.debugNoEncounters = !state.options.debugNoEncounters;
    addWorldLog(state.options.debugNoEncounters
      ? "Debug toggle enabled. Random encounters are disabled."
      : "Debug toggle disabled. Random encounters are enabled.");
    renderWorld();
    renderModal();
    return;
  }

  if (action === "debug-max-gathering") {
    setSkillLevelsByRole("Gathering");
    renderModal();
    return;
  }

  if (action === "debug-max-crafting") {
    setSkillLevelsByRole("Crafting");
    renderModal();
    return;
  }

  if (action === "debug-grant-materials") {
    grantDebugMaterialCache();
    renderModal();
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

  if (action === "craft-recipe") {
    const recipeId = button.dataset.recipeId;
    if (!recipeId) return;
    beginCraftingRecipe(recipeId);
    renderWorld();
    return;
  }

  if (action === "desynth-bag-item") {
    const uid = button.dataset.itemId;
    if (!uid) return;
    desynthBagItem(uid);
    renderWorld();
    renderModal();
    return;
  }

  if (action === "desynth-equipped-slot") {
    const slot = button.dataset.slot;
    if (!slot) return;
    desynthEquippedItem(slot);
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
    const result = equipFromBag(player, uid);
    if (!result) return;
    if (item.slot === "Weapon") {
      const family = getWeaponFamilyDefinition(item, result.nextStyle);
      const styleShift = result.previousStyle !== result.nextStyle ? ` Style shifted to ${result.nextStyle}.` : "";
      addWorldLog(`Equipped ${item.name}. Class is now ${family.discipline}.${styleShift}`);
    } else {
      addWorldLog(`Equipped ${item.name}.`);
    }
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
    syncPlayerStyleToWeapon(player);
    recalculatePlayerStats(player, true);
    addWorldLog(`Unequipped ${item.name}.`);
    renderWorld();
    renderModal();
  }
}

function equipFromBag(player, uid) {
  const index = player.bag.findIndex((entry) => entry.uid === uid && entry.kind === "equipment");
  if (index < 0) return null;
  const item = player.bag[index];
  player.bag.splice(index, 1);
  if (item.slot === "Weapon") normalizeWeaponItem(item);
  const previousStyle = getActiveAttackStyle(player);
  const previous = player.equipment[item.slot];
  player.equipment[item.slot] = item;
  if (previous) addItemToBag(player, previous);
  const nextStyle = syncPlayerStyleToWeapon(player);
  recalculatePlayerStats(player, true);
  return { item, previous, previousStyle, nextStyle };
}

function addItemToBag(player, item) {
  if (item.kind === "consumable" || item.kind === "material" || item.kind === "treasure") {
    const existing = player.bag.find((entry) => entry.kind === item.kind && entry.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
      return;
    }
  }
  if (item.kind === "tool") {
    if (playerHasTool(player, item.id)) return;
    normalizeToolItem(item);
  }
  if (item.kind === "station") {
    if (playerHasStation(player, item.id)) return;
    normalizeStationItem(item);
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

function isCraftingWorkshopFeature(feature) {
  return !!feature && (feature.type === "city" || feature.type === "town" || feature.type === "crafting");
}

function getCraftingToolDefForSkill(skillName) {
  const toolId = CRAFTING_TOOL_BY_SKILL[skillName];
  return toolId ? CRAFTING_TOOL_DEFS[toolId] || null : null;
}

function normalizeToolItem(item) {
  if (!item || item.kind !== "tool") return item;
  const definition = CRAFTING_TOOL_DEFS[item.id];
  if (!definition) return null;
  item.uid = item.uid || createItemUid();
  item.name = definition.name;
  item.description = definition.description;
  item.skill = definition.skill;
  return item;
}

function normalizeStationItem(item) {
  if (!item || item.kind !== "station") return item;
  const definition = CRAFTING_STATION_DEFS[item.id];
  if (!definition) return null;
  item.uid = item.uid || createItemUid();
  item.name = definition.name;
  item.description = definition.description;
  item.skill = definition.skill;
  return item;
}

function playerHasTool(player, toolId) {
  if (!player || !toolId) return false;
  return player.bag.some((item) => item.kind === "tool" && item.id === toolId);
}

function playerHasStation(player, stationId) {
  if (!player || !stationId) return false;
  return player.bag.some((item) => item.kind === "station" && item.id === stationId);
}

function addToolToBag(player, toolId) {
  const definition = CRAFTING_TOOL_DEFS[toolId];
  if (!player || !definition) return false;
  if (playerHasTool(player, toolId)) return false;
  player.bag.push({
    uid: createItemUid(),
    kind: "tool",
    id: definition.id,
    name: definition.name,
    description: definition.description,
    skill: definition.skill,
  });
  return true;
}

function addStationToBag(player, stationId) {
  const definition = CRAFTING_STATION_DEFS[stationId];
  if (!player || !definition) return false;
  if (playerHasStation(player, stationId)) return false;
  player.bag.push({
    uid: createItemUid(),
    kind: "station",
    id: definition.id,
    name: definition.name,
    description: definition.description,
    skill: definition.skill,
  });
  return true;
}

function getOwnedCraftingTools(player) {
  if (!player) return [];
  return player.bag
    .filter((item) => item.kind === "tool")
    .map((item) => normalizeToolItem(item))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getOwnedCraftingStations(player) {
  if (!player) return [];
  return player.bag
    .filter((item) => item.kind === "station")
    .map((item) => normalizeStationItem(item))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getCraftingStationDefForSkill(skillName) {
  const stationId = CRAFTING_STATION_BY_SKILL[skillName];
  return stationId ? CRAFTING_STATION_DEFS[stationId] || null : null;
}

function getCurrentCraftingContext(feature = null, stationId = null) {
  if (!state.game) {
    return {
      feature: null,
      hasWorkshop: false,
      stationDef: null,
      stationId: null,
      biome: "plains",
      biomeLabel: "Unknown",
      label: "Field Kit",
    };
  }
  const activeFeature = feature || getFeatureAt(state.game.world, state.game.player.position.x, state.game.player.position.y);
  const tile = state.game.world.tiles?.[state.game.player.position.y]?.[state.game.player.position.x];
  const biome = tile?.biome || "plains";
  const biomeLabel = BIOME_DATA[biome]?.label || "Unknown";
  const activeStationId = stationId && playerHasStation(state.game.player, stationId) ? stationId : null;
  const stationDef = activeStationId ? CRAFTING_STATION_DEFS[activeStationId] || null : null;
  if (isCraftingWorkshopFeature(activeFeature)) {
    const focusText = activeFeature.type === "crafting" && activeFeature.skillFocus
      ? ` (${activeFeature.skillFocus})`
      : "";
    return {
      feature: activeFeature,
      hasWorkshop: true,
      stationDef: null,
      stationId: null,
      biome,
      biomeLabel,
      label: `${activeFeature.name}${focusText} Workshop`,
    };
  }
  return {
    feature: activeFeature,
    hasWorkshop: false,
    stationDef,
    stationId: stationDef?.id || null,
    biome,
    biomeLabel,
    label: stationDef ? `${stationDef.name} (${biomeLabel})` : `${biomeLabel} Field Kit`,
  };
}

function craftingContextHasWorkshop(context, skillName) {
  if (context?.hasWorkshop) return true;
  return !!(context?.stationDef && context.stationDef.skill === skillName);
}

function getCraftingContextSupport(context, skillName) {
  return {
    hasWorkshop: craftingContextHasWorkshop(context, skillName),
    stationDef: context?.stationDef?.skill === skillName ? context.stationDef : null,
  };
}

function isFishingResourceKind(resourceKind) {
  return resourceKind === "fishing" || resourceKind === "tidepool";
}

function getResourceNodeBiome(feature) {
  if (!state.game || !feature) return "plains";
  return state.game.world?.tiles?.[feature.y]?.[feature.x]?.biome || "plains";
}

function getGatheringEfficiencyProfile(resultKey, skillLevel) {
  const base = GATHERING_TIMING_TIERS[resultKey] || GATHERING_TIMING_TIERS.good;
  const skillFactor = clamp(skillLevel, 1, SKILL_CAP_LEVEL);
  return {
    ...base,
    quantityScale: Math.max(0.45, base.quantityScale + skillFactor * (resultKey === "miss" ? 0.001 : 0.0024)),
    xpScale: base.xpScale + skillFactor * 0.0016,
    chanceBonus: base.chanceBonus + clamp(skillFactor * 0.0008, 0, 0.08),
    flatBonus: base.flatBonus + (resultKey !== "miss" && skillFactor >= 45 ? 1 : 0) + (resultKey === "perfect" && skillFactor >= 85 ? 1 : 0),
  };
}

function getGatheringTimingProfile(feature, roundIndex, skillLevel) {
  const biome = getResourceNodeBiome(feature);
  const biomeTuning = GATHERING_BIOME_TUNING[biome] || GATHERING_BIOME_TUNING.plains;
  const resourceTuning = GATHERING_RESOURCE_TUNING[feature.resourceKind] || GATHERING_RESOURCE_TUNING.tree;
  const roundRng = createRng(hashString(`${state.game?.seed || "gather"}|${feature.id}|${feature.resourceKind}|${biome}|${roundIndex}`));
  const skillEase = clamp(skillLevel * 0.0014, 0, 0.09);
  const zoneWidth = clamp(biomeTuning.zoneWidth * resourceTuning.zoneWidth + skillEase, 0.12, 0.34);
  const perfectWidth = clamp(zoneWidth * (0.28 + skillLevel * 0.0006), 0.035, zoneWidth * 0.52);
  const zoneStart = clamp(0.05 + roundRng.next() * Math.max(0.08, 0.9 - zoneWidth), 0.04, 0.96 - zoneWidth);
  const perfectStart = zoneStart + roundRng.next() * Math.max(0.01, zoneWidth - perfectWidth);
  const direction = roundRng.next() < 0.5 ? 1 : -1;
  const startProgress = direction > 0 ? 0 : 1;
  const speed = clamp(
    biomeTuning.speed * resourceTuning.speed * (1 + roundIndex * 0.035) * (1 - clamp((skillLevel - 1) * 0.0018, 0, 0.16)),
    0.5,
    1.45,
  );
  return {
    biome,
    zoneStart,
    zoneWidth,
    perfectStart,
    perfectWidth,
    direction,
    startProgress,
    speed,
    prompt: resourceTuning.prompt,
  };
}

function stopGatheringSequenceTimers() {
  if (!state.gathering) return;
  if (state.gathering.frameId) {
    window.cancelAnimationFrame(state.gathering.frameId);
    state.gathering.frameId = 0;
  }
  if (state.gathering.advanceTimeoutId) {
    window.clearTimeout(state.gathering.advanceTimeoutId);
    state.gathering.advanceTimeoutId = 0;
  }
}

function updateGatheringMinigameUi() {
  if (!state.gathering) return;
  const marker = document.getElementById("gathering-marker");
  if (marker) marker.style.left = `${clamp(state.gathering.progress * 100, 0, 100)}%`;
  const readout = document.getElementById("gathering-readout");
  if (readout) readout.textContent = `${Math.round(state.gathering.progress * 100)}% sweep`;
}

function startGatheringSequenceLoop() {
  stopGatheringSequenceTimers();
  if (!state.gathering || state.modal !== "gathering" || state.gathering.completed || state.gathering.waitingResult) return;
  const tick = (timestamp) => {
    if (!state.gathering || state.modal !== "gathering" || state.gathering.completed || state.gathering.waitingResult) return;
    const previous = state.gathering.lastFrameAt || timestamp;
    const deltaSeconds = Math.max(0.001, Math.min(0.04, (timestamp - previous) / 1000));
    state.gathering.lastFrameAt = timestamp;
    state.gathering.progress += state.gathering.direction * deltaSeconds * state.gathering.speed;
    if (state.gathering.progress >= 1) {
      state.gathering.progress = 1;
      state.gathering.direction = -1;
    } else if (state.gathering.progress <= 0) {
      state.gathering.progress = 0;
      state.gathering.direction = 1;
    }
    updateGatheringMinigameUi();
    state.gathering.frameId = window.requestAnimationFrame(tick);
  };
  state.gathering.lastFrameAt = 0;
  state.gathering.frameId = window.requestAnimationFrame(tick);
}

function setupGatheringSequenceRound() {
  if (!state.gathering) return;
  const round = getGatheringTimingProfile(state.gathering.feature, state.gathering.roundIndex, state.gathering.skillLevel);
  state.gathering.round = round;
  state.gathering.progress = round.startProgress;
  state.gathering.direction = round.direction;
  state.gathering.speed = round.speed;
  state.gathering.waitingResult = false;
  state.gathering.lastResult = null;
  state.gathering.lastFrameAt = 0;
}

function evaluateGatheringTimingResult() {
  if (!state.gathering?.round) return GATHERING_TIMING_TIERS.miss;
  const { progress, round } = state.gathering;
  const zoneEnd = round.zoneStart + round.zoneWidth;
  const perfectEnd = round.perfectStart + round.perfectWidth;
  let key = "miss";
  if (progress >= round.perfectStart && progress <= perfectEnd) {
    key = "perfect";
  } else if (progress >= round.zoneStart && progress <= zoneEnd) {
    const zoneCenter = round.zoneStart + round.zoneWidth / 2;
    const normalizedOffset = Math.abs(progress - zoneCenter) / Math.max(0.0001, round.zoneWidth / 2);
    key = normalizedOffset <= 0.38 ? "great" : "good";
  }
  const tier = GATHERING_TIMING_TIERS[key] || GATHERING_TIMING_TIERS.miss;
  return {
    ...tier,
    progress,
    roundNumber: state.gathering.roundIndex + 1,
    score: tier.score || 0,
  };
}

function summarizeGatheringTiming(results) {
  if (!results?.length) return "no successful passes";
  return results.map((result) => `#${result.roundNumber} ${result.name}`).join(", ");
}

function getGatheringTimingScore(result) {
  if (!result) return GATHERING_TIMING_TIERS.miss.score;
  if (typeof result.score === "number" && Number.isFinite(result.score)) return result.score;
  return GATHERING_TIMING_TIERS[result.key]?.score || GATHERING_TIMING_TIERS.miss.score;
}

function getGatheringSfxType(resourceKind) {
  return `gather-${resourceKind || "tree"}`;
}

function getGatheringResultSfxType(resultKey) {
  const key = GATHERING_TIMING_TIERS[resultKey] ? resultKey : "good";
  return `gather-${key}`;
}

function getCraftingSfxType(skillName) {
  const key = String(skillName || "").toLowerCase();
  if (!key) return "craft-generic";
  return `craft-${key}`;
}

function rollResourceNodeDrops(definition, skillLevel, rng, efficiency = null) {
  const outcome = efficiency || { chanceBonus: 0, quantityScale: 1, flatBonus: 0, guaranteedPrimary: 0, key: "good" };
  const drops = [];
  (definition.drops || []).forEach((drop) => {
    const chanceBonus = clamp(skillLevel * 0.0018 + (outcome.chanceBonus || 0), -0.18, 0.32);
    const dropChance = clamp((drop.chance ?? 1) + chanceBonus, 0, 1);
    if (rng.next() > dropChance) return;
    let quantity = rng.int(drop.min || 1, drop.max || 1);
    if (skillLevel >= 35 && rng.next() < 0.16) quantity += 1;
    if (skillLevel >= 70 && rng.next() < 0.1) quantity += 1;
    quantity = Math.max(1, Math.round(quantity * Math.max(0.45, outcome.quantityScale || 1)));
    if ((outcome.flatBonus || 0) > 0 && ((drop.chance ?? 1) >= 1 || rng.next() < 0.24 + Math.min(0.24, Math.max(0, outcome.chanceBonus || 0)))) {
      quantity += outcome.flatBonus;
    }
    drops.push({ id: drop.id, quantity });
  });
  if (!drops.length && (outcome.guaranteedPrimary || 0) > 0 && definition.drops?.length) {
    const primary = definition.drops[0];
    drops.push({
      id: primary.id,
      quantity: Math.max(1, (outcome.guaranteedPrimary || 1) + (outcome.key === "perfect" ? 1 : 0) + (skillLevel >= 60 && outcome.key !== "miss" ? 1 : 0)),
    });
  }
  return drops;
}

function resolveFishingAttempt(attempt, rng, efficiency = null) {
  // Hook point for a future active fishing minigame.
  if (attempt?.useMinigame && typeof window.runFishingMinigame === "function") {
    const minigameResult = window.runFishingMinigame(attempt);
    if (minigameResult && typeof minigameResult === "object") return minigameResult;
  }
  const skillLevel = clamp(Math.floor(attempt?.skillLevel || 1), 1, SKILL_CAP_LEVEL);
  const outcome = efficiency || getGatheringEfficiencyProfile("good", skillLevel);
  const catchChance = clamp(0.58 + skillLevel * 0.0032 + (outcome.chanceBonus || 0) * 0.75, 0.38, 0.97);
  if (rng.next() > catchChance) {
    const pityCatch = outcome.key === "perfect" || (outcome.key === "great" && rng.next() < 0.42);
    if (pityCatch) {
      const pityCount = Math.max(1, 1 + (outcome.key === "perfect" ? 1 : 0) + (skillLevel >= 55 ? 1 : 0));
      return {
        drops: [{ id: "fresh_fish", quantity: pityCount }],
        xp: Math.max(4, Math.round((8 + rng.int(0, 4)) * outcome.xpScale)),
        message: `Late hook still lands ${pityCount} fish.`,
      };
    }
    return {
      drops: [],
      xp: Math.max(3, Math.round((6 + rng.int(0, 3)) * outcome.xpScale)),
      message: "The line slips free before the catch commits.",
    };
  }
  let fishCount = 1 + (rng.next() < 0.28 ? 1 : 0);
  if (skillLevel >= 60 && rng.next() < 0.15) fishCount += 1;
  fishCount = Math.max(1, Math.round(fishCount * Math.max(0.55, outcome.quantityScale || 1))) + Math.max(0, outcome.flatBonus || 0);
  const drops = [{ id: "fresh_fish", quantity: fishCount }];
  if (rng.next() < clamp(0.12 + skillLevel * 0.0016 + Math.max(0, outcome.chanceBonus || 0) * 0.7, 0.12, 0.48)) {
    drops.push({ id: "river_scale", quantity: 1 });
  }
  return {
    drops,
    xp: Math.max(1, Math.round((12 + rng.int(0, 5)) * outcome.xpScale)),
    message: `${outcome.name} catch: ${fishCount} fish.`,
  };
}

function buildGatheringRoundRewards(feature, roundResult, skillLevel, rng) {
  const def = getResourceNodeDef(feature.resourceKind);
  const efficiency = getGatheringEfficiencyProfile(roundResult.key, skillLevel);
  if (isFishingResourceKind(feature.resourceKind)) {
    const fishingReward = resolveFishingAttempt({
      featureId: feature.id,
      minigameId: feature.fishingState?.minigameId || def.minigameId || "fishing_basic_v1",
      useMinigame: false,
      skillLevel,
    }, rng, efficiency);
    if (feature.resourceKind === "tidepool") {
      if (rng.next() < clamp(0.22 + skillLevel * 0.0022 + Math.max(0, efficiency.chanceBonus || 0), 0.22, 0.72)) {
        fishingReward.drops.push({ id: "slime_gel", quantity: 1 + (roundResult.key === "perfect" ? 1 : 0) });
      }
      if (rng.next() < clamp(0.1 + skillLevel * 0.0018 + (roundResult.key === "perfect" ? 0.12 : 0), 0.1, 0.42)) {
        fishingReward.drops.push({ id: "beast_fang", quantity: 1 });
      }
      fishingReward.message = `${roundResult.name} tidepool sweep secures a mixed catch.`;
    }
    return fishingReward;
  }
  return {
    drops: rollResourceNodeDrops(def, skillLevel, rng, efficiency),
    xp: Math.max(1, Math.round(rng.int(def.xpMin || 6, def.xpMax || 12) * efficiency.xpScale)),
    message: `${roundResult.name} timing on pass ${roundResult.roundNumber}.`,
  };
}

function buildGatheringCompletionBonus(feature, results, skillLevel, rng, totalRounds) {
  const roundsCleared = Math.max(0, results?.length || 0);
  const expectedRounds = Math.max(1, Math.floor(totalRounds || roundsCleared || 1));
  if (!feature || roundsCleared <= 0 || expectedRounds <= 1 || roundsCleared < expectedRounds) return null;
  const def = getResourceNodeDef(feature.resourceKind);
  const averageScore = results.reduce((sum, result) => sum + getGatheringTimingScore(result), 0) / roundsCleared;
  const perfectCount = results.filter((result) => result.key === "perfect").length;
  const greatOrBetterCount = results.filter((result) => result.key === "great" || result.key === "perfect").length;
  const skillFactor = clamp(skillLevel, 1, SKILL_CAP_LEVEL);
  const baseBonusFactor = clamp(0.28 + averageScore * 0.42 + skillFactor * 0.0045, 0.35, 1.75);
  const drops = [];

  if (isFishingResourceKind(feature.resourceKind)) {
    const fishBonus = Math.max(1, Math.round(roundsCleared * baseBonusFactor));
    drops.push({ id: "fresh_fish", quantity: fishBonus });
    const scaleChance = clamp(0.18 + averageScore * 0.16 + greatOrBetterCount * 0.08 + skillFactor * 0.0018, 0.18, 0.92);
    if (rng.next() < scaleChance) {
      drops.push({ id: "river_scale", quantity: 1 + (perfectCount >= 2 ? 1 : 0) });
    }
    if (feature.resourceKind === "tidepool" && rng.next() < clamp(0.16 + averageScore * 0.14 + perfectCount * 0.08, 0.16, 0.68)) {
      drops.push({ id: "slime_gel", quantity: 1 + (perfectCount >= 2 ? 1 : 0) });
    }
  } else {
    const primary = def.drops?.[0];
    if (primary) {
      const primaryQty = Math.max(1, Math.round(roundsCleared * baseBonusFactor));
      drops.push({ id: primary.id, quantity: primaryQty });
    }
    const secondary = def.drops?.[1];
    if (secondary) {
      let secondaryQty = 0;
      const secondaryChance = clamp(0.12 + averageScore * 0.14 + greatOrBetterCount * 0.09 + skillFactor * 0.0016, 0.14, 0.88);
      if (rng.next() < secondaryChance) secondaryQty += 1;
      if (perfectCount > 0 && rng.next() < 0.4) secondaryQty += 1;
      if (secondaryQty > 0) drops.push({ id: secondary.id, quantity: secondaryQty });
    }
  }

  const qualityLabel = perfectCount === roundsCleared
    ? "Perfect sweep"
    : greatOrBetterCount >= Math.ceil(roundsCleared * 0.6)
      ? "Clean sweep"
      : "Full clear";
  return {
    drops,
    xp: Math.max(2, Math.round(roundsCleared * (3 + averageScore * 2.4 + skillFactor * 0.03))),
    label: `${qualityLabel} bonus`,
    message: `${qualityLabel} bonus secured for clearing all ${roundsCleared} pull${roundsCleared === 1 ? "" : "s"}.`,
  };
}

function finalizeGatheringSequence({ canceled = false, closeAfter = false } = {}) {
  if (!state.game || !state.gathering) return;
  stopGatheringSequenceTimers();
  const gathering = state.gathering;
  if (gathering.appliedRewards) {
    if (closeAfter) state.gathering = null;
    return;
  }
  const { player, runtimeRng } = state.game;
  const feature = state.game.world.features.find((entry) => entry.id === gathering.featureId);
  const completedRounds = gathering.results.length;
  if (!feature || feature.type !== "resource" || completedRounds <= 0) {
    if (canceled) addWorldLog("Gathering canceled before any yield was collected.");
    if (closeAfter) state.gathering = null;
    return;
  }
  const def = getResourceNodeDef(feature.resourceKind);
  const totals = {};
  const bonusTotals = {};
  const roundMessages = [];
  let xpTotal = 0;
  gathering.results.forEach((result) => {
    const reward = buildGatheringRoundRewards(feature, result, gathering.skillLevel, runtimeRng);
    xpTotal += Math.max(1, Math.floor(reward.xp || 0));
    if (reward.message) roundMessages.push(reward.message);
    (reward.drops || []).forEach((drop) => {
      totals[drop.id] = (totals[drop.id] || 0) + Math.max(1, Math.floor(drop.quantity || 1));
    });
  });
  const completionBonus = buildGatheringCompletionBonus(feature, gathering.results, gathering.skillLevel, runtimeRng, gathering.totalRounds);
  if (completionBonus) {
    xpTotal += Math.max(1, Math.floor(completionBonus.xp || 0));
    if (completionBonus.message) roundMessages.push(completionBonus.message);
    (completionBonus.drops || []).forEach((drop) => {
      const quantity = Math.max(1, Math.floor(drop.quantity || 1));
      totals[drop.id] = (totals[drop.id] || 0) + quantity;
      bonusTotals[drop.id] = (bonusTotals[drop.id] || 0) + quantity;
    });
  }

  const rewardParts = Object.entries(totals).map(([materialId, quantity]) => {
    const matDef = MATERIAL_DEFS[materialId];
    if (!matDef) return null;
    addStackableLoot(player, "material", matDef, quantity);
    return `${quantity}x ${matDef.name}`;
  }).filter(Boolean);
  const bonusParts = Object.entries(bonusTotals).map(([materialId, quantity]) => {
    const matDef = MATERIAL_DEFS[materialId];
    if (!matDef) return null;
    return `${quantity}x ${matDef.name}`;
  }).filter(Boolean);
  const totalGathered = Object.values(totals).reduce((sum, quantity) => sum + quantity, 0);

  feature.charges = Math.max(0, feature.charges - completedRounds);
  state.game.stepCount += 1;
  if (feature.charges <= 0) {
    feature.depletedUntil = state.game.stepCount + feature.respawnSteps;
  }

  const skillGain = gainSkillXp(player, def.skill, xpTotal, feature.name);
  const resultSummary = summarizeGatheringTiming(gathering.results);
  const earlyStopText = canceled && completedRounds < gathering.totalRounds ? " ended early" : "";
  if (roundMessages.length) addWorldLog(`${feature.name}: ${roundMessages.join(" ")}`);
  if (rewardParts.length) addWorldLog(`${def.actionLabel}${earlyStopText}: ${rewardParts.join(", ")}. Timing ${resultSummary}.`);
  else addWorldLog(`${def.actionLabel}${earlyStopText}: no useful materials this cycle. Timing ${resultSummary}.`);
  if (bonusParts.length) addWorldLog(`${feature.name} ${(completionBonus?.label || "clear bonus").toLowerCase()}: ${bonusParts.join(", ")}.`);
  if (feature.charges <= 0) addWorldLog(`${feature.name} is depleted for ${feature.respawnSteps} steps.`);
  logSkillXpProgress(player, def.skill, skillGain);
  if (totalGathered > 0) {
    updateQuestProgress("gatherMaterial", { skill: def.skill, resourceKind: feature.resourceKind, amount: totalGathered, materials: { ...totals }, featureId: feature.id });
  }
  maybeTriggerDynamicWorldEvent(feature);
  renderWorld();

  gathering.appliedRewards = true;
  gathering.completed = true;
  gathering.rewardSummary = {
    rewardParts,
    bonusParts,
    bonusLabel: completionBonus?.label || "",
    xpTotal,
    resultSummary,
    roundsUsed: completedRounds,
    roundsTotal: gathering.totalRounds,
    earlyStop: canceled && completedRounds < gathering.totalRounds,
  };
  if (closeAfter) {
    state.gathering = null;
    return;
  }
  renderModal();
}

function resolveGatheringTimingInput() {
  if (!state.gathering || state.gathering.completed || state.gathering.waitingResult) return;
  stopGatheringSequenceTimers();
  const result = evaluateGatheringTimingResult();
  state.gathering.results.push(result);
  state.gathering.waitingResult = true;
  state.gathering.lastResult = result;
  playSfx(getGatheringSfxType(state.gathering.resourceKind));
  playSfx(getGatheringResultSfxType(result.key));
  renderModal();
  state.gathering.advanceTimeoutId = window.setTimeout(() => {
    if (!state.gathering) return;
    if (state.gathering.results.length >= state.gathering.totalRounds) {
      finalizeGatheringSequence();
      return;
    }
    state.gathering.roundIndex += 1;
    setupGatheringSequenceRound();
    renderModal();
    startGatheringSequenceLoop();
  }, 520);
}

function gatherResourceNode(feature) {
  if (!state.game || !feature || feature.type !== "resource") return;
  const { player } = state.game;
  refreshResourceNode(feature, state.game.stepCount);
  const def = getResourceNodeDef(feature.resourceKind);
  const status = getResourceNodeStatus(feature, state.game.stepCount);
  const requirement = getResourceRequirementState(feature, player);
  if (!status.ready) {
    addWorldLog(`${feature.name} is depleted. Respawns in ${status.stepsRemaining} step${status.stepsRemaining === 1 ? "" : "s"}.`);
    return;
  }
  const skillLevel = getPlayerSkillEntry(player, def.skill)?.level || 1;
  if (skillLevel < requirement.requiredLevel) {
    addWorldLog(`${feature.name} requires ${requirement.skillName} Lv ${requirement.requiredLevel}. You are Lv ${skillLevel}.`);
    return;
  }
  stopGatheringSequenceTimers();
  state.gathering = {
    featureId: feature.id,
    feature,
    featureName: feature.name,
    resourceKind: feature.resourceKind,
    skillName: def.skill,
    skillLevel,
    biome: getResourceNodeBiome(feature),
    totalRounds: Math.max(1, status.charges),
    roundIndex: 0,
    results: [],
    progress: 0,
    direction: 1,
    speed: 1,
    waitingResult: false,
    completed: false,
    appliedRewards: false,
    round: null,
    frameId: 0,
    advanceTimeoutId: 0,
    lastFrameAt: 0,
    rewardSummary: null,
    lastResult: null,
  };
  setupGatheringSequenceRound();
  state.modal = "gathering";
  state.modalData = { featureId: feature.id };
  els.modalBackdrop.classList.remove("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "false");
  renderModal();
  startGatheringSequenceLoop();
}

function getMaterialCount(player, materialId) {
  if (!player || !materialId) return 0;
  return player.bag
    .filter((item) => item.kind === "material" && item.id === materialId)
    .reduce((sum, item) => sum + Math.max(0, item.quantity || 0), 0);
}

function consumeMaterialFromBag(player, materialId, quantity) {
  if (!player || !materialId || quantity <= 0) return false;
  let remaining = Math.max(0, Math.floor(quantity));
  for (let i = player.bag.length - 1; i >= 0 && remaining > 0; i -= 1) {
    const item = player.bag[i];
    if (item.kind !== "material" || item.id !== materialId) continue;
    const spend = Math.min(remaining, Math.max(0, item.quantity || 0));
    item.quantity -= spend;
    remaining -= spend;
    if (item.quantity <= 0) player.bag.splice(i, 1);
  }
  return remaining <= 0;
}

function evaluateCraftingRecipe(player, recipe, context = getCurrentCraftingContext()) {
  if (!player || !recipe) return { ok: false, reason: "Recipe unavailable." };
  const skillLevel = getPlayerSkillEntry(player, recipe.skill)?.level || 1;
  const toolDef = getCraftingToolDefForSkill(recipe.skill);
  const support = getCraftingContextSupport(context, recipe.skill);
  const hasWorkshop = support.hasWorkshop;
  const stationDef = support.stationDef;
  const hasTool = !toolDef || hasWorkshop || playerHasTool(player, toolDef.id);
  if (skillLevel < recipe.minLevel) {
    return { ok: false, reason: `Requires ${recipe.skill} Lv ${recipe.minLevel}.`, skillLevel, toolDef, stationDef, hasWorkshop, hasTool };
  }
  if (!hasTool) {
    return {
      ok: false,
      reason: `Requires ${toolDef?.name || `${recipe.skill} tools`} for field crafting.`,
      skillLevel,
      toolDef,
      stationDef,
      hasWorkshop,
      hasTool,
    };
  }
  for (const cost of recipe.costs || []) {
    if (getMaterialCount(player, cost.id) < cost.qty) {
      const matDef = MATERIAL_DEFS[cost.id];
      return {
        ok: false,
        reason: `Missing ${matDef ? matDef.name : cost.id}.`,
        skillLevel,
        toolDef,
        stationDef,
        hasWorkshop,
        hasTool,
      };
    }
  }
  return {
    ok: true,
    reason: hasWorkshop
      ? stationDef
        ? `${stationDef.name} ready.`
        : "Workshop ready."
      : `${toolDef?.name || "Field kit"} ready.`,
    skillLevel,
    toolDef,
    stationDef,
    hasWorkshop,
    hasTool,
  };
}

function describeCraftingRecipeOutput(recipe) {
  const output = recipe?.output || {};
  if (output.kind === "consumable") {
    const def = CONSUMABLE_DEFS[output.id];
    return `${output.quantity || 1}x ${def ? def.name : output.id}`;
  }
  if (output.kind === "equipment") {
    return output.equipment?.name || "Crafted Equipment";
  }
  if (output.kind === "material") {
    const def = MATERIAL_DEFS[output.id];
    return `${output.quantity || 1}x ${def ? def.name : output.id}`;
  }
  return "Unknown";
}

function getCraftingTierForSkill(skillLevel, quality) {
  return clamp(1 + Math.floor((skillLevel - 1) / 10) + (quality?.tierBonus || 0), 1, 10);
}

function getCraftingRarityForResult(skillLevel, quality) {
  const order = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
  const baseIndex = clamp(Math.floor((skillLevel - 1) / 24), 0, order.length - 1);
  const qualityIndex = clamp(baseIndex + (quality?.rarityBonus || 0), 0, order.length - 1);
  return order[qualityIndex] || "Common";
}

function getCraftingStatTierBonus(stat, craftTier) {
  if (stat === "Health") return Math.floor((craftTier - 1) * 1.4);
  if (stat === "CriticalChance" || stat === "Luck") return Math.floor((craftTier - 1) * 0.35);
  return Math.floor((craftTier - 1) * 0.75);
}

function createCraftedEquipmentFromRecipe(recipe, player, qualityResult = CRAFTING_QUALITY_TIERS.good) {
  const template = recipe?.output?.equipment;
  if (!template) return null;
  const skillLevel = getPlayerSkillEntry(player, recipe.skill)?.level || 1;
  const quality = CRAFTING_QUALITY_TIERS[qualityResult?.key] || qualityResult || CRAFTING_QUALITY_TIERS.good;
  const qualityTier = getCraftingTierForSkill(skillLevel, quality);
  const rarity = getCraftingRarityForResult(skillLevel, quality);
  const modifiers = createZeroStats();
  Object.entries(template.modifiers || {}).forEach(([stat, value]) => {
    if (!ALL_STATS.includes(stat)) return;
    const tierBonus = getCraftingStatTierBonus(stat, qualityTier);
    const skillBonus = stat === "Health" ? Math.floor(skillLevel / 12) : Math.floor(skillLevel / 18);
    modifiers[stat] = Math.max(0, Math.floor((value + tierBonus + skillBonus) * (quality.statScale || 1)));
  });
  const levelReq = clamp(
    Math.max(
      template.levelReqBase || 1,
      qualityTier * 10 - 9 + Math.floor(skillLevel * 0.12) + (quality.levelBonus || 0),
    ),
    1,
    MAX_LEVEL,
  );
  const namePrefix = quality.labelPrefix ? `${quality.labelPrefix} ` : "";
  const item = {
    uid: createItemUid(),
    kind: "equipment",
    slot: template.slot || "Accessory1",
    name: `${namePrefix}${template.name || "Crafted Gear"}`.trim(),
    levelReq,
    tier: qualityTier,
    rarity,
    modifiers,
    craftQuality: quality.name,
    craftedSkill: recipe.skill,
    craftedRecipeId: recipe.id,
  };
  if (item.slot === "Weapon") {
    item.attackType = template.attackType || inferAttackTypeFromModifiers({ modifiers });
    item.weaponTemplateId = template.id || null;
    item.weaponFamily = getWeaponFamilyKey(template, item.attackType);
    item.damageDie = Math.max(
      3,
      Math.floor((template.damageDie || 6) + Math.floor((qualityTier - 1) / 2) + Math.floor(skillLevel / 25) + (quality.damageBonus || 0)),
    );
    item.damageKind = template.damageKind || defaultDamageKindForAttackType(item.attackType);
    item.speed = clamp(
      Math.floor((template.speed || 6) + (quality.key === "perfect" ? 1 : 0) + (quality.key === "rough" ? -1 : 0)),
      1,
      10,
    );
    item.hitBonus = Math.floor((template.hitBonus || 0) + Math.floor(qualityTier / 4) + (quality.hitBonus || 0));
    item.critBonus = Math.floor((template.critBonus || 0) + Math.floor(qualityTier / 4) + Math.floor(skillLevel / 50) + (quality.critBonus || 0));
    item.summary = template.summary || "";
    const key = `${item.attackType}Attack`;
    if (ALL_STATS.includes(key)) modifiers[key] = Math.max(1, modifiers[key] || 1);
    normalizeWeaponItem(item);
  }
  return item;
}

function stopCraftingRunTimers() {
  if (!state.craftingRun) return;
  state.craftingRun.frameId = 0;
  state.craftingRun.lastFrameAt = 0;
}

function getCraftingActionDef(actionId) {
  return actionId ? CRAFTING_ACTION_DEFS[actionId] || null : null;
}

function getCraftingActionUnlockState(player, actionDef) {
  if (!actionDef) return { unlocked: false, label: "Unknown", reason: "Unknown action." };
  if (!actionDef.unlockSkill) {
    return {
      unlocked: true,
      label: "Core",
      reason: "Always available.",
      unlockSkill: null,
      unlockLevel: 1,
      currentLevel: 1,
    };
  }
  const entry = getPlayerSkillEntry(player, actionDef.unlockSkill);
  const currentLevel = entry?.level || 1;
  const unlockLevel = Math.max(1, actionDef.unlockLevel || 1);
  const unlocked = currentLevel >= unlockLevel;
  return {
    unlocked,
    label: unlocked ? "Unlocked" : `${actionDef.unlockSkill} Lv ${unlockLevel}`,
    reason: unlocked
      ? `${actionDef.unlockSkill} unlocked this for every crafting class.`
      : `Reach ${actionDef.unlockSkill} Lv ${unlockLevel} to use this on every crafting class.`,
    unlockSkill: actionDef.unlockSkill,
    unlockLevel,
    currentLevel,
  };
}

function isCraftingActionUnlocked(player, actionDef) {
  return getCraftingActionUnlockState(player, actionDef).unlocked;
}

function getCraftingActionLibrary(player) {
  return CRAFTING_ACTION_ORDER.map((actionId) => {
    const action = getCraftingActionDef(actionId);
    return {
      ...action,
      unlock: getCraftingActionUnlockState(player, action),
    };
  });
}

function getCraftingConditionDef(conditionKey) {
  return CRAFTING_CONDITION_DEFS[conditionKey] || CRAFTING_CONDITION_DEFS.Normal;
}

function getCraftingQualityRatio(run) {
  if (!run || !run.maxQuality) return 0;
  return clamp(run.quality / run.maxQuality, 0, 1);
}

function getCraftingQualityResult(qualityRatio) {
  if (qualityRatio >= CRAFTING_RESULT_THRESHOLDS.perfect) return CRAFTING_QUALITY_TIERS.perfect;
  if (qualityRatio >= CRAFTING_RESULT_THRESHOLDS.great) return CRAFTING_QUALITY_TIERS.great;
  if (qualityRatio >= CRAFTING_RESULT_THRESHOLDS.good) return CRAFTING_QUALITY_TIERS.good;
  return CRAFTING_QUALITY_TIERS.rough;
}

function pushCraftingHistory(run, line) {
  if (!run || !line) return;
  run.history.push(line);
  if (run.history.length > 8) {
    run.history = run.history.slice(-8);
  }
}

function getCraftingSiteBonus(context, skillName) {
  const feature = context?.feature;
  if (!feature || feature.type !== "crafting") {
    return { craftsmanship: 0, control: 0, cp: 0, durability: 0, text: "" };
  }
  if (feature.skillFocus === skillName) {
    return {
      craftsmanship: 12,
      control: 12,
      cp: 16,
      durability: 10,
      text: `${feature.name} is aligned to ${skillName}, boosting progress and quality.`,
    };
  }
  return {
    craftsmanship: 6,
    control: 6,
    cp: 8,
    durability: 5,
    text: `${feature.name} still provides broad workshop support away from its specialty.`,
  };
}

function buildCraftingEncounterStats(recipe, skillLevel, context, check) {
  const outputKind = recipe?.output?.kind || "material";
  const siteBonus = getCraftingSiteBonus(context, recipe?.skill);
  const hasWorkshop = !!check?.hasWorkshop;
  const craftsmanship = Math.round(34 + skillLevel * 4.1 + (hasWorkshop ? 8 : 0) + siteBonus.craftsmanship);
  const control = Math.round(30 + skillLevel * 3.8 + (hasWorkshop ? 8 : 0) + siteBonus.control);
  const maxCp = Math.round(180 + skillLevel * 3.4 + (hasWorkshop ? 12 : 0) + siteBonus.cp);
  const maxDurability = clamp(
    60
      + Math.floor((recipe?.minLevel || 1) / 20) * 10
      + (outputKind === "equipment" ? 10 : 0)
      + (hasWorkshop ? 5 : 0)
      + siteBonus.durability,
    60,
    100,
  );
  const maxProgress = Math.round(
    78
      + (recipe?.minLevel || 1) * 4.4
      + (outputKind === "equipment" ? 24 : outputKind === "material" ? 10 : 16),
  );
  const maxQuality = Math.round(
    180
      + (recipe?.minLevel || 1) * 10.5
      + (outputKind === "equipment" ? 58 : outputKind === "material" ? 20 : 36),
  );
  return {
    craftsmanship,
    control,
    maxCp,
    maxDurability,
    maxProgress,
    maxQuality,
    siteBonus,
  };
}

function getCraftingBaseProgress(run) {
  const gap = Math.max(0, (run.skillLevel || 1) - (run.recipe?.minLevel || 1));
  return Math.max(12, Math.round(run.craftsmanship * 0.42 + run.skillLevel * 0.9 + gap * 0.55));
}

function getCraftingBaseQuality(run) {
  const gap = Math.max(0, (run.skillLevel || 1) - (run.recipe?.minLevel || 1));
  return Math.max(14, Math.round(run.control * 0.58 + run.skillLevel * 0.75 + gap * 0.9));
}

function createCraftingRun(recipe, check, context) {
  const stats = buildCraftingEncounterStats(recipe, check.skillLevel, context, check);
  return {
    recipeId: recipe.id,
    recipe,
    context,
    skillName: recipe.skill,
    skillLevel: check.skillLevel,
    toolDef: check.toolDef || null,
    stationDef: check.stationDef || null,
    hasWorkshop: !!check.hasWorkshop,
    craftsmanship: stats.craftsmanship,
    control: stats.control,
    progress: 0,
    maxProgress: stats.maxProgress,
    quality: 0,
    maxQuality: stats.maxQuality,
    durability: stats.maxDurability,
    maxDurability: stats.maxDurability,
    cp: stats.maxCp,
    maxCp: stats.maxCp,
    step: 0,
    condition: "Normal",
    buffs: {
      veneration: 0,
      innovation: 0,
      waste_not: 0,
      great_strides: 0,
      manipulation: 0,
    },
    innerQuiet: 0,
    completed: false,
    success: false,
    result: null,
    summary: null,
    history: [],
    lastActionId: null,
    frameId: 0,
    lastFrameAt: 0,
    siteBonus: stats.siteBonus,
  };
}

function getCraftingActionState(run, actionDef, player = state.game?.player) {
  if (!run || !actionDef) return { ok: false, reason: "Action unavailable." };
  const unlock = getCraftingActionUnlockState(player, actionDef);
  if (!unlock.unlocked) return { ok: false, reason: unlock.reason };
  if (actionDef.requiresObserved && run.lastActionId !== "observe") {
    return { ok: false, reason: "Use Observe first." };
  }
  if ((actionDef.requiresInnerQuiet || 0) > run.innerQuiet) {
    return { ok: false, reason: `Requires Inner Quiet ${actionDef.requiresInnerQuiet}.` };
  }
  if (actionDef.allowedConditions?.length && !actionDef.allowedConditions.includes(run.condition)) {
    return {
      ok: false,
      reason: `${actionDef.name} needs ${actionDef.allowedConditions.join(" or ")} condition.`,
    };
  }
  const condition = getCraftingConditionDef(run.condition);
  const cpCostBase = Math.max(0, actionDef.cpCost || 0);
  const cpCost = cpCostBase > 0 ? Math.max(1, Math.ceil(cpCostBase * (condition.cpMultiplier || 1))) : 0;
  if (cpCost > run.cp) {
    return { ok: false, reason: `Needs ${cpCost} CP.` };
  }
  if (run.durability <= 0) {
    return { ok: false, reason: "No durability left." };
  }
  return {
    ok: true,
    reason: "Ready.",
    cpCost,
    durabilityCostBase: Math.max(0, actionDef.durabilityCost || 0),
  };
}

function getCraftingDurabilityCost(run, actionDef) {
  const base = Math.max(0, actionDef?.durabilityCost || 0);
  if (base <= 0) return 0;
  const condition = getCraftingConditionDef(run.condition);
  let multiplier = condition.durabilityMultiplier || 1;
  if ((run.buffs.waste_not || 0) > 0) multiplier *= 0.5;
  return Math.max(1, Math.ceil(base * multiplier));
}

function calculateCraftingProgressGain(run, actionDef) {
  if (!run || !actionDef?.progressMultiplier) return 0;
  const condition = getCraftingConditionDef(run.condition);
  let totalMultiplier = actionDef.progressMultiplier || 1;
  if ((run.buffs.veneration || 0) > 0) totalMultiplier *= 1.5;
  totalMultiplier *= condition.progressMultiplier || 1;
  return Math.max(0, Math.round(getCraftingBaseProgress(run) * totalMultiplier));
}

function calculateCraftingQualityGain(run, actionDef) {
  if (!run || !actionDef?.qualityMultiplier) return 0;
  const condition = getCraftingConditionDef(run.condition);
  const innerQuietBefore = run.innerQuiet || 0;
  let totalMultiplier = actionDef.qualityMultiplier || 1;
  totalMultiplier *= 1 + innerQuietBefore * 0.1;
  if ((run.buffs.innovation || 0) > 0) totalMultiplier *= 1.5;
  if ((run.buffs.great_strides || 0) > 0) totalMultiplier *= 2;
  if (actionDef.consumesInnerQuiet) totalMultiplier *= 1 + innerQuietBefore * 0.22;
  totalMultiplier *= condition.qualityMultiplier || 1;
  return Math.max(0, Math.round(getCraftingBaseQuality(run) * totalMultiplier));
}

function tickCraftingBuffs(run, actionDef, usedQualityAction) {
  if (!run) return;
  if ((run.buffs.manipulation || 0) > 0 && actionDef?.buffId !== "manipulation") {
    run.durability = clamp(run.durability + 5, 0, run.maxDurability);
  }
  ["veneration", "innovation", "waste_not", "manipulation"].forEach((buffId) => {
    if ((run.buffs[buffId] || 0) > 0 && actionDef?.buffId !== buffId) {
      run.buffs[buffId] = Math.max(0, run.buffs[buffId] - 1);
    }
  });
  if (usedQualityAction && (run.buffs.great_strides || 0) > 0) {
    run.buffs.great_strides = 0;
  }
}

function rollNextCraftingCondition(run) {
  if (run.condition === "Excellent") return "Poor";
  const rng = state.game?.runtimeRng;
  const workshopBonus = run.hasWorkshop ? 2 : 0;
  return weightedPick([
    { key: "Normal", weight: 56 - workshopBonus },
    { key: "Good", weight: 18 + workshopBonus },
    { key: "Sturdy", weight: 10 },
    { key: "Pliant", weight: 8 + workshopBonus },
    { key: "Malleable", weight: 6 },
    { key: "Excellent", weight: 2 },
  ], rng, "key") || "Normal";
}

function finishCraftingRunSuccess() {
  if (!state.craftingRun || state.craftingRun.completed) return;
  const qualityRatio = getCraftingQualityRatio(state.craftingRun);
  const result = getCraftingQualityResult(qualityRatio);
  const summary = craftRecipeById(state.craftingRun.recipeId, {
    qualityKey: result.key,
    context: state.craftingRun.context,
  });
  if (!summary?.ok) {
    state.craftingRun.completed = true;
    state.craftingRun.success = false;
    state.craftingRun.result = result;
    state.craftingRun.summary = {
      success: false,
      recipeXp: 0,
      craftedName: describeCraftingRecipeOutput(state.craftingRun.recipe),
      methodText: state.craftingRun.context?.label || "Field Kit",
      failureReason: summary?.reason || "Craft could not be completed.",
    };
    renderModal();
    return;
  }
  state.craftingRun.completed = true;
  state.craftingRun.success = true;
  state.craftingRun.result = {
    ...result,
    qualityRatio,
  };
  state.craftingRun.summary = summary;
  pushCraftingHistory(state.craftingRun, `Synthesis complete at ${Math.round(qualityRatio * 100)}% quality.`);
  renderWorld();
  renderModal();
}

function finishCraftingRunFailure(reason = "Durability failed before the craft was complete.") {
  if (!state.game || !state.craftingRun || state.craftingRun.completed) return;
  const run = state.craftingRun;
  const failXp = Math.max(2, Math.round((run.recipe?.xp || 12) * 0.28));
  const skillGain = gainSkillXp(state.game.player, run.skillName, failXp, `${run.recipe.name} practice`);
  state.game.stepCount += 1;
  addWorldLog(`${run.recipe.name} failed. ${reason} No materials were committed.`);
  logSkillXpProgress(state.game.player, run.skillName, skillGain);
  run.completed = true;
  run.success = false;
  run.result = {
    ...CRAFTING_QUALITY_TIERS.rough,
    qualityRatio: getCraftingQualityRatio(run),
  };
  run.summary = {
    ok: false,
    success: false,
    recipeXp: failXp,
    craftedName: describeCraftingRecipeOutput(run.recipe),
    methodText: run.context?.label || "Field Kit",
    failureReason: reason,
  };
  pushCraftingHistory(run, "Synthesis collapsed before progress was complete.");
  renderWorld();
  renderModal();
}

function useCraftingAction(actionId) {
  if (!state.craftingRun || state.craftingRun.completed) return;
  const run = state.craftingRun;
  const actionDef = getCraftingActionDef(actionId);
  const actionState = getCraftingActionState(run, actionDef);
  if (!actionState.ok) {
    addWorldLog(actionState.reason);
    renderModal();
    return;
  }
  const cpCost = actionState.cpCost;
  const durabilityCost = getCraftingDurabilityCost(run, actionDef);
  run.step += 1;
  run.cp = clamp(run.cp - cpCost, 0, run.maxCp);
  run.durability = clamp(run.durability - durabilityCost, 0, run.maxDurability);

  if (actionDef.durabilityRestore) {
    run.durability = clamp(run.durability + actionDef.durabilityRestore, 0, run.maxDurability);
  }
  if (actionDef.cpRestore) {
    const bonusCp = run.condition === "Excellent" ? 10 : run.condition === "Good" ? 4 : 0;
    run.cp = clamp(run.cp + actionDef.cpRestore + bonusCp, 0, run.maxCp);
  }

  const progressGain = calculateCraftingProgressGain(run, actionDef);
  const qualityGain = calculateCraftingQualityGain(run, actionDef);
  run.progress = clamp(run.progress + progressGain, 0, run.maxProgress);
  run.quality = clamp(run.quality + qualityGain, 0, run.maxQuality);

  if (actionDef.buffId) {
    run.buffs[actionDef.buffId] = Math.max(1, actionDef.buffTurns || 1);
  }
  if (qualityGain > 0) {
    if (actionDef.consumesInnerQuiet) run.innerQuiet = 0;
    else run.innerQuiet = clamp(run.innerQuiet + Math.max(1, actionDef.innerQuietGain || 1), 0, 10);
  }

  const costText = [];
  if (cpCost > 0) costText.push(`-${cpCost} CP`);
  if (durabilityCost > 0) costText.push(`-${durabilityCost} Durability`);
  if (actionDef.durabilityRestore) costText.push(`+${actionDef.durabilityRestore} Durability`);
  if (actionDef.cpRestore) costText.push(`+${actionDef.cpRestore}${run.condition === "Excellent" ? " (+10 bonus)" : run.condition === "Good" ? " (+4 bonus)" : ""} CP`);
  const gainText = [];
  if (progressGain > 0) gainText.push(`+${progressGain} Progress`);
  if (qualityGain > 0) gainText.push(`+${qualityGain} Quality`);
  pushCraftingHistory(
    run,
    `${actionDef.name}: ${[...gainText, ...costText].join(" | ") || "Setup step."}`,
  );

  tickCraftingBuffs(run, actionDef, qualityGain > 0);
  run.lastActionId = actionId;

  if (run.progress >= run.maxProgress) {
    finishCraftingRunSuccess();
    return;
  }
  if (run.durability <= 0) {
    finishCraftingRunFailure();
    return;
  }
  run.condition = rollNextCraftingCondition(run);
  playSfx(getCraftingSfxType(run.skillName));
  renderModal();
}

function beginCraftingRecipe(recipeId) {
  if (!state.game || !recipeId) return;
  const recipe = CRAFTING_RECIPES.find((entry) => entry.id === recipeId);
  if (!recipe) return;
  const context = getCurrentCraftingContext(state.modalData?.feature || null, state.modalData?.stationId || null);
  const check = evaluateCraftingRecipe(state.game.player, recipe, context);
  if (!check.ok) {
    addWorldLog(check.reason);
    renderWorldLog();
    return;
  }
  stopCraftingRunTimers();
  state.craftingRun = createCraftingRun(recipe, check, context);
  pushCraftingHistory(state.craftingRun, `${recipe.name} started at ${context.label}.`);
  if (state.craftingRun.siteBonus?.text) {
    pushCraftingHistory(state.craftingRun, state.craftingRun.siteBonus.text);
  }
  renderModal();
}

function inferDesynthSkillForItem(item) {
  if (!item || item.kind !== "equipment") return "Jewelcrafting";
  if (item.slot === "Weapon") {
    if (item.attackType === "Melee") return "Smithing";
    if (item.attackType === "Ranged") return "Woodworking";
    if (item.weaponFamily === "magic_staff" || item.weaponFamily === "wand") return "Woodworking";
    return "Alchemy";
  }
  if (item.slot === "Accessory1" || item.slot === "Accessory2") {
    return "Jewelcrafting";
  }
  const meleeWeight = (item.modifiers?.MeleeAttack || 0) + (item.modifiers?.MeleeDefense || 0) + Math.floor((item.modifiers?.Health || 0) / 8);
  const rangedWeight = (item.modifiers?.RangedAttack || 0) + (item.modifiers?.RangedDefense || 0);
  const magicWeight = (item.modifiers?.MagicAttack || 0) + (item.modifiers?.MagicDefense || 0);
  if (magicWeight >= meleeWeight && magicWeight >= rangedWeight) return "Clothier";
  if (rangedWeight > meleeWeight) return "Leatherworking";
  return "Smithing";
}

function getDesynthMaterialIds(item, skillName = inferDesynthSkillForItem(item)) {
  if (skillName === "Smithing") return ["iron_scrap", "iron_ore", "beast_fang"];
  if (skillName === "Woodworking") return ["hardwood_log", "fiber_bundle", "arcane_dust"];
  if (skillName === "Clothier") return ["fiber_bundle", "herb_bundle", "arcane_dust"];
  if (skillName === "Leatherworking") return ["beast_hide", "fiber_bundle", "beast_fang"];
  if (skillName === "Alchemy") return ["arcane_dust", "slime_gel", "river_scale"];
  if (skillName === "Jewelcrafting") return ["silver_ore", "gem_shard", "arcane_dust"];
  return ["iron_scrap", "fiber_bundle"];
}

function getDesynthPreviewText(item) {
  const ids = getDesynthMaterialIds(item).filter((id) => MATERIAL_DEFS[id]);
  return ids.map((id) => MATERIAL_DEFS[id].name).join(", ");
}

function evaluateDesynthAction(player, item, context = getCurrentCraftingContext()) {
  if (!player || !item || item.kind !== "equipment") return { ok: false, reason: "Nothing to recycle." };
  const skillName = inferDesynthSkillForItem(item);
  const skillLevel = getPlayerSkillEntry(player, skillName)?.level || 1;
  const toolDef = getCraftingToolDefForSkill(skillName);
  const support = getCraftingContextSupport(context, skillName);
  const hasWorkshop = support.hasWorkshop;
  const stationDef = support.stationDef;
  const hasTool = !toolDef || hasWorkshop || playerHasTool(player, toolDef.id);
  if (!hasTool) {
    return {
      ok: false,
      reason: `Requires ${toolDef?.name || `${skillName} tools`} or a workshop to recycle ${item.name}.`,
      skillName,
      skillLevel,
      toolDef,
      stationDef,
      hasWorkshop,
      hasTool,
    };
  }
  return {
    ok: true,
    reason: hasWorkshop
      ? stationDef
        ? `${stationDef.name} ready.`
        : "Workshop ready."
      : `${toolDef?.name || "Field kit"} ready.`,
    skillName,
    skillLevel,
    toolDef,
    stationDef,
    hasWorkshop,
    hasTool,
  };
}

function buildDesynthDrops(item, skillLevel, rng, skillName = inferDesynthSkillForItem(item)) {
  const rarityScale = RARITY_DATA[item.rarity || "Common"]?.modScale || 1;
  const tier = Math.max(1, item.tier || tierForLevel(item.levelReq || 1));
  const baseUnits = Math.max(
    1,
    Math.floor(tier / 2) + Math.max(0, Math.floor(rarityScale) - 1) + (item.slot === "Weapon" ? 1 : 0) + (skillLevel >= 45 ? 1 : 0),
  );
  const drops = [];
  if (skillName === "Smithing") {
    drops.push({ id: "iron_scrap", quantity: baseUnits + Math.floor((item.levelReq || 1) / 35) });
    if (rng.next() < clamp(0.42 + skillLevel * 0.0028, 0.42, 0.86)) drops.push({ id: "iron_ore", quantity: Math.max(1, Math.floor(baseUnits / 2)) });
    if (item.slot === "Weapon" && rng.next() < clamp(0.12 + skillLevel * 0.0016, 0.12, 0.36)) drops.push({ id: "beast_fang", quantity: 1 });
  } else if (skillName === "Woodworking") {
    drops.push({ id: "hardwood_log", quantity: baseUnits });
    if (rng.next() < clamp(0.36 + skillLevel * 0.0026, 0.36, 0.82)) drops.push({ id: "fiber_bundle", quantity: Math.max(1, Math.floor(baseUnits / 2) + 1) });
    if (item.attackType === "Magic" && rng.next() < clamp(0.14 + skillLevel * 0.0018, 0.14, 0.38)) drops.push({ id: "arcane_dust", quantity: 1 });
  } else if (skillName === "Clothier") {
    drops.push({ id: "fiber_bundle", quantity: baseUnits });
    if (rng.next() < clamp(0.34 + skillLevel * 0.0024, 0.34, 0.78)) drops.push({ id: "herb_bundle", quantity: Math.max(1, Math.floor(baseUnits / 2)) });
    if ((item.modifiers?.MagicDefense || 0) + (item.modifiers?.MagicAttack || 0) >= 3 && rng.next() < clamp(0.16 + skillLevel * 0.0018, 0.16, 0.4)) {
      drops.push({ id: "arcane_dust", quantity: 1 });
    }
  } else if (skillName === "Leatherworking") {
    drops.push({ id: "beast_hide", quantity: baseUnits });
    if (rng.next() < clamp(0.32 + skillLevel * 0.0025, 0.32, 0.8)) drops.push({ id: "fiber_bundle", quantity: Math.max(1, Math.floor(baseUnits / 2)) });
    if (rng.next() < clamp(0.1 + skillLevel * 0.0016, 0.1, 0.34)) drops.push({ id: "beast_fang", quantity: 1 });
  } else if (skillName === "Jewelcrafting") {
    drops.push({ id: "silver_ore", quantity: baseUnits });
    if (rng.next() < clamp(0.32 + skillLevel * 0.0025, 0.32, 0.82)) drops.push({ id: "gem_shard", quantity: Math.max(1, Math.floor(baseUnits / 2)) });
    if (((item.modifiers?.MagicAttack || 0) + (item.modifiers?.MagicDefense || 0) + (item.modifiers?.CriticalChance || 0)) >= 3
      && rng.next() < clamp(0.14 + skillLevel * 0.0018, 0.14, 0.42)) {
      drops.push({ id: "arcane_dust", quantity: 1 });
    }
  } else {
    drops.push({ id: "arcane_dust", quantity: baseUnits });
    if (rng.next() < clamp(0.3 + skillLevel * 0.0022, 0.3, 0.74)) drops.push({ id: "slime_gel", quantity: Math.max(1, Math.floor(baseUnits / 2)) });
    if (rng.next() < clamp(0.1 + skillLevel * 0.0019 + (item.rarity === "Legendary" ? 0.14 : 0), 0.1, 0.42)) drops.push({ id: "river_scale", quantity: 1 });
  }
  return drops.filter((drop) => MATERIAL_DEFS[drop.id] && (drop.quantity || 0) > 0);
}

function desynthBagItem(uid) {
  if (!state.game || !uid) return;
  const player = state.game.player;
  const itemIndex = player.bag.findIndex((entry) => entry.uid === uid && entry.kind === "equipment");
  if (itemIndex < 0) return;
  const item = player.bag[itemIndex];
  const context = getCurrentCraftingContext(state.modalData?.feature || null, state.modalData?.stationId || null);
  const check = evaluateDesynthAction(player, item, context);
  if (!check.ok) {
    addWorldLog(check.reason);
    return;
  }
  player.bag.splice(itemIndex, 1);
  const drops = buildDesynthDrops(item, check.skillLevel, state.game.runtimeRng, check.skillName);
  drops.forEach((drop) => addStackableLoot(player, "material", MATERIAL_DEFS[drop.id], drop.quantity));
  const rewardText = drops.map((drop) => `${drop.quantity}x ${MATERIAL_DEFS[drop.id].name}`).join(", ");
  const xpAmount = Math.max(6, check.skillLevel >= 100 ? 0 : Math.round((item.levelReq || 1) * 0.4 + (item.tier || 1) * 5));
  const skillGain = gainSkillXp(player, check.skillName, xpAmount, `${item.name} salvage`);
  state.game.stepCount += 1;
  addWorldLog(`Desynthesized ${item.name} into ${rewardText || "salvage scraps"}.`);
  logSkillXpProgress(player, check.skillName, skillGain);
  playSfx(getCraftingSfxType(check.skillName));
  playSfx("craft-finish");
  maybeTriggerDynamicWorldEvent(context.feature || null);
}

function desynthEquippedItem(slot) {
  if (!state.game || !slot) return;
  const player = state.game.player;
  const item = player.equipment[slot];
  if (!item) return;
  const context = getCurrentCraftingContext(state.modalData?.feature || null, state.modalData?.stationId || null);
  const check = evaluateDesynthAction(player, item, context);
  if (!check.ok) {
    addWorldLog(check.reason);
    return;
  }
  player.equipment[slot] = null;
  syncPlayerStyleToWeapon(player);
  recalculatePlayerStats(player, true);
  const drops = buildDesynthDrops(item, check.skillLevel, state.game.runtimeRng, check.skillName);
  drops.forEach((drop) => addStackableLoot(player, "material", MATERIAL_DEFS[drop.id], drop.quantity));
  const rewardText = drops.map((drop) => `${drop.quantity}x ${MATERIAL_DEFS[drop.id].name}`).join(", ");
  const xpAmount = Math.max(6, check.skillLevel >= 100 ? 0 : Math.round((item.levelReq || 1) * 0.4 + (item.tier || 1) * 5));
  const skillGain = gainSkillXp(player, check.skillName, xpAmount, `${item.name} salvage`);
  state.game.stepCount += 1;
  addWorldLog(`Desynthesized equipped ${item.name} into ${rewardText || "salvage scraps"}.`);
  logSkillXpProgress(player, check.skillName, skillGain);
  playSfx(getCraftingSfxType(check.skillName));
  playSfx("craft-finish");
  maybeTriggerDynamicWorldEvent(context.feature || null);
}

function resolveCraftingTimingInput() {
  useCraftingAction("basic_synthesis");
}

function craftRecipeById(recipeId, options = {}) {
  if (!state.game || !recipeId) return null;
  const player = state.game.player;
  const recipe = CRAFTING_RECIPES.find((entry) => entry.id === recipeId);
  if (!recipe) return null;
  const context = options.context || getCurrentCraftingContext(state.modalData?.feature || null, state.modalData?.stationId || null);
  const quality = CRAFTING_QUALITY_TIERS[options.qualityKey] || CRAFTING_QUALITY_TIERS.good;
  const check = evaluateCraftingRecipe(player, recipe, context);
  if (!check.ok) {
    addWorldLog(check.reason);
    return { ok: false, reason: check.reason };
  }
  const output = recipe.output || {};
  let craftedName = describeCraftingRecipeOutput(recipe);
  let craftedItem = null;
  let outputQuantity = output.quantity || 1;

  if (output.kind === "consumable") {
    outputQuantity = Math.max(1, Math.round((output.quantity || 1) * quality.quantityScale) + (quality.flatQuantity || 0));
    craftedName = `${outputQuantity}x ${CONSUMABLE_DEFS[output.id]?.name || output.id}`;
  } else if (output.kind === "equipment") {
    craftedItem = createCraftedEquipmentFromRecipe(recipe, player, quality);
    if (!craftedItem) {
      addWorldLog("Crafting failed: invalid recipe output.");
      return { ok: false, reason: "Invalid recipe output." };
    }
    craftedName = craftedItem.name;
  } else if (output.kind === "material") {
    const matDef = MATERIAL_DEFS[output.id];
    if (!matDef) {
      addWorldLog("Crafting failed: unknown material output.");
      return { ok: false, reason: "Unknown material output." };
    }
    outputQuantity = Math.max(1, Math.round((output.quantity || 1) * quality.quantityScale) + (quality.flatQuantity || 0));
    craftedName = `${outputQuantity}x ${matDef.name}`;
  } else {
    addWorldLog("Crafting failed: unsupported output.");
    return { ok: false, reason: "Unsupported output." };
  }

  (recipe.costs || []).forEach((cost) => consumeMaterialFromBag(player, cost.id, cost.qty));
  if (output.kind === "consumable") {
    addConsumableToBag(player, output.id, outputQuantity);
  } else if (output.kind === "equipment" && craftedItem) {
    addItemToBag(player, craftedItem);
  } else if (output.kind === "material") {
    addStackableLoot(player, "material", MATERIAL_DEFS[output.id], outputQuantity);
  }

  const recipeXp = Math.max(1, Math.round((recipe.xp || 12) * quality.xpScale));
  const skillGain = gainSkillXp(player, recipe.skill, recipeXp, recipe.name);
  state.game.stepCount += 1;
  const methodText = check.hasWorkshop
    ? check.stationDef
      ? `at ${check.stationDef.name}`
      : `at ${context.label}`
    : `with ${check.toolDef?.name || context.label}`;
  addWorldLog(`Crafted ${craftedName} [${quality.name}] using ${recipe.name} ${methodText}.`);
  logSkillXpProgress(player, recipe.skill, skillGain);
  updateQuestProgress("craftItem", {
    skill: recipe.skill,
    recipeId: recipe.id,
    amount: Math.max(1, output.kind === "equipment" ? 1 : outputQuantity),
    qualityKey: quality.key,
    outputKind: output.kind,
  });
  playSfx(getCraftingSfxType(recipe.skill));
  playSfx("craft-finish");
  maybeTriggerDynamicWorldEvent(context.feature || null);
  return {
    ok: true,
    recipe,
    quality,
    craftedName,
    craftedItem,
    outputQuantity,
    context,
    methodText,
    recipeXp,
  };
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
    weaponTemplateId: chosen.id || null,
    weaponFamily: getWeaponFamilyKey(chosen, attackType),
    damageDie: chosen.damageDie || 6,
    damageKind: chosen.damageKind || defaultDamageKindForAttackType(attackType),
    speed: getWeaponSpeed(chosen),
    hitBonus: Number.isFinite(chosen.hitBonus) ? chosen.hitBonus : 0,
    critBonus: getWeaponCritBonus(chosen),
    tier: 1,
    rarity: "Common",
    levelReq: 1,
    name: chosen.name || "Rusty Weapon",
    summary: chosen.summary || "",
    modifiers,
  };
}

function createItemUid() {
  return `itm_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

function createDefaultSkillState() {
  const result = {};
  SKILL_ORDER.forEach((skillName) => {
    result[skillName] = { level: 1, xp: 0 };
  });
  return result;
}

function normalizeSkillState(savedSkills) {
  const normalized = createDefaultSkillState();
  SKILL_ORDER.forEach((skillName) => {
    const incoming = savedSkills && typeof savedSkills === "object" ? savedSkills[skillName] : null;
    if (!incoming || typeof incoming !== "object") return;
    const level = clamp(Math.floor(incoming.level || 1), 1, SKILL_CAP_LEVEL);
    const nextXp = xpToNextSkillLevel(level);
    normalized[skillName] = {
      level,
      xp: level >= SKILL_CAP_LEVEL ? 0 : clamp(Math.floor(incoming.xp || 0), 0, Math.max(0, nextXp - 1)),
    };
  });
  const legacyCrafting = savedSkills && typeof savedSkills === "object" ? savedSkills.Crafting : null;
  if (legacyCrafting && typeof legacyCrafting === "object" && normalized.Jewelcrafting) {
    const legacyLevel = clamp(Math.floor(legacyCrafting.level || 1), 1, SKILL_CAP_LEVEL);
    const legacyNextXp = xpToNextSkillLevel(legacyLevel);
    const legacyJewelcrafting = {
      level: legacyLevel,
      xp: legacyLevel >= SKILL_CAP_LEVEL ? 0 : clamp(Math.floor(legacyCrafting.xp || 0), 0, Math.max(0, legacyNextXp - 1)),
    };
    const currentJewelcrafting = normalized.Jewelcrafting;
    if (
      legacyJewelcrafting.level > currentJewelcrafting.level
      || (legacyJewelcrafting.level === currentJewelcrafting.level && legacyJewelcrafting.xp > currentJewelcrafting.xp)
    ) {
      normalized.Jewelcrafting = legacyJewelcrafting;
    }
  }
  return normalized;
}

function xpToNextSkillLevel(level) {
  if (level >= SKILL_CAP_LEVEL) return 0;
  return 40 + level * 16;
}

function ensurePlayerSkills(player) {
  if (!player) return createDefaultSkillState();
  if (!player.skills || typeof player.skills !== "object") {
    player.skills = createDefaultSkillState();
    return player.skills;
  }
  player.skills = normalizeSkillState(player.skills);
  return player.skills;
}

function getPlayerSkillEntry(player, skillName) {
  if (!player || !skillName || !SKILL_DEFS[skillName]) return null;
  const skills = ensurePlayerSkills(player);
  if (!skills[skillName]) skills[skillName] = { level: 1, xp: 0 };
  return skills[skillName];
}

function gainSkillXp(player, skillName, amount, sourceLabel = "") {
  const entry = getPlayerSkillEntry(player, skillName);
  if (!entry) return null;
  const gained = Math.max(0, Math.floor(amount || 0));
  if (gained <= 0 || entry.level >= SKILL_CAP_LEVEL) return { gained: 0, levels: 0, level: entry.level, xp: entry.xp };
  entry.xp += gained;
  let levels = 0;
  while (entry.level < SKILL_CAP_LEVEL) {
    const need = xpToNextSkillLevel(entry.level);
    if (entry.xp < need) break;
    entry.xp -= need;
    entry.level += 1;
    levels += 1;
  }
  if (entry.level >= SKILL_CAP_LEVEL) {
    entry.level = SKILL_CAP_LEVEL;
    entry.xp = 0;
  }
  if (levels > 0 && state.game) {
    const source = sourceLabel ? ` from ${sourceLabel}` : "";
    addWorldLog(`${skillName} leveled to ${entry.level}${source}.`);
    if (SKILL_DEFS[skillName]?.role === "Gathering") {
      rebalanceWorldResourceNodes(state.game.world, player);
    }
  }
  return { gained, levels, level: entry.level, xp: entry.xp };
}

function logSkillXpProgress(player, skillName, skillGain) {
  if (!skillGain?.gained) return;
  const entry = getPlayerSkillEntry(player, skillName);
  if (!entry) return;
  const next = xpToNextSkillLevel(entry.level);
  const xpText = entry.level >= SKILL_CAP_LEVEL ? "MAX" : `${entry.xp}/${next}`;
  addWorldLog(`${skillName} +${skillGain.gained} XP (Lv ${entry.level}, ${xpText}).`);
}

function createWeaponMasteryEntry(points = 0, uses = 0, hits = 0, kills = 0) {
  return {
    points: Math.max(0, Math.floor(points || 0)),
    uses: Math.max(0, Math.floor(uses || 0)),
    hits: Math.max(0, Math.floor(hits || 0)),
    kills: Math.max(0, Math.floor(kills || 0)),
  };
}

function createDefaultWeaponMasteryState(initialPointsByFamily = {}) {
  const result = {};
  WEAPON_FAMILY_ORDER.forEach((familyKey) => {
    const startingPoints = initialPointsByFamily && typeof initialPointsByFamily === "object"
      ? initialPointsByFamily[familyKey]
      : 0;
    result[familyKey] = createWeaponMasteryEntry(startingPoints);
  });
  return result;
}

function normalizeWeaponMasteryState(savedMastery, legacyLevel = 0) {
  const hasSaved = !!(savedMastery && typeof savedMastery === "object" && Object.keys(savedMastery).length);
  const fallbackPoints = !hasSaved && legacyLevel > 0 ? Math.max(1, Math.floor(legacyLevel)) : 0;
  const normalized = {};
  WEAPON_FAMILY_ORDER.forEach((familyKey) => {
    const incoming = hasSaved ? savedMastery[familyKey] : null;
    if (incoming && typeof incoming === "object") {
      normalized[familyKey] = createWeaponMasteryEntry(
        incoming.points ?? incoming.mastery ?? incoming.level ?? 0,
        incoming.uses,
        incoming.hits,
        incoming.kills,
      );
      return;
    }
    normalized[familyKey] = createWeaponMasteryEntry(fallbackPoints);
  });
  return normalized;
}

function ensurePlayerWeaponMastery(player) {
  if (!player) return createDefaultWeaponMasteryState();
  if (!player.weaponMastery || typeof player.weaponMastery !== "object") {
    player.weaponMastery = createDefaultWeaponMasteryState();
    return player.weaponMastery;
  }
  player.weaponMastery = normalizeWeaponMasteryState(player.weaponMastery);
  return player.weaponMastery;
}

function getWeaponMasteryEntry(player, weaponOrFamily, fallbackStyle = "Melee") {
  if (!player) return createWeaponMasteryEntry();
  const familyKey = typeof weaponOrFamily === "string" && WEAPON_FAMILY_DEFS[weaponOrFamily]
    ? weaponOrFamily
    : getWeaponFamilyKey(weaponOrFamily, fallbackStyle);
  const mastery = ensurePlayerWeaponMastery(player);
  if (!mastery[familyKey]) mastery[familyKey] = createWeaponMasteryEntry();
  return mastery[familyKey];
}

function getAbilityMasteryRequirement(ability) {
  const baseRequirement = Math.max(1, Math.floor(ability?.mastery ?? ability?.level ?? 1));
  if (baseRequirement <= 1) return 1;
  return baseRequirement * WEAPON_MASTERY_REQUIREMENT_MULTIPLIER;
}

function getWeaponMasterySnapshot(player, weaponOrFamily, fallbackStyle = "Melee") {
  const familyKey = typeof weaponOrFamily === "string" && WEAPON_FAMILY_DEFS[weaponOrFamily]
    ? weaponOrFamily
    : getWeaponFamilyKey(weaponOrFamily, fallbackStyle);
  const family = getWeaponFamilyDefinition(familyKey, fallbackStyle);
  const style = family.style || fallbackStyle || "Melee";
  const entry = getWeaponMasteryEntry(player, familyKey, style);
  const abilities = getWeaponAbilitySet(familyKey, style);
  const masteryPoints = Math.max(0, entry.points || 0);
  const unlocked = abilities.filter((ability) => masteryPoints >= getAbilityMasteryRequirement(ability));
  const next = abilities.find((ability) => getAbilityMasteryRequirement(ability) > masteryPoints) || null;
  const previousRequirement = unlocked.length ? getAbilityMasteryRequirement(unlocked[unlocked.length - 1]) : 0;
  const nextRequirement = next ? getAbilityMasteryRequirement(next) : null;
  const progressPercent = nextRequirement
    ? clamp(Math.floor(((masteryPoints - previousRequirement) / Math.max(1, nextRequirement - previousRequirement)) * 100), 0, 100)
    : 100;
  return {
    familyKey,
    family,
    style,
    entry,
    masteryPoints,
    abilities,
    unlocked,
    next,
    previousRequirement,
    nextRequirement,
    progressPercent,
    learnedCount: unlocked.length,
    totalCount: abilities.length,
  };
}

function awardWeaponMastery(player, weapon, options = {}) {
  if (!player || !weapon) return null;
  const style = weapon.attackType || options.style || "Melee";
  const familyKey = getWeaponFamilyKey(weapon, style);
  const entry = getWeaponMasteryEntry(player, familyKey, style);
  const beforePoints = Math.max(0, entry.points || 0);
  let gained = 1;
  if (options.kind === "skill") gained += 1;
  if (options.hit) gained += 1;
  if (options.critical) gained += 1;
  if (options.affinityKind === "weak") gained += 1;
  if (options.killedEnemy) gained += 2;
  if (options.enemyBoss) gained += 2;
  if (Number.isFinite(options.enemyLevel) && options.enemyLevel >= 20) gained += Math.floor(options.enemyLevel / 20);
  gained = Math.max(1, Math.floor(gained));

  entry.points = beforePoints + gained;
  entry.uses += 1;
  if (options.hit) entry.hits += 1;
  if (options.killedEnemy) entry.kills += 1;

  const snapshot = getWeaponMasterySnapshot(player, familyKey, style);
  const unlockedNow = snapshot.abilities.filter((ability) => {
    const requirement = getAbilityMasteryRequirement(ability);
    return requirement > beforePoints && requirement <= snapshot.masteryPoints;
  });
  return {
    familyKey,
    gained,
    beforePoints,
    afterPoints: snapshot.masteryPoints,
    entry,
    unlockedNow,
    snapshot,
  };
}

function appendCombatLogSilently(line) {
  if (!state.combat || !line) return;
  state.combat.log.push(line);
  if (state.combat.log.length > COMBAT_LOG_LIMIT) {
    state.combat.log = state.combat.log.slice(-COMBAT_LOG_LIMIT);
  }
}

function announceWeaponMasteryUnlocks(gainInfo) {
  if (!gainInfo?.unlockedNow?.length) return;
  const family = gainInfo.snapshot?.family || getWeaponFamilyDefinition(gainInfo.familyKey, gainInfo.snapshot?.style || "Melee");
  const style = gainInfo.snapshot?.style || family.style || "Melee";
  gainInfo.unlockedNow.forEach((ability) => {
    const requirement = getAbilityMasteryRequirement(ability);
    const type = style === "Magic" ? "spell" : "technique";
    addWorldLog(`${family.discipline} ${type} learned: ${ability.name} (${family.name} mastery ${requirement}).`);
    appendCombatLogSilently(`Mastery learned: ${ability.name} (${family.name} ${requirement}).`);
  });
}

function formatWeaponMasteryGain(gainInfo) {
  if (!gainInfo?.gained || !gainInfo.snapshot?.family) return "";
  return ` ${gainInfo.snapshot.family.name} mastery +${gainInfo.gained}.`;
}

function getResourceNodeDef(resourceKind) {
  return RESOURCE_NODE_DEFS[resourceKind] || RESOURCE_NODE_DEFS.tree;
}

function isAdaptiveResourceNode(feature) {
  return !!feature && feature.type === "resource" && !feature.isDebug;
}

function snapResourceRequiredLevel(level) {
  const numericLevel = Number(level);
  if (!Number.isFinite(numericLevel) || numericLevel <= 1) return 1;
  return clamp(Math.round(numericLevel / 5) * 5, 1, SKILL_CAP_LEVEL);
}

function getResourceRequirementBand(resourceKind, biome) {
  const resourceBands = RESOURCE_REQUIREMENT_BANDS[resourceKind] || RESOURCE_REQUIREMENT_BANDS.tree;
  return resourceBands?.[biome] || resourceBands?.plains || [1, SKILL_CAP_LEVEL];
}

function rollResourceRequiredLevel(resourceKind, biome, rng, explicitLevel = null) {
  if (Number.isFinite(explicitLevel)) {
    return snapResourceRequiredLevel(explicitLevel);
  }
  const [minLevel, maxLevel] = getResourceRequirementBand(resourceKind, biome);
  if (!rng) {
    return snapResourceRequiredLevel((minLevel + maxLevel) / 2);
  }
  return snapResourceRequiredLevel(rng.int(minLevel, Math.max(minLevel, maxLevel)));
}

function ensureResourceNodeRequiredLevel(feature, biome = null, rng = null) {
  if (!feature || feature.type !== "resource") return 1;
  const legacyLevel = Number.isFinite(feature.levelRequired) ? feature.levelRequired : null;
  const currentLevel = Number.isFinite(feature.requiredLevel) ? feature.requiredLevel : legacyLevel;
  feature.requiredLevel = rollResourceRequiredLevel(feature.resourceKind, biome || "plains", rng, currentLevel);
  if ("levelRequired" in feature) delete feature.levelRequired;
  return feature.requiredLevel;
}

function getGatheringProgressIndex(skillLevel) {
  const level = clamp(Math.floor(skillLevel || 1), 1, SKILL_CAP_LEVEL);
  let index = 0;
  for (let i = 0; i < GATHERING_PROGRESS_LEVELS.length; i += 1) {
    if (GATHERING_PROGRESS_LEVELS[i] <= level) index = i;
  }
  return index;
}

function getGatheringProgressWeights(skillLevel) {
  const index = getGatheringProgressIndex(skillLevel);
  const current = GATHERING_PROGRESS_LEVELS[index];
  const previous = index > 0 ? GATHERING_PROGRESS_LEVELS[index - 1] : null;
  const next = index < GATHERING_PROGRESS_LEVELS.length - 1 ? GATHERING_PROGRESS_LEVELS[index + 1] : null;
  const nextGap = next != null ? Math.max(1, next - current) : 1;
  const progress = next != null
    ? clamp((clamp(skillLevel, current, next) - current) / nextGap, 0, 1)
    : 1;
  const previousFade = previous != null ? clamp(progress / 0.45, 0, 1) : 1;
  const nextRise = next != null ? clamp((progress - 0.82) / 0.18, 0, 1) : 0;
  const previousWeight = previous != null ? clamp(0.32 - previousFade * 0.24, 0.08, 0.32) : 0;
  const nextWeight = next != null ? clamp(nextRise * 0.24, 0, 0.24) : 0;
  const currentWeight = Math.max(0.58, 1 - previousWeight - nextWeight);
  const total = previousWeight + currentWeight + nextWeight;
  return [
    previous != null ? { level: previous, weight: previousWeight / total } : null,
    { level: current, weight: currentWeight / total },
    next != null ? { level: next, weight: nextWeight / total } : null,
  ].filter(Boolean);
}

function getAdaptiveResourceRequiredLevel(feature, player = state.game?.player) {
  if (!feature || feature.type !== "resource") return 1;
  if (feature.isDebug) return ensureResourceNodeRequiredLevel(feature, getResourceNodeBiome(feature));
  const def = getResourceNodeDef(feature.resourceKind);
  const skillLevel = getPlayerSkillEntry(player, def.skill)?.level || 1;
  const weights = getGatheringProgressWeights(skillLevel);
  const roll = createRng(hashString(`${feature.id}|${feature.resourceKind}|adaptive-level`)).next();
  let cursor = 0;
  for (const entry of weights) {
    cursor += entry.weight;
    if (roll <= cursor + 0.000001) return entry.level;
  }
  return weights[weights.length - 1]?.level || 1;
}

function rebalanceWorldResourceNodes(world, player = state.game?.player) {
  if (!world || !player) return false;
  let changed = false;
  (world.features || []).forEach((feature) => {
    if (!isAdaptiveResourceNode(feature)) return;
    const nextLevel = getAdaptiveResourceRequiredLevel(feature, player);
    if (feature.requiredLevel !== nextLevel) {
      feature.requiredLevel = nextLevel;
      changed = true;
    }
  });
  return changed;
}

function getResourceRequirementState(feature, player = state.game?.player) {
  if (!feature || feature.type !== "resource") {
    return { skillName: "Botany", requiredLevel: 1, currentLevel: 1, met: true, shortLabel: "Lv 1" };
  }
  const def = getResourceNodeDef(feature.resourceKind);
  const requiredLevel = feature.isDebug
    ? ensureResourceNodeRequiredLevel(feature, getResourceNodeBiome(feature))
    : getAdaptiveResourceRequiredLevel(feature, player);
  feature.requiredLevel = requiredLevel;
  const currentLevel = getPlayerSkillEntry(player, def.skill)?.level || 1;
  return {
    skillName: def.skill,
    requiredLevel,
    currentLevel,
    met: currentLevel >= requiredLevel,
    shortLabel: `${def.skill} Lv ${requiredLevel}`,
  };
}

function formatResourceRequirementLine(requirement, includeCurrent = true) {
  if (!requirement) return "Lv 1";
  if (!includeCurrent) return `${requirement.skillName} Lv ${requirement.requiredLevel}`;
  return requirement.met
    ? `${requirement.skillName} Lv ${requirement.requiredLevel} required`
    : `Requires ${requirement.skillName} Lv ${requirement.requiredLevel} (You are Lv ${requirement.currentLevel})`;
}

function isPointInsideArea(area, x, y) {
  return !!area
    && Number.isFinite(x)
    && Number.isFinite(y)
    && x >= area.x
    && y >= area.y
    && x < area.x + area.width
    && y < area.y + area.height;
}

function scoreDebugCraftingAreaCandidate(area, features = []) {
  let score = 0;
  features.forEach((feature) => {
    if (!isPointInsideArea(area, feature.x, feature.y)) return;
    if (feature.type === "city" || feature.type === "town") score += 1000;
    else if (feature.type === "dungeon") score += 250;
    else if (feature.type === "transition") score += 150;
    else if (feature.type === "grave") score += 120;
    else score += 10;
  });
  return score;
}

function createDebugCraftingAreaSpec(features = []) {
  const width = 15;
  const height = 14;
  const candidates = [
    { x: MAP_WIDTH - width - 2, y: MAP_HEIGHT - height - 2 },
    { x: 2, y: MAP_HEIGHT - height - 2 },
    { x: MAP_WIDTH - width - 2, y: 2 },
    { x: 2, y: 2 },
    { x: Math.max(2, Math.floor((MAP_WIDTH - width) / 2)), y: MAP_HEIGHT - height - 2 },
  ];
  let best = null;
  candidates.forEach((candidate) => {
    const area = {
      id: DEBUG_CRAFTING_AREA_ID,
      name: DEBUG_CRAFTING_AREA_ID,
      x: candidate.x,
      y: candidate.y,
      width,
      height,
      entryX: candidate.x + Math.floor(width / 2),
      entryY: candidate.y + height - 2,
    };
    const score = scoreDebugCraftingAreaCandidate(area, features);
    if (!best || score < best.score) best = { area, score };
  });
  return best?.area || {
    id: DEBUG_CRAFTING_AREA_ID,
    name: DEBUG_CRAFTING_AREA_ID,
    x: MAP_WIDTH - width - 2,
    y: MAP_HEIGHT - height - 2,
    width,
    height,
    entryX: MAP_WIDTH - Math.floor(width / 2) - 2,
    entryY: MAP_HEIGHT - 4,
  };
}

function getDebugCraftingArea(world) {
  return world?.debugArea || null;
}

function isInDebugCraftingArea(world, x, y) {
  return isPointInsideArea(getDebugCraftingArea(world), x, y);
}

function reserveAreaTiles(occupied, area, padding = 0) {
  if (!occupied || !area) return;
  for (let y = area.y - padding; y < area.y + area.height + padding; y += 1) {
    for (let x = area.x - padding; x < area.x + area.width + padding; x += 1) {
      if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_HEIGHT) continue;
      occupied.add(featureKey(x, y));
    }
  }
}

function paintDebugCraftingAreaTiles(tiles, area) {
  if (!tiles || !area) return;
  for (let y = area.y; y < area.y + area.height; y += 1) {
    for (let x = area.x; x < area.x + area.width; x += 1) {
      if (!tiles[y]?.[x]) continue;
      const border = x === area.x || y === area.y || x === area.x + area.width - 1 || y === area.y + area.height - 1;
      tiles[y][x].biome = border ? "road" : "plains";
    }
  }
  DEBUG_CRAFTING_RESOURCE_KINDS.forEach((resourceKind, rowIndex) => {
    const biome = resourceKind === "ore" || resourceKind === "crystal"
      ? "badlands"
      : (resourceKind === "fishing" || resourceKind === "tidepool" ? "swamp" : (resourceKind === "tree" || resourceKind === "hide" ? "forest" : "plains"));
    const rowY = area.y + 2 + rowIndex;
    for (let colIndex = 0; colIndex < DEBUG_CRAFTING_RESOURCE_LEVELS.length; colIndex += 1) {
      const x = area.x + 2 + colIndex;
      if (tiles[rowY]?.[x]) tiles[rowY][x].biome = biome;
    }
  });
  const workshopY = area.y + 10;
  for (let x = area.x + 1; x < area.x + area.width - 1; x += 1) {
    if (tiles[workshopY]?.[x]) tiles[workshopY][x].biome = "road";
  }
  for (let y = area.y + 10; y <= area.entryY; y += 1) {
    if (tiles[y]?.[area.entryX]) tiles[y][area.entryX].biome = "road";
  }
}

function addDebugCraftingAreaToWorld(tiles, features, occupied, area = createDebugCraftingAreaSpec(features)) {
  if (!tiles || !features || !occupied) return null;
  paintDebugCraftingAreaTiles(tiles, area);
  const entryFeature = {
    id: "feature_debug_crafting_anchor",
    type: "debug",
    name: DEBUG_CRAFTING_AREA_ID,
    x: area.entryX,
    y: area.entryY,
  };
  features.push(entryFeature);
  occupied.add(featureKey(entryFeature.x, entryFeature.y));

  DEBUG_CRAFTING_RESOURCE_KINDS.forEach((resourceKind, rowIndex) => {
    const def = getResourceNodeDef(resourceKind);
    DEBUG_CRAFTING_RESOURCE_LEVELS.forEach((requiredLevel, colIndex) => {
      const x = area.x + 2 + colIndex;
      const y = area.y + 2 + rowIndex;
      const node = {
        id: `debug_resource_${resourceKind}_${requiredLevel}`,
        type: "resource",
        isDebug: true,
        resourceKind,
        name: `${def.label} Lv ${requiredLevel}`,
        skill: def.skill,
        x,
        y,
        maxCharges: def.maxCharges || 1,
        charges: def.maxCharges || 1,
        respawnSteps: def.respawnSteps || 18,
        depletedUntil: 0,
        requiredLevel,
      };
      if (isFishingResourceKind(resourceKind)) {
        node.fishingState = {
          minigameId: def.minigameId || "fishing_basic_v1",
          minigameReady: true,
          useMinigame: false,
        };
      }
      features.push(node);
      occupied.add(featureKey(x, y));
    });
  });

  const craftingSkills = SKILL_ORDER.filter((skillName) => SKILL_DEFS[skillName]?.role === "Crafting");
  craftingSkills.forEach((skillName, index) => {
    const x = area.x + 2 + index;
    const y = area.y + 10;
    features.push({
      id: `debug_crafting_site_${skillName.toLowerCase()}`,
      type: "crafting",
      name: `${skillName} Test Bench`,
      skillFocus: skillName,
      x,
      y,
      isDebug: true,
    });
    occupied.add(featureKey(x, y));
  });

  return area;
}

function ensureDebugCraftingArea(world) {
  if (!world) return;
  if (world.debugArea && Number.isFinite(world.debugArea.x) && Number.isFinite(world.debugArea.y)) return;
  const area = createDebugCraftingAreaSpec(world.features || []);
  world.features = (world.features || []).filter((feature) => !isPointInsideArea(area, feature.x, feature.y));
  const occupied = new Set((world.features || []).map((feature) => featureKey(feature.x, feature.y)));
  reserveAreaTiles(occupied, area);
  world.debugArea = addDebugCraftingAreaToWorld(world.tiles, world.features, occupied, area);
  world.featureLookup = buildFeatureLookup(world.features || []);
}

function normalizeResourceNode(feature) {
  if (!feature || feature.type !== "resource") return;
  feature.resourceKind = RESOURCE_NODE_DEFS[feature.resourceKind] ? feature.resourceKind : "tree";
  const def = getResourceNodeDef(feature.resourceKind);
  if (feature.resourceKind === "hide" && typeof feature.name === "string" && feature.name.includes("Hunting Grounds")) {
    feature.name = feature.name.replace("Hunting Grounds", def.label);
  }
  feature.name = feature.name || def.label;
  feature.skill = def.skill;
  const minCharges = Math.max(1, def.minCharges || 1);
  const maxCharges = Math.max(minCharges, def.maxCharges || minCharges);
  feature.maxCharges = clamp(Math.floor(feature.maxCharges || maxCharges), minCharges, Math.max(12, maxCharges));
  feature.charges = clamp(Math.floor(feature.charges ?? feature.maxCharges), 0, feature.maxCharges);
  feature.respawnSteps = Math.max(6, Math.floor(feature.respawnSteps || def.respawnSteps || 18));
  feature.depletedUntil = Math.max(0, Math.floor(feature.depletedUntil || 0));
  ensureResourceNodeRequiredLevel(feature);
  if (isFishingResourceKind(feature.resourceKind)) {
    if (!feature.fishingState || typeof feature.fishingState !== "object") feature.fishingState = {};
    feature.fishingState.minigameId = feature.fishingState.minigameId || def.minigameId || "fishing_basic_v1";
    feature.fishingState.minigameReady = feature.fishingState.minigameReady !== false;
    feature.fishingState.useMinigame = !!feature.fishingState.useMinigame;
  }
}

function refreshResourceNode(feature, stepCount = state.game?.stepCount || 0) {
  if (!feature || feature.type !== "resource") return null;
  normalizeResourceNode(feature);
  if (feature.charges <= 0 && stepCount >= feature.depletedUntil) {
    feature.charges = feature.maxCharges;
    feature.depletedUntil = 0;
  }
  return feature;
}

function getResourceNodeStatus(feature, stepCount = state.game?.stepCount || 0) {
  const node = refreshResourceNode(feature, stepCount);
  if (!node) return { ready: false, charges: 0, maxCharges: 0, stepsRemaining: 0 };
  if (node.charges > 0) {
    return { ready: true, charges: node.charges, maxCharges: node.maxCharges, stepsRemaining: 0 };
  }
  return {
    ready: false,
    charges: 0,
    maxCharges: node.maxCharges,
    stepsRemaining: Math.max(0, node.depletedUntil - stepCount),
  };
}

function findPlacementForBiomes(rng, occupied, tiles, biomes, minDistance = 2) {
  const biomeSet = new Set(biomes || []);
  for (let attempts = 0; attempts < 1200; attempts += 1) {
    const x = rng.int(1, MAP_WIDTH - 2);
    const y = rng.int(1, MAP_HEIGHT - 2);
    if (biomeSet.size > 0 && !biomeSet.has(tiles[y][x].biome)) continue;
    const key = featureKey(x, y);
    if (occupied.has(key)) continue;
    let tooClose = false;
    for (const existing of occupied) {
      const [ex, ey] = existing.split(",").map(Number);
      if (Math.abs(ex - x) + Math.abs(ey - y) < minDistance) {
        tooClose = true;
        break;
      }
    }
    if (!tooClose) return { x, y };
  }
  return findPlacementSpot(rng, occupied, tiles, true);
}

function addResourceNodesToWorld(rng, tiles, features, occupied) {
  const plans = [
    { kind: "tree", count: rng.int(28, 40), minDistance: 2 },
    { kind: "herb", count: rng.int(22, 34), minDistance: 2 },
    { kind: "hide", count: rng.int(20, 30), minDistance: 2 },
    { kind: "ore", count: rng.int(20, 30), minDistance: 2 },
    { kind: "crystal", count: rng.int(14, 22), minDistance: 2 },
    { kind: "fishing", count: rng.int(18, 28), minDistance: 2 },
    { kind: "tidepool", count: rng.int(12, 18), minDistance: 2 },
  ];
  plans.forEach((plan) => {
    const def = getResourceNodeDef(plan.kind);
    for (let i = 0; i < plan.count; i += 1) {
      const spot = findPlacementForBiomes(rng, occupied, tiles, def.placementBiomes || [], plan.minDistance || 2);
      const charges = rng.int(def.minCharges || 1, def.maxCharges || 1);
      const biome = tiles?.[spot.y]?.[spot.x]?.biome || "plains";
      const node = {
        id: `resource_${plan.kind}_${i}`,
        type: "resource",
        resourceKind: plan.kind,
        name: `${def.label} ${i + 1}`,
        skill: def.skill,
        x: spot.x,
        y: spot.y,
        maxCharges: charges,
        charges,
        respawnSteps: def.respawnSteps || 18,
        depletedUntil: 0,
        requiredLevel: rollResourceRequiredLevel(plan.kind, biome, rng),
      };
      if (isFishingResourceKind(plan.kind)) {
        node.fishingState = {
          minigameId: def.minigameId || "fishing_basic_v1",
          minigameReady: true,
          useMinigame: false,
        };
      }
      features.push(node);
      occupied.add(featureKey(spot.x, spot.y));
    }
  });
}

function addCraftingSitesToWorld(rng, tiles, features, occupied) {
  const craftingSkills = SKILL_ORDER.filter((skillName) => SKILL_DEFS[skillName]?.role === "Crafting");
  const siteCount = rng.int(10, 16);
  for (let i = 0; i < siteCount; i += 1) {
    const skillFocus = rng.pick(craftingSkills);
    const biomes = CRAFTING_SITE_BIOMES[skillFocus] || ["road", "plains", "forest", "swamp", "badlands"];
    const spot = findPlacementForBiomes(rng, occupied, tiles, biomes, 3);
    const pool = CRAFTING_SITE_NAMES[skillFocus] || [`${skillFocus} Camp`];
    features.push({
      id: `crafting_site_${i}`,
      type: "crafting",
      name: `${rng.pick(pool)} ${i + 1}`,
      skillFocus,
      x: spot.x,
      y: spot.y,
    });
    occupied.add(featureKey(spot.x, spot.y));
  }
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
  const debugArea = createDebugCraftingAreaSpec();
  reserveAreaTiles(occupied, debugArea);

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
      talkCount: 0,
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

  addDebugCraftingAreaToWorld(tiles, features, occupied, debugArea);
  addResourceNodesToWorld(rng, tiles, features, occupied);
  addCraftingSitesToWorld(rng, tiles, features, occupied);

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
    debugArea,
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
  const targetLevel = clamp((tier - 1) * 10 + (cityShop ? 6 : 4), 1, MAX_LEVEL);
  const consumableEntries = cityShop ? 6 : 4;
  for (let i = 0; i < consumableEntries; i += 1) {
    const itemId = weightedPick(buildConsumableWeightTable(targetLevel, false, true), rng, "id");
    stock.push({
      id: createItemUid(),
      kind: "consumable",
      itemId,
      quantity: cityShop ? rng.int(2, 5) : rng.int(1, 3),
      price: Math.floor((SHOP_CONSUMABLE_PRICES[itemId] || 20) * (cityShop ? 1.05 : 1)),
    });
  }

  const materialEntries = cityShop ? 6 : 4;
  for (let i = 0; i < materialEntries; i += 1) {
    const itemId = rollMaterialIdForLevel(targetLevel, rng, {
      biome: cityShop ? "road" : rng.pick(["plains", "forest", "swamp", "badlands"]),
      highQuality: cityShop,
    });
    const quantity = cityShop ? rng.int(4, 8) : rng.int(3, 6);
    stock.push({
      id: createItemUid(),
      kind: "material",
      itemId,
      quantity,
      price: getMaterialShopPrice(itemId, quantity, tier),
    });
  }

  const toolPool = CRAFTING_TOOL_ORDER.slice();
  const targetToolCount = cityShop ? toolPool.length : Math.min(3, toolPool.length);
  const chosenTools = [];
  while (toolPool.length && chosenTools.length < targetToolCount) {
    const index = rng.int(0, toolPool.length - 1);
    chosenTools.push(toolPool.splice(index, 1)[0]);
  }
  chosenTools.forEach((toolId) => {
    stock.push({
      id: createItemUid(),
      kind: "tool",
      itemId: toolId,
      quantity: 1,
      price: Math.floor((CRAFTING_TOOL_DEFS[toolId]?.shopPrice || 120) * (cityShop ? 1 : 1.05)),
    });
  });

  const stationPool = CRAFTING_STATION_ORDER.slice();
  const targetStationCount = cityShop ? Math.min(3, stationPool.length) : Math.min(1, stationPool.length);
  const chosenStations = [];
  while (stationPool.length && chosenStations.length < targetStationCount) {
    const index = rng.int(0, stationPool.length - 1);
    chosenStations.push(stationPool.splice(index, 1)[0]);
  }
  chosenStations.forEach((stationId) => {
    stock.push({
      id: createItemUid(),
      kind: "station",
      itemId: stationId,
      quantity: 1,
      price: Math.floor((CRAFTING_STATION_DEFS[stationId]?.shopPrice || 360) * (cityShop ? 1 : 1.04)),
    });
  });

  const gearEntries = cityShop ? 5 : 3;
  for (let i = 0; i < gearEntries; i += 1) {
    const level = clamp((tier - 1) * 10 + rng.int(1, 10), 1, MAX_LEVEL);
    const item = generateEquipmentDrop(level + (cityShop ? 1 : 0), rng, { boss: cityShop && rng.next() < 0.18 });
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

function openCraftingMenu(feature = null, options = {}) {
  if (!state.game) return;
  const { stationId = null, skillName = null } = options || {};
  const activeFeature = feature || getFeatureAt(state.game.world, state.game.player.position.x, state.game.player.position.y);
  const preferredSkill = skillName || (activeFeature?.type === "crafting" ? activeFeature.skillFocus : null);
  if (preferredSkill) setActiveCraftingSkillTab(preferredSkill);
  state.modal = "crafting";
  state.modalData = { feature: activeFeature, stationId };
  state.craftingRun = null;
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
  feature.shopStock = [...feature.shopStock, ...added].slice(-14);
}

function buyShopItem(shopItemId) {
  if (!state.game || !shopItemId) return;
  const player = state.game.player;
  const feature = state.modalData?.feature;
  if (!feature || !feature.hasShop || !feature.shopStock) return;
  const entryIndex = feature.shopStock.findIndex((entry) => entry.id === shopItemId);
  if (entryIndex < 0) return;
  const entry = feature.shopStock[entryIndex];
  if (entry.kind === "tool" && playerHasTool(player, entry.itemId)) {
    addWorldLog(`You already own ${CRAFTING_TOOL_DEFS[entry.itemId]?.name || entry.itemId}.`);
    return;
  }
  if (entry.kind === "station" && playerHasStation(player, entry.itemId)) {
    addWorldLog(`You already own ${CRAFTING_STATION_DEFS[entry.itemId]?.name || entry.itemId}.`);
    return;
  }
  if (player.gold < entry.price) {
    addWorldLog("Not enough gold.");
    return;
  }
  player.gold -= entry.price;
  if (entry.kind === "consumable") {
    addConsumableToBag(player, entry.itemId, 1);
    entry.quantity -= 1;
    addWorldLog(`Bought ${CONSUMABLE_DEFS[entry.itemId]?.name || entry.itemId} for ${entry.price} gold.`);
  } else if (entry.kind === "tool") {
    addToolToBag(player, entry.itemId);
    entry.quantity = 0;
    addWorldLog(`Bought ${CRAFTING_TOOL_DEFS[entry.itemId]?.name || entry.itemId} for ${entry.price} gold.`);
  } else if (entry.kind === "station") {
    addStationToBag(player, entry.itemId);
    entry.quantity = 0;
    addWorldLog(`Bought ${CRAFTING_STATION_DEFS[entry.itemId]?.name || entry.itemId} for ${entry.price} gold.`);
  } else if (entry.kind === "material") {
    addStackableLoot(player, "material", MATERIAL_DEFS[entry.itemId], entry.quantity);
    addWorldLog(`Bought ${entry.quantity}x ${MATERIAL_DEFS[entry.itemId]?.name || entry.itemId} for ${entry.price} gold.`);
    entry.quantity = 0;
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
    const consumableId = rollConsumableDrop(runtimeRng, clamp(player.level + 6, 1, MAX_LEVEL), false);
    const qty = runtimeRng.int(1, player.level >= 40 ? 3 : 2);
    addConsumableToBag(player, consumableId, qty);
    rewards.push(`${qty}x ${CONSUMABLE_DEFS[consumableId].name}`);
  }
  if (runtimeRng.next() < 0.45) {
    const item = generateEquipmentDrop(player.level + runtimeRng.int(1, 5), runtimeRng, { boss: player.level >= 60 && runtimeRng.next() < 0.18 });
    addItemToBag(player, item);
    rewards.push(item.name);
  }
  if (runtimeRng.next() < 0.7) {
    const materialId = rollMaterialIdForLevel(player.level + 4, runtimeRng, { biome: "road", highQuality: player.level >= 45 });
    const qty = runtimeRng.int(2, player.level >= 55 ? 5 : 3);
    addStackableLoot(player, "material", MATERIAL_DEFS[materialId], qty);
    rewards.push(`${qty}x ${MATERIAL_DEFS[materialId].name}`);
  }
  const missingStations = CRAFTING_STATION_ORDER.filter((stationId) => !playerHasStation(player, stationId));
  if (missingStations.length && runtimeRng.next() < clamp(0.04 + player.level * 0.0012, 0.04, 0.16)) {
    const stationId = runtimeRng.pick(missingStations);
    addStationToBag(player, stationId);
    rewards.push(CRAFTING_STATION_DEFS[stationId].name);
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
  const expiredWorldEffects = tickWorldEffects(state.game.player);
  state.game.meta.transitionsUsed += 1;
  updateQuestProgress("transitionUsed", { fromId: feature.id, toId: target.id });
  addWorldLog(`${feature.name} shifts you to ${target.name}.`);
  expiredWorldEffects.forEach((effect) => addWorldLog(`${effect.name} wore off.`));
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

function getQuestProgressionState(snapshot) {
  const playerLevel = clamp(Math.floor(snapshot?.player?.level || 1), 1, MAX_LEVEL);
  const questsCompleted = Math.max(0, Math.floor(snapshot?.meta?.questsCompleted || 0));
  const bossesDefeated = Math.max(0, Math.floor(snapshot?.meta?.bossesDefeated || 0));
  const playTimeMs = snapshot === state.game ? getCurrentGamePlayTimeMs(snapshot) : Math.max(0, Math.floor(snapshot?.playTimeMs || 0));
  const stageFromLevel = Math.floor((playerLevel - 1) / 8);
  const stageFromQuests = Math.floor(questsCompleted / 3);
  const stageFromBosses = Math.floor(bossesDefeated / 2);
  const stageFromTime = Math.floor(playTimeMs / (36 * 60 * 1000));
  const stage = clamp(Math.max(stageFromLevel, stageFromQuests, stageFromBosses, stageFromTime), 0, QUEST_STAGE_LABELS.length - 1);
  return {
    playerLevel,
    questsCompleted,
    bossesDefeated,
    playTimeMs,
    stage,
    rankLabel: QUEST_STAGE_LABELS[stage],
  };
}

function replaceQuestTokens(text, tokens) {
  return Object.entries(tokens || {}).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, value), text);
}

function buildQuestReward(rng, snapshot, recommendedLevel, options = {}) {
  const progress = getQuestProgressionState(snapshot);
  const goldFloor = 55 + progress.stage * 24 + (options.goldBonus || 0);
  const goldCeil = goldFloor + 42 + progress.stage * 18 + (options.goldRangeBonus || 0);
  const xpFloor = 60 + progress.stage * 28 + (options.xpBonus || 0);
  const xpCeil = xpFloor + 55 + progress.stage * 20 + (options.xpRangeBonus || 0);
  const consumableId = options.consumableId || rollConsumableDrop(rng, recommendedLevel + (options.isBoss ? 8 : 2), !!options.isBoss);
  const consumableQty = options.consumableQty || clamp(1 + Math.floor(progress.stage / 3) + (options.isBoss ? 1 : 0), 1, 3);
  return {
    gold: rng.int(goldFloor, goldCeil),
    xp: rng.int(xpFloor, xpCeil),
    consumableId,
    consumableQty,
  };
}

function getQuestSignature(quest) {
  return [
    quest.type,
    quest.featureId || "",
    quest.biome || "",
    quest.role || "",
    quest.zone || "",
    quest.skill || "",
    quest.resourceKind || "",
    quest.minQuality || "",
  ].join("|");
}

function buildQuestBase(prefix, type, title, description, target, reward, extra = {}) {
  return {
    id: `${prefix}_${createItemUid()}`,
    type,
    title,
    description,
    target,
    progress: 0,
    completed: false,
    claimed: false,
    reward,
    recommendedLevel: extra.recommendedLevel || 1,
    rank: extra.rank || QUEST_STAGE_LABELS[0],
    boardStage: extra.boardStage || 0,
    ...extra,
  };
}

function createDungeonQuest(world, rng, snapshot, existingQuests) {
  const progress = getQuestProgressionState(snapshot);
  const used = new Set(existingQuests.filter((quest) => quest.type === "clear_dungeon").map((quest) => quest.featureId));
  const candidates = world.features.filter((feature) => feature.type === "dungeon" && !feature.bossDefeated && !used.has(feature.id));
  if (!candidates.length) return null;
  const dungeon = rng.pick(candidates);
  const recommendedLevel = clamp(Math.max(progress.playerLevel, 5 + progress.stage * 9 + rng.int(0, 4)), 1, MAX_LEVEL);
  const title = `${progress.rankLabel} Contract: ${rng.pick(QUEST_DUNGEON_VERBS)} ${dungeon.name}`;
  const reward = buildQuestReward(rng, snapshot, recommendedLevel, { isBoss: true, goldBonus: 36, xpBonus: 40 });
  return buildQuestBase(
    "quest_clear",
    "clear_dungeon",
    title,
    `Defeat the boss in ${dungeon.name} before its patrols spill back onto the roads.`,
    1,
    reward,
    { featureId: dungeon.id, recommendedLevel, rank: progress.rankLabel, boardStage: progress.stage },
  );
}

function createBiomeQuest(world, rng, snapshot, existingQuests) {
  const progress = getQuestProgressionState(snapshot);
  const usedBiomes = new Set(existingQuests.filter((quest) => quest.type === "defeat_biome").map((quest) => quest.biome));
  const biomes = Object.keys(BIOME_DATA).filter((biome) => !usedBiomes.has(biome));
  const biome = rng.pick(biomes.length ? biomes : Object.keys(BIOME_DATA));
  const label = BIOME_DATA[biome].label;
  const target = clamp(4 + progress.stage + rng.int(0, 2), 4, 16);
  const recommendedLevel = clamp(Math.max(progress.playerLevel, 3 + progress.stage * 8 + rng.int(0, 3)), 1, MAX_LEVEL);
  const title = `${rng.pick(QUEST_BIOME_ACTIONS[biome] || ["Sweep"])} ${label}`;
  const reward = buildQuestReward(rng, snapshot, recommendedLevel, { goldBonus: 18, xpBonus: 20 });
  return buildQuestBase(
    "quest_hunt",
    "defeat_biome",
    title,
    `Defeat ${target} enemies in the ${label} to thin out pressure on nearby travelers.`,
    target,
    reward,
    { biome, recommendedLevel, rank: progress.rankLabel, boardStage: progress.stage },
  );
}

function createTalkQuest(rng, snapshot, existingQuests) {
  const progress = getQuestProgressionState(snapshot);
  const usedRoles = new Set(existingQuests.filter((quest) => quest.type === "npc_talks" && quest.role).map((quest) => quest.role));
  const roleChoices = QUEST_ROLE_TARGETS.filter((role) => !usedRoles.has(role));
  const role = rng.pick(roleChoices.length ? roleChoices : QUEST_ROLE_TARGETS);
  const target = clamp(3 + Math.floor(progress.stage / 2) + rng.int(0, 2), 3, 8);
  const recommendedLevel = clamp(Math.max(progress.playerLevel, 1 + progress.stage * 7), 1, MAX_LEVEL);
  const roleLabel = role[0].toUpperCase() + role.slice(1);
  const reward = buildQuestReward(rng, snapshot, recommendedLevel, { goldBonus: 10, xpBonus: 14, consumableId: "focus_tonic", consumableQty: 1 + (progress.stage >= 5 ? 1 : 0) });
  return buildQuestBase(
    "quest_talk",
    "npc_talks",
    `${progress.rankLabel} Rumor Web: ${roleLabel}s`,
    `Talk to ${target} ${role} NPC${target === 1 ? "" : "s"} and gather fresh route intelligence.`,
    target,
    reward,
    { role, recommendedLevel, rank: progress.rankLabel, boardStage: progress.stage },
  );
}

function createChestQuest(rng, snapshot) {
  const progress = getQuestProgressionState(snapshot);
  const target = clamp(2 + Math.floor(progress.stage / 2) + rng.int(0, 1), 2, 5);
  const recommendedLevel = clamp(Math.max(progress.playerLevel, 2 + progress.stage * 7), 1, MAX_LEVEL);
  const reward = buildQuestReward(rng, snapshot, recommendedLevel, { goldBonus: 16, xpBonus: 16, consumableId: "smoke_bomb", consumableQty: 1 });
  return buildQuestBase(
    "quest_chest",
    "open_chests",
    `${progress.rankLabel} Cache Sweep`,
    `Open ${target} adventure chest${target === 1 ? "" : "s"} before another band finds them first.`,
    target,
    reward,
    { recommendedLevel, rank: progress.rankLabel, boardStage: progress.stage },
  );
}

function createVisitQuest(world, rng, snapshot, existingQuests) {
  const progress = getQuestProgressionState(snapshot);
  const used = new Set(existingQuests.filter((quest) => quest.type === "visit_feature").map((quest) => quest.featureId));
  const candidates = world.features.filter((feature) => (feature.type === "town" || feature.type === "city") && !used.has(feature.id));
  if (!candidates.length) return null;
  const target = rng.pick(candidates);
  const recommendedLevel = clamp(Math.max(progress.playerLevel, 1 + progress.stage * 6), 1, MAX_LEVEL);
  const reward = buildQuestReward(rng, snapshot, recommendedLevel, { goldBonus: 12, xpBonus: 12 });
  return buildQuestBase(
    "quest_visit",
    "visit_feature",
    `${rng.pick(QUEST_VISIT_VERBS)} ${target.name}`,
    `Travel to ${target.name} and confirm the route can still be held.`,
    1,
    reward,
    { featureId: target.id, recommendedLevel, rank: progress.rankLabel, boardStage: progress.stage },
  );
}

function createTransitionQuest(world, rng, snapshot) {
  const progress = getQuestProgressionState(snapshot);
  const transitions = world.features.filter((feature) => feature.type === "transition");
  if (!transitions.length) return null;
  const target = clamp(2 + Math.floor(progress.stage / 3) + rng.int(0, 1), 2, 5);
  const recommendedLevel = clamp(Math.max(progress.playerLevel, 4 + progress.stage * 7), 1, MAX_LEVEL);
  const reward = buildQuestReward(rng, snapshot, recommendedLevel, { goldBonus: 18, xpBonus: 18 });
  return buildQuestBase(
    "quest_transition",
    "use_transition",
    `${progress.rankLabel} Waygate Survey`,
    `Use region transitions ${target} time${target === 1 ? "" : "s"} to map safe shortcuts and unstable routes.`,
    target,
    reward,
    { recommendedLevel, rank: progress.rankLabel, boardStage: progress.stage },
  );
}

function createGatherQuest(rng, snapshot, existingQuests) {
  const progress = getQuestProgressionState(snapshot);
  const skills = Object.keys(GATHERING_SKILL_QUEST_COPY);
  const used = new Set(existingQuests.filter((quest) => quest.type === "gather_skill").map((quest) => quest.skill));
  const choices = skills.filter((skill) => !used.has(skill));
  const skill = rng.pick(choices.length ? choices : skills);
  const copy = GATHERING_SKILL_QUEST_COPY[skill];
  if (!copy) return null;
  const target = clamp(7 + progress.stage * 2 + rng.int(0, 4), 7, 28);
  const recommendedLevel = clamp(Math.max(progress.playerLevel, 2 + progress.stage * 7), 1, MAX_LEVEL);
  const reward = buildQuestReward(rng, snapshot, recommendedLevel, { goldBonus: 18, xpBonus: 20 });
  return buildQuestBase(
    "quest_gather",
    "gather_skill",
    `${progress.rankLabel} ${rng.pick(copy.title)}`,
    replaceQuestTokens(copy.description, { target }),
    target,
    reward,
    { skill, recommendedLevel, rank: progress.rankLabel, boardStage: progress.stage },
  );
}

function createCraftQuest(rng, snapshot, existingQuests) {
  const progress = getQuestProgressionState(snapshot);
  const skills = Object.keys(CRAFTING_SKILL_QUEST_COPY);
  const used = new Set(existingQuests.filter((quest) => quest.type === "craft_skill").map((quest) => quest.skill));
  const choices = skills.filter((skill) => !used.has(skill));
  const skill = rng.pick(choices.length ? choices : skills);
  const target = clamp(2 + Math.floor(progress.stage / 2) + rng.int(0, 1), 2, 7);
  const minQuality = progress.stage >= 6 ? "great" : "good";
  const recommendedLevel = clamp(Math.max(progress.playerLevel, 3 + progress.stage * 8), 1, MAX_LEVEL);
  const reward = buildQuestReward(rng, snapshot, recommendedLevel, { goldBonus: 22, xpBonus: 24, consumableId: "precision_elixir", consumableQty: progress.stage >= 5 ? 2 : 1 });
  return buildQuestBase(
    "quest_craft",
    "craft_skill",
    `${progress.rankLabel} ${rng.pick(CRAFTING_SKILL_QUEST_COPY[skill] || [skill])}`,
    `Craft ${target} item${target === 1 ? "" : "s"} using ${skill}${minQuality === "great" ? " at Great quality or better" : ""}.`,
    target,
    reward,
    { skill, minQuality, recommendedLevel, rank: progress.rankLabel, boardStage: progress.stage },
  );
}

function createQuestFromArchetype(type, world, rng, snapshot, existingQuests) {
  if (type === "clear_dungeon") return createDungeonQuest(world, rng, snapshot, existingQuests);
  if (type === "defeat_biome") return createBiomeQuest(world, rng, snapshot, existingQuests);
  if (type === "npc_talks") return createTalkQuest(rng, snapshot, existingQuests);
  if (type === "open_chests") return createChestQuest(rng, snapshot);
  if (type === "visit_feature") return createVisitQuest(world, rng, snapshot, existingQuests);
  if (type === "use_transition") return createTransitionQuest(world, rng, snapshot);
  if (type === "gather_skill") return createGatherQuest(rng, snapshot, existingQuests);
  if (type === "craft_skill") return createCraftQuest(rng, snapshot, existingQuests);
  return null;
}

function generateQuestOffer(world, rng, snapshot, existingQuests = []) {
  const progress = getQuestProgressionState(snapshot);
  const table = [
    { key: "defeat_biome", weight: 3.2 },
    { key: "npc_talks", weight: 2.1 },
    { key: "open_chests", weight: 1.8 },
    { key: "visit_feature", weight: 1.7 },
    { key: "use_transition", weight: 1.2 + progress.stage * 0.08 },
    { key: "gather_skill", weight: 1.3 + progress.stage * 0.18 },
    { key: "craft_skill", weight: 1.1 + progress.stage * 0.2 },
    { key: "clear_dungeon", weight: 1.6 + progress.stage * 0.12 },
  ];
  const signatures = new Set(existingQuests.map(getQuestSignature));
  for (let attempts = 0; attempts < 16; attempts += 1) {
    const type = weightedPick(table, rng, "key");
    const quest = createQuestFromArchetype(type, world, rng, snapshot, existingQuests);
    if (!quest) continue;
    const signature = getQuestSignature(quest);
    if (signatures.has(signature)) continue;
    return quest;
  }
  return null;
}

function generateProceduralQuests(world, seedText, options = {}) {
  const snapshot = options.game || {
    seed: seedText,
    world,
    player: { level: 1 },
    meta: { questsCompleted: 0, bossesDefeated: 0 },
    playTimeMs: 0,
  };
  const rng = options.rng || createRng(hashString(`${seedText}|quests|${snapshot?.player?.level || 1}`));
  const count = clamp(options.count || QUEST_BOARD_ACTIVE_TARGET, 1, QUEST_BOARD_ACTIVE_TARGET + 4);
  const quests = [];
  for (let attempts = 0; quests.length < count && attempts < count * 14; attempts += 1) {
    const quest = generateQuestOffer(world, rng, snapshot, quests);
    if (!quest) break;
    quests.push(quest);
  }
  return quests;
}

function pruneQuestArchive() {
  if (!state.game?.quests?.length) return;
  const claimed = state.game.quests.filter((quest) => quest.claimed);
  if (claimed.length <= QUEST_ARCHIVE_LIMIT) return;
  const keepIds = new Set(claimed.slice(-QUEST_ARCHIVE_LIMIT).map((quest) => quest.id));
  state.game.quests = state.game.quests.filter((quest) => !quest.claimed || keepIds.has(quest.id));
}

function ensureQuestBoardDepth(options = {}) {
  if (!state.game?.quests) return 0;
  const targetCount = clamp(options.target || QUEST_BOARD_ACTIVE_TARGET, 1, QUEST_BOARD_ACTIVE_TARGET + 4);
  const activeQuests = state.game.quests.filter((quest) => !quest.claimed);
  const shadow = activeQuests.slice();
  let added = 0;
  for (let attempts = 0; shadow.length < targetCount && attempts < targetCount * 14; attempts += 1) {
    const quest = generateQuestOffer(state.game.world, state.game.runtimeRng, state.game, shadow);
    if (!quest) break;
    shadow.push(quest);
    state.game.quests.push(quest);
    state.game.questCycle = (state.game.questCycle || 0) + 1;
    added += 1;
    if (!options.silent) addWorldLog(`New quest posted: ${quest.title}.`);
  }
  if (added > 0) pruneQuestArchive();
  return added;
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
    if (quest.type === "npc_talks" && eventType === "npcTalk") {
      const roleOk = !quest.role || payload.role === quest.role;
      const zoneOk = !quest.zone || payload.zone === quest.zone;
      if (roleOk && zoneOk) delta = Math.max(1, payload.amount || 1);
    }
    if (quest.type === "open_chests" && eventType === "chestOpened") delta = 1;
    if (quest.type === "visit_feature" && eventType === "visitFeature" && payload.feature?.id === quest.featureId) delta = 1;
    if (quest.type === "use_transition" && eventType === "transitionUsed") delta = 1;
    if (quest.type === "gather_skill" && eventType === "gatherMaterial") {
      if (!quest.skill || payload.skill === quest.skill) delta = Math.max(1, payload.amount || 1);
    }
    if (quest.type === "craft_skill" && eventType === "craftItem") {
      const qualityOk = !quest.minQuality || (QUEST_QUALITY_ORDER[payload.qualityKey] || 0) >= (QUEST_QUALITY_ORDER[quest.minQuality] || 0);
      if ((!quest.skill || payload.skill === quest.skill) && qualityOk) delta = Math.max(1, payload.amount || 1);
    }

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
  ensureQuestBoardDepth();
}

function getQuestRumor() {
  if (!state.game || !state.game.quests) return "";
  const openQuests = state.game.quests.filter((quest) => !quest.completed && !quest.claimed);
  if (!openQuests.length) return "";
  const quest = state.game.runtimeRng.pick(openQuests);
  if (quest.type === "clear_dungeon") return `${quest.title} is still paying out. ${quest.featureId ? "Nobody has broken that lair yet." : ""}`.trim();
  if (quest.type === "defeat_biome") return `Bounties are stacking up in the ${BIOME_DATA[quest.biome]?.label || quest.biome}.`;
  if (quest.type === "npc_talks") return `${quest.role ? `The ${quest.role}s` : "The locals"} are still trading useful rumors for patience.`;
  if (quest.type === "open_chests") return "Scouts reported untouched caches hidden off the roads again.";
  if (quest.type === "visit_feature") return `Someone still needs eyes on ${quest.title.replace(/^(Check In With|Report To|Survey|Reinforce|Secure)\s+/, "")}.`;
  if (quest.type === "use_transition") return "The waygates are unstable, which means cartographers are paying extra.";
  if (quest.type === "gather_skill") return `${quest.skill} crews are short on field supplies again.`;
  if (quest.type === "craft_skill") return `${quest.skill} orders keep piling up on the board.`;
  return "The quest board keeps filling faster than anyone expected.";
}

function normalizeQuestList(list) {
  return (list || []).map((quest) => ({
    ...quest,
    target: Math.max(1, Number.isFinite(quest.target) ? quest.target : 1),
    progress: Math.max(0, Number.isFinite(quest.progress) ? quest.progress : 0),
    completed: !!quest.completed,
    claimed: !!quest.claimed,
    recommendedLevel: clamp(Math.floor(quest.recommendedLevel || 1), 1, MAX_LEVEL),
    rank: quest.rank || QUEST_STAGE_LABELS[0],
    boardStage: clamp(Math.floor(quest.boardStage || 0), 0, QUEST_STAGE_LABELS.length - 1),
    minQuality: quest.minQuality || null,
    role: quest.role || null,
    zone: quest.zone || null,
    skill: quest.skill || null,
    resourceKind: quest.resourceKind || null,
    reward: quest.reward || { gold: 0, xp: 0 },
  }));
}

function getNpcProfile(feature) {
  const seed = `${state.game?.seed || "seed"}|npc-profile|${feature?.id || feature?.name || feature?.type || "local"}`;
  const rng = createRng(hashString(seed));
  return {
    temperament: rng.pick(NPC_TEMPERAMENTS),
    quirk: rng.pick(NPC_QUIRKS),
  };
}

function getNpcDialogueLandmark(feature, rng) {
  if (!state.game?.world) return null;
  const { world } = state.game;
  if (feature?.homeId) {
    const home = world.features.find((entry) => entry.id === feature.homeId);
    if (home) return home;
  }
  const candidates = world.features.filter((entry) => entry.id !== feature?.id && ["dungeon", "town", "city", "transition"].includes(entry.type));
  return candidates.length ? rng.pick(candidates) : null;
}

function buildNpcContextLine(feature, profile, questHint, rng) {
  const player = state.game.player;
  const progress = getQuestProgressionState(state.game);
  const landmark = getNpcDialogueLandmark(feature, rng);
  if (questHint && ((feature?.talkCount || 0) + state.game.meta.npcsTalked) % 2 === 0) {
    return `They lean in and say ${questHint[0].toLowerCase()}${questHint.slice(1)}`;
  }
  if (state.game.dynamic?.threat >= 4) {
    return "They keep one eye on the horizon and insist the threat is climbing faster than the watch can post notices.";
  }
  if (player.currentHealth <= Math.max(24, player.derivedStats.Health * 0.4)) {
    return "They take one look at your bruises and recommend sleeping before trying to impress another dungeon.";
  }
  if (landmark) {
    return `They keep steering the conversation back toward ${landmark.name}, like the place owes them an explanation.`;
  }
  if (progress.stage >= 4) {
    return "They say your name like it already belongs on a bounty board, a tavern sign, and at least one questionable song.";
  }
  if (player.gold < 40) {
    return "They remark that broke heroes make quick decisions and expensive mistakes.";
  }
  return rng.pick(NPC_WORLD_REACTIONS);
}

function buildNpcDialogue(feature, questHint) {
  const zone = feature?.type === "npc"
    ? (feature.zone || "wild")
    : feature?.type === "city"
      ? "city"
      : feature?.type === "town"
        ? "town"
        : "wild";
  const talkIndex = feature?.type === "npc" ? (feature.talkCount || 0) : state.game.meta.npcsTalked;
  const rng = createRng(hashString(`${state.game.seed}|npc-dialogue|${feature?.id || feature?.name || zone}|${talkIndex}|${state.game.meta.npcsTalked}`));
  const profile = getNpcProfile(feature || { id: zone, type: zone, name: zone });
  const roleLine = feature?.type === "npc" ? rng.pick(NPC_ROLE_DIALOG[feature.role] || NPC_ROLE_DIALOG.guard) : "";
  const zoneLine = rng.pick(NPC_DIALOG[zone] || NPC_DIALOG.wild);
  const contextLine = buildNpcContextLine(feature, profile, questHint, rng);
  const quirkLine = `They ${profile.quirk}.`;
  const pool = [roleLine, zoneLine, contextLine, quirkLine].filter(Boolean);
  const selected = [];
  while (pool.length && selected.length < 3) {
    const index = rng.int(0, pool.length - 1);
    selected.push(pool.splice(index, 1)[0]);
  }
  return selected.join(" ");
}

function talkToNpc() {
  if (!state.game || state.combat) return;
  const { world, player, runtimeRng } = state.game;
  const feature = getFeatureAt(world, player.position.x, player.position.y);
  const zone = feature?.type === "city" ? "city" : feature?.type === "town" ? "town" : feature?.type === "npc" ? (feature.zone || "wild") : "wild";
  const speaker = feature?.type === "npc"
    ? feature.name
    : feature?.name
      ? `${feature.name} Local`
      : `${zone[0].toUpperCase()}${zone.slice(1)} Local`;

  let rewardLine = "";
  const rewardRoll = runtimeRng.next();
  if (rewardRoll < 0.25) {
    const gold = runtimeRng.int(10 + player.level, 24 + player.level * 2);
    player.gold += gold;
    state.game.meta.totalGoldFound += gold;
    rewardLine = `${gold} gold`;
  } else if (rewardRoll < 0.5) {
    const drop = rollConsumableDrop(runtimeRng, clamp(player.level + 4, 1, MAX_LEVEL), player.level >= 45 && runtimeRng.next() < 0.2);
    const quantity = player.level >= 50 && runtimeRng.next() < 0.35 ? 2 : 1;
    addConsumableToBag(player, drop, quantity);
    rewardLine = `${quantity}x ${CONSUMABLE_DEFS[drop].name}`;
  } else if (rewardRoll < 0.57) {
    const heal = Math.max(20, Math.floor(16 + player.level * 1.4));
    player.currentHealth = clamp(player.currentHealth + heal, 0, player.derivedStats.Health);
    rewardLine = `${heal} Health restored`;
  }

  const questHint = getQuestRumor();
  const text = buildNpcDialogue(feature, questHint);
  if (feature?.type === "npc") feature.talkCount = (feature.talkCount || 0) + 1;
  state.game.meta.npcsTalked += 1;
  updateQuestProgress("npcTalk", { zone, role: feature?.role || null });
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

function createSaveSlotId() {
  return `slot_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

function getSaveSlotStorageKey(slotId) {
  return `${SAVE_SLOT_KEY_PREFIX}${slotId}`;
}

function buildDefaultSaveSlotLabel(playerName, difficulty, seedText) {
  const shortSeed = String(seedText || "seed").slice(0, 8);
  return `${playerName || "Hero"} - ${difficulty || "Normal"} - ${shortSeed}`;
}

function getStoryChapterForGame(game) {
  const chapters = game?.storyline && game.storyline.length ? game.storyline : STORY_CHAPTERS;
  const index = clamp(game?.storyIndex || 0, 0, chapters.length - 1);
  return chapters[index];
}

function getLocationNameFromWorld(world, x, y) {
  const feature = (world?.features || []).find((entry) => entry.x === x && entry.y === y);
  if (feature?.name) return feature.name;
  const biome = world?.tiles?.[y]?.[x]?.biome;
  return BIOME_DATA[biome]?.label || "Unknown Road";
}

function sortSaveSlots(slots) {
  return slots.slice().sort((a, b) => new Date(b.savedAt || 0).getTime() - new Date(a.savedAt || 0).getTime());
}

function buildSaveSlotMetadata(slotId, payload, previousMeta = null) {
  const game = payload?.game || {};
  const player = game.player || {};
  const chapter = getStoryChapterForGame(game);
  const position = player.position || { x: 0, y: 0 };
  const savedAt = payload?.savedAt || previousMeta?.savedAt || new Date().toISOString();
  return {
    id: slotId,
    label: previousMeta?.label || buildDefaultSaveSlotLabel(player.name, game.difficulty, game.seed),
    playerName: player.name || "Unnamed Hero",
    level: clamp(Math.floor(player.level || 1), 1, MAX_LEVEL),
    difficulty: game.difficulty || "Normal",
    seed: game.seed || "unknown",
    location: getLocationNameFromWorld(game.world || {}, position.x, position.y),
    chapterTitle: chapter?.title || STORY_CHAPTERS[0].title,
    savedAt,
    createdAt: previousMeta?.createdAt || savedAt,
    playTimeMs: Math.max(0, Math.floor(game.playTimeMs || previousMeta?.playTimeMs || 0)),
    bossesDefeated: game.meta?.bossesDefeated || 0,
    questsCompleted: game.meta?.questsCompleted || 0,
  };
}

function writeSaveSlotIndex(slots) {
  localStorage.setItem(SAVE_SLOT_INDEX_KEY, JSON.stringify(sortSaveSlots(slots)));
}

function migrateLegacySaveToSlots() {
  let existing = [];
  try {
    existing = JSON.parse(localStorage.getItem(SAVE_SLOT_INDEX_KEY) || "[]");
  } catch {
    existing = [];
  }
  if (Array.isArray(existing) && existing.length) return sortSaveSlots(existing);
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!parsed?.game) return [];
  const slotId = createSaveSlotId();
  const meta = buildSaveSlotMetadata(slotId, parsed);
  try {
    localStorage.setItem(getSaveSlotStorageKey(slotId), JSON.stringify(parsed));
    writeSaveSlotIndex([meta]);
    return [meta];
  } catch {
    return [];
  }
}

function refreshSaveSlots() {
  migrateLegacySaveToSlots();
  let slots;
  try {
    slots = JSON.parse(localStorage.getItem(SAVE_SLOT_INDEX_KEY) || "[]");
  } catch {
    slots = [];
  }
  if (!Array.isArray(slots)) slots = [];
  const filtered = slots.filter((slot) => slot?.id && localStorage.getItem(getSaveSlotStorageKey(slot.id)));
  if (filtered.length !== slots.length) {
    try {
      writeSaveSlotIndex(filtered);
    } catch {
      // Ignore cleanup failures and keep the in-memory list.
    }
  }
  state.saveSlots = sortSaveSlots(filtered);
  return state.saveSlots;
}

function deleteSaveSlot(slotId) {
  if (!slotId) return false;
  const slots = refreshSaveSlots();
  const slot = slots.find((entry) => entry.id === slotId);
  if (!slot) return false;
  const label = slot.label || "this save slot";
  const ok = window.confirm(`Delete ${label}? This cannot be undone.`);
  if (!ok) return false;
  localStorage.removeItem(getSaveSlotStorageKey(slotId));
  writeSaveSlotIndex(slots.filter((entry) => entry.id !== slotId));
  if (state.activeSaveSlotId === slotId) state.activeSaveSlotId = null;
  refreshSaveSlots();
  addMenuMessage(`${label} deleted.`);
  return true;
}

function saveGame() {
  if (!state.game) return false;
  const savedAt = new Date().toISOString();
  const payload = {
    version: 2,
    savedAt,
    options: state.options,
    ui: { map: state.map },
    game: serializeGame(state.game),
  };
  const existingSlots = refreshSaveSlots();
  const slotId = state.activeSaveSlotId || createSaveSlotId();
  const previousMeta = existingSlots.find((entry) => entry.id === slotId) || null;
  const meta = buildSaveSlotMetadata(slotId, payload, previousMeta);
  const nextSlots = [...existingSlots.filter((entry) => entry.id !== slotId), meta];
  try {
    localStorage.setItem(getSaveSlotStorageKey(slotId), JSON.stringify(payload));
    writeSaveSlotIndex(nextSlots);
  } catch {
    addWorldLog("Save failed: local browser storage is full or unavailable.");
    return false;
  }
  state.activeSaveSlotId = slotId;
  refreshSaveSlots();
  addWorldLog(previousMeta ? `Game saved to ${meta.label}.` : `New save slot created: ${meta.label}.`);
  return true;
}

function loadGame(slotId = null) {
  const slots = refreshSaveSlots();
  const targetId = slotId || slots[0]?.id || null;
  if (!targetId) return false;
  const raw = localStorage.getItem(getSaveSlotStorageKey(targetId));
  if (!raw) {
    refreshSaveSlots();
    return false;
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return false;
  }
  if (!parsed || !parsed.game) return false;
  const slotMeta = slots.find((entry) => entry.id === targetId) || null;
  state.options = normalizeOptions({ ...state.options, ...(parsed.options || {}) });
  state.map = normalizeMapViewState({ ...state.map, ...(parsed.ui?.map || {}) });
  updateOptionsUi();
  applyAudioMixLevels();
  state.game = hydrateGame(parsed.game);
  state.debug.returnPosition = null;
  ensureQuestBoardDepth({ silent: true });
  state.activeSaveSlotId = targetId;
  state.combat = null;
  closeModal();
  renderWorld();
  showScreen("world");
  addWorldLog(`Loaded ${slotMeta?.label || "save slot"} from ${parsed.savedAt || "unknown time"}.`);
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
    playTimeMs: getCurrentGamePlayTimeMs(game),
    questCycle: Number.isFinite(game.questCycle) ? game.questCycle : 0,
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
      feature.talkCount = Number.isFinite(feature.talkCount) ? feature.talkCount : 0;
    } else if (feature.type === "transition") {
      feature.targetName = feature.targetName || "Unknown Gate";
    } else if (feature.type === "city" || feature.type === "town") {
      feature.hasShop = feature.hasShop !== false;
      feature.hasInn = feature.hasInn !== false;
      feature.shopTier = feature.shopTier || 1;
      feature.shopStock = (feature.shopStock || []).map((entry) => {
        if (entry?.kind === "equipment" && entry.item) {
          entry.item.modifiers = copyStats(entry.item.modifiers || {});
          normalizeWeaponItem(entry.item);
        }
        return entry;
      });
      feature.lastRestockStep = Number.isFinite(feature.lastRestockStep) ? feature.lastRestockStep : 0;
    } else if (feature.type === "crafting") {
      feature.skillFocus = SKILL_DEFS[feature.skillFocus]?.role === "Crafting" ? feature.skillFocus : "Smithing";
    } else if (feature.type === "resource") {
      normalizeResourceNode(feature);
      ensureResourceNodeRequiredLevel(
        feature,
        world.tiles?.[feature.y]?.[feature.x]?.biome || "plains",
        feature.id ? createRng(hashString(`${saved.seed}|resource-level|${feature.id}`)) : null,
      );
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
  if (world.debugArea && Number.isFinite(world.debugArea.x) && Number.isFinite(world.debugArea.y)) {
    world.debugArea = {
      ...createDebugCraftingAreaSpec(world.features || []),
      ...world.debugArea,
      id: DEBUG_CRAFTING_AREA_ID,
      name: DEBUG_CRAFTING_AREA_ID,
    };
  } else {
    ensureDebugCraftingArea(world);
  }
  world.featureLookup = buildFeatureLookup(world.features || []);
  world.majorCityById = {};
  (world.majorCities || []).forEach((city) => { world.majorCityById[city.id] = city; });
  const player = saved.player;
  player.baseStats = copyStats(player.baseStats);
  player.derivedStats = copyStats(player.derivedStats || player.baseStats);
  player.activeEffects = player.activeEffects || [];
  player.worldEffects = Array.isArray(player.worldEffects)
    ? player.worldEffects
      .filter((effect) => effect && Number.isFinite(effect.steps))
      .map((effect) => ({ ...effect, steps: Math.max(1, Math.floor(effect.steps || 1)) }))
    : [];
  player.gold = Number.isFinite(player.gold) ? player.gold : 0;
  player.unspentStatPoints = Number.isFinite(player.unspentStatPoints) ? player.unspentStatPoints : 0;
  player.skills = normalizeSkillState(player.skills);
  player.weaponMastery = normalizeWeaponMasteryState(player.weaponMastery, player.level);
  EQUIPMENT_SLOTS.forEach((slot) => {
    if (!player.equipment[slot]) return;
    player.equipment[slot].modifiers = copyStats(player.equipment[slot].modifiers || {});
    normalizeWeaponItem(player.equipment[slot]);
  });
  player.bag = player.bag
    .map((item) => {
      if (item.kind === "equipment") {
        item.modifiers = copyStats(item.modifiers || {});
        normalizeWeaponItem(item);
        return item;
      }
      if (item.kind === "tool") {
        return normalizeToolItem(item);
      }
      if (item.kind === "station") {
        return normalizeStationItem(item);
      }
      if (item.kind === "material") {
        const definition = MATERIAL_DEFS[item.id];
        if (!definition) return item;
        item.name = definition.name;
        item.description = definition.description;
        item.quantity = Math.max(1, Math.floor(item.quantity || 1));
        return item;
      }
      if (item.kind === "consumable") {
        const definition = CONSUMABLE_DEFS[item.id];
        if (!definition) return item;
        item.name = definition.name;
        item.description = definition.description;
        item.quantity = Math.max(1, Math.floor(item.quantity || 1));
        return item;
      }
      if (item.kind === "treasure") {
        const definition = TREASURE_DEFS[item.id];
        if (!definition) return item;
        item.name = definition.name;
        item.description = definition.description;
        item.quantity = Math.max(1, Math.floor(item.quantity || 1));
        return item;
      }
      return item;
    })
    .filter(Boolean);
  syncPlayerStyleToWeapon(player);
  recalculatePlayerStats(player, true);
  rebalanceWorldResourceNodes(world, player);
  return {
    seed: saved.seed,
    difficulty: saved.difficulty || "Normal",
    world,
    player,
    stepCount: saved.stepCount || 0,
    startingCityId: saved.startingCityId || MAJOR_CITIES[0].id,
    storyIndex: clamp(saved.storyIndex || 0, 0, (saved.storyline?.length || STORY_CHAPTERS.length) - 1),
    storyline: saved.storyline && saved.storyline.length ? saved.storyline : generateDynamicStoryline(world, saved.seed, world.majorCities?.[0] || MAJOR_CITIES[0]),
    quests: normalizeQuestList(
      saved.quests && saved.quests.length
        ? saved.quests
        : generateProceduralQuests(world, saved.seed, {
          game: {
            seed: saved.seed,
            world,
            player,
            meta: saved.meta || {},
            playTimeMs: saved.playTimeMs || 0,
          },
        }),
    ),
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
    playTimeMs: Math.max(0, Math.floor(saved.playTimeMs || 0)),
    sessionStartedAt: 0,
    questCycle: Number.isFinite(saved.questCycle) ? saved.questCycle : 0,
    runtimeRng: createRng(saved.runtimeRngState || hashString(`${saved.seed}|runtime`)),
  };
}

function usesFocusNavigation() {
  if (state.modal) return true;
  return ["menu", "load", "intro", "create", "options", "combat"].includes(state.screen);
}

function focusButtonByDataset(key, value) {
  if (!key || value == null) return;
  const index = state.focusables.findIndex((button) => button?.dataset?.[key] === value);
  if (index < 0) return;
  state.focusIndex = index;
  applyFocusStyles();
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
  if (state.screen === "options") return closeOptionsScreen();
  if (state.screen === "load") return showScreen("menu");
  if (state.screen === "intro" || state.screen === "create") return showScreen("menu");
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
    if (edge(8)) openOptionsScreen("world");
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

function rollConsumableDrop(rng, level = 1, isBoss = false) {
  return weightedPick(buildConsumableWeightTable(level, isBoss, false), rng, "id");
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
    return findConsumableStack(player, "prime_elixir")
      || findConsumableStack(player, "hero_feast")
      || findConsumableStack(player, "mega_potion")
      || findConsumableStack(player, "battle_broth")
      || findConsumableStack(player, "greater_potion")
      || findConsumableStack(player, "smoked_filet")
      || findConsumableStack(player, "minor_potion")
      || findConsumableStack(player, "smoke_bomb")
      || consumables[0];
  }
  if (hpDeficit > 90) {
    return findConsumableStack(player, "hero_feast")
      || findConsumableStack(player, "battle_broth")
      || findConsumableStack(player, "mega_potion")
      || findConsumableStack(player, "greater_potion")
      || consumables[0];
  }
  if (hpDeficit > 36) {
    return findConsumableStack(player, "battle_broth")
      || findConsumableStack(player, "greater_potion")
      || findConsumableStack(player, "smoked_filet")
      || findConsumableStack(player, "minor_potion")
      || findConsumableStack(player, "focus_tonic")
      || consumables[0];
  }
  if (findConsumableStack(player, "precision_elixir")) return findConsumableStack(player, "precision_elixir");
  if (findConsumableStack(player, "focus_tonic")) return findConsumableStack(player, "focus_tonic");
  if (findConsumableStack(player, "volatile_flask")) return findConsumableStack(player, "volatile_flask");
  if (findConsumableStack(player, "fire_bomb")) return findConsumableStack(player, "fire_bomb");
  return findConsumableStack(player, "trail_skewers") || findConsumableStack(player, "minor_potion") || consumables[0];
}

function applyPlayerEffect(player, effect) {
  const existing = player.activeEffects.find((entry) => entry.id === effect.id);
  if (existing) {
    existing.turns = Math.max(existing.turns, effect.turns);
    return;
  }
  player.activeEffects.push({ ...effect });
}

function applyWorldEffect(player, effect) {
  if (!player || !effect?.id || !Number.isFinite(effect.steps)) return;
  if (!Array.isArray(player.worldEffects)) player.worldEffects = [];
  const existing = player.worldEffects.find((entry) => entry.id === effect.id);
  if (existing) {
    existing.steps = Math.max(existing.steps, Math.floor(effect.steps));
    existing.name = effect.name || existing.name;
    existing.repel = effect.repel !== false;
    return;
  }
  player.worldEffects.push({
    id: effect.id,
    name: effect.name || effect.id,
    steps: Math.max(1, Math.floor(effect.steps)),
    repel: effect.repel !== false,
  });
}

function getActiveRepelEffect(player) {
  if (!player || !Array.isArray(player.worldEffects)) return null;
  return player.worldEffects
    .filter((effect) => effect?.repel && Number.isFinite(effect.steps) && effect.steps > 0)
    .sort((a, b) => b.steps - a.steps)[0] || null;
}

function tickWorldEffects(player) {
  if (!player || !Array.isArray(player.worldEffects) || !player.worldEffects.length) return [];
  const expired = [];
  player.worldEffects.forEach((effect) => {
    effect.steps -= 1;
    if (effect.steps <= 0) expired.push(effect);
  });
  player.worldEffects = player.worldEffects.filter((effect) => effect.steps > 0);
  return expired;
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

function findWeaponTemplateById(weaponId) {
  if (!weaponId) return null;
  for (const list of Object.values(WEAPON_LIBRARY)) {
    const found = list.find((entry) => entry.id === weaponId);
    if (found) return found;
  }
  return null;
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

function getWeaponFamilyKey(weapon, fallbackStyle = "Melee") {
  const style = weapon?.attackType || fallbackStyle || "Melee";
  if (weapon?.weaponFamily && WEAPON_FAMILY_DEFS[weapon.weaponFamily]) return weapon.weaponFamily;
  const template = weapon?.weaponTemplateId ? findWeaponTemplateById(weapon.weaponTemplateId) : weapon?.id ? findWeaponTemplateById(weapon.id) : null;
  if (template?.weaponFamily) return template.weaponFamily;

  const name = String(weapon?.name || "").toLowerCase();
  if (style === "Melee") {
    if (name.includes("dagger") || name.includes("stiletto")) return "dagger";
    if (name.includes("rapier") || name.includes("scimitar") || name.includes("sword") || name.includes("falchion") || name.includes("blade")) return "sword";
    if (name.includes("axe")) return "axe";
    if (name.includes("flail") || name.includes("morningstar")) return "flail";
    if (name.includes("glaive") || name.includes("halberd")) return "polearm";
    if (name.includes("spear") || name.includes("trident") || name.includes("pike") || weapon?.damageKind === "Pierce") {
      return weapon?.speed >= 8 && (weapon?.damageDie || 0) <= 5 ? "dagger" : "spear";
    }
    if (name.includes("staff")) return "quarterstaff";
    if (name.includes("hammer") || name.includes("mace") || name.includes("maul") || name.includes("club") || weapon?.damageKind === "Blunt") {
      return weapon?.speed >= 7 && (weapon?.damageDie || 0) <= 7 ? "quarterstaff" : "hammer";
    }
  }

  if (style === "Ranged") {
    if (name.includes("crossbow")) return "crossbow";
    if (name.includes("sling")) return "sling";
    if (name.includes("knife") || name.includes("chakram") || name.includes("javelin") || name.includes("dart") || name.includes("throw")) return "thrown";
    if (name.includes("bow")) return "bow";
    if (weapon?.damageKind === "Blunt") return "sling";
    if (weapon?.damageKind === "Slash") return "thrown";
    if ((weapon?.damageDie || 0) >= 10 || (weapon?.speed || 5) <= 4) return "crossbow";
    return "bow";
  }

  if (style === "Magic") {
    if (name.includes("wand")) return "wand";
    if (name.includes("staff")) return "magic_staff";
    if (name.includes("rod")) return "rod";
    if (name.includes("tome") || name.includes("grimoire") || name.includes("codex") || name.includes("book")) return "tome";
    if (name.includes("focus")) return "focus";
    if (name.includes("scepter")) return "scepter";
    if (name.includes("orb")) return "orb";
    if (weapon?.damageKind === "Lightning" || weapon?.damageKind === "Wind") return "focus";
    if (weapon?.damageKind === "Earth" || weapon?.damageKind === "Water") return (weapon?.damageDie || 0) >= 8 ? "scepter" : "tome";
    if (weapon?.damageKind === "Fire" || weapon?.damageKind === "Ice") return "rod";
    if ((weapon?.critBonus || 0) >= 3) return "orb";
    if ((weapon?.speed || 5) >= 8) return "wand";
    if ((weapon?.damageDie || 0) >= 8) return "magic_staff";
  }

  return DEFAULT_WEAPON_FAMILY_BY_STYLE[style] || DEFAULT_WEAPON_FAMILY_BY_STYLE.Melee;
}

function getWeaponFamilyDefinition(weaponOrFamily, fallbackStyle = "Melee") {
  const familyKey = typeof weaponOrFamily === "string"
    ? weaponOrFamily
    : getWeaponFamilyKey(weaponOrFamily, fallbackStyle);
  const fallbackKey = DEFAULT_WEAPON_FAMILY_BY_STYLE[fallbackStyle] || DEFAULT_WEAPON_FAMILY_BY_STYLE.Melee;
  return WEAPON_FAMILY_DEFS[familyKey] || WEAPON_FAMILY_DEFS[fallbackKey] || WEAPON_FAMILY_DEFS.sword;
}

function getWeaponDiscipline(weapon, fallbackStyle = "Melee") {
  return getWeaponFamilyDefinition(weapon, fallbackStyle).discipline || fallbackStyle;
}

function syncPlayerStyleToWeapon(player) {
  if (!player) return "Melee";
  const weaponStyle = player.equipment?.Weapon?.attackType;
  if (weaponStyle && ATTACK_TO_STATS[weaponStyle]) player.style = weaponStyle;
  if (!ATTACK_TO_STATS[player.style]) player.style = "Melee";
  return player.style;
}

function getWeaponAbilitySet(familyKey, fallbackStyle = "Melee") {
  const fallbackFamily = DEFAULT_WEAPON_FAMILY_BY_STYLE[fallbackStyle] || DEFAULT_WEAPON_FAMILY_BY_STYLE.Melee;
  return WEAPON_ABILITY_SETS[familyKey] || WEAPON_ABILITY_SETS[fallbackFamily] || WEAPON_ABILITY_SETS.sword;
}

function normalizeWeaponItem(item) {
  if (!item || item.slot !== "Weapon") return item;
  item.attackType = item.attackType || inferAttackTypeFromModifiers(item);
  item.damageDie = Number.isFinite(item.damageDie) ? Math.max(2, item.damageDie) : 4;
  item.damageKind = item.damageKind || defaultDamageKindForAttackType(item.attackType);
  item.speed = Number.isFinite(item.speed) ? clamp(Math.floor(item.speed), 1, 10) : 5;
  item.hitBonus = Number.isFinite(item.hitBonus) ? Math.floor(item.hitBonus) : 0;
  item.critBonus = Number.isFinite(item.critBonus) ? Math.floor(item.critBonus) : 0;
  item.weaponFamily = getWeaponFamilyKey(item, item.attackType);
  const template = item.weaponTemplateId ? findWeaponTemplateById(item.weaponTemplateId) : item.id ? findWeaponTemplateById(item.id) : null;
  if (!item.summary) {
    item.summary = template?.summary || `${getWeaponDiscipline(item, item.attackType)} weapon. ${getWeaponFamilyDefinition(item, item.attackType).strengths}`;
  }
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
  const family = getWeaponFamilyDefinition(weapon, weapon.attackType).name;
  return `${family} | 1d${weapon.damageDie} ${weapon.damageKind} SPD ${weapon.speed} HIT ${hitText} CRIT +${weapon.critBonus}`;
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
  if (els.worldDebug) {
    els.worldDebug.textContent = "Debug";
    els.worldDebug.classList.toggle("hidden", !state.options.debugMode);
  }
  if (els.worldCharacter) els.worldCharacter.textContent = prompts.character;
  if (els.worldShop) els.worldShop.textContent = prompts.shop;
  if (els.worldTalk) els.worldTalk.textContent = prompts.talk;
  if (els.worldSave) els.worldSave.textContent = prompts.save;
  if (els.worldOptions) els.worldOptions.textContent = prompts.options;
  if (els.worldMenu) els.worldMenu.textContent = prompts.menu;
  if (els.worldControlsHint) {
    const modeLabel = state.inputMode === "controller" ? "Controller detected" : "Keyboard detected";
    els.worldControlsHint.textContent = `${modeLabel}. ${prompts.hint}`;
  }
  if (els.worldShortcutsHint) {
    const shoulderHint = state.inputMode === "controller" ? " Use LB/RB to switch character tabs." : "";
    const autoHint = state.options.autoLevelUp ? " Auto-level is ON." : "";
    const debugHint = state.options.debugMode ? " Debug menu: button or Ctrl+Shift+D. Quick boosts: Ctrl+Shift+L/G/H/X." : "";
    const mapHint = ` Viewport ${state.map.fullscreen ? "expanded" : "standard"} at ${Math.round((state.map.zoom || 1) * 100)}% zoom.`;
    const layoutHint = ` HUD ${state.map.hudLayout === "stacked" ? "stacked" : "side"} layout. ${state.map.viewportMode === "native" ? `Native ${state.map.viewportOrientation}` : "Fit"} viewport mode.`;
    const quickLayoutHint = " Quick layout keys: [B] HUD layout, [X] viewport mode, [Z] orientation.";
    els.worldShortcutsHint.textContent = `Character menu includes Inventory, Equipment, Crafting, Skills, Mastery, Level Up, Quests, Bestiary, Story, Achievements, and journey stats. Inventory and crafting use tabs, and portable stations can open workshop-grade crafting anywhere. Open field crafting with [R]. Open options anytime with [N].${shoulderHint}${mapHint}${layoutHint}${quickLayoutHint}${autoHint}${debugHint}`;
  }
}

function normalizeMapViewState(mapState) {
  const next = { ...(mapState || {}) };
  next.fullscreen = !!next.fullscreen;
  const zoom = Number(next.zoom);
  next.zoom = clamp(Number.isFinite(zoom) ? zoom : DEFAULT_MAP_ZOOM, MAP_ZOOM_MIN, MAP_ZOOM_MAX);
  next.hudLayout = next.hudLayout === "stacked" ? "stacked" : "side";
  next.viewportMode = next.viewportMode === "native" ? "native" : "fit";
  next.viewportOrientation = next.viewportOrientation === "portrait" ? "portrait" : "landscape";
  return next;
}

function normalizeOptions(options) {
  const next = { ...(options || {}) };
  next.verboseCombatLog = next.verboseCombatLog !== false;
  next.gamepadEnabled = next.gamepadEnabled !== false;
  next.sfxEnabled = next.sfxEnabled !== false;
  next.musicEnabled = next.musicEnabled !== false;
  next.autoLevelUp = !!next.autoLevelUp;
  next.debugMode = !!next.debugMode;
  next.debugNoEncounters = !!next.debugNoEncounters;
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
  } else if (normalizedType === "gather-tree") {
    pulse(180, 0.11, 0.07, "square");
    pulse(130, 0.13, 0.05, "triangle", 0.04);
    noiseBurst(0.06, 0.018, 0.02, 850);
  } else if (normalizedType === "gather-herb") {
    pulse(610, 0.08, 0.045, "triangle");
    pulse(760, 0.1, 0.03, "sine", 0.04);
    noiseBurst(0.05, 0.015, 0.01, 1600);
  } else if (normalizedType === "gather-ore") {
    pulse(310, 0.07, 0.06, "square");
    pulse(920, 0.12, 0.045, "triangle", 0.03);
    pulse(1180, 0.1, 0.03, "sine", 0.08);
  } else if (normalizedType === "gather-crystal") {
    pulse(420, 0.08, 0.05, "sine");
    pulse(960, 0.14, 0.04, "triangle", 0.03);
    pulse(1380, 0.12, 0.03, "sine", 0.08);
  } else if (normalizedType === "gather-hide") {
    pulse(210, 0.1, 0.055, "triangle");
    pulse(280, 0.08, 0.038, "square", 0.05);
    noiseBurst(0.04, 0.012, 0.02, 1100);
  } else if (normalizedType === "gather-fishing") {
    pulse(440, 0.05, 0.04, "sine");
    pulse(210, 0.14, 0.045, "triangle", 0.05);
    noiseBurst(0.07, 0.02, 0.03, 320);
  } else if (normalizedType === "gather-tidepool") {
    pulse(360, 0.07, 0.04, "sine");
    pulse(540, 0.08, 0.035, "triangle", 0.05);
    noiseBurst(0.08, 0.02, 0.025, 420);
  } else if (normalizedType === "gather-miss") {
    pulse(120, 0.08, 0.03, "square");
    noiseBurst(0.05, 0.012, 0.01, 720);
  } else if (normalizedType === "gather-good") {
    pulse(520, 0.06, 0.03, "triangle");
    pulse(660, 0.05, 0.02, "sine", 0.03);
  } else if (normalizedType === "gather-great") {
    pulse(640, 0.07, 0.04, "triangle");
    pulse(860, 0.08, 0.03, "sine", 0.04);
  } else if (normalizedType === "gather-perfect") {
    pulse(720, 0.09, 0.055, "sine");
    pulse(980, 0.1, 0.05, "triangle", 0.05);
    pulse(1240, 0.12, 0.04, "sine", 0.11);
  } else if (normalizedType === "craft-smithing") {
    pulse(230, 0.08, 0.065, "square");
    pulse(870, 0.12, 0.05, "triangle", 0.04);
    noiseBurst(0.05, 0.018, 0.01, 1300);
  } else if (normalizedType === "craft-woodworking") {
    pulse(170, 0.11, 0.06, "triangle");
    pulse(240, 0.09, 0.04, "square", 0.05);
    noiseBurst(0.05, 0.012, 0.03, 950);
  } else if (normalizedType === "craft-cooking") {
    pulse(340, 0.1, 0.04, "sine");
    pulse(430, 0.1, 0.04, "triangle", 0.06);
    noiseBurst(0.06, 0.012, 0.02, 500);
  } else if (normalizedType === "craft-leatherworking") {
    pulse(210, 0.09, 0.05, "triangle");
    pulse(330, 0.08, 0.035, "square", 0.05);
    noiseBurst(0.04, 0.01, 0.03, 1450);
  } else if (normalizedType === "craft-clothier") {
    pulse(560, 0.1, 0.04, "sine");
    pulse(780, 0.12, 0.035, "triangle", 0.05);
    noiseBurst(0.04, 0.01, 0.03, 1700);
  } else if (normalizedType === "craft-alchemy") {
    pulse(460, 0.12, 0.045, "sine");
    pulse(690, 0.11, 0.04, "triangle", 0.07);
    pulse(910, 0.14, 0.03, "sine", 0.14);
  } else if (normalizedType === "craft-jewelcrafting") {
    pulse(620, 0.08, 0.04, "sine");
    pulse(930, 0.11, 0.038, "triangle", 0.04);
    pulse(1280, 0.12, 0.03, "sine", 0.1);
  } else if (normalizedType === "craft-finish") {
    pulse(660, 0.08, 0.035, "sine");
    pulse(880, 0.1, 0.03, "triangle", 0.04);
  } else if (normalizedType === "craft-crafting" || normalizedType === "craft-generic") {
    pulse(500, 0.1, 0.045, "triangle");
    pulse(660, 0.1, 0.04, "sine", 0.06);
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
