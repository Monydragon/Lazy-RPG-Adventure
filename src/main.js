const STORAGE_KEY = "lazy-rpg-adventure-save-v1";
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
  hide: { zoneWidth: 0.95, speed: 1.04, prompt: "Cut where the hide opens easiest." },
  fishing: { zoneWidth: 1, speed: 1.02, prompt: "Set the hook on the strongest bite." },
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
  hearty_stew: 34,
  anglers_stew: 56,
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
  greater_potion: { id: "greater_potion", name: "Greater Potion", description: "Recover 56 Health.", heal: 56, rarity: "Uncommon" },
  mega_potion: { id: "mega_potion", name: "Mega Potion", description: "Recover 120 Health.", heal: 120, rarity: "Rare" },
  smoke_bomb: { id: "smoke_bomb", name: "Smoke Bomb", description: "Escape from battle instantly.", flee: true, rarity: "Uncommon" },
  fire_bomb: { id: "fire_bomb", name: "Fire Bomb", description: "Deal 40 + 1d12 fire damage.", damage: 40, die: 12, rarity: "Rare" },
  focus_tonic: { id: "focus_tonic", name: "Focus Tonic", description: "Gain +8 Critical Chance for 3 turns.", critBuff: 8, buffTurns: 3, rarity: "Rare" },
  hearty_stew: { id: "hearty_stew", name: "Hearty Stew", description: "Recover 42 Health.", heal: 42, rarity: "Uncommon" },
  anglers_stew: { id: "anglers_stew", name: "Angler's Stew", description: "Recover 72 Health.", heal: 72, rarity: "Rare" },
};

const MATERIAL_DEFS = {
  slime_gel: { id: "slime_gel", name: "Slime Gel", description: "Sticky material from basic monsters." },
  iron_scrap: { id: "iron_scrap", name: "Iron Scrap", description: "Useful for improvised upgrades." },
  arcane_dust: { id: "arcane_dust", name: "Arcane Dust", description: "Shimmering residue from magic foes." },
  beast_fang: { id: "beast_fang", name: "Beast Fang", description: "Sharp and probably still warm." },
  hardwood_log: { id: "hardwood_log", name: "Hardwood Log", description: "Strong timber from old growth trees." },
  fiber_bundle: { id: "fiber_bundle", name: "Fiber Bundle", description: "Plant fibers useful for bindings and cloth wraps." },
  herb_bundle: { id: "herb_bundle", name: "Herb Bundle", description: "Fresh medicinal herbs for cooking and alchemy." },
  iron_ore: { id: "iron_ore", name: "Iron Ore", description: "Raw ore ready for smelting and smithing." },
  beast_hide: { id: "beast_hide", name: "Beast Hide", description: "Tanned hide suited for practical armor." },
  fresh_fish: { id: "fresh_fish", name: "Fresh Fish", description: "A fresh catch that can be cooked into restorative food." },
  river_scale: { id: "river_scale", name: "River Scale", description: "A gleaming scale used in alchemy and trade." },
};

const SKILL_CAP_LEVEL = 100;
const SKILL_DEFS = {
  Botany: { role: "Gathering", summary: "Harvest herbs and logs from natural nodes." },
  Mining: { role: "Gathering", summary: "Extract ore and mineral components." },
  Fishing: { role: "Gathering", summary: "Catch fish from fishing spots. Minigame-ready hooks are included." },
  Crafting: { role: "Crafting", summary: "Overall crafting mastery earned whenever you complete any recipe." },
  Clothier: { role: "Crafting", summary: "Tailor wraps, robes, and travelwear from fibers and arcane cloth." },
  Smithing: { role: "Crafting", summary: "Forge weapons and metal armor." },
  Woodworking: { role: "Crafting", summary: "Craft bows, staves, and wood gear." },
  Cooking: { role: "Crafting", summary: "Cook restorative meals." },
  Leatherworking: { role: "Crafting", summary: "Process hides into protective gear." },
  Alchemy: { role: "Crafting", summary: "Brew potions, tonics, and utility mixtures." },
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
      { id: "arcane_dust", chance: 0.12, min: 1, max: 1 },
    ],
  },
  hide: {
    label: "Hunting Grounds",
    actionLabel: "Collect Hides",
    skill: "Leatherworking",
    xpMin: 8,
    xpMax: 14,
    minCharges: 2,
    maxCharges: 3,
    respawnSteps: 22,
    placementBiomes: ["plains", "forest", "swamp"],
    drops: [
      { id: "beast_hide", chance: 1, min: 1, max: 2 },
      { id: "beast_fang", chance: 0.4, min: 1, max: 1 },
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
};

const CRAFTING_RECIPES = [
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
];

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

const CHARACTER_MODAL_TABS = ["character", "inventory", "equipment", "skills", "mastery", "levelup", "quests", "bestiary", "story", "achievements"];

const els = {
  app: document.getElementById("app"),
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
  worldSkills: document.getElementById("world-skills"),
  worldHudLayout: document.getElementById("world-hud-layout"),
  worldInteract: document.getElementById("world-interact"),
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
  gathering: null,
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
  addWorldLog("Explore towns, dungeons, NPC camps, chests, and resource nodes. Use Interact on special locations.");
  addWorldLog("Gather from trees, ore veins, hide grounds, and fishing spots. Craft in towns and cities.");
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

function showScreen(screen) {
  state.screen = screen;
  if (els.app) els.app.dataset.screen = screen;
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

function renderWorld() {
  if (!state.game) return;
  setMapFullscreen(state.map.fullscreen);
  updateMapUi();
  renderPlayerPanel();
  renderWorldLog();
  renderWorldSkillsPanel();
  renderWorldContext();
  drawMap();
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
  const gatheringPreview = `Bot ${skills.Botany.level} | Min ${skills.Mining.level} | Fish ${skills.Fishing.level}`;
  const craftingPreview = `Craft ${skills.Crafting.level} | Cloth ${skills.Clothier.level} | Smith ${skills.Smithing.level}`;
  const difficulty = getDifficulty();
  els.playerSummary.innerHTML = `
    <p><strong>${escapeHtml(player.name)}</strong> (${escapeHtml(discipline)})</p>
    <p>Difficulty ${state.game.difficulty}</p>
    <p>${escapeHtml(difficulty.deathRule || "")}</p>
    <p>Level ${player.level} | XP ${player.xp}/${nextXp}</p>
    <p>HP ${player.currentHealth}/${player.derivedStats.Health}</p>
    <p>Unspent Stat Points ${player.unspentStatPoints || 0}</p>
    <p>Gold ${player.gold}</p>
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
    } else if (feature.type === "resource") {
      const def = getResourceNodeDef(feature.resourceKind);
      const status = getResourceNodeStatus(feature, state.game.stepCount);
      if (status.ready) {
        const passText = `${status.charges} timing pass${status.charges === 1 ? "" : "es"}`;
        els.worldContext.textContent = `${biomeLabel} - ${feature.name} (${def.label}). ${status.charges}/${status.maxCharges} resources ready (${passText}). Press Interact to ${def.actionLabel.toLowerCase()}. Encounter chance: ${encounterChance.toFixed(1)}% | Threat ${threat}`;
      } else {
        els.worldContext.textContent = `${biomeLabel} - ${feature.name} (${def.label}). Depleted, respawns in ${status.stepsRemaining} step${status.stepsRemaining === 1 ? "" : "s"}. Encounter chance: ${encounterChance.toFixed(1)}% | Threat ${threat}`;
      }
    } else if (feature.type === "city" || feature.type === "town") {
      const shopText = feature.hasShop ? "Shop available." : "No shop.";
      const innText = feature.hasInn ? "Inn available." : "No inn services.";
      els.worldContext.textContent = `${biomeLabel} - ${feature.name} (${feature.type}). Safe zone. ${shopText} ${innText} Crafting available. Press Shop, Character, or Interact.`;
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
    els.mapLegend.textContent = `Map icons: City, Town, Dungeon, Chest, NPC, Boss, resources (tree/herb/ore/hide/fish), Shop badge ($), Inn badge (I). Zoom ${zoomText}. ${viewportText} viewport with ${layoutText}.`;
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
    } else if (feature.resourceKind === "hide") {
      ctx.fillStyle = "#5c4934";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#d5b48a";
      ctx.beginPath();
      ctx.arc(size * 0.5, size * 0.58, size * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(size * 0.36, size * 0.38, size * 0.08, 0, Math.PI * 2);
      ctx.arc(size * 0.5, size * 0.32, size * 0.08, 0, Math.PI * 2);
      ctx.arc(size * 0.64, size * 0.38, size * 0.08, 0, Math.PI * 2);
      ctx.fill();
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
    }
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
  if (feature.type === "resource") {
    const status = getResourceNodeStatus(feature, state.game?.stepCount || 0);
    if (status.ready) {
      drawFeatureBadge(sx, sy, tileSize, `${status.charges}`, "#2a6739", "bottom-right");
    } else {
      drawFeatureBadge(sx, sy, tileSize, "X", "#6d2b2b", "bottom-right");
    }
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
  if (feature?.type === "resource") {
    const def = getResourceNodeDef(feature.resourceKind);
    const status = getResourceNodeStatus(feature, state.game.stepCount);
    if (status.ready) addWorldLog(`${feature.name} is ready with ${status.charges} pull${status.charges === 1 ? "" : "s"}. Press Interact to ${def.actionLabel.toLowerCase()}.`);
    else addWorldLog(`${feature.name} is depleted. It will recover in ${status.stepsRemaining} step${status.stepsRemaining === 1 ? "" : "s"}.`);
  }
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
  if (feature?.type === "resource") {
    const def = getResourceNodeDef(feature.resourceKind);
    const status = getResourceNodeStatus(feature, state.game.stepCount);
    if (status.ready) {
      addWorldLog(`${feature.name}: ${def.label} in the ${BIOME_DATA[tile.biome].label}. ${status.charges}/${status.maxCharges} resources ready (${status.charges} timing pass${status.charges === 1 ? "" : "es"}).`);
    } else {
      addWorldLog(`${feature.name}: ${def.label} in the ${BIOME_DATA[tile.biome].label}. Respawns in ${status.stepsRemaining} step${status.stepsRemaining === 1 ? "" : "s"}.`);
    }
  } else if (feature) addWorldLog(`${feature.name}: a ${feature.type} in the ${BIOME_DATA[tile.biome].label}.`);
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
    actions.push({
      id: "gather-resource",
      label: status.ready ? def.actionLabel : `${def.actionLabel} (Depleted)`,
      description: status.ready
        ? `${feature.name} | ${def.skill} Lv ${(getPlayerSkillEntry(state.game?.player, def.skill)?.level || 1)} | ${status.charges} pass${status.charges === 1 ? "" : "es"}`
        : `Respawns in ${status.stepsRemaining} step${status.stepsRemaining === 1 ? "" : "s"}`,
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
    if (!activeFeature || (activeFeature.type !== "city" && activeFeature.type !== "town")) return addWorldLog("Crafting stations are available in towns and cities.");
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
  if (!feature || (feature.type !== "city" && feature.type !== "town")) {
    addWorldLog("Crafting is available in towns and cities.");
    return;
  }
  executeWorldInteractionAction("open-crafting", feature);
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
  const chosenTemplate = slot === "Weapon" ? rng.pick(getWeaponsForStyle(attackType)) : null;
  const tierBonus = Math.floor((tier - 1) / 3);
  const damageKind = slot === "Weapon" ? chosenTemplate.damageKind : null;
  const damageDie = slot === "Weapon" ? Math.max(3, chosenTemplate.damageDie + tierBonus) : 0;
  const speed = slot === "Weapon" ? clamp(chosenTemplate.speed + rng.int(-1, 1), 2, 10) : 0;
  const hitBonus = slot === "Weapon" ? Math.floor((chosenTemplate.hitBonus || 0) + rng.int(0, 2)) : 0;
  const critBonus = slot === "Weapon" ? Math.floor((chosenTemplate.critBonus || 0) + Math.floor(rarityScale - 1) + rng.int(0, 2)) : 0;
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
    levelReq: (tier - 1) * 10 + 1,
    name: slot === "Weapon"
      ? `${rarity} ${prefixes[clamp(tier - 1, 0, prefixes.length - 1)]} ${chosenTemplate.name} (${TIER_NAMES[tier - 1]})`
      : `${rarity} ${prefixes[clamp(tier - 1, 0, prefixes.length - 1)]} ${slotLabel} (${TIER_NAMES[tier - 1]})`,
    summary: slot === "Weapon" ? chosenTemplate.summary || "" : "",
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
  }
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
  els.modalClose.textContent = "Close";
  els.modalClose.disabled = false;

  if (state.modal === "character") {
    els.modalTitle.textContent = "Character Menu";
    const chapter = getCurrentStoryChapter();
    const skills = ensurePlayerSkills(player);
    const masteryState = ensurePlayerWeaponMastery(player);
    const gatheringLevel = SKILL_ORDER
      .filter((name) => SKILL_DEFS[name].role === "Gathering")
      .reduce((sum, name) => sum + (skills[name]?.level || 1), 0);
    const craftingLevel = SKILL_ORDER
      .filter((name) => SKILL_DEFS[name].role === "Crafting")
      .reduce((sum, name) => sum + (skills[name]?.level || 1), 0);
    const totalWeaponMastery = Object.values(masteryState).reduce((sum, entry) => sum + (entry.points || 0), 0);
    const trainedWeaponClasses = Object.values(masteryState).filter((entry) => (entry.points || 0) > 0).length;
    const detailsRows = [
      `Level ${player.level} | XP ${player.xp}/${xpToNextLevel(player.level)}`,
      `Gold ${player.gold} | HP ${player.currentHealth}/${player.derivedStats.Health}`,
      `Battles Won ${state.game.meta.wins} | Losses ${state.game.meta.losses}`,
      `Enemies Defeated ${state.game.meta.enemiesDefeated} | Bosses ${state.game.meta.bossesDefeated}`,
      `Quests Completed ${state.game.meta.questsCompleted} | NPC Talks ${state.game.meta.npcsTalked}`,
      `Chests Opened ${state.game.meta.chestsOpened} | Transitions ${state.game.meta.transitionsUsed}`,
      `Tiles Discovered ${state.game.meta.tilesDiscovered} | Gold Found ${state.game.meta.totalGoldFound}`,
      `Gathering Skill Total ${gatheringLevel} | Crafting Skill Total ${craftingLevel}`,
      `Weapon Mastery Total ${totalWeaponMastery} | Trained Classes ${trainedWeaponClasses}`,
      `Current Chapter: ${chapter.title}`,
    ].map((line) => `<li>${escapeHtml(line)}</li>`).join("");
    els.modalContent.innerHTML = `
      <div class="button-row">
        <button class="focusable" data-modal-action="open-character-section" data-target="inventory">Inventory</button>
        <button class="focusable" data-modal-action="open-character-section" data-target="equipment">Equipment</button>
        <button class="focusable" data-modal-action="open-character-section" data-target="skills">Skills</button>
        <button class="focusable" data-modal-action="open-character-section" data-target="mastery">Mastery</button>
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
    els.modalContent.innerHTML = `
      <p>Gathering total level: ${gatheringTotal} | Crafting total level: ${craftingTotal}</p>
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
        const strikeLabel = gathering.resourceKind === "fishing" ? "Set Hook" : "Lock Timing";
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
  } else if (state.modal === "crafting") {
    const craftingFeature = state.modalData?.feature;
    const locationLabel = craftingFeature?.name || "Field Kit";
    els.modalTitle.textContent = `${locationLabel} Crafting`;
    const recipeRows = CRAFTING_RECIPES.map((recipe) => {
      const check = evaluateCraftingRecipe(player, recipe);
      const costText = recipe.costs
        .map((cost) => {
          const owned = getMaterialCount(player, cost.id);
          const def = MATERIAL_DEFS[cost.id];
          return `${owned}/${cost.qty} ${def ? def.name : cost.id}`;
        })
        .join(", ");
      const outputText = describeCraftingRecipeOutput(recipe);
      const disabled = check.ok ? "" : "disabled";
      return `
        <div class="item-row">
          <div>
            <strong>${escapeHtml(recipe.name)} (${escapeHtml(recipe.skill)} Lv ${recipe.minLevel})</strong>
            <p>${escapeHtml(recipe.description)}</p>
            <p>Cost: ${escapeHtml(costText)}</p>
            <p>Output: ${escapeHtml(outputText)} | ${check.ok ? "Ready" : escapeHtml(check.reason)}</p>
          </div>
          <button class="focusable" data-modal-action="craft-recipe" data-recipe-id="${recipe.id}" ${disabled}>Craft</button>
        </div>
      `;
    }).join("");
    const skillSummary = SKILL_ORDER
      .filter((skillName) => SKILL_DEFS[skillName].role === "Crafting")
      .map((skillName) => `${skillName} Lv ${getPlayerSkillEntry(player, skillName)?.level || 1}`)
      .join(" | ");
    els.modalContent.innerHTML = `
      <p>${escapeHtml(skillSummary)}</p>
      <div class="modal-list">${recipeRows}</div>
    `;
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
  if (state.modal === "gathering") {
    if (state.gathering?.completed) {
      state.focusIndex = Math.max(0, state.focusables.length - 1);
      applyFocusStyles();
    } else {
      focusButtonByDataset("modalAction", "gathering-stop");
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

  if (action === "gathering-stop") {
    resolveGatheringTimingInput();
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
    craftRecipeById(recipeId);
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
  if (feature.resourceKind === "fishing") {
    return resolveFishingAttempt({
      featureId: feature.id,
      minigameId: feature.fishingState?.minigameId || def.minigameId || "fishing_basic_v1",
      useMinigame: false,
      skillLevel,
    }, rng, efficiency);
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

  if (feature.resourceKind === "fishing") {
    const fishBonus = Math.max(1, Math.round(roundsCleared * baseBonusFactor));
    drops.push({ id: "fresh_fish", quantity: fishBonus });
    const scaleChance = clamp(0.18 + averageScore * 0.16 + greatOrBetterCount * 0.08 + skillFactor * 0.0018, 0.18, 0.92);
    if (rng.next() < scaleChance) {
      drops.push({ id: "river_scale", quantity: 1 + (perfectCount >= 2 ? 1 : 0) });
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
  if (!status.ready) {
    addWorldLog(`${feature.name} is depleted. Respawns in ${status.stepsRemaining} step${status.stepsRemaining === 1 ? "" : "s"}.`);
    return;
  }
  const skillLevel = getPlayerSkillEntry(player, def.skill)?.level || 1;
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

function evaluateCraftingRecipe(player, recipe) {
  if (!player || !recipe) return { ok: false, reason: "Recipe unavailable." };
  const skillLevel = getPlayerSkillEntry(player, recipe.skill)?.level || 1;
  if (skillLevel < recipe.minLevel) {
    return { ok: false, reason: `Requires ${recipe.skill} Lv ${recipe.minLevel}.` };
  }
  for (const cost of recipe.costs || []) {
    if (getMaterialCount(player, cost.id) < cost.qty) {
      const matDef = MATERIAL_DEFS[cost.id];
      return { ok: false, reason: `Missing ${matDef ? matDef.name : cost.id}.` };
    }
  }
  return { ok: true, reason: "Ready." };
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

function createCraftedEquipmentFromRecipe(recipe, player) {
  const template = recipe?.output?.equipment;
  if (!template) return null;
  const skillLevel = getPlayerSkillEntry(player, recipe.skill)?.level || 1;
  const qualityTier = clamp(1 + Math.floor(skillLevel / 12), 1, 10);
  let rarity = "Common";
  if (skillLevel >= 70) rarity = "Legendary";
  else if (skillLevel >= 55) rarity = "Epic";
  else if (skillLevel >= 40) rarity = "Rare";
  else if (skillLevel >= 25) rarity = "Uncommon";
  const statBonus = Math.floor(skillLevel / 30);
  const modifiers = createZeroStats();
  Object.entries(template.modifiers || {}).forEach(([stat, value]) => {
    if (!ALL_STATS.includes(stat)) return;
    modifiers[stat] = Math.max(0, Math.floor(value + statBonus));
  });
  const levelReq = clamp((template.levelReqBase || 1) + Math.floor(skillLevel / 18), 1, MAX_LEVEL);
  const item = {
    uid: createItemUid(),
    kind: "equipment",
    slot: template.slot || "Accessory1",
    name: template.name || "Crafted Gear",
    levelReq,
    tier: qualityTier,
    rarity,
    modifiers,
  };
  if (item.slot === "Weapon") {
    item.attackType = template.attackType || inferAttackTypeFromModifiers({ modifiers });
    item.weaponTemplateId = template.id || null;
    item.weaponFamily = getWeaponFamilyKey(template, item.attackType);
    item.damageDie = Math.max(3, Math.floor((template.damageDie || 6) + Math.floor(skillLevel / 40)));
    item.damageKind = template.damageKind || defaultDamageKindForAttackType(item.attackType);
    item.speed = clamp(Math.floor(template.speed || 6), 1, 10);
    item.hitBonus = Math.floor(template.hitBonus || 0);
    item.critBonus = Math.floor((template.critBonus || 0) + Math.floor(skillLevel / 50));
    item.summary = template.summary || "";
    const key = `${item.attackType}Attack`;
    if (ALL_STATS.includes(key)) modifiers[key] = Math.max(1, modifiers[key] || 1);
    normalizeWeaponItem(item);
  }
  return item;
}

function craftRecipeById(recipeId) {
  if (!state.game || !recipeId) return;
  const player = state.game.player;
  const recipe = CRAFTING_RECIPES.find((entry) => entry.id === recipeId);
  if (!recipe) return;
  const check = evaluateCraftingRecipe(player, recipe);
  if (!check.ok) {
    addWorldLog(check.reason);
    return;
  }
  const output = recipe.output || {};
  let craftedName = describeCraftingRecipeOutput(recipe);
  let craftedItem = null;

  if (output.kind === "consumable") {
    craftedName = `${output.quantity || 1}x ${CONSUMABLE_DEFS[output.id]?.name || output.id}`;
  } else if (output.kind === "equipment") {
    craftedItem = createCraftedEquipmentFromRecipe(recipe, player);
    if (!craftedItem) {
      addWorldLog("Crafting failed: invalid recipe output.");
      return;
    }
    craftedName = craftedItem.name;
  } else if (output.kind === "material") {
    const matDef = MATERIAL_DEFS[output.id];
    if (!matDef) {
      addWorldLog("Crafting failed: unknown material output.");
      return;
    }
    craftedName = `${output.quantity || 1}x ${matDef.name}`;
  } else {
    addWorldLog("Crafting failed: unsupported output.");
    return;
  }

  (recipe.costs || []).forEach((cost) => consumeMaterialFromBag(player, cost.id, cost.qty));
  if (output.kind === "consumable") {
    addConsumableToBag(player, output.id, output.quantity || 1);
  } else if (output.kind === "equipment" && craftedItem) {
    addItemToBag(player, craftedItem);
  } else if (output.kind === "material") {
    addStackableLoot(player, "material", MATERIAL_DEFS[output.id], output.quantity || 1);
  }

  const recipeXp = recipe.xp || 12;
  const skillGain = gainSkillXp(player, recipe.skill, recipeXp, recipe.name);
  const craftingGain = recipe.skill === "Crafting"
    ? null
    : gainSkillXp(player, "Crafting", Math.max(1, Math.floor(recipeXp * 0.75)), recipe.name);
  state.game.stepCount += 1;
  addWorldLog(`Crafted ${craftedName} using ${recipe.name}.`);
  logSkillXpProgress(player, recipe.skill, skillGain);
  logSkillXpProgress(player, "Crafting", craftingGain);
  playSfx(getCraftingSfxType(recipe.skill));
  playSfx("craft-finish");
  maybeTriggerDynamicWorldEvent(state.modalData?.feature || null);
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
  return Math.max(1, Math.floor(ability?.mastery ?? ability?.level ?? 1));
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

function normalizeResourceNode(feature) {
  if (!feature || feature.type !== "resource") return;
  feature.resourceKind = RESOURCE_NODE_DEFS[feature.resourceKind] ? feature.resourceKind : "tree";
  const def = getResourceNodeDef(feature.resourceKind);
  feature.name = feature.name || def.label;
  feature.skill = SKILL_DEFS[feature.skill] ? feature.skill : def.skill;
  const minCharges = Math.max(1, def.minCharges || 1);
  const maxCharges = Math.max(minCharges, def.maxCharges || minCharges);
  feature.maxCharges = clamp(Math.floor(feature.maxCharges || maxCharges), minCharges, Math.max(12, maxCharges));
  feature.charges = clamp(Math.floor(feature.charges ?? feature.maxCharges), 0, feature.maxCharges);
  feature.respawnSteps = Math.max(6, Math.floor(feature.respawnSteps || def.respawnSteps || 18));
  feature.depletedUntil = Math.max(0, Math.floor(feature.depletedUntil || 0));
  if (feature.resourceKind === "fishing") {
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
    { kind: "herb", count: rng.int(20, 32), minDistance: 2 },
    { kind: "ore", count: rng.int(20, 30), minDistance: 2 },
    { kind: "hide", count: rng.int(18, 28), minDistance: 2 },
    { kind: "fishing", count: rng.int(18, 28), minDistance: 2 },
  ];
  plans.forEach((plan) => {
    const def = getResourceNodeDef(plan.kind);
    for (let i = 0; i < plan.count; i += 1) {
      const spot = findPlacementForBiomes(rng, occupied, tiles, def.placementBiomes || [], plan.minDistance || 2);
      const charges = rng.int(def.minCharges || 1, def.maxCharges || 1);
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
      };
      if (plan.kind === "fishing") {
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

  addResourceNodesToWorld(rng, tiles, features, occupied);

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

function openCraftingMenu(feature = null) {
  if (!state.game) return;
  const activeFeature = feature || getFeatureAt(state.game.world, state.game.player.position.x, state.game.player.position.y);
  if (!activeFeature || (activeFeature.type !== "city" && activeFeature.type !== "town")) {
    addWorldLog("Crafting stations are available in towns and cities.");
    return;
  }
  state.modal = "crafting";
  state.modalData = { feature: activeFeature };
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
    ui: { map: state.map },
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
  state.map = normalizeMapViewState({ ...state.map, ...(parsed.ui?.map || {}) });
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
      feature.shopStock = (feature.shopStock || []).map((entry) => {
        if (entry?.kind === "equipment" && entry.item) {
          entry.item.modifiers = copyStats(entry.item.modifiers || {});
          normalizeWeaponItem(entry.item);
        }
        return entry;
      });
      feature.lastRestockStep = Number.isFinite(feature.lastRestockStep) ? feature.lastRestockStep : 0;
    } else if (feature.type === "resource") {
      normalizeResourceNode(feature);
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
  player.skills = normalizeSkillState(player.skills);
  player.weaponMastery = normalizeWeaponMasteryState(player.weaponMastery, player.level);
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
  syncPlayerStyleToWeapon(player);
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
    const debugHint = state.options.debugMode ? " Debug hotkeys: Ctrl+Shift+L/G/H/X." : "";
    const mapHint = ` Viewport ${state.map.fullscreen ? "expanded" : "standard"} at ${Math.round((state.map.zoom || 1) * 100)}% zoom.`;
    const layoutHint = ` HUD ${state.map.hudLayout === "stacked" ? "stacked" : "side"} layout. ${state.map.viewportMode === "native" ? `Native ${state.map.viewportOrientation}` : "Fit"} viewport mode.`;
    const quickLayoutHint = " Quick layout keys: [B] HUD layout, [X] viewport mode, [Z] orientation.";
    els.worldShortcutsHint.textContent = `Character menu includes Inventory, Equipment, Skills, Mastery, Level Up, Quests, Bestiary, Story, Achievements, and journey stats. Craft in towns/cities via Interact or [R]. Open options anytime with [N].${shoulderHint}${mapHint}${layoutHint}${quickLayoutHint}${autoHint}${debugHint}`;
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
  } else if (normalizedType === "gather-hide") {
    pulse(210, 0.1, 0.055, "triangle");
    pulse(280, 0.08, 0.038, "square", 0.05);
    noiseBurst(0.04, 0.012, 0.02, 1100);
  } else if (normalizedType === "gather-fishing") {
    pulse(440, 0.05, 0.04, "sine");
    pulse(210, 0.14, 0.045, "triangle", 0.05);
    noiseBurst(0.07, 0.02, 0.03, 320);
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
