export type UserRole = 'student' | 'employer' | 'mentor' | 'admin';

export interface SkillEvidenceItem {
  id: string;
  title: string;
  type: 'project' | 'sprint' | 'github' | 'mentor';
  description: string;
  artifactUrl?: string;
  verifiedAt: string;
  verifiedBy: string;
}

export interface SkillThread {
  id: string;
  name: string;
  claimedLevel: number; // e.g. 90
  verifiedPercentage: number; // e.g. 87%
  category: 'core' | 'framework' | 'data' | 'ai';
  evidence: SkillEvidenceItem[];
  color: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  university: string;
  degree: string;
  graduationYear: string;
  bio: string;
  github: string;
  portfolio: string;
  skills: SkillThread[];
  projectsCompleted: number;
  mentorVerifiedCount: number;
  sprintCompletionRate: number; // percentage e.g. 96
  githubEvidenceAvailable: boolean;
  activeTeamId?: string;
}

export interface EmployerProfile {
  id: string;
  name: string;
  logo: string;
  industry: string;
  challengesCount: number;
  activeSprints: number;
  hiredTalentCount: number;
}

export interface MentorProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  expertise: string[];
  activeTeamsCount: number;
  reviewsCount: number;
}

export interface Challenge {
  id: string;
  company: string;
  companyLogo: string;
  title: string;
  description: string;
  requiredSkills: string[];
  duration: string;
  teamSize: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  aiMatchPercentage: number;
  matchedSkills: string[];
  skillGaps: string[];
  matchExplanation: string;
  expectedOutcome: string;
  evaluationCriteria: string;
  status: 'open' | 'active' | 'completed';
  sponsorTier: 'Enterprise' | 'Startup' | 'Partner';
}

export interface TeamMember {
  studentId: string;
  name: string;
  role: string;
  avatar: string;
  skills: string[];
  coverageContribution: string[];
}

export interface ProjectTeam {
  id: string;
  challengeId: string;
  challengeTitle: string;
  members: TeamMember[];
  teamSkillCoverage: number; // e.g. 96%
  skillGapsCount: number;
  skillGaps: string[];
  recommendedMentor: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  };
  status: 'forming' | 'active' | 'completed';
}

export interface SprintTask {
  id: string;
  title: string;
  assignee: {
    id: string;
    name: string;
    avatar: string;
  };
  skill: string;
  deadlineDay: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  evidence?: {
    commitHash?: string;
    pullRequest?: string;
    testCoverage?: string;
    description?: string;
  };
}

export interface SprintDayPhase {
  dayRange: string;
  phaseName: string;
  status: 'completed' | 'active' | 'upcoming';
}

export interface SprintWorkspaceData {
  id: string;
  challengeId: string;
  challengeTitle: string;
  company: string;
  progress: number; // e.g. 64%
  dayPhases: SprintDayPhase[];
  teamMembers: TeamMember[];
  tasks: SprintTask[];
  mentorId: string;
  mentorName: string;
  blockers: string[];
}

export interface MentorWeeklyCheckIn {
  id: string;
  sprintId: string;
  progressRating: number; // 1 to 5
  technicalQualityRating: number; // 1 to 5
  collaborationRating: number; // 1 to 5
  feedback: string;
  status: 'approved' | 'changes_requested' | 'pending';
  submittedAt?: string;
  generatedEvidenceTokens?: string[];
}

export interface ProofNode {
  id: string;
  label: string;
  subtitle: string;
  type: 'skill' | 'task' | 'project' | 'evidence' | 'mentor' | 'verified';
  status: 'verified' | 'in_progress';
  meta?: string;
}

export interface PortfolioProjectProof {
  id: string;
  title: string;
  company: string;
  role: string;
  skillsProven: string[];
  contribution: string;
  verifiedBy: string;
  sprintDuration: string;
  evidence: {
    github: string;
    demo: string;
    mentorReview: string;
  };
  verificationHash: string;
  dateGenerated: string;
}

export interface InterviewInvitation {
  id: string;
  company: string;
  candidateName: string;
  studentId: string;
  reason: string;
  projectProofTitle: string;
  status: 'pending' | 'accepted' | 'declined';
  sentAt: string;
  scheduledTime?: string;
}

export interface ProjectPatternTemplate {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  timesUsed: number;
  averageCompletion: number; // e.g. 91%
  duration: string;
  difficulty: 'Intermediate' | 'Advanced';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'interview' | 'sprint' | 'verification' | 'team' | 'match';
  timestamp: string;
  read: boolean;
  actionId?: string;
}

export type Student = StudentProfile;
export type ChallengePatternTemplate = ProjectPatternTemplate;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  provider: 'google';
  organization?: string;
  headline?: string;
  createdAt: string;
}
