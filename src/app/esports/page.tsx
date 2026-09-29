'use client';
import React, { useState } from 'react';
import { TOURNAMENTS, META_WEAPONS, META_STRATEGIES, INTERNATIONAL_STATS } from '@/data/bgmi';
import { Globe, Award, Shield, TrendingUp } from 'lucide-react';

type Tab = 'tournaments' | 'international' | 'meta';

const STATUS_BADGE: Record<string, { label: string; class: string }> = {
  Ongoing:   { label: 'Active Circuit', class: 'text-emerald-300 bg-emerald-950/70 border-emerald-500/50' },
  Upcoming:  { label: 'Scheduled',      class: 'text-blue-300 bg-blue-950/70 border-blue-500/50' },
  Completed: { label: 'Concluded',      class: 'text-slate-400 bg-slate-900 border-slate-700' },
};

export default function EsportsPage() {
  const [tab, setTab] = useState<Tab>('tournaments');
  const [activeTournament, setActiveTournament] = useState(TOURNAMENTS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header with Larger Font */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-3">
          Competitive Operations
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
          Tournament Tracking & Pro Meta
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Completed BGIS 2026 (Chennai) and BMPS 2026 (Jaipur) dossiers, live BMSD 2026 standings, international world championships (PMWC Paris, PMGC Istanbul Nov-Dec 2026), team rosters, and validated tactical weapon loadouts.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex flex-wrap gap-3 mb-10 border-b border-white/10 pb-6">
        {[
          { key: 'tournaments',   label: 'Official Krafton Circuits' },
          { key: 'international', label: 'International Circuit & World Rankings' },
          { key: 'meta',          label: 'Tactical Meta Zone' },
        ].map(t => {
          const isSelected = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key as Tab)}
              className={`px-6 py-3 rounded-xl text-sm font-extrabold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                isSelected
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-[#121829] border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── CIRCUIT TOURNAMENTS TAB ── */}
      {tab === 'tournaments' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Tournament List */}
          <div className="space-y-3">
            {TOURNAMENTS.map(t => {
              const isSelected = activeTournament.shortName === t.shortName;
              const status = STATUS_BADGE[t.status] || STATUS_BADGE.Upcoming;
              return (
                <button
                  key={t.shortName}
                  onClick={() => setActiveTournament(t)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#17223b] to-[#1a2033] border-orange-500/60 shadow-md'
                      : 'bg-[#121829] border-slate-800 hover:border-slate-700 hover:bg-[#162035]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="font-black text-base text-white">{t.shortName}</span>
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${status.class}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="text-sm font-mono font-bold text-amber-400">
                    Prize: {t.prizePool}
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Timeline: {t.dates}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tournament Details */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-2xl border border-slate-800 bg-[#121829] space-y-7 shadow-lg">

              {/* Tournament Title */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{activeTournament.name}</h2>
                  <div className="text-sm font-mono text-slate-400 mt-2">
                    Format: <span className="text-slate-200 font-bold">{activeTournament.format}</span>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border ${STATUS_BADGE[activeTournament.status]?.class}`}>
                  {STATUS_BADGE[activeTournament.status]?.label}
                </span>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center shadow-sm">
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">Prize Purse</div>
                  <div className="text-lg font-black font-mono text-amber-400 mt-1.5">{activeTournament.prizePool}</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center shadow-sm">
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">Schedule</div>
                  <div className="text-sm font-black font-mono text-white mt-1.5">{activeTournament.dates}</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] text-center col-span-2 sm:col-span-1 shadow-sm">
                  <div className="text-xs font-mono text-slate-400 uppercase font-bold">Registered Squads</div>
                  <div className="text-base font-black font-mono text-orange-400 mt-1.5">{activeTournament.teams.length} Profiles</div>
                </div>
              </div>

              {/* Team Roster Grid */}
              <div>
                <div className="text-sm font-mono uppercase tracking-wider text-amber-400 font-black mb-4">
                  Featured Squad Roster
                </div>
                <div className="space-y-3">
                  {activeTournament.teams.map(team => (
                    <div
                      key={team.tag}
                      className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] hover:border-slate-700 transition-all flex flex-wrap items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/40 text-sm font-mono font-black flex items-center justify-center text-orange-400">
                          {team.tag.slice(0, 3)}
                        </span>
                        <div>
                          <div className="text-sm sm:text-base font-extrabold text-white">{team.name}</div>
                          <div className="text-xs font-mono text-slate-300">
                            Key Athletes: <span className="text-amber-300 font-medium">{team.starPlayers.join(', ')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-amber-300">
                          {team.seed}
                        </span>
                        <div className="text-xs font-mono text-slate-400 mt-1">
                          {team.titles}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ── INTERNATIONAL CIRCUIT TAB ── */}
      {tab === 'international' && (
        <div className="space-y-10">

          {/* International Circuit Overview */}
          <div className="p-6 sm:p-8 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-[#141b2c] to-blue-950/30 shadow-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-xs font-mono uppercase tracking-wider text-purple-300 font-bold mb-3">
              <Globe className="w-3.5 h-3.5" />
              Global Battle Royale Arena
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Official Krafton International Telemetry & Standings
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {INTERNATIONAL_STATS.summary}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-[#0e1424] border border-slate-800 text-slate-300">
                Active Circuit: <strong className="text-purple-300">{INTERNATIONAL_STATS.activeGlobalCircuit}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#0e1424] border border-slate-800 text-slate-300">
                Total World Purse: <strong className="text-amber-400">{INTERNATIONAL_STATS.totalGlobalPrizePurse}</strong>
              </div>
            </div>
          </div>

          {/* 3-Column Tactical Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Column 1: Indian Teams Abroad */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-base font-black text-white uppercase tracking-wider">
                <Shield className="w-5 h-5 text-purple-400" />
                <span>India on Global Stage</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Verified track record across international majors</p>

              <div className="space-y-4 mt-2">
                {INTERNATIONAL_STATS.indianSquadsGlobal.map(s => (
                  <div key={s.teamName} className="p-5 rounded-xl border border-slate-800 bg-[#121829] hover:border-slate-700 transition-all shadow-sm">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-base font-black text-white">{s.teamName}</span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {s.tag}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-amber-400 font-bold mb-1.5">{s.tournament}</div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2.5">
                      <span>Result: <strong className="text-white">{s.placement}</strong></span>
                      <span className="text-emerald-400 font-bold">{s.earnings}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">{s.highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Global Power Rankings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-base font-black text-white uppercase tracking-wider">
                <Award className="w-5 h-5 text-blue-400" />
                <span>World Top 6 Rankings</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Krafton international performance index</p>

              <div className="space-y-3 mt-2">
                {INTERNATIONAL_STATS.globalRankings.map(team => (
                  <div
                    key={team.name}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                      team.tag === 'GODL' ? 'border-orange-500/50 bg-orange-950/20' : 'border-slate-800 bg-[#121829]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg text-xs font-mono font-black flex items-center justify-center ${
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
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-sm text-white">{team.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">[{team.tag}]</span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                          {team.notableAchievement}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-bold text-amber-400">Rating {team.rating}</div>
                      <div className="text-[10px] font-mono text-slate-400">{team.wwcd} WWCD</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Telemetry Discrepancy Index */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-base font-black text-white uppercase tracking-wider">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>National vs Global Telemetry</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Empirical differences in competitive lobbies</p>

              <div className="space-y-3 mt-2">
                {INTERNATIONAL_STATS.metricComparisons.map(m => (
                  <div key={m.metric} className="p-4 rounded-xl border border-slate-800 bg-[#121829]">
                    <div className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-2">
                      {m.metric}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-[#0e1424] border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">India Circuit</div>
                        <div className="text-xs font-mono font-black text-orange-400 mt-0.5">{m.nationalValue}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#0e1424] border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Global Tier 1</div>
                        <div className="text-xs font-mono font-black text-cyan-400 mt-0.5">{m.internationalValue}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">{m.tacticalImplication}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── TACTICAL META ZONE TAB ── */}
      {tab === 'meta' && (
        <div className="space-y-10">

          {/* Meta Weapon Pairings */}
          <div>
            <div className="text-base font-mono uppercase tracking-wider text-amber-400 font-black mb-4">
              Standard Tournament Weapon Combos
            </div>
            <div className="space-y-4">
              {META_WEAPONS.map(mw => (
                <div
                  key={mw.rank}
                  className="p-5 rounded-xl border border-slate-800 bg-[#121829] flex flex-wrap items-start gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 text-sm font-mono font-bold flex items-center justify-center text-amber-400 shrink-0">
                    0{mw.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-base sm:text-lg font-black text-white">{mw.name}</span>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-500/40">
                        {mw.role}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{mw.whyMeta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meta Rotational Strategies */}
          <div>
            <div className="text-base font-mono uppercase tracking-wider text-cyan-400 font-black mb-4">
              Rotational Doctrines and Counter Measures
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {META_STRATEGIES.map(ms => (
                <div
                  key={ms.name}
                  className="p-6 rounded-2xl border border-slate-800 bg-[#121829] flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">{ms.name}</h3>
                    <div className="text-xs font-mono text-amber-300/90 font-medium mb-3">
                      Employed by: {ms.usedBy.join(', ')}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-5">{ms.description}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-slate-800 text-xs sm:text-sm">
                    <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold mb-1.5">
                      Counter Strategy
                    </div>
                    <p className="text-slate-200 leading-relaxed font-normal">{ms.counterPlay}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
