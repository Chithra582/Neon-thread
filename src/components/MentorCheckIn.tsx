import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Star,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  GitCommit,
  GitPullRequest,
  ShieldCheck,
  Bot,
  ArrowRight,
  TrendingUp,
  Zap,
  FileCheck
} from 'lucide-react';

export const MentorCheckIn: React.FC = () => {
  const {
    mentorCheckin,
    sprintWorkspace,
    approveSprint,
    requestSprintChanges,
    setCurrentRole,
    setActiveTab,
    currentStudent
  } = useApp();

  const [progressRating, setProgressRating] = useState(mentorCheckin.progressRating || 4);
  const [techRating, setTechRating] = useState(mentorCheckin.technicalQualityRating || 4);
  const [collabRating, setCollabRating] = useState(mentorCheckin.collaborationRating || 5);
  const [feedback, setFeedback] = useState(
    mentorCheckin.feedback ||
      'Good implementation of the API layer. Improve error handling and add authentication before final submission.'
  );
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  // AI Feedback Summarizer
  const handleAiSummarize = async () => {
    setIsSummarizing(true);
    try {
      const res = await fetch('/api/ai/summarize-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawFeedback: feedback,
          ratings: { progress: progressRating, technical: techRating, collaboration: collabRating }
        })
      });
      const data = await res.json();
      if (data.summary) {
        setAiSummary(data.summary);
      }
    } catch (err) {
      console.warn('AI summarize error:', err);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleApprove = () => {
    approveSprint(feedback, {
      progress: progressRating,
      technical: techRating,
      collaboration: collabRating
    });
  };

  const isApproved = mentorCheckin.status === 'approved';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Mentor Header */}
      <div className="bg-[#0e1424] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
              alt="Dr. Aris Thorne"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/60 shadow-lg shadow-purple-950"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                  Verified Mentor Console
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60 font-mono">
                  TECHNOVA SPRINT
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Dr. Aris Thorne
              </h1>
              <span className="text-xs text-slate-400 block mt-0.5">
                Principal AI Systems Architect • Former Google DeepMind
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            Assigned Sprint:{' '}
            <strong className="text-white block font-sans text-sm">{sprintWorkspace.challengeTitle}</strong>
          </div>
        </div>
      </div>

      {/* Top Grid: Team Progress, Completed Tasks, GitHub Activity, Blockers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono block">Sprint Progress</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-extrabold text-cyan-300 font-mono">
              {sprintWorkspace.progress}%
            </span>
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Day 5 of 7 Milestone Passed</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono block">Completed Tasks</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              {sprintWorkspace.tasks.filter((t) => t.status === 'completed').length} / {sprintWorkspace.tasks.length}
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Full CI Pass on Schemas & NLP</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono block">GitHub Commit Activity</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-extrabold text-purple-300 font-mono">48 Commits</span>
            <GitCommit className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">5 Pull Requests Merged</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono block">Sprint Blockers</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-bold text-amber-300 truncate">1 Resolved</span>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">FastAPI CORS Token Pre-flight</span>
        </div>
      </div>

      {/* Main Check-In Interface Card */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Weekly Mentor Check-in Console</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review code quality, team dynamics, and formalize verified skill tokens
            </p>
          </div>
          {isApproved && (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>APPROVED & SIGNED</span>
            </span>
          )}
        </div>

        {/* Rating Bars (1 to 5 stars) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Progress Rating */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Progress</span>
              <span className="text-xs font-mono font-bold text-cyan-400">{progressRating}/5</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setProgressRating(star)}
                  className="p-1 text-slate-600 hover:text-amber-400 transition-colors"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= progressRating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Technical Quality Rating */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Technical Quality</span>
              <span className="text-xs font-mono font-bold text-cyan-400">{techRating}/5</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setTechRating(star)}
                  className="p-1 text-slate-600 hover:text-amber-400 transition-colors"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= techRating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Team Collaboration Rating */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Team Collaboration</span>
              <span className="text-xs font-mono font-bold text-cyan-400">{collabRating}/5</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setCollabRating(star)}
                  className="p-1 text-slate-600 hover:text-amber-400 transition-colors"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= collabRating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Innovation & Novelty Telemetry */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white font-mono">Innovation Audit Score: 94/100</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60 font-mono font-bold">
                  TOP 3% NOVELTY
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Sub-120ms Transformer vectorization & async event bus verified without tutorial boilerplate clones.
              </p>
            </div>
          </div>

          <button
            id="btn-mentor-innovation-audit"
            onClick={() => setActiveTab('innovation-check')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Deep Innovation Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mentor Feedback Textarea */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Mentor Evaluation & Technical Notes
            </label>
            <button
              onClick={handleAiSummarize}
              disabled={isSummarizing}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>{isSummarizing ? 'Synthesizing...' : 'Summarize with AI'}</span>
            </button>
          </div>
          <textarea
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full bg-[#080d18] border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-500 font-sans leading-relaxed"
            placeholder="Provide technical feedback, architectural recommendations, and validation sign-off..."
          />
        </div>

        {/* AI Summarized Feedback Box (if triggered) */}
        {aiSummary && (
          <div className="mb-6 p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 space-y-1.5 whitespace-pre-line font-mono">
            <div className="flex items-center gap-1.5 font-bold text-purple-300 mb-1">
              <Bot className="w-4 h-4" />
              <span>AI Synthesized Action Items:</span>
            </div>
            {aiSummary}
          </div>
        )}

        {/* Evidence Verification Tokens (Generated Upon Approval) */}
        {isApproved && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cryptographic Proof Tokens Issued to Student Profiles</span>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-cyan-300 border border-cyan-500/30">
                VERIFIED_PYTHON_ASYNC_PIPELINE: +5% (Now 92%)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-cyan-300 border border-cyan-500/30">
                VERIFIED_REACT_COMPONENT_ISOLATION: +4% (Now 86%)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-purple-300 border border-purple-500/30">
                VERIFIED_ML_SENTIMENT_DRIFT: +6% (Now 74%)
              </span>
            </div>
          </div>
        )}

        {/* Buttons: Approve Sprint vs Request Changes */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            Sign-off by <strong className="text-white">Dr. Aris Thorne</strong> directly authenticates candidate proof graphs.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="btn-request-changes"
              onClick={() => requestSprintChanges(feedback)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              Request Changes
            </button>

            <button
              id="btn-approve-sprint"
              onClick={handleApprove}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isApproved ? 'Sprint Approved ✓' : 'Approve Sprint & Generate Proof'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation to Proof Engine & Portfolio */}
      {isApproved && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Sprint Verified! Student Proof Graph & Portfolio Updated
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Inspect how Chithra's Python & React verification percentages elevated and view the auto-generated proof card.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="btn-goto-proof-engine"
              onClick={() => {
                setCurrentRole('student');
                setActiveTab('proof-graph');
              }}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 transition-all"
            >
              Open Proof Engine
            </button>
            <button
              id="btn-goto-portfolio-proof"
              onClick={() => {
                setCurrentRole('student');
                setActiveTab('portfolio');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              Open Portfolio Proof
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
