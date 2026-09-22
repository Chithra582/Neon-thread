import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Building2,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Cpu,
  Bot
} from 'lucide-react';
import { Challenge } from '../types';

export const ChallengesPage: React.FC = () => {
  const { challenges, activeChallenge, setActiveChallenge, joinChallenge, currentStudent } = useApp();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(challenges[0]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiCustomExplanation, setAiCustomExplanation] = useState<string | null>(null);

  const handleSelectChallenge = async (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setActiveChallenge(challenge);
    setAiCustomExplanation(null);
  };

  // Optional: trigger Gemini AI match reasoning on demand
  const handleAskGeminiWhyMatch = async (challenge: Challenge) => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/ai/match-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: currentStudent.name,
          studentSkills: currentStudent.skills.map((s) => `${s.name} (${s.verifiedPercentage}%)`),
          challengeTitle: challenge.title,
          requiredSkills: challenge.requiredSkills
        })
      });
      const data = await res.json();
      if (data.explanation) {
        setAiCustomExplanation(data.explanation);
      }
    } catch (err) {
      console.warn('API error:', err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Proof-Based Opportunities
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold">
              AI MATCHED
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Challenges For You
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real employer challenges matched to your verified skill threads and portfolio evidence
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            Candidate: <strong className="text-white">{currentStudent.name}</strong>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col (7 cols): Challenge Cards */}
        <div className="lg:col-span-7 space-y-5">
          {challenges.map((challenge) => {
            const isSelected = selectedChallenge.id === challenge.id;
            return (
              <div
                key={challenge.id}
                onClick={() => handleSelectChallenge(challenge)}
                className={`p-6 rounded-3xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#0f172a] border-cyan-400/80 shadow-xl shadow-cyan-950/60 ring-1 ring-cyan-500/30'
                    : 'bg-[#0e1424] border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                {/* Company & Match Badge */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-cyan-400">
                      {challenge.companyLogo}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-slate-300">{challenge.company}</span>
                      <span className="text-[11px] text-slate-500 ml-2 font-mono">• {challenge.sponsorTier}</span>
                    </div>
                  </div>

                  {/* AI Match % Badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-extrabold">{challenge.aiMatchPercentage}% Match</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                  {challenge.description}
                </p>

                {/* Challenge Parameters Row */}
                <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {challenge.duration}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    {challenge.teamSize} Member Team
                  </span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 font-sans text-[11px]">
                    {challenge.difficulty}
                  </span>
                </div>

                {/* Matched vs Gaps Chips */}
                <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                  {challenge.matchedSkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {sk}
                    </span>
                  ))}
                  {challenge.skillGaps.map((sk) => (
                    <span
                      key={sk}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      Gap: {sk}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col (5 cols): Selected Challenge Deep Dive & "Why This Match?" */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-[#0e1424] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  Match Intelligence
                </span>
                <span className="text-lg font-extrabold text-cyan-300 font-mono">
                  {selectedChallenge.aiMatchPercentage}%
                </span>
              </div>
              <h2 className="text-xl font-bold text-white leading-tight">
                {selectedChallenge.title}
              </h2>
              <span className="text-xs text-slate-400 block mt-1">
                Hosted by {selectedChallenge.company} • {selectedChallenge.duration} Sprint
              </span>
            </div>

            {/* AI "Why this match?" Explanation Box */}
            <div className="p-4 rounded-2xl bg-[#090d18] border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>Why this match?</span>
                </div>
                <button
                  onClick={() => handleAskGeminiWhyMatch(selectedChallenge)}
                  disabled={isLoadingAi}
                  className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-800/40 flex items-center gap-1 transition-colors disabled:opacity-50"
                  title="Ask Gemini model for deep reasoning"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{isLoadingAi ? 'Analyzing...' : 'Re-Evaluate with AI'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-light">
                {aiCustomExplanation || selectedChallenge.matchExplanation}
              </p>

              <div className="border-t border-slate-800/80 pt-2 flex flex-col gap-1.5 text-[11px] text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Matched Skills:</span>
                  <span className="font-semibold text-emerald-400">
                    {selectedChallenge.matchedSkills.join(', ')}
                  </span>
                </div>
                {selectedChallenge.skillGaps.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Skill Gap:</span>
                    <span className="font-semibold text-amber-400">
                      {selectedChallenge.skillGaps.join(', ')} (To be bridged in Sprint)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Expected Outcome & Criteria */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-white block mb-1">Expected Deliverable</span>
                <p className="text-slate-400 leading-relaxed">{selectedChallenge.expectedOutcome}</p>
              </div>
              <div>
                <span className="font-bold text-white block mb-1">Evaluation Criteria</span>
                <p className="text-slate-400 leading-relaxed">{selectedChallenge.evaluationCriteria}</p>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                id="btn-join-challenge"
                onClick={() => joinChallenge(selectedChallenge.id)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Join Challenge & Weave Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-center text-slate-500 block mt-2 font-mono">
                Launches the Project Loom Team Weaver engine
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
