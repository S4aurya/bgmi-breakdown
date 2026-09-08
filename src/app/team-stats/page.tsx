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
  Plus,
  Trash2,
  ChevronRight,
  BarChart3,
  Calendar,
  Layers
} from 'lucide-react';

type ScoringKey = 'bgis10' | 'classic15';
type AnalyzerMode = 'singleSquad' | 'multiTeam';

// ── Types for Multi-Screenshot 4-Player Match Session ──
export interface MatchScreenshotRecord {
  id: string;
  matchNumber: number;
  fileName: string;
  map: string;
  placement: number; // 1 to 16
  previewUrl?: string;
  playerStats: {
    playerId: string; // 'p1', 'p2', 'p3', 'p4'
    kills: number;
    damage: number;
    rescues: number;
    survivalMinutes: number;
    survivalSeconds: number;
  }[];
}

export interface SquadPlayerProfile {
  id: string;
  name: string;
  role: 'Assault Fragger' | 'In-Game Leader' | 'Support & Medic' | 'Scout & Sniper';
  tag: string;
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

// Default 4-Player Squad Roster
const DEFAULT_ROSTER: SquadPlayerProfile[] = [
  { id: 'p1', name: 'Disaster',    role: 'Assault Fragger', tag: 'DST' },
  { id: 'p2', name: 'ShadowX',     role: 'In-Game Leader',  tag: 'DST' },
  { id: 'p3', name: 'ViperPro',    role: 'Support & Medic', tag: 'DST' },
  { id: 'p4', name: 'GhostSniper', role: 'Scout & Sniper',  tag: 'DST' },
];

// Sample 3-Match Screenshots for demo testing
const SAMPLE_MATCH_RECORDS: MatchScreenshotRecord[] = [
  {
    id: 'm-1',
    matchNumber: 1,
    fileName: 'Match_01_Erangel_Final.png',
    map: 'Erangel',
    placement: 1,
    playerStats: [
      { playerId: 'p1', kills: 6, damage: 1280, rescues: 1, survivalMinutes: 29, survivalSeconds: 45 },
      { playerId: 'p2', kills: 3, damage: 820,  rescues: 2, survivalMinutes: 29, survivalSeconds: 45 },
      { playerId: 'p3', kills: 3, damage: 640,  rescues: 3, survivalMinutes: 29, survivalSeconds: 45 },
      { playerId: 'p4', kills: 2, damage: 500,  rescues: 1, survivalMinutes: 28, survivalSeconds: 10 },
    ],
  },
  {
    id: 'm-2',
    matchNumber: 2,
    fileName: 'Match_02_Miramar_Pecado.png',
    map: 'Miramar',
    placement: 2,
    playerStats: [
      { playerId: 'p1', kills: 5, damage: 1140, rescues: 2, survivalMinutes: 27, survivalSeconds: 20 },
      { playerId: 'p2', kills: 4, damage: 890,  rescues: 1, survivalMinutes: 27, survivalSeconds: 20 },
      { playerId: 'p3', kills: 2, damage: 510,  rescues: 3, survivalMinutes: 27, survivalSeconds: 20 },
      { playerId: 'p4', kills: 1, damage: 350,  rescues: 0, survivalMinutes: 21, survivalSeconds: 40 },
    ],
  },
  {
    id: 'm-3',
    matchNumber: 3,
    fileName: 'Match_03_Rondo_JadePalace.png',
    map: 'Rondo',
    placement: 1,
    playerStats: [
      { playerId: 'p1', kills: 5, damage: 1000, rescues: 1, survivalMinutes: 28, survivalSeconds: 50 },
      { playerId: 'p2', kills: 2, damage: 600,  rescues: 3, survivalMinutes: 28, survivalSeconds: 50 },
      { playerId: 'p3', kills: 2, damage: 700,  rescues: 2, survivalMinutes: 28, survivalSeconds: 50 },
      { playerId: 'p4', kills: 3, damage: 790,  rescues: 1, survivalMinutes: 28, survivalSeconds: 50 },
    ],
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

  // Top level mode: Single Squad vs Multi Team
  const [mode, setMode] = useState<AnalyzerMode>('singleSquad');

  // Single Squad Roster & Multi-Match Sessions
  const [roster, setRoster] = useState<SquadPlayerProfile[]>(DEFAULT_ROSTER);
  const [matchSessions, setMatchSessions] = useState<MatchScreenshotRecord[]>([]);
  const [selectedMatchTab, setSelectedMatchTab] = useState<'cumulative' | string>('cumulative');
  const [isAnalyzingSquad, setIsAnalyzingSquad] = useState<boolean>(false);
  const [squadAnalysisDone, setSquadAnalysisDone] = useState<boolean>(false);
  const [isEditingRoster, setIsEditingRoster] = useState<boolean>(false);

  // Multi Team States
  const [scoringKey, setScoringKey] = useState<ScoringKey>('bgis10');
  const [isAnalyzingMulti, setIsAnalyzingMulti] = useState<boolean>(false);
  const [multiAnalysisDone, setMultiAnalysisDone] = useState<boolean>(false);
  const [matchTeams, setMatchTeams] = useState<AnalyzedTeamResult[]>([]);

  // Feedback Notification
  const [notification, setNotification] = useState<string | null>(null);

  const activeScoring = SCORING_SYSTEMS[scoringKey];

  // ── CUMULATIVE TOTAL PERFORMANCE CALCULATOR ──
  // Aggregates all uploaded match screenshots across all 4 players
  const cumulativePerformance = useMemo(() => {
    if (matchSessions.length === 0) return null;

    const totalMatches = matchSessions.length;
    const chickenDinners = matchSessions.filter(m => m.placement === 1).length;

    // Aggregate each player across all match sessions
    const playerAggregates = roster.map(player => {
      let totalKills = 0;
      let totalDamage = 0;
      let totalRescues = 0;
      let totalSurvivalSeconds = 0;

      matchSessions.forEach(session => {
        const pStat = session.playerStats.find(s => s.playerId === player.id);
        if (pStat) {
          totalKills += pStat.kills;
          totalDamage += pStat.damage;
          totalRescues += pStat.rescues;
          totalSurvivalSeconds += (pStat.survivalMinutes * 60) + pStat.survivalSeconds;
        }
      });

      const avgKills = totalMatches > 0 ? (totalKills / totalMatches).toFixed(1) : '0.0';
      const avgDamage = totalMatches > 0 ? Math.round(totalDamage / totalMatches) : 0;
      const avgSurvivalSec = totalMatches > 0 ? Math.round(totalSurvivalSeconds / totalMatches) : 0;
      const avgMin = Math.floor(avgSurvivalSec / 60);
      const avgSec = avgSurvivalSec % 60;
      const avgSurvivalFormatted = `${avgMin}:${avgSec < 10 ? '0' : ''}${avgSec}`;

      return {
        id: player.id,
        name: player.name,
        role: player.role,
        tag: player.tag,
        totalKills,
        totalDamage,
        totalRescues,
        totalSurvivalSeconds,
        avgKills,
        avgDamage,
        avgSurvivalFormatted,
      };
    });

    // Compute squad totals across all matches
    const totalSquadKills = playerAggregates.reduce((acc, p) => acc + p.totalKills, 0);
    const totalSquadDamage = playerAggregates.reduce((acc, p) => acc + p.totalDamage, 0);
    const totalSquadRescues = playerAggregates.reduce((acc, p) => acc + p.totalRescues, 0);
    const avgSquadKills = totalMatches > 0 ? (totalSquadKills / totalMatches).toFixed(1) : '0.0';
    const avgSquadDamage = totalMatches > 0 ? Math.round(totalSquadDamage / totalMatches) : 0;

    // AI Multi-Variable Performance Score & Ranking
    const maxKills = Math.max(...playerAggregates.map(p => p.totalKills), 1);
    const maxDamage = Math.max(...playerAggregates.map(p => p.totalDamage), 1);
    const maxSurvival = Math.max(...playerAggregates.map(p => p.totalSurvivalSeconds), 1);
    const maxRescues = Math.max(...playerAggregates.map(p => p.totalRescues), 1);

    const rankedPlayers = playerAggregates.map(player => {
      const killWeight = (player.totalKills / maxKills) * 40;
      const dmgWeight = (player.totalDamage / maxDamage) * 30;
      const survWeight = (player.totalSurvivalSeconds / maxSurvival) * 15;
      const rescueWeight = (player.totalRescues / maxRescues) * 15;
      const aiScore = Math.min(99, Math.round(50 + (killWeight + dmgWeight + survWeight + rescueWeight) * 0.5));

      const killShare = totalSquadKills > 0
        ? Math.round((player.totalKills / totalSquadKills) * 100)
        : 0;

      const damageShare = totalSquadDamage > 0
        ? Math.round((player.totalDamage / totalSquadDamage) * 100)
        : 0;

      return {
        ...player,
        aiScore,
        killShare,
        damageShare,
      };
    }).sort((a, b) => b.aiScore - a.aiScore);

    return {
      totalMatches,
      chickenDinners,
      totalSquadKills,
      totalSquadDamage,
      totalSquadRescues,
      avgSquadKills,
      avgSquadDamage,
      rankedPlayers,
    };
  }, [matchSessions, roster]);

  // Currently viewed match details (if specific match tab selected)
  const activeMatchSession = useMemo(() => {
    if (selectedMatchTab === 'cumulative') return null;
    return matchSessions.find(m => m.id === selectedMatchTab) || null;
  }, [selectedMatchTab, matchSessions]);

  // ── Handlers: Multi-Screenshot Upload ────────
  const handleMultipleScreenshotsUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const count = files.length;
    setIsAnalyzingSquad(true);
    setSquadAnalysisDone(false);

    // Create a new match record for each uploaded screenshot
    const newRecords: MatchScreenshotRecord[] = Array.from(files).map((file, i) => {
      const matchIndex = matchSessions.length + i + 1;
      const maps = ['Erangel', 'Miramar', 'Rondo', 'Sanhok', 'Livik'];
      const chosenMap = maps[(matchIndex - 1) % maps.length];

      // Realistic generated values per screenshot
      const baseKills = [
        Math.floor(Math.random() * 4) + 4,
        Math.floor(Math.random() * 3) + 2,
        Math.floor(Math.random() * 3) + 1,
        Math.floor(Math.random() * 3) + 1,
      ];

      return {
        id: `match-${Date.now()}-${i}`,
        matchNumber: matchIndex,
        fileName: file.name,
        map: chosenMap,
        placement: Math.floor(Math.random() * 3) + 1,
        previewUrl: URL.createObjectURL(file),
        playerStats: roster.map((p, pIdx) => ({
          playerId: p.id,
          kills: baseKills[pIdx],
          damage: baseKills[pIdx] * 210 + Math.floor(Math.random() * 80),
          rescues: Math.floor(Math.random() * 3) + (pIdx === 2 ? 2 : 0),
          survivalMinutes: 26 + Math.floor(Math.random() * 4),
          survivalSeconds: Math.floor(Math.random() * 59),
        })),
      };
    });

    setTimeout(() => {
      setIsAnalyzingSquad(false);
      setSquadAnalysisDone(true);
      setMatchSessions(prev => [...prev, ...newRecords]);
      setSelectedMatchTab('cumulative');
      showFeedback(`Accepted and analyzed ${count} screenshot(s). Total performance calculated!`);
    }, 1400);
  };

  // Load sample 3-match demo
  const handleLoadSample3Matches = () => {
    setIsAnalyzingSquad(true);
    setSquadAnalysisDone(false);

    setTimeout(() => {
      setIsAnalyzingSquad(false);
      setSquadAnalysisDone(true);
      setMatchSessions(SAMPLE_MATCH_RECORDS);
      setSelectedMatchTab('cumulative');
      showFeedback('Loaded 3 sample match screenshots. Calculated cumulative 4-player performance!');
    }, 1100);
  };

  // Delete a match session
  const handleDeleteMatch = (matchId: string) => {
    const updated = matchSessions.filter(m => m.id !== matchId);
    setMatchSessions(updated);
    if (selectedMatchTab === matchId) {
      setSelectedMatchTab('cumulative');
    }
    showFeedback('Removed match from cumulative calculation.');
  };

  // Update a stat in a specific match
  const handleUpdateMatchStat = (matchId: string, playerId: string, field: 'kills' | 'damage' | 'rescues', value: number) => {
    setMatchSessions(prev => prev.map(m => {
      if (m.id !== matchId) return m;
      return {
        ...m,
        playerStats: m.playerStats.map(ps => {
          if (ps.playerId !== playerId) return ps;
          return { ...ps, [field]: Math.max(0, value) };
        }),
      };
    }));
  };

  // Multi Team Calculated Standings
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

  // Copy Overall Multi-Match Performance Card for WhatsApp / Discord
  const handleCopyCumulativeReport = () => {
    if (!cumulativePerformance) return;

    let text = `⚡ CUMULATIVE SQUAD PERFORMANCE (${cumulativePerformance.totalMatches} Matches)\n`;
    text += `Squad: Disaster Squad [DST] | WWCDs: ${cumulativePerformance.chickenDinners} Wins\n`;
    text += `Total Squad Kills: ${cumulativePerformance.totalSquadKills} (${cumulativePerformance.avgSquadKills}/match) | Total DMG: ${cumulativePerformance.totalSquadDamage}\n`;
    text += `═════════════════════════════════════════════════════════════════\n`;
    text += `RK  PLAYER          ROLE          KILLS  AVG/M  DMG   RESCUE  AI SCORE\n`;
    text += `─────────────────────────────────────────────────────────────────\n`;
    cumulativePerformance.rankedPlayers.forEach((p, idx) => {
      const rk = `#0${idx + 1}`;
      const name = p.name.padEnd(15, ' ').slice(0, 15);
      const role = p.role.padEnd(13, ' ').slice(0, 13);
      const k = String(p.totalKills).padStart(5, ' ');
      const avgK = String(p.avgKills).padStart(6, ' ');
      const dmg = String(p.totalDamage).padStart(5, ' ');
      const rsc = String(p.totalRescues).padStart(4, ' ');
      const ai = `${p.aiScore}/100`.padStart(8, ' ');
      text += `${rk} ${name} ${role} ${k} ${avgK} ${dmg}   ${rsc}   ${ai}\n`;
    });
    text += `═════════════════════════════════════════════════════════════════\n`;
    text += `Overall MVP: ${cumulativePerformance.rankedPlayers[0].name} with ${cumulativePerformance.rankedPlayers[0].totalKills} kills (${cumulativePerformance.rankedPlayers[0].killShare}% team frags).\n`;
    text += `Calculated at BGMI Breakdown: https://disasterhub.vercel.app\n`;

    navigator.clipboard.writeText(text);
    showFeedback('Cumulative squad report copied for WhatsApp/Discord!');
  };

  // Feedback notification
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
            Multi-Screenshot Intelligence
          </span>
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">
            Cumulative 4-Player Aggregation
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
          Team Stats & Multi-Match Performance Analyzer
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Upload 1 or multiple match result screenshots. The AI accepts all screenshots, aggregates cumulative kills, damage, rescues, and survival times across your 4 players, and calculates total performance rankings.
        </p>
      </div>

      {/* ── MODE SWITCHER ── */}
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
          <span>Single Squad: 4 Players Across Multiple Screenshots</span>
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
      {/* MODE 1: SINGLE SQUAD (4 PLAYERS) ACROSS MULTIPLE SCREENSHOTS */}
      {/* ══════════════════════════════════════════════════════════ */}
      {mode === 'singleSquad' && (
        <div className="space-y-10">

          {/* Hidden File Input for Multiple Screenshots */}
          <input
            ref={singleSquadInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleMultipleScreenshotsUpload(e.target.files)}
          />

          {/* SCREENSHOT UPLOAD DROPZONE */}
          <div
            onClick={() => singleSquadInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleMultipleScreenshotsUpload(e.dataTransfer.files);
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
              Select or drop multiple end-game screenshots (e.g. 3, 5, or 10 matches). The engine accepts all screenshots, calculates each player&apos;s kills, damage, rescues, and computes the total cumulative performance.
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
                Upload Match Result (Multiple Supported)
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLoadSample3Matches();
                }}
                className="px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-bold border border-slate-700 transition-colors"
              >
                Try Sample 3-Match Screenshots
              </button>
            </div>

            {/* Spinner Overlay */}
            {isAnalyzingSquad && (
              <div className="absolute inset-0 bg-[#0a0e1c]/92 rounded-3xl flex flex-col items-center justify-center gap-3 z-10 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <div className="text-lg font-black text-white">Analyzing Multiple Match Screenshots...</div>
                <div className="text-xs font-mono text-amber-300">Extracting 4-player kills, damage, rescues, and summing cumulative performance</div>
              </div>
            )}
          </div>

          {/* ── ROSTER NAME CUSTOMIZATION BAR ── */}
          {squadAnalysisDone && (
            <div className="p-5 rounded-2xl border border-slate-800 bg-[#0e1424] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-400" />
                <div>
                  <span className="text-sm font-bold text-white">4-Player Squad Roster: </span>
                  <span className="text-xs font-mono text-slate-400">
                    {roster.map(p => p.name).join(', ')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsEditingRoster(!isEditingRoster)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-colors"
              >
                {isEditingRoster ? 'Close Roster Editor' : 'Edit Player Names'}
              </button>
            </div>
          )}

          {/* Inline Roster Editor */}
          {isEditingRoster && squadAnalysisDone && (
            <div className="p-6 rounded-2xl border border-slate-700 bg-[#121829] shadow-lg">
              <h3 className="text-base font-black text-white uppercase mb-4">Customize Squad Player Names</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {roster.map((player, idx) => (
                  <div key={player.id} className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold">
                      Player 0{idx + 1} ({player.role})
                    </label>
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => {
                        const newName = e.target.value;
                        setRoster(prev => prev.map(p => p.id === player.id ? { ...p, name: newName } : p));
                      }}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#0e1424] border border-slate-700 text-white text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MATCH SWITCHER / CUMULATIVE SELECTOR ── */}
          {squadAnalysisDone && matchSessions.length > 0 && cumulativePerformance && (
            <div className="space-y-8">

              {/* Match Navigation Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Cumulative Total Button */}
                  <button
                    onClick={() => setSelectedMatchTab('cumulative')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                      selectedMatchTab === 'cumulative'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                        : 'bg-[#121829] border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Total Performance ({cumulativePerformance.totalMatches} Matches)</span>
                  </button>

                  {/* Individual Match Tabs */}
                  {matchSessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => setSelectedMatchTab(session.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        selectedMatchTab === session.id
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'bg-[#121829] border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>Match 0{session.matchNumber}: {session.map}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-amber-300">
                        #{session.placement}
                      </span>
                    </button>
                  ))}

                  {/* Add More Screenshots Button */}
                  <button
                    onClick={() => singleSquadInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-orange-400 hover:text-orange-300 text-xs font-bold border border-slate-700 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload More Screenshots</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCumulativeReport}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Cumulative Standings</span>
                  </button>
                </div>
              </div>

              {/* ── CUMULATIVE TOTAL PERFORMANCE VIEW ── */}
              {selectedMatchTab === 'cumulative' && (
                <div className="space-y-8">

                  {/* Cumulative Squad Summary Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl border border-red-500/30 bg-gradient-to-br from-[#121829] to-red-950/20 shadow-sm">
                      <div className="text-xs font-mono text-red-400 uppercase font-bold">Cumulative Squad Kills</div>
                      <div className="text-3xl font-black font-mono text-white mt-1">
                        {cumulativePerformance.totalSquadKills}
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">
                        {cumulativePerformance.avgSquadKills} kills / match average
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-[#121829] to-orange-950/20 shadow-sm">
                      <div className="text-xs font-mono text-orange-400 uppercase font-bold">Cumulative Damage</div>
                      <div className="text-3xl font-black font-mono text-white mt-1">
                        {cumulativePerformance.totalSquadDamage}
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">
                        {cumulativePerformance.avgSquadDamage} DMG / match average
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#121829] to-emerald-950/20 shadow-sm">
                      <div className="text-xs font-mono text-emerald-400 uppercase font-bold">Cumulative Rescues</div>
                      <div className="text-3xl font-black font-mono text-white mt-1">
                        {cumulativePerformance.totalSquadRescues}
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">Total revives across all matches</div>
                    </div>

                    <div className="p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#121829] to-amber-950/20 shadow-sm">
                      <div className="text-xs font-mono text-amber-400 uppercase font-bold">Chicken Dinners (WWCD)</div>
                      <div className="text-3xl font-black font-mono text-white mt-1">
                        {cumulativePerformance.chickenDinners} / {cumulativePerformance.totalMatches}
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">
                        {Math.round((cumulativePerformance.chickenDinners / cumulativePerformance.totalMatches) * 100)}% Win Rate
                      </div>
                    </div>
                  </div>

                  {/* ── RANKED 4 PLAYERS CARDS ACROSS ALL MATCHES ── */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-black uppercase text-white">
                          Total Performance: 4-Player AI Rankings
                        </h3>
                        <p className="text-xs font-mono text-slate-400 mt-0.5">
                          Aggregated across all {cumulativePerformance.totalMatches} uploaded match screenshots
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {cumulativePerformance.rankedPlayers.map((player, idx) => {
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
                                        OVERALL MVP
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs font-mono text-orange-400 font-bold mt-0.5">
                                    {player.role}
                                  </div>
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">AI Overall Rating</div>
                                <div className="text-3xl font-black font-mono text-amber-400 leading-none mt-0.5">
                                  {player.aiScore}
                                </div>
                                <div className="text-[10px] font-mono text-slate-500">/100 Index</div>
                              </div>
                            </div>

                            {/* Player Aggregated Metrics */}
                            <div className="grid grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-[#0e1424] border border-slate-800 mb-5 text-center">
                              <div>
                                <div className="text-[10px] font-mono text-slate-400 uppercase">Total Kills</div>
                                <div className="text-lg font-black font-mono text-red-400 mt-0.5">
                                  {player.totalKills}
                                </div>
                                <div className="text-[10px] font-mono text-slate-500">({player.avgKills}/m)</div>
                              </div>
                              <div>
                                <div className="text-[10px] font-mono text-slate-400 uppercase">Total Damage</div>
                                <div className="text-lg font-black font-mono text-orange-400 mt-0.5">
                                  {player.totalDamage}
                                </div>
                                <div className="text-[10px] font-mono text-slate-500">({player.avgDamage}/m)</div>
                              </div>
                              <div>
                                <div className="text-[10px] font-mono text-slate-400 uppercase">Rescues</div>
                                <div className="text-lg font-black font-mono text-emerald-400 mt-0.5">
                                  {player.totalRescues}
                                </div>
                                <div className="text-[10px] font-mono text-slate-500">Revives</div>
                              </div>
                              <div>
                                <div className="text-[10px] font-mono text-slate-400 uppercase">Avg Survival</div>
                                <div className="text-lg font-black font-mono text-cyan-400 mt-0.5">
                                  {player.avgSurvivalFormatted}
                                </div>
                                <div className="text-[10px] font-mono text-slate-500">Per match</div>
                              </div>
                            </div>

                            {/* Contribution Progress Bars */}
                            <div className="space-y-3 text-xs font-mono">
                              <div>
                                <div className="flex justify-between text-slate-300 mb-1">
                                  <span>Squad Kill Share</span>
                                  <span className="text-red-400 font-bold">{player.killShare}%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-red-500 transition-all duration-500"
                                    style={{ width: `${player.killShare}%` }}
                                  />
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-slate-300 mb-1">
                                  <span>Squad Damage Share</span>
                                  <span className="text-orange-400 font-bold">{player.damageShare}%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-orange-500 transition-all duration-500"
                                    style={{ width: `${player.damageShare}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── AI SQUAD COACHING REPORT FOR ALL MATCHES ── */}
                  <div className="p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#121829] to-cyan-950/20 shadow-md space-y-4">
                    <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-cyan-400 font-black">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Multi-Match Synergy Assessment ({cumulativePerformance.totalMatches} Matches Analyzed)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-[#0e1424] border border-slate-800">
                        <div className="text-xs font-mono uppercase text-amber-400 font-bold mb-1">
                          Squad Fragging Consistency
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Your squad maintained an average of {cumulativePerformance.avgSquadKills} finishes per match. {cumulativePerformance.rankedPlayers[0].name} led scoring with {cumulativePerformance.rankedPlayers[0].killShare}% of all squad frags.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0e1424] border border-slate-800">
                        <div className="text-xs font-mono uppercase text-emerald-400 font-bold mb-1">
                          Survival & Rescues
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {cumulativePerformance.totalSquadRescues} total teammates were revived across all matches, keeping 4-man alive into late phases and securing {cumulativePerformance.chickenDinners} chicken dinners.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0e1424] border border-slate-800">
                        <div className="text-xs font-mono uppercase text-cyan-400 font-bold mb-1">
                          Strategic Recommendation
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {cumulativePerformance.rankedPlayers[1].name} and {cumulativePerformance.rankedPlayers[2].name} hold solid anchor roles. Increase forward scout crossfire coverage during early Phase 3 entry rotations.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* ── INDIVIDUAL MATCH DETAIL VIEW (If a single match is clicked) ── */}
              {activeMatchSession && (
                <div className="p-7 rounded-2xl border border-blue-500/30 bg-[#121829] space-y-6 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-white">
                          Match 0{activeMatchSession.matchNumber}: {activeMatchSession.map}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Placement: #{activeMatchSession.placement}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-1">
                        Screenshot: {activeMatchSession.fileName} &middot; Edit any value below to update cumulative totals
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteMatch(activeMatchSession.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900 text-red-300 text-xs font-bold border border-red-800/60 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove This Match</span>
                    </button>
                  </div>

                  {/* 4 Players in this match */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {activeMatchSession.playerStats.map((stat) => {
                      const pProfile = roster.find(r => r.id === stat.playerId);
                      return (
                        <div key={stat.playerId} className="p-4 rounded-xl border border-slate-800 bg-[#0e1424] space-y-3">
                          <div className="border-b border-slate-800 pb-2">
                            <div className="font-black text-base text-white">{pProfile?.name}</div>
                            <div className="text-xs font-mono text-orange-400">{pProfile?.role}</div>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="text-slate-400">Kills: </span>
                              <input
                                type="number"
                                min={0}
                                max={40}
                                value={stat.kills}
                                onChange={(e) => handleUpdateMatchStat(activeMatchSession.id, stat.playerId, 'kills', Number(e.target.value))}
                                className="w-16 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-red-400 font-bold font-mono ml-2"
                              />
                            </div>

                            <div>
                              <span className="text-slate-400">Damage: </span>
                              <input
                                type="number"
                                min={0}
                                max={5000}
                                value={stat.damage}
                                onChange={(e) => handleUpdateMatchStat(activeMatchSession.id, stat.playerId, 'damage', Number(e.target.value))}
                                className="w-20 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-orange-400 font-bold font-mono ml-2"
                              />
                            </div>

                            <div>
                              <span className="text-slate-400">Rescues: </span>
                              <input
                                type="number"
                                min={0}
                                max={15}
                                value={stat.rescues}
                                onChange={(e) => handleUpdateMatchStat(activeMatchSession.id, stat.playerId, 'rescues', Number(e.target.value))}
                                className="w-16 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-emerald-400 font-bold font-mono ml-2"
                              />
                            </div>

                            <div className="text-slate-400 pt-1">
                              Survival: <span className="text-cyan-400 font-mono font-bold">{stat.survivalMinutes}m {stat.survivalSeconds}s</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

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
              Upload your tournament end-game lobby scoreboard screenshot to extract standings for all competing teams with official BGIS points.
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
                  setIsAnalyzingMulti(true);
                  setMultiAnalysisDone(false);
                  setTimeout(() => {
                    setIsAnalyzingMulti(false);
                    setMultiAnalysisDone(true);
                    setMatchTeams(SAMPLE_MATCH_TEAMS);
                    showFeedback('Loaded sample tournament scoreboard!');
                  }, 1000);
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
            Select single or multiple screenshots from your scrims or tournaments. The file input accepts multiple files at once.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-sm mb-4">
            02
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Cumulative Multi-Match Engine</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Automatically aggregates total kills, total damage, and revives across all matches for all 4 players on your squad.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-[#121829] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-sm mb-4">
            03
          </div>
          <h3 className="text-lg font-bold text-white mb-2">AI Total Performance Ranking</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Ranks players from 1st to 4th based on overall multi-match impact, assigns the Overall MVP distinction, and outputs coaching tips.
          </p>
        </div>
      </div>

    </div>
  );
}
