import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  X,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Building2,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Lock,
  Mail,
  User,
  School
} from 'lucide-react';

export const GoogleAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    authIntentRole,
    loginWithGoogle,
    registerWithGoogle,
    switchGooglePersona,
    DEFAULT_GOOGLE_USERS
  } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>(authIntentRole || 'student');
  const [email, setEmail] = useState<string>('chithu5820@gmail.com');
  const [fullName, setFullName] = useState<string>('Chithra R');
  const [organization, setOrganization] = useState<string>('UC Berkeley (EECS)');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isAuthModalOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (authModalMode === 'register') {
        registerWithGoogle(email, fullName, selectedRole, organization);
      } else {
        loginWithGoogle(email, fullName, selectedRole, undefined, organization);
      }
    }, 600);
  };

  const handlePersonaSelect = (role: UserRole) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      switchGooglePersona(role);
    }, 400);
  };

  const roleConfigs = [
    {
      role: 'student' as UserRole,
      title: 'Student / Candidate',
      icon: GraduationCap,
      color: 'cyan',
      badge: 'Prove & Get Hired',
      desc: 'Verify skills with real sprints, weave team squads, build proof portfolio, and get direct interview invites.'
    },
    {
      role: 'employer' as UserRole,
      title: 'Employer / Recruiter',
      icon: Building2,
      color: 'blue',
      badge: 'Find Verified Talent',
      desc: 'Post engineering challenges, discover candidates filtered by verified code proof, and send direct interview bridges.'
    },
    {
      role: 'mentor' as UserRole,
      title: 'Industry Mentor',
      icon: ShieldCheck,
      color: 'purple',
      badge: 'Review & Mint Proof',
      desc: 'Guide student sprint teams, review pull requests and test coverage, and sign cryptographic skill verifications.'
    },
    {
      role: 'admin' as UserRole,
      title: 'Platform Admin',
      icon: Cpu,
      color: 'emerald',
      badge: 'Ecosystem Telemetry',
      desc: 'Monitor platform velocity, university challenge distribution, and verified placement metrics.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0d1322] border border-slate-700/80 rounded-3xl shadow-2xl shadow-cyan-950/50 overflow-hidden">
        {/* Top Google Header */}
        <div className="bg-[#080d18] px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Google Multi-color G logo */}
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1.5 shadow-md">
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
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>Google Identity Services</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Secure Single Sign-On for Neon Thread Loom
              </p>
            </div>
          </div>

          <button
            id="btn-close-google-auth"
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch between Sign In and Register */}
        <div className="flex border-b border-slate-800 bg-[#0a0f1c] px-6">
          <button
            id="tab-auth-signin"
            onClick={() => setAuthModalMode('signin')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              authModalMode === 'signin'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Sign In with Google</span>
          </button>
          <button
            id="tab-auth-register"
            onClick={() => setAuthModalMode('register')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              authModalMode === 'register'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Register New Account with Google</span>
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Security Notice: Roles are locked to accounts */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-slate-300">
            <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">Role-Based Access:</strong> Your account permissions and proof verification tokens are strictly tied to your authenticated role. You can switch Google accounts anytime.
            </p>
          </div>

          {/* SIGN IN VIEW */}
          {authModalMode === 'signin' ? (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Select a Google Account:
                </span>
                <div className="space-y-2">
                  {(['student', 'employer', 'mentor', 'admin'] as UserRole[]).map((role) => {
                    const persona = DEFAULT_GOOGLE_USERS[role];
                    const cfg = roleConfigs.find((c) => c.role === role)!;
                    return (
                      <button
                        key={role}
                        id={`btn-select-persona-${role}`}
                        disabled={isSubmitting}
                        onClick={() => handlePersonaSelect(role)}
                        className="w-full text-left p-3.5 rounded-2xl bg-[#11192e] hover:bg-[#16213d] border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={persona.avatar}
                            alt={persona.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-700 group-hover:border-cyan-400 transition-colors"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                                {persona.name}
                              </span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                                  role === 'student'
                                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                                    : role === 'employer'
                                    ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                    : role === 'mentor'
                                    ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                }`}
                              >
                                {cfg.title}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 font-mono mt-0.5">
                              {persona.email} • {persona.organization}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-slate-400 group-hover:text-cyan-400 transition-colors text-xs font-semibold">
                          <span className="hidden sm:inline">Continue as {role}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Or Sign in with custom email */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  Or Sign in with another Google Email:
                </span>
                <form onSubmit={handleCustomSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Google Account Email:
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@gmail.com"
                          className="w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Your Account Role:
                      </label>
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                        className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="student">Student / Candidate (Chithra R profile)</option>
                        <option value="employer">Employer / Recruiter (TechNova)</option>
                        <option value="mentor">Industry Mentor (Dr. Aris Thorne)</option>
                        <option value="admin">Platform Administrator</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                  >
                    <div className="w-4 h-4">
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
                    <span>{isSubmitting ? 'Verifying with Google...' : 'Sign In with Google'}</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* REGISTER VIEW */
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  1. Select Your Role (Determines App Permissions):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {roleConfigs.map((cfg) => {
                    const Icon = cfg.icon;
                    const isSelected = selectedRole === cfg.role;
                    return (
                      <div
                        key={cfg.role}
                        onClick={() => setSelectedRole(cfg.role)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950'
                            : 'bg-[#11192e] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <Icon
                              className={`w-4 h-4 ${
                                isSelected ? 'text-cyan-300' : 'text-slate-400'
                              }`}
                            />
                            <span
                              className={`text-xs font-bold ${
                                isSelected ? 'text-white' : 'text-slate-300'
                              }`}
                            >
                              {cfg.title}
                            </span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                          {cfg.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Account Details */}
              <div className="pt-2 space-y-3">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  2. Google Account Information:
                </span>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Google Email:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="chithu5820@gmail.com"
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">
                      Full Name:
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Chithra R"
                        className="w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">
                      {selectedRole === 'student'
                        ? 'University / College:'
                        : selectedRole === 'employer'
                        ? 'Company Name:'
                        : 'Affiliation / Org:'}
                    </label>
                    <div className="relative">
                      <School className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder={
                          selectedRole === 'student' ? 'UC Berkeley' : 'TechNova Enterprise'
                        }
                        className="w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-98"
              >
                <div className="w-4 h-4 rounded-full bg-white p-0.5">
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
                <span>
                  {isSubmitting
                    ? 'Registering with Google Identity...'
                    : `Complete Registration as ${selectedRole.toUpperCase()}`}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
