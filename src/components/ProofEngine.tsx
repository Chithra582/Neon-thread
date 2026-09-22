import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  GitCommit,
  GitPullRequest,
  Award,
  Layers,
  Sparkles,
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Code2,
  Lock
} from 'lucide-react';
import { SkillThread } from '../types';

export const ProofEngine: React.FC = () => {
  const { currentStudent, mentorCheckin, setActiveTab, currentRole, openAuthModal } = useApp();
  const [activeSkillId, setActiveSkillId] = useState<string>('python');

  const selectedSkill =
    currentStudent.skills.find((s) => s.id === activeSkillId) || currentStudent.skills[0];

  const isApproved = mentorCheckin.status === 'approved';

  // Dynamic graph nodes for the selected skill
  const proofChainStages = [
    {
      step: '1. Skill Claim',
      title: `${selectedSkill.name} Self-Declaration`,
      subtitle: `Stated proficiency: ${selectedSkill.claimedLevel}% on resume/academic record.`,
      status: 'verified',
      type: 'skill'
    },
    {
      step: '2. Assigned Sprint Task',
      title:
        selectedSkill.id === 'python'
          ? 'BERT Sentiment Inference Pipeline'
          : selectedSkill.id === 'react'
          ? 'Real-Time Analytics Dashboard UI'
          : 'Normalized Customer Log Schemas',
      subtitle: '7-Day Agile Task with clear acceptance rubric and test assertions.',
      status: 'verified',
      type: 'task'
    },
    {
      step: '3. Employer Project',
      title: 'AI Customer Support Analytics (TechNova)',
      subtitle: 'Production microservice handling 1.2k customer inquiry streams per second.',
      status: 'verified',
      type: 'project'
    },
    {
      step: '4. Concrete Git & Test Evidence',
      title:
        selectedSkill.id === 'python'
          ? 'Commit 8f2a1b9 + 96% pytest accuracy'
          : 'Commit 3e49b10 + 94% Jest pass rate',
      subtitle: 'Code merged into main repository; verified by Automated CI Loom.',
      status: 'verified',
      type: 'evidence'
    },
    {
      step: '5. Mentor Verification',
      title: 'Dr. Aris Thorne Sign-Off',
      subtitle: isApproved
        ? 'Approved 4.8/5.0 technical rigor; cryptographic evidence token signed.'
        : 'Sprint reviewed with 4/5 progress and technical quality.',
      status: 'verified',
      type: 'mentor'
    },
    {
      step: '6. Verified Skill Proof',
      title: `${selectedSkill.name} • ${selectedSkill.verifiedPercentage}% Verified`,
      subtitle: 'Immutable proof badge recognized by employer partner network.',
      status: 'verified',
      type: 'verified'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Proof Engine Header */}
      <div className="bg-[#0e1424] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Proof Engine & Verification Graph
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Your Proof Graph
            </h1>
            <p className="text-sm sm:text-base font-medium text-cyan-300 mt-1 font-mono">
              “Don't just claim a skill. Prove it.”
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            Candidate: <strong className="text-white font-sans">{currentStudent.name}</strong> •{' '}
            <span className="text-cyan-400">{currentStudent.mentorVerifiedCount} Verified Projects</span>
          </div>
        </div>
      </div>

      {/* Skill Tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {currentStudent.skills.map((sk) => (
          <button
            key={sk.id}
            onClick={() => setActiveSkillId(sk.id)}
            className={`px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 ${
              activeSkillId === sk.id
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400/80 shadow-md shadow-cyan-950'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sk.color }} />
            <span>{sk.name}</span>
            <span className="font-mono text-xs text-cyan-400 font-bold">
              {sk.verifiedPercentage}%
            </span>
          </button>
        ))}
      </div>

      {/* Visual Proof Graph: Node-by-Node Pipeline */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800/80">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="capitalize">{selectedSkill.name}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold">
                {selectedSkill.verifiedPercentage}% VERIFIED
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tracing evidence from resume claim down to signed mentor review
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-500 font-mono block">Proof Signature</span>
            <span className="text-xs text-cyan-400 font-mono">
              0x{activeSkillId}_LOOM_SHA256_VERIFIED
            </span>
          </div>
        </div>

        {/* Vertical Connected Graph */}
        <div className="relative max-w-3xl mx-auto py-2">
          {/* Central Glowing Thread Line */}
          <div className="absolute top-6 bottom-6 left-6 sm:left-8 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-emerald-400 thread-glow-cyan" />

          {/* Graph Nodes */}
          <div className="space-y-6 relative z-10">
            {proofChainStages.map((stage, idx) => {
              const isLast = idx === proofChainStages.length - 1;
              return (
                <div key={stage.step} className="flex items-start gap-4 sm:gap-6 group">
                  {/* Node Circle */}
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                      isLast
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 border-emerald-400 shadow-xl shadow-emerald-500/30'
                        : 'bg-slate-900 text-cyan-400 border-slate-700 group-hover:border-cyan-400'
                    }`}
                  >
                    {isLast ? (
                      <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                    ) : idx === 4 ? (
                      <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : idx === 3 ? (
                      <GitCommit className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : idx === 2 ? (
                      <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : idx === 1 ? (
                      <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </div>

                  {/* Node Content Card */}
                  <div
                    className={`flex-1 p-4 sm:p-5 rounded-2xl border transition-all ${
                      isLast
                        ? 'bg-gradient-to-r from-emerald-950/40 to-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-900/80 border-slate-800 group-hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                        {stage.step}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Verified</span>
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {stage.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-light">
                      {stage.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Every proof node is tamper-resistant, linkable on resumes, and verifiable by prospective employers.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('portfolio')}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20"
            >
              <span>View Generated Portfolio Proof</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (currentRole === 'employer') {
                  setActiveTab('employer-talent');
                } else {
                  openAuthModal('signin', 'employer');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>{currentRole === 'employer' ? "Employer Talent Discovery" : "Sign in as Employer to Discover Talent"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
