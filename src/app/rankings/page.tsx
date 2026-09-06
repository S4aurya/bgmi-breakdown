'use client';
import React, { useState } from 'react';
import { TOP_PLAYERS, Player } from '@/data/bgmi';

const ROLES = ['All', 'Fragger', 'IGL', 'Sniper', 'Support', 'All-Rounder'] as const;

const ROLE_BADGE: Record<string, string> = {
  Fragger:       'text-red-300 bg-red-950/70 border-red-500/50',
  IGL:           'text-blue-300 bg-blue-950/70 border-blue-500/50',
  Sniper:        'text-amber-300 bg-amber-950/70 border-amber-500/50',
  Support:       'text-emerald-300 bg-emerald-950/70 border-emerald-500/50',
  'All-Rounder': 'text-purple-300 bg-purple-950/70 border-purple-500/50',
};

export default function RankingsPage() {
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [selected, setSelected] = useState<Player>(TOP_PLAYERS[0]);

  const filtered = roleFilter === 'All'
    ? TOP_PLAYERS
    : TOP_PLAYERS.filter(p => p.role === roleFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header with Larger Font */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono uppercase tracking-wider text-pink-300 font-bold mb-3">
          Competitive Standings
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
          National Pro Player Rankings
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Top 10 ranked Indian athletes based on verified tournament KD ratio, round finish consistency, and tactical impact.
        </p>
      </div>

      {/* Role Filter with Rich Colors */}
      <div className="flex flex-wrap gap-2.5 mb-10 border-b border-white/10 pb-6">
        {ROLES.map(r => {
          const isSelected = roleFilter === r;
          return (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                isSelected
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-[#121829] border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              {r}
            </button>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Leaderboard Table Column */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map(player => {
            const isSelected = selected.rank === player.rank;
            const roleClass = ROLE_BADGE[player.role] || 'text-slate-400 bg-slate-900 border-slate-700';
            return (
              <button
                key={player.rank}
                onClick={() => setSelected(player)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#17223b] to-[#1a2033] border-orange-500/60 shadow-md'
                    : 'bg-[#121829] border-slate-800 hover:border-slate-700 hover:bg-[#162035]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`w-9 h-9 rounded-lg text-xs font-mono font-black flex items-center justify-center shadow-sm ${
                    player.rank === 1
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black'
                      : player.rank === 2
                      ? 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-950 font-black'
                      : player.rank === 3
                      ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 font-black'
                      : 'bg-slate-900 border border-slate-700 text-slate-300'
                  }`}>
                    {player.rank < 10 ? `0${player.rank}` : player.rank}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-white">{player.name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${roleClass}`}>
                        {player.role}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">
                      [{player.teamTag}] &middot; KD <span className="text-amber-400 font-bold">{player.kd.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-lg font-black text-orange-400">{player.rating}</div>
                  <div className="text-[10px] font-mono text-slate-400">Score</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Player Dossier Card with Rich Palette */}
        <div className="lg:col-span-3">
          <div className="p-8 rounded-2xl border border-slate-800 bg-[#121829] space-y-7 shadow-lg">

            {/* Header Readout */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl sm:text-4xl font-black text-white">{selected.name}</h2>
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded border ${ROLE_BADGE[selected.role]}`}>
                    {selected.role}
                  </span>
                </div>
                <div className="text-sm font-mono text-slate-400 mt-2">
                  Legal Name: <span className="text-white font-bold">{selected.realName}</span> &middot; Squad: <span className="text-amber-300 font-bold">{selected.team} ({selected.teamTag})</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono text-slate-400 uppercase font-bold">Performance Index</div>
                <div className="text-4xl font-black font-mono text-orange-400 mt-1">{selected.rating}</div>
                <div className="text-xs font-mono text-slate-400">Scale of 100</div>
              </div>
            </div>

            {/* Empirical Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center shadow-sm">
                <div className="text-xs font-mono text-slate-400 uppercase font-bold">Tournament KD</div>
                <div className="text-2xl font-black font-mono text-red-400 mt-1">{selected.kd.toFixed(1)}</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center shadow-sm">
                <div className="text-xs font-mono text-slate-400 uppercase font-bold">Average Damage</div>
                <div className="text-2xl font-black font-mono text-orange-400 mt-1">{selected.avgDamage}</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center shadow-sm">
                <div className="text-xs font-mono text-slate-400 uppercase font-bold">Finishes / Match</div>
                <div className="text-2xl font-black font-mono text-amber-400 mt-1">{selected.finishesPerMatch.toFixed(1)}</div>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center shadow-sm">
                <div className="text-xs font-mono text-slate-400 uppercase font-bold">Win Rate</div>
                <div className="text-2xl font-black font-mono text-emerald-400 mt-1">{selected.winRate}%</div>
              </div>
            </div>

            {/* Signature Weapon Loadout */}
            <div className="p-5 rounded-xl border border-orange-500/30 bg-gradient-to-r from-[#151c2e] to-orange-950/20 shadow-sm">
              <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-extrabold mb-1">
                Signature Weapon Setup
              </div>
              <div className="text-base sm:text-lg font-black text-white">{selected.signatureWeapon}</div>
            </div>

            {/* Profile Assessment */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-extrabold mb-2.5">
                Tactical Assessment
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">{selected.bio}</p>
            </div>

            {/* Verified Achievements */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-extrabold mb-3">
                Tournament Distinctions
              </div>
              <ul className="space-y-2 text-sm text-slate-200">
                {selected.achievements.map((a, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
