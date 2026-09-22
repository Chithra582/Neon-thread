import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Layers,
  Briefcase,
  Award,
  CheckCircle2,
  Users,
  Bell,
  Code2,
  Compass,
  Cpu,
  BarChart3,
  ExternalLink,
  ChevronDown,
  LogOut,
  UserCheck,
  Shield,
  GraduationCap,
  Building2,
  ShieldCheck,
  Zap,
  Lock,
  Bot,
  MessageSquare
} from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    authUser,
    currentRole,
    activeTab,
    setActiveTab,
    notifications,
    markNotificationRead,
    openAuthModal,
    logout
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getRoleTheme = (role: UserRole) => {
    switch (role) {
      case 'student':
        return {
          badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60',
          label: 'Student Account',
          icon: GraduationCap,
          ring: 'ring-cyan-500/40'
        };
      case 'employer':
        return {
          badge: 'bg-blue-950/80 text-blue-300 border-blue-800/60',
          label: 'Employer Account',
          icon: Building2,
          ring: 'ring-blue-500/40'
        };
      case 'mentor':
        return {
          badge: 'bg-purple-950/80 text-purple-300 border-purple-800/60',
          label: 'Mentor Account',
          icon: ShieldCheck,
          ring: 'ring-purple-500/40'
        };
      case 'admin':
        return {
          badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
          label: 'Admin Account',
          icon: Cpu,
          ring: 'ring-emerald-500/40'
        };
    }
  };

  const roleTheme = getRoleTheme(currentRole);
  const RoleIcon = roleTheme.icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090b10]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-btn"
              onClick={() => setActiveTab('landing')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
                <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                  <div className="relative">
                    <span className="w-3 h-3 block rounded-full bg-cyan-400 animate-pulse" />
                    <span className="absolute -inset-1 rounded-full border border-cyan-400/40 animate-ping" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                    Neon Thread
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 font-mono font-semibold">
                    PROJECT LOOM
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block -mt-0.5 font-medium">
                  Proof-Based Talent Matching
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links based on role */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              id="nav-landing"
              onClick={() => setActiveTab('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'landing'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Overview
            </button>

            {/* Innovation Checker - Available across roles */}
            <button
              id="nav-innovation-check"
              onClick={() => setActiveTab('innovation-check')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'innovation-check'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                  : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10 border border-transparent'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Innovation Checker</span>
            </button>

            {/* Gemini Multi-turn Assistant - Available across all roles */}
            <button
              id="nav-gemini-chat"
              onClick={() => setActiveTab('gemini-chat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'gemini-chat'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/20 ring-1 ring-cyan-500/30'
                  : 'text-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10 border border-transparent'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gemini Assistant</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono font-bold">
                AI
              </span>
            </button>

            {/* Student Links */}
            {currentRole === 'student' && (
              <>
                <button
                  id="nav-student-profile"
                  onClick={() => setActiveTab('student-profile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'student-profile'
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Skill Threads
                </button>
                <button
                  id="nav-challenges"
                  onClick={() => setActiveTab('challenges')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'challenges'
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Challenges For You
                </button>
                <button
                  id="nav-team-weaver"
                  onClick={() => setActiveTab('team-weaver')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'team-weaver'
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Team Weaver
                </button>
                <button
                  id="nav-sprint"
                  onClick={() => setActiveTab('sprint')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'sprint'
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Sprint Workspace
                </button>
                <button
                  id="nav-proof-graph"
                  onClick={() => setActiveTab('proof-graph')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'proof-graph'
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Proof Graph
                </button>
                <button
                  id="nav-portfolio"
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'portfolio'
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Portfolio Proof
                </button>
              </>
            )}

            {/* Employer Links */}
            {currentRole === 'employer' && (
              <>
                <button
                  id="nav-employer-dashboard"
                  onClick={() => setActiveTab('employer-dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'employer-dashboard'
                      ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Employer Dashboard
                </button>
                <button
                  id="nav-employer-talent"
                  onClick={() => setActiveTab('employer-talent')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'employer-talent'
                      ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Verified Talent
                </button>
                <button
                  id="nav-pattern-library"
                  onClick={() => setActiveTab('pattern-library')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'pattern-library'
                      ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Pattern Library
                </button>
              </>
            )}

            {/* Mentor Links */}
            {currentRole === 'mentor' && (
              <>
                <button
                  id="nav-mentor-checkin"
                  onClick={() => setActiveTab('mentor-checkin')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'mentor-checkin'
                      ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Mentor Check-In Console
                </button>
                <button
                  id="nav-mentor-sprint"
                  onClick={() => setActiveTab('sprint')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'sprint'
                      ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Sprint Code Reviews
                </button>
                <button
                  id="nav-mentor-proof"
                  onClick={() => setActiveTab('proof-graph')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'proof-graph'
                      ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Proof Verification Engine
                </button>
              </>
            )}

            {/* Admin Links */}
            {currentRole === 'admin' && (
              <button
                id="nav-admin-analytics"
                onClick={() => setActiveTab('admin-analytics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'admin-analytics'
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                Platform Impact Dashboard
              </button>
            )}
          </nav>

          {/* Right Controls: Google User Profile & Notifications */}
          <div className="flex items-center gap-3">
            {authUser ? (
              <div className="relative">
                <button
                  id="btn-google-user-menu"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl bg-[#0e1424] hover:bg-[#131c33] border border-slate-800 hover:border-slate-700 transition-all ${roleTheme.ring}`}
                  title="Google Account & Role Profile"
                >
                  {/* Google Avatar with mini G badge */}
                  <div className="relative">
                    <img
                      src={authUser.avatar}
                      alt={authUser.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-700"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center p-0.5 shadow">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.39 7.37 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.61 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Name & Role badge */}
                  <div className="text-left hidden sm:block">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white leading-tight">
                        {authUser.name}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold border ${roleTheme.badge}`}
                      >
                        {roleTheme.label.split(' ')[0]}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono block -mt-0.5">
                      {authUser.email}
                    </span>
                  </div>

                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Google Account & Role Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#0d1322] border border-slate-700/90 rounded-2xl shadow-2xl p-3 z-50 animate-fadeIn">
                    {/* User summary */}
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 mb-2">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <img
                          src={authUser.avatar}
                          alt={authUser.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-700"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-white truncate">
                            {authUser.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono truncate">
                            {authUser.email}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Assigned Role:</span>
                        <span
                          className={`px-2 py-0.5 rounded font-mono font-semibold text-[10px] border ${roleTheme.badge}`}
                        >
                          {roleTheme.label}
                        </span>
                      </div>
                      {authUser.organization && (
                        <div className="mt-1 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">Organization:</span>
                          <span className="text-slate-200 font-medium truncate max-w-[140px]">
                            {authUser.organization}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Security Notice */}
                    <div className="px-2.5 py-2 mb-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400">
                      <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Roles are isolated per Google account for cryptographic proof validity.</span>
                    </div>

                    {/* Actions */}
                    <div className="space-y-1">
                      <button
                        id="btn-menu-switch-account"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          openAuthModal('signin');
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-slate-800/70 text-slate-200 text-xs font-medium flex items-center gap-2 transition-colors text-left"
                      >
                        <UserCheck className="w-4 h-4 text-cyan-400" />
                        <span>Switch Google Account / Role</span>
                      </button>

                      <button
                        id="btn-menu-register-new"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          openAuthModal('register');
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-slate-800/70 text-slate-200 text-xs font-medium flex items-center gap-2 transition-colors text-left"
                      >
                        <GraduationCap className="w-4 h-4 text-blue-400" />
                        <span>Register New Role with Google</span>
                      </button>

                      <div className="pt-1 mt-1 border-t border-slate-800">
                        <button
                          id="btn-menu-signout"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full px-3 py-2 rounded-xl hover:bg-red-950/30 text-red-400 hover:text-red-300 text-xs font-medium flex items-center gap-2 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="btn-navbar-google-signin"
                  onClick={() => openAuthModal('signin')}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow transition-all"
                >
                  <div className="w-3.5 h-3.5">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.39 7.37 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.61 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  </div>
                  <span>Sign In</span>
                </button>

                <button
                  id="btn-navbar-google-register"
                  onClick={() => openAuthModal('register')}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all"
                >
                  Register
                </button>
              </div>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="btn-notifications-bell"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
                title="View Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Notifications ({notifications.length})
                    </span>
                    <span className="text-[11px] text-cyan-400 font-mono">Live Loom Feed</span>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.type === 'interview') {
                            if (currentRole === 'student') {
                              setActiveTab('student-profile');
                            } else {
                              openAuthModal('signin', 'student');
                            }
                          }
                          setIsNotifOpen(false);
                        }}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          n.read
                            ? 'bg-slate-900/40 border-slate-800 text-slate-400'
                            : 'bg-cyan-950/30 border-cyan-500/40 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <strong className="text-white text-xs font-semibold">{n.title}</strong>
                          <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-300">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
