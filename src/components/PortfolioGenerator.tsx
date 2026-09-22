import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  CheckCircle2,
  Share2,
  ExternalLink,
  Github,
  Download,
  ShieldCheck,
  Sparkles,
  Layers,
  Zap,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PortfolioGenerator: React.FC = () => {
  const { portfolioProof, currentStudent, setActiveTab, currentRole, openAuthModal } = useApp();
  const [isCopied, setIsCopied] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleCopyLink = () => {
    setIsCopied(true);
    navigator.clipboard?.writeText?.(
      `https://neonthread.io/proof/${portfolioProof.verificationHash}`
    );
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAddToPortfolio = () => {
    setIsAdded(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Automated Portfolio Proof Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Verified Project Proof Card
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Generated automatically upon sprint sign-off. Backed by immutable commit hashes, performance metrics, and mentor verification.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Link Copied!' : 'Copy Proof Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Proof Card Showcase Container */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-b from-[#0f172a] to-[#090e1a] border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-cyan-950/60 relative overflow-hidden">
          {/* Subtle glowing watermark */}
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <ShieldCheck className="w-48 h-48 text-cyan-400" />
          </div>

          {/* Top Stamp */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px]">
                <div className="w-full h-full bg-[#0b0f19] rounded-[9px] flex items-center justify-center">
                  <Award className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                  NEON THREAD VERIFIED PROOF
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Cert ID: {portfolioProof.verificationHash}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-open-innovation-from-portfolio"
                onClick={() => setActiveTab('innovation-check')}
                className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono font-bold flex items-center gap-1 transition-colors"
                title="View Innovation & Novelty Audit"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>INNOVATION: 94/100</span>
              </button>

              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>AUTHENTICATED</span>
              </span>
            </div>
          </div>

          {/* Project Title & Role */}
          <div className="mb-6">
            <span className="text-xs text-slate-400 font-mono block mb-1">
              {portfolioProof.company} • {portfolioProof.sprintDuration} Sprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {portfolioProof.title}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono font-semibold">
                Role: {portfolioProof.role}
              </span>
              <span className="text-xs text-slate-400">by {currentStudent.name}</span>
            </div>
          </div>

          {/* Skills Proven */}
          <div className="mb-6">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Skills Proven in Production:
            </span>
            <div className="flex flex-wrap gap-2">
              {portfolioProof.skillsProven.map((sk) => (
                <span
                  key={sk}
                  className="px-3 py-1 rounded-xl bg-slate-900/90 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{sk}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Contribution Statement */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Candidate Engineering Contribution:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              “{portfolioProof.contribution}”
            </p>
          </div>

          {/* Verification & Evidence Artifacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-slate-400 font-mono block mb-1">Verified By:</span>
              <strong className="text-purple-300 block">{portfolioProof.verifiedBy}</strong>
              <span className="text-[11px] text-slate-500 mt-0.5 block">{portfolioProof.evidence.mentorReview}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-slate-400 font-mono block mb-1">Evidence Artifacts:</span>
              <div className="space-y-1 font-mono text-[11px] text-cyan-400">
                <div className="flex items-center gap-1 truncate">
                  <Github className="w-3 h-3 shrink-0" />
                  <span className="truncate">{portfolioProof.evidence.github}</span>
                </div>
                <div className="flex items-center gap-1 truncate text-emerald-400">
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  <span className="truncate">{portfolioProof.evidence.demo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] text-slate-400 font-mono">
              Published: {portfolioProof.dateGenerated} • Tamper-proof
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                id="btn-add-to-portfolio"
                onClick={handleAddToPortfolio}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAdded ? 'Added to Portfolio Profile ✓' : 'Add to Portfolio'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transition to Employer view */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 mb-3">
            Want to see how employers discover this proof when hiring?
          </p>
          <button
            id="btn-switch-to-employer-from-portfolio"
            onClick={() => {
              if (currentRole === 'employer') {
                setActiveTab('employer-talent');
              } else {
                openAuthModal('signin', 'employer');
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-300 border border-blue-500/40 text-xs font-semibold transition-colors"
          >
            <span>{currentRole === 'employer' ? 'Open Employer Talent Discovery' : 'Sign in as Employer to Discover Talent'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
