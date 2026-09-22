import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  StudentProfile,
  EmployerProfile,
  MentorProfile,
  Challenge,
  ProjectTeam,
  SprintWorkspaceData,
  SprintTask,
  MentorWeeklyCheckIn,
  PortfolioProjectProof,
  InterviewInvitation,
  ProjectPatternTemplate,
  AppNotification,
  AuthUser
} from '../types';

export const DEFAULT_GOOGLE_USERS: Record<UserRole, AuthUser> = {
  student: {
    id: 'usr-google-chithra',
    name: 'Chithra R',
    email: 'chithu5820@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'student',
    provider: 'google',
    organization: 'UC Berkeley (EECS)',
    headline: 'Full-Stack & ML Engineer | 92% Verified',
    createdAt: '2026-01-15'
  },
  employer: {
    id: 'usr-google-sarah',
    name: 'Sarah Lin',
    email: 'sarah.lin@technova.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'employer',
    provider: 'google',
    organization: 'TechNova Enterprise',
    headline: 'Head of Engineering Talent & Sprints',
    createdAt: '2025-11-20'
  },
  mentor: {
    id: 'usr-google-aris',
    name: 'Dr. Aris Thorne',
    email: 'aris.thorne@deepmind.alum',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'mentor',
    provider: 'google',
    organization: 'TechNova AI Research',
    headline: 'Principal AI Architect & Verified Mentor',
    createdAt: '2025-08-10'
  },
  admin: {
    id: 'usr-google-admin',
    name: 'Platform Administrator',
    email: 'admin@neonthread.io',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    provider: 'google',
    organization: 'Neon Thread Operations',
    headline: 'System Telemetry & Ecosystem Integrity',
    createdAt: '2025-01-01'
  }
};
import {
  INITIAL_STUDENTS,
  INITIAL_EMPLOYERS,
  INITIAL_MENTORS,
  INITIAL_CHALLENGES,
  INITIAL_TEAM_LOOM,
  INITIAL_SPRINT_WORKSPACE,
  INITIAL_MENTOR_CHECKIN,
  INITIAL_PORTFOLIO_PROOF,
  INITIAL_INTERVIEWS,
  INITIAL_PROJECT_PATTERNS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

export type ActiveTab =
  | 'landing'
  | 'student-profile'
  | 'challenges'
  | 'team-weaver'
  | 'team-loom'
  | 'sprint'
  | 'sprint-workspace'
  | 'mentor-checkin'
  | 'proof-graph'
  | 'portfolio'
  | 'employer-dashboard'
  | 'employer-challenges'
  | 'employer-talent'
  | 'pattern-library'
  | 'admin-analytics'
  | 'admin-impact'
  | 'innovation-check'
  | 'gemini-chat';

export interface DemoStep {
  stepNumber: number;
  title: string;
  role: UserRole;
  targetTab: ActiveTab;
  explanation: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: '1. Login as Student (Chithra R)',
    role: 'student',
    targetTab: 'student-profile',
    explanation: 'Chithra logs in to Neon Thread with verified academic and development credentials.'
  },
  {
    stepNumber: 2,
    title: '2. AI-Generated Skill Profile',
    role: 'student',
    targetTab: 'student-profile',
    explanation: 'View the visual skill threads: Claimed Skill + Project Evidence + Mentor Verification = Verified Skill.'
  },
  {
    stepNumber: 3,
    title: '3. Open "Challenges For You"',
    role: 'student',
    targetTab: 'challenges',
    explanation: 'Explore employer-sponsored real-world challenges matched by AI to student skill threads.'
  },
  {
    stepNumber: 4,
    title: '4. Select 94% Matched Challenge',
    role: 'student',
    targetTab: 'challenges',
    explanation: 'Select TechNova\'s "AI Customer Support Analytics" with high compatibility.'
  },
  {
    stepNumber: 5,
    title: '5. "Why This Match?" Explanation',
    role: 'student',
    targetTab: 'challenges',
    explanation: 'The AI explains: 4/5 skills matched based on past vector embeddings and API project evidence.'
  },
  {
    stepNumber: 6,
    title: '6. Join Challenge',
    role: 'student',
    targetTab: 'challenges',
    explanation: 'Click "Join Challenge" to enter the intelligent project loom matching pipeline.'
  },
  {
    stepNumber: 7,
    title: '7. Open Project Loom / Team Weaver',
    role: 'student',
    targetTab: 'team-weaver',
    explanation: 'Enter the Team Weaver where individual skill threads are woven into a balanced project squad.'
  },
  {
    stepNumber: 8,
    title: '8. AI Complementary Team Formation',
    role: 'student',
    targetTab: 'team-weaver',
    explanation: 'Observe animated loom threads: Python+ML (Chithra) + React (Marcus) + UI/UX (Elena) + SQL (Devon).'
  },
  {
    stepNumber: 9,
    title: '9. Open 7-Day Sprint Workspace',
    role: 'student',
    targetTab: 'sprint',
    explanation: 'The team launches into an active 7-day milestone sprint with clear deliverables and evidence tracking.'
  },
  {
    stepNumber: 10,
    title: '10. Completed Tasks & Code Evidence',
    role: 'student',
    targetTab: 'sprint',
    explanation: 'Inspect completed tasks with GitHub commit hashes, pull requests, and automated test coverage.'
  },
  {
    stepNumber: 11,
    title: '11. Switch to Mentor Check-In',
    role: 'mentor',
    targetTab: 'mentor-checkin',
    explanation: 'Dr. Aris Thorne (TechNova Mentor) reviews team velocity, code artifacts, and technical rigor.'
  },
  {
    stepNumber: 12,
    title: '12. Approve Sprint & Verify Proof',
    role: 'mentor',
    targetTab: 'mentor-checkin',
    explanation: 'Mentor submits 5-star review and clicks "Approve Sprint", cryptographically signing the evidence.'
  },
  {
    stepNumber: 13,
    title: '13. Open Proof Engine ("Proof Graph")',
    role: 'student',
    targetTab: 'proof-graph',
    explanation: '“Don\'t just claim a skill. Prove it.” View the interactive skill-to-evidence proof graph.'
  },
  {
    stepNumber: 14,
    title: '14. Verified Skills Elevate',
    role: 'student',
    targetTab: 'proof-graph',
    explanation: 'See Python jump from 87% to 92% verified, React to 86%, backed by signed proof nodes.'
  },
  {
    stepNumber: 15,
    title: '15. Open Portfolio Generator',
    role: 'student',
    targetTab: 'portfolio',
    explanation: 'The system automatically compiles a verifiable proof credential card ready for employers.'
  },
  {
    stepNumber: 16,
    title: '16. Showcase Project Proof Card',
    role: 'student',
    targetTab: 'portfolio',
    explanation: 'Card displays exact role, contribution, verified skills, mentor sign-off, and GitHub verification hash.'
  },
  {
    stepNumber: 17,
    title: '17. Switch to Employer Dashboard',
    role: 'employer',
    targetTab: 'employer-dashboard',
    explanation: 'TechNova hiring leads monitor active challenge outcomes and scalable pattern templates.'
  },
  {
    stepNumber: 18,
    title: '18. Open "Verified Talent" Discovery',
    role: 'employer',
    targetTab: 'employer-talent',
    explanation: 'Employers discover talent by verified skill proof rather than static resume claims.'
  },
  {
    stepNumber: 19,
    title: '19. Inspect Chithra\'s Proof Graph',
    role: 'employer',
    targetTab: 'employer-talent',
    explanation: 'Click "View Proof" to inspect real commit artifacts, mentor notes, and sprint performance.'
  },
  {
    stepNumber: 20,
    title: '20. Send Direct Interview Invitation',
    role: 'employer',
    targetTab: 'employer-talent',
    explanation: 'TechNova dispatches an interview invitation grounded in verified project achievements.'
  },
  {
    stepNumber: 21,
    title: '21. Switch Back to Student View',
    role: 'student',
    targetTab: 'student-profile',
    explanation: 'Return to Chithra\'s dashboard to receive the new opportunity.'
  },
  {
    stepNumber: 22,
    title: '22. Interview Bridge Notification & Opportunity',
    role: 'student',
    targetTab: 'student-profile',
    explanation: 'Real-time alert: “TechNova invited you for an interview based on your verified sprint proof!”'
  }
];

interface AppContextType {
  authUser: AuthUser | null;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  // Google Auth Methods
  loginWithGoogle: (email: string, name: string, role: UserRole, avatar?: string, organization?: string) => void;
  registerWithGoogle: (email: string, name: string, role: UserRole, organization?: string) => void;
  switchGooglePersona: (role: UserRole) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'signin' | 'register';
  setAuthModalMode: (mode: 'signin' | 'register') => void;
  authIntentRole?: UserRole;
  openAuthModal: (mode: 'signin' | 'register', targetRole?: UserRole) => void;
  DEFAULT_GOOGLE_USERS: Record<UserRole, AuthUser>;
  students: StudentProfile[];
  currentStudent: StudentProfile;
  employers: EmployerProfile[];
  mentors: MentorProfile[];
  challenges: Challenge[];
  activeChallenge: Challenge;
  setActiveChallenge: (chal: Challenge) => void;
  teamLoom: ProjectTeam;
  sprintWorkspace: SprintWorkspaceData;
  mentorCheckin: MentorWeeklyCheckIn;
  portfolioProof: PortfolioProjectProof;
  interviews: InterviewInvitation[];
  notifications: AppNotification[];
  patterns: ProjectPatternTemplate[];
  selectedStudentForProof: StudentProfile | null;
  setSelectedStudentForProof: (s: StudentProfile | null) => void;
  isInviteModalOpen: boolean;
  setIsInviteModalOpen: (open: boolean) => void;
  inviteCandidate: StudentProfile | null;
  setInviteCandidate: (s: StudentProfile | null) => void;
  // Demo Mode State
  isDemoActive: boolean;
  setIsDemoActive: (active: boolean) => void;
  currentDemoStepIndex: number;
  goToDemoStep: (stepIndex: number) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  isFinalShowcaseOpen: boolean;
  setIsFinalShowcaseOpen: (open: boolean) => void;
  // Core Actions
  joinChallenge: (challengeId: string) => void;
  acceptTeam: (teamId: string) => void;
  updateTaskStatus: (taskId: string, status: SprintTask['status']) => void;
  approveSprint: (feedback: string, ratings: { progress: number; technical: number; collaboration: number }) => void;
  requestSprintChanges: (feedback: string) => void;
  sendInterviewInvitation: (studentId: string, company: string, reason: string) => void;
  acceptInterview: (invitationId: string) => void;
  postEmployerChallenge: (challenge: Partial<Challenge>) => void;
  createChallenge: (challenge: Partial<Challenge>) => void;
  reusePatternTemplate: (pattern: ProjectPatternTemplate) => void;
  clonePatternToChallenge: (pattern: ProjectPatternTemplate) => void;
  patternTemplates: ProjectPatternTemplate[];
  openInviteModal: (candidate: StudentProfile) => void;
  adminMetrics: {
    activeStudents: number;
    challengesPosted: number;
    sprintsCompleted: number;
    mentorVerifiedSkills: number;
    interviewsGenerated: number;
    placementRateIncrease: string;
  };
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getInitialAuthUser = (): AuthUser => {
  try {
    const saved = localStorage.getItem('neon_thread_google_auth');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // fallback
  }
  return DEFAULT_GOOGLE_USERS.student;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(getInitialAuthUser);
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => getInitialAuthUser()?.role || 'student');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'register'>('signin');
  const [authIntentRole, setAuthIntentRole] = useState<UserRole | undefined>(undefined);

  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [students, setStudents] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [employers] = useState<EmployerProfile[]>(INITIAL_EMPLOYERS);
  const [mentors] = useState<MentorProfile[]>(INITIAL_MENTORS);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(INITIAL_CHALLENGES[0]);
  const [teamLoom, setTeamLoom] = useState<ProjectTeam>(INITIAL_TEAM_LOOM);
  const [sprintWorkspace, setSprintWorkspace] = useState<SprintWorkspaceData>(INITIAL_SPRINT_WORKSPACE);
  const [mentorCheckin, setMentorCheckin] = useState<MentorWeeklyCheckIn>(INITIAL_MENTOR_CHECKIN);
  const [portfolioProof, setPortfolioProof] = useState<PortfolioProjectProof>(INITIAL_PORTFOLIO_PROOF);
  const [interviews, setInterviews] = useState<InterviewInvitation[]>(INITIAL_INTERVIEWS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [patterns, setPatterns] = useState<ProjectPatternTemplate[]>(INITIAL_PROJECT_PATTERNS);
  const [selectedStudentForProof, setSelectedStudentForProof] = useState<StudentProfile | null>(INITIAL_STUDENTS[0]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteCandidate, setInviteCandidate] = useState<StudentProfile | null>(null);

  // Sync authUser to localStorage and currentRole
  useEffect(() => {
    if (authUser) {
      localStorage.setItem('neon_thread_google_auth', JSON.stringify(authUser));
      setCurrentRoleState(authUser.role);
    } else {
      localStorage.removeItem('neon_thread_google_auth');
    }
  }, [authUser]);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    const userForRole = DEFAULT_GOOGLE_USERS[role];
    setAuthUser(userForRole);
  };

  const loginWithGoogle = (
    email: string,
    name: string,
    role: UserRole,
    avatar?: string,
    organization?: string
  ) => {
    const newUser: AuthUser = {
      id: 'usr-google-' + Date.now(),
      name: name || (role === 'student' ? 'Chithra R' : role === 'employer' ? 'Sarah Lin' : role === 'mentor' ? 'Dr. Aris Thorne' : 'Platform Administrator'),
      email: email || 'chithu5820@gmail.com',
      avatar: avatar || DEFAULT_GOOGLE_USERS[role].avatar,
      role,
      provider: 'google',
      organization: organization || DEFAULT_GOOGLE_USERS[role].organization,
      headline: DEFAULT_GOOGLE_USERS[role].headline,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAuthUser(newUser);
    setCurrentRoleState(role);
    setIsAuthModalOpen(false);

    if (role === 'student') setActiveTab('student-profile');
    else if (role === 'employer') setActiveTab('employer-dashboard');
    else if (role === 'mentor') setActiveTab('mentor-checkin');
    else if (role === 'admin') setActiveTab('admin-analytics');
  };

  const registerWithGoogle = (
    email: string,
    name: string,
    role: UserRole,
    organization?: string
  ) => {
    loginWithGoogle(email, name, role, undefined, organization);
  };

  const switchGooglePersona = (role: UserRole) => {
    const persona = DEFAULT_GOOGLE_USERS[role];
    setAuthUser(persona);
    setCurrentRoleState(role);
    setIsAuthModalOpen(false);

    if (role === 'student') setActiveTab('student-profile');
    else if (role === 'employer') setActiveTab('employer-dashboard');
    else if (role === 'mentor') setActiveTab('mentor-checkin');
    else if (role === 'admin') setActiveTab('admin-analytics');
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('neon_thread_google_auth');
    setActiveTab('landing');
  };

  const openAuthModal = (mode: 'signin' | 'register', targetRole?: UserRole) => {
    setAuthModalMode(mode);
    setAuthIntentRole(targetRole);
    setIsAuthModalOpen(true);
  };

  // Demo Controller State
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [currentDemoStepIndex, setCurrentDemoStepIndex] = useState(0);
  const [isFinalShowcaseOpen, setIsFinalShowcaseOpen] = useState(false);

  const currentStudent = students[0]; // Chithra R

  // Move between demo steps smoothly
  const goToDemoStep = (index: number) => {
    if (index < 0 || index >= DEMO_STEPS.length) return;
    setCurrentDemoStepIndex(index);
    const step = DEMO_STEPS[index];
    setCurrentRole(step.role);
    setActiveTab(step.targetTab);

    // If step 4 or 5, ensure active challenge is chal-01
    if (index >= 3 && index <= 6) {
      setActiveChallenge(challenges[0]);
    }
    // If step 19, select Chithra for proof inspection
    if (index === 18) {
      setSelectedStudentForProof(students[0]);
    }
    // If step 20, open interview invite modal
    if (index === 19) {
      setInviteCandidate(students[0]);
      setIsInviteModalOpen(true);
    }
    // If step 22, trigger completion celebration
    if (index === 21) {
      setTimeout(() => {
        setIsFinalShowcaseOpen(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 800);
    }
  };

  const nextDemoStep = () => {
    if (currentDemoStepIndex < DEMO_STEPS.length - 1) {
      goToDemoStep(currentDemoStepIndex + 1);
    }
  };

  const prevDemoStep = () => {
    if (currentDemoStepIndex > 0) {
      goToDemoStep(currentDemoStepIndex - 1);
    }
  };

  // Join Challenge action
  const joinChallenge = (challengeId: string) => {
    const target = challenges.find((c) => c.id === challengeId) || challenges[0];
    setActiveChallenge(target);
    setActiveTab('team-weaver');
    
    // Add notification
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title: 'Joined Challenge',
      message: `You entered the Team Weaver for "${target.title}". Complementary threads are weaving!`,
      type: 'team',
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Accept Team action
  const acceptTeam = (teamId: string) => {
    setTeamLoom((prev) => ({ ...prev, status: 'active' }));
    setActiveTab('sprint');

    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title: 'Team Weave Locked',
      message: `Team accepted for "${activeChallenge.title}". 7-Day Sprint Workspace initialized!`,
      type: 'sprint',
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Update Sprint Task status
  const updateTaskStatus = (taskId: string, status: SprintTask['status']) => {
    setSprintWorkspace((prev) => {
      const updatedTasks = prev.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status };
        }
        return task;
      });
      const completedCount = updatedTasks.filter((t) => t.status === 'completed').length;
      const progress = Math.round((completedCount / updatedTasks.length) * 100);
      return {
        ...prev,
        tasks: updatedTasks,
        progress
      };
    });
  };

  // Approve Sprint (Mentor Action)
  const approveSprint = (
    feedback: string,
    ratings: { progress: number; technical: number; collaboration: number }
  ) => {
    // 1. Update mentor checkin status
    setMentorCheckin({
      id: 'checkin-' + Date.now(),
      sprintId: sprintWorkspace.id,
      progressRating: ratings.progress,
      technicalQualityRating: ratings.technical,
      collaborationRating: ratings.collaboration,
      feedback: feedback || 'Sprint approved with high technical quality. Verified project evidence generated.',
      status: 'approved',
      submittedAt: 'Just now',
      generatedEvidenceTokens: [
        'VERIFIED_PYTHON_ASYNC_PIPELINE',
        'VERIFIED_REACT_COMPONENT_ISOLATION',
        'VERIFIED_SQL_SCHEMA_INDEXING',
        'VERIFIED_ML_SENTIMENT_DRIFT'
      ]
    });

    // 2. Elevate Chithra's verified skill percentages
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id === 'chithra-r') {
          return {
            ...student,
            projectsCompleted: student.projectsCompleted + 1,
            mentorVerifiedCount: student.mentorVerifiedCount + 1,
            skills: student.skills.map((skill) => {
              if (skill.id === 'python') return { ...skill, verifiedPercentage: 92 };
              if (skill.id === 'react') return { ...skill, verifiedPercentage: 86 };
              if (skill.id === 'machine-learning') return { ...skill, verifiedPercentage: 74 };
              if (skill.id === 'fastapi') return { ...skill, verifiedPercentage: 72 };
              return skill;
            })
          };
        }
        return student;
      })
    );

    // 3. Mark sprint tasks completed & progress 100%
    setSprintWorkspace((prev) => ({
      ...prev,
      progress: 100,
      tasks: prev.tasks.map((t) => ({ ...t, status: 'completed' }))
    }));

    // 4. Update Portfolio Proof card
    setPortfolioProof({
      id: 'port-proof-' + Date.now(),
      title: activeChallenge.title,
      company: activeChallenge.company,
      role: 'Frontend + AI Integration',
      skillsProven: ['Python', 'React', 'SQL', 'Machine Learning', 'FastAPI'],
      contribution: 'Engineered the sentiment drift inference pipeline, integrated REST microservices, and designed responsive analytics dashboard.',
      verifiedBy: 'Dr. Aris Thorne (Principal AI Architect, TechNova Mentor)',
      sprintDuration: '7 Days',
      evidence: {
        github: 'github.com/technova-sprints/customer-support-ai',
        demo: 'https://ai-support-analytics.demo.technova.io',
        mentorReview: '★★★★★ 4.9/5.0 Formally Verified Technical Rigor'
      },
      verificationHash: `0x${Math.random().toString(16).substring(2, 10)}_LOOM_VERIFIED`,
      dateGenerated: 'Today'
    });

    // 5. Add notification
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title: 'Sprint Approved & Skills Verified!',
      message: 'Dr. Aris Thorne approved your sprint. Python & React verified percentages increased!',
      type: 'verification',
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Confetti effect!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const requestSprintChanges = (feedback: string) => {
    setMentorCheckin((prev) => ({
      ...prev,
      feedback: feedback || 'Please tighten error handling and add rate-limiting to endpoint.',
      status: 'changes_requested',
      submittedAt: 'Just now'
    }));
  };

  // Employer Sends Interview Invitation
  const sendInterviewInvitation = (studentId: string, company: string, reason: string) => {
    const targetStudent = students.find((s) => s.id === studentId) || students[0];
    const newInvitation: InterviewInvitation = {
      id: 'inv-' + Date.now(),
      company: company || 'TechNova',
      candidateName: targetStudent.name,
      studentId: targetStudent.id,
      reason: reason || 'Candidate demonstrated Python, React and AI skills through a verified 7-day employer project.',
      projectProofTitle: activeChallenge.title,
      status: 'pending',
      sentAt: 'Just now',
      scheduledTime: 'Flexible — Next Tuesday 1:00 PM PST'
    };

    setInterviews((prev) => [newInvitation, ...prev]);

    // Send notification to student
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title: `Interview Invitation: ${company}`,
      message: `${company} invited you for an interview based on your verified "${activeChallenge.title}" proof!`,
      type: 'interview',
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setIsInviteModalOpen(false);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const acceptInterview = (invitationId: string) => {
    setInterviews((prev) =>
      prev.map((inv) => (inv.id === invitationId ? { ...inv, status: 'accepted' } : inv))
    );
  };

  // Post Employer Challenge
  const postEmployerChallenge = (newChallenge: Partial<Challenge>) => {
    const created: Challenge = {
      id: 'chal-' + Date.now(),
      company: newChallenge.company || 'TechNova',
      companyLogo: 'TN',
      title: newChallenge.title || 'New Employer Challenge',
      description: newChallenge.description || 'Custom challenge description',
      requiredSkills: newChallenge.requiredSkills || ['Python', 'React'],
      duration: newChallenge.duration || '7 Days',
      teamSize: newChallenge.teamSize || 4,
      difficulty: newChallenge.difficulty || 'Intermediate',
      aiMatchPercentage: 88,
      matchedSkills: ['Python', 'React'],
      skillGaps: [],
      matchExplanation: 'Extracted automatically from challenge scope. Matches active talent pool.',
      expectedOutcome: newChallenge.expectedOutcome || 'Working prototype with tests and documentation.',
      evaluationCriteria: newChallenge.evaluationCriteria || 'Engineering quality, test coverage, and documentation.',
      status: 'open',
      sponsorTier: 'Enterprise'
    };

    setChallenges((prev) => [created, ...prev]);
  };

  // Reuse Pattern Template
  const reusePatternTemplate = (pattern: ProjectPatternTemplate) => {
    const created: Challenge = {
      id: 'chal-' + Date.now(),
      company: 'TechNova',
      companyLogo: 'TN',
      title: pattern.title,
      description: pattern.description,
      requiredSkills: pattern.requiredSkills,
      duration: pattern.duration,
      teamSize: 4,
      difficulty: pattern.difficulty,
      aiMatchPercentage: 92,
      matchedSkills: pattern.requiredSkills.slice(0, 3),
      skillGaps: pattern.requiredSkills.slice(3),
      matchExplanation: `Reused from validated pattern with ${pattern.averageCompletion}% historical completion rate.`,
      expectedOutcome: 'Standard enterprise sprint deliverable with CI proof artifacts.',
      evaluationCriteria: 'Standard rubric from pattern history.',
      status: 'open',
      sponsorTier: 'Enterprise'
    };

    setChallenges((prev) => [created, ...prev]);
    setPatterns((prev) =>
      prev.map((p) => (p.id === pattern.id ? { ...p, timesUsed: p.timesUsed + 1 } : p))
    );
    setActiveChallenge(created);
    setActiveTab('challenges');
  };

  const openInviteModal = (candidate: StudentProfile) => {
    setInviteCandidate(candidate);
    setIsInviteModalOpen(true);
  };

  const adminMetrics = {
    activeStudents: 1240,
    challengesPosted: 86,
    sprintsCompleted: 312,
    mentorVerifiedSkills: 1840,
    interviewsGenerated: 142,
    placementRateIncrease: '+38%'
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        authUser,
        currentRole,
        setCurrentRole,
        activeTab,
        setActiveTab,
        // Google Auth Methods
        loginWithGoogle,
        registerWithGoogle,
        switchGooglePersona,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        authIntentRole,
        openAuthModal,
        DEFAULT_GOOGLE_USERS,
        students,
        currentStudent,
        employers,
        mentors,
        challenges,
        activeChallenge,
        setActiveChallenge,
        teamLoom,
        sprintWorkspace,
        mentorCheckin,
        portfolioProof,
        interviews,
        notifications,
        patterns,
        patternTemplates: patterns,
        selectedStudentForProof,
        setSelectedStudentForProof,
        isInviteModalOpen,
        setIsInviteModalOpen,
        inviteCandidate,
        setInviteCandidate,
        openInviteModal,
        adminMetrics,
        // Demo controller
        isDemoActive,
        setIsDemoActive,
        currentDemoStepIndex,
        goToDemoStep,
        nextDemoStep,
        prevDemoStep,
        isFinalShowcaseOpen,
        setIsFinalShowcaseOpen,
        // Actions
        joinChallenge,
        acceptTeam,
        updateTaskStatus,
        approveSprint,
        requestSprintChanges,
        sendInterviewInvitation,
        acceptInterview,
        postEmployerChallenge,
        createChallenge: postEmployerChallenge,
        reusePatternTemplate,
        clonePatternToChallenge: reusePatternTemplate,
        markNotificationRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
