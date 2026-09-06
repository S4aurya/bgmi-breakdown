'use client';
import React, { useState } from 'react';
import { ZONE_PHASES } from '@/data/bgmi';

const DANGER_COLOR: Record<string, { label: string; text: string; bg: string; border: string }> = {
  Low:      { label: 'Low Threat',      text: 'text-emerald-300', bg: 'bg-emerald-950/70', border: 'border-emerald-500/50' },
  Moderate: { label: 'Moderate Threat', text: 'text-amber-300',   bg: 'bg-amber-950/70',   border: 'border-amber-500/50'   },
  High:     { label: 'High Threat',     text: 'text-orange-300',  bg: 'bg-orange-950/70',  border: 'border-orange-500/50'  },
  Lethal:   { label: 'Lethal Collapse', text: 'text-red-300',     bg: 'bg-red-950/70',     border: 'border-red-500/50'     },
};

export default function ZonesPage() {
  const [selected, setSelected] = useState(0);
  const phase = ZONE_PHASES[selected];
  const danger = DANGER_COLOR[phase.danger] || DANGER_COLOR.Low;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header with Larger Font */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold mb-3">
          Perimeter Dynamics
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
          Zone Phases and Collapse Telemetry
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Phase countdowns, boundary shrinkage intervals, damage-per-second attrition rates, and rotation decision thresholds.
        </p>
      </div>

      {/* Phase Timeline Buttons */}
      <div className="flex gap-2.5 mb-10 overflow-x-auto pb-4 border-b border-white/10">
        {ZONE_PHASES.map((p, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`shrink-0 px-5 py-3 rounded-xl text-sm font-mono font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                isSelected
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-[#121829] border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              Phase 0{p.phase}
            </button>
          );
        })}
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Selected Phase Panel */}
        <div className="space-y-6">

          {/* Danger Level Header */}
          <div className={`p-6 rounded-2xl border ${danger.bg} ${danger.border} shadow-md`}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Active Circle Stage</div>
                <div className="text-4xl font-black text-white mt-1">Phase 0{phase.phase}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Perimeter Risk</div>
                <div className={`text-xl font-bold font-mono ${danger.text} mt-1`}>{danger.label}</div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="h-2 rounded-full bg-black/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 transition-all duration-300 shadow-sm"
                style={{ width: `${(phase.phase / 8) * 100}%` }}
              />
            </div>
          </div>

          {/* Telemetry Metrics with High Contrast Numbers */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-slate-800 bg-[#121829] text-center shadow-sm">
              <div className="text-xs font-mono text-slate-400 uppercase font-bold">Wait Time</div>
              <div className="text-2xl font-black font-mono text-white mt-1.5">{phase.waitTime}</div>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-[#121829] text-center shadow-sm">
              <div className="text-xs font-mono text-slate-400 uppercase font-bold">Shrink Time</div>
              <div className="text-2xl font-black font-mono text-amber-400 mt-1.5">{phase.shrinkTime}</div>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-[#121829] text-center shadow-sm">
              <div className="text-xs font-mono text-slate-400 uppercase font-bold">Blue DPS</div>
              <div className="text-2xl font-black font-mono text-red-400 mt-1.5">{phase.dps}</div>
            </div>
          </div>

          {/* Rotational Directive */}
          <div className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#121829] to-cyan-950/20 shadow-md">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-black mb-3">
              Rotational Directive
            </div>
            <p className="text-base text-slate-200 leading-relaxed font-medium">{phase.strategy}</p>
          </div>

        </div>

        {/* Complete Reference Table */}
        <div className="space-y-4">
          <div className="text-sm font-mono uppercase tracking-wider text-amber-400 font-bold">
            All Phase Collapse Sequence
          </div>

          <div className="space-y-2.5">
            {ZONE_PHASES.map((p, i) => {
              const isSelected = selected === i;
              const d = DANGER_COLOR[p.danger] || DANGER_COLOR.Low;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#17223b] to-[#1a2033] border-orange-500/60 shadow-sm'
                      : 'bg-[#121829] border-slate-800 hover:border-slate-700 hover:bg-[#162035]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 text-sm font-mono font-bold flex items-center justify-center text-orange-400">
                      0{p.phase}
                    </span>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-white">Phase 0{p.phase}</div>
                      <div className="text-xs font-mono text-slate-400">
                        Wait: {p.waitTime} &middot; Shrink: {p.shrinkTime}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${d.bg} ${d.border} ${d.text}`}>
                      {p.dps}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
