import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Award,
  Zap,
  Cpu,
  Layers,
  Bot
} from 'lucide-react';

export const TeamWeaver: React.FC = () => {
  const { activeChallenge, teamLoom, acceptTeam, setActiveTab } = useApp();
  const [isWeaving, setIsWeaving] = useState(false);
  const [aiSynergyNotes, setAiSynergyNotes] = useState<string | null>(null);

  const handleSimulateReWeave = () => {
    setIsWeaving(true);
    setTimeout(() => {
      setIsWeaving(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Digital Loom Engine
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/40 font-mono">
                COMPLEMENTARY MATCHING
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Project Loom: Team Weaver
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              The AI analyzes challenge requirements, student skill threads, and verified portfolio proof to weave high-synergy squads with zero redundant gaps.
            </p>
          </div>

          {/* Top Challenge Context */}
          <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center gap-3 shrink-0">
            <span className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs">
              TN
            </span>
            <div>
              <span className="text-[10px] text-slate-400 font-mono block">Active Challenge</span>
              <span className="text-xs sm:text-sm font-bold text-white">{activeChallenge.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Weaver Display: Visual Loom Network */}
      <div className="bg-[#0c111e] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Visual Thread Grid background */}
        <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />

        {/* Top Stats Banner */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Team Skill Coverage</span>
              <span className="text-2xl font-extrabold text-cyan-300 font-mono">
                {teamLoom.teamSkillCoverage}%
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Identified Skill Gaps</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-amber-400 font-mono">
                  {teamLoom.skillGapsCount}
                </span>
                <span className="text-xs text-amber-300 font-mono">({teamLoom.skillGaps.join(', ')})</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Recommended Mentor</span>
              <span className="text-sm font-bold text-purple-300 block truncate">
                {teamLoom.recommendedMentor.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">AI/ML Systems Specialist</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Visual Loom Stage: 3-column Weave:
            Col 1: Student Skill Threads (Inputs)
            Col 2: Central Loom Knot (AI Synergy Engine)
            Col 3: Challenge Requirements & Project Team (Outputs)
        */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: 4 Complementary Students */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                1. Candidate Threads
              </span>
              <span className="text-[10px] text-slate-400 font-mono">4 Selected</span>
            </div>

            {teamLoom.members.map((member, idx) => {
              const isChithra = member.studentId === 'chithra-r';
              return (
                <div
                  key={member.studentId}
                  className={`p-3.5 rounded-2xl border transition-all relative ${
                    isChithra
                      ? 'bg-cyan-950/40 border-cyan-400/80 shadow-md shadow-cyan-950'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white truncate">{member.name}</h4>
                        {isChithra && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold font-mono">
                            YOU
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-cyan-300 font-mono block">
                        {member.role}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {member.coverageContribution.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center: The Digital Loom Weaver Core (Animated SVG threads) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-[260px] aspect-square rounded-full border border-cyan-500/40 bg-gradient-to-tr from-cyan-950/40 via-purple-950/40 to-slate-950/60 p-6 flex flex-col items-center justify-center text-center shadow-2xl shadow-cyan-950">
              {/* Outer spinning ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: '25s' }} />

              {/* Central Glyph */}
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 flex items-center justify-center mb-3 shadow-lg shadow-cyan-500/30">
                <Cpu className="w-8 h-8 animate-pulse text-cyan-300" />
              </div>

              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                PROJECT LOOM
              </span>
              <span className="text-[11px] text-cyan-400 font-mono mt-0.5">
                Weaving 96% Synergy
              </span>

              {/* Flow indicators */}
              <div className="mt-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            <span className="text-[11px] text-slate-400 font-mono mt-4 text-center">
              Cross-functional skill synthesis & gap mitigation
            </span>
          </div>

          {/* Right: Project Requirements & Final Squad Synthesis */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                2. Challenge Requirements
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">5 Required Skills</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Python</span>
                <span className="text-emerald-400 font-mono font-semibold">✓ Chithra R (87%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Machine Learning</span>
                <span className="text-emerald-400 font-mono font-semibold">✓ Chithra R (68%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">React Frontend</span>
                <span className="text-emerald-400 font-mono font-semibold">✓ Marcus Chen (92%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">UI/UX & Design Tokens</span>
                <span className="text-emerald-400 font-mono font-semibold">✓ Elena Rostova (91%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">SQL Schema Optimization</span>
                <span className="text-emerald-400 font-mono font-semibold">✓ Devon Vance (90%)</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-xs text-amber-300">
                <span>FastAPI Gap</span>
                <span className="font-mono text-[11px]">Sprint Mentorship by Dr. Thorne</span>
              </div>
            </div>

            {/* Assigned Mentor Card */}
            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/40 flex items-center gap-3">
              <img
                src={teamLoom.recommendedMentor.avatar}
                alt={teamLoom.recommendedMentor.name}
                className="w-10 h-10 rounded-xl object-cover border border-purple-500/50"
              />
              <div className="min-w-0">
                <span className="text-[10px] text-purple-300 font-mono block">Sprint Mentor</span>
                <h4 className="text-xs font-bold text-white truncate">{teamLoom.recommendedMentor.name}</h4>
                <p className="text-[10px] text-slate-400 truncate">{teamLoom.recommendedMentor.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Confirmation Bar */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-300">
            <strong className="text-white">Squad Ready:</strong> 4 students woven into{' '}
            <span className="text-cyan-400 font-semibold font-mono">Team Loom #01</span> • 96% Skill Coverage
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="btn-accept-team"
              onClick={() => acceptTeam(teamLoom.id)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Accept Team & Launch Sprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
