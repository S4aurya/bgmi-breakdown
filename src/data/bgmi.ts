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

export interface RetiredMap {
  id: string;
  name: string;
  size: string;
  retirementReason: string;
  status: string;
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
    id: 'rondo',
    name: 'Rondo',
    size: '8x8 km',
    theme: 'East Asian Highlands',
    accent: '#ec4899',
    description: 'Official Tier 1 competitive battleground in the Krafton rulebook. Contrasts dense contemporary metropolitan centers with traditional temples, bamboo groves, and cable car networks.',
    hotDrops: [
      { name: 'Hua Wei City', loot: 'S', risk: 'Extreme', tip: 'Multi-level metropolitan core with high-rise rooftop gunfights and zipline evacuation lines.' },
      { name: 'Jade Palace', loot: 'S', risk: 'Extreme', tip: 'Expansive temple complex offering concentrated Level 3 military gear throughout central halls.' },
      { name: 'Bamboo Village', loot: 'A', risk: 'High', tip: 'Dense vegetation obstructs long lines of sight, favoring close-range smg ambushes.' },
      { name: 'Highland Pass', loot: 'A', risk: 'High', tip: 'Elevated roadway providing clear shooting angles across the entire eastern sector.' },
      { name: 'Rice Paddies', loot: 'B', risk: 'Medium', tip: 'Wide-open terrain requiring smoke concealment when rotating toward interior compounds.' },
      { name: 'Mountain Shrine', loot: 'B', risk: 'Medium', tip: 'Isolated shrine with low combat contention and consistent squad-level rifle spawns.' },
    ],
    vehicleTip: 'Utilize peak-to-peak cable cars for vertical transit over contested roads without engine noise.',
    tacticalTip: 'Master the central zipline network linking Jade Palace to central transit hubs for rapid circle rotation advantages.',
  },
];

export const RETIRED_COMPETITIVE_MAPS: RetiredMap[] = [
  {
    id: 'livik',
    name: 'Livik',
    size: '2x2 km',
    retirementReason: 'Excluded from the official Tier 1 Krafton competitive tournament rulebook. Designed as a casual 15-minute arcade battleground with XT weapon upgrade crates and accelerated zone collapse, non-standard for 16-squad competitive match integrity.',
    status: 'Casual / Non-Competitive',
  },
  {
    id: 'sanhok',
    name: 'Sanhok',
    size: '4x4 km',
    retirementReason: 'Officially retired from Krafton competitive pool due to compressed engagement spaces, excessive third-party frequency, and dense foliage enabling passive prone combat.',
    status: 'Retired from Competitive Pool',
  },
  {
    id: 'vikendi',
    name: 'Vikendi',
    size: '6x6 km',
    retirementReason: 'Officially retired from competitive rulebook rotation. Excessive compound clusters, high visual noise, and circle shift RNG led Krafton organizers to standardize on Erangel, Miramar, and Rondo.',
    status: 'Retired from Competitive Pool',
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
    status: 'Completed',
    prizePool: 'INR 2,00,00,000',
    dates: 'Concluded: Grand Finals Chennai',
    format: 'Squad Battle Royale (16 Finalists, 18 LAN Matches, 600K+ Peak CCV)',
    teams: [
      { name: 'iQOO SOUL', tag: 'SOUL', region: 'India', seed: 'Champions (173 pts)', starPlayers: ['Manya', 'LEGIT', 'Spower', 'Nakul'], titles: 'BGIS 2026 Champions (INR 1 Crore) | LEGIT: Finals MVP | Nakul: Best IGL' },
      { name: 'Genesis Esports', tag: 'GEN', region: 'India', seed: 'Runners-Up (151 pts)', starPlayers: ['HunterZ', 'Shryder'], titles: 'BGIS 2026 2nd Place' },
      { name: 'iQOO Orangutan', tag: 'OGN', region: 'India', seed: '3rd Place (142 pts)', starPlayers: ['AKop', 'WizzGOD'], titles: 'BGIS 2026 Podium' },
      { name: 'Victores Sumus', tag: 'VS', region: 'India', seed: '4th Place (138 pts)', starPlayers: ['Paavlo', 'Blazee'], titles: 'BGIS 2026 Top 4' },
      { name: 'Hero Xtreme GodLike', tag: 'GODL', region: 'India', seed: '5th Place (131 pts)', starPlayers: ['Jonathan', 'Punk', 'ZGOD'], titles: 'BMPS 2026 Champions' },
      { name: 'Team XSpark', tag: 'TX', region: 'India', seed: 'Finalist', starPlayers: ['NinjaJod', 'Sarang', 'Omega'], titles: 'BGIS 2024 Champions' },
    ],
  },
  {
    name: 'Battlegrounds Mobile India Pro Series 2026',
    shortName: 'BMPS 2026',
    status: 'Completed',
    prizePool: 'INR 2,00,00,000',
    dates: 'Concluded: Grand Finals Jaipur (June 2026)',
    format: 'Official Pro Series (128 Squads to 16 Grand Finalists)',
    teams: [
      { name: 'Hero Xtreme GodLike', tag: 'GODL', region: 'India', seed: 'Champions (162 pts, PMWC Seed)', starPlayers: ['Jonathan', 'Punk', 'ZGOD', 'Admino', 'Slug'], titles: 'BMPS 2026 Champions | Slug: Finals MVP | Jonathan: Eliminator' },
      { name: 'Divine Gaming', tag: 'DG', region: 'India', seed: 'Runners-Up (152 pts)', starPlayers: ['ScaryJod', 'Xero'], titles: 'BMPS 2026 2nd Place | ScaryJod: Tournament MVP' },
      { name: 'Victores Sumus', tag: 'VS', region: 'India', seed: '3rd Place (133 pts)', starPlayers: ['Paavlo', 'Blazee'], titles: 'BMPS 2026 3rd Place Podium' },
      { name: 'Gods Reign', tag: 'GR', region: 'India', seed: '4th Place (128 pts)', starPlayers: ['Omega', 'Jxlt'], titles: 'BMPS 2026 Top 4' },
      { name: 'Team Apex Gaming', tag: 'TAG', region: 'India', seed: '5th Place (123 pts)', starPlayers: ['Raptor', 'Viper'], titles: 'BMPS 2026 Top 5' },
      { name: 'iQOO Orangutan', tag: 'OGN', region: 'India', seed: '6th Place (119 pts)', starPlayers: ['AKop', 'WizzGOD'], titles: 'BGIS 2026 3rd Place & BMPS Top 6' },
    ],
  },
  {
    name: 'PUBG Mobile World Cup 2026 (Esports World Cup)',
    shortName: 'PMWC 2026',
    status: 'Completed',
    prizePool: 'USD 3,000,000 (~INR 25.2 Crore)',
    dates: 'August 2026: Paris, France',
    format: 'Global Invitational & Grand Finals (24 World Elite Rosters)',
    teams: [
      { name: 'Hero Xtreme GodLike', tag: 'GODL', region: 'India', seed: 'BMPS Champion Seed', starPlayers: ['Jonathan', 'Punk', 'ZGOD'], titles: 'EWC Club Partner Roster' },
      { name: 'Alpha7 Esports', tag: 'A7', region: 'Americas', seed: 'Americas Seed 1', starPlayers: ['Reevs', 'Carrilho'], titles: 'PMWC 2026 Champions' },
      { name: 'IHC Esports', tag: 'IHC', region: 'East Asia', seed: 'PMGC Champions', starPlayers: ['Zyol', 'Godless'], titles: 'Global Finalists' },
      { name: 'Vampire Esports', tag: 'VPE', region: 'Southeast Asia', seed: 'SEA Seed 1', starPlayers: ['TonyK', 'Noozy'], titles: '2x PMWI Champions' },
    ],
  },
  {
    name: 'Trident IGNITE & Naye Khiladi 2026',
    shortName: 'IGNITE 2026',
    status: 'Ongoing',
    prizePool: 'INR 50,00,000',
    dates: 'July to November 2026',
    format: 'Open Grassroots to Tier 1 Pathway Tournament',
    teams: [
      { name: 'HEXVORA', tag: 'HXV', region: 'India', seed: 'Naye Khiladi Champions', starPlayers: ['Kratos', 'Vortex'], titles: 'Inaugural Naye Khiladi Trophy' },
      { name: 'Dragon Claw Esports', tag: 'DC', region: 'India', seed: 'India Rising Winner', starPlayers: ['Shadow', 'Raptor'], titles: 'Grassroots Tier 1 Graduate' },
      { name: 'Krazy Kratos', tag: 'KK', region: 'India', seed: 'Rising Star Invitational', starPlayers: ['Zeus', 'Titan'], titles: '193 Pts Invitational Champions' },
    ],
  },
  {
    name: 'Battlegrounds Mobile India Showdown 2026',
    shortName: 'BMSD 2026',
    status: 'Ongoing',
    prizePool: 'INR 1,00,00,000 (1 Crore)',
    dates: 'September 22 to October 18, 2026',
    format: '48 Teams, Qualifiers (Sep 22-30) to Grand Finals | Champion: Direct PMGC 2026 slot | Top 6: BGMI International Cup 2026 qualification',
    teams: [
      { name: 'iQOO SOUL', tag: 'SOUL', region: 'India', seed: 'BGIS 2026 Champion Contender', starPlayers: ['Nakul', 'LEGIT', 'Goblin', 'Jokerr', 'Thunder'], titles: 'BGIS 2026 Champions' },
      { name: 'Hero Xtreme GodLike', tag: 'GODL', region: 'India', seed: 'BMPS 2026 Champion Contender', starPlayers: ['Manya', 'Spower', 'Admino', 'Saumay', 'Godz'], titles: 'BMPS 2026 Champions' },
      { name: 'Divine Gaming', tag: 'DG', region: 'India', seed: 'BMPS 2026 Runner-Up', starPlayers: ['Slug', 'Xero'], titles: 'BMPS 2026 2nd Place | Slug: Finals MVP' },
      { name: 'Team Apex Gaming', tag: 'TAG', region: 'India', seed: 'Jonathan\'s Own Org', starPlayers: ['Jonathan', 'Jelly', 'Hydro', 'KioLmao', 'Harsh'], titles: 'BMPS 2026 5th Place | Jonathan: BMPS Eliminator' },
      { name: 'Victores Sumus', tag: 'VS', region: 'India', seed: 'BMPS 2026 3rd Place', starPlayers: ['ScaryJod', 'Paavlo', 'Blazee'], titles: 'BMPS 2026 3rd Place | ScaryJod: Tournament MVP' },
      { name: 'Genesis Esports', tag: 'GEN', region: 'India', seed: 'BGIS 2026 Runner-Up', starPlayers: ['HunterZ', 'Shryder'], titles: 'BGIS 2026 2nd Place | HunterZ: Tournament MVP' },
    ],
  },
  {
    name: 'PUBG Mobile Global Championship 2026',
    shortName: 'PMGC 2026',
    status: 'Upcoming',
    prizePool: 'USD 3,000,000 (~INR 25.2 Crore)',
    dates: 'November to December 2026 (Istanbul, Turkiye)',
    format: 'Global Circuit Championship (48 Global Squads, Group Stage to Grand Finals)',
    teams: [
      { name: 'iQOO SOUL', tag: 'SOUL', region: 'South Asia', seed: 'BGIS Champion Contender', starPlayers: ['Manya', 'LEGIT', 'Spower'], titles: 'BGIS 2026 Champions' },
      { name: 'Hero Xtreme GodLike', tag: 'GODL', region: 'South Asia', seed: 'EWC Partner Contender', starPlayers: ['Jonathan', 'Punk', 'ZGOD'], titles: 'BMPS 2026 Champions' },
      { name: 'Alpha7 Esports', tag: 'A7', region: 'Americas', seed: 'Americas Direct Seed', starPlayers: ['Reevs', 'Mafioso'], titles: 'PMWC 2026 Champions' },
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
    usedBy: ['Hero Xtreme GodLike', 'iQOO SOUL', 'Victores Sumus'],
    description: 'Secure a fortified compound on the low-traffic perimeter of the white circle during Phase 1. Eliminates multi-directional pressure and forces opponents into your line of fire.',
    counterPlay: 'Execute a coordinated utility breach: deploy simultaneous smoke cover, flashbangs, and molotov cocktails to clear ground-floor entries.',
  },
  {
    name: 'Third-Party Tactical Intercept',
    usedBy: ['Team Apex Gaming', 'Divine Gaming'],
    description: 'Maintain perimeter discipline and observe ongoing 4v4 squad skirmishes. Advance on the surviving squad immediately after knocks occur before revives complete.',
    counterPlay: 'Designate a rear scout to monitor perimeter approaches while engaged in firefights.',
  },
  {
    name: 'Inward Spiral Rotation',
    usedBy: ['Genesis Esports', 'Gods Reign'],
    description: 'Rotate inside the safe boundary in gradual spirals rather than running the blue edge. Avoids blue zone attrition and preserves defensive gear for late phases.',
    counterPlay: 'Central compound holders can intercept inward rotators as they cross natural terrain choke points.',
  },
  {
    name: 'Scout Split Formation (3-1)',
    usedBy: ['iQOO SOUL', 'iQOO Orangutan'],
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
    playerName: 'Manya (Hero Xtreme GodLike)',
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
    playerName: 'Jonathan (Team Apex Gaming)',
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
    realName: 'Jonathan Jude Amaral',
    team: 'Team Apex Gaming',
    teamTag: 'TAG',
    role: 'Fragger',
    kd: 8.4,
    avgDamage: 875,
    finishesPerMatch: 4.2,
    winRate: 33,
    rating: 99,
    signatureWeapon: 'Beryl M762',
    nationality: 'India',
    bio: 'India premier assault fragger and KIE Leaderboard #1 (137 pts, Sep 2026). Left GodLike in April 2026 to found Team Apex Gaming with ex-True Rippers core. Awarded BMPS 2026 Eliminator (154 finishes) while representing TAG. Represented India at PMWC Paris as a GodLike athlete.',
    achievements: ['KIE Global Leaderboard #1 (137 pts)', 'BMPS 2026 Eliminator / Top Fragger (154 finishes)', 'PMWC 2026 Paris Grand Finalist', 'Founder: Team Apex Gaming (Apr 2026)'],
    accentColor: '#f97316',
    trend: 'up',
    trendValue: '+2',
  },
  {
    rank: 2,
    name: 'LEGIT',
    realName: 'Yash Choudhary',
    team: 'iQOO SOUL',
    teamTag: 'SOUL',
    role: 'Fragger',
    kd: 7.9,
    avgDamage: 824,
    finishesPerMatch: 3.9,
    winRate: 42,
    rating: 97,
    signatureWeapon: 'M416 and Beryl M762',
    nationality: 'India',
    bio: 'KIE Leaderboard #2 (135.7 pts). Grand Finals MVP of BGIS 2026 in Chennai. His decisive entry clearances and multikill conversions secured the INR 1 Crore championship for iQOO SOUL. Representing India at Esports Nations Cup 2026 in Riyadh (Nov 2026).',
    achievements: ['KIE Global Leaderboard #2 (135.7 pts)', 'BGIS 2026 Grand Finals MVP', 'BGIS 2026 Champion', 'Esports Nations Cup 2026 India National Squad'],
    accentColor: '#22c55e',
    trend: 'stable',
    trendValue: '0',
  },
  {
    rank: 3,
    name: 'HunterZ',
    realName: 'Mohammed Kaif Khan',
    team: 'Genesis Esports',
    teamTag: 'GEN',
    role: 'All-Rounder',
    kd: 7.6,
    avgDamage: 810,
    finishesPerMatch: 3.7,
    winRate: 37,
    rating: 95,
    signatureWeapon: 'M416 and Mini 14',
    nationality: 'India',
    bio: 'KIE Leaderboard #4 (129.8 pts). Overall Tournament MVP of BGIS 2026. Steered Genesis Esports to a sensational 2nd-place podium finish in Chennai against established tier 1 franchises.',
    achievements: ['BGIS 2026 Tournament MVP', 'BGIS 2026 Runner-Up (151 pts)', 'KIE Global Leaderboard #4', 'Highest Solo Knock Percentage at Chennai LAN'],
    accentColor: '#a855f7',
    trend: 'down',
    trendValue: '-1',
  },
  {
    rank: 4,
    name: 'Manya',
    realName: 'Mohammad Raja',
    team: 'Hero Xtreme GodLike',
    teamTag: 'GODL',
    role: 'IGL',
    kd: 6.8,
    avgDamage: 755,
    finishesPerMatch: 3.3,
    winRate: 44,
    rating: 94,
    signatureWeapon: 'M416',
    nationality: 'India',
    bio: 'BMPS 2026 Champion IGL for GodLike Esports. Joined GodLike in October 2025. Captained the new-look roster to BMPS 2026 glory in Jaipur (162 pts) and represented India at PMWC Paris.',
    achievements: ['BMPS 2026 Champion IGL (GodLike)', 'PMWC 2026 Paris Grand Finalist', 'BGIS 2022 Champion (ex-SOUL)', 'BMPS Season 1 Champion (ex-SOUL)'],
    accentColor: '#0ea5e9',
    trend: 'up',
    trendValue: '+1',
  },
  {
    rank: 5,
    name: 'Nakul',
    realName: 'Nakul Sharma',
    team: 'iQOO SOUL',
    teamTag: 'SOUL',
    role: 'IGL',
    kd: 6.2,
    avgDamage: 720,
    finishesPerMatch: 3.2,
    winRate: 43,
    rating: 93,
    signatureWeapon: 'M416',
    nationality: 'India',
    bio: 'BGIS 2026 Best IGL. Current captain of iQOO SOUL after Manya departed to GodLike. Led SOUL to the BGIS 2026 championship in Chennai and named to the India national squad for Esports Nations Cup 2026 in Riyadh.',
    achievements: ['BGIS 2026 Best IGL Award', 'BGIS 2026 Champion (173 pts)', 'Esports Nations Cup 2026 India National Squad', 'SOUL Current IGL'],
    accentColor: '#06b6d4',
    trend: 'up',
    trendValue: '+5',
  },
  {
    rank: 6,
    name: 'Spower',
    realName: 'Rudra Banswani',
    team: 'Hero Xtreme GodLike',
    teamTag: 'GODL',
    role: 'Fragger',
    kd: 7.2,
    avgDamage: 780,
    finishesPerMatch: 3.6,
    winRate: 40,
    rating: 91,
    signatureWeapon: 'Beryl M762 and DBS',
    nationality: 'India',
    bio: 'Frontline breach specialist for GodLike. Joined GodLike in October 2025 alongside Manya. Dominates close-quarters compound skirmishes and recorded one of the highest elimination tallies for an Indian player at PMWC Paris.',
    achievements: ['BMPS 2026 Champion (GodLike)', 'PMWC 2026 Paris Grand Finalist', 'Top Indian Fragger at PMWC Paris', 'BGIS 2022 Champion (ex-SOUL)'],
    accentColor: '#ec4899',
    trend: 'up',
    trendValue: '+2',
  },
  {
    rank: 7,
    name: 'ScaryJod',
    realName: 'Moinuddin Saifee',
    team: 'Victores Sumus',
    teamTag: 'VS',
    role: 'Fragger',
    kd: 7.4,
    avgDamage: 800,
    finishesPerMatch: 3.8,
    winRate: 35,
    rating: 90,
    signatureWeapon: 'M416 and Beryl M762',
    nationality: 'India',
    bio: 'BMPS 2026 Tournament MVP (Overall MVP). Starred for Victores Sumus as they finished 3rd in the Jaipur Grand Finals (133 pts). Also earned Best Clutch award for match-winning performances under extreme pressure.',
    achievements: ['BMPS 2026 Tournament MVP (Overall)', 'BMPS 2026 Best Clutch Award', 'BMPS 2026 3rd Place Podium (Victores Sumus)'],
    accentColor: '#f59e0b',
    trend: 'up',
    trendValue: '+7',
  },
  {
    rank: 8,
    name: 'Slug',
    realName: 'Abhishek Bose',
    team: 'Divine Gaming',
    teamTag: 'DG',
    role: 'Fragger',
    kd: 7.1,
    avgDamage: 790,
    finishesPerMatch: 3.5,
    winRate: 38,
    rating: 89,
    signatureWeapon: 'Beryl M762 and M416',
    nationality: 'India',
    bio: 'BMPS 2026 Grand Finals MVP. Led Divine Gaming to a sensational runner-up finish (152 pts) in Jaipur. Known for consistency across all match phases and explosive late-game clutch duels.',
    achievements: ['BMPS 2026 Grand Finals MVP', 'BMPS 2026 Runner-Up (Divine Gaming, 152 pts)'],
    accentColor: '#8b5cf6',
    trend: 'up',
    trendValue: '+9',
  },
  {
    rank: 9,
    name: 'AKop',
    realName: 'Ankit Shukla',
    team: 'iQOO Orangutan',
    teamTag: 'OGN',
    role: 'Fragger',
    kd: 6.9,
    avgDamage: 762,
    finishesPerMatch: 3.4,
    winRate: 35,
    rating: 87,
    signatureWeapon: 'M416 and Kar98k',
    nationality: 'India',
    bio: 'Key offensive powerhouse behind iQOO Orangutan. Delivered a 3rd-place podium at BGIS 2026 in Chennai and followed up with a 6th-place finish at BMPS 2026 Jaipur. Specializes in long-distance vehicle spray confirmations.',
    achievements: ['BGIS 2026 3rd Place Podium (142 pts)', 'BMPS 2026 6th Place Finish', 'Consistent LAN Fragger Award'],
    accentColor: '#f59e0b',
    trend: 'down',
    trendValue: '-3',
  },
  {
    rank: 10,
    name: 'Saumay',
    realName: 'Saumay Anand',
    team: 'Hero Xtreme GodLike',
    teamTag: 'GODL',
    role: 'All-Rounder',
    kd: 6.5,
    avgDamage: 740,
    finishesPerMatch: 3.1,
    winRate: 37,
    rating: 85,
    signatureWeapon: 'M416 and Mini 14',
    nationality: 'India',
    bio: 'GodLike signing who replaced Jonathan in April 2026. Formed the fifth piece of the championship-winning BMPS 2026 roster alongside Manya, Spower, Admino, and Godz. Delivers reliable placement points and hybrid fragging.',
    achievements: ['BMPS 2026 Champion (GodLike)', 'PMWC 2026 Paris Grand Finalist', 'GodLike Roster Cornerstone 2026'],
    accentColor: '#10b981',
    trend: 'up',
    trendValue: '+10',
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
  { id: 't1',  slot: 1,  name: 'iQOO SOUL',             tag: 'SOUL', group: 'Group A', matches: 6, wwcd: 2, placementPoints: 42, killPoints: 56, totalPoints: 98, checkedIn: true },
  { id: 't2',  slot: 2,  name: 'Hero Xtreme GodLike',   tag: 'GODL', group: 'Group A', matches: 6, wwcd: 2, placementPoints: 36, killPoints: 52, totalPoints: 88, checkedIn: true },
  { id: 't3',  slot: 3,  name: 'Genesis Esports',       tag: 'GEN',  group: 'Group B', matches: 6, wwcd: 1, placementPoints: 32, killPoints: 48, totalPoints: 80, checkedIn: true },
  { id: 't4',  slot: 4,  name: 'iQOO Orangutan',        tag: 'OGN',  group: 'Group B', matches: 6, wwcd: 1, placementPoints: 28, killPoints: 46, totalPoints: 74, checkedIn: true },
  { id: 't5',  slot: 5,  name: 'Victores Sumus',        tag: 'VS',   group: 'Group A', matches: 6, wwcd: 1, placementPoints: 26, killPoints: 43, totalPoints: 69, checkedIn: true },
  { id: 't6',  slot: 6,  name: 'Team Apex Gaming',      tag: 'TAG',  group: 'Group B', matches: 6, wwcd: 1, placementPoints: 24, killPoints: 41, totalPoints: 65, checkedIn: true },
  { id: 't7',  slot: 7,  name: 'Divine Gaming',         tag: 'DG',   group: 'Group C', matches: 6, wwcd: 1, placementPoints: 22, killPoints: 38, totalPoints: 60, checkedIn: true },
  { id: 't8',  slot: 8,  name: 'Team XSpark',           tag: 'TX',   group: 'Group A', matches: 6, wwcd: 0, placementPoints: 20, killPoints: 36, totalPoints: 56, checkedIn: true },
  { id: 't9',  slot: 9,  name: 'HEXVORA (Naye Khiladi)',tag: 'HXV',  group: 'Group D', matches: 6, wwcd: 1, placementPoints: 18, killPoints: 34, totalPoints: 52, checkedIn: true },
  { id: 't10', slot: 10, name: 'Global Esports',        tag: 'GE',   group: 'Group C', matches: 6, wwcd: 0, placementPoints: 16, killPoints: 32, totalPoints: 48, checkedIn: true },
  { id: 't11', slot: 11, name: 'Gods Reign',            tag: 'GR',   group: 'Group C', matches: 6, wwcd: 0, placementPoints: 14, killPoints: 30, totalPoints: 44, checkedIn: true },
  { id: 't12', slot: 12, name: 'Enigma Gaming',         tag: 'EG',   group: 'Group B', matches: 6, wwcd: 0, placementPoints: 12, killPoints: 28, totalPoints: 40, checkedIn: true },
  { id: 't13', slot: 13, name: '8Bit Esports',          tag: '8BIT', group: 'Group D', matches: 6, wwcd: 0, placementPoints: 10, killPoints: 25, totalPoints: 35, checkedIn: true },
  { id: 't14', slot: 14, name: 'Nebula Esports',        tag: 'NEB',  group: 'Group C', matches: 6, wwcd: 0, placementPoints: 8,  killPoints: 23, totalPoints: 31, checkedIn: true },
  { id: 't15', slot: 15, name: 'Hydra Official',        tag: 'HYD',  group: 'Group D', matches: 6, wwcd: 0, placementPoints: 6,  killPoints: 20, totalPoints: 26, checkedIn: true },
  { id: 't16', slot: 16, name: 'Dragon Claw Esports',   tag: 'DC',   group: 'Group D', matches: 6, wwcd: 0, placementPoints: 4,  killPoints: 18, totalPoints: 22, checkedIn: true },
];

export const DEFAULT_MVP_PLAYERS: MVPPlayerStat[] = [
  { id: 'm1', name: 'Jonathan', team: 'Team Apex Gaming',      teamTag: 'TAG',  kills: 26, damage: 4580, matches: 6, mvpPoints: 96 },
  { id: 'm2', name: 'LEGIT',    team: 'iQOO SOUL',             teamTag: 'SOUL', kills: 24, damage: 4320, matches: 6, mvpPoints: 92 },
  { id: 'm3', name: 'HunterZ',  team: 'Genesis Esports',       teamTag: 'GEN',  kills: 22, damage: 4050, matches: 6, mvpPoints: 87 },
  { id: 'm4', name: 'ScaryJod', team: 'Victores Sumus',        teamTag: 'VS',   kills: 21, damage: 3960, matches: 6, mvpPoints: 85 },
  { id: 'm5', name: 'Spower',   team: 'Hero Xtreme GodLike',   teamTag: 'GODL', kills: 20, damage: 3820, matches: 6, mvpPoints: 82 },
  { id: 'm6', name: 'Slug',     team: 'Divine Gaming',         teamTag: 'DG',   kills: 19, damage: 3750, matches: 6, mvpPoints: 79 },
  { id: 'm7', name: 'Manya',    team: 'Hero Xtreme GodLike',   teamTag: 'GODL', kills: 18, damage: 3490, matches: 6, mvpPoints: 76 },
  { id: 'm8', name: 'Nakul',    team: 'iQOO SOUL',             teamTag: 'SOUL', kills: 16, damage: 3240, matches: 6, mvpPoints: 71 },
];

// ── INTERNATIONAL STATS & GLOBAL CIRCUIT ─────────
export interface InternationalTeam {
  rank: number;
  name: string;
  tag: string;
  region: string;
  rating: number;
  wwcd: number;
  kd: number;
  notableAchievement: string;
  status: string;
}

export interface IndianGlobalTrackRecord {
  teamName: string;
  tag: string;
  tournament: string;
  placement: string;
  earnings: string;
  highlight: string;
  year: string;
}

export interface NationalVsGlobalMetric {
  metric: string;
  nationalValue: string;
  internationalValue: string;
  unit: string;
  tacticalImplication: string;
}

export interface GlobalPlayer {
  rank: number;
  name: string;
  realName: string;
  team: string;
  teamTag: string;
  region: string;
  role: 'Fragger' | 'IGL' | 'Sniper' | 'All-Rounder';
  kd: number;
  avgDamage: number;
  finishesPerMatch: number;
  rating: number;
  signatureWeapon: string;
  notableAccolade: string;
}

export interface GlobalTournamentInfo {
  name: string;
  shortName: string;
  tier: string;
  prizePool: string;
  location: string;
  dates: string;
  champion: string;
  format: string;
}

export interface InternationalStatsData {
  summary: string;
  activeGlobalCircuit: string;
  totalGlobalPrizePurse: string;
  globalRankings: InternationalTeam[];
  globalPlayers: GlobalPlayer[];
  globalTournaments: GlobalTournamentInfo[];
  indianSquadsGlobal: IndianGlobalTrackRecord[];
  metricComparisons: NationalVsGlobalMetric[];
}

export const INTERNATIONAL_STATS: InternationalStatsData = {
  summary: 'Official PUBG Mobile global esports telemetry comparing worldwide team power ratings, international player rankings, and Tier 1 championship metrics (PMWC Paris at Esports World Cup, PMGC, PMGO, and PMSL).',
  activeGlobalCircuit: 'Esports World Cup & PMGC Circuit 2026',
  totalGlobalPrizePurse: 'USD 6,500,000+ (~INR 54+ Crore)',
  globalRankings: [
    {
      rank: 1,
      name: 'Alpha7 Esports',
      tag: 'A7',
      region: 'Americas (Brazil)',
      rating: 99,
      wwcd: 18,
      kd: 4.8,
      notableAchievement: 'PMGC World Champions & PMSL Americas Dominance',
      status: 'World Rank 1',
    },
    {
      rank: 2,
      name: 'Vampire Esports',
      tag: 'VPE',
      region: 'Southeast Asia (Thailand)',
      rating: 97,
      wwcd: 15,
      kd: 4.5,
      notableAchievement: 'Two-time PMWI Champions & High-Tempo Compound Control',
      status: 'World Rank 2',
    },
    {
      rank: 3,
      name: 'D\'Xavier',
      tag: 'DX',
      region: 'Southeast Asia (Vietnam)',
      rating: 96,
      wwcd: 14,
      kd: 4.3,
      notableAchievement: 'PMSL SEA Champions & Flawless Mid-Range Suppression',
      status: 'World Rank 3',
    },
    {
      rank: 4,
      name: 'Reject',
      tag: 'RC',
      region: 'East Asia (Japan)',
      rating: 94,
      wwcd: 12,
      kd: 4.2,
      notableAchievement: 'PMGO World Champions & Unmatched Ridge Defense',
      status: 'World Rank 4',
    },
    {
      rank: 5,
      name: 'Hero Xtreme GodLike',
      tag: 'GODL',
      region: 'South Asia (India)',
      rating: 93,
      wwcd: 11,
      kd: 4.1,
      notableAchievement: 'BMPS 2026 Champions, PMWC Paris Finalists & EWC Club Partner',
      status: 'World Rank 5 (India Seed 1)',
    },
    {
      rank: 6,
      name: 'Wolves Esports',
      tag: 'WOL',
      region: 'China (PEL)',
      rating: 92,
      wwcd: 11,
      kd: 4.0,
      notableAchievement: 'PEL Champions & High Point-Yield Compound Assaults',
      status: 'World Rank 6',
    },
    {
      rank: 7,
      name: 'Talon Esports',
      tag: 'TLN',
      region: 'Asia Pacific',
      rating: 91,
      wwcd: 10,
      kd: 3.9,
      notableAchievement: 'PMSL Regional Masters & Elite Vehicle Intercept Formations',
      status: 'World Rank 7',
    },
    {
      rank: 8,
      name: '4AM eSports',
      tag: '4AM',
      region: 'China (PEL)',
      rating: 90,
      wwcd: 9,
      kd: 3.8,
      notableAchievement: 'PMGC Multi-Year Finalists & Disciplined Split Rotations',
      status: 'World Rank 8',
    },
    {
      rank: 9,
      name: 'iQOO SOUL',
      tag: 'SOUL',
      region: 'South Asia (India)',
      rating: 89,
      wwcd: 9,
      kd: 3.8,
      notableAchievement: 'BGIS 2026 Chennai Champions (173 pts) & Global Invite Contender',
      status: 'World Rank 9',
    },
    {
      rank: 10,
      name: 'Alter Ego Ares',
      tag: 'AE',
      region: 'Southeast Asia (Indonesia)',
      rating: 88,
      wwcd: 8,
      kd: 3.7,
      notableAchievement: 'Back-to-Back PMSL SEA Champions & Dense Smoke Maneuvers',
      status: 'World Rank 10',
    },
  ],
  globalPlayers: [
    {
      rank: 1,
      name: 'Carrilho',
      realName: 'Lucas Miguel',
      team: 'Alpha7 Esports',
      teamTag: 'A7',
      region: 'Brazil (Americas)',
      role: 'Fragger',
      kd: 4.8,
      avgDamage: 895,
      finishesPerMatch: 2.4,
      rating: 99,
      signatureWeapon: 'M416 and DBS',
      notableAccolade: 'PMGC World Champion MVP & S-Tier Global Fragger of the Year',
    },
    {
      rank: 2,
      name: 'TonyK',
      realName: 'Nattawut Muensa',
      team: 'Vampire Esports',
      teamTag: 'VPE',
      region: 'Thailand (Southeast Asia)',
      role: 'Fragger',
      kd: 4.6,
      avgDamage: 880,
      finishesPerMatch: 2.3,
      rating: 98,
      signatureWeapon: 'Beryl M762 and M416',
      notableAccolade: 'Two-time PMWI Tournament MVP & Highest Knock Rate in SEA',
    },
    {
      rank: 3,
      name: 'Revo',
      realName: 'Gabriel Henrique',
      team: 'Alpha7 Esports',
      teamTag: 'A7',
      region: 'Brazil (Americas)',
      role: 'All-Rounder',
      kd: 4.4,
      avgDamage: 840,
      finishesPerMatch: 2.1,
      rating: 97,
      signatureWeapon: 'M416 and Mini 14',
      notableAccolade: 'PMWC 2026 Paris Eliminator Distinction & Clutch Anchor',
    },
    {
      rank: 4,
      name: 'Jonathan',
      realName: 'Jonathan Amaral',
      team: 'Hero Xtreme GodLike',
      teamTag: 'GODL',
      region: 'India (South Asia)',
      role: 'Fragger',
      kd: 4.3,
      avgDamage: 865,
      finishesPerMatch: 2.2,
      rating: 96,
      signatureWeapon: 'Beryl M762',
      notableAccolade: 'BMPS 2026 Eliminator & PMWC 2026 Paris Grand Finalist',
    },
    {
      rank: 5,
      name: 'Paraboy',
      realName: 'Zhu Bocheng',
      team: 'Wolves Esports',
      teamTag: 'WOL',
      region: 'China (PEL)',
      role: 'Fragger',
      kd: 4.2,
      avgDamage: 830,
      finishesPerMatch: 2.0,
      rating: 95,
      signatureWeapon: 'M416 and DP-28',
      notableAccolade: '2x Global Championship MVP & Esports Hall of Fame Inductee',
    },
    {
      rank: 6,
      name: 'Reon',
      realName: 'Reon Sugimoto',
      team: 'Reject',
      teamTag: 'RC',
      region: 'Japan (East Asia)',
      role: 'Fragger',
      kd: 4.1,
      avgDamage: 815,
      finishesPerMatch: 1.9,
      rating: 94,
      signatureWeapon: 'M416 and SLR',
      notableAccolade: 'PMGO 2024 Champion MVP & Tactical Flank Specialist',
    },
    {
      rank: 7,
      name: 'Guizão',
      realName: 'Guilherme Mattos',
      team: 'Alpha7 Esports',
      teamTag: 'A7',
      region: 'Brazil (Americas)',
      role: 'Sniper',
      kd: 4.0,
      avgDamage: 790,
      finishesPerMatch: 1.8,
      rating: 93,
      signatureWeapon: 'AWM and Mini 14',
      notableAccolade: 'PMGC World Champion Anchor & Longest Knock Record in Finals',
    },
    {
      rank: 8,
      name: 'Rabiz',
      realName: 'Dinh Duong',
      team: 'D\'Xavier',
      teamTag: 'DX',
      region: 'Vietnam (Southeast Asia)',
      role: 'IGL',
      kd: 3.9,
      avgDamage: 775,
      finishesPerMatch: 1.7,
      rating: 92,
      signatureWeapon: 'M416',
      notableAccolade: 'PMSL SEA Champion Captain & Master of Phase 4 Compounds',
    },
    {
      rank: 9,
      name: 'LEGIT',
      realName: 'Subham Sharma',
      team: 'iQOO SOUL',
      teamTag: 'SOUL',
      region: 'India (South Asia)',
      role: 'Fragger',
      kd: 3.9,
      avgDamage: 824,
      finishesPerMatch: 1.9,
      rating: 91,
      signatureWeapon: 'M416 and Beryl M762',
      notableAccolade: 'BGIS 2026 Grand Finals MVP & Chennai LAN Champion Fragger',
    },
    {
      rank: 10,
      name: 'Suk',
      realName: 'Feng Shujie',
      team: '4AM eSports',
      teamTag: '4AM',
      region: 'China (PEL)',
      role: 'IGL',
      kd: 3.8,
      avgDamage: 760,
      finishesPerMatch: 1.6,
      rating: 90,
      signatureWeapon: 'M416 and Kar98k',
      notableAccolade: 'PMGC World Champion IGL & PEL Veteran Tactical Lead',
    },
  ],
  globalTournaments: [
    {
      name: 'PUBG Mobile World Cup 2026 (Esports World Cup)',
      shortName: 'PMWC 2026',
      tier: 'S-Tier Global Invitational',
      prizePool: 'USD 3,000,000 (~INR 25.2 Crore)',
      location: 'Paris, France',
      dates: 'August 2026',
      champion: 'Alpha7 Esports',
      format: '24 Global Elite Rosters, 18 LAN Finals Matches',
    },
    {
      name: 'PUBG Mobile Global Championship 2026',
      shortName: 'PMGC 2026',
      tier: 'S-Tier World Finale',
      prizePool: 'USD 3,000,000 (~INR 25.2 Crore)',
      location: 'Istanbul, Turkiye',
      dates: 'November to December 2026',
      champion: 'Upcoming',
      format: '48 Teams Group Stage into 16 Team Grand Finals',
    },
    {
      name: 'PUBG Mobile Global Open',
      shortName: 'PMGO',
      tier: 'A-Tier International Open',
      prizePool: 'USD 500,000 (~INR 4.2 Crore)',
      location: 'São Paulo & Tokyo',
      dates: 'Annual Global Open',
      champion: 'Reject (RC)',
      format: 'Open Qualifier Pathway into Main Event',
    },
    {
      name: 'PUBG Mobile Super League (PMSL)',
      shortName: 'PMSL 2026',
      tier: 'Regional Pro Tier 1',
      prizePool: 'USD 250,000 (~INR 2.1 Crore per region)',
      location: 'SEA, Americas, CSA',
      dates: 'Spring & Fall Splits',
      champion: 'D\'Xavier / Alpha7',
      format: 'Multi-week Group Stage, Super Weekends, Finals',
    },
  ],
  indianSquadsGlobal: [
    {
      teamName: 'Hero Xtreme GodLike',
      tag: 'GODL',
      tournament: 'PUBG Mobile World Cup (PMWC) / EWC 2026',
      placement: 'Grand Finals (Paris, France)',
      earnings: 'USD 125,000 (~INR 1.05 Crore)',
      highlight: 'Qualified through BMPS 2026 championship comeback; officially inducted into Esports World Cup Club Partner Program.',
      year: '2026',
    },
    {
      teamName: 'iQOO SOUL',
      tag: 'SOUL',
      tournament: 'PUBG Mobile Global Championship (PMGC) Pathway',
      placement: 'BGIS 2026 Chennai Champion (Seed 1)',
      earnings: 'INR 1,00,00,000',
      highlight: 'Captured 173 points in Chennai Finals; leading contender for South Asia global championship invite.',
      year: '2026',
    },
    {
      teamName: 'Team XSpark',
      tag: 'TX',
      tournament: 'International Invitational Series',
      placement: 'Top 8 Global Seed',
      earnings: 'USD 50,000 (~INR 42 Lakhs)',
      highlight: 'Maintained 38% top-3 placement rate across Miramar ridge duels against international rosters.',
      year: '2025 to 2026',
    },
  ],
  metricComparisons: [
    {
      metric: 'Tournament Total Prize Pool',
      nationalValue: 'INR 2,00,00,000 (BGIS/BMPS)',
      internationalValue: 'USD 3,00,00,00 (~INR 25.2 Crore PMWC/PMGC)',
      unit: 'Currency Scale',
      tacticalImplication: 'Global championships offer 12.6x higher prize distribution per match.',
    },
    {
      metric: 'Phase 4 Alive Squad Density',
      nationalValue: '13.2 Squads',
      internationalValue: '15.6 Squads',
      unit: 'Teams Alive',
      tacticalImplication: 'International lobbies play significantly more reserved, prioritizing late compound fortification over early perimeter frags.',
    },
    {
      metric: 'Utility Density per Squad',
      nationalValue: '11.4 Grenades / Smokes',
      internationalValue: '18.8 Grenades / Smokes',
      unit: 'Consumables',
      tacticalImplication: 'Global teams dedicate vehicle inventory strictly to smokes and molotov cocktails to survive zero-cover zone shifts.',
    },
    {
      metric: 'DMR Weapon Adoption Rate',
      nationalValue: '62% of Rosters',
      internationalValue: '84% of Rosters',
      unit: 'Loadout Percentage',
      tacticalImplication: 'International meta mandates Mini 14 / SLR suppression to deny vehicle rotations from 300+ meters.',
    },
  ],
};

