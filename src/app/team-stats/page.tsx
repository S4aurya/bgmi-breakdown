'use client';
import React, { useState, useMemo, useRef } from 'react';
import { SCORING_SYSTEMS } from '@/data/bgmi';
import { Upload, Trophy, Crosshair, Shield, Clock, Heart, Award, Copy, Download, RefreshCw, Check, FileText, Image as ImageIcon, Sparkles, ChevronRight } from 'lucide-react';

type ScoringKey = 'bgis10' | 'classic15';

export interface AnalyzedTeamResult {
  id: string;
  rank: number;
  name: string;
  tag: string;
  kills: number;
  damage: number;
  rescues: number;
  survivalTime: string;
  placementPoints: number;
  totalPoints: number;
}

export interface AnalyzedPlayerResult {
  id: string;
  name: string;
  teamTag: string;
  kills: number;
  damage: number;
  rescues: number;
  survivalTime: string;
  mvpScore: number;
  isMvp?: boolean;
}

// Sample parsed matches for instant demo testing
const SAMPLE_MATCH_TEAMS: AnalyzedTeamResult[] = [
  { id: 't1', rank: 1, name: 'Assault Squad',  tag: 'ASLT', kills: 14, damage: 3240, rescues: 4, survivalTime: '29:45', placementPoints: 10, totalPoints: 24 },
  { id: 't2', rank: 2, name: 'Vanguard Elite', tag: 'VNG',  kills: 9,  damage: 2480, rescues: 3, survivalTime: '28:30', placementPoints: 6,  totalPoints: 15 },
  { id: 't3', rank: 3, name: 'Apex Predators', tag: 'APEX', kills: 8,  damage: 2110, rescues: 2, survivalTime: '26:15', placementPoints: 5,  totalPoints: 13 },
  { id: 't4', rank: 4, name: 'Inferno Kings',  tag: 'INF',  kills: 7,  damage: 1890, rescues: 1, survivalTime: '24:05', placementPoints: 4,  totalPoints: 11 },
  { id: 't5', rank: 5, name: 'Shadow Protocol',tag: 'SHD',  kills: 5,  damage: 1520, rescues: 2, survivalTime: '21:40', placementPoints: 3,  totalPoints: 8 },
  { id: 't6', rank: 6, name: 'Titan Force',    tag: 'TTN',  kills: 4,  damage: 1290, rescues: 1, survivalTime: '19:20', placementPoints: 2,  totalPoints: 6 },
  { id: 't7', rank: 7, name: 'Rogue Nation',   tag: 'ROG',  kills: 3,  damage: 980,  rescues: 0, survivalTime: '16:50', placementPoints: 1,  totalPoints: 4 },
  { id: 't8', rank: 8, name: 'Delta Force',    tag: 'DLT',  kills: 2,  damage: 840,  rescues: 1, survivalTime: '14:10', placementPoints: 1,  totalPoints: 3 },
  { id: 't9', rank: 9, name: 'Phantom Unit',   tag: 'PHT',  kills: 2,  damage: 720,  rescues: 0, survivalTime: '12:00', placementPoints: 0,  totalPoints: 2 },
  { id: 't10', rank: 10, name: 'Omega Legion', tag: 'OMG',  kills: 1,  damage: 540,  rescues: 0, survivalTime: '09:45', placementPoints: 0,  totalPoints: 1 },
];

const SAMPLE_MATCH_PLAYERS: AnalyzedPlayerResult[] = [
  { id: 'p1', name: 'DemonX',    teamTag: 'ASLT', kills: 6, damage: 1340, rescues: 2, survivalTime: '29:45', mvpScore: 96, isMvp: true },
  { id: 'p2', name: 'Striker07', teamTag: 'ASLT', kills: 4, damage: 980,  rescues: 1, survivalTime: '29:45', mvpScore: 84 },
  { id: 'p3', name: 'ViperKing', teamTag: 'VNG',  kills: 5, damage: 1120, rescues: 2, survivalTime: '28:30', mvpScore: 88 },
  { id: 'p4', name: 'GhostSnipe',teamTag: 'APEX', kills: 4, damage: 940,  rescues: 1, survivalTime: '26:15', mvpScore: 80 },
  { id: 'p5', name: 'BlazePro',  teamTag: 'INF',  kills: 3, damage: 790,  rescues: 1, survivalTime: '24:05', mvpScore: 74 },
  { id: 'p6', name: 'CronoShot', teamTag: 'SHD',  kills: 3, damage: 710,  rescues: 1, survivalTime: '21:40', mvpScore: 71 },
  { id: 'p7', name: 'TitanCore', teamTag: 'TTN',  kills: 2, damage: 620,  rescues: 1, survivalTime: '19:20', mvpScore: 65 },
  { id: 'p8', name: 'RogueLead', teamTag: 'ROG',  kills: 2, damage: 540,  rescues: 0, survivalTime: '16:50', mvpScore: 60 },
];

export default function TeamStatsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [scoringKey, setScoringKey] = useState<ScoringKey>('bgis10');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisDone, setAnalysisDone] = useState<boolean>(false);
  const [matchTeams, setMatchTeams] = useState<AnalyzedTeamResult[]>([]);
  const [matchPlayers, setMatchPlayers] = useState<AnalyzedPlayerResult[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'teams' | 'players' | 'export'>('teams');

  const activeScoring = SCORING_SYSTEMS[scoringKey];

  // Re-calculate placement points when scoring rules toggle
  const computedTeams = useMemo(() => {
    return matchTeams.map(t => {
      const placeIdx = Math.max(0, t.rank - 1);
      const placePts = activeScoring.placementMap[placeIdx] ?? 0;
      const killPts = t.kills * activeScoring.killPoint;
      return {
        ...t,
        placementPoints: placePts,
        totalPoints: placePts + killPts,
      };
    }).sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.rank !== b.rank) return a.rank - b.rank;
      return b.kills - a.kills;
    });
  }, [matchTeams, activeScoring]);

  // Handle image upload from user
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showFeedback('Please select a valid image screenshot (JPG, PNG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
      runAnalyzerSimulation(file.name);
    };
    reader.readAsDataURL(file);
  };

  // Run analyzer simulation
  const runAnalyzerSimulation = (filename: string) => {
    setIsAnalyzing(true);
    setAnalysisDone(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisDone(true);
      setMatchTeams(SAMPLE_MATCH_TEAMS);
      setMatchPlayers(SAMPLE_MATCH_PLAYERS);
      showFeedback(`Analyzed match scoreboard successfully: ${filename}`);
    }, 1400);
  };

  // Load demo sample match for immediate inspection
  const handleLoadDemo = () => {
    setUploadedImage('sample-scoreboard');
    runAnalyzerSimulation('BGIS_Scrim_Round1_Erangel.png');
  };

  // Copy broadcast summary for Discord / WhatsApp
  const handleCopyBroadcast = () => {
    if (computedTeams.length === 0) return;

    let text = `🏆 MATCH RESULT ANALYSIS (${activeScoring.name})\n`;
    text += `═══════════════════════════════════════════════════════════\n`;
    text += `RK  SQUAD [TAG]          PLACE  KILL  DMG    RESCUE  TOTAL\n`;
    text += `───────────────────────────────────────────────────────────\n`;
    computedTeams.forEach((t, i) => {
      const rk = String(i + 1).padStart(2, '0');
      const name = (t.name + ' [' + t.tag + ']').padEnd(20, ' ').slice(0, 20);
      const pl = String(t.placementPoints).padStart(4, ' ');
      const kl = String(t.kills).padStart(4, ' ');
      const dmg = String(t.damage).padStart(5, ' ');
      const rsc = String(t.rescues).padStart(3, ' ');
      const tot = String(t.totalPoints).padStart(5, ' ');
      text += `#${rk} ${name}  ${pl}   ${kl}  ${dmg}    ${rsc}   ${tot} PTS\n`;
    });
    text += `═══════════════════════════════════════════════════════════\n`;
    if (matchPlayers.length > 0) {
      const mvp = matchPlayers.find(p => p.isMvp) || matchPlayers[0];
      text += `🎖️ MATCH MVP: ${mvp.name} [${mvp.teamTag}] - ${mvp.kills} Kills | ${mvp.damage} DMG | ${mvp.rescues} Rescues\n`;
    }
    text += `Calculated at BGMI Breakdown: https://disasterhub.vercel.app\n`;

    navigator.clipboard.writeText(text);
    showFeedback('Match analysis copied in broadcast format for WhatsApp/Discord!');
  };

  // Export CSV
  const handleExportCSV = () => {
    if (computedTeams.length === 0) return;

    const headers = ['Rank', 'Squad Name', 'Tag', 'Placement Points', 'Kills', 'Total Damage', 'Rescues', 'Survival Time', 'Total Points'];
    const rows = computedTeams.map((t, idx) => [
      idx + 1,
      `"${t.name}"`,
      t.tag,
      t.placementPoints,
      t.kills,
      t.damage,
      t.rescues,
      t.survivalTime,
      t.totalPoints
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bgmi_match_result_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback('Match results exported as CSV');
  };

  const showFeedback = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3200);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setAnalysisDone(false);
    setIsAnalyzing(false);
    setMatchTeams([]);
    setMatchPlayers([]);
    showFeedback('Cleared current match analysis');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* ── Toast Notification ── */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-2xl flex items-center gap-2.5 transition-all">
          <Check className="w-5 h-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* ── Header ── */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-mono uppercase tracking-wider text-blue-300 font-bold">
            Screenshot Analyzer
          </span>
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">
            100% Free: Unlimited Matches
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
          Team Stats & Match Result Analyzer
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Upload your BGMI match result screenshot to instantly calculate team points, placement standings, and individual player performance using damage, kills, rescues, and survival times.
        </p>
      </div>

      {/* ── Hidden File Input ── */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
      />

      {/* ── SCREENSHOT UPLOAD HERO CARD (Always prominently visible) ── */}
      <div className="mb-12">
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileUpload(e.dataTransfer.files[0]);
            }
          }}
          className={`relative cursor-pointer p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center ${
            uploadedImage
              ? 'border-emerald-500/50 bg-[#0e1628]/90 hover:border-emerald-400'
              : 'border-blue-500/40 bg-gradient-to-br from-[#121a30] to-[#0c1222] hover:border-blue-400 hover:bg-[#151f38]'
          } shadow-xl`}
        >
          {/* Main Upload Icon & Heading */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 mb-4">
            <Upload className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2">
            Upload Match Result
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-6 font-normal">
            Drag and drop your BGMI post-match scoreboard or end-game result screenshot here, or click to browse files. Supports JPG, PNG, and WEBP.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-extrabold tracking-wide transition-all shadow-lg shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Upload Match Result
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleLoadDemo();
              }}
              className="px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-bold border border-slate-700 transition-colors"
            >
              Try Sample Screenshot
            </button>
          </div>

          {/* Analyzing Spinner Indicator */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-[#0a0e1c]/90 rounded-3xl flex flex-col items-center justify-center gap-3 z-10 backdrop-blur-sm">
              <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <div className="text-base font-extrabold text-white">Analyzing Match Scoreboard...</div>
              <div className="text-xs font-mono text-cyan-300">Extracting squad finishes, damage telemetry, rescues, and survival times</div>
            </div>
          )}
        </div>
      </div>

      {/* ── ANALYSIS CONTROLS & SCORING TOGGLE (Visible once analysis is ready) ── */}
      {analysisDone && (
        <div className="space-y-10">

          {/* Scoring & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-[#121829] shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">Scoring Rule:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setScoringKey('bgis10')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    scoringKey === 'bgis10'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  BGIS 10-Point Rule (Official)
                </button>
                <button
                  onClick={() => setScoringKey('classic15')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    scoringKey === 'classic15'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  Classic PMCO 15-Point Rule
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyBroadcast}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-sm"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy for WhatsApp / Discord</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold border border-slate-700 transition-colors"
                title="Clear current match result"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* KPI Snapshot Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#121829] to-amber-950/20 shadow-sm">
              <div className="text-xs font-mono text-amber-400 uppercase font-bold">Winner (WWCD)</div>
              <div className="text-xl font-black text-white mt-1">{computedTeams[0]?.name}</div>
              <div className="text-xs font-mono text-slate-400 mt-0.5">{computedTeams[0]?.totalPoints} Total Points &middot; {computedTeams[0]?.kills} Kills</div>
            </div>

            <div className="p-5 rounded-2xl border border-red-500/30 bg-gradient-to-br from-[#121829] to-red-950/20 shadow-sm">
              <div className="text-xs font-mono text-red-400 uppercase font-bold">Match MVP Athlete</div>
              <div className="text-xl font-black text-white mt-1">{matchPlayers[0]?.name}</div>
              <div className="text-xs font-mono text-slate-400 mt-0.5">[{matchPlayers[0]?.teamTag}] &middot; {matchPlayers[0]?.kills} Kills &middot; {matchPlayers[0]?.damage} DMG</div>
            </div>

            <div className="p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#121829] to-cyan-950/20 shadow-sm">
              <div className="text-xs font-mono text-cyan-400 uppercase font-bold">Total Match Kills</div>
              <div className="text-2xl font-black font-mono text-white mt-1">
                {computedTeams.reduce((a, b) => a + b.kills, 0)}
              </div>
              <div className="text-xs font-mono text-slate-400 mt-0.5">Across {computedTeams.length} competing squads</div>
            </div>

            <div className="p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#121829] to-emerald-950/20 shadow-sm">
              <div className="text-xs font-mono text-emerald-400 uppercase font-bold">Total Rescues</div>
              <div className="text-2xl font-black font-mono text-white mt-1">
                {computedTeams.reduce((a, b) => a + b.rescues, 0)}
              </div>
              <div className="text-xs font-mono text-slate-400 mt-0.5">Squad teammates revived</div>
            </div>
          </div>

          {/* Tab Selector: Team Points vs Player Performance */}
          <div className="flex gap-2 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveView('teams')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeView === 'teams'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  : 'bg-[#121829] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              Squad Points & Standings ({computedTeams.length})
            </button>
            <button
              onClick={() => setActiveView('players')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeView === 'players'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  : 'bg-[#121829] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              Individual Player Performance Matrix ({matchPlayers.length})
            </button>
          </div>

          {/* ── VIEW 1: SQUAD POINTS TABLE ── */}
          {activeView === 'teams' && (
            <div className="rounded-2xl border border-slate-800 bg-[#121829] overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#0e1424] text-xs font-mono uppercase text-slate-400">
                      <th className="py-4 px-4 font-bold text-center">Rank</th>
                      <th className="py-4 px-4 font-bold">Squad Name</th>
                      <th className="py-4 px-3 font-bold text-center text-blue-400">Place Pts</th>
                      <th className="py-4 px-3 font-bold text-center text-red-400">Finishes (Kills)</th>
                      <th className="py-4 px-3 font-bold text-center text-orange-400">Damage</th>
                      <th className="py-4 px-3 font-bold text-center text-emerald-400">Rescues</th>
                      <th className="py-4 px-3 font-bold text-center text-cyan-400">Survival Time</th>
                      <th className="py-4 px-4 font-black text-center text-white text-base">Total Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-sm">
                    {computedTeams.map((team, idx) => {
                      const rank = idx + 1;
                      const rankBadge = rank === 1
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black'
                        : rank === 2
                        ? 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-black'
                        : rank === 3
                        ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-amber-100 font-black'
                        : 'bg-slate-900 border border-slate-700 text-slate-300 font-bold';

                      return (
                        <tr
                          key={team.id}
                          className={`hover:bg-[#162035] transition-colors ${
                            rank <= 3 ? 'bg-orange-500/[0.04]' : ''
                          }`}
                        >
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex w-8 h-8 rounded-lg text-xs font-mono items-center justify-center ${rankBadge}`}>
                              {rank < 10 ? `0${rank}` : rank}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-extrabold text-base text-white">{team.name}</div>
                            <div className="text-xs font-mono text-slate-400">Tag: {team.tag}</div>
                          </td>

                          <td className="py-4 px-3 text-center font-mono font-bold text-blue-300">
                            +{team.placementPoints}
                          </td>

                          <td className="py-4 px-3 text-center font-mono font-black text-red-300 text-base">
                            {team.kills}
                          </td>

                          <td className="py-4 px-3 text-center font-mono text-orange-300 font-bold">
                            {team.damage}
                          </td>

                          <td className="py-4 px-3 text-center font-mono text-emerald-300 font-bold">
                            {team.rescues}
                          </td>

                          <td className="py-4 px-3 text-center font-mono text-cyan-300 text-xs">
                            {team.survivalTime}
                          </td>

                          <td className="py-4 px-4 text-center font-mono font-black text-xl text-white">
                            {team.totalPoints} PTS
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── VIEW 2: INDIVIDUAL PLAYER PERFORMANCE ── */}
          {activeView === 'players' && (
            <div className="rounded-2xl border border-slate-800 bg-[#121829] overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#0e1424] text-xs font-mono uppercase text-slate-400">
                      <th className="py-4 px-4 font-bold text-center">Rank</th>
                      <th className="py-4 px-4 font-bold">Athlete Name</th>
                      <th className="py-4 px-3 font-bold">Squad Tag</th>
                      <th className="py-4 px-3 font-bold text-center text-red-400">Kills</th>
                      <th className="py-4 px-3 font-bold text-center text-orange-400">Damage Dealt</th>
                      <th className="py-4 px-3 font-bold text-center text-emerald-400">Rescues</th>
                      <th className="py-4 px-3 font-bold text-center text-cyan-400">Survival Time</th>
                      <th className="py-4 px-4 font-bold text-center text-amber-400">MVP Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-sm">
                    {matchPlayers.map((player, idx) => {
                      const rank = idx + 1;
                      return (
                        <tr key={player.id} className="hover:bg-[#162035] transition-colors">
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex w-7 h-7 rounded-lg text-xs font-mono items-center justify-center font-bold ${
                              rank === 1 ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-900 border border-slate-700 text-slate-300'
                            }`}>
                              0{rank}
                            </span>
                          </td>

                          <td className="py-4 px-4 font-black text-white text-base">
                            <div className="flex items-center gap-2">
                              <span>{player.name}</span>
                              {player.isMvp && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                  MATCH MVP
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-3 font-mono font-bold text-slate-300">
                            [{player.teamTag}]
                          </td>

                          <td className="py-4 px-3 text-center font-mono font-black text-lg text-red-400">
                            {player.kills}
                          </td>

                          <td className="py-4 px-3 text-center font-mono font-bold text-orange-300">
                            {player.damage}
                          </td>

                          <td className="py-4 px-3 text-center font-mono font-bold text-emerald-300">
                            {player.rescues}
                          </td>

                          <td className="py-4 px-3 text-center font-mono text-cyan-300 text-xs">
                            {player.survivalTime}
                          </td>

                          <td className="py-4 px-4 text-center font-mono font-black text-lg text-amber-400">
                            {player.mvpScore}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ── EMPTY STATE GUIDANCE (When no screenshot is loaded) ── */}
      {!analysisDone && !isAnalyzing && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center font-black text-sm mb-4">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Upload Match Result</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Take a screenshot of your post-match results screen from custom rooms, scrims, or competitive matches.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-sm mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Automated Points & Stats</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              The engine analyzes team placement, kills, total damage, revives/rescues, and survival times with official BGIS 10-point rules.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-sm mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Export for Community</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Instantly copy pre-formatted standings to post into Discord or WhatsApp scrim groups, or download as a CSV spreadsheet.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
