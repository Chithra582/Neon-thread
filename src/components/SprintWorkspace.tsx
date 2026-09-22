import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  CheckCircle2,
  Users,
  GitPullRequest,
  GitCommit,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Award,
  ChevronRight,
  Bot
} from 'lucide-react';
import { SprintTask } from '../types';

export const SprintWorkspace: React.FC = () => {
  const { sprintWorkspace, updateTaskStatus, currentRole, openAuthModal, setActiveTab } = useApp();
  const [selectedTask, setSelectedTask] = useState<SprintTask | null>(sprintWorkspace.tasks[3]); // BERT inference task

  const columns: { key: SprintTask['status']; label: string; color: string }[] = [
    { key: 'todo', label: 'TO DO', color: 'border-slate-700 text-slate-400' },
    { key: 'in_progress', label: 'IN PROGRESS', color: 'border-blue-500/40 text-blue-300' },
    { key: 'review', label: 'REVIEW', color: 'border-amber-500/40 text-amber-300' },
    { key: 'completed', label: 'COMPLETED', color: 'border-emerald-500/40 text-emerald-300' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Sprint Header */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Active 7-Day Sprint • Day 5 of 7
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                {sprintWorkspace.company}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sprint: {sprintWorkspace.challengeTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Collaborative agile cycle converting tasks into verifiable GitHub commits and mentor-attested skills.
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                id="btn-sprint-gemini-chat"
                onClick={() => setActiveTab('gemini-chat')}
                className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>Consult Gemini Architect on this Sprint</span>
              </button>
            </div>
          </div>

          {/* Progress Bar & Mentor Quick Callout */}
          <div className="w-full lg:w-80 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shrink-0">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-400 font-medium">Sprint Completion</span>
              <span className="text-base font-extrabold text-cyan-300 font-mono">
                {sprintWorkspace.progress}%
              </span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${sprintWorkspace.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400">
              <span>Mentor: <strong className="text-slate-200">{sprintWorkspace.mentorName}</strong></span>
              <button
                id="btn-goto-mentor-checkin"
                onClick={() => {
                  if (currentRole === 'mentor') {
                    setActiveTab('mentor-checkin');
                  } else {
                    openAuthModal('signin', 'mentor');
                  }
                }}
                className="text-cyan-400 hover:underline flex items-center gap-0.5 font-mono"
              >
                {currentRole === 'mentor' ? 'Check-In Console' : 'Mentor Sign-in'} <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 7-Day Milestone Roadmap Timeline */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-3">
            7-Day Sprint Roadmap
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {sprintWorkspace.dayPhases.map((phase) => {
              const isCompleted = phase.status === 'completed';
              const isActive = phase.status === 'active';
              return (
                <div
                  key={phase.dayRange}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isActive
                      ? 'bg-cyan-950/40 border-cyan-400/80 shadow-md shadow-cyan-950'
                      : isCompleted
                      ? 'bg-slate-900/60 border-emerald-500/40 text-slate-300'
                      : 'bg-slate-900/30 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-[10px] text-slate-400">
                      {phase.dayRange}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : isActive ? (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    ) : (
                      <Clock className="w-3 h-3 text-slate-600" />
                    )}
                  </div>
                  <h4 className={`font-semibold ${isActive ? 'text-cyan-300 font-bold' : 'text-white'}`}>
                    {phase.phaseName}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Task Board (Kanban Columns) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Sprint Task Board • Verified Deliverables</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {sprintWorkspace.tasks.length} Tasks Tracked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colTasks = sprintWorkspace.tasks.filter((t) => t.status === col.key);
            return (
              <div
                key={col.key}
                className="bg-[#0b101c] border border-slate-800/80 rounded-2xl p-4 min-h-[420px] flex flex-col"
              >
                {/* Column Header */}
                <div className={`flex items-center justify-between pb-3 mb-3 border-b border-slate-800 ${col.color}`}>
                  <span className="text-xs font-mono font-bold tracking-wider">{col.label}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {colTasks.length}
                  </span>
                </div>

                {/* Tasks in Column */}
                <div className="space-y-3 flex-1">
                  {colTasks.map((task) => {
                    const isSelected = selectedTask?.id === task.id;
                    return (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-slate-800 border-cyan-400 shadow-md'
                            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {/* Skill Badge & Deadline */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 font-mono">
                            {task.skill}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{task.deadlineDay}</span>
                        </div>

                        {/* Title */}
                        <h4 className="font-semibold text-slate-200 mb-2 leading-snug">
                          {task.title}
                        </h4>

                        {/* Assignee and Evidence Indicator */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-2">
                          <div className="flex items-center gap-1.5">
                            <img
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                              className="w-5 h-5 rounded-full object-cover"
                            />
                            <span className="text-[11px] text-slate-300 truncate max-w-[90px]">
                              {task.assignee.name}
                            </span>
                          </div>

                          {task.evidence ? (
                            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5">
                              <GitCommit className="w-3 h-3" />
                              <span>Verified</span>
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-mono">In Progress</span>
                          )}
                        </div>

                        {/* Quick status transition dropdown/buttons */}
                        <div className="mt-2.5 pt-2 border-t border-slate-800 flex justify-end gap-1">
                          {task.status !== 'completed' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateTaskStatus(task.id, 'completed');
                              }}
                              className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-mono"
                            >
                              ✓ Mark Complete
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Artifact & Evidence Inspector Drawer */}
      {selectedTask && (
        <div className="bg-[#0e1424] border border-cyan-500/30 rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Evidence Artifact Inspector
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {selectedTask.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
                Skill: {selectedTask.skill}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                Status: {selectedTask.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1 font-mono">Assignee</span>
              <div className="flex items-center gap-2">
                <img
                  src={selectedTask.assignee.avatar}
                  alt={selectedTask.assignee.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <strong className="text-white text-sm">{selectedTask.assignee.name}</strong>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1 font-mono">GitHub Commit Artifact</span>
              <div className="flex items-center gap-2 text-cyan-300 font-mono">
                <GitCommit className="w-4 h-4" />
                <span>{selectedTask.evidence?.commitHash || '0x8f2a1b9_HEAD'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1 font-mono">Pull Request / Review</span>
              <div className="flex items-center gap-2 text-purple-300 font-mono">
                <GitPullRequest className="w-4 h-4" />
                <span>{selectedTask.evidence?.pullRequest || 'PR #4: Merge Verified'}</span>
              </div>
            </div>
          </div>

          {selectedTask.evidence?.description && (
            <p className="mt-4 text-xs text-slate-300 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 leading-relaxed font-light">
              <strong className="text-white font-medium">Deliverable Summary:</strong>{' '}
              {selectedTask.evidence.description}
            </p>
          )}

          {/* Action to proceed to next stage */}
          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={() => setActiveTab('proof-graph')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>View Proof Graph</span>
            </button>

            {currentRole === 'mentor' ? (
              <button
                id="btn-proceed-to-mentor-checkin"
                onClick={() => setActiveTab('mentor-checkin')}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-purple-600/20"
              >
                <span>Open Mentor Check-In Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="btn-mentor-review-login"
                onClick={() => openAuthModal('signin', 'mentor')}
                className="px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-600/40 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <span>Sign in as Mentor to Review & Sign</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
