'use client';
import React from 'react';
import Link from 'next/link';
import { Map, Crosshair, ShieldAlert, Trophy, Zap, Medal, Users, Globe, TrendingUp, Award, ArrowRight, Shield } from 'lucide-react';
import { INTERNATIONAL_STATS } from '@/data/bgmi';

const TICKER_ITEMS = [
  { tag: 'BGIS 2026', tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', text: 'iQOO SOUL Crowned BGIS 2026 Champions in Chennai (173 Pts / INR 1 Crore / 600K+ Peak CCV)' },
  { tag: 'BMPS 2026', tagColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40', text: 'Hero Xtreme GodLike Captures First BMPS Trophy; Secures Direct PMWC Paris Slot' },
  { tag: 'GLOBAL EWC', tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40', text: 'GodLike Esports Represents India at PMWC (Esports World Cup) in Paris: USD 3,000,000 Purse' },
  { tag: 'MAP POOL', tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', text: 'Official 4-Map Competitive Rotation Active: Erangel, Miramar, Rondo, Livik (Sanhok & Vikendi Retired)' },
  { tag: 'BGIS MVP', tagColor: 'bg-pink-500/20 text-pink-300 border-pink-500/40', text: 'HunterZ (Genesis) Awarded BGIS 2026 Tournament MVP; LEGIT (SOUL) Named Finals MVP' },
  { tag: 'ELIMINATOR', tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40', text: 'Jonathan Secures BMPS 2026 Eliminator Distinction with 8.4 Tournament KD High' },
  { tag: 'GRASSROOTS', tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40', text: 'HEXVORA Crowned Champions of Inaugural Krafton Naye Khiladi 2026' },
  { tag: 'CIRCUIT 2026', tagColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40', text: 'PMGC 2026 Global Finale Announced with USD 3,000,000 (~INR 25.2 Crore) Purse' },
  { tag: 'FREE TOOL', tagColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40', text: 'Esports Points Table & Single Squad Calculator: 100% Free PointCalc Alternative' },
];

const SECTIONS = [
  {
    href: '/team-stats',
    icon: Users,
    title: 'Team Stats & Points Calculator',
    detail: 'PointCalc Alternative: 100% Free',
    description: 'Calculate multi-match points tables, BGIS 10-point vs Classic 15-point rules, individual MVP fraggers, and custom slot lists with one-click export.',
    badge: '100% Free Tool',
    color: 'blue',
    iconBg: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
    badgeStyle: 'bg-blue-950/60 text-blue-300 border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-950/40',
  },
  {
    href: '/maps',
    icon: Map,
    title: 'Maps and Drop Strategy',
    detail: 'Erangel, Miramar, Rondo, Livik',
    description: 'Standard 4-map competitive rotation. Hot-drop threat tiers, high-probability vehicle spawn corridors, and compound fortification points (Sanhok and Vikendi retired).',
    badge: '4 Competitive Maps',
    color: 'emerald',
    iconBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    badgeStyle: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-950/40',
  },
  {
    href: '/guns',
    icon: Crosshair,
    title: 'Weapon Telemetry & Recoil',
    detail: 'Full Attachment & Damage Benchmark',
    description: 'Empirical damage values, headshot multipliers, bullet velocity ratings, and recoil pull-down builds for tournament rifles.',
    badge: '8 Primary Weapons',
    color: 'orange',
    iconBg: 'bg-orange-500/15 border-orange-500/30 text-orange-400',
    badgeStyle: 'bg-orange-950/60 text-orange-300 border-orange-500/30',
    hoverBorder: 'hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-950/40',
  },
  {
    href: '/zones',
    icon: ShieldAlert,
    title: 'Zone Timing & DPS Index',
    detail: 'Phases 1 Through 8 Metrics',
    description: 'Exact shrink countdowns, blue boundary damage per second, and critical boundary rotation safety thresholds.',
    badge: '8 Circle Phases',
    color: 'cyan',
    iconBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
    badgeStyle: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-950/40',
  },
  {
    href: '/esports',
    icon: Trophy,
    title: 'Esports Tournament Tracker',
    detail: 'BGIS 2026, BMPS 2026, PMWC Paris',
    description: 'Live tournament brackets, team rosters, seed distributions, and verified pro meta loadout strategies.',
    badge: 'Official Krafton Circuit',
    color: 'amber',
    iconBg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    badgeStyle: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-950/40',
  },
  {
    href: '/rankings',
    icon: Medal,
    title: 'National Player Rankings',
    detail: 'Top 10 Indian Professional Athletes',
    description: 'Verified tournament KD ratings, average damage outputs, round finish averages, and signature loadouts.',
    badge: 'Top 10 Verified',
    color: 'pink',
    iconBg: 'bg-pink-500/15 border-pink-500/30 text-pink-400',
    badgeStyle: 'bg-pink-950/60 text-pink-300 border-pink-500/30',
    hoverBorder: 'hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-950/40',
  },
  {
    href: '/sensitivity',
    icon: Zap,
    title: 'Sensitivity Calibration',
    detail: 'Claw & Gyroscope Presets',
    description: 'Pro configurations from Manya and Jonathan, calibrated camera panning angles, and ADS drag ratios.',
    badge: '3 Device Profiles',
    color: 'purple',
    iconBg: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
    badgeStyle: 'bg-purple-950/60 text-purple-300 border-purple-500/30',
    hoverBorder: 'hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-950/40',
  },
];

export default function HomePage() {
  return (
    <div className="pb-24">

      {/* ── Operational Ticker (Enhanced text size & rich colored tags) ── */}
      <div className="bg-[#0e1422] border-b border-white/10 py-3 overflow-hidden" aria-label="Competitive Bulletin">
        <div className="ticker-track flex gap-14 w-max">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-mono text-slate-200 whitespace-nowrap shrink-0">
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${item.tagColor}`}>
                {item.tag}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hero Briefing (Large fonts, high contrast, vibrant accents) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs sm:text-sm font-mono text-orange-300 font-bold uppercase tracking-wider mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            Competitive Telemetry: Season Meta 2026
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[1.08] mb-6">
            Battlegrounds Mobile India{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              Tactical Intel
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-slate-300 leading-relaxed mb-10 max-w-3xl font-normal">
            Verified weapon recoil benchmarks, competitive map drop zones, blue zone DPS timing thresholds, pro tournament analytics, and a 100% free esports Points Table Calculator.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/team-stats"
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-base font-extrabold tracking-wide transition-all shadow-lg shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Points Table & Team Stats (Free)
            </Link>
            <Link
              href="/guns"
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-base font-extrabold tracking-wide transition-all shadow-lg shadow-orange-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              Inspect Weapon Arsenal
            </Link>
            <Link
              href="/zones"
              className="px-7 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white text-base font-extrabold tracking-wide border border-slate-700 hover:border-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              View Zone Timings
            </Link>
            <Link
              href="/rankings"
              className="px-6 py-4 rounded-xl bg-pink-950/40 hover:bg-pink-900/50 text-pink-300 border border-pink-500/30 hover:border-pink-500/60 text-base font-bold transition-all"
            >
              Top 10 Pro Rankings
            </Link>
          </div>
        </div>
      </section>

      {/* ── Structured Tactical Index (7 Modules) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">Tactical Modules</h2>
            <p className="text-sm font-mono text-slate-400 mt-1">Select an intelligence dossier to view verified data</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link
                key={sec.href}
                href={sec.href}
                className={`group p-6 rounded-2xl border border-slate-800/90 bg-[#121829] ${sec.hoverBorder} transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${sec.iconBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wide">{sec.detail}</span>
                    </div>
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${sec.badgeStyle}`}>
                      {sec.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {sec.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {sec.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono font-bold text-slate-400 group-hover:text-white transition-colors">
                  <span>Open Module</span>
                  <span className="text-orange-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── International Stats & Global Circuit Standings (3-Column Telemetry Dashboard) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10" aria-label="International Stats & Global Circuit">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-mono uppercase tracking-wider text-purple-300 font-bold mb-2.5">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              Global Circuit Telemetry
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              International Stats & Global Standings
            </h2>
            <p className="text-sm sm:text-base font-normal text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Official Krafton international data comparing Indian squads on the world stage against Tier 1 international powerhouses (PMWC Esports World Cup, PMGC, and PMSL).
            </p>
          </div>
          <Link
            href="/esports"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-400 hover:text-purple-300 transition-colors shrink-0"
          >
            <span>Full Esports Tracker</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Tactical Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Column 1: Indian Squads on Global Stage */}
          <div className="rounded-2xl border border-purple-500/30 bg-[#121829] p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">India on Global Stage</h3>
                    <div className="text-xs font-mono text-purple-300">PMWC Paris & PMGC Pathway</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/70 border border-purple-500/30 text-purple-300 font-bold">
                  Active Seeds
                </span>
              </div>

              <div className="space-y-4">
                {INTERNATIONAL_STATS.indianSquadsGlobal.map((squad) => (
                  <div key={squad.teamName} className="p-4 rounded-xl border border-slate-800 bg-[#0d1322]">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-black text-white text-base">{squad.teamName}</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {squad.tag}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-amber-400 font-bold mb-1">
                      {squad.tournament}
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                      <span>Result: <strong className="text-white">{squad.placement}</strong></span>
                      <span className="text-emerald-400 font-bold">{squad.earnings}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {squad.highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Total Global Purse</span>
              <span className="text-purple-300 font-bold">{INTERNATIONAL_STATS.totalGlobalPrizePurse}</span>
            </div>
          </div>

          {/* Column 2: World Power Rankings */}
          <div className="rounded-2xl border border-blue-500/30 bg-[#121829] p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">World Power Rankings</h3>
                    <div className="text-xs font-mono text-blue-300">Krafton Global Rating Index</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950/70 border border-blue-500/30 text-blue-300 font-bold">
                  Top 6 Elite
                </span>
              </div>

              <div className="space-y-2.5">
                {INTERNATIONAL_STATS.globalRankings.map((team) => (
                  <div
                    key={team.name}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                      team.tag === 'GODL'
                        ? 'border-orange-500/40 bg-orange-950/20'
                        : 'border-slate-800/90 bg-[#0d1322]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg text-xs font-mono font-black flex items-center justify-center ${
                        team.rank === 1
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : team.rank === 2
                          ? 'bg-slate-300 text-slate-950 font-black'
                          : team.rank === 3
                          ? 'bg-amber-700 text-white font-black'
                          : 'bg-slate-900 border border-slate-700 text-slate-300'
                      }`}>
                        {team.rank}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-sm">{team.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">[{team.region.split(' ')[0]}]</span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[190px]">
                          {team.notableAchievement}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-bold text-amber-400">Rating {team.rating}</div>
                      <div className="text-[10px] font-mono text-slate-400">{team.wwcd} WWCD &middot; KD {team.kd}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Circuit Status</span>
              <span className="text-blue-300 font-bold">{INTERNATIONAL_STATS.activeGlobalCircuit}</span>
            </div>
          </div>

          {/* Column 3: National vs Global Telemetry Benchmarks */}
          <div className="rounded-2xl border border-emerald-500/30 bg-[#121829] p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">National vs Global Telemetry</h3>
                    <div className="text-xs font-mono text-emerald-300">Benchmark Discrepancy Index</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 font-bold">
                  Verified Data
                </span>
              </div>

              <div className="space-y-3.5">
                {INTERNATIONAL_STATS.metricComparisons.map((item) => (
                  <div key={item.metric} className="p-3.5 rounded-xl border border-slate-800 bg-[#0d1322]">
                    <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                      {item.metric}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">India Circuit</div>
                        <div className="text-xs font-mono font-black text-orange-400 mt-0.5">{item.nationalValue}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Global Tier 1</div>
                        <div className="text-xs font-mono font-black text-cyan-400 mt-0.5">{item.internationalValue}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {item.tacticalImplication}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Telemetry Source</span>
              <span className="text-emerald-300 font-bold">Krafton Esports Official</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Free PointCalc Feature Highlight Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-[#141b2c] to-cyan-950/30 p-8 sm:p-10 shadow-lg shadow-blue-950/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-xs font-mono uppercase tracking-wider text-blue-300 font-bold mb-3">
                PointCalc Alternative: 100% Free
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Full Esports Points Table & Standings Calculator</h3>
              <p className="text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
                Automated multi-match calculation with official BGIS 10-point and PMCO 15-point rules, individual MVP tracker, and slot list manager. Export standings for WhatsApp or Discord in one click. Zero subscriptions or paywalls.
              </p>
            </div>
            <Link
              href="/team-stats"
              className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-black tracking-wide transition-all shadow-md shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Open Points Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* ── Operational Tournament Banner with Rich Gold/Amber Palette ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-[#141b2c] to-orange-950/30 p-8 sm:p-10 shadow-lg shadow-amber-950/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-3">
                Official Krafton Tournament Telemetry
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">BGIS & BMPS 2026 Championship Dossier</h3>
              <p className="text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
                iQOO SOUL captured the BGIS 2026 title in Chennai (173 pts, INR 1 Crore) while Hero Xtreme GodLike secured the BMPS 2026 trophy to represent India at the PMWC 2026 (Esports World Cup) in Paris. Track verified tournament brackets, scores, and active meta shifts.
              </p>
            </div>
            <Link
              href="/esports"
              className="shrink-0 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-black tracking-wide transition-all shadow-md shadow-amber-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              Open Tournament Standings
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
