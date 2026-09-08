'use client';
import React, { useState } from 'react';
import { INTERNATIONAL_STATS, InternationalTeam, GlobalPlayer, GlobalTournamentInfo } from '@/data/bgmi';
import { Globe, Trophy, Award, TrendingUp, Shield, Users } from 'lucide-react';

type Tab = 'teams' | 'players' | 'tournaments' | 'benchmarks';

const ROLE_BADGE: Record<string, string> = {
  Fragger:       'text-red-300 bg-red-950/70 border-red-500/50',
  IGL:           'text-blue-300 bg-blue-950/70 border-blue-500/50',
  Sniper:        'text-amber-300 bg-amber-950/70 border-amber-500/50',
  'All-Rounder': 'text-purple-300 bg-purple-950/70 border-purple-500/50',
};

export default function InternationalPage() {
  const [tab, setTab] = useState<Tab>('teams');
  const [selectedTeam, setSelectedTeam] = useState<InternationalTeam>(INTERNATIONAL_STATS.globalRankings[0]);
  const [selectedPlayer, setSelectedPlayer] = useState<GlobalPlayer>(INTERNATIONAL_STATS.globalPlayers[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-mono uppercase tracking-wider text-purple-300 font-bold mb-3">
          <Globe className="w-3.5 h-3.5 text-purple-400" />
          PUBG Mobile Global Circuit Telemetry
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
          International Stats & Global Standings
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Official worldwide team rankings, international pro player power index, global major championships, and cross-regional telemetry benchmarks. Sourced from official PUBG Mobile global esports.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="px-3.5 py-2 rounded-xl bg-[#121829] border border-slate-800 text-slate-300">
            Active Season: <strong className="text-purple-300">{INTERNATIONAL_STATS.activeGlobalCircuit}</strong>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-[#121829] border border-slate-800 text-slate-300">
            Total World Prize Pool: <strong className="text-amber-400">{INTERNATIONAL_STATS.totalGlobalPrizePurse}</strong>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-[#121829] border border-slate-800 text-slate-300">
            Data Source: <strong className="text-emerald-400">PUBG Mobile Esports Official</strong>
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex flex-wrap gap-3 mb-10 border-b border-white/10 pb-6">
        {[
          { key: 'teams',       label: 'Worldwide Team Rankings',   icon: Award },
          { key: 'players',     label: 'Worldwide Player Rankings', icon: Users },
          { key: 'tournaments', label: 'Global Championships',      icon: Trophy },
          { key: 'benchmarks',  label: 'National vs Global Data',   icon: TrendingUp },
        ].map(t => {
          const isSelected = tab === t.key;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key as Tab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-[#121829] border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── TAB 1: WORLDWIDE TEAM RANKINGS ── */}
      {tab === 'teams' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Team List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-2">
              World Top 10 Teams
            </div>
            {INTERNATIONAL_STATS.globalRankings.map(team => {
              const isSelected = selectedTeam.rank === team.rank;
              return (
                <button
                  key={team.rank}
                  onClick={() => setSelectedTeam(team)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#1b1c38] to-[#161c30] border-purple-500/60 shadow-md'
                      : 'bg-[#121829] border-slate-800 hover:border-slate-700 hover:bg-[#162035]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-9 h-9 rounded-lg text-xs font-mono font-black flex items-center justify-center ${
                      team.rank === 1
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : team.rank === 2
                        ? 'bg-slate-300 text-slate-950 font-black'
                        : team.rank === 3
                        ? 'bg-amber-700 text-white font-black'
                        : 'bg-slate-900 border border-slate-700 text-slate-300'
                    }`}>
                      {team.rank < 10 ? `0${team.rank}` : team.rank}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-white">{team.name}</span>
                        <span className="text-[10px] font-mono text-purple-300 px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-500/30">
                          {team.tag}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">
                        {team.region} &middot; {team.wwcd} WWCD
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-base font-black text-amber-400">{team.rating}</div>
                    <div className="text-[10px] font-mono text-slate-400">Rating</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Team Dossier */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-2xl border border-slate-800 bg-[#121829] space-y-7 shadow-lg">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl sm:text-4xl font-black text-white">{selectedTeam.name}</h2>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-purple-950/80 text-purple-300 border border-purple-500/40">
                      World Rank #{selectedTeam.rank}
                    </span>
                  </div>
                  <div className="text-sm font-mono text-slate-400 mt-2">
                    Region: <span className="text-white font-bold">{selectedTeam.region}</span> &middot; Tag: <span className="text-amber-300 font-bold">{selectedTeam.tag}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">Global Rating</div>
                  <div className="text-4xl font-black font-mono text-amber-400 mt-1">{selectedTeam.rating}</div>
                  <div className="text-xs font-mono text-slate-400">Scale of 100</div>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center shadow-sm">
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">Tournament WWCD</div>
                  <div className="text-2xl font-black font-mono text-amber-400 mt-1">{selectedTeam.wwcd} Wins</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center shadow-sm">
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">Squad KD Ratio</div>
                  <div className="text-2xl font-black font-mono text-orange-400 mt-1">{selectedTeam.kd.toFixed(1)}</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center col-span-2 sm:col-span-1 shadow-sm">
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">Competitive Status</div>
                  <div className="text-sm font-black font-mono text-emerald-400 mt-2">{selectedTeam.status}</div>
                </div>
              </div>

              {/* Notable Achievement */}
              <div className="p-5 rounded-xl border border-purple-500/30 bg-gradient-to-r from-[#181a33] to-purple-950/20 shadow-sm">
                <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-extrabold mb-1">
                  Championship Distinction
                </div>
                <div className="text-base sm:text-lg font-black text-white">{selectedTeam.notableAchievement}</div>
              </div>

              {/* Global Circuit Context */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-extrabold mb-2.5">
                  Strategic Profile
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Ranks among the most disciplined rosters on the international circuit. Renowned for consistent compound fortification in Phase 3 and aggressive perimeter sweeps that deny late-circle rotations.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── TAB 2: WORLDWIDE PLAYER RANKINGS ── */}
      {tab === 'players' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Player List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-2">
              World Top 10 Athletes
            </div>
            {INTERNATIONAL_STATS.globalPlayers.map(player => {
              const isSelected = selectedPlayer.rank === player.rank;
              const roleClass = ROLE_BADGE[player.role] || 'text-slate-400 bg-slate-900 border-slate-700';
              return (
                <button
                  key={player.rank}
                  onClick={() => setSelectedPlayer(player)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#1b1c38] to-[#161c30] border-purple-500/60 shadow-md'
                      : 'bg-[#121829] border-slate-800 hover:border-slate-700 hover:bg-[#162035]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-9 h-9 rounded-lg text-xs font-mono font-black flex items-center justify-center ${
                      player.rank === 1
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : player.rank === 2
                        ? 'bg-slate-300 text-slate-950 font-black'
                        : player.rank === 3
                        ? 'bg-amber-700 text-white font-black'
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
                    <div className="font-mono text-base font-black text-orange-400">{player.rating}</div>
                    <div className="text-[10px] font-mono text-slate-400">Score</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Player Dossier */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-2xl border border-slate-800 bg-[#121829] space-y-7 shadow-lg">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl sm:text-4xl font-black text-white">{selectedPlayer.name}</h2>
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded border ${ROLE_BADGE[selectedPlayer.role]}`}>
                      {selectedPlayer.role}
                    </span>
                  </div>
                  <div className="text-sm font-mono text-slate-400 mt-2">
                    Legal Name: <span className="text-white font-bold">{selectedPlayer.realName}</span> &middot; Squad: <span className="text-amber-300 font-bold">{selectedPlayer.team} ({selectedPlayer.teamTag})</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Region: <span className="text-slate-200">{selectedPlayer.region}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">Global Score</div>
                  <div className="text-4xl font-black font-mono text-orange-400 mt-1">{selectedPlayer.rating}</div>
                  <div className="text-xs font-mono text-slate-400">Scale of 100</div>
                </div>
              </div>

              {/* Empirical Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center shadow-sm">
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">Tournament KD</div>
                  <div className="text-2xl font-black font-mono text-red-400 mt-1">{selectedPlayer.kd.toFixed(1)}</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center shadow-sm">
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">Average Damage</div>
                  <div className="text-2xl font-black font-mono text-orange-400 mt-1">{selectedPlayer.avgDamage}</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center col-span-2 sm:col-span-1 shadow-sm">
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">Finishes / Match</div>
                  <div className="text-2xl font-black font-mono text-amber-400 mt-1">{selectedPlayer.finishesPerMatch.toFixed(1)}</div>
                </div>
              </div>

              {/* Signature Weapon */}
              <div className="p-5 rounded-xl border border-orange-500/30 bg-gradient-to-r from-[#181a33] to-orange-950/20 shadow-sm">
                <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-extrabold mb-1">
                  Signature Weapon Setup
                </div>
                <div className="text-base sm:text-lg font-black text-white">{selectedPlayer.signatureWeapon}</div>
              </div>

              {/* Accolades */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-extrabold mb-2.5">
                  Verified Global Accolade
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  {selectedPlayer.notableAccolade}
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── TAB 3: GLOBAL CHAMPIONSHIPS ── */}
      {tab === 'tournaments' && (
        <div className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-2">
            Tier 1 Global Tournaments
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INTERNATIONAL_STATS.globalTournaments.map(t => (
              <div key={t.shortName} className="p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-lg sm:text-xl font-black text-white">{t.name}</span>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-purple-950/80 text-purple-300 border border-purple-500/40 shrink-0">
                      {t.shortName}
                    </span>
                  </div>
                  <div className="text-sm font-mono font-bold text-amber-400 mb-2">
                    Prize Purse: {t.prizePool}
                  </div>
                  <div className="text-xs font-mono text-slate-400 mb-4">
                    Location: <span className="text-slate-200 font-medium">{t.location}</span> &middot; Timeline: <span className="text-slate-200 font-medium">{t.dates}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal mb-4">
                    Format: {t.format}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Reigning / Seed Leader:</span>
                  <span className="text-emerald-400 font-bold">{t.champion}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Indian Squads Track Record */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="text-base font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span>Indian Squads on the World Stage</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INTERNATIONAL_STATS.indianSquadsGlobal.map(sq => (
                <div key={sq.teamName} className="p-5 rounded-xl border border-slate-800 bg-[#0d1322]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-extrabold text-white text-base">{sq.teamName}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {sq.tag}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-amber-400 font-bold mb-1">{sq.tournament}</div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>Result: <strong className="text-white">{sq.placement}</strong></span>
                    <span className="text-emerald-400 font-bold">{sq.earnings}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{sq.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: BENCHMARKS ── */}
      {tab === 'benchmarks' && (
        <div className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-2">
            National vs Global Telemetry Benchmarks
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INTERNATIONAL_STATS.metricComparisons.map(m => (
              <div key={m.metric} className="p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-lg">
                <div className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider mb-4">
                  {m.metric}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 rounded-xl bg-[#0e1424] border border-slate-800 text-center">
                    <div className="text-xs font-mono text-slate-400 uppercase font-bold">India Domestic Circuit</div>
                    <div className="text-base sm:text-lg font-mono font-black text-orange-400 mt-1">{m.nationalValue}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0e1424] border border-slate-800 text-center">
                    <div className="text-xs font-mono text-slate-400 uppercase font-bold">Global Tier 1 Circuit</div>
                    <div className="text-base sm:text-lg font-mono font-black text-cyan-400 mt-1">{m.internationalValue}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">{m.tacticalImplication}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}