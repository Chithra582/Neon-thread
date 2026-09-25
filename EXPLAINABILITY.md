# EXPLAINABILITY — Neon Thread Agent

> **Admissibility & Transparency Report for OpenGAP / Agent Passport**  
> *Agent Name:* Neon Thread Agent (`neon-thread-agent`)  
> *Specification:* OpenGAP v0.1.0  
> *Domain:* HR & recruiting / Proof-Based Talent Matching & Skills Intelligence  

---

## 1. Overview & Operational Purpose

Neon Thread Agent is an autonomous recruitment intelligence and candidate-challenge matching engine designed for modern developer talent ecosystems. Operating on top of full-stack TypeScript, Express, and Google Gemini (`gemini-2.0-flash`), the system connects aspiring student developers with real-world employer engineering challenges.

The agent's primary purpose is to eliminate bias and inefficiency in early-career hiring. By parsing verified GitHub repository evidence, mapping candidate mastery percentages to job specifications, and guiding mentor-led sprint milestones, the agent provides recruiters with verifiable proof of engineering competency and provides candidates with transparent career pathways.

---

## 2. How the Agent Decides (Decision-Making Logic)

Neon Thread Agent executes decisions through a deterministic four-stage matching and evaluation pipeline:

```
[Candidate Portfolio & Skills] ──> [Evidence Verification Engine] ──> [Challenge Skill Mapping]
                                                                                  │
                                                                                  ▼
[Actionable Match Report & Sprints] <── [EEOC Non-Bias Safety Gate] <── [Gap & Growth Projection]
```

### 2.1 Talent Evidence Ingestion & Skill Verification
- **Decision:** Determines whether a candidate's self-reported skills are backed by verifiable code artifacts.
- **Rules:**
  - Evaluates commit histories, repository language distributions, and test coverage from linked projects.
  - Computes a proficiency index (0% to 100%) for each technology stack (e.g., Python 87%, React 82%, SQL 74%).

### 2.2 Employer Challenge Specification & Semantic Matching
- **Decision:** Computes the alignment score between candidate competencies and challenge prerequisites.
- **Rules:**
  - Identifies core mandatory skills vs. secondary/bonus skills.
  - Calculates a normalized match quotient: `matched_verified_skills / total_required_skills * 100`.
  - Classifies match tiers: High Match (>= 80%), Moderate Match (60–79%), Exploratory (< 60%).

### 2.3 Milestone Sprint Tracking & Proof Certification
- **Decision:** Tracks candidate progress across multi-week engineering sprints.
- **Rules:**
  - Verifies milestone deliverables (Architecture RFC, Core API Implementation, Unit Test Suite, Demo Video).
  - Certifies completion upon mentor sign-off, converting provisional skills into verified proof.

### 2.4 EEOC Non-Bias Safety Gate & Explanation Synthesis
- **Decision:** Synthesizes clear, fair, 2-sentence match explanations for recruiters and candidates.
- **Rules:**
  - Evaluates exclusively technical evidence; completely excludes demographic, geographic, and age tokens.
  - Formulates explanations highlighting: (1) Strongest verified evidence, and (2) Specific remaining gap that the upcoming sprint bridges into proof.

---

## 3. Data Sources & Inputs Used

| Data Input | Source | Purpose | Data Handling & Privacy |
|---|---|---|---|
| **Candidate Skill Profile** | Verified student portfolio / repo audit | List of technologies, proficiency scores, and linked projects | Processed ephemerally in active memory; PII redacted; not used for retraining |
| **Employer Challenge Data** | Corporate engineering challenge posts | Problem statement, required skills, deliverables, and deadlines | Ingested via API; maintained in session store |
| **Sprint Deliverables** | Candidate submissions (pull requests, PRDs) | Milestone verification and mentor grading | Inspected via read-only repository URLs |
| **Recruiter Query Parameters** | Search filters / matching endpoints | Specific technical stack criteria and target cohort filters | Evaluated strictly in memory; zero persistent profiling |

Neon Thread Agent complies with modern data governance standards:
- **EEOC Compliance:** Evaluates exclusively job-related skills and demonstrable code artifacts; zero proxy features for protected characteristics.
- **GDPR Alignment:** Candidate personal details (email, phone, residential address) are omitted from analytical payloads.
- **Stateless Inference:** All interactions with Google Gemini specify `store: false` to ensure interaction logs are not stored remotely.

---

## 4. Known Limitations & Failure Modes

Reviewers, recruiters, and candidates should note the following system boundaries:

1. **Cold-Start Candidates with Private Codebases:**
   - *Limitation:* Candidates whose prior work resides in non-public proprietary repositories cannot be verified automatically via public GitHub APIs.
   - *Mitigation:* The system offers sprint challenges where candidates can author fresh, open-source demonstration projects to build immediate verified proof.

2. **Subjective Soft-Skill & Cultural Alignment:**
   - *Limitation:* The agent evaluates technical deliverables and commit velocity; it cannot assess nuanced interpersonal communication or cultural fit.
   - *Mitigation:* The agent serves strictly as a top-of-funnel technical evidence filter, preserving human interviews for collaborative evaluation.

3. **Emerging & Proprietary Tech Stack Benchmarks:**
   - *Limitation:* Highly niche internal frameworks or novel libraries may lack baseline comparative proficiency data.
   - *Mitigation:* The system maps niche technologies to underlying foundational competencies (e.g., mapping Mojo or Cython back to C/Python fundamentals).

4. **Non-Automated Employment Guarantee:**
   - *Limitation:* Earning a high match score or completing a sprint does not guarantee an immediate job offer.
   - *Mitigation:* The agent clarifies that match reports represent verified qualification for interview fast-tracking, not autonomous employment contracts.

---

## 5. Verification, Safety & Human Oversight

- **Human-in-the-Loop Hiring Decisions:** Final interview invitations, offer letters, and hiring determinations remain 100% human-controlled.
- **Mentor Certification Gate:** Sprint milestone completion requires human technical mentor review before proof badges are minted.
- **Non-Bias Auditing:** Match distributions are tracked and audited across cohorts to verify compliance with equal opportunity standards.
- **Kill Switch:** Assistant and matching microservices can be halted instantly with zero residual processing state.
