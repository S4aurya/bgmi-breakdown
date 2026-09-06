# BGMI Breakdown

> **Tactical Intelligence Dossier & Esports Analytics Platform for Battlegrounds Mobile India.**

BGMI Breakdown is a modern web application built for competitive BGMI players, squad leaders, and esports tournament organizers. It features verified weapon telemetry, drop zone strategy, zone collapse timings, pro player rankings, and an automated **Tournament Points Calculator** inspired by PointCalc with match result screenshot analysis.

---

## Features

### 1. Team Stats & Points Calculator (`/team-stats`)
- **Screenshot Analyzer**: Upload post-match end-game scoreboard screenshots to automatically extract team placement, kills, damage, rescues, and survival times.
- **Rule Engine**:
  - Official BGIS / BMPS 10-Point System
  - Classic PMCO 15-Point System
- **Automated Standings**: Tiebreaker sorting (Total Points &rarr; WWCD &rarr; Kills) with podium medal badges.
- **Player Performance & MVP Tracker**: Individual kill matrix, damage outputs, revives, and automated Match MVP scoring.
- **Export Tools**: One-click copy formatted for Discord/WhatsApp scrim announcements, plus CSV download.
- **100% Free**: Unlimited matches, zero paywalls or subscriptions.

### 2. Maps & Hot Drops (`/maps`)
- Interactive tactical guides for all 5 competitive environments: **Erangel**, **Miramar**, **Sanhok**, **Livik**, and **Rondo**.
- Loot tier classifications (S/A/B), threat ratings, vehicle logistics corridors, and compound fortification points.

### 3. Weapons & Recoil Telemetry (`/guns`)
- Ballistics lab with category filters (AR, Sniper, DMR, SMG, Shotgun).
- Empirical damage metrics, headshot multipliers, rate of fire, effective ranges, and optimal attachment builds.

### 4. Zone Timers & Blue DPS (`/zones`)
- Phase 1 through 8 collapse timeline.
- Boundary shrinkage intervals, blue zone damage per second (DPS) thresholds, and rotational doctrines.

### 5. Esports Tournament Tracker (`/esports`)
- Active and upcoming tournament circuits (BGIS 2026, BMPS Season 4, PMGC 2026).
- Team rosters, seeds, formats, and pro meta weapon combinations.

### 6. National Pro Player Rankings (`/rankings`)
- Top 10 Indian professional esports athletes ranked with verified tournament KD ratios, average damage, round finish consistency, and signature loadouts.

### 7. Sensitivity Calibration (`/sensitivity`)
- Calibrated claw and gyroscope presets (Manya, Jonathan, and beginner baselines) for free-look, ADS, and gyroscope tilt.

---

## Tech Stack

- **Framework**: [Next.js 16 (App Router + Turbopack)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Design Standard**: High-contrast dark theme adhering to Antislop craftsmanship principles.

---

## Getting Started

### Prerequisites
- Node.js 18.18+ or later
- npm or pnpm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/S4aurya/bgmi-breakdown.git

# Navigate into project directory
cd bgmi-breakdown

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build
```bash
npm run build
npm run start
```

---

## Community & Author

- **Curator**: Disaster ([@disasterplayzzzz](https://www.instagram.com/disasterplayzzzz?stkn=NjFjaGN0eGpxMTRz))
- **Disclaimer**: Community-driven tactical handbook. Not affiliated with Krafton, Inc.
