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
  seedInput: document.getElementById("seed-input"),
  seedRandom: document.getElementById("seed-random"),
  createStart: document.getElementById("create-start"),
  createBack: document.getElementById("create-back"),
  optionCombatLog: document.getElementById("option-combat-log"),
  optionControllerVibe: document.getElementById("option-controller-vibe"),
  optionsBack: document.getElementById("options-back"),
  mapCanvas: document.getElementById("map-canvas"),
  playerSummary: document.getElementById("player-summary"),
  playerStats: document.getElementById("player-stats"),
  worldContext: document.getElementById("world-context"),
  worldLog: document.getElementById("world-log"),
  worldInventory: document.getElementById("world-inventory"),
  worldEquipment: document.getElementById("world-equipment"),
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
  creation: { name: "Sir Placeholder", style: "Melee", cityId: MAJOR_CITIES[0].id, seed: randomSeed() },
  options: { verboseCombatLog: true, gamepadEnabled: true },
  game: null,
  combat: null,
  modal: null,
  focusables: [],
  focusIndex: 0,
  gamepad: { previousButtons: [], axisXReadyAt: 0, axisYReadyAt: 0 },
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

  els.worldInventory.addEventListener("click", () => openModal("inventory"));
  els.worldEquipment.addEventListener("click", () => openModal("equipment"));
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
}

function onKeyDown(event) {
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
    world,
    player,
    stepCount: 0,
    startingCityId: spawnCity.id,
    worldLog: [],
    runtimeRng: createRng(hashString(`${state.creation.seed}|runtime`)),
  };

  addStartingItems(player);
  recalculatePlayerStats(player, true);
  player.currentHealth = player.derivedStats.Health;
  addWorldLog(`Welcome, ${player.name}. ${spawnCity.name} pretends this is a normal day.`);
  addWorldLog("Leave a city to trigger encounters. Use the map to find dungeons and loot.");
  renderWorld();
  showScreen("world");
}

function createPlayer(name, style) {
  const styleData = COMBAT_STYLES[style];
  const player = {
    name,
    style,
    level: 1,
    xp: 0,
    baseStats: copyStats(styleData.baseStats),
    derivedStats: createZeroStats(),
    currentHealth: styleData.baseStats.Health,
    position: { x: 0, y: 0 },
    equipment: { Weapon: null, Head: null, Chest: null, Hands: null, Legs: null, Accessory1: null, Accessory2: null },
    bag: [],
  };
  player.equipment.Weapon = createStarterWeapon(styleData.starterWeapon);
  return player;
}

function addStartingItems(player) {
  addItemToBag(player, {
    uid: createItemUid(),
    kind: "consumable",
    id: "minor_potion",
    name: "Minor Potion",
    quantity: 3,
    heal: 24,
    description: "Recover 24 Health.",
  });
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
    <p>Level ${player.level} | XP ${player.xp}/${nextXp}</p>
    <p>HP ${player.currentHealth}/${player.derivedStats.Health}</p>
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
    els.worldContext.textContent = `${biomeLabel} - ${feature.name} (${feature.type}). Encounter chance: ${encounterChance.toFixed(1)}%`;
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
  const feature = getFeatureAt(world, nx, ny);
  if (feature?.type === "city" || feature?.type === "town") addWorldLog(`Arrived at ${feature.name}. This is a safe location.`);
  if (feature?.type === "dungeon") addWorldLog(`You stand at ${feature.name}. It smells like treasure and regret.`);
  tryTriggerEncounter(feature);
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
  chance = clamp(chance, 2, 35);
  if (runtimeRng.next() * 100 < chance) {
    const enemy = generateEnemy(tile.biome, player.level, runtimeRng);
    startCombat(enemy, tile.biome);
  }
}

function getEncounterChancePercent(biome, level) {
  return clamp(BIOME_DATA[biome].baseEncounter + level * 0.15, 2, 35);
}

function startCombat(enemy, biome) {
  state.combat = {
    enemy,
    biome,
    phase: "player",
    log: [`A ${enemy.name} (Lv ${enemy.level}) appears from the ${BIOME_DATA[biome].label}!`],
    result: null,
    playerDefending: false,
  };
  addWorldLog(`Encounter: ${enemy.name} ambushes you.`);
  showScreen("combat");
}

function renderCombat() {
  if (!state.combat || !state.game) return;
  const { player } = state.game;
  const { enemy } = state.combat;
  els.combatTitle.textContent = `Combat - ${enemy.name}`;
  els.combatPlayer.innerHTML = `
    <p><strong>${escapeHtml(player.name)}</strong> (Lv ${player.level})</p>
    <p>HP ${player.currentHealth}/${player.derivedStats.Health}</p>
    <p>Style ${player.style}</p>
    <p>Weapon ${escapeHtml(player.equipment.Weapon ? player.equipment.Weapon.name : "None")}</p>
  `;
  els.combatEnemy.innerHTML = `
    <p><strong>${escapeHtml(enemy.name)}</strong> (Lv ${enemy.level})</p>
    <p>HP ${enemy.currentHealth}/${enemy.stats.Health}</p>
    <p>Attack ${enemy.attackType}</p>
    <p>Damage 1d${enemy.damageDie}</p>
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
  if (action === "skill") return resolvePlayerAttack({ kind: "skill" });
  if (action === "item") return usePotionInCombat();
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
  damage = Math.max(1, damage);

  const critThreshold = Math.max(1, Math.floor((player.derivedStats.CriticalChance + profile.critBonus) / 5));
  const critRoll = rollDie(state.game.runtimeRng, 20);
  const critical = critRoll <= critThreshold;
  if (critical) damage = Math.max(1, Math.floor(damage * 1.5));

  enemy.currentHealth = clamp(enemy.currentHealth - damage, 0, enemy.stats.Health);
  if (state.options.verboseCombatLog) {
    pushCombatLog(`${profile.label} hits for ${damage}. [hit ${hitRoll}/${target}, crit ${critRoll}<=${critThreshold}${critical ? " YES" : ""}]`);
  } else {
    pushCombatLog(`${profile.label} hits for ${damage}${critical ? " (critical)" : ""}.`);
  }
  if (enemy.currentHealth <= 0) finalizeCombat("won");
  else queueEnemyTurn();
}

function getPlayerAttackProfile(kind) {
  const player = state.game.player;
  const weapon = player.equipment.Weapon;
  const attackType = weapon ? weapon.attackType : player.style;
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
  if (player.style === "Magic") {
    const spell = getBestSpellForLevel(player.level);
    return { label: spell.name, attackType: "Magic", damageDice: [spell.die, 4], hitBonus: 2, attackScale: 0.65, defenseScale: 0.3, critBonus: 2 };
  }
  if (player.style === "Ranged") {
    return { label: "Aimed Shot", attackType: "Ranged", damageDice: [weaponDie, 4], hitBonus: 4, attackScale: 0.56, defenseScale: 0.35, critBonus: 10 };
  }
  return { label: "Loud Cleave", attackType: "Melee", damageDice: [weaponDie, 4], hitBonus: 1, attackScale: 0.62, defenseScale: 0.35, critBonus: 4 };
}

function getBestSpellForLevel(level) {
  let spell = ELEMENTAL_SKILLS[0];
  for (const candidate of ELEMENTAL_SKILLS) {
    if (level >= candidate.level) spell = candidate;
  }
  return spell;
}

function usePotionInCombat() {
  const player = state.game.player;
  const potion = findPotionStack(player);
  if (!potion || potion.quantity <= 0) return pushCombatLog("No potions available.");
  if (player.currentHealth >= player.derivedStats.Health) return pushCombatLog("Health already full.");
  const healAmount = potion.heal + rollDie(state.game.runtimeRng, 8);
  player.currentHealth = clamp(player.currentHealth + healAmount, 0, player.derivedStats.Health);
  consumePotion(player);
  pushCombatLog(`You drink a potion and recover ${healAmount} Health.`);
  queueEnemyTurn();
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
    state.combat.phase = "player";
    return renderCombat();
  }

  let damage = rollDie(state.game.runtimeRng, enemy.damageDie);
  damage += Math.floor(attackValue * 0.5);
  damage -= Math.floor(defenseValue * 0.35);
  damage = Math.max(1, damage);
  const critRoll = rollDie(state.game.runtimeRng, 20);
  const critThreshold = Math.max(1, Math.floor(enemy.stats.CriticalChance / 5));
  if (critRoll <= critThreshold) damage = Math.max(1, Math.floor(damage * 1.5));
  if (state.combat.playerDefending) damage = Math.max(1, Math.floor(damage * 0.6));

  player.currentHealth = clamp(player.currentHealth - damage, 0, player.derivedStats.Health);
  pushCombatLog(`${enemy.name} hits for ${damage}.`);
  state.combat.playerDefending = false;

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
    const xpGain = 20 + enemy.level * 8;
    gainXp(state.game.player, xpGain);
    addWorldLog(`Victory over ${enemy.name}. Gained ${xpGain} XP.`);
    pushCombatLog(`Victory. You gain ${xpGain} XP.`);
    maybeDropLoot();
  } else if (result === "fled") {
    addWorldLog("You escaped combat.");
    pushCombatLog("You fled from battle.");
  } else if (result === "lost") {
    const player = state.game.player;
    const spawn = state.game.world.majorCityById[state.game.startingCityId] || state.game.world.majorCities[0];
    player.position.x = spawn.x;
    player.position.y = spawn.y;
    player.currentHealth = Math.floor(player.derivedStats.Health * 0.7);
    addWorldLog(`Defeat. You wake up in ${spawn.name} with bruised pride.`);
    pushCombatLog("Defeat. You are dragged back to a city.");
  }
  renderCombat();
}

function maybeDropLoot() {
  const player = state.game.player;
  const rng = state.game.runtimeRng;
  const equipmentDropChance = 25 + player.derivedStats.Luck * 0.3;
  if (rng.next() * 100 < equipmentDropChance) {
    const item = generateEquipmentDrop(player.level, rng);
    addItemToBag(player, item);
    pushCombatLog(`Loot found: ${item.name}.`);
    addWorldLog(`Loot: ${item.name} added to inventory.`);
    return;
  }
  if (rng.next() * 100 < 55) {
    addItemToBag(player, {
      uid: createItemUid(),
      kind: "consumable",
      id: "minor_potion",
      name: "Minor Potion",
      quantity: 1,
      heal: 24,
      description: "Recover 24 Health.",
    });
    pushCombatLog("Loot found: Minor Potion.");
    addWorldLog("Loot: Minor Potion added to inventory.");
  }
}

function generateEquipmentDrop(playerLevel, rng) {
  const tier = tierForLevel(playerLevel);
  const slot = rng.pick(EQUIPMENT_SLOTS);
  const slotLabel = slot.replace("Accessory1", "Accessory").replace("Accessory2", "Accessory");
  const prefixes = ["Bent", "Dusty", "Nimble", "Sharp", "Odd", "Lucky", "Stubborn", "Ancient", "Heroic", "Divine"];
  const item = {
    uid: createItemUid(),
    kind: "equipment",
    slot,
    attackType: slot === "Weapon" ? rng.pick(["Melee", "Ranged", "Magic"]) : null,
    damageDie: slot === "Weapon" ? rng.pick([4, 6, 8, 10, 12]) : 0,
    tier,
    levelReq: (tier - 1) * 10 + 1,
    name: `${prefixes[clamp(tier - 1, 0, prefixes.length - 1)]} ${slotLabel} (${TIER_NAMES[tier - 1]})`,
    modifiers: createZeroStats(),
  };
  item.modifiers.Health = rng.int(0, 5 + tier * 3);
  item.modifiers.MeleeAttack = rng.int(0, 1 + tier);
  item.modifiers.MeleeDefense = rng.int(0, 1 + tier);
  item.modifiers.RangedAttack = rng.int(0, 1 + tier);
  item.modifiers.RangedDefense = rng.int(0, 1 + tier);
  item.modifiers.MagicAttack = rng.int(0, 1 + tier);
  item.modifiers.MagicDefense = rng.int(0, 1 + tier);
  item.modifiers.CriticalChance = rng.int(0, 1 + Math.ceil(tier / 2));
  item.modifiers.Luck = rng.int(0, 1 + Math.ceil(tier / 2));
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
  els.modalBackdrop.classList.remove("hidden");
  els.modalBackdrop.setAttribute("aria-hidden", "false");
  renderModal();
}

function closeModal() {
  state.modal = null;
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
              <p>${escapeHtml(item.slot)} | ${summarizeModifiers(item.modifiers)}${item.slot === "Weapon" ? ` | 1d${item.damageDie} ${item.attackType}` : ""}</p>
            </div>
            <button class="focusable" data-modal-action="equip-item" data-item-id="${item.uid}">Equip</button>
          </div>
        `)
        .join("")
      : "<p>No equipment in bag.</p>";

    els.modalContent.innerHTML = `
      <h4>Consumables</h4>
      <div class="modal-list">${consumableRows}</div>
      <h4>Bag Equipment</h4>
      <div class="modal-list">${equipmentRows}</div>
    `;
  } else {
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
            <p>${escapeHtml(item.name)} | ${summarizeModifiers(item.modifiers)}${slot === "Weapon" ? ` | 1d${item.damageDie} ${item.attackType}` : ""}</p>
          </div>
          <button class="focusable" data-modal-action="unequip-slot" data-slot="${slot}">Unequip</button>
        </div>
      `;
    }).join("");
    els.modalContent.innerHTML = `<h4>Equipped Gear</h4><div class="modal-list">${equippedRows}</div>`;
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
    if (item.id === "minor_potion") {
      if (player.currentHealth >= player.derivedStats.Health) addWorldLog("Health already full.");
      else {
        player.currentHealth = clamp(player.currentHealth + item.heal, 0, player.derivedStats.Health);
        consumePotion(player, uid);
        addWorldLog("Minor Potion used.");
      }
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
  if (item.kind === "consumable") {
    const existing = player.bag.find((entry) => entry.kind === "consumable" && entry.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
      return;
    }
  }
  player.bag.push(item);
}

function consumePotion(player, specificUid = null) {
  if (specificUid) {
    const index = player.bag.findIndex((entry) => entry.uid === specificUid);
    if (index < 0) return;
    player.bag[index].quantity -= 1;
    if (player.bag[index].quantity <= 0) player.bag.splice(index, 1);
    return;
  }
  const potion = findPotionStack(player);
  if (!potion) return;
  potion.quantity -= 1;
  if (potion.quantity <= 0) player.bag.splice(player.bag.indexOf(potion), 1);
}

function findPotionStack(player) {
  return player.bag.find((item) => item.kind === "consumable" && item.id === "minor_potion");
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
    features.push({ id: `dungeon_${i}`, name: dungeonName, type: "dungeon", x: spot.x, y: spot.y });
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

function generateEnemy(biome, playerLevel, rng) {
  const template = rng.pick(ENEMY_POOLS[biome] || ENEMY_POOLS.plains);
  const level = clamp(playerLevel + rng.int(-1, 2), 1, MAX_LEVEL);
  const base = 8 + level;
  const stats = createZeroStats();
  stats.Health = 16 + level * 4 + rng.int(0, 8);
  stats.MeleeAttack = base;
  stats.MeleeDefense = base;
  stats.RangedAttack = base;
  stats.RangedDefense = base;
  stats.MagicAttack = base;
  stats.MagicDefense = base;
  stats.CriticalChance = template.crit + Math.floor(level / 12);
  stats.Luck = 4 + Math.floor(level / 10);
  if (template.attackType === "Melee") stats.MeleeAttack += Math.floor(level * 0.7);
  if (template.attackType === "Ranged") stats.RangedAttack += Math.floor(level * 0.7);
  if (template.attackType === "Magic") stats.MagicAttack += Math.floor(level * 0.7);
  return { name: template.name, level, attackType: template.attackType, damageDie: template.damageDie, stats, currentHealth: stats.Health };
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
  state.game = hydrateGame(parsed.game);
  state.combat = null;
  closeModal();
  renderWorld();
  showScreen("world");
  addWorldLog(`Loaded save from ${parsed.savedAt || "unknown time"}.`);
  return true;
}

function serializeGame(game) {
  return {
    seed: game.seed,
    world: { ...game.world, featureLookup: undefined, majorCityById: undefined },
    player: game.player,
    stepCount: game.stepCount,
    startingCityId: game.startingCityId,
    worldLog: game.worldLog,
    runtimeRngState: game.runtimeRng.getState(),
  };
}

function hydrateGame(saved) {
  const world = saved.world;
  world.featureLookup = buildFeatureLookup(world.features || []);
  world.majorCityById = {};
  (world.majorCities || []).forEach((city) => { world.majorCityById[city.id] = city; });
  const player = saved.player;
  player.baseStats = copyStats(player.baseStats);
  player.derivedStats = copyStats(player.derivedStats || player.baseStats);
  EQUIPMENT_SLOTS.forEach((slot) => {
    if (player.equipment[slot]) player.equipment[slot].modifiers = copyStats(player.equipment[slot].modifiers || {});
  });
  player.bag.forEach((item) => {
    if (item.kind === "equipment") item.modifiers = copyStats(item.modifiers || {});
  });
  recalculatePlayerStats(player, true);
  return {
    seed: saved.seed,
    world,
    player,
    stepCount: saved.stepCount || 0,
    startingCityId: saved.startingCityId || MAJOR_CITIES[0].id,
    worldLog: saved.worldLog || [],
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
    if (edge(9)) saveGame();
    if (edge(1)) showScreen("menu");
  }
  state.gamepad.previousButtons = pressed;
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
