'use client';
import React from 'react';
import Link from 'next/link';
import { Map, Crosshair, ShieldAlert, Trophy, Zap, Medal, Users, Globe } from 'lucide-react';

const TICKER_ITEMS = [
  { tag: 'VERSION 4.6', tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', text: 'BGMI 4.6 Live (Sep 16): Midnight Hunters Vampire Mode, Ocean Odyssey Returns Sep 30, Kiaraa Original Character & One Punch Man Collab' },
  { tag: 'MIDNIGHT HUNTERS', tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40', text: 'Vampire Mode: Bloodline Awakening Mechanic Active Sep 16 to Nov 16 on Erangel with Claw Strike, Absorb & Silvermoon Chain Gear' },
  { tag: 'KIARAA', tagColor: 'bg-pink-500/20 text-pink-300 border-pink-500/40', text: 'BGMI Introduces Kiaraa: First Original Character Developed by KRAFTON India In-House Art Team (Bazaar on Erangel, Oct 8)' },
  { tag: 'BGIS 2026', tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40', text: 'iQOO SOUL Crowned BGIS 2026 Champions in Chennai (173 Pts / INR 1 Crore) | HunterZ: Tournament MVP | LEGIT: Finals MVP | Nakul: Best IGL' },
  { tag: 'BMPS 2026', tagColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40', text: 'GodLike Wins BMPS 2026 Grand Finals in Jaipur (162 Pts) | ScaryJod: Tournament MVP | Slug: Finals MVP | Jonathan: Eliminator' },
  { tag: 'BMSD 2026', tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', text: 'Battlegrounds Mobile India Showdown 2026 Underway (Sep 22): Champion Earns Direct PMGC 2026 Qualification Slot' },
  { tag: 'ASIAN GAMES', tagColor: 'bg-red-500/20 text-red-300 border-red-500/40', text: 'PUBG Mobile at Asian Games 2026: Event Concluded Sep 28-29 in Aichi, Japan' },
  { tag: 'PMGC 2026', tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40', text: 'PUBG Mobile Global Championship 2026 Scheduled for November-December in Istanbul, Turkiye (USD 3,000,000 Prize Pool)' },
  { tag: 'MAP POOL', tagColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40', text: 'Official 3-Map Competitive Rotation: Erangel, Miramar, Rondo (Livik, Sanhok & Vikendi Excluded from Tier 1 Rulebook)' },
  { tag: 'FREE TOOL', tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', text: 'Esports Points Table & Single Squad Calculator: 100% Free PointCalc Alternative with BGIS 10-Pt and PMCO 15-Pt Rules' },
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
    detail: 'Erangel, Miramar, Rondo',
    description: 'Standard 3-map competitive rotation. Hot-drop threat tiers, high-probability vehicle spawn corridors, and compound fortification points (Livik, Sanhok, Vikendi retired).',
    badge: '3 Competitive Maps',
    color: 'emerald',
    iconBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    badgeStyle: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-950/40',
  },
  {
    href: '/guns',
    icon: Crosshair,
    title: 'Weapon Mechanics and Mastery',
    detail: 'Full Attachment & Damage Benchmark',
    description: 'Empirical damage values, headshot multipliers, bullet velocity ratings, and recoil pull-down builds calibrated for Version 4.6 tournament rifles.',
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
    detail: 'BGIS 2026, BMPS 2026, BMSD 2026, PMGC Istanbul',
    description: 'Completed BGIS/BMPS 2026 brackets, live BMSD 2026 standings, upcoming PMGC Istanbul roster seeds, and verified pro meta loadout strategies.',
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
  {
    href: '/international',
    icon: Globe,
    title: 'International Stats',
    detail: 'Worldwide Team & Player Rankings',
    description: 'Official global rankings from PUBG Mobile esports: World Top 10 team power index, elite international players, PMGC and PMWC world championships.',
    badge: 'Global Circuit',
    color: 'purple',
    iconBg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
    badgeStyle: 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30',
    hoverBorder: 'hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-950/40',
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
            Competitive Telemetry: Season Meta 2026 (v4.6)
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
              <h3 className="text-2xl sm:text-3xl font-black text-white">BGIS, BMPS 2026 Dossier & PMGC 2026 Road</h3>
              <p className="text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
                iQOO SOUL captured the BGIS 2026 title in Chennai (173 pts, INR 1 Crore) while GodLike secured the BMPS 2026 trophy in Jaipur (162 pts) to represent India at PMWC Paris. BMSD 2026 is now live (Sep 22) with its champion earning a direct PMGC 2026 slot in Istanbul (Nov-Dec 2026, USD 3M). Track brackets, scores, and active meta shifts.
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
