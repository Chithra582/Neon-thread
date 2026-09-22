import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Layers,
  Award,
  TrendingUp,
  ShieldCheck,
  FileCheck,
  Zap,
  BarChart3,
  Clock,
  GraduationCap
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { adminMetrics } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                System Administration & Ecosystem Impact
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40 font-mono">
                TELEMETRY LIVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Platform Impact Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Macro performance tracking proof verification velocity, interview conversion rates, and skill acceleration.
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            Network Status: 100% Operational
          </div>
        </div>
      </div>

      {/* 6 Key Impact Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono block">Active Students</span>
            <span className="text-3xl font-extrabold text-white font-mono mt-1 block">
              {adminMetrics.activeStudents.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
              +18% month over month
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono block">Challenges Posted</span>
            <span className="text-3xl font-extrabold text-white font-mono mt-1 block">
              {adminMetrics.challengesPosted}
            </span>
            <span className="text-[11px] text-cyan-400 font-mono mt-1 block">
              34 Enterprise sponsors
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono block">Sprints Completed</span>
            <span className="text-3xl font-extrabold text-white font-mono mt-1 block">
              {adminMetrics.sprintsCompleted}
            </span>
            <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
              96% on-time completion
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono block">Mentor Verified Skills</span>
            <span className="text-3xl font-extrabold text-white font-mono mt-1 block">
              {adminMetrics.mentorVerifiedSkills.toLocaleString()}
            </span>
            <span className="text-[11px] text-purple-400 font-mono mt-1 block">
              Cryptographically signed
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono block">Interviews Generated</span>
            <span className="text-3xl font-extrabold text-white font-mono mt-1 block">
              {adminMetrics.interviewsGenerated}
            </span>
            <span className="text-[11px] text-cyan-400 font-mono mt-1 block">
              4.2 avg interviews per squad
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/40 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono block">Placement Rate Uplift</span>
            <span className="text-3xl font-extrabold text-emerald-400 font-mono mt-1 block">
              {adminMetrics.placementRateIncrease}
            </span>
            <span className="text-[11px] text-slate-300 font-mono mt-1 block">
              vs traditional job board applicants
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Analytical Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Time-To-Interview Comparison */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Time-To-Interview Velocity</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Resume-based screening vs. Neon Thread Proof Matching
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">7.2x Faster</span>
          </div>

          <div className="space-y-5 text-xs">
            {/* Traditional */}
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-1.5 font-mono">
                <span>Traditional Resume Screening & Cold Apply</span>
                <span className="text-rose-400 font-bold">42 Days Average</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden">
                <div className="bg-rose-500/60 h-full rounded-full" style={{ width: '85%' }} />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Manual recruiter keyword scanning, ATS parsing, cold ghosting
              </span>
            </div>

            {/* Neon Thread */}
            <div>
              <div className="flex items-center justify-between text-slate-200 mb-1.5 font-mono font-semibold">
                <span className="text-cyan-300">Neon Thread Proof-Based Direct Matching</span>
                <span className="text-emerald-400 font-bold">5.8 Days Average</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full shadow-sm"
                  style={{ width: '18%' }}
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Instant match on verified GitHub pull requests and mentor sign-offs
              </span>
            </div>
          </div>
        </div>

        {/* Skill Verification Growth: Before vs After Sprint */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <span>Candidate Skill Growth (Before vs. After Sprint)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Average student verification index lift across 7-day sprints
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400">+22% Verified Lift</span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {[
              { skill: 'Python / Microservices', before: 62, after: 89 },
              { skill: 'React / Frontend Architecture', before: 58, after: 84 },
              { skill: 'Machine Learning Pipelines', before: 45, after: 72 },
              { skill: 'SQL Optimization & Indexing', before: 52, after: 76 }
            ].map((item) => (
              <div key={item.skill} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-sans">{item.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{item.before}%</span>
                    <span className="text-slate-600">→</span>
                    <span className="text-cyan-300 font-bold">{item.after}% Verified</span>
                  </div>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-slate-700 h-full" style={{ width: `${item.before}%` }} />
                  <div
                    className="bg-cyan-400 h-full"
                    style={{ width: `${item.after - item.before}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
