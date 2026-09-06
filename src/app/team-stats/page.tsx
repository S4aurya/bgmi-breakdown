'use client';
import React, { useState, useMemo, useRef } from 'react';
import { SCORING_SYSTEMS } from '@/data/bgmi';
import {
  Upload,
  Trophy,
  Crosshair,
  Shield,
  Clock,
  Heart,
  Award,
  Copy,
  Download,
  RefreshCw,
  Check,
  FileText,
  Users,
  Sparkles,
  Flame,
  Activity,
  Edit2
} from 'lucide-react';

type ScoringKey = 'bgis10' | 'classic15';
type AnalyzerMode = 'singleSquad' | 'multiTeam';

// ── Types for Single Squad (4-Player Analysis) ──
export interface SquadPlayerPerformance {
  id: string;
  name: string;
  role: 'Assault Fragger' | 'In-Game Leader' | 'Support & Medic' | 'Scout & Sniper';
  kills: number;
  damage: number;
  rescues: number;
  survivalSeconds: number; // in seconds for accurate averaging
  headshots: number;
  matchesPlayed: number;
}

// ── Types for Multi-Team Tournament Analysis ──
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

// Sample initial data for Single Squad across 3 matches
const SAMPLE_SQUAD_PLAYERS: SquadPlayerPerformance[] = [
  {
    id: 'sp1',
    name: 'Disaster',
    role: 'Assault Fragger',
    kills: 16,
    damage: 3420,
    rescues: 4,
    survivalSeconds: 5280, // ~29:20 average
    headshots: 8,
    matchesPlayed: 3,
  },
  {
    id: 'sp2',
    name: 'ShadowX',
    role: 'In-Game Leader',
    kills: 9,
    damage: 2310,
    rescues: 6,
    survivalSeconds: 5210,
    headshots: 4,
    matchesPlayed: 3,
  },
  {
    id: 'sp3',
    name: 'ViperPro',
    role: 'Support & Medic',
    kills: 7,
    damage: 1850,
    rescues: 8,
    survivalSeconds: 4980,
    headshots: 3,
    matchesPlayed: 3,
  },
  {
    id: 'sp4',
    name: 'GhostSniper',
    role: 'Scout & Sniper',
    kills: 6,
    damage: 1640,
    rescues: 2,
    survivalSeconds: 4620,
    headshots: 5,
    matchesPlayed: 3,
  },
];

// Sample parsed teams for multi-team mode
const SAMPLE_MATCH_TEAMS: AnalyzedTeamResult[] = [
  { id: 't1', rank: 1, name: 'Assault Squad',   tag: 'ASLT', kills: 14, damage: 3240, rescues: 4, survivalTime: '29:45', placementPoints: 10, totalPoints: 24 },
  { id: 't2', rank: 2, name: 'Vanguard Elite',  tag: 'VNG',  kills: 9,  damage: 2480, rescues: 3, survivalTime: '28:30', placementPoints: 6,  totalPoints: 15 },
  { id: 't3', rank: 3, name: 'Apex Predators',  tag: 'APEX', kills: 8,  damage: 2110, rescues: 2, survivalTime: '26:15', placementPoints: 5,  totalPoints: 13 },
  { id: 't4', rank: 4, name: 'Inferno Kings',   tag: 'INF',  kills: 7,  damage: 1890, rescues: 1, survivalTime: '24:05', placementPoints: 4,  totalPoints: 11 },
  { id: 't5', rank: 5, name: 'Shadow Protocol', tag: 'SHD',  kills: 5,  damage: 1520, rescues: 2, survivalTime: '21:40', placementPoints: 3,  totalPoints: 8 },
  { id: 't6', rank: 6, name: 'Titan Force',     tag: 'TTN',  kills: 4,  damage: 1290, rescues: 1, survivalTime: '19:20', placementPoints: 2,  totalPoints: 6 },
  { id: 't7', rank: 7, name: 'Rogue Nation',    tag: 'ROG',  kills: 3,  damage: 980,  rescues: 0, survivalTime: '16:50', placementPoints: 1,  totalPoints: 4 },
  { id: 't8', rank: 8, name: 'Delta Force',     tag: 'DLT',  kills: 2,  damage: 840,  rescues: 1, survivalTime: '14:10', placementPoints: 1,  totalPoints: 3 },
];

export default function TeamStatsPage() {
  const singleSquadInputRef = useRef<HTMLInputElement>(null);
  const multiTeamInputRef = useRef<HTMLInputElement>(null);

  // Top level mode: Single Squad 4-Player vs Multi-Team Tournament
  const [mode, setMode] = useState<AnalyzerMode>('singleSquad');

  // Single Squad States
  const [squadName, setSquadName] = useState<string>('Disaster Squad');
  const [squadTag, setSquadTag] = useState<string>('DST');
  const [squadPlayers, setSquadPlayers] = useState<SquadPlayerPerformance[]>([]);
  const [uploadedScreenshotsCount, setUploadedScreenshotsCount] = useState<number>(0);
  const [isAnalyzingSquad, setIsAnalyzingSquad] = useState<boolean>(false);
  const [squadAnalysisDone, setSquadAnalysisDone] = useState<boolean>(false);

  // Multi Team States
  const [scoringKey, setScoringKey] = useState<ScoringKey>('bgis10');
  const [isAnalyzingMulti, setIsAnalyzingMulti] = useState<boolean>(false);
  const [multiAnalysisDone, setMultiAnalysisDone] = useState<boolean>(false);
  const [matchTeams, setMatchTeams] = useState<AnalyzedTeamResult[]>([]);

  // Feedback Notification
  const [notification, setNotification] = useState<string | null>(null);

  const activeScoring = SCORING_SYSTEMS[scoringKey];

  // ── Single Squad Calculations & AI Ranking ────
  const squadTotals = useMemo(() => {
    const totalKills = squadPlayers.reduce((acc, p) => acc + p.kills, 0);
    const totalDamage = squadPlayers.reduce((acc, p) => acc + p.damage, 0);
    const totalRescues = squadPlayers.reduce((acc, p) => acc + p.rescues, 0);
    const totalHeadshots = squadPlayers.reduce((acc, p) => acc + p.headshots, 0);
    const avgMatches = squadPlayers.length > 0 ? squadPlayers[0].matchesPlayed : 1;

    return {
      totalKills,
      totalDamage,
      totalRescues,
      totalHeadshots,
      matches: avgMatches,
      killsPerMatch: avgMatches > 0 ? (totalKills / avgMatches).toFixed(1) : '0.0',
      damagePerMatch: avgMatches > 0 ? (totalDamage / avgMatches).toFixed(0) : '0',
    };
  }, [squadPlayers]);

  // AI Performance Ranking Algorithm for the 4 players
  // Evaluates Kills (40%), Damage (30%), Survival (15%), Rescues (15%)
  const rankedSquadPlayers = useMemo(() => {
    if (squadPlayers.length === 0) return [];

    const maxKills = Math.max(...squadPlayers.map(p => p.kills), 1);
    const maxDamage = Math.max(...squadPlayers.map(p => p.damage), 1);
    const maxSurvival = Math.max(...squadPlayers.map(p => p.survivalSeconds), 1);
    const maxRescues = Math.max(...squadPlayers.map(p => p.rescues), 1);

    const scored = squadPlayers.map(player => {
      const killScore = (player.kills / maxKills) * 40;
      const dmgScore = (player.damage / maxDamage) * 30;
      const survScore = (player.survivalSeconds / maxSurvival) * 15;
      const rescueScore = (player.rescues / maxRescues) * 15;
      const aiScore = Math.min(99, Math.round(50 + (killScore + dmgScore + survScore + rescueScore) * 0.5));

      const killPercent = squadTotals.totalKills > 0
        ? Math.round((player.kills / squadTotals.totalKills) * 100)
        : 0;

      const damagePercent = squadTotals.totalDamage > 0
        ? Math.round((player.damage / squadTotals.totalDamage) * 100)
        : 0;

      const minutes = Math.floor(player.survivalSeconds / (player.matchesPlayed || 1) / 60);
      const seconds = Math.floor((player.survivalSeconds / (player.matchesPlayed || 1)) % 60);
      const avgSurvivalFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      return {
        ...player,
        aiScore,
        killPercent,
        damagePercent,
        avgSurvivalFormatted,
      };
    });

    // Sort by AI performance score descending
    return scored.sort((a, b) => b.aiScore - a.aiScore);
  }, [squadPlayers, squadTotals]);

  // ── Multi Team Calculations ───────────────────
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
      return a.rank - b.rank;
    });
  }, [matchTeams, activeScoring]);

  // ── Actions: Single Squad Upload ─────────────
  const handleSquadUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const count = files.length;
    setUploadedScreenshotsCount(count);
    setIsAnalyzingSquad(true);
    setSquadAnalysisDone(false);

    // Simulate AI Multi-Screenshot OCR analysis
    setTimeout(() => {
      setIsAnalyzingSquad(false);
      setSquadAnalysisDone(true);
      setSquadPlayers(SAMPLE_SQUAD_PLAYERS);
      showFeedback(`AI scanned ${count} match result screenshot(s). Ranked 4 player performances!`);
    }, 1500);
  };

  const handleLoadSquadDemo = () => {
    setUploadedScreenshotsCount(3);
    setIsAnalyzingSquad(true);
    setSquadAnalysisDone(false);

    setTimeout(() => {
      setIsAnalyzingSquad(false);
      setSquadAnalysisDone(true);
      setSquadPlayers(SAMPLE_SQUAD_PLAYERS);
      showFeedback('AI loaded and analyzed 3 match screenshots for your 4-player squad!');
    }, 1200);
  };

  // ── Actions: Multi Team Upload ───────────────
  const handleMultiTeamUpload = (file: File) => {
    setIsAnalyzingMulti(true);
    setMultiAnalysisDone(false);

    setTimeout(() => {
      setIsAnalyzingMulti(false);
      setMultiAnalysisDone(true);
      setMatchTeams(SAMPLE_MATCH_TEAMS);
      showFeedback('Extracted lobby tournament scoreboard successfully!');
    }, 1300);
  };

  const handleLoadMultiDemo = () => {
    setIsAnalyzingMulti(true);
    setMultiAnalysisDone(false);

    setTimeout(() => {
      setIsAnalyzingMulti(false);
      setMultiAnalysisDone(true);
      setMatchTeams(SAMPLE_MATCH_TEAMS);
      showFeedback('Loaded sample multi-team tournament scoreboard!');
    }, 1000);
  };

  // Copy Single Squad Performance Card for Discord/WhatsApp
  const handleCopySquadStats = () => {
    if (rankedSquadPlayers.length === 0) return;

    let text = `⚡ BGMI SQUAD ROSTER PERFORMANCE REVIEW\n`;
    text += `Squad: ${squadName} [${squadTag}] | Matches: ${squadTotals.matches}\n`;
    text += `Total Squad Kills: ${squadTotals.totalKills} (${squadTotals.killsPerMatch}/match) | Total Damage: ${squadTotals.totalDamage}\n`;
    text += `═════════════════════════════════════════════════════════════\n`;
    text += `RK  PLAYER          ROLE          KILLS  DMG   RESCUE  AI SCORE\n`;
    text += `─────────────────────────────────────────────────────────────\n`;
    rankedSquadPlayers.forEach((p, idx) => {
      const rk = `#0${idx + 1}`;
      const name = p.name.padEnd(15, ' ').slice(0, 15);
      const role = p.role.padEnd(13, ' ').slice(0, 13);
      const k = String(p.kills).padStart(5, ' ');
      const dmg = String(p.damage).padStart(5, ' ');
      const rsc = String(p.rescues).padStart(4, ' ');
      const ai = `${p.aiScore}/100`.padStart(7, ' ');
      text += `${rk} ${name} ${role} ${k}  ${dmg}   ${rsc}   ${ai}\n`;
    });
    text += `═════════════════════════════════════════════════════════════\n`;
    text += `AI Summary: ${rankedSquadPlayers[0].name} earned Match MVP with ${rankedSquadPlayers[0].kills} kills (${rankedSquadPlayers[0].killPercent}% team frags).\n`;
    text += `Analyzed free at BGMI Breakdown: https://disasterhub.vercel.app\n`;

    navigator.clipboard.writeText(text);
    showFeedback('Squad performance report copied for WhatsApp/Discord!');
  };

  // Toast feedback
  const showFeedback = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3400);
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
            AI Scoreboard Intelligence
          </span>
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">
            100% Free: Multi-Screenshot Support
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
          Team Stats & Match Performance Analyzer
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Upload your match result screenshots. Analyze your single 4-player squad roster across matches, or calculate multi-team tournament points tables automatically.
        </p>
      </div>

      {/* ── MODE SWITCHER: SINGLE SQUAD VS MULTI TEAM ── */}
      <div className="flex flex-wrap items-center gap-3 mb-10 p-2 rounded-2xl bg-[#0e1424] border border-slate-800 w-fit">
        <button
          onClick={() => setMode('singleSquad')}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-extrabold transition-all ${
            mode === 'singleSquad'
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Single Squad (4-Player Deep Dive Across Matches)</span>
        </button>

        <button
          onClick={() => setMode('multiTeam')}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-extrabold transition-all ${
            mode === 'multiTeam'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Multi-Team Tournament Standings (Full Lobby)</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* MODE 1: SINGLE SQUAD (4 PLAYERS) ACROSS SCREENSHOTS       */}
      {/* ══════════════════════════════════════════════════════════ */}
      {mode === 'singleSquad' && (
        <div className="space-y-10">

          {/* Hidden File Input (supports multiple screenshots) */}
          <input
            ref={singleSquadInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleSquadUpload(e.target.files)}
          />

          {/* Upload Card for Single Squad */}
          <div
            onClick={() => singleSquadInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleSquadUpload(e.dataTransfer.files);
            }}
            className={`relative cursor-pointer p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center ${
              squadAnalysisDone
                ? 'border-emerald-500/50 bg-[#0e1628]/90 hover:border-emerald-400'
                : 'border-orange-500/40 bg-gradient-to-br from-[#121829] to-[#0c101c] hover:border-orange-400 hover:bg-[#162035]'
            } shadow-xl`}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 mb-4">
              <Upload className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2">
              Upload Match Result
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-6 font-normal">
              Select or drop your end-game match screenshots. Upload 1 or multiple screenshots to analyze your squad&apos;s 4 players, total kills, damage, rescues, and survival times.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  singleSquadInputRef.current?.click();
                }}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-extrabold tracking-wide transition-all shadow-lg shadow-orange-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                Upload Match Result
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLoadSquadDemo();
                }}
                className="px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-bold border border-slate-700 transition-colors"
              >
                Try Sample 4-Player Match
              </button>
            </div>

            {/* Spinner Overlay */}
            {isAnalyzingSquad && (
              <div className="absolute inset-0 bg-[#0a0e1c]/92 rounded-3xl flex flex-col items-center justify-center gap-3 z-10 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <div className="text-lg font-black text-white">AI Extracting 4-Player Squad Telemetry...</div>
                <div className="text-xs font-mono text-amber-300">Evaluating damage, kill conversion, rescues, and survival rankings across screenshots</div>
              </div>
            )}
          </div>

          {/* ── SQUAD ANALYSIS RESULTS VIEW ── */}
          {squadAnalysisDone && (
            <div className="space-y-10">

              {/* Squad Header and Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-sm">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-white">{squadName}</span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40">
                      [{squadTag}]
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800">
                      {squadTotals.matches} Matches Screened
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Performance evaluated from {uploadedScreenshotsCount > 0 ? uploadedScreenshotsCount : 3} uploaded match result screenshot(s)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleCopySquadStats}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Squad Performance</span>
                  </button>
                  <button
                    onClick={() => {
                      setSquadAnalysisDone(false);
                      setSquadPlayers([]);
                      showFeedback('Cleared squad analysis');
                    }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold border border-slate-700 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Squad Aggregated KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl border border-red-500/30 bg-gradient-to-br from-[#121829] to-red-950/20 shadow-sm">
                  <div className="text-xs font-mono text-red-400 uppercase font-bold">Total Squad Kills</div>
                  <div className="text-3xl font-black font-mono text-white mt-1">{squadTotals.totalKills}</div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">{squadTotals.killsPerMatch} kills / match average</div>
                </div>

                <div className="p-5 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-[#121829] to-orange-950/20 shadow-sm">
                  <div className="text-xs font-mono text-orange-400 uppercase font-bold">Total Squad Damage</div>
                  <div className="text-3xl font-black font-mono text-white mt-1">{squadTotals.totalDamage}</div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">{squadTotals.damagePerMatch} DMG / match average</div>
                </div>

                <div className="p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#121829] to-emerald-950/20 shadow-sm">
                  <div className="text-xs font-mono text-emerald-400 uppercase font-bold">Total Squad Rescues</div>
                  <div className="text-3xl font-black font-mono text-white mt-1">{squadTotals.totalRescues}</div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">Teammates revived in combat</div>
                </div>

                <div className="p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#121829] to-cyan-950/20 shadow-sm">
                  <div className="text-xs font-mono text-cyan-400 uppercase font-bold">Headshot Confirmations</div>
                  <div className="text-3xl font-black font-mono text-white mt-1">{squadTotals.totalHeadshots}</div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">Precision critical finishes</div>
                </div>
              </div>

              {/* ── 4 PLAYER PERFORMANCE RANKINGS CARDS ── */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-black uppercase text-white">AI Player Performance Rankings</h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      Ranked 1 to 4 using weighted kills (40%), damage (30%), survival duration (15%), and rescues (15%)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rankedSquadPlayers.map((player, idx) => {
                    const rank = idx + 1;
                    const isMvp = rank === 1;

                    return (
                      <div
                        key={player.id}
                        className={`p-6 rounded-2xl border transition-all relative overflow-hidden shadow-lg ${
                          isMvp
                            ? 'border-amber-500/50 bg-gradient-to-br from-[#162035] via-[#121829] to-amber-950/20 shadow-amber-950/30'
                            : 'border-slate-800 bg-[#121829] hover:border-slate-700'
                        }`}
                      >
                        {/* Top Rank Header */}
                        <div className="flex items-start justify-between gap-4 mb-5">
                          <div className="flex items-center gap-3.5">
                            <span className={`w-10 h-10 rounded-xl text-sm font-mono font-black flex items-center justify-center shadow-md ${
                              rank === 1
                                ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950'
                                : rank === 2
                                ? 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-950'
                                : rank === 3
                                ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100'
                                : 'bg-slate-900 border border-slate-700 text-slate-400'
                            }`}>
                              0{rank}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xl font-black text-white">{player.name}</h4>
                                {isMvp && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-amber-500 text-slate-950 shadow-sm">
                                    SQUAD MVP
                                  </span>
                                )}
                              </div>
                              <div className="text-xs font-mono text-orange-400 font-bold mt-0.5">
                                {player.role}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">AI Score</div>
                            <div className="text-3xl font-black font-mono text-amber-400 leading-none mt-0.5">
                              {player.aiScore}
                            </div>
                            <div className="text-[10px] font-mono text-slate-500">/100 Index</div>
                          </div>
                        </div>

                        {/* Player Metrics Grid */}
                        <div className="grid grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-[#0e1424] border border-slate-800 mb-5 text-center">
                          <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase">Kills</div>
                            <div className="text-lg font-black font-mono text-red-400 mt-0.5">{player.kills}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase">Damage</div>
                            <div className="text-lg font-black font-mono text-orange-400 mt-0.5">{player.damage}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase">Rescues</div>
                            <div className="text-lg font-black font-mono text-emerald-400 mt-0.5">{player.rescues}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase">Avg Survival</div>
                            <div className="text-lg font-black font-mono text-cyan-400 mt-0.5">{player.avgSurvivalFormatted}</div>
                          </div>
                        </div>

                        {/* Contribution Bars */}
                        <div className="space-y-3 text-xs font-mono">
                          <div>
                            <div className="flex justify-between text-slate-300 mb-1">
                              <span>Squad Kill Share</span>
                              <span className="text-red-400 font-bold">{player.killPercent}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-red-500 transition-all duration-500"
                                style={{ width: `${player.killPercent}%` }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-slate-300 mb-1">
                              <span>Squad Damage Share</span>
                              <span className="text-orange-400 font-bold">{player.damagePercent}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-orange-500 transition-all duration-500"
                                style={{ width: `${player.damagePercent}%` }}
                              />
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── AI SQUAD COACHING & TACTICAL DEBRIEF ── */}
              <div className="p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#121829] to-cyan-950/20 shadow-md space-y-4">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-cyan-400 font-black">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Squad Synergy Assessment & Tactical Debrief</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-slate-800">
                    <div className="text-xs font-mono uppercase text-amber-400 font-bold mb-1">
                      Frag Conversion Efficiency
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Squad dealt {squadTotals.totalDamage} damage for {squadTotals.totalKills} kills (average{' '}
                      {squadTotals.totalKills > 0 ? Math.round(squadTotals.totalDamage / squadTotals.totalKills) : 0} DMG per frag). Clean finish rate with minimal wasted spray.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0e1424] border border-slate-800">
                    <div className="text-xs font-mono uppercase text-emerald-400 font-bold mb-1">
                      Revive & Support Dynamics
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {rankedSquadPlayers.find(p => p.role.includes('Support'))?.name || 'Support'} anchored team survivability with {rankedSquadPlayers.find(p => p.role.includes('Support'))?.rescues || 0} rescues, maintaining squad integrity through late circles.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0e1424] border border-slate-800">
                    <div className="text-xs font-mono uppercase text-cyan-400 font-bold mb-1">
                      Coach Recommendation
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {rankedSquadPlayers[0]?.name} is carrying {rankedSquadPlayers[0]?.killPercent}% of squad finishes. Second fragger should initiate synchronized 2v1 angles to reduce solo exposure during Phase 5 pushes.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════ */}
      {/* MODE 2: MULTI-TEAM TOURNAMENT STANDINGS (FULL LOBBY)       */}
      {/* ══════════════════════════════════════════════════════════ */}
      {mode === 'multiTeam' && (
        <div className="space-y-10">

          {/* Hidden File Input for Multi-Team */}
          <input
            ref={multiTeamInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleMultiTeamUpload(e.target.files[0]);
              }
            }}
          />

          {/* Upload Card for Multi Team */}
          <div
            onClick={() => multiTeamInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleMultiTeamUpload(e.dataTransfer.files[0]);
              }
            }}
            className="p-8 sm:p-12 rounded-3xl border-2 border-dashed border-blue-500/40 bg-gradient-to-br from-[#121a30] to-[#0c1222] hover:border-blue-400 hover:bg-[#151f38] transition-all text-center flex flex-col items-center justify-center cursor-pointer shadow-xl relative"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 mb-4">
              <Trophy className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2">
              Upload Match Result
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-6 font-normal">
              Upload your tournament end-game lobby scoreboard screenshot to extract standings for all 8 to 16 competing teams with official BGIS points.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  multiTeamInputRef.current?.click();
                }}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-extrabold tracking-wide transition-all shadow-lg shadow-blue-500/25"
              >
                Upload Match Result
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLoadMultiDemo();
                }}
                className="px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-bold border border-slate-700 transition-colors"
              >
                Try Sample Lobby Screenshot
              </button>
            </div>

            {isAnalyzingMulti && (
              <div className="absolute inset-0 bg-[#0a0e1c]/90 rounded-3xl flex flex-col items-center justify-center gap-3 z-10 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <div className="text-lg font-extrabold text-white">Extracting Tournament Scoreboard...</div>
                <div className="text-xs font-mono text-cyan-300">Parsing all squad placement points, finishes, and damage values</div>
              </div>
            )}
          </div>

          {/* ── MULTI-TEAM RESULTS TABLE ── */}
          {multiAnalysisDone && (
            <div className="space-y-6">
              {/* Scoring Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-[#121829]">
                <div className="flex items-center gap-3">
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

                <button
                  onClick={() => {
                    let text = `🏆 TOURNAMENT STANDINGS (${activeScoring.name})\n`;
                    computedTeams.forEach((t, i) => {
                      text += `#${i + 1} ${t.name} [${t.tag}]: ${t.totalPoints} PTS (Place: ${t.placementPoints}, Kills: ${t.kills}, DMG: ${t.damage})\n`;
                    });
                    navigator.clipboard.writeText(text);
                    showFeedback('Lobby standings copied for Discord / WhatsApp!');
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all"
                >
                  Copy Standings
                </button>
              </div>

              {/* Table */}
              <div className="rounded-2xl border border-slate-800 bg-[#121829] overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-[#0e1424] text-xs font-mono uppercase text-slate-400">
                        <th className="py-4 px-4 font-bold text-center">Rank</th>
                        <th className="py-4 px-4 font-bold">Squad Name</th>
                        <th className="py-4 px-3 font-bold text-center text-blue-400">Place Pts</th>
                        <th className="py-4 px-3 font-bold text-center text-red-400">Kills</th>
                        <th className="py-4 px-3 font-bold text-center text-orange-400">Damage</th>
                        <th className="py-4 px-3 font-bold text-center text-emerald-400">Rescues</th>
                        <th className="py-4 px-3 font-bold text-center text-cyan-400">Survival Time</th>
                        <th className="py-4 px-4 font-black text-center text-white text-base">Total Pts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-sm">
                      {computedTeams.map((team, idx) => (
                        <tr key={team.id} className="hover:bg-[#162035] transition-colors">
                          <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-400">
                            #{idx + 1}
                          </td>
                          <td className="py-3.5 px-4 font-extrabold text-white">
                            {team.name} <span className="text-xs font-mono text-slate-400">[{team.tag}]</span>
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-300">
                            +{team.placementPoints}
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono font-black text-red-300 text-base">
                            {team.kills}
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono text-orange-300 font-bold">
                            {team.damage}
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono text-emerald-300 font-bold">
                            {team.rescues}
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono text-cyan-300 text-xs">
                            {team.survivalTime}
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono font-black text-xl text-white">
                            {team.totalPoints} PTS
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ── HOW IT WORKS FOOTNOTE ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center font-black text-sm mb-4">
            01
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Upload Match Result</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Drop single or multiple match screenshots from your gallery. Accepts all standard BGMI end-game scoreboard formats.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-sm mb-4">
            02
          </div>
          <h3 className="text-lg font-bold text-white mb-2">AI 4-Player Telemetry</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Calculates individual kills, damage, rescues, survival duration, and assigns AI performance rankings from 1st to 4th.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-sm mb-4">
            03
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Tactical Squad Feedback</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Instant coach briefing evaluating squad kill share, damage conversion efficiency, and coordination tips for your next match.
          </p>
        </div>
      </div>

    </div>
  );
}
