/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { ChallengesPage } from './components/ChallengesPage';
import { TeamWeaver } from './components/TeamWeaver';
import { SprintWorkspace } from './components/SprintWorkspace';
import { MentorCheckIn } from './components/MentorCheckIn';
import { ProofEngine } from './components/ProofEngine';
import { PortfolioGenerator } from './components/PortfolioGenerator';
import { EmployerDashboard } from './components/EmployerDashboard';
import { EmployerTalentDiscovery } from './components/EmployerTalentDiscovery';
import { PatternLibrary } from './components/PatternLibrary';
import { AdminDashboard } from './components/AdminDashboard';
import { InnovationChecker } from './components/InnovationChecker';
import { GeminiChatbot } from './components/GeminiChatbot';
import { InterviewBridgeModal } from './components/InterviewBridgeModal';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { RoleAccessGuard } from './components/RoleAccessGuard';
import { Bot, Sparkles } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, setActiveTab, currentRole } = useApp();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* Top Navigation */}
      <Navbar />

      {/* Main View Router with Role Protection */}
      <main className="flex-1 pb-16">
        {activeTab === 'landing' && <LandingPage />}

        {/* Student-Only Views */}
        {activeTab === 'student-profile' &&
          (currentRole === 'student' ? (
            <StudentDashboard />
          ) : (
            <RoleAccessGuard
              requiredRole="student"
              currentRole={currentRole}
              featureTitle="Student AI Skill Threads"
            />
          ))}

        {/* Challenge explorer is visible to students, employers, and admin */}
        {activeTab === 'challenges' && <ChallengesPage />}

        {/* Team Weaver / Loom is accessible to students and mentors */}
        {(activeTab === 'team-loom' || activeTab === 'team-weaver') && <TeamWeaver />}

        {/* Sprint Workspace */}
        {(activeTab === 'sprint-workspace' || activeTab === 'sprint') && <SprintWorkspace />}

        {/* Mentor-Only Views */}
        {activeTab === 'mentor-checkin' &&
          (currentRole === 'mentor' ? (
            <MentorCheckIn />
          ) : (
            <RoleAccessGuard
              requiredRole="mentor"
              currentRole={currentRole}
              featureTitle="Mentor Check-In Console"
            />
          ))}

        {/* Innovation & Novelty Checker */}
        {activeTab === 'innovation-check' && <InnovationChecker />}

        {/* Gemini Multi-turn Chatbot */}
        {activeTab === 'gemini-chat' && <GeminiChatbot />}

        {/* Proof Engine & Graph */}
        {activeTab === 'proof-graph' && <ProofEngine />}

        {/* Student Portfolio */}
        {activeTab === 'portfolio' && <PortfolioGenerator />}

        {/* Employer-Only Views */}
        {(activeTab === 'employer-challenges' || activeTab === 'employer-dashboard') &&
          (currentRole === 'employer' ? (
            <EmployerDashboard />
          ) : (
            <RoleAccessGuard
              requiredRole="employer"
              currentRole={currentRole}
              featureTitle="Employer Command Center"
            />
          ))}

        {activeTab === 'employer-talent' &&
          (currentRole === 'employer' || currentRole === 'admin' ? (
            <EmployerTalentDiscovery />
          ) : (
            <RoleAccessGuard
              requiredRole="employer"
              currentRole={currentRole}
              featureTitle="Verified Talent Discovery"
            />
          ))}

        {activeTab === 'pattern-library' &&
          (currentRole === 'employer' ? (
            <PatternLibrary />
          ) : (
            <RoleAccessGuard
              requiredRole="employer"
              currentRole={currentRole}
              featureTitle="Enterprise Pattern Library"
            />
          ))}

        {/* Admin-Only Views */}
        {(activeTab === 'admin-impact' || activeTab === 'admin-analytics') &&
          (currentRole === 'admin' ? (
            <AdminDashboard />
          ) : (
            <RoleAccessGuard
              requiredRole="admin"
              currentRole={currentRole}
              featureTitle="Platform Impact Telemetry"
            />
          ))}
      </main>

      {/* Google Authentication & Role Selection Modal */}
      <GoogleAuthModal />

      {/* Interview Invitation Bridge Modal */}
      <InterviewBridgeModal />

      {/* Floating Gemini Chatbot Quick-Access Button */}
      {activeTab !== 'gemini-chat' && (
        <button
          id="btn-floating-gemini-chat"
          onClick={() => setActiveTab('gemini-chat')}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs shadow-2xl shadow-cyan-500/30 border border-cyan-300/40 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group"
          title="Open Gemini Multi-Turn Assistant"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-slate-950" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
          <span className="tracking-wide">Ask Gemini AI</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-lg bg-slate-950 text-cyan-300 font-mono font-bold">
            Chat
          </span>
        </button>
      )}

      {/* Modern subtle footer */}
      <footer className="border-t border-slate-900/80 bg-[#050810] py-6 px-4 sm:px-8 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-slate-400 font-semibold">Neon Thread – Project Loom</span>
            <span>• Proof-Based Talent Architecture</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Claimed Skill + Project Evidence + Mentor Signoff = Verified Proof</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
