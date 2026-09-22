import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Github,
  Globe,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Layers,
  Award,
  Calendar,
  Code2,
  Cpu,
  Mail,
  Clock
} from 'lucide-react';
import { SkillThread, SkillEvidenceItem } from '../types';

export const StudentDashboard: React.FC = () => {
  const {
    currentStudent,
    setActiveTab,
    interviews,
    acceptInterview,
    setIsDemoActive,
    goToDemoStep
  } = useApp();

  const [selectedSkill, setSelectedSkill] = useState<SkillThread>(currentStudent.skills[0]);

  // Check for any interview invitations for Chithra
  const pendingInterviews = interviews.filter((i) => i.studentId === currentStudent.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Interview Invitation Bridge (if any) */}
      {pendingInterviews.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-purple-950/80 border border-cyan-400/50 shadow-xl shadow-cyan-950/40 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Interview Invitation Received
                  </span>
                  <span className="text-[10px] bg-cyan-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {pendingInterviews[0].company} invited {pendingInterviews[0].candidateName} to Interview
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-light leading-relaxed">
                  “{pendingInterviews[0].reason}”
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
              <button
                id="btn-view-invite-proof"
                onClick={() => setActiveTab('portfolio')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                View Project Proof
              </button>

              {pendingInterviews[0].status === 'accepted' ? (
                <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Interview Accepted</span>
                </div>
              ) : (
                <button
                  id="btn-accept-interview-invitation"
                  onClick={() => acceptInterview(pendingInterviews[0].id)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
                >
                  Accept Interview
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar & Bio */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={currentStudent.avatar}
                alt={currentStudent.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-cyan-400/60 shadow-lg shadow-cyan-950"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black shadow">
                ✓
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentStudent.name}
                </h1>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-medium">
                  Verified Talent Tier I
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-300 mt-2">
                <span className="flex items-center gap-1 text-slate-200 font-medium">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  {currentStudent.university}
                </span>
                <span>•</span>
                <span className="text-slate-400">{currentStudent.degree}</span>
                <span>•</span>
                <span className="text-slate-400">Class of {currentStudent.graduationYear}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                {currentStudent.bio}
              </p>

              {/* Links */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
                <a
                  href={`https://${currentStudent.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 font-mono transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentStudent.github}</span>
                </a>
                <span className="text-slate-700">|</span>
                <a
                  href={`https://${currentStudent.portfolio}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 font-mono transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentStudent.portfolio}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics Badge Column */}
          <div className="flex md:flex-col gap-3 w-full md:w-auto shrink-0">
            <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 flex-1 md:w-48 text-center">
              <span className="text-xs text-slate-400 block font-medium">Completed Projects</span>
              <span className="text-xl font-extrabold text-white font-mono">{currentStudent.projectsCompleted}</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 flex-1 md:w-48 text-center">
              <span className="text-xs text-slate-400 block font-medium">Mentor Verified</span>
              <span className="text-xl font-extrabold text-cyan-400 font-mono">{currentStudent.mentorVerifiedCount}</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 flex-1 md:w-48 text-center">
              <span className="text-xs text-slate-400 block font-medium">Sprint Completion</span>
              <span className="text-xl font-extrabold text-emerald-400 font-mono">{currentStudent.sprintCompletionRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Skill Profile Visual Threads & Proof Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col (7 cols): AI Skill Profile Threads */}
        <div className="lg:col-span-7 bg-[#0e1424] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI Skill Profile • Digital Threads</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Skills continuously calibrated via real sprint performance & mentor reviews
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/40">
              5 Verified Threads
            </span>
          </div>

          {/* Skill Threads List */}
          <div className="space-y-4">
            {currentStudent.skills.map((skill) => {
              const isSelected = selectedSkill.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/80 border-cyan-400/80 shadow-md shadow-cyan-950'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                      <span className="text-sm sm:text-base font-bold text-white">
                        {skill.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-xs text-slate-400">Claimed: {skill.claimedLevel}%</span>
                      <span className="text-slate-600">→</span>
                      <span className="text-sm sm:text-base font-extrabold text-cyan-300">
                        {skill.verifiedPercentage}% Verified
                      </span>
                    </div>
                  </div>

                  {/* Dual Bar: Claimed vs Verified */}
                  <div className="space-y-1.5 mt-2">
                    <div className="relative w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-[1px]">
                      {/* Claimed background shadow */}
                      <div
                        className="h-full rounded-full opacity-30"
                        style={{ width: `${skill.claimedLevel}%`, backgroundColor: skill.color }}
                      />
                      {/* Verified foreground thread */}
                      <div
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 shadow-sm"
                        style={{
                          width: `${skill.verifiedPercentage}%`,
                          backgroundColor: skill.color,
                          boxShadow: `0 0 8px ${skill.color}66`
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-400">
                    <span className="font-mono">{skill.evidence.length} Verified Evidence Artifacts</span>
                    <span className="flex items-center gap-1 text-cyan-400 hover:underline">
                      Inspect Proof Chain <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('challenges')}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <span>Challenges For You</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('proof-graph')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors"
            >
              View Full Proof Graph
            </button>
          </div>
        </div>

        {/* Right Col (5 cols): Proof Equation & Selected Skill Evidence Drilldown */}
        <div className="lg:col-span-5 space-y-6">
          {/* Proof Equation Component */}
          <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Verification Architecture
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Proof Formula</span>
            </div>

            {/* Formula Block */}
            <div className="p-4 rounded-2xl bg-[#080d18] border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Claimed Skill</span>
                <span className="font-mono font-semibold text-slate-200">{selectedSkill.name} ({selectedSkill.claimedLevel}%)</span>
              </div>
              <div className="text-center text-slate-600 font-mono font-bold">+</div>
              <div className="flex justify-between items-center text-cyan-300">
                <span>Project & GitHub Evidence</span>
                <span className="font-mono font-semibold">{selectedSkill.evidence.length} Artifacts</span>
              </div>
              <div className="text-center text-slate-600 font-mono font-bold">+</div>
              <div className="flex justify-between items-center text-purple-300">
                <span>Mentor Verification</span>
                <span className="font-mono font-semibold">Dr. Aris Thorne</span>
              </div>
              <div className="border-t border-slate-700 pt-2 flex justify-between items-center text-sm font-extrabold text-white">
                <span className="text-cyan-400 font-mono">Verified Skill</span>
                <span className="font-mono text-cyan-300 text-base">{selectedSkill.verifiedPercentage}% Verified</span>
              </div>
            </div>

            {/* Detailed Evidence Cards */}
            <div className="mt-5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Evidence for {selectedSkill.name}:</span>
                <span className="text-cyan-400 font-mono font-normal text-[11px]">{selectedSkill.verifiedPercentage}% Verified</span>
              </h4>

              {selectedSkill.evidence.length > 0 ? (
                <div className="space-y-2.5">
                  {selectedSkill.evidence.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <strong className="text-white font-semibold">{item.title}</strong>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{item.verifiedAt}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed pl-5">
                        {item.description}
                      </p>
                      <div className="mt-2 pl-5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>Verified by: {item.verifiedBy}</span>
                        {item.artifactUrl && (
                          <span className="text-cyan-400 flex items-center gap-0.5">
                            Artifact Link <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900 text-center text-xs text-slate-400">
                  Sprint evidence being compiled by Project Loom.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
