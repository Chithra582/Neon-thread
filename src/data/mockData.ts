import {
  StudentProfile,
  EmployerProfile,
  MentorProfile,
  Challenge,
  ProjectTeam,
  SprintWorkspaceData,
  MentorWeeklyCheckIn,
  PortfolioProjectProof,
  InterviewInvitation,
  ProjectPatternTemplate,
  AppNotification
} from '../types';

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'chithra-r',
    name: 'Chithra R',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    university: 'UC Berkeley',
    degree: 'B.S. in Computer Science & Data Science',
    graduationYear: '2026',
    bio: 'Full-stack AI developer passionate about conversational analytics, reactive frontends, and distributed systems.',
    github: 'github.com/chithra-r',
    portfolio: 'chithra-dev.io',
    projectsCompleted: 4,
    mentorVerifiedCount: 3,
    sprintCompletionRate: 96,
    githubEvidenceAvailable: true,
    activeTeamId: 'team-loom-01',
    skills: [
      {
        id: 'python',
        name: 'Python',
        claimedLevel: 90,
        verifiedPercentage: 87,
        category: 'core',
        color: '#38bdf8',
        evidence: [
          {
            id: 'ev-py-1',
            title: 'FastAPI project',
            type: 'project',
            description: 'Architected async API layer handling 1.2k req/sec with Pydantic validation.',
            artifactUrl: 'https://github.com/chithra-r/analytics-core/commit/8f2a1b9',
            verifiedAt: '2 days ago',
            verifiedBy: 'Dr. Aris Thorne'
          },
          {
            id: 'ev-py-2',
            title: 'Data analysis sprint',
            type: 'sprint',
            description: 'Pandas & NumPy sentiment vectorization pipeline for customer ticket streams.',
            artifactUrl: 'https://github.com/chithra-r/ticket-nlp/pull/14',
            verifiedAt: '1 week ago',
            verifiedBy: 'Dr. Aris Thorne'
          },
          {
            id: 'ev-py-3',
            title: 'GitHub contribution',
            type: 'github',
            description: '48 verified commits across 3 employer sprint repositories.',
            artifactUrl: 'https://github.com/chithra-r',
            verifiedAt: '3 days ago',
            verifiedBy: 'Automated CI Loom'
          },
          {
            id: 'ev-py-4',
            title: 'Mentor verified',
            type: 'mentor',
            description: 'Signed off on clean modular Python code structure and async worker handling.',
            verifiedAt: 'Yesterday',
            verifiedBy: 'Dr. Aris Thorne'
          }
        ]
      },
      {
        id: 'react',
        name: 'React',
        claimedLevel: 85,
        verifiedPercentage: 82,
        category: 'framework',
        color: '#06b6d4',
        evidence: [
          {
            id: 'ev-re-1',
            title: 'Frontend implementation',
            type: 'project',
            description: 'Interactive analytics dashboard with virtualized tables and real-time socket charts.',
            artifactUrl: 'https://github.com/chithra-r/support-ui/tree/main/src',
            verifiedAt: '3 days ago',
            verifiedBy: 'Sarah Jenkins'
          },
          {
            id: 'ev-re-2',
            title: 'UI task',
            type: 'sprint',
            description: 'Built dark-mode design system conforming to WCAG AA accessibility specs.',
            artifactUrl: 'https://github.com/chithra-r/support-ui/pull/22',
            verifiedAt: '5 days ago',
            verifiedBy: 'Sarah Jenkins'
          },
          {
            id: 'ev-re-3',
            title: 'GitHub evidence',
            type: 'github',
            description: 'Hook lifecycle memoization preventing redundant re-renders on streaming data.',
            artifactUrl: 'https://github.com/chithra-r/support-ui/commit/a994c1e',
            verifiedAt: '4 days ago',
            verifiedBy: 'Automated CI Loom'
          },
          {
            id: 'ev-re-4',
            title: 'Mentor approval',
            type: 'mentor',
            description: 'Verified React state flow and seamless component isolation.',
            verifiedAt: '2 days ago',
            verifiedBy: 'Dr. Aris Thorne'
          }
        ]
      },
      {
        id: 'sql',
        name: 'SQL',
        claimedLevel: 80,
        verifiedPercentage: 74,
        category: 'data',
        color: '#10b981',
        evidence: [
          {
            id: 'ev-sql-1',
            title: 'Schema optimization',
            type: 'project',
            description: 'Indexed multi-tenant customer interaction logs reducing query latency by 42%.',
            artifactUrl: 'https://github.com/chithra-r/analytics-core/pull/8',
            verifiedAt: '1 week ago',
            verifiedBy: 'Rajiv Menon'
          },
          {
            id: 'ev-sql-2',
            title: 'Complex aggregation queries',
            type: 'sprint',
            description: 'Window functions and CTEs calculating rolling 7-day NPS trends.',
            verifiedAt: '2 weeks ago',
            verifiedBy: 'Rajiv Menon'
          }
        ]
      },
      {
        id: 'machine-learning',
        name: 'Machine Learning',
        claimedLevel: 75,
        verifiedPercentage: 68,
        category: 'ai',
        color: '#a855f7',
        evidence: [
          {
            id: 'ev-ml-1',
            title: 'Embeddings & Vector Search',
            type: 'project',
            description: 'Implemented cosine similarity clusterer for support ticket resolution taxonomy.',
            artifactUrl: 'https://github.com/chithra-r/ml-clusters',
            verifiedAt: '6 days ago',
            verifiedBy: 'Dr. Aris Thorne'
          },
          {
            id: 'ev-ml-2',
            title: 'Model Evaluation Sprint',
            type: 'sprint',
            description: 'Scored 91.4% F1-score on customer intent multi-label classification.',
            verifiedAt: '10 days ago',
            verifiedBy: 'Dr. Aris Thorne'
          }
        ]
      },
      {
        id: 'fastapi',
        name: 'FastAPI',
        claimedLevel: 70,
        verifiedPercentage: 61,
        category: 'framework',
        color: '#f59e0b',
        evidence: [
          {
            id: 'ev-fa-1',
            title: 'Microservice endpoints',
            type: 'project',
            description: 'Wrote OpenAPI 3.0 auto-documented microservices with OAuth JWT token guards.',
            artifactUrl: 'https://github.com/chithra-r/api-gateway',
            verifiedAt: '4 days ago',
            verifiedBy: 'Sarah Jenkins'
          }
        ]
      }
    ]
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    university: 'Stanford University',
    degree: 'B.S. in Symbolic Systems',
    graduationYear: '2025',
    bio: 'Frontend engineering specialist focused on React design systems, WebSockets, and high-performance UI.',
    github: 'github.com/marcuschen-dev',
    portfolio: 'marcuschen.design',
    projectsCompleted: 5,
    mentorVerifiedCount: 4,
    sprintCompletionRate: 98,
    githubEvidenceAvailable: true,
    skills: [
      { id: 'react', name: 'React', claimedLevel: 95, verifiedPercentage: 92, category: 'framework', color: '#06b6d4', evidence: [] },
      { id: 'typescript', name: 'TypeScript', claimedLevel: 90, verifiedPercentage: 88, category: 'core', color: '#3b82f6', evidence: [] },
      { id: 'tailwind', name: 'Tailwind CSS', claimedLevel: 95, verifiedPercentage: 94, category: 'framework', color: '#10b981', evidence: [] }
    ]
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    university: 'Carnegie Mellon University',
    degree: 'M.S. in Human-Computer Interaction',
    graduationYear: '2026',
    bio: 'Product designer & design technologist weaving human psychology into intuitive data visualization.',
    github: 'github.com/elenarostova',
    portfolio: 'elenarostova.design',
    projectsCompleted: 3,
    mentorVerifiedCount: 3,
    sprintCompletionRate: 94,
    githubEvidenceAvailable: true,
    skills: [
      { id: 'ui-ux', name: 'UI/UX', claimedLevel: 95, verifiedPercentage: 91, category: 'core', color: '#ec4899', evidence: [] },
      { id: 'figma', name: 'Figma Prototyping', claimedLevel: 95, verifiedPercentage: 95, category: 'framework', color: '#a855f7', evidence: [] },
      { id: 'user-research', name: 'User Research', claimedLevel: 88, verifiedPercentage: 85, category: 'core', color: '#f59e0b', evidence: [] }
    ]
  },
  {
    id: 'devon-vance',
    name: 'Devon Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    university: 'University of Washington',
    degree: 'B.S. in Informatics',
    graduationYear: '2026',
    bio: 'Database systems & backend infrastructure engineer with hands-on PostgreSQL, Redis, and schema sharding.',
    github: 'github.com/devonvance-sql',
    portfolio: 'devonvance.tech',
    projectsCompleted: 4,
    mentorVerifiedCount: 4,
    sprintCompletionRate: 97,
    githubEvidenceAvailable: true,
    skills: [
      { id: 'sql', name: 'SQL', claimedLevel: 92, verifiedPercentage: 90, category: 'data', color: '#10b981', evidence: [] },
      { id: 'postgresql', name: 'PostgreSQL', claimedLevel: 90, verifiedPercentage: 86, category: 'data', color: '#38bdf8', evidence: [] },
      { id: 'redis', name: 'Redis', claimedLevel: 80, verifiedPercentage: 76, category: 'data', color: '#ef4444', evidence: [] }
    ]
  },
  {
    id: 'aisha-patel',
    name: 'Aisha Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    university: 'Georgia Tech',
    degree: 'B.S. in Computer Science',
    graduationYear: '2025',
    bio: 'MLOps engineer specializing in model quantization, API latency optimization, and telemetry pipelines.',
    github: 'github.com/aishapatel-ml',
    portfolio: 'aishapatel.ai',
    projectsCompleted: 5,
    mentorVerifiedCount: 4,
    sprintCompletionRate: 95,
    githubEvidenceAvailable: true,
    skills: [
      { id: 'machine-learning', name: 'Machine Learning', claimedLevel: 94, verifiedPercentage: 91, category: 'ai', color: '#a855f7', evidence: [] },
      { id: 'python', name: 'Python', claimedLevel: 92, verifiedPercentage: 89, category: 'core', color: '#38bdf8', evidence: [] },
      { id: 'docker', name: 'Docker', claimedLevel: 84, verifiedPercentage: 80, category: 'core', color: '#06b6d4', evidence: [] }
    ]
  }
];

export const INITIAL_EMPLOYERS: EmployerProfile[] = [
  {
    id: 'technova',
    name: 'TechNova',
    logo: 'TN',
    industry: 'Enterprise AI & Automation',
    challengesCount: 6,
    activeSprints: 4,
    hiredTalentCount: 14
  },
  {
    id: 'quantumhealth',
    name: 'QuantumHealth',
    logo: 'QH',
    industry: 'Digital Health & Bio-Analytics',
    challengesCount: 4,
    activeSprints: 2,
    hiredTalentCount: 8
  },
  {
    id: 'apexlogistics',
    name: 'Apex Logistics',
    logo: 'AL',
    industry: 'Autonomous Supply Chain Systems',
    challengesCount: 5,
    activeSprints: 3,
    hiredTalentCount: 11
  }
];

export const INITIAL_MENTORS: MentorProfile[] = [
  {
    id: 'dr-aris-thorne',
    name: 'Dr. Aris Thorne',
    title: 'Principal AI Systems Architect',
    company: 'Former Google DeepMind / TechNova Mentor',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    expertise: ['Python', 'Machine Learning', 'FastAPI', 'Distributed Systems'],
    activeTeamsCount: 3,
    reviewsCount: 42
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    title: 'Staff Frontend Architect',
    company: 'Vercel Ecosystem / Lead Mentor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    expertise: ['React', 'TypeScript', 'UI/UX Architecture', 'State Machines'],
    activeTeamsCount: 4,
    reviewsCount: 38
  },
  {
    id: 'rajiv-menon',
    name: 'Rajiv Menon',
    title: 'Head of Data Infrastructure',
    company: 'Snowflake Fellow / Neon Thread Mentor',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    expertise: ['SQL', 'PostgreSQL', 'Data Warehousing', 'Query Optimization'],
    activeTeamsCount: 2,
    reviewsCount: 29
  },
  {
    id: 'maya-lin',
    name: 'Maya Lin',
    title: 'VP of Product Design',
    company: 'Design System Council Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    expertise: ['UI/UX', 'Figma', 'Interaction Design', 'Usability Testing'],
    activeTeamsCount: 3,
    reviewsCount: 34
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'chal-01',
    company: 'TechNova',
    companyLogo: 'TN',
    title: 'AI Customer Support Analytics',
    description: 'Build an intelligent ticket classification, sentiment drift monitor, and agent suggestion engine that streamlines enterprise customer interactions using real-time ML pipelines.',
    requiredSkills: ['Python', 'React', 'SQL', 'Machine Learning', 'FastAPI'],
    duration: '7 Days',
    teamSize: 4,
    difficulty: 'Intermediate',
    aiMatchPercentage: 94,
    matchedSkills: ['Python', 'React', 'SQL', 'Machine Learning'],
    skillGaps: ['FastAPI'],
    matchExplanation: 'You match 4/5 required skills. Your strongest evidence comes from your previous AI dashboard and API projects.',
    expectedOutcome: 'Working full-stack analytics engine with sub-200ms latency classification and live interactive sentiment dashboard.',
    evaluationCriteria: 'Model precision (>88%), API throughput, frontend responsiveness, and clean modular code verified by mentor.',
    status: 'open',
    sponsorTier: 'Enterprise'
  },
  {
    id: 'chal-02',
    company: 'QuantumHealth',
    companyLogo: 'QH',
    title: 'Real-Time Telemetry Data Dashboard',
    description: 'Design and deploy a high-concurrency patient vital signs visualization console consuming synthetic biometric streaming sockets.',
    requiredSkills: ['React', 'TypeScript', 'SQL', 'WebSockets', 'UI/UX'],
    duration: '7 Days',
    teamSize: 3,
    difficulty: 'Advanced',
    aiMatchPercentage: 81,
    matchedSkills: ['React', 'SQL'],
    skillGaps: ['TypeScript', 'WebSockets'],
    matchExplanation: 'Strong React frontend foundation with demonstrated SQL query speed. High potential to cross-skill on biometric WebSockets.',
    expectedOutcome: '60fps Canvas/SVG visualizer with threshold-based alert triggers and encrypted data stream parsing.',
    evaluationCriteria: 'Frame rendering consistency, memory leak prevention, and HIPAA-compliant data masking.',
    status: 'open',
    sponsorTier: 'Enterprise'
  },
  {
    id: 'chal-03',
    company: 'Apex Logistics',
    companyLogo: 'AL',
    title: 'Autonomous Supply Chain Optimization',
    description: 'Formulate a routing graph solver and fleet emission reduction simulator factoring dynamic weather and delivery constraints.',
    requiredSkills: ['Python', 'Machine Learning', 'SQL', 'Algorithms'],
    duration: '10 Days',
    teamSize: 4,
    difficulty: 'Advanced',
    aiMatchPercentage: 78,
    matchedSkills: ['Python', 'Machine Learning', 'SQL'],
    skillGaps: ['Algorithms'],
    matchExplanation: 'High Python and SQL capabilities. Graph traversal background will accelerate route matrix generation.',
    expectedOutcome: 'Multi-stop vehicle routing algorithm benchmarked against standard heuristics.',
    evaluationCriteria: 'Mileage reduction percentage, execution time on 10,000 nodes, and unit test coverage.',
    status: 'open',
    sponsorTier: 'Enterprise'
  },
  {
    id: 'chal-04',
    company: 'TechNova',
    companyLogo: 'TN',
    title: 'E-commerce Recommendation Engine',
    description: 'Construct a multi-armed bandit recommendation microservice personalizing real-time catalog feeds based on session clickstreams.',
    requiredSkills: ['Python', 'FastAPI', 'Machine Learning', 'Redis'],
    duration: '7 Days',
    teamSize: 3,
    difficulty: 'Intermediate',
    aiMatchPercentage: 73,
    matchedSkills: ['Python', 'Machine Learning'],
    skillGaps: ['FastAPI', 'Redis'],
    matchExplanation: 'Good alignment with vector clustering. Paired with backend engineer for Redis session store caching.',
    expectedOutcome: 'Live Dockerized microservice providing recommendations under 15ms.',
    evaluationCriteria: 'Click-through rate simulation lift, P99 latency, and code maintainability.',
    status: 'open',
    sponsorTier: 'Partner'
  }
];

export const INITIAL_TEAM_LOOM: ProjectTeam = {
  id: 'team-loom-01',
  challengeId: 'chal-01',
  challengeTitle: 'AI Customer Support Analytics',
  members: [
    {
      studentId: 'chithra-r',
      name: 'Chithra R',
      role: 'Student A • Python + ML',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      skills: ['Python', 'Machine Learning'],
      coverageContribution: ['Python (87%)', 'Machine Learning (68%)']
    },
    {
      studentId: 'marcus-chen',
      name: 'Marcus Chen',
      role: 'Student B • React',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      skills: ['React'],
      coverageContribution: ['React (92%)', 'Frontend Architecture']
    },
    {
      studentId: 'elena-rostova',
      name: 'Elena Rostova',
      role: 'Student C • UI/UX',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      skills: ['UI/UX'],
      coverageContribution: ['UI/UX (91%)', 'Design Systems']
    },
    {
      studentId: 'devon-vance',
      name: 'Devon Vance',
      role: 'Student D • SQL',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      skills: ['SQL'],
      coverageContribution: ['SQL (90%)', 'Database Schemas']
    }
  ],
  teamSkillCoverage: 96,
  skillGapsCount: 1,
  skillGaps: ['FastAPI'],
  recommendedMentor: {
    id: 'dr-aris-thorne',
    name: 'Dr. Aris Thorne',
    role: 'AI/ML Mentor (TechNova / DeepMind Fellow)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  },
  status: 'active'
};

export const INITIAL_SPRINT_WORKSPACE: SprintWorkspaceData = {
  id: 'sprint-01',
  challengeId: 'chal-01',
  challengeTitle: 'AI Customer Support Analytics',
  company: 'TechNova',
  progress: 64,
  dayPhases: [
    { dayRange: 'Day 1–2', phaseName: 'Requirements & Architecture', status: 'completed' },
    { dayRange: 'Day 3–4', phaseName: 'Development', status: 'completed' },
    { dayRange: 'Day 5', phaseName: 'AI Integration', status: 'active' },
    { dayRange: 'Day 6', phaseName: 'Testing', status: 'upcoming' },
    { dayRange: 'Day 7', phaseName: 'Demo & Submission', status: 'upcoming' }
  ],
  teamMembers: INITIAL_TEAM_LOOM.members,
  mentorId: 'dr-aris-thorne',
  mentorName: 'Dr. Aris Thorne',
  blockers: [
    'FastAPI CORS headers need authorization token pre-flight allowance.'
  ],
  tasks: [
    {
      id: 'task-1',
      title: 'Define multi-tenant PostgreSQL schema & ticket indexes',
      assignee: { id: 'devon-vance', name: 'Devon Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      skill: 'SQL',
      deadlineDay: 'Day 2',
      status: 'completed',
      evidence: {
        commitHash: '7a11c8d',
        pullRequest: 'PR #1: Schemas & migration scripts',
        testCoverage: '100% migration verification test pass',
        description: 'Constructed normalized ticket entity tables with GIN indices on tag vectors.'
      }
    },
    {
      id: 'task-2',
      title: 'Design Figma tokens and component library for analytics dashboard',
      assignee: { id: 'elena-rostova', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
      skill: 'UI/UX',
      deadlineDay: 'Day 2',
      status: 'completed',
      evidence: {
        pullRequest: 'Design Hand-off: Figma Spec v2.4',
        description: 'Complete high-fidelity mockups with WCAG AA compliance tokens.'
      }
    },
    {
      id: 'task-3',
      title: 'Implement interactive React dashboard with real-time sentiment charts',
      assignee: { id: 'marcus-chen', name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      skill: 'React',
      deadlineDay: 'Day 4',
      status: 'completed',
      evidence: {
        commitHash: '3e49b10',
        pullRequest: 'PR #3: Analytics Dashboard Views',
        testCoverage: '94% Jest component test pass',
        description: 'Integrated virtualized ticket streams and animated confidence gauge bars.'
      }
    },
    {
      id: 'task-4',
      title: 'Build sentiment classification pipeline with BERT embeddings in Python',
      assignee: { id: 'chithra-r', name: 'Chithra R', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      skill: 'Python & ML',
      deadlineDay: 'Day 5',
      status: 'completed',
      evidence: {
        commitHash: '8f2a1b9',
        pullRequest: 'PR #4: NLP Inference Microservice',
        testCoverage: '96% pytest accuracy & edge cases',
        description: 'Built vectorizer inference worker with 140ms p95 latency on incoming customer inquiries.'
      }
    },
    {
      id: 'task-5',
      title: 'FastAPI endpoint wiring with rate-limiting and auth middleware',
      assignee: { id: 'chithra-r', name: 'Chithra R', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      skill: 'FastAPI',
      deadlineDay: 'Day 5',
      status: 'review',
      evidence: {
        commitHash: '9c55d14',
        pullRequest: 'PR #5: API Gateway & Pydantic models',
        description: 'Connected frontend dashboard to Python model inference endpoints.'
      }
    },
    {
      id: 'task-6',
      title: 'End-to-end integration testing and load simulation (500 req/s)',
      assignee: { id: 'devon-vance', name: 'Devon Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      skill: 'Testing',
      deadlineDay: 'Day 6',
      status: 'in_progress'
    },
    {
      id: 'task-7',
      title: 'Final presentation slides, demo sandbox recording, and portfolio proof generation',
      assignee: { id: 'chithra-r', name: 'Chithra R', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      skill: 'Communication',
      deadlineDay: 'Day 7',
      status: 'todo'
    }
  ]
};

export const INITIAL_MENTOR_CHECKIN: MentorWeeklyCheckIn = {
  id: 'checkin-01',
  sprintId: 'sprint-01',
  progressRating: 4,
  technicalQualityRating: 4,
  collaborationRating: 5,
  feedback: 'Good implementation of the API layer. Improve error handling and add authentication before final submission.',
  status: 'pending',
  generatedEvidenceTokens: [
    'VERIFIED_PYTHON_ASYNC_PIPELINE',
    'VERIFIED_REACT_COMPONENT_ISOLATION',
    'VERIFIED_SQL_SCHEMA_INDEXING'
  ]
};

export const INITIAL_PORTFOLIO_PROOF: PortfolioProjectProof = {
  id: 'port-proof-01',
  title: 'AI Customer Support Analytics',
  company: 'TechNova',
  role: 'Frontend + AI Integration',
  skillsProven: ['Python', 'React', 'SQL', 'Machine Learning'],
  contribution: 'Implemented the analytics dashboard and integrated the AI classification API.',
  verifiedBy: 'Dr. Aris Thorne (Principal AI Architect, TechNova Mentor)',
  sprintDuration: '7 Days',
  evidence: {
    github: 'github.com/technova-sprints/customer-support-ai',
    demo: 'ai-support-demo.technova.internal',
    mentorReview: '★★★★★ 4.8/5.0 Verified Technical Rigor'
  },
  verificationHash: '0x8f2a1b9_PROOF_VERIFIED_LOOM_2026',
  dateGenerated: 'March 2026'
};

export const INITIAL_INTERVIEWS: InterviewInvitation[] = [
  {
    id: 'int-01',
    company: 'TechNova',
    candidateName: 'Chithra R',
    studentId: 'chithra-r',
    reason: 'Candidate demonstrated Python, React and AI skills through a verified 7-day employer project.',
    projectProofTitle: 'AI Customer Support Analytics',
    status: 'pending',
    sentAt: 'Just now',
    scheduledTime: 'Available this Thursday 2:00 PM PST'
  }
];

export const INITIAL_PROJECT_PATTERNS: ProjectPatternTemplate[] = [
  {
    id: 'pat-01',
    title: 'AI Customer Support Analytics',
    description: 'Real-time ticket classification, customer sentiment vectorization, and agent co-pilot dashboard.',
    requiredSkills: ['Python', 'React', 'SQL', 'Machine Learning', 'FastAPI'],
    timesUsed: 4,
    averageCompletion: 91,
    duration: '7 Days',
    difficulty: 'Intermediate'
  },
  {
    id: 'pat-02',
    title: 'Data Dashboard',
    description: 'High-throughput operational metrics visualization, streaming telemetry, and customizable widget grids.',
    requiredSkills: ['React', 'TypeScript', 'SQL', 'D3.js', 'Tailwind'],
    timesUsed: 6,
    averageCompletion: 95,
    duration: '7 Days',
    difficulty: 'Intermediate'
  },
  {
    id: 'pat-03',
    title: 'E-commerce Recommendation Engine',
    description: 'Collaborative filtering and contextual multi-armed bandit recommendation API with Redis cache layer.',
    requiredSkills: ['Python', 'FastAPI', 'Machine Learning', 'Redis'],
    timesUsed: 3,
    averageCompletion: 88,
    duration: '7 Days',
    difficulty: 'Advanced'
  },
  {
    id: 'pat-04',
    title: 'Fraud Detection System',
    description: 'Anomalous transaction graph detection microservice with automated risk scoring and alert dispatching.',
    requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Kafka / Streams'],
    timesUsed: 5,
    averageCompletion: 89,
    duration: '10 Days',
    difficulty: 'Advanced'
  },
  {
    id: 'pat-05',
    title: 'Sustainability Analytics',
    description: 'Supply chain carbon footprint calculator with ESG reporting templates and multi-vendor emission auditing.',
    requiredSkills: ['React', 'Python', 'SQL', 'Data Modeling'],
    timesUsed: 3,
    averageCompletion: 93,
    duration: '7 Days',
    difficulty: 'Intermediate'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Challenge Match Ready',
    message: 'TechNova posted "AI Customer Support Analytics" — 94% match with your skill proof!',
    type: 'match',
    timestamp: '10m ago',
    read: false,
    actionId: 'chal-01'
  },
  {
    id: 'notif-2',
    title: 'Mentor Signed Off Task',
    message: 'Dr. Aris Thorne approved your BERT sentiment pipeline contribution.',
    type: 'sprint',
    timestamp: '1h ago',
    read: false
  }
];
