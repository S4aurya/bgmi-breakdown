'use client';
import React, { useState } from 'react';
import { TOURNAMENTS, META_WEAPONS, META_STRATEGIES } from '@/data/bgmi';

type Tab = 'tournaments' | 'meta';

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
          Tournament Tracking and Pro Meta
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          National and international competitive circuits, team rosters, seed distributions, and validated tactical weapon combinations.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-3 mb-10 border-b border-white/10 pb-6">
        {[
          { key: 'tournaments', label: 'Circuit Tournaments' },
          { key: 'meta',        label: 'Tactical Meta Zone' },
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
