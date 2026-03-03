const STORAGE_KEY = "lazy-rpg-adventure-save-v1";
const MAX_LEVEL = 100;
const MAP_WIDTH = 80;
const MAP_HEIGHT = 60;
const TILE_SIZE = 24;
const VIEW_TILES_X = 28;
const VIEW_TILES_Y = 18;
const WORLD_LOG_LIMIT = 16;
const COMBAT_LOG_LIMIT = 16;

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

const INTRO_PAGES = [
  "In a world desperate for heroes, destiny chose with confidence. Then destiny tripped over paperwork.",
  "This is the tale of a person of ordinary talent and extraordinary bad timing.",
  "Armed with optimism, poor decisions, and suspiciously pointy equipment, they march toward glory.",
  "Historians will remember this journey. Mostly because nobody else agreed to do it.",
];

const COMBAT_STYLES = {
  Melee: {
    baseStats: {
      Health: 42,
      MeleeAttack: 8,
      MeleeDefense: 7,
      RangedAttack: 4,
      RangedDefense: 5,
      MagicAttack: 2,
      MagicDefense: 4,
      CriticalChance: 10,
      Luck: 6,
    },
    starterWeapon: { name: "Rusty Broadsword", slot: "Weapon", attackType: "Melee", damageDie: 8 },
  },
  Ranged: {
    baseStats: {
      Health: 36,
      MeleeAttack: 4,
      MeleeDefense: 4,
      RangedAttack: 8,
      RangedDefense: 7,
      MagicAttack: 3,
      MagicDefense: 4,
      CriticalChance: 14,
      Luck: 8,
    },
    starterWeapon: { name: "Crooked Longbow", slot: "Weapon", attackType: "Ranged", damageDie: 8 },
  },
  Magic: {
    baseStats: {
      Health: 32,
      MeleeAttack: 3,
      MeleeDefense: 3,
      RangedAttack: 4,
      RangedDefense: 4,
      MagicAttack: 9,
      MagicDefense: 8,
      CriticalChance: 9,
      Luck: 10,
    },
    starterWeapon: { name: "Apprentice Wand", slot: "Weapon", attackType: "Magic", damageDie: 4 },
  },
};

const ENEMY_POOLS = {
  road: [
    { name: "Toll Bandit", attackType: "Melee", damageDie: 6, crit: 7 },
    { name: "Aggressive Goose", attackType: "Ranged", damageDie: 4, crit: 10 },
    { name: "Accountant of Doom", attackType: "Magic", damageDie: 6, crit: 8 },
  ],
  plains: [
    { name: "Lazy Slime", attackType: "Melee", damageDie: 6, crit: 6 },
    { name: "Horned Rabbit", attackType: "Ranged", damageDie: 6, crit: 9 },
    { name: "Wandering Squire", attackType: "Melee", damageDie: 8, crit: 7 },
  ],
  forest: [
    { name: "Moss Goblin", attackType: "Melee", damageDie: 8, crit: 8 },
    { name: "Twig Archer", attackType: "Ranged", damageDie: 8, crit: 10 },
    { name: "Mushroom Hexer", attackType: "Magic", damageDie: 8, crit: 9 },
  ],
  swamp: [
    { name: "Bog Lurker", attackType: "Melee", damageDie: 10, crit: 8 },
    { name: "Leech Sniper", attackType: "Ranged", damageDie: 8, crit: 11 },
    { name: "Mud Oracle", attackType: "Magic", damageDie: 10, crit: 9 },
  ],
  badlands: [
    { name: "Dust Marauder", attackType: "Melee", damageDie: 10, crit: 9 },
    { name: "Scorpion Ballista", attackType: "Ranged", damageDie: 10, crit: 12 },
    { name: "Ash Warlock", attackType: "Magic", damageDie: 12, crit: 10 },
  ],
};

const ELEMENTAL_SKILLS = [
  { level: 1, name: "Air Strike", die: 6 },
  { level: 5, name: "Water Strike", die: 8 },
  { level: 9, name: "Earth Strike", die: 10 },
  { level: 13, name: "Fire Strike", die: 12 },
];

const DIFFICULTY_PRESETS = {
  Easy: {
    enemyHp: 0.82,
    enemyAttack: 0.84,
    enemyDefense: 0.88,
    playerDamage: 1.12,
    xp: 1.2,
    loot: 1.2,
    bossBoost: 1.55,
  },
  Normal: {
    enemyHp: 1,
    enemyAttack: 1,
    enemyDefense: 1,
    playerDamage: 1,
    xp: 1,
    loot: 1,
    bossBoost: 1.75,
  },
  Hard: {
    enemyHp: 1.2,
    enemyAttack: 1.18,
    enemyDefense: 1.12,
    playerDamage: 0.94,
    xp: 1.12,
    loot: 1.15,
    bossBoost: 1.95,
  },
  Legendary: {
    enemyHp: 1.42,
    enemyAttack: 1.35,
    enemyDefense: 1.2,
    playerDamage: 0.88,
    xp: 1.25,
    loot: 1.3,
    bossBoost: 2.2,
  },
};

const WEAPON_ABILITY_SETS = {
  Melee: [
    { level: 1, name: "Sweeping Slash", damageDice: [6], hitBonus: 1, attackScale: 0.62, defenseScale: 0.28, critBonus: 2 },
    { level: 5, name: "Shieldbreaker", damageDice: [8], hitBonus: 2, attackScale: 0.68, defenseScale: 0.2, critBonus: 3 },
    { level: 12, name: "Earthsplitter", damageDice: [10, 4], hitBonus: 2, attackScale: 0.72, defenseScale: 0.15, critBonus: 5 },
  ],
  Ranged: [
    { level: 1, name: "Quick Volley", damageDice: [4, 4], hitBonus: 3, attackScale: 0.55, defenseScale: 0.26, critBonus: 6 },
    { level: 5, name: "Piercing Shot", damageDice: [8], hitBonus: 4, attackScale: 0.58, defenseScale: 0.2, critBonus: 10 },
    { level: 12, name: "Rain of Arrows", damageDice: [6, 6], hitBonus: 4, attackScale: 0.62, defenseScale: 0.18, critBonus: 12 },
  ],
  Magic: [
    { level: 1, name: "Air Strike", damageDice: [6], hitBonus: 2, attackScale: 0.62, defenseScale: 0.25, critBonus: 2 },
    { level: 5, name: "Water Strike", damageDice: [8], hitBonus: 2, attackScale: 0.66, defenseScale: 0.2, critBonus: 3 },
    { level: 9, name: "Earth Strike", damageDice: [10], hitBonus: 2, attackScale: 0.68, defenseScale: 0.2, critBonus: 4 },
    { level: 13, name: "Fire Strike", damageDice: [12], hitBonus: 3, attackScale: 0.72, defenseScale: 0.15, critBonus: 5 },
    { level: 20, name: "Elemental Burst", damageDice: [10, 8], hitBonus: 3, attackScale: 0.75, defenseScale: 0.12, critBonus: 8 },
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
  ],
  town: [
    "A villager points at a dungeon and says, 'Please go bother that instead of us.'",
    "A blacksmith offers advice: 'Hit first, apologize later.'",
    "A child asks if your sword can cut homework in half.",
  ],
  wild: [
    "A traveling cleric blesses your backpack and leaves before questions.",
    "A ranger warns: 'If the bushes hiss, run.'",
    "A wandering cook hands you stew and refuses to explain what was in it.",
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
  cityButtons: document.getElementById("city-buttons"),
  difficultyButtons: document.getElementById("difficulty-buttons"),
  seedInput: document.getElementById("seed-input"),
  seedRandom: document.getElementById("seed-random"),
  createStart: document.getElementById("create-start"),
  createBack: document.getElementById("create-back"),
  optionCombatLog: document.getElementById("option-combat-log"),
  optionControllerVibe: document.getElementById("option-controller-vibe"),
  optionSfx: document.getElementById("option-sfx"),
  optionMusic: document.getElementById("option-music"),
  optionsBack: document.getElementById("options-back"),
  mapCanvas: document.getElementById("map-canvas"),
  playerSummary: document.getElementById("player-summary"),
  playerStats: document.getElementById("player-stats"),
  worldContext: document.getElementById("world-context"),
  worldLog: document.getElementById("world-log"),
  worldInventory: document.getElementById("world-inventory"),
  worldEquipment: document.getElementById("world-equipment"),
  worldTalk: document.getElementById("world-talk"),
  worldStory: document.getElementById("world-story"),
  worldAchievements: document.getElementById("world-achievements"),
  worldSave: document.getElementById("world-save"),
  worldMenu: document.getElementById("world-menu"),
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
  creation: { name: "Sir Placeholder", style: "Melee", cityId: MAJOR_CITIES[0].id, difficulty: "Normal", seed: randomSeed() },
  options: { verboseCombatLog: true, gamepadEnabled: true, sfxEnabled: true, musicEnabled: true },
  game: null,
  combat: null,
  modal: null,
  modalData: null,
  focusables: [],
  focusIndex: 0,
  gamepad: { previousButtons: [], axisXReadyAt: 0, axisYReadyAt: 0 },
  audio: {
    context: null,
    master: null,
    music: null,
    started: false,
    intervalId: null,
  },
};

initialize();

function initialize() {
  bindEvents();
  renderCreationSelectors();
  renderIntro();
  els.seedInput.value = state.creation.seed;
  showScreen("menu");
  requestAnimationFrame(gamepadLoop);
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
  });
  els.optionMusic.addEventListener("change", () => {
    state.options.musicEnabled = !!els.optionMusic.checked;
    if (state.options.musicEnabled) startMusicLoop();
    else stopMusicLoop();
  });

  els.worldInventory.addEventListener("click", () => openModal("inventory"));
  els.worldEquipment.addEventListener("click", () => openModal("equipment"));
  els.worldTalk.addEventListener("click", talkToNpc);
  els.worldStory.addEventListener("click", () => openModal("story"));
  els.worldAchievements.addEventListener("click", () => openModal("achievements"));
  els.worldSave.addEventListener("click", saveGame);
  els.worldMenu.addEventListener("click", () => showScreen("menu"));

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
}

function onKeyDown(event) {
  ensureAudioStarted();
  const key = event.key;
  const lower = key.toLowerCase();

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

  let moved = false;
  if (key === "ArrowUp" || lower === "w") moved = movePlayer(0, -1);
  if (key === "ArrowDown" || lower === "s") moved = movePlayer(0, 1);
  if (key === "ArrowLeft" || lower === "a") moved = movePlayer(-1, 0);
  if (key === "ArrowRight" || lower === "d") moved = movePlayer(1, 0);

  if (moved) {
    event.preventDefault();
    return;
  }

  if (lower === "i") {
    openModal("inventory");
    event.preventDefault();
  } else if (lower === "e") {
    openModal("equipment");
    event.preventDefault();
  } else if (lower === "t") {
    talkToNpc();
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
    showScreen("menu");
    event.preventDefault();
  } else if (key === "Enter") {
    describeCurrentTile();
    event.preventDefault();
  }
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
    els.optionCombatLog.checked = state.options.verboseCombatLog;
    els.optionControllerVibe.checked = state.options.gamepadEnabled;
    els.optionSfx.checked = state.options.sfxEnabled;
    els.optionMusic.checked = state.options.musicEnabled;
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
  els.nameInput.value = state.creation.name;
  els.seedInput.value = state.creation.seed;

  els.styleButtons.innerHTML = Object.keys(COMBAT_STYLES)
    .map((style) => {
      const selected = state.creation.style === style ? "selected" : "";
      return `<button class="focusable ${selected}" data-style="${style}">${style}</button>`;
    })
    .join("");

  els.cityButtons.innerHTML = MAJOR_CITIES.map((city) => {
    const selected = state.creation.cityId === city.id ? "selected" : "";
    return `<button class="focusable ${selected}" data-city-id="${city.id}">${city.name}</button>`;
  }).join("");

  els.difficultyButtons.innerHTML = Object.keys(DIFFICULTY_PRESETS).map((difficulty) => {
    const selected = state.creation.difficulty === difficulty ? "selected" : "";
    return `<button class="focusable ${selected}" data-difficulty="${difficulty}">${difficulty}</button>`;
  }).join("");

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

  const world = generateWorld(state.creation.seed);
  const spawnCity = world.majorCityById[state.creation.cityId] || world.majorCities[0];
  const player = createPlayer(state.creation.name, state.creation.style);
  player.position.x = spawnCity.x;
  player.position.y = spawnCity.y;
  revealAround(world, player.position.x, player.position.y, 2);

  state.game = {
    seed: state.creation.seed,
    difficulty: state.creation.difficulty,
    world,
    player,
    stepCount: 0,
    startingCityId: spawnCity.id,
    storyIndex: 0,
    worldLog: [],
    achievements: [],
    meta: {
      wins: 0,
      losses: 0,
      bossesDefeated: 0,
      npcsTalked: 0,
      potionsUsed: 0,
      tilesDiscovered: countDiscoveredTiles(world),
      totalGoldFound: 0,
    },
    runtimeRng: createRng(hashString(`${state.creation.seed}|runtime`)),
  };

  addStartingItems(player);
  recalculatePlayerStats(player, true);
  player.currentHealth = player.derivedStats.Health;
  addWorldLog(`Welcome, ${player.name}. ${spawnCity.name} pretends this is a normal day.`);
  addWorldLog(`Difficulty: ${state.game.difficulty}. Enemies scale to your level.`);
  addWorldLog("Leave a city to trigger encounters. Use the map to find dungeons and loot.");
  renderWorld();
  showScreen("world");
  if (state.options.musicEnabled) startMusicLoop();
}

function createPlayer(name, style) {
  const styleData = COMBAT_STYLES[style];
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
  };
  player.equipment.Weapon = createStarterWeapon(styleData.starterWeapon);
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
  if (screen === "world") renderWorld();
  if (screen === "combat") renderCombat();
  updateFocusables();
}

function addMenuMessage(message) {
  if (!els.menuMessage) return;
  els.menuMessage.textContent = message;
}

function renderWorld() {
  if (!state.game) return;
  renderPlayerPanel();
  renderWorldLog();
  renderWorldContext();
  drawMap();
}

function renderPlayerPanel() {
  const { player } = state.game;
  const nextXp = xpToNextLevel(player.level);
  els.playerSummary.innerHTML = `
    <p><strong>${escapeHtml(player.name)}</strong> (${player.style})</p>
    <p>Difficulty ${state.game.difficulty}</p>
    <p>Level ${player.level} | XP ${player.xp}/${nextXp}</p>
    <p>HP ${player.currentHealth}/${player.derivedStats.Health}</p>
    <p>Gold ${player.gold}</p>
    <p>${STORY_CHAPTERS[state.game.storyIndex].title}</p>
    <p>Position ${player.position.x}, ${player.position.y}</p>
    <p>Seed <code>${escapeHtml(state.game.seed)}</code></p>
  `;
  const statRows = ALL_STATS.map((stat) => `<span>${stat}</span><strong>${player.derivedStats[stat]}</strong>`).join("");
  els.playerStats.innerHTML = `<div class="stat-grid">${statRows}</div>`;
}

function renderWorldLog() {
  const lines = state.game.worldLog.slice(-WORLD_LOG_LIMIT);
  els.worldLog.innerHTML = lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("");
}

function renderWorldContext() {
  const { world, player } = state.game;
  const tile = world.tiles[player.position.y][player.position.x];
  const feature = getFeatureAt(world, player.position.x, player.position.y);
  const biomeLabel = BIOME_DATA[tile.biome].label;
  const encounterChance = feature && (feature.type === "city" || feature.type === "town")
    ? 0
    : getEncounterChancePercent(tile.biome, player.level);
  if (feature) {
    if (feature.type === "dungeon") {
      const bossState = feature.bossDefeated ? "Boss Defeated" : `Boss: ${feature.bossName}`;
      els.worldContext.textContent = `${biomeLabel} - ${feature.name} (${feature.type}). ${bossState}. Encounter chance: ${encounterChance.toFixed(1)}%`;
    } else {
      els.worldContext.textContent = `${biomeLabel} - ${feature.name} (${feature.type}). Encounter chance: ${encounterChance.toFixed(1)}%`;
    }
  } else {
    els.worldContext.textContent = `${biomeLabel}. Encounter chance: ${encounterChance.toFixed(1)}%`;
  }
}

function drawMap() {
  if (!state.game) return;
  const { world, player } = state.game;
  const cameraX = clamp(player.position.x - Math.floor(VIEW_TILES_X / 2), 0, world.width - VIEW_TILES_X);
  const cameraY = clamp(player.position.y - Math.floor(VIEW_TILES_Y / 2), 0, world.height - VIEW_TILES_Y);
  ctx.clearRect(0, 0, els.mapCanvas.width, els.mapCanvas.height);

  for (let sy = 0; sy < VIEW_TILES_Y; sy += 1) {
    for (let sx = 0; sx < VIEW_TILES_X; sx += 1) {
      const wx = cameraX + sx;
      const wy = cameraY + sy;
      const tile = world.tiles[wy][wx];
      const discovered = world.discovered[wy][wx];
      const px = sx * TILE_SIZE;
      const py = sy * TILE_SIZE;
      ctx.fillStyle = discovered ? BIOME_DATA[tile.biome].color : "#0a0d12";
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = "rgba(0,0,0,0.22)";
      ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
    }
  }

  world.features.forEach((feature) => {
    if (feature.x < cameraX || feature.y < cameraY || feature.x >= cameraX + VIEW_TILES_X || feature.y >= cameraY + VIEW_TILES_Y) return;
    if (!world.discovered[feature.y][feature.x]) return;
    drawFeatureSymbol(feature, (feature.x - cameraX) * TILE_SIZE, (feature.y - cameraY) * TILE_SIZE);
  });

  const px = (player.position.x - cameraX) * TILE_SIZE;
  const py = (player.position.y - cameraY) * TILE_SIZE;
  ctx.fillStyle = "#f4f7ff";
  ctx.beginPath();
  ctx.moveTo(px + TILE_SIZE / 2, py + 3);
  ctx.lineTo(px + 3, py + TILE_SIZE - 3);
  ctx.lineTo(px + TILE_SIZE - 3, py + TILE_SIZE - 3);
  ctx.closePath();
  ctx.fill();
}

function drawFeatureSymbol(feature, sx, sy) {
  const cx = sx + TILE_SIZE / 2;
  const cy = sy + TILE_SIZE / 2;
  const radius = TILE_SIZE * 0.34;
  if (feature.type === "city") {
    ctx.fillStyle = "#4aa3ff";
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    return;
  }
  if (feature.type === "town") {
    ctx.fillStyle = "#50cf7b";
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  if (feature.type === "dungeon") {
    ctx.fillStyle = "#e1655a";
    ctx.beginPath();
    ctx.moveTo(cx, cy - radius);
    ctx.lineTo(cx + radius, cy);
    ctx.lineTo(cx, cy + radius);
    ctx.lineTo(cx - radius, cy);
    ctx.closePath();
    ctx.fill();
  }
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
  if (feature?.type === "dungeon") addWorldLog(`You stand at ${feature.name}. It smells like treasure and regret.`);
  if (!maybeTriggerDungeonBoss(feature)) {
    tryTriggerEncounter(feature);
  }
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

function tryTriggerEncounter(feature) {
  if (!state.game) return;
  const { world, player, runtimeRng } = state.game;
  const tile = world.tiles[player.position.y][player.position.x];
  const safeZone = feature && (feature.type === "city" || feature.type === "town");
  if (safeZone) return;
  let chance = getEncounterChancePercent(tile.biome, player.level);
  if (feature?.type === "dungeon") chance += 6;
  if (state.game.difficulty === "Easy") chance -= 1;
  if (state.game.difficulty === "Legendary") chance += 2;
  chance = clamp(chance, 2, 35);
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
  return clamp(BIOME_DATA[biome].baseEncounter + level * 0.15, 2, 35);
}

function startCombat(enemy, biome) {
  state.combat = {
    enemy,
    biome,
    phase: "player",
    log: [`A ${enemy.isBoss ? "BOSS " : ""}${enemy.name} (Lv ${enemy.level}) appears from the ${BIOME_DATA[biome].label}!`],
    result: null,
    playerDefending: false,
    turn: 1,
  };
  addWorldLog(`Encounter: ${enemy.name} ambushes you.`);
  playSfx(enemy.isBoss ? "boss" : "encounter");
  showScreen("combat");
}

function renderCombat() {
  if (!state.combat || !state.game) return;
  const { player } = state.game;
  const { enemy } = state.combat;
  const effectText = player.activeEffects.length
    ? player.activeEffects.map((effect) => `${effect.name} (${effect.turns}t)`).join(", ")
    : "None";
  els.combatTitle.textContent = `Combat - ${enemy.name}${enemy.isBoss ? " [Boss]" : ""}`;
  els.combatPlayer.innerHTML = `
    <p><strong>${escapeHtml(player.name)}</strong> (Lv ${player.level})</p>
    <p>HP ${player.currentHealth}/${player.derivedStats.Health}</p>
    <p>Difficulty ${state.game.difficulty}</p>
    <p>Effects ${escapeHtml(effectText)}</p>
    <p>Style ${player.style}</p>
    <p>Weapon ${escapeHtml(player.equipment.Weapon ? player.equipment.Weapon.name : "None")}</p>
  `;
  els.combatEnemy.innerHTML = `
    <p><strong>${escapeHtml(enemy.name)}</strong> (Lv ${enemy.level})</p>
    <p>HP ${enemy.currentHealth}/${enemy.stats.Health}</p>
    <p>Attack ${enemy.attackType}</p>
    <p>Damage 1d${enemy.damageDie}</p>
    <p>Type ${enemy.isBoss ? "Boss" : "Normal"}</p>
  `;

  const lines = state.combat.log.slice(-COMBAT_LOG_LIMIT);
  els.combatLog.innerHTML = lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("");
  els.combatLog.scrollTop = els.combatLog.scrollHeight;

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
  if (action === "skill") return resolvePlayerAttack({ kind: "skill" });
  if (action === "item") return useCombatItem();
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

function resolvePlayerAttack({ kind }) {
  const player = state.game.player;
  const enemy = state.combat.enemy;
  const difficulty = getDifficulty();
  const profile = getPlayerAttackProfile(kind);
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

  enemy.currentHealth = clamp(enemy.currentHealth - damage, 0, enemy.stats.Health);
  if (state.options.verboseCombatLog) {
    pushCombatLog(`${profile.label} hits for ${damage}. [hit ${hitRoll}/${target}, crit ${critRoll}<=${critThreshold}${critical ? " YES" : ""}]`);
  } else {
    pushCombatLog(`${profile.label} hits for ${damage}${critical ? " (critical)" : ""}.`);
  }
  playSfx(critical ? "crit" : "hit");
  if (enemy.currentHealth <= 0) finalizeCombat("won");
  else queueEnemyTurn();
}

function getPlayerAttackProfile(kind) {
  const player = state.game.player;
  const weapon = player.equipment.Weapon;
  const attackType = getActiveAttackStyle(player);
  const weaponDie = weapon ? weapon.damageDie : 4;
  if (kind === "attack") {
    return {
      label: "Attack",
      attackType,
      damageDice: [weaponDie],
      hitBonus: Math.floor(player.derivedStats.Luck / 6),
      attackScale: 0.55,
      defenseScale: 0.35,
      critBonus: 0,
    };
  }
  const abilities = getUnlockedAbilitiesForStyle(player, attackType);
  const chosen = abilities[abilities.length - 1];
  const abilityDice = [...chosen.damageDice];
  abilityDice[0] = Math.max(abilityDice[0], weaponDie);
  return {
    label: chosen.name,
    attackType,
    damageDice: abilityDice,
    hitBonus: chosen.hitBonus,
    attackScale: chosen.attackScale,
    defenseScale: chosen.defenseScale,
    critBonus: chosen.critBonus,
  };
}

function getBestSpellForLevel(level) {
  let spell = ELEMENTAL_SKILLS[0];
  for (const candidate of ELEMENTAL_SKILLS) {
    if (level >= candidate.level) spell = candidate;
  }
  return spell;
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

function useCombatItem() {
  const player = state.game.player;
  const deficit = player.derivedStats.Health - player.currentHealth;
  const chosen = chooseBestCombatConsumable(player, deficit);
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
  const difficulty = getDifficulty();
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
  damage += Math.floor(attackValue * 0.5 * difficulty.enemyAttack);
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
    const xpGain = Math.floor((20 + enemy.level * 8 + (enemy.isBoss ? 90 : 0)) * getDifficulty().xp);
    gainXp(state.game.player, xpGain);
    addWorldLog(`Victory over ${enemy.name}. Gained ${xpGain} XP.`);
    pushCombatLog(`Victory. You gain ${xpGain} XP.`);
    state.game.meta.wins += 1;
    if (enemy.isBoss) {
      state.game.meta.bossesDefeated += 1;
      markBossDefeated(enemy.featureId);
      advanceStoryIfNeeded("boss");
      addWorldLog(`Boss defeated: ${enemy.name}.`);
      playSfx("bossWin");
    } else {
      playSfx("victory");
    }
    maybeDropLoot(enemy);
  } else if (result === "fled") {
    addWorldLog("You escaped combat.");
    pushCombatLog("You fled from battle.");
    playSfx("flee");
  } else if (result === "lost") {
    const player = state.game.player;
    const spawn = state.game.world.majorCityById[state.game.startingCityId] || state.game.world.majorCities[0];
    player.position.x = spawn.x;
    player.position.y = spawn.y;
    player.currentHealth = Math.floor(player.derivedStats.Health * 0.7);
    addWorldLog(`Defeat. You wake up in ${spawn.name} with bruised pride.`);
    pushCombatLog("Defeat. You are dragged back to a city.");
    state.game.meta.losses += 1;
    playSfx("defeat");
  }
  checkAchievements();
  renderCombat();
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
  const item = {
    uid: createItemUid(),
    kind: "equipment",
    slot,
    attackType: slot === "Weapon" ? rng.pick(["Melee", "Ranged", "Magic"]) : null,
    damageDie: slot === "Weapon" ? rng.pick([4, 6, 8, 10, 12]) : 0,
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
  return item;
}

function endCombatAndReturnToWorld() {
  if (!state.combat || !state.combat.result) return;
  state.combat = null;
  showScreen("world");
}

function gainXp(player, amount) {
  player.xp += amount;
  let leveled = false;
  while (player.level < MAX_LEVEL) {
    const need = xpToNextLevel(player.level);
    if (player.xp < need) break;
    player.xp -= need;
    levelUp(player);
    leveled = true;
  }
  if (leveled) {
    recalculatePlayerStats(player, true);
    player.currentHealth = player.derivedStats.Health;
    addWorldLog(`Level up. ${player.name} is now level ${player.level}.`);
    advanceStoryIfNeeded("level");
    checkAchievements();
  }
}

function levelUp(player) {
  player.level += 1;
  player.baseStats.Health += 4;
  player.baseStats.CriticalChance += 0.2;
  player.baseStats.Luck += 0.2;
  if (player.style === "Melee") {
    player.baseStats.MeleeAttack += 1;
    player.baseStats.MeleeDefense += 1;
  } else if (player.style === "Ranged") {
    player.baseStats.RangedAttack += 1;
    player.baseStats.RangedDefense += 1;
    player.baseStats.CriticalChance += 0.4;
  } else {
    player.baseStats.MagicAttack += 1;
    player.baseStats.MagicDefense += 1;
    player.baseStats.Luck += 0.4;
  }
}

function xpToNextLevel(level) {
  return 80 + level * 22;
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

function renderModal() {
  if (!state.modal || !state.game) return;
  const player = state.game.player;

  if (state.modal === "inventory") {
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
              <p>${escapeHtml(item.rarity || "Common")} | ${escapeHtml(item.slot)} | ${summarizeModifiers(item.modifiers)}${item.slot === "Weapon" ? ` | 1d${item.damageDie} ${item.attackType}` : ""}</p>
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
            <p>${escapeHtml(item.rarity || "Common")} | ${escapeHtml(item.name)} | ${summarizeModifiers(item.modifiers)}${slot === "Weapon" ? ` | 1d${item.damageDie} ${item.attackType}` : ""}</p>
          </div>
          <button class="focusable" data-modal-action="unequip-slot" data-slot="${slot}">Unequip</button>
        </div>
      `;
    }).join("");
    els.modalContent.innerHTML = `<h4>Equipped Gear</h4><div class="modal-list">${equippedRows}</div>`;
  } else if (state.modal === "story") {
    els.modalTitle.textContent = "Story Journal";
    const current = STORY_CHAPTERS[state.game.storyIndex];
    els.modalContent.innerHTML = `
      <div class="item-row">
        <div>
          <strong>${escapeHtml(current.title)}</strong>
          <p>${escapeHtml(current.text)}</p>
        </div>
      </div>
      <p>Bosses defeated: ${state.game.meta.bossesDefeated}</p>
      <p>NPC talks: ${state.game.meta.npcsTalked}</p>
    `;
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
  } else if (state.modal === "npc") {
    els.modalTitle.textContent = "Town Gossip";
    const data = state.modalData || { text: "Nobody is around." };
    const rewardText = data.reward ? `<p><strong>Reward:</strong> ${escapeHtml(data.reward)}</p>` : "";
    els.modalContent.innerHTML = `<p>${escapeHtml(data.text)}</p>${rewardText}`;
  }

  updateFocusables();
}

function onModalAction(event) {
  const button = event.target.closest("button[data-modal-action]");
  if (!button || !state.game) return;
  const player = state.game.player;
  const action = button.dataset.modalAction;

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
  const modifiers = createZeroStats();
  if (template.attackType === "Melee") {
    modifiers.MeleeAttack = 2;
    modifiers.MeleeDefense = 1;
  } else if (template.attackType === "Ranged") {
    modifiers.RangedAttack = 2;
    modifiers.RangedDefense = 1;
    modifiers.CriticalChance = 1;
  } else {
    modifiers.MagicAttack = 2;
    modifiers.MagicDefense = 1;
    modifiers.Luck = 1;
  }
  return {
    uid: createItemUid(),
    kind: "equipment",
    slot: template.slot,
    attackType: template.attackType,
    damageDie: template.damageDie,
    tier: 1,
    rarity: "Common",
    levelReq: 1,
    name: template.name,
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

  MAJOR_CITIES.forEach((city) => {
    const spot = findPlacementSpot(rng, occupied, tiles);
    const entry = { ...city, type: "city", x: spot.x, y: spot.y };
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
    features.push({ id: `town_${i}`, name: townName, type: "town", x: spot.x, y: spot.y });
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

function talkToNpc() {
  if (!state.game || state.combat) return;
  const { world, player, runtimeRng } = state.game;
  const feature = getFeatureAt(world, player.position.x, player.position.y);
  const zone = feature?.type === "city" ? "city" : feature?.type === "town" ? "town" : "wild";
  const text = runtimeRng.pick(NPC_DIALOG[zone]);

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
  state.modal = "npc";
  state.modalData = {
    text,
    reward: rewardLine || "No reward this time.",
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

function generateEnemy(biome, playerLevel, rng, options = {}) {
  const template = rng.pick(ENEMY_POOLS[biome] || ENEMY_POOLS.plains);
  const difficulty = getDifficulty();
  const level = clamp(playerLevel, 1, MAX_LEVEL);
  const base = 8 + level;
  const bossMult = options.boss ? difficulty.bossBoost : 1;
  const stats = createZeroStats();
  stats.Health = Math.floor((16 + level * 4 + rng.int(0, 8)) * difficulty.enemyHp * bossMult);
  stats.MeleeAttack = Math.floor(base * difficulty.enemyAttack * bossMult);
  stats.MeleeDefense = Math.floor(base * difficulty.enemyDefense * bossMult);
  stats.RangedAttack = Math.floor(base * difficulty.enemyAttack * bossMult);
  stats.RangedDefense = Math.floor(base * difficulty.enemyDefense * bossMult);
  stats.MagicAttack = Math.floor(base * difficulty.enemyAttack * bossMult);
  stats.MagicDefense = Math.floor(base * difficulty.enemyDefense * bossMult);
  stats.CriticalChance = Math.floor((template.crit + Math.floor(level / 12)) * (options.boss ? 1.15 : 1));
  stats.Luck = 4 + Math.floor(level / 10);
  if (template.attackType === "Melee") stats.MeleeAttack += Math.floor(level * 0.7);
  if (template.attackType === "Ranged") stats.RangedAttack += Math.floor(level * 0.7);
  if (template.attackType === "Magic") stats.MagicAttack += Math.floor(level * 0.7);
  return {
    name: options.name || template.name,
    level,
    attackType: template.attackType,
    damageDie: template.damageDie,
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
  state.options = { ...state.options, ...(parsed.options || {}) };
  els.optionCombatLog.checked = state.options.verboseCombatLog;
  els.optionControllerVibe.checked = state.options.gamepadEnabled;
  els.optionSfx.checked = state.options.sfxEnabled;
  els.optionMusic.checked = state.options.musicEnabled;
  state.game = hydrateGame(parsed.game);
  state.combat = null;
  closeModal();
  renderWorld();
  showScreen("world");
  addWorldLog(`Loaded save from ${parsed.savedAt || "unknown time"}.`);
  checkAchievements();
  if (state.options.musicEnabled) startMusicLoop();
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
    worldLog: game.worldLog,
    achievements: game.achievements,
    meta: game.meta,
    runtimeRngState: game.runtimeRng.getState(),
  };
}

function hydrateGame(saved) {
  const world = saved.world;
  (world.features || []).forEach((feature, index) => {
    if (feature.type === "dungeon") {
      feature.bossName = feature.bossName || BOSS_TITLES[index % BOSS_TITLES.length];
      feature.bossDefeated = !!feature.bossDefeated;
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
  EQUIPMENT_SLOTS.forEach((slot) => {
    if (player.equipment[slot]) player.equipment[slot].modifiers = copyStats(player.equipment[slot].modifiers || {});
  });
  player.bag.forEach((item) => {
    if (item.kind === "equipment") item.modifiers = copyStats(item.modifiers || {});
  });
  recalculatePlayerStats(player, true);
  return {
    seed: saved.seed,
    difficulty: saved.difficulty || "Normal",
    world,
    player,
    stepCount: saved.stepCount || 0,
    startingCityId: saved.startingCityId || MAJOR_CITIES[0].id,
    storyIndex: saved.storyIndex || 0,
    worldLog: saved.worldLog || [],
    achievements: saved.achievements || [],
    meta: {
      wins: saved.meta?.wins || 0,
      losses: saved.meta?.losses || 0,
      bossesDefeated: saved.meta?.bossesDefeated || 0,
      npcsTalked: saved.meta?.npcsTalked || 0,
      potionsUsed: saved.meta?.potionsUsed || 0,
      tilesDiscovered: saved.meta?.tilesDiscovered || countDiscoveredTiles(world),
      totalGoldFound: saved.meta?.totalGoldFound || 0,
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
  if (state.screen === "world") showScreen("menu");
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

  if (!state.audio.started && pressed.some(Boolean)) ensureAudioStarted();

  if (usesFocusNavigation()) {
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
    if (edge(3)) openModal("inventory");
    if (edge(2)) openModal("equipment");
    if (edge(4)) openModal("story");
    if (edge(5)) openModal("achievements");
    if (edge(0)) talkToNpc();
    if (edge(9)) saveGame();
    if (edge(1)) showScreen("menu");
  }
  state.gamepad.previousButtons = pressed;
}

function getDifficulty() {
  const key = state.game?.difficulty || state.creation.difficulty || "Normal";
  return DIFFICULTY_PRESETS[key] || DIFFICULTY_PRESETS.Normal;
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
  let target = game.storyIndex;
  if (reason === "talk" && game.meta.npcsTalked >= 2) target = Math.max(target, 1);
  if (reason === "boss" && game.meta.bossesDefeated >= 1) target = Math.max(target, 2);
  if ((reason === "boss" || reason === "level") && game.meta.bossesDefeated >= 3) target = Math.max(target, 3);
  if ((reason === "boss" || reason === "level") && game.meta.bossesDefeated >= 5 && game.player.level >= 18) target = Math.max(target, 4);
  if (target !== game.storyIndex) {
    game.storyIndex = target;
    addWorldLog(`Story advanced: ${STORY_CHAPTERS[game.storyIndex].title}.`);
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

function ensureAudioStarted() {
  if (state.audio.started) return;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return;
  const context = new AudioCtor();
  const master = context.createGain();
  master.gain.value = 0.18;
  master.connect(context.destination);
  state.audio.context = context;
  state.audio.master = master;
  state.audio.started = true;
  if (state.options.musicEnabled) startMusicLoop();
}

function playSfx(type) {
  if (!state.options.sfxEnabled || !state.audio.started || !state.audio.context || !state.audio.master) return;
  const ctxAudio = state.audio.context;
  const now = ctxAudio.currentTime;
  const pulse = (freq, duration, gain, shape = "triangle", delay = 0) => {
    const oscillator = ctxAudio.createOscillator();
    const node = ctxAudio.createGain();
    oscillator.type = shape;
    oscillator.frequency.setValueAtTime(freq, now + delay);
    node.gain.setValueAtTime(0, now + delay);
    node.gain.linearRampToValueAtTime(gain, now + delay + 0.01);
    node.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);
    oscillator.connect(node);
    node.connect(state.audio.master);
    oscillator.start(now + delay);
    oscillator.stop(now + delay + duration + 0.03);
  };

  if (type === "click") pulse(440, 0.08, 0.05, "square");
  else if (type === "move") pulse(220, 0.05, 0.04, "triangle");
  else if (type === "encounter") { pulse(160, 0.25, 0.08, "sawtooth"); pulse(220, 0.25, 0.05, "square", 0.1); }
  else if (type === "boss") { pulse(120, 0.4, 0.1, "sawtooth"); pulse(90, 0.45, 0.08, "triangle", 0.1); }
  else if (type === "hit") pulse(280, 0.08, 0.07, "square");
  else if (type === "crit") { pulse(520, 0.12, 0.09, "sawtooth"); pulse(740, 0.1, 0.06, "triangle", 0.05); }
  else if (type === "potion") { pulse(500, 0.12, 0.06, "triangle"); pulse(700, 0.12, 0.05, "triangle", 0.08); }
  else if (type === "bomb") { pulse(140, 0.2, 0.09, "square"); pulse(100, 0.25, 0.07, "sawtooth", 0.1); }
  else if (type === "buff") { pulse(650, 0.15, 0.06, "sine"); pulse(870, 0.14, 0.05, "sine", 0.08); }
  else if (type === "flee") { pulse(340, 0.08, 0.05, "triangle"); pulse(290, 0.08, 0.04, "triangle", 0.08); }
  else if (type === "victory") { pulse(440, 0.12, 0.07, "triangle"); pulse(550, 0.12, 0.07, "triangle", 0.1); pulse(660, 0.16, 0.08, "triangle", 0.2); }
  else if (type === "bossWin") { pulse(392, 0.16, 0.08, "triangle"); pulse(523, 0.16, 0.08, "triangle", 0.14); pulse(659, 0.2, 0.09, "triangle", 0.3); }
  else if (type === "defeat") { pulse(220, 0.2, 0.08, "sawtooth"); pulse(175, 0.25, 0.07, "sawtooth", 0.15); }
  else if (type === "achievement") { pulse(780, 0.15, 0.08, "sine"); pulse(1040, 0.2, 0.07, "sine", 0.08); }
  else if (type === "talk") { pulse(360, 0.06, 0.05, "triangle"); pulse(420, 0.06, 0.04, "triangle", 0.05); }
}

function startMusicLoop() {
  if (!state.audio.started || !state.audio.context || !state.audio.master) return;
  if (state.audio.intervalId) return;
  const ctxAudio = state.audio.context;
  let step = 0;
  const progression = [
    [196, 247, 294],
    [220, 277, 330],
    [174, 220, 262],
    [196, 247, 330],
  ];

  state.audio.intervalId = window.setInterval(() => {
    if (!state.options.musicEnabled || !state.audio.started || !state.audio.context || !state.audio.master) return;
    const now = ctxAudio.currentTime;
    const chord = progression[step % progression.length];
    chord.forEach((freq, idx) => {
      const osc = ctxAudio.createOscillator();
      const gain = ctxAudio.createGain();
      osc.type = idx === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.025 - idx * 0.005, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      osc.connect(gain);
      gain.connect(state.audio.master);
      osc.start(now);
      osc.stop(now + 1.25);
    });
    step += 1;
  }, 900);
}

function stopMusicLoop() {
  if (!state.audio.intervalId) return;
  window.clearInterval(state.audio.intervalId);
  state.audio.intervalId = null;
}
