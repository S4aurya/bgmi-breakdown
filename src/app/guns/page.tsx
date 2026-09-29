'use client';
import React, { useState } from 'react';
import { WEAPONS, Weapon } from '@/data/bgmi';

const CATEGORIES = ['All', 'AR', 'Sniper', 'DMR', 'SMG', 'Shotgun'] as const;

const RECOIL_BADGE: Record<string, { label: string; class: string }> = {
  Easy:    { label: 'Low Recoil',      class: 'text-emerald-300 bg-emerald-950/70 border-emerald-500/50' },
  Medium:  { label: 'Moderate Recoil', class: 'text-amber-300 bg-amber-950/70 border-amber-500/50' },
  Hard:    { label: 'High Recoil',     class: 'text-orange-300 bg-orange-950/70 border-orange-500/50' },
  Extreme: { label: 'Severe Recoil',   class: 'text-red-300 bg-red-950/70 border-red-500/50' },
};

function StatBar({ label, value, max = 100, barColor = 'bg-orange-500' }: { label: string; value: number; max?: number; barColor?: string }) {
  const percentage = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="flex justify-between text-sm font-mono mb-2">
        <span className="text-slate-300 font-medium">{label}</span>
        <span className="text-white font-black text-base">{value}</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} stat-bar-fill shadow-sm`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function GunsPage() {
  const [cat, setCat] = useState<string>('All');
  const [active, setActive] = useState<Weapon>(WEAPONS[0]);

  const filtered = cat === 'All' ? WEAPONS : WEAPONS.filter(w => w.category === cat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-xs font-mono uppercase tracking-wider text-orange-300 font-bold mb-3">
          Weapon Mechanics
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
          Weapon Mechanics and Mastery
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Empirical damage coefficients, headshot multipliers, effective engagement distances, and optimal attachment builds calibrated for Version 4.6.
        </p>
      </div>

      {/* Category Filter with Rich Colors */}
      <div className="flex flex-wrap gap-2.5 mb-8 border-b border-white/10 pb-6">
        {CATEGORIES.map(c => {
          const isSelected = cat === c;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                isSelected
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-[#121829] border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Weapons List Sidebar */}
        <div className="space-y-3">
          {filtered.map(w => {
            const isSelected = active.id === w.id;
            const recoil = RECOIL_BADGE[w.recoilLevel] || RECOIL_BADGE.Medium;
            return (
              <button
                key={w.id}
                onClick={() => setActive(w)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#17223b] to-[#1a2033] border-orange-500/60 text-white shadow-md'
                    : 'bg-[#121829] border-slate-800 text-slate-300 hover:bg-[#162035] hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-extrabold text-base text-white">{w.name}</div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">{w.category} &middot; {w.ammo}</div>
                </div>
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${recoil.class}`}>
                  {recoil.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Weapon Detail */}
        <div className="lg:col-span-2">
          <div className="p-7 rounded-2xl border border-slate-800 bg-[#121829] space-y-7 shadow-lg">

            {/* Header Readout */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">{active.name}</h2>
                <div className="text-sm font-mono text-slate-400 mt-1.5">
                  Platform: <span className="text-white font-bold">{active.category}</span> &middot; Caliber: <span className="text-amber-400 font-bold">{active.ammo}</span> &middot; Mag: <span className="text-white font-bold">{active.magSize} Rounds</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border ${RECOIL_BADGE[active.recoilLevel]?.class}`}>
                  {RECOIL_BADGE[active.recoilLevel]?.label}
                </span>
                <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold border border-red-500/50 bg-red-950/70 text-red-300 shadow-sm">
                  Headshot: {active.headshotDmg} DMG
                </span>
              </div>
            </div>

            {/* Overview text */}
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              {active.description}
            </p>

            {/* Telemetry Bars with Distinct Vivid Colors */}
            <div className="space-y-5 bg-[#0e1424] p-5 rounded-xl border border-slate-800">
              <StatBar label="Base Torso Damage" value={active.damage} max={110} barColor="bg-gradient-to-r from-red-500 to-rose-500" />
              <StatBar label="Rate of Fire Index" value={active.fireRate} max={100} barColor="bg-gradient-to-r from-orange-500 to-amber-500" />
              <StatBar label="Effective Range Index" value={active.range} max={100} barColor="bg-gradient-to-r from-cyan-500 to-blue-500" />
              <StatBar label="Recoil Stability Index" value={100 - active.recoil} max={100} barColor="bg-gradient-to-r from-emerald-500 to-teal-400" />
            </div>

            {/* Deployment & Attachments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="p-5 rounded-xl border border-orange-500/30 bg-gradient-to-br from-[#151c2e] to-orange-950/20">
                <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-extrabold mb-2">
                  Tactical Role
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">{active.bestFor}</p>
              </div>

              <div className="p-5 rounded-xl border border-blue-500/30 bg-gradient-to-br from-[#151c2e] to-blue-950/20">
                <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-extrabold mb-2">
                  Recommended Attachments
                </div>
                <ul className="space-y-1.5 text-sm text-slate-200">
                  {active.attachments.map(att => (
                    <li key={att} className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span>{att}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
