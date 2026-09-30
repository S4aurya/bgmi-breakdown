'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Map, Crosshair, ShieldAlert, Trophy, Zap, Medal, Users, Globe } from 'lucide-react';

/* ── Ticker data ── */
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

/* ── Module cards ── */
const SECTIONS = [
  { href: '/team-stats', icon: Users,      title: 'Team Stats & Points Calculator',  detail: 'PointCalc Alternative: 100% Free',         description: 'Calculate multi-match points tables, BGIS 10-point vs Classic 15-point rules, individual MVP fraggers, and custom slot lists.',          badge: '100% Free Tool',         iconBg: 'bg-blue-500/15 border-blue-500/30 text-blue-400',     badgeStyle: 'bg-blue-950/60 text-blue-300 border-blue-500/30',     hoverBorder: 'hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-950/50' },
  { href: '/maps',       icon: Map,        title: 'Maps and Drop Strategy',           detail: 'Erangel, Miramar, Rondo',                  description: 'Hot-drop threat tiers, high-probability vehicle spawn corridors, and compound fortification points for all 3 competitive maps.',          badge: '3 Competitive Maps',     iconBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400', badgeStyle: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30', hoverBorder: 'hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-950/50' },
  { href: '/guns',       icon: Crosshair,  title: 'Weapon Mechanics and Mastery',    detail: 'Full Attachment & Damage Benchmark',        description: 'Empirical damage values, headshot multipliers, bullet velocity ratings, and recoil builds calibrated for Version 4.6.',               badge: '8 Primary Weapons',      iconBg: 'bg-orange-500/15 border-orange-500/30 text-orange-400',  badgeStyle: 'bg-orange-950/60 text-orange-300 border-orange-500/30',  hoverBorder: 'hover:border-orange-500/60 hover:shadow-lg hover:shadow-orange-950/50' },
  { href: '/zones',      icon: ShieldAlert, title: 'Zone Timing & DPS Index',        detail: 'Phases 1 Through 8 Metrics',               description: 'Exact shrink countdowns, blue boundary damage per second, and critical rotation safety thresholds.',                                badge: '8 Circle Phases',        iconBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',       badgeStyle: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',       hoverBorder: 'hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-950/50' },
  { href: '/esports',    icon: Trophy,     title: 'Esports Tournament Tracker',      detail: 'BGIS, BMPS, BMSD 2026 & PMGC Istanbul',    description: 'Completed BGIS/BMPS brackets, live BMSD 2026 standings, PMGC Istanbul seeds, and pro meta loadout strategies.',                      badge: 'Official Krafton Circuit', iconBg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',   badgeStyle: 'bg-amber-950/60 text-amber-300 border-amber-500/30',   hoverBorder: 'hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-950/50' },
  { href: '/rankings',   icon: Medal,      title: 'National Player Rankings',        detail: 'Top 10 Indian Professional Athletes',       description: 'Verified tournament KD ratings, average damage outputs, round finish averages, and signature loadouts for current season.',          badge: 'Top 10 Verified',        iconBg: 'bg-pink-500/15 border-pink-500/30 text-pink-400',       badgeStyle: 'bg-pink-950/60 text-pink-300 border-pink-500/30',       hoverBorder: 'hover:border-pink-500/60 hover:shadow-lg hover:shadow-pink-950/50' },
  { href: '/sensitivity', icon: Zap,       title: 'Sensitivity Calibration',         detail: 'Claw & Gyroscope Presets',                 description: 'Pro configurations from Manya (GodLike) and Jonathan (TAG), calibrated camera panning angles, and ADS drag ratios.',            badge: '3 Device Profiles',      iconBg: 'bg-purple-500/15 border-purple-500/30 text-purple-400', badgeStyle: 'bg-purple-950/60 text-purple-300 border-purple-500/30', hoverBorder: 'hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-950/50' },
  { href: '/international', icon: Globe,   title: 'International Stats',             detail: 'Worldwide Team & Player Rankings',          description: 'Global rankings from PUBG Mobile esports: World Top 10 power index, elite international players, PMGC and PMWC championships.',  badge: 'Global Circuit',         iconBg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400', badgeStyle: 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30', hoverBorder: 'hover:border-indigo-500/60 hover:shadow-lg hover:shadow-indigo-950/50' },
];

const LIVE_STATS = [
  { label: 'KIE Rank #1',        value: 'Jonathan',  sub: '137 pts · Team Apex Gaming', color: 'text-orange-400' },
  { label: 'BGIS 2026 Champion', value: 'iQOO SOUL', sub: '173 pts · Chennai LAN',       color: 'text-emerald-400' },
  { label: 'BMPS 2026 Champion', value: 'GodLike',   sub: '162 pts · Jaipur LAN',        color: 'text-amber-400' },
  { label: 'Active Tournament',  value: 'BMSD 2026', sub: 'Sep 22 – Oct 18 · INR 1 Cr', color: 'text-cyan-400' },
] as const;

/* ── Canvas Particle System ── */
function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; maxLife: number; color: string; glow: string; type: 'ember' | 'spark' | 'dust' };
    const particles: P[] = [];

    const EMBER_COLORS = [
      ['#f97316','#f97316'], ['#fb923c','#f97316'], ['#fbbf24','#f59e0b'],
      ['#06b6d4','#0891b2'], ['#22d3ee','#06b6d4'], ['#a78bfa','#7c3aed'],
      ['#f0f9ff','#7dd3fc'],
    ];

    const spawn = () => {
      const [color, glow] = EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)];
      const type: P['type'] = Math.random() < 0.5 ? 'ember' : Math.random() < 0.7 ? 'spark' : 'dust';
      let x: number, y: number, vx: number, vy: number, r: number, maxLife: number;

      if (type === 'ember') {
        x = Math.random() * canvas.width;
        y = canvas.height + 10;
        vx = (Math.random() - 0.5) * 1.6;
        vy = -(Math.random() * 2.5 + 0.8);
        r  = Math.random() * 2.5 + 0.8;
        maxLife = Math.random() * 180 + 80;
      } else if (type === 'spark') {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height * 0.7 + canvas.height * 0.15;
        vx = (Math.random() - 0.5) * 4;
        vy = (Math.random() - 0.5) * 4;
        r  = Math.random() * 1.5 + 0.5;
        maxLife = Math.random() * 60 + 20;
      } else {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
        vx = (Math.random() - 0.5) * 0.6;
        vy = (Math.random() - 0.5) * 0.6;
        r  = Math.random() * 3.5 + 1.5;
        maxLife = Math.random() * 300 + 150;
      }

      particles.push({ x, y, vx, vy, r, life: 0, maxLife, color, glow, type });
    };

    // Pre-populate
    for (let i = 0; i < 80; i++) spawn();

    let frame = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (frame % 2 === 0) spawn();
      frame++;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.type === 'ember') p.vx += (Math.random() - 0.5) * 0.12;
        p.life++;

        const ratio = p.life / p.maxLife;
        const alpha = p.type === 'dust'
          ? (ratio < 0.2 ? ratio / 0.2 : ratio > 0.8 ? (1 - ratio) / 0.2 : 1) * 0.35
          : (1 - ratio) * (p.type === 'spark' ? 0.9 : 0.75);

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);

        if (p.type === 'ember') {
          ctx.shadowColor = p.glow;
          ctx.shadowBlur  = 18;
          ctx.fillStyle   = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          // Tail
          ctx.globalAlpha = Math.max(0, alpha * 0.4);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 6, p.y - p.vy * 6);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.r * 0.6;
          ctx.stroke();
        } else if (p.type === 'spark') {
          ctx.shadowColor = p.glow;
          ctx.shadowBlur  = 12;
          ctx.strokeStyle = p.color;
          ctx.lineWidth   = p.r;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 4, p.y - p.vy * 4);
          ctx.stroke();
        } else {
          ctx.shadowColor = p.glow;
          ctx.shadowBlur  = 30;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          grad.addColorStop(0, p.color + 'AA');
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        if (p.life >= p.maxLife || p.y < -20) particles.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
}

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);

  return (
    <div className="pb-24">

      {/* ── News Ticker ── */}
      <div className="bg-[#080c14] border-b border-cyan-500/20 py-3 overflow-hidden" aria-label="Competitive Bulletin">
        <div className="ticker-track flex gap-14 w-max">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-mono text-slate-200 whitespace-nowrap shrink-0">
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${item.tagColor}`}>{item.tag}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          HERO SECTION — FULL BGMI BATTLEFIELD
          ══════════════════════════════════════ */}
      <section className="hero-section">

        {/* Layer 0: Sky atmosphere */}
        <div className="hero-sky" />

        {/* Layer 1: Tactical grid */}
        <div className="hero-grid" />

        {/* Layer 2: Canvas particles (embers, sparks, dust) */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Layer 3: Smoke orbs */}
        <div className="smoke-orb smoke-orb-1" />
        <div className="smoke-orb smoke-orb-2" />
        <div className="smoke-orb smoke-orb-3" />
        <div className="smoke-orb smoke-orb-4" />

        {/* Layer 3: Terrain silhouette & floor glow */}
        <div className="terrain" />
        <div className="terrain-glow" />

        {/* Layer 3: Blue Zone fill + rings */}
        <div className="zone-glow" />
        <div className="zone-ring zone-ring-1" />
        <div className="zone-ring zone-ring-2" />
        <div className="zone-ring zone-ring-3" />

        {/* Layer 4: Plane flyby + trail */}
        <div className="plane-trail" />
        <div className="plane" />

        {/* Layer 4: Supply drop parachutes */}
        <div className="supply-drop" />
        <div className="supply-drop-line" />

        {/* Layer 4: Real parachute chutes */}
        <div className="chute chute-1">
          <div className="chute-canopy" />
          <div className="chute-lines" />
          <div className="chute-crate" />
        </div>
        <div className="chute chute-2">
          <div className="chute-canopy" />
          <div className="chute-lines" />
          <div className="chute-crate" />
        </div>
        <div className="chute chute-3">
          <div className="chute-canopy" />
          <div className="chute-lines" />
          <div className="chute-crate" />
        </div>
        <div className="chute chute-4">
          <div className="chute-canopy" />
          <div className="chute-lines" />
          <div className="chute-crate" />
        </div>

        {/* Layer 4: Bullet tracers */}
        <div className="tracer tracer-1" />
        <div className="tracer tracer-2" />
        <div className="tracer tracer-3" />
        <div className="tracer tracer-4" />
        <div className="tracer tracer-5" />

        {/* Layer 5: Airdrop beacon */}
        <div className="airdrop-beacon">
          <div className="beacon-dot" />
        </div>

        {/* Layer 5: Vignette */}
        <div className="vignette" />

        {/* Layer 6: Scanlines */}
        <div className="scanlines" />

        {/* Layer 7: Radar HUD */}
        <div className="radar-hud">
          <div className="radar-bg" />
          <div className="radar-ring radar-ring-1" />
          <div className="radar-ring radar-ring-2" />
          <div className="radar-crosshair-h" />
          <div className="radar-crosshair-v" />
          <div className="radar-sweep-line" />
          <div className="radar-blip blip-1" />
          <div className="radar-blip blip-2" />
          <div className="radar-blip blip-3" />
          <div className="radar-label">MINIMAP</div>
        </div>

        {/* ── Hero Content — z-index 10 ── */}
        <div className="hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 flex-1 flex flex-col justify-center">
          <div className="max-w-4xl">

            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/40 text-xs sm:text-sm font-mono text-orange-300 font-bold uppercase tracking-wider mb-7 shadow-sm">
              <span className="live-dot w-2.5 h-2.5 rounded-full bg-orange-400" />
              Live Season Meta 2026 (v4.6) — BGMI Midnight Hunters Active
            </div>

            {/* Title */}
            <h1 className="hero-title-glow text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase leading-[1.04] mb-7">
              Battlegrounds<br />
              Mobile India{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                Tactical Intel
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-slate-300/90 leading-relaxed mb-11 max-w-3xl font-normal">
              Verified weapon benchmarks, competitive drop zones, blue zone DPS thresholds, pro tournament analytics, and a 100% free Points Table Calculator.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <Link href="/team-stats" className="btn-primary-glow px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-base font-extrabold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                Points Table &amp; Team Stats (Free)
              </Link>
              <Link href="/guns" className="btn-primary-glow px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white text-base font-extrabold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
                Inspect Weapon Arsenal
              </Link>
              <Link href="/zones" className="px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 text-white text-base font-extrabold tracking-wide border border-slate-600 hover:border-cyan-500/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
                View Zone Timings
              </Link>
              <Link href="/rankings" className="px-7 py-4 rounded-xl bg-pink-950/40 hover:bg-pink-900/60 text-pink-300 border border-pink-500/30 hover:border-pink-400/60 text-base font-bold transition-all">
                Top 10 Pro Rankings
              </Link>
            </div>

            {/* Live Intel Stats Bar */}
            <div className="flex flex-wrap gap-8 border-t border-white/[0.10] pt-8">
              {LIVE_STATS.map((s, i) => (
                <div key={s.label} className="stat-glow flex flex-col gap-1 min-w-[140px]" style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-slate-500">{s.label}</div>
                  <div className={`text-base font-black ${s.color} drop-shadow-[0_0_8px_currentColor]`}>{s.value}</div>
                  <div className="text-[11px] font-mono text-slate-400">{s.sub}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Tactical Modules Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/[0.08]">
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
              <Link key={sec.href} href={sec.href}
                className={`group p-6 rounded-2xl border border-slate-800/90 bg-[#0f1624]/90 ${sec.hoverBorder} transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${sec.iconBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wide">{sec.detail}</span>
                    </div>
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${sec.badgeStyle}`}>{sec.badge}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-3 group-hover:text-orange-400 transition-colors">{sec.title}</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">{sec.description}</p>
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

      {/* ── Free PointCalc Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/50 via-[#0f1624] to-cyan-950/30 p-8 sm:p-10 shadow-xl shadow-blue-950/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-xs font-mono uppercase tracking-wider text-blue-300 font-bold mb-3">
                PointCalc Alternative: 100% Free
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Full Esports Points Table &amp; Standings Calculator</h3>
              <p className="text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
                Automated multi-match calculation with official BGIS 10-point and PMCO 15-point rules, individual MVP tracker, and slot list manager. Export standings for WhatsApp or Discord in one click.
              </p>
            </div>
            <Link href="/team-stats" className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-black tracking-wide transition-all shadow-lg shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
              Open Points Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tournament Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/50 via-[#0f1624] to-orange-950/30 p-8 sm:p-10 shadow-xl shadow-amber-950/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-3">
                Official Krafton Tournament Telemetry
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">BGIS, BMPS 2026 Dossier &amp; PMGC 2026 Road</h3>
              <p className="text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
                iQOO SOUL captured BGIS 2026 in Chennai (173 pts, INR 1 Crore) while GodLike secured BMPS 2026 in Jaipur (162 pts). BMSD 2026 is live (Sep 22) with the champion earning a direct PMGC Istanbul slot (Nov-Dec 2026, USD 3M).
              </p>
            </div>
            <Link href="/esports" className="shrink-0 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-black tracking-wide transition-all shadow-lg shadow-amber-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
              Open Tournament Standings
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
