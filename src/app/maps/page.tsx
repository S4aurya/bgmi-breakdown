'use client';
import React, { useState } from 'react';
import { MAPS, BGMIMap, HotDrop } from '@/data/bgmi';
import { MapPin, Truck, Compass } from 'lucide-react';

const LOOT_LABEL: Record<string, { text: string; class: string }> = {
  S: { text: 'High-Tier Military', class: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50' },
  A: { text: 'Squad Baseline', class: 'bg-blue-950/80 text-blue-300 border-blue-500/50' },
  B: { text: 'Perimeter Loot', class: 'bg-slate-800 text-slate-200 border-slate-700' },
};

const RISK_LABEL: Record<string, { text: string; class: string }> = {
  Extreme: { text: 'Extreme Contention', class: 'bg-red-950/80 text-red-300 border-red-500/50' },
  High:    { text: 'High Engagement', class: 'bg-orange-950/80 text-orange-300 border-orange-500/50' },
  Medium:  { text: 'Controlled Risk', class: 'bg-amber-950/80 text-amber-300 border-amber-500/50' },
};

export default function MapsPage() {
  const [activeMap, setActiveMap] = useState<BGMIMap>(MAPS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header with Larger Font */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold mb-3">
          Tactical Reconnaissance
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
          Map Analysis and Drop Hotspots
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Terrain dimensions, vehicle distribution corridors, loot densities, and initial landing strategies across all five competitive battlegrounds.
        </p>
      </div>

      {/* Map Selector with Rich Colors */}
      <div className="flex flex-wrap gap-3 mb-10 border-b border-white/10 pb-6">
        {MAPS.map(map => {
          const isSelected = activeMap.id === map.id;
          return (
            <button
              key={map.id}
              onClick={() => setActiveMap(map)}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                isSelected
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-[#121829] border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{map.name}</span>
              <span className="ml-2.5 font-mono text-xs opacity-80 px-2 py-0.5 rounded bg-black/30">
                {map.size}
              </span>
            </button>
          );
        })}
      </div>

      {/* Map Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Tactical Parameters Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map Overview Card */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black text-white">{activeMap.name}</h2>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-amber-300 font-bold">
                {activeMap.size}
              </span>
            </div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold mb-4">
              Environment: {activeMap.theme}
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {activeMap.description}
            </p>
          </div>

          {/* Vehicle Logistics */}
          <div className="p-6 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-[#151c2e] to-orange-950/20 shadow-sm">
            <div className="flex items-center gap-2.5 text-sm font-bold text-orange-300 uppercase tracking-wider mb-3">
              <Truck className="w-5 h-5 text-orange-400" />
              <span>Vehicle Logistics</span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{activeMap.vehicleTip}</p>
          </div>

          {/* Tactical Doctrine */}
          <div className="p-6 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-[#151c2e] to-blue-950/20 shadow-sm">
            <div className="flex items-center gap-2.5 text-sm font-bold text-blue-300 uppercase tracking-wider mb-3">
              <Compass className="w-5 h-5 text-blue-400" />
              <span>Rotational Doctrine</span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{activeMap.tacticalTip}</p>
          </div>
        </div>

        {/* Hot Drops Intel Column */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-base font-bold text-white uppercase tracking-wider">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span>Drop Coordinates ({activeMap.hotDrops.length} Hotspots)</span>
            </div>
          </div>

          <div className="space-y-4">
            {activeMap.hotDrops.map((drop: HotDrop, i: number) => {
              const loot = LOOT_LABEL[drop.loot] || LOOT_LABEL.B;
              const risk = RISK_LABEL[drop.risk] || RISK_LABEL.Medium;
              return (
                <div
                  key={drop.name}
                  className="p-5 rounded-xl border border-slate-800 bg-[#121829] hover:border-slate-700 transition-all shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded bg-slate-900 border border-slate-700 text-xs font-mono font-bold flex items-center justify-center text-slate-400">
                        0{i + 1}
                      </span>
                      <h3 className="font-extrabold text-white text-base sm:text-lg">{drop.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${loot.class}`}>
                        {loot.text}
                      </span>
                      <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${risk.class}`}>
                        {risk.text}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">{drop.tip}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
