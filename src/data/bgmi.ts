// ─────────────────────────────────────────────
//  BGMI Breakdown: Complete Data Layer
//  Compliant with antislop: No em dashes (R-02), no decorative emojis (R-04)
// ─────────────────────────────────────────────

// ── MAPS ──────────────────────────────────────
export interface HotDrop {
  name: string;
  loot: 'S' | 'A' | 'B';
  risk: 'Extreme' | 'High' | 'Medium';
  tip: string;
}

export interface BGMIMap {
  id: string;
  name: string;
  size: string;
  theme: string;
  description: string;
  accent: string;
  hotDrops: HotDrop[];
  vehicleTip: string;
  tacticalTip: string;
}

export const MAPS: BGMIMap[] = [
  {
    id: 'erangel',
    name: 'Erangel',
    size: '8x8 km',
    theme: 'Soviet Island',
    accent: '#22c55e',
    description: 'The foundation battleground: a sprawling Soviet-era island with open fields, dense settlements, and critical bridge choke points. Consistent compound control dictates late-game victory.',
    hotDrops: [
      { name: 'Pochinki', loot: 'S', risk: 'Extreme', tip: 'Multi-story roof transitions and compound walls favor high-mobility compound defenders.' },
      { name: 'Military Base', loot: 'S', risk: 'Extreme', tip: 'C-buildings guarantee high-tier armor and optics. Southern bridge camp is the primary rotation hazard.' },
      { name: 'Georgopol Containers', loot: 'A', risk: 'High', tip: 'Open container tops allow rapid AR and optic acquisition within 30 seconds of landing.' },
      { name: 'School and Apartments', loot: 'A', risk: 'Extreme', tip: 'Confined indoor corridors favor burst-fire shotguns and high rate-of-fire SMGs for room clearing.' },
      { name: 'Rozhok', loot: 'B', risk: 'Medium', tip: 'Elevated water tower provides an early scouting advantage for monitoring Phase 1 rotations.' },
    ],
    vehicleTip: 'Buggy and Dacia spawns concentrate along the Pochinki to Rozhok highway and Yasnaya ring road.',
    tacticalTip: 'Identify the dead side of the initial circle immediately. Securing a fortified two-story compound on the dead side by Phase 2 minimizes rotation crossfire.',
  },
  {
    id: 'miramar',
    name: 'Miramar',
    size: '8x8 km',
    theme: 'Desert Basin',
    accent: '#eab308',
    description: 'A vast arid landscape that rewards precision DMR play and ridge containment. Elevated ground control and vehicular mobility are mandatory to survive open valley transits.',
    hotDrops: [
      { name: 'Hacienda del Patron', loot: 'S', risk: 'Extreme', tip: 'Central villa complex with rapid Level 3 equipment spawns and contested courtyard exits.' },
      { name: 'Pecado', loot: 'S', risk: 'Extreme', tip: 'Four-story casino and hotel structures. Balcony angles control street-level pushes.' },
      { name: 'Los Leones', loot: 'A', risk: 'High', tip: 'Expansive urban grid supporting safe split-squad looting with reliable vehicle access.' },
      { name: 'San Martin', loot: 'A', risk: 'High', tip: 'Central geographical placement simplifies rotations regardless of circle hard-shifts.' },
      { name: 'Crater Fields', loot: 'B', risk: 'Medium', tip: 'Low-traffic perimeter zone with steady vehicle spawns for disciplined outer-edge rotations.' },
    ],
    vehicleTip: 'Dacia and Mirado performance peaks on asphalt corridors. Foot rotations across desert ridges invite sniper focus.',
    tacticalTip: 'Never cross open low-ground basins without smoke screens. Always traverse ridge-to-ridge using vehicle cover upon arrival.',
  },
  {
    id: 'sanhok',
    name: 'Sanhok',
    size: '4x4 km',
    theme: 'Tropical Rainforest',
    accent: '#10b981',
    description: 'Dense vegetation, rapid circle timings, and high third-party frequency. Compressed combat distances elevate weapons with superior burst damage such as the Beryl M762.',
    hotDrops: [
      { name: 'Bootcamp', loot: 'S', risk: 'Extreme', tip: 'High-density combat zone. The central main building roof controls all internal courtyard pushes.' },
      { name: 'Paradise Resort', loot: 'S', risk: 'Extreme', tip: 'Stone courtyards reward aggressive grenade placement and tight corner peeking.' },
      { name: 'Ruins', loot: 'A', risk: 'High', tip: 'Multi-tiered stone monument offering vertical angles that punish ground-floor rush attempts.' },
      { name: 'Camp Alpha', loot: 'B', risk: 'Medium', tip: 'Fortified military outpost optimal for disciplined squads seeking clean early-game survival.' },
      { name: 'Docks', loot: 'B', risk: 'Medium', tip: 'Perimeter coastal drop with reliable mid-tier gear and water escape routes.' },
    ],
    vehicleTip: 'Vehicular noise on a 4x4 map invites instant ambush. Prioritize silent foot rotations utilizing jungle depression lines.',
    tacticalTip: 'Audio cues dictate outcomes. Suppressors mitigate third-party attention while the QBU delivers superior single-tap stability.',
  },
  {
    id: 'livik',
    name: 'Livik',
    size: '2x2 km',
    theme: 'Nordic Terrain',
    accent: '#06b6d4',
    description: 'A compact 2x2 combat arena designed for fast 15-minute engagements. Features upgraded XT crate weapons and accelerated zone shrink intervals.',
    hotDrops: [
      { name: 'Midstein', loot: 'S', risk: 'Extreme', tip: 'Densely packed residential sector with the highest combat encounter rate on the map.' },
      { name: 'Power Plant', loot: 'A', risk: 'High', tip: 'Industrial zone housing weapon upgrade terminals and high-tier defensive gear.' },
      { name: 'Hot Springs', loot: 'B', risk: 'Medium', tip: 'Provides passive health regeneration pools for rapid recovery following skirmishes.' },
      { name: 'Waterfall Cavern', loot: 'B', risk: 'Medium', tip: 'Concealed cavern offering guaranteed crate spawns and quick water egress.' },
    ],
    vehicleTip: 'Monster Trucks negotiate steep vertical cliff faces with ease. Utilize them to claim otherwise inaccessible ridge points.',
    tacticalTip: 'Secure XT upgrade crates from Power Plant early. Upgraded XT variants exhibit tighter recoil recovery patterns.',
  },
  {
    id: 'rondo',
    name: 'Rondo',
    size: '8x8 km',
    theme: 'East Asian Highlands',
    accent: '#ec4899',
    description: 'BGMI newest expansive 8x8 battlefield. Contrasts dense contemporary metropolitan centers with traditional temples, highland bamboo forests, and high-speed transit cable networks.',
    hotDrops: [
      { name: 'Hua Wei City', loot: 'S', risk: 'Extreme', tip: 'Multi-level metropolitan core with high-rise rooftop gunfights and zipline evacuation lines.' },
      { name: 'Jade Palace', loot: 'S', risk: 'Extreme', tip: 'Expansive temple complex offering concentrated Level 3 military gear throughout central halls.' },
      { name: 'Bamboo Village', loot: 'A', risk: 'High', tip: 'Dense vegetation obstructs long lines of sight, favoring close-range smg ambushes.' },
      { name: 'Highland Pass', loot: 'A', risk: 'High', tip: 'Elevated roadway providing clear shooting angles across the entire eastern sector.' },
      { name: 'Rice Paddies', loot: 'B', risk: 'Medium', tip: 'Wide-open terrain requiring smoke concealment when rotating toward interior compounds.' },
      { name: 'Mountain Shrine', loot: 'B', risk: 'Medium', tip: 'Isolated shrine with low combat contention and consistent squad-level rifle spawns.' },
    ],
    vehicleTip: 'Utilize peak-to-peak cable cars for vertical transit over contested roads without engine noise.',
    tacticalTip: 'Learn the primary zipline network linking Jade Palace to central transit hubs for rapid rotation advantages.',
  },
];

// ── WEAPONS ────────────────────────────────────
export interface Weapon {
  id: string;
  name: string;
  category: 'AR' | 'Sniper' | 'DMR' | 'SMG' | 'Shotgun';
  ammo: string;
  damage: number;
  fireRate: number;
  range: number;
  recoil: number;
  magSize: number;
  headshotDmg: number;
  recoilLevel: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  description: string;
  attachments: string[];
  bestFor: string;
}

export const WEAPONS: Weapon[] = [
  {
    id: 'm416',
    name: 'M416',
    category: 'AR',
    ammo: '5.56mm',
    damage: 41,
    fireRate: 88,
    range: 78,
    recoil: 32,
    magSize: 40,
    headshotDmg: 96,
    recoilLevel: 'Easy',
    description: 'The standard rifle of competitive BGMI. Full attachment slots enable laser-flat mid-range spray control and predictable recoil recovery.',
    attachments: ['Compensator', 'Half Grip or Angled Grip', 'Extended Quickdraw Mag', 'Tactical Stock'],
    bestFor: 'Mid-range spray transfers, disciplined team fire, versatile baseline',
  },
  {
    id: 'akm',
    name: 'AKM',
    category: 'AR',
    ammo: '7.62mm',
    damage: 48,
    fireRate: 68,
    range: 65,
    recoil: 70,
    magSize: 40,
    headshotDmg: 112,
    recoilLevel: 'Hard',
    description: 'High alpha damage in a reliable 7.62mm platform. Eliminates targets in three to four chest hits, but demands vertical recoil compensation.',
    attachments: ['Compensator', 'Extended Quickdraw Mag', 'Red Dot Sight'],
    bestFor: 'Close-quarters entry fragging, controlled two-shot burst taps',
  },
  {
    id: 'beryl',
    name: 'Beryl M762',
    category: 'AR',
    ammo: '7.62mm',
    damage: 46,
    fireRate: 80,
    range: 67,
    recoil: 76,
    magSize: 40,
    headshotDmg: 107,
    recoilLevel: 'Extreme',
    description: 'Primary choice for front-line assault fraggers. Pairs heavy 7.62mm impact with an aggressive rate of fire that punishes hesitation.',
    attachments: ['Compensator', 'Vertical Foregrip', 'Extended Quickdraw Mag'],
    bestFor: 'Point-blank breach clearing, aggressive compound pushes',
  },
  {
    id: 'awm',
    name: 'AWM',
    category: 'Sniper',
    ammo: '.300 Magnum (Airdrop)',
    damage: 105,
    fireRate: 15,
    range: 100,
    recoil: 88,
    magSize: 7,
    headshotDmg: 262,
    recoilLevel: 'Medium',
    description: 'Airdrop sniper rifle with definitive lethality: the only bolt-action weapon capable of a single-hit knock through a full-durability Level 3 Helmet.',
    attachments: ['Sniper Suppressor', 'Extended Quickdraw Mag', 'Cheek Pad', '8x Scope'],
    bestFor: 'Long-range squad opening knocks, target suppression',
  },
  {
    id: 'kar98k',
    name: 'Kar98k',
    category: 'Sniper',
    ammo: '7.62mm',
    damage: 79,
    fireRate: 20,
    range: 85,
    recoil: 68,
    magSize: 5,
    headshotDmg: 197,
    recoilLevel: 'Medium',
    description: 'Classic world-spawn bolt-action sniper rifle. Knocks any target wearing a Level 2 Helmet with a single clean headshot.',
    attachments: ['Sniper Suppressor', 'Bullet Loops', '6x or 8x Scope'],
    bestFor: 'Long-range defensive holding, precision sniper duels',
  },
  {
    id: 'mini14',
    name: 'Mini 14',
    category: 'DMR',
    ammo: '5.56mm',
    damage: 48,
    fireRate: 75,
    range: 88,
    recoil: 28,
    magSize: 30,
    headshotDmg: 108,
    recoilLevel: 'Easy',
    description: 'Fastest bullet velocity in the game at 990 meters per second. Negligible bullet drop facilitates rapid tracking of sprinting targets.',
    attachments: ['Compensator', 'Extended Quickdraw Mag', '4x or 6x Scope'],
    bestFor: 'Long-distance rapid tapping, vehicular hit confirmation',
  },
  {
    id: 'ump45',
    name: 'UMP45',
    category: 'SMG',
    ammo: '.45 ACP',
    damage: 41,
    fireRate: 72,
    range: 45,
    recoil: 20,
    magSize: 35,
    headshotDmg: 75,
    recoilLevel: 'Easy',
    description: 'Highly stable submachine gun with high limb damage multipliers and forgiving hip-fire spread inside 15 meters.',
    attachments: ['SMG Suppressor', 'Laser Sight', 'Extended Quickdraw Mag'],
    bestFor: 'Indoor room clears, hip-fire strafe duels, vehicle drive-bys',
  },
  {
    id: 'dbs',
    name: 'DBS',
    category: 'Shotgun',
    ammo: '12 Gauge',
    damage: 98,
    fireRate: 60,
    range: 22,
    recoil: 58,
    magSize: 14,
    headshotDmg: 196,
    recoilLevel: 'Medium',
    description: 'Double-barrel bullpup shotgun holding 14 rounds. Delivers lethal two-pump bursts that eliminate fully armored opponents inside staircases.',
    attachments: ['Red Dot Sight'],
    bestFor: 'Staircase defense, building entry control, immediate squad wipes',
  },
];

// ── ZONE PHASES ─────────────────────────────────
export interface ZonePhase {
  phase: number;
  waitTime: string;
  shrinkTime: string;
  dps: string;
  danger: 'Low' | 'Moderate' | 'High' | 'Lethal';
  strategy: string;
}

export const ZONE_PHASES: ZonePhase[] = [
  { phase: 1, waitTime: '5:00', shrinkTime: '4:30', dps: '0.4 HP/s', danger: 'Low', strategy: 'Loot primary weapons, secure a reliable vehicle, and scout dead-side compounds.' },
  { phase: 2, waitTime: '3:20', shrinkTime: '2:20', dps: '0.6 HP/s', danger: 'Low', strategy: 'Initiate early positioning. Avoid trailing the blue boundary to conserve healing resources.' },
  { phase: 3, waitTime: '2:30', shrinkTime: '2:00', dps: '1.0 HP/s', danger: 'Moderate', strategy: 'Fortify a centralized two-story compound. Deploy smoke screens on open road crossings.' },
  { phase: 4, waitTime: '2:00', shrinkTime: '1:30', dps: '3.0 HP/s', danger: 'Moderate', strategy: 'Critical threshold: blue zone damage now outpaces bandage recovery speed. Establish safe white circle presence.' },
  { phase: 5, waitTime: '1:40', shrinkTime: '1:10', dps: '5.0 HP/s', danger: 'High', strategy: 'Deploy coordinated smoke walls across open fields. Sweep perimeter flanks prior to advancing.' },
  { phase: 6, waitTime: '1:30', shrinkTime: '1:00', dps: '7.0 HP/s', danger: 'High', strategy: 'Third-party engaged squads while they rotate. Conserve frag grenades and molotovs for building assaults.' },
  { phase: 7, waitTime: '1:15', shrinkTime: '0:45', dps: '9.0 HP/s', danger: 'Lethal', strategy: 'Final 10 squads. Pre-fire suspect ridges and trees with explosives. Keep booster bars at maximum.' },
  { phase: 8, waitTime: '1:00', shrinkTime: '0:30', dps: '12.0 HP/s', danger: 'Lethal', strategy: 'Final circle collapse: full utility rush or coordinated heal battle. High ground dictates outcome.' },
];

// ── ESPORTS ─────────────────────────────────────
export interface Team {
  name: string;
  tag: string;
  region: string;
  seed: string;
  starPlayers: string[];
  titles: string;
}

export interface Tournament {
  name: string;
  shortName: string;
  status: 'Ongoing' | 'Upcoming' | 'Completed';
  prizePool: string;
  dates: string;
  format: string;
  teams: Team[];
}

export const TOURNAMENTS: Tournament[] = [
  {
    name: 'Battlegrounds Mobile India Series 2026',
    shortName: 'BGIS 2026',
    status: 'Ongoing',
    prizePool: 'INR 2,00,00,000',
    dates: 'August to October 2026',
    format: 'Squad Battle Royale (64 Teams, 6 Matches Daily)',
    teams: [
      { name: 'Team Soul (iQOO Soul)', tag: 'SOUL', region: 'India', seed: 'Seed 1', starPlayers: ['Manya', 'Spower', 'ClutchGod'], titles: 'BGIS 2022, PMIT 2022' },
      { name: 'GodLike Esports', tag: 'GODL', region: 'India', seed: 'Seed 2', starPlayers: ['Jonathan', 'ZGOD', 'Neyoo'], titles: 'BGIS Season 2 Finalist' },
      { name: 'Team XSpark', tag: 'TX', region: 'India', seed: 'Defending Champions', starPlayers: ['NinjaJod', 'Sarang', 'Omega'], titles: 'BGIS 2024 Champions' },
      { name: 'Global Esports', tag: 'GE', region: 'India', seed: 'Seed 4', starPlayers: ['Mavi', 'Beast', 'Destro'], titles: 'BGIS Season 1 Finalist' },
      { name: 'Revenant Esports', tag: 'RNT', region: 'India', seed: 'Seed 5', starPlayers: ['Punk', 'PROTO'], titles: 'BMPS Season 2 Champions' },
      { name: 'Carnival Gaming', tag: 'CG', region: 'India', seed: 'Seed 6', starPlayers: ['Goblin', 'Joker'], titles: 'BGIS 2023 Top 4' },
    ],
  },
  {
    name: 'Battlegrounds Mobile India Pro Series Season 4',
    shortName: 'BMPS S4',
    status: 'Upcoming',
    prizePool: 'INR 1,50,00,000',
    dates: 'November to December 2026',
    format: 'Squad Battle Royale (Pro League, 24 Teams)',
    teams: [
      { name: 'Team Soul (iQOO Soul)', tag: 'SOUL', region: 'India', seed: 'Direct Invite', starPlayers: ['Manya', 'Spower'], titles: 'BGIS 2022' },
      { name: 'GodLike Esports', tag: 'GODL', region: 'India', seed: 'Direct Invite', starPlayers: ['Jonathan', 'ZGOD'], titles: 'PMWL Global Finalist' },
      { name: 'Medal Esports', tag: 'MED', region: 'India', seed: 'Qualifier Seed', starPlayers: ['Sayyam', 'Dragon'], titles: 'BMPS S3 Top 6' },
      { name: 'Enigma Gaming', tag: 'EG', region: 'India', seed: 'Qualifier Seed', starPlayers: ['Fierce', 'Wizard'], titles: 'BMPS Debutant' },
    ],
  },
  {
    name: 'PUBG Mobile Global Championship 2026',
    shortName: 'PMGC 2026',
    status: 'Upcoming',
    prizePool: 'USD 2,000,000',
    dates: 'December 2026 to January 2027',
    format: 'International Invitational (24 Teams)',
    teams: [
      { name: 'Team Soul (iQOO Soul)', tag: 'SOUL', region: 'South Asia', seed: 'Regional Qualifier', starPlayers: ['Manya', 'Spower'], titles: 'PMWL 2021 Finalist' },
      { name: '4AM eSports', tag: '4AM', region: 'China', seed: 'PEL Champion', starPlayers: ['Order', 'XQF'], titles: 'PMGC 2024 Finalist' },
      { name: 'BTR RA', tag: 'BTR', region: 'Southeast Asia', seed: 'SEA Champion', starPlayers: ['Ryzen', 'Luxxy'], titles: 'PMPL SEA Season 5' },
    ],
  },
];

// ── META ZONE (ESPORTS META) ────────────────────
export interface MetaWeapon {
  rank: number;
  name: string;
  role: string;
  whyMeta: string;
  tier: 'S' | 'A' | 'B';
}

export interface MetaStrategy {
  name: string;
  usedBy: string[];
  description: string;
  counterPlay: string;
}

export const META_WEAPONS: MetaWeapon[] = [
  { rank: 1, name: 'M416 + Mini 14', role: 'Standard Pro Combo', whyMeta: 'Low-recoil M416 handles mid-range spray transfers while Mini 14 offers reliable high-velocity DMR tapping. Adopted by over 70% of competitive rosters.', tier: 'S' },
  { rank: 2, name: 'Beryl M762 + Kar98k', role: 'Aggressive Fragging Loadout', whyMeta: 'Beryl shreds enemy armor at close-to-mid range, while the Kar98k punishes static peekers at long distances. Favored by entry fraggers.', tier: 'S' },
  { rank: 3, name: 'AKM + Mini 14', role: 'Heavy Alpha Damage', whyMeta: 'High 7.62mm impact combined with DMR range. Highly punishing against peeking enemies when controlled with disciplined burst firing.', tier: 'A' },
  { rank: 4, name: 'M416 + UMP45', role: 'Versatile Close Quarters', whyMeta: 'UMP45 delivers superior limb damage and mobility indoors, while the M416 covers all exterior field engagements.', tier: 'A' },
  { rank: 5, name: 'AWM + AR Hybrid', role: 'Air Drop Dominance', whyMeta: 'AWM forces opposing squads into defensive posture immediately. Paired with an assault rifle to secure complete range versatility.', tier: 'S' },
];

export const META_STRATEGIES: MetaStrategy[] = [
  {
    name: 'Dead-Side Compound Fortification',
    usedBy: ['Team Soul', 'GodLike', 'Team XSpark'],
    description: 'Secure a fortified compound on the low-traffic perimeter of the white circle during Phase 1. Eliminates multi-directional pressure and forces opponents into your line of fire.',
    counterPlay: 'Execute a coordinated utility breach: deploy simultaneous smoke cover, flashbangs, and molotov cocktails to clear ground-floor entries.',
  },
  {
    name: 'Third-Party Tactical Intercept',
    usedBy: ['GodLike', 'Revenant Esports'],
    description: 'Maintain perimeter discipline and observe ongoing 4v4 squad skirmishes. Advance on the surviving squad immediately after knocks occur before revives complete.',
    counterPlay: 'Designate a rear scout to monitor perimeter approaches while engaged in firefights.',
  },
  {
    name: 'Inward Spiral Rotation',
    usedBy: ['Team XSpark', 'Carnival Gaming'],
    description: 'Rotate inside the safe boundary in gradual spirals rather than running the blue edge. Avoids blue zone attrition and preserves defensive gear for late phases.',
    counterPlay: 'Central compound holders can intercept inward rotators as they cross natural terrain choke points.',
  },
  {
    name: 'Scout Split Formation (3-1)',
    usedBy: ['Team Soul', 'Global Esports'],
    description: 'One player probes next-circle compounds using a fast vehicle while three members anchor current cover. Guarantees situational intel prior to whole-squad movement.',
    counterPlay: 'Isolate and eliminate the lone forward scout before the main formation arrives in support.',
  },
];

// ── SENSITIVITY ──────────────────────────────────
export interface SensitivityPreset {
  playerName: string;
  device: string;
  style: string;
  camera: { thirdPerson: number; firstPerson: number; car: number };
  ads: { noScope: number; redDot: number; twoX: number; threeX: number; fourX: number; sixX: number; eightX: number };
  gyro: { always: number; ads: number; threeX: number; fourX: number; sixX: number; eightX: number };
  tips: string[];
}

export const SENSITIVITY_PRESETS: SensitivityPreset[] = [
  {
    playerName: 'Manya (Team Soul)',
    device: 'iPad Pro / Flagship Tablet',
    style: '4-Finger Claw with Gyroscope',
    camera: { thirdPerson: 100, firstPerson: 75, car: 60 },
    ads: { noScope: 115, redDot: 42, twoX: 38, threeX: 30, fourX: 26, sixX: 18, eightX: 10 },
    gyro: { always: 0, ads: 280, threeX: 260, fourX: 240, sixX: 220, eightX: 180 },
    tips: [
      'Enable ADS gyroscope only to prevent unintentional viewpoint drift during third-person free-look.',
      'Reduce 4x and 6x ADS sensitivity values slightly to achieve consistent mid-range burst stability.',
      'Practice combined drag-scope technique: open scope and pull down simultaneously.',
    ],
  },
  {
    playerName: 'Jonathan (GodLike)',
    device: 'iPhone 14 Pro / Smartphone',
    style: '4-Finger Claw with Full Gyroscope Always On',
    camera: { thirdPerson: 95, firstPerson: 80, car: 65 },
    ads: { noScope: 120, redDot: 45, twoX: 40, threeX: 35, fourX: 28, sixX: 20, eightX: 12 },
    gyro: { always: 320, ads: 300, threeX: 280, fourX: 260, sixX: 220, eightX: 190 },
    tips: [
      'Always-on gyroscope enables immediate 180-degree target shifts without finger repositioning.',
      'Higher camera sensitivity supports rapid target checking when clearing corners.',
      'Calibrate device gyroscope sensors on a level surface prior to competitive tournament matches.',
    ],
  },
  {
    playerName: 'Standard Competitive Baseline',
    device: 'Mid-Range Smartphone (2 to 3 Finger)',
    style: 'Thumb and Index Control (No Gyroscope)',
    camera: { thirdPerson: 80, firstPerson: 60, car: 55 },
    ads: { noScope: 80, redDot: 30, twoX: 25, threeX: 20, fourX: 15, sixX: 12, eightX: 8 },
    gyro: { always: 0, ads: 0, threeX: 0, fourX: 0, sixX: 0, eightX: 0 },
    tips: [
      'Establish baseline muscle memory with lower sensitivity settings prior to increasing values.',
      'Master directional joystick strafing before introducing tilt gyroscope controls.',
      'Rely primarily on Red Dot or 2x optics until weapon recoil pull-down feels natural.',
    ],
  },
];

// ── PLAYER RANKINGS ─────────────────────────────
export interface Player {
  rank: number;
  name: string;
  realName: string;
  team: string;
  teamTag: string;
  role: 'Fragger' | 'IGL' | 'Sniper' | 'Support' | 'All-Rounder';
  kd: number;
  avgDamage: number;
  finishesPerMatch: number;
  winRate: number;
  rating: number;
  signatureWeapon: string;
  nationality: string;
  bio: string;
  achievements: string[];
  accentColor: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
}

export const TOP_PLAYERS: Player[] = [
  {
    rank: 1,
    name: 'Jonathan',
    realName: 'Jonathan Amaral',
    team: 'GodLike Esports',
    teamTag: 'GODL',
    role: 'Fragger',
    kd: 8.2,
    avgDamage: 842,
    finishesPerMatch: 4.1,
    winRate: 34,
    rating: 98,
    signatureWeapon: 'Beryl M762',
    nationality: 'India',
    bio: 'Recognized as one of India most lethal frontline fraggers. His aggressive timing and clutch execution under pressure anchor GodLike competitive record.',
    achievements: ['PMWL 2021 Tournament MVP', 'BMPS Season 1 Top Fragger', 'BGIS 2023 Finals Top Finishes', 'Rank 1 National Rating 2024 to 2026'],
    accentColor: '#f97316',
    trend: 'stable',
    trendValue: '0',
  },
  {
    rank: 2,
    name: 'Manya',
    realName: 'Piyush Batlani',
    team: 'Team Soul (iQOO Soul)',
    teamTag: 'SOUL',
    role: 'IGL',
    kd: 6.9,
    avgDamage: 764,
    finishesPerMatch: 3.4,
    winRate: 41,
    rating: 96,
    signatureWeapon: 'M416',
    nationality: 'India',
    bio: 'The strategic lead behind Team Soul tournament victories. Manya balances calculated rotation calls with consistent mid-range rifle precision.',
    achievements: ['BGIS 2022 Champion', 'PMIT 2022 Winner', 'PMWL East Top 5 Finish', 'BGIS 2026 Leaderboard Seed'],
    accentColor: '#22c55e',
    trend: 'up',
    trendValue: '+2',
  },
  {
    rank: 3,
    name: 'NinjaJod',
    realName: 'Nikhil Joshi',
    team: 'Team XSpark',
    teamTag: 'TX',
    role: 'All-Rounder',
    kd: 7.1,
    avgDamage: 798,
    finishesPerMatch: 3.8,
    winRate: 38,
    rating: 94,
    signatureWeapon: 'M416 and Kar98k',
    nationality: 'India',
    bio: 'Versatile competitive athlete for the defending champions. Adapts dynamically between entry fragging, long-range sniper suppression, and secondary in-game leadership.',
    achievements: ['BGIS 2024 Champion', 'BMPS Season 3 Top Fragger', 'Team XSpark Core Anchor'],
    accentColor: '#a855f7',
    trend: 'down',
    trendValue: '-1',
  },
  {
    rank: 4,
    name: 'ZGOD',
    realName: 'Abhishek Choudhary',
    team: 'GodLike Esports',
    teamTag: 'GODL',
    role: 'Sniper',
    kd: 6.4,
    avgDamage: 712,
    finishesPerMatch: 3.0,
    winRate: 30,
    rating: 91,
    signatureWeapon: 'AWM and Mini 14',
    nationality: 'India',
    bio: 'Dedicated long-range marksman. Excels at acquiring opening knocks from perimeter ridge lines to compromise opponent rotation routes.',
    achievements: ['PMWL 2021 Top Marksman', 'BGIS Season 2 High Damage Award', 'Consistent GodLike Lineup Anchor'],
    accentColor: '#3b82f6',
    trend: 'stable',
    trendValue: '0',
  },
  {
    rank: 5,
    name: 'Neyoo',
    realName: 'Suraj Majumdar',
    team: 'GodLike Esports',
    teamTag: 'GODL',
    role: 'Support',
    kd: 5.8,
    avgDamage: 681,
    finishesPerMatch: 2.7,
    winRate: 28,
    rating: 89,
    signatureWeapon: 'UMP45 and M416',
    nationality: 'India',
    bio: 'Tactical support specialist whose disciplined utility deployment and flank protection create decisive opportunities for his squad.',
    achievements: ['PMWL 2021 Assist Leader', 'BGIS 2023 Support Player of the Tournament', 'GodLike Championship Roster'],
    accentColor: '#eab308',
    trend: 'up',
    trendValue: '+1',
  },
  {
    rank: 6,
    name: 'Spower',
    realName: 'Sahil Power',
    team: 'Team Soul (iQOO Soul)',
    teamTag: 'SOUL',
    role: 'Fragger',
    kd: 6.1,
    avgDamage: 720,
    finishesPerMatch: 3.2,
    winRate: 36,
    rating: 88,
    signatureWeapon: 'Beryl M762 and AWM',
    nationality: 'India',
    bio: 'Primary breach assault specialist for Team Soul. Renowned for decisive initial peeks during compound clearances under tournament pressure.',
    achievements: ['BGIS 2022 Champion', 'PMIT 2022 Top Fragger Award', 'Team Soul Entry Specialist'],
    accentColor: '#ec4899',
    trend: 'up',
    trendValue: '+3',
  },
  {
    rank: 7,
    name: 'ClutchGod',
    realName: 'Vivek Singh',
    team: 'Team Soul (iQOO Soul)',
    teamTag: 'SOUL',
    role: 'All-Rounder',
    kd: 5.6,
    avgDamage: 665,
    finishesPerMatch: 2.9,
    winRate: 33,
    rating: 86,
    signatureWeapon: 'M416 and Mini 14',
    nationality: 'India',
    bio: 'Specialist in high-pressure endgame clutch conversions. Consistently extracts squad points from outnumbered final circle engagements.',
    achievements: ['BGIS 2022 Champion', 'Leader in 1v2 Tournament Conversions', 'Endgame Strategy Anchor'],
    accentColor: '#10b981',
    trend: 'stable',
    trendValue: '0',
  },
  {
    rank: 8,
    name: 'Punk',
    realName: 'Manpreet Singh',
    team: 'Revenant Esports',
    teamTag: 'RNT',
    role: 'IGL',
    kd: 5.3,
    avgDamage: 634,
    finishesPerMatch: 2.5,
    winRate: 29,
    rating: 84,
    signatureWeapon: 'AKM and Kar98k',
    nationality: 'India',
    bio: 'Strategic leader of Revenant Esports. Developed structured compound containment protocols that secured the BMPS Season 2 title.',
    achievements: ['BMPS Season 2 Champion', 'BGIS 2025 Top 4 Placement', 'Revenant Strategic Architect'],
    accentColor: '#d946ef',
    trend: 'down',
    trendValue: '-2',
  },
  {
    rank: 9,
    name: 'Mavi',
    realName: 'Manikanta Reddy',
    team: 'Global Esports',
    teamTag: 'GE',
    role: 'Fragger',
    kd: 5.9,
    avgDamage: 698,
    finishesPerMatch: 2.8,
    winRate: 27,
    rating: 83,
    signatureWeapon: 'M416 and Mini 14',
    nationality: 'India',
    bio: 'Senior frontline leader for Global Esports. Combines technical spray control with proactive rotational reads against higher-seeded opposition.',
    achievements: ['BGIS Season 1 Finalist', 'Global Esports Veteran Leader'],
    accentColor: '#0ea5e9',
    trend: 'stable',
    trendValue: '0',
  },
  {
    rank: 10,
    name: 'Omega',
    realName: 'Rohit Sharma',
    team: 'Team XSpark',
    teamTag: 'TX',
    role: 'Sniper',
    kd: 5.4,
    avgDamage: 643,
    finishesPerMatch: 2.6,
    winRate: 32,
    rating: 82,
    signatureWeapon: 'Kar98k and M416',
    nationality: 'India',
    bio: 'Long-range suppression anchor for Team XSpark. Secures critical early knocks to establish map control for advancing teammates.',
    achievements: ['BGIS 2024 Champion', 'BMPS Season 3 Marksman Distinction', 'Team XSpark Perimeter Anchor'],
    accentColor: '#f97316',
    trend: 'up',
    trendValue: '+2',
  },
];

// ── TEAM STATS & POINTS CALCULATOR DATA ─────────
export interface TournamentTeamStat {
  id: string;
  slot: number;
  name: string;
  tag: string;
  group: 'Group A' | 'Group B' | 'Group C' | 'Group D';
  matches: number;
  wwcd: number;
  placementPoints: number;
  killPoints: number;
  totalPoints: number;
  checkedIn: boolean;
}

export interface MVPPlayerStat {
  id: string;
  name: string;
  team: string;
  teamTag: string;
  kills: number;
  damage: number;
  matches: number;
  mvpPoints: number;
}

export const SCORING_SYSTEMS = {
  bgis10: {
    name: 'Official BGIS / BMPS (10-Point Rule)',
    placementMap: [10, 6, 5, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    killPoint: 1,
  },
  classic15: {
    name: 'Classic PMCO (15-Point Rule)',
    placementMap: [15, 12, 10, 8, 6, 4, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    killPoint: 1,
  },
};

export const DEFAULT_TOURNAMENT_TEAMS: TournamentTeamStat[] = [
  { id: 't1',  slot: 1,  name: 'Team Soul',         tag: 'SOUL', group: 'Group A', matches: 6, wwcd: 2, placementPoints: 38, killPoints: 52, totalPoints: 90, checkedIn: true },
  { id: 't2',  slot: 2,  name: 'GodLike Esports',   tag: 'GODL', group: 'Group A', matches: 6, wwcd: 1, placementPoints: 31, killPoints: 49, totalPoints: 80, checkedIn: true },
  { id: 't3',  slot: 3,  name: 'Team XSpark',       tag: 'TX',   group: 'Group B', matches: 6, wwcd: 1, placementPoints: 29, killPoints: 46, totalPoints: 75, checkedIn: true },
  { id: 't4',  slot: 4,  name: 'Global Esports',    tag: 'GE',   group: 'Group B', matches: 6, wwcd: 1, placementPoints: 25, killPoints: 41, totalPoints: 66, checkedIn: true },
  { id: 't5',  slot: 5,  name: 'Revenant Esports',  tag: 'RNT',  group: 'Group A', matches: 6, wwcd: 0, placementPoints: 22, killPoints: 39, totalPoints: 61, checkedIn: true },
  { id: 't6',  slot: 6,  name: 'Carnival Gaming',   tag: 'CG',   group: 'Group C', matches: 6, wwcd: 1, placementPoints: 20, killPoints: 37, totalPoints: 57, checkedIn: true },
  { id: 't7',  slot: 7,  name: 'Medal Esports',     tag: 'MED',  group: 'Group C', matches: 6, wwcd: 0, placementPoints: 18, killPoints: 34, totalPoints: 52, checkedIn: true },
  { id: 't8',  slot: 8,  name: 'Enigma Gaming',     tag: 'EG',   group: 'Group B', matches: 6, wwcd: 0, placementPoints: 16, killPoints: 32, totalPoints: 48, checkedIn: true },
  { id: 't9',  slot: 9,  name: '8Bit Esports',      tag: '8BIT', group: 'Group D', matches: 6, wwcd: 0, placementPoints: 14, killPoints: 30, totalPoints: 44, checkedIn: true },
  { id: 't10', slot: 10, name: 'FS Esports',        tag: 'FS',   group: 'Group D', matches: 6, wwcd: 0, placementPoints: 12, killPoints: 28, totalPoints: 40, checkedIn: true },
  { id: 't11', slot: 11, name: 'Orange Rock',       tag: 'OR',   group: 'Group A', matches: 6, wwcd: 0, placementPoints: 10, killPoints: 26, totalPoints: 36, checkedIn: true },
  { id: 't12', slot: 12, name: 'WindGod Esports',   tag: 'WG',   group: 'Group C', matches: 6, wwcd: 0, placementPoints: 8,  killPoints: 24, totalPoints: 32, checkedIn: true },
  { id: 't13', slot: 13, name: 'Reckoning Esports', tag: 'RCK',  group: 'Group B', matches: 6, wwcd: 0, placementPoints: 7,  killPoints: 21, totalPoints: 28, checkedIn: true },
  { id: 't14', slot: 14, name: 'GlitchxReborn',     tag: 'GLTX', group: 'Group D', matches: 6, wwcd: 0, placementPoints: 5,  killPoints: 19, totalPoints: 24, checkedIn: false },
  { id: 't15', slot: 15, name: 'Hydra Official',    tag: 'HYD',  group: 'Group C', matches: 6, wwcd: 0, placementPoints: 4,  killPoints: 17, totalPoints: 21, checkedIn: true },
  { id: 't16', slot: 16, name: 'Blind Esports',     tag: 'BLND', group: 'Group D', matches: 6, wwcd: 0, placementPoints: 2,  killPoints: 15, totalPoints: 17, checkedIn: false },
];

export const DEFAULT_MVP_PLAYERS: MVPPlayerStat[] = [
  { id: 'm1', name: 'Jonathan',  team: 'GodLike Esports', teamTag: 'GODL', kills: 23, damage: 4120, matches: 6, mvpPoints: 88 },
  { id: 'm2', name: 'Spower',    team: 'Team Soul',       teamTag: 'SOUL', kills: 21, damage: 3890, matches: 6, mvpPoints: 84 },
  { id: 'm3', name: 'Manya',     team: 'Team Soul',       teamTag: 'SOUL', kills: 18, damage: 3450, matches: 6, mvpPoints: 79 },
  { id: 'm4', name: 'NinjaJod',  team: 'Team XSpark',     teamTag: 'TX',   kills: 17, damage: 3310, matches: 6, mvpPoints: 76 },
  { id: 'm5', name: 'ZGOD',      team: 'GodLike Esports', teamTag: 'GODL', kills: 15, damage: 3100, matches: 6, mvpPoints: 72 },
  { id: 'm6', name: 'Punk',      team: 'Revenant',        teamTag: 'RNT',  kills: 14, damage: 2980, matches: 6, mvpPoints: 69 },
  { id: 'm7', name: 'Mavi',      team: 'Global Esports',  teamTag: 'GE',   kills: 13, damage: 2840, matches: 6, mvpPoints: 66 },
  { id: 'm8', name: 'Goblin',    team: 'Carnival Gaming', teamTag: 'CG',  kills: 12, damage: 2690, matches: 6, mvpPoints: 63 },
];

