'use client';
import React, { useState } from 'react';
import { SENSITIVITY_PRESETS, SensitivityPreset } from '@/data/bgmi';

function SensRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10">
      <span className="text-sm font-mono text-slate-300 font-medium">{label}</span>
      <span className="font-mono text-sm font-black text-amber-300 px-2.5 py-0.5 rounded bg-black/40 border border-white/5">{value}%</span>
    </div>
  );
}

export default function SensitivityPage() {
  const [active, setActive] = useState<SensitivityPreset>(SENSITIVITY_PRESETS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header with Larger Font */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-mono uppercase tracking-wider text-purple-300 font-bold mb-3">
          Input Calibration
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
          Sensitivity Calibration & Scope Drills
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Calibrated camera panning, ADS drag coefficients, and full gyroscope offsets verified by professional tournament athletes.
        </p>
      </div>

      {/* Preset Selector with Rich Gradient Active State */}
      <div className="flex flex-wrap gap-3 mb-10 border-b border-white/10 pb-6">
        {SENSITIVITY_PRESETS.map(preset => {
          const isSelected = active.playerName === preset.playerName;
          return (
            <button
              key={preset.playerName}
              onClick={() => setActive(preset)}
              className={`px-6 py-3.5 rounded-xl text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                isSelected
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-[#121829] border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="font-extrabold text-sm sm:text-base">{preset.playerName}</div>
              <div className="text-xs font-mono opacity-80 mt-1">{preset.style}</div>
            </button>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Column 1: Camera and ADS */}
        <div className="space-y-6">
          {/* Camera Sensitivity */}
          <div className="p-6 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-[#121829] to-orange-950/20 shadow-md">
            <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-black mb-4">
              Free Look Camera
            </div>
            <SensRow label="3rd Person (No Scope)" value={active.camera.thirdPerson} />
            <SensRow label="1st Person (No Scope)" value={active.camera.firstPerson} />
            <SensRow label="In-Vehicle Camera" value={active.camera.car} />
          </div>

          {/* ADS Sensitivity */}
          <div className="p-6 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-[#121829] to-blue-950/20 shadow-md">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-black mb-4">
              Aim Down Sights (ADS)
            </div>
            <SensRow label="No Scope" value={active.ads.noScope} />
            <SensRow label="Red Dot / Holographic" value={active.ads.redDot} />
            <SensRow label="2x Scope" value={active.ads.twoX} />
            <SensRow label="3x Scope" value={active.ads.threeX} />
            <SensRow label="4x Scope" value={active.ads.fourX} />
            <SensRow label="6x Scope" value={active.ads.sixX} />
            <SensRow label="8x Scope" value={active.ads.eightX} />
          </div>
        </div>

        {/* Column 2: Gyroscope & Hardware Profile */}
        <div className="space-y-6">
          {/* Gyroscope */}
          <div className="p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#121829] to-purple-950/20 shadow-md">
            <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-black mb-4">
              Gyroscope Calibration
            </div>
            <SensRow label="Always On (No Scope)" value={active.gyro.always} />
            <SensRow label="ADS Scope Fire" value={active.gyro.ads} />
            <SensRow label="3x Scope Tilt" value={active.gyro.threeX} />
            <SensRow label="4x Scope Tilt" value={active.gyro.fourX} />
            <SensRow label="6x Scope Tilt" value={active.gyro.sixX} />
            <SensRow label="8x Scope Tilt" value={active.gyro.eightX} />
          </div>

          {/* Hardware & Grip */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">
              Hardware Environment
            </div>
            <div className="text-lg font-black text-white">{active.device}</div>
            <div className="text-xs font-mono text-slate-400 mt-1.5">Grip Profile: <span className="text-slate-200 font-bold">{active.style}</span></div>
          </div>
        </div>

        {/* Column 3: Calibration Directives */}
        <div>
          <div className="p-7 rounded-2xl border border-slate-800 bg-[#121829] space-y-6 shadow-lg">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-black">
              Calibration Directives
            </div>

            <div className="space-y-4">
              {active.tips.map((tip, i) => (
                <div key={i} className="flex gap-4 text-sm sm:text-base leading-relaxed">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    0{i + 1}
                  </span>
                  <p className="text-slate-200 font-normal">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
