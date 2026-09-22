import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  PlusCircle,
  Users,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Layers,
  FileCheck,
  ShieldCheck,
  TrendingUp,
  X
} from 'lucide-react';

export const EmployerDashboard: React.FC = () => {
  const { challenges, createChallenge, setActiveTab, setCurrentRole } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New challenge form state
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('TechNova');
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('Python, React, Machine Learning, SQL');
  const [duration, setDuration] = useState('7 Days');
  const [teamSize, setTeamSize] = useState(4);
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [expectedOutcome, setExpectedOutcome] = useState('Interactive analytics dashboard with live ML sentiment predictions.');
  const [evaluationCriteria, setEvaluationCriteria] = useState('Latency < 120ms, 90%+ code coverage, clean REST endpoints.');

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    createChallenge({
      title,
      company,
      companyLogo: 'TN',
      sponsorTier: 'Enterprise',
      description,
      requiredSkills: requiredSkills.split(',').map((s) => s.trim()).filter(Boolean),
      duration,
      teamSize,
      difficulty,
      expectedOutcome,
      evaluationCriteria
    });
    setIsCreateModalOpen(false);
    // Reset
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Employer Banner */}
      <div className="bg-[#0e1424] border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-400/40 flex items-center justify-center font-extrabold text-xl shadow-lg shadow-blue-950">
              TN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  Employer Challenge Command
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/40 font-mono">
                  ENTERPRISE PARTNER
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                TechNova Portal
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Launch production problem statements, watch digital squads form, and hire proven builders.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="btn-open-create-challenge"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Challenge</span>
            </button>

            <button
              onClick={() => setActiveTab('employer-talent')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors"
            >
              Talent Discovery
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono block">Active Challenges</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-extrabold text-cyan-300 font-mono">
              {challenges.length}
            </span>
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Live across partner universities</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono block">Participating Students</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-extrabold text-blue-300 font-mono">14 Candidates</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Organized into 4 Loom Squads</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono block">Verified Proofs Generated</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">28 Artifacts</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Mentor-verified code pull requests</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono block">Interview Invitations</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-extrabold text-purple-300 font-mono">7 Extended</span>
            <FileCheck className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Zero resume screening required</span>
        </div>
      </div>

      {/* Challenges Management Table */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">
              Your Active Sprints & Challenges
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Track squad formation, sprint progress, and deliverables
            </p>
          </div>
          <button
            onClick={() => setActiveTab('pattern-library')}
            className="text-xs text-cyan-400 hover:underline font-mono"
          >
            Browse Reusable Pattern Library →
          </button>
        </div>

        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">{challenge.company}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400 font-mono">{challenge.duration}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                    {challenge.difficulty}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{challenge.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-1 max-w-2xl">
                  {challenge.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {challenge.requiredSkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <button
                  onClick={() => {
                    setActiveTab('sprint-workspace');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  Sprint Board
                </button>
                <button
                  onClick={() => {
                    setActiveTab('employer-talent');
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 transition-all"
                >
                  Inspect Talent Pool
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Challenge Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0f172a] border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Post Employer Challenge
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Define a real engineering scenario to mobilize complementary student squads.
            </p>

            <form onSubmit={handleCreateChallenge} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Vector Retrieval Engine"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#080d18] border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Problem Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the production context, input data stream, and core constraints..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#080d18] border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Required Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                    className="w-full bg-[#080d18] border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Sprint Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#080d18] border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="7 Days">7 Days (Standard Sprint)</option>
                    <option value="14 Days">14 Days (Extended Sprint)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Team Size
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={6}
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full bg-[#080d18] border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full bg-[#080d18] border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Expected Outcome Deliverable
                </label>
                <input
                  type="text"
                  value={expectedOutcome}
                  onChange={(e) => setExpectedOutcome(e.target.value)}
                  className="w-full bg-[#080d18] border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Evaluation Criteria
                </label>
                <input
                  type="text"
                  value={evaluationCriteria}
                  onChange={(e) => setEvaluationCriteria(e.target.value)}
                  className="w-full bg-[#080d18] border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20"
                >
                  Deploy Challenge to Loom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
