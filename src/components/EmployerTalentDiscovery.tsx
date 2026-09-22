import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Award,
  Sparkles,
  ExternalLink,
  Github,
  CheckCircle2,
  Send,
  Search,
  Filter,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Student } from '../types';

export const EmployerTalentDiscovery: React.FC = () => {
  const {
    students,
    openInviteModal,
    setActiveTab,
    setCurrentRole,
    interviews
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSkill, setFilterSkill] = useState('all');

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.university.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterSkill === 'all') return matchesSearch;
    const hasSkill = s.skills.some((sk) => sk.name.toLowerCase().includes(filterSkill.toLowerCase()));
    return matchesSearch && hasSkill;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#0e1424] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Evidence-Based Recruitment
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40 font-mono">
                NO RESUME SCREENING NEEDED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Verified Talent Discovery
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Source verified engineering candidates with cryptographic sprint evidence, peer collaboration ratings, and mentor sign-offs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Invitations Sent: <strong className="text-cyan-300">{interviews.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name or university..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#090d18] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs text-slate-400 font-mono mr-1">Filter by Skill:</span>
          {['all', 'python', 'react', 'machine learning', 'sql'].map((sk) => (
            <button
              key={sk}
              onClick={() => setFilterSkill(sk)}
              className={`px-3 py-1 rounded-xl text-xs capitalize font-medium transition-colors shrink-0 ${
                filterSkill === sk
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sk}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStudents.map((student) => {
          const isInterviewed = interviews.some((i) => i.studentId === student.id);
          return (
            <div
              key={student.id}
              className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Info */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400/50"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{student.name}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono font-bold">
                          ✓ VERIFIED
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        {student.university} • {student.degree}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`https://${student.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                    title="View GitHub Artifacts"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                  </a>
                </div>

                {/* Skill Verification Bars */}
                <div className="space-y-2.5 my-5">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                    Verified Skill Threads:
                  </span>
                  {student.skills.slice(0, 4).map((sk) => (
                    <div key={sk.id} className="text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-300 font-medium">{sk.name}</span>
                        <span className="font-mono text-cyan-300 font-bold">
                          {sk.verifiedPercentage}% Verified
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${sk.verifiedPercentage}%`,
                            backgroundColor: sk.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Performance Metrics Row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800 text-center text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">Projects Done</span>
                    <strong className="text-white font-mono text-sm">{student.projectsCompleted}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">Mentor Verified</span>
                    <strong className="text-cyan-400 font-mono text-sm">{student.mentorVerifiedCount}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">Sprint Pass</span>
                    <strong className="text-emerald-400 font-mono text-sm">{student.sprintCompletionRate}%</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-2 flex items-center justify-between gap-3">
                <button
                  id={`btn-view-proof-${student.id}`}
                  onClick={() => {
                    setActiveTab('proof-graph');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <span>View Proof Graph</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                {isInterviewed ? (
                  <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Interview Sent</span>
                  </div>
                ) : (
                  <button
                    id={`btn-invite-interview-${student.id}`}
                    onClick={() => openInviteModal(student)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Invite to Interview</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
