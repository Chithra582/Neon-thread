import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle2, X, Send, Sparkles, Building2, User } from 'lucide-react';

export const InterviewBridgeModal: React.FC = () => {
  const {
    isInviteModalOpen,
    setIsInviteModalOpen,
    inviteCandidate,
    sendInterviewInvitation,
    activeChallenge
  } = useApp();

  const [company, setCompany] = useState('TechNova');
  const [reason, setReason] = useState(
    'Candidate demonstrated Python, React and AI skills through a verified 7-day employer project.'
  );

  if (!isInviteModalOpen || !inviteCandidate) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendInterviewInvitation(inviteCandidate.id, company, reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-cyan-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setIsInviteModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Interview Bridge
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          Invite to Interview
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Connect directly with candidate backed by verified sprint evidence.
        </p>

        {/* Candidate & Project Details */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              Company:
            </span>
            <strong className="text-white font-mono">{company}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              Candidate:
            </span>
            <strong className="text-cyan-300 font-semibold">{inviteCandidate.name}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Verified Proof Project:</span>
            <span className="text-purple-300 font-mono text-[11px] truncate max-w-[200px]">
              {activeChallenge.title}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
              Invitation Reason (Grounded in Verified Proof)
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-[#080d18] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans leading-relaxed"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              id="btn-confirm-send-interview-invite"
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Interview Invitation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
