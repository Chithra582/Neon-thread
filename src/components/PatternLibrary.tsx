import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  Copy,
  Clock,
  Users,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ChallengePatternTemplate } from '../types';

export const PatternLibrary: React.FC = () => {
  const { patternTemplates, clonePatternToChallenge, setActiveTab } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#0e1424] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Modular Sprints
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40 font-mono">
                BATTLE-TESTED TEMPLATES
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Reusable Project Pattern Library
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Pre-structured sprint blueprints with defined rubrics, test suites, and team weaving schemas ready to deploy in seconds.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('employer-challenges')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            ← Back to Active Challenges
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patternTemplates.map((tpl: ChallengePatternTemplate) => (
          <div
            key={tpl.id}
            className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Category & Times Used */}
              <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                  {tpl.difficulty} Sprint
                </span>
                <span className="text-slate-400">Used {tpl.timesUsed} times</span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                {tpl.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light mb-4 line-clamp-3">
                {tpl.description}
              </p>

              {/* Required Skills */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">
                  Target Skill Synthesis:
                </span>
                <div className="flex flex-wrap gap-1">
                  {tpl.requiredSkills.map((sk: string) => (
                    <span
                      key={sk}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-mono"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 py-3 border-t border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block">Duration</span>
                  <span className="text-white font-semibold">{tpl.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Avg. Completion</span>
                  <span className="text-emerald-400 font-semibold">{tpl.averageCompletion}%</span>
                </div>
              </div>
            </div>

            {/* Reuse Challenge Button */}
            <div className="pt-4 mt-2 border-t border-slate-800">
              <button
                id={`btn-reuse-challenge-${tpl.id}`}
                onClick={() => clonePatternToChallenge(tpl)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 font-bold text-xs border border-cyan-500/40 transition-all flex items-center justify-center gap-2 active:scale-95 group-hover:bg-cyan-500 group-hover:text-slate-950 shadow-md shadow-cyan-950"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Reuse Challenge</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
