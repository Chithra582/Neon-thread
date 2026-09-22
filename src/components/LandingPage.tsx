import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Users,
  GitPullRequest,
  CheckCircle2,
  Award,
  Building2,
  Briefcase,
  GraduationCap,
  Play,
  Terminal,
  Zap,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { authUser, currentRole, setActiveTab, openAuthModal } = useApp();
  const [activeStage, setActiveStage] = useState<number>(0);

  const handleRoleAction = (targetRole: UserRole, targetTab: any) => {
    if (!authUser) {
      openAuthModal('signin', targetRole);
      return;
    }
    if (authUser.role === targetRole) {
      setActiveTab(targetTab);
    } else {
      openAuthModal('signin', targetRole);
    }
  };

  const loomStages = [
    { title: 'Skills', desc: 'Claimed academic & self-taught abilities mapped to foundational thread profiles.', color: 'from-cyan-500 to-blue-500', glow: 'thread-glow-cyan' },
    { title: 'Challenge', desc: 'Real-world problem briefs posted by enterprise employers (e.g., TechNova).', color: 'from-blue-500 to-indigo-500', glow: 'thread-glow-cyan' },
    { title: 'Team', desc: 'AI Project Loom weaves complementary skill threads into high-synergy squads.', color: 'from-purple-500 to-pink-500', glow: 'thread-glow-purple' },
    { title: 'Sprint', desc: '7-day structured agile sprint with code commits, milestones, and deliverables.', color: 'from-amber-500 to-orange-500', glow: 'thread-glow-amber' },
    { title: 'Proof', desc: 'Mentor sign-off and Git evidence converted into cryptographic verified skill proof.', color: 'from-emerald-500 to-teal-500', glow: 'thread-glow-emerald' },
    { title: 'Interview', desc: 'Direct interview invitations sent from employers based on verified project evidence.', color: 'from-rose-500 to-cyan-500', glow: 'thread-glow-cyan' }
  ];

  return (
    <div className="min-h-screen bg-[#090b10] text-[#e2e8f0] pb-24 cyber-grid relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-950/20 via-purple-950/10 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-sm shadow-cyan-950">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Proof-Based Talent Matching Platform</span>
          <span className="w-1 h-1 rounded-full bg-cyan-400" />
          <span className="text-slate-400 font-normal">Next-Gen Career Loom</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Neon Thread
        </h1>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mt-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
          “Weave skills into proof. Turn proof into opportunity.”
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
          An AI-powered project ecosystem connecting student talent with real employer challenges,
          mentor-guided sprints, verified portfolio evidence, and interview opportunities.
        </p>

        {/* Primary CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-cta-student"
            onClick={() => handleRoleAction('student', 'challenges')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Challenges as Student</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-cta-employer"
            onClick={() => handleRoleAction('employer', 'employer-dashboard')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700/80 transition-all flex items-center justify-center gap-2 hover:border-slate-600"
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>Post an Employer Challenge</span>
          </button>

          <button
            id="hero-cta-google-auth"
            onClick={() => openAuthModal('signin')}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2"
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
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Visual "Project Loom" Interactive Pipeline Animation */}
        <div className="mt-16 max-w-5xl mx-auto bg-[#0d1322]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                The Digital Loom Cycle
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click any stage to trace the skill thread
            </span>
          </div>

          {/* Loom Stages Visual Chain */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
            {loomStages.map((stage, idx) => {
              const isSelected = activeStage === idx;
              return (
                <button
                  key={stage.title}
                  onClick={() => setActiveStage(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-400/80 shadow-lg shadow-cyan-950/80 scale-[1.03]'
                      : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">0{idx + 1}</span>
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${stage.color}`} />
                  </div>
                  <h3 className={`text-sm font-bold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                    {stage.title}
                  </h3>
                  <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${stage.color} w-full`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Description Card */}
          <div className="mt-6 p-4 rounded-2xl bg-[#090e1a] border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>STAGE {activeStage + 1} OF 6</span>
                <span>•</span>
                <strong className="text-white uppercase tracking-wider">{loomStages[activeStage].title}</strong>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {loomStages[activeStage].desc}
              </p>
            </div>
            <button
              onClick={() => {
                if (activeStage === 0 || activeStage === 4) {
                  handleRoleAction('student', activeStage === 0 ? 'student-profile' : 'proof-graph');
                } else if (activeStage === 1) {
                  handleRoleAction('student', 'challenges');
                } else if (activeStage === 2) {
                  handleRoleAction('student', 'team-weaver');
                } else if (activeStage === 3) {
                  handleRoleAction('student', 'sprint');
                } else if (activeStage === 5) {
                  handleRoleAction('employer', 'employer-talent');
                }
              }}
              className="shrink-0 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <span>Explore {loomStages[activeStage].title}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            ARCHITECTURAL PIPELINE
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            How Project Loom Weaves Talent
          </h3>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-2">
            A continuous loop where real work produces verifiable engineering artifacts instead of static resume claims.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">1. AI Skill Extraction & Matching</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Resumes and past code repos are parsed into dynamic skill threads. AI matches students to open employer challenges with transparent explanation of skill compatibility and gaps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">2. Digital Team Weaver</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Rather than random grouping, the platform weaves complementary talent into balanced project squads—pairing frontend architects, backend engineers, and AI specialists with vetted industry mentors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">3. Proof Engine & Interview Bridge</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every completed sprint task, GitHub PR, and mentor sign-off crystallizes into a verified proof node. Employers search for proven engineering depth and invite students directly to interview.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Why Proof-Based Talent Matching */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-r from-slate-950 via-[#0c1220] to-slate-950 rounded-3xl border border-slate-800/80 p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              THE CORE PARADIGM SHIFT
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
              Why Proof-Based Talent Matching Beats Traditional Resumes
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed font-light">
              Traditional recruiting is broken: students write self-claimed keywords on PDFs, while employers wade through hundreds of identical resumes without knowing who can truly code in a production environment.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✕
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  <strong className="text-slate-200">The Old Way:</strong> Self-declared "Proficient in Python" with zero tangible proof or peer review.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  <strong className="text-cyan-300">The Neon Thread Way:</strong> 87% Verified Python through real FastAPI microservice commits, sub-200ms latency benchmarks, and verified mentor sign-off.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 font-mono">
              “Don't just claim a skill. Prove it.”
            </div>
          </div>

          {/* Proof Formula Visualizer Box */}
          <div className="bg-[#090b10] border border-slate-700/80 rounded-2xl p-6 shadow-xl">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
              The Proof Equation
            </h4>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Claimed Skill (Resume/Self-Declared)</span>
                  <span className="text-sm font-bold text-white">Python • 90% Claimed</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">+</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Project & GitHub Evidence</span>
                  <span className="text-sm font-bold text-cyan-300">FastAPI PR #4 + 48 Commits + Tests</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">+</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Mentor Verification (Sprint Sign-off)</span>
                  <span className="text-sm font-bold text-purple-300">Dr. Aris Thorne (TechNova Lead)</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">=</span>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-400/50 flex items-center justify-between">
                <div>
                  <span className="text-xs text-cyan-400 uppercase font-mono font-bold block">Verified Skill Proof</span>
                  <span className="text-lg font-extrabold text-white">Python • 87% Formally Verified</span>
                </div>
                <CheckCircle2 className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences: For Students, For Employers, For Mentors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            ECOSYSTEM ROLES
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Built for Students, Employers, and Mentors
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* For Students */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">For Students</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                <li>• Work on real employer challenges, not toy homework tutorials.</li>
                <li>• Weave with complementary teammates who cover your skill gaps.</li>
                <li>• Generate immutable proof cards and auto-compiled portfolios.</li>
                <li>• Get interview invitations directly without job application black holes.</li>
              </ul>
            </div>
            <button
              onClick={() => handleRoleAction('student', 'student-profile')}
              className="mt-6 w-full py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors"
            >
              Enter Student View (Chithra R)
            </button>
          </div>

          {/* For Employers */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">For Employers</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                <li>• Post real technical challenges and observe candidates in live sprints.</li>
                <li>• Reusable Project Patterns: deploy challenges term after term.</li>
                <li>• Verified Talent Discovery: filter by verified proof %, not buzzwords.</li>
                <li>• Invite verified students directly with one click.</li>
              </ul>
            </div>
            <button
              onClick={() => handleRoleAction('employer', 'employer-dashboard')}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-colors"
            >
              Enter Employer View (TechNova)
            </button>
          </div>

          {/* For Mentors */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">For Mentors</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                <li>• Guide teams through focused 7-day agile check-ins.</li>
                <li>• Star rating rubrics for progress, tech quality, and teamwork.</li>
                <li>• AI-assisted feedback summarization and proof issuance.</li>
                <li>• Give authoritative industry credibility to student portfolios.</li>
              </ul>
            </div>
            <button
              onClick={() => handleRoleAction('mentor', 'mentor-checkin')}
              className="mt-6 w-full py-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors"
            >
              Enter Mentor View (Dr. Thorne)
            </button>
          </div>
        </div>
      </section>

      {/* Platform Impact Stats */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">1,240</div>
            <div className="text-xs text-slate-400 mt-1">Students Onboarded</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">84</div>
            <div className="text-xs text-slate-400 mt-1">Active Projects</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">32</div>
            <div className="text-xs text-slate-400 mt-1">Employer Partners</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">126</div>
            <div className="text-xs text-slate-400 mt-1">Industry Mentors</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">4,860</div>
            <div className="text-xs text-slate-400 mt-1">Verified Skills</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">312</div>
            <div className="text-xs text-slate-400 mt-1">Interview Invites</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to weave your skills into career proof?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-xl mx-auto font-light">
            Join hundreds of university students proving their engineering capabilities through mentor-verified sprints.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleRoleAction('student', 'challenges')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all"
            >
              Get Started as Student
            </button>
            <button
              onClick={() => handleRoleAction('employer', 'employer-talent')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm sm:text-base font-semibold border border-slate-700 transition-all"
            >
              Explore Verified Talent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
