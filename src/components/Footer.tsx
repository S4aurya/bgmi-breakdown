import React from 'react';
import Link from 'next/link';
import { Map, Crosshair, ShieldAlert, Trophy, Zap, Medal, Users, Globe } from 'lucide-react';

function InstagramIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const QUICK_LINKS = [
  { href: '/maps',          label: 'Maps and Drop Hotspots',     icon: Map,         color: 'text-emerald-400' },
  { href: '/guns',          label: 'Weapon Mechanics & Mastery', icon: Crosshair,   color: 'text-orange-400' },
  { href: '/zones',         label: 'Zone Timers and Blue DPS',   icon: ShieldAlert, color: 'text-cyan-400' },
  { href: '/esports',       label: 'Esports and Meta Zone',      icon: Trophy,      color: 'text-amber-400' },
  { href: '/team-stats',    label: 'Team Stats and Points Calc', icon: Users,       color: 'text-blue-400' },
  { href: '/international', label: 'International Global Stats', icon: Globe,       color: 'text-indigo-400' },
  { href: '/rankings',      label: 'Pro Player Rankings',        icon: Medal,       color: 'text-pink-400' },
  { href: '/sensitivity',   label: 'Sensitivity Calibration',    icon: Zap,         color: 'text-purple-400' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080b13] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand Dossier */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white font-black text-base flex items-center justify-center shadow-sm shadow-orange-500/30">
                B
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">BGMI Breakdown</span>
            </div>
            <p className="text-base text-slate-300 leading-relaxed max-w-sm">
              Tactical reference manual for competitive Battlegrounds Mobile India. Zone analytics, weapon benchmarks, and pro tournament telemetry.
            </p>

            {/* Verified Profile Card with Signature Colors */}
            <a
              href="https://www.instagram.com/disasterplayzzzz?stkn=NjFjaGN0eGpxMTRz"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3.5 px-4 py-3 rounded-xl border border-pink-500/30 bg-gradient-to-r from-pink-950/30 via-purple-950/20 to-orange-950/30 hover:border-pink-500/60 hover:from-pink-950/50 hover:to-orange-950/50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">Disaster</div>
                <div className="text-xs font-mono text-pink-300/80">@disasterplayzzzz</div>
              </div>
            </a>
          </div>

          {/* Quick Links with Colored Icons and Larger Text */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-5">
              Tactical Index
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ href, label, icon: Icon, color }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 rounded py-0.5"
                  >
                    <Icon className={`w-4 h-4 ${color} group-hover:scale-110 transition-transform`} />
                    <span className="group-hover:translate-x-1 transition-transform">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Metadata Specifications */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-5">
              System Specifications
            </h3>
            <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>Target Game: Battlegrounds Mobile India</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                <span>Tournament Scope: BGIS 2026, BMPS 2026, PMWC Paris, and PMGC</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span>Competitive Maps: 3 Active (Erangel, Miramar, Rondo)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>Version: 4.5 Live (Upcoming 4.6 Midnight Hunters)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                <span>Official Source: <a href="https://kraftonindiaesports.com" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline font-medium">kraftonindiaesports.com</a></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Attribution */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <span>Official tournament telemetry sourced via <a href="https://kraftonindiaesports.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white underline">Krafton India Esports</a>.</span>
          <span className="font-medium text-slate-300">Curated by Disaster</span>
        </div>
      </div>
    </footer>
  );
}
