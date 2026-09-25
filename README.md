# Neon Thread — Proof-Based Talent & Project Ecosystem

![HiDevs GitAgent Passport](https://img.shields.io/badge/HiDevs-GitAgent%20Passport-blueviolet?style=flat-square)
![OpenGAP](https://img.shields.io/badge/OpenGAP-v0.1.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Agent](https://img.shields.io/badge/agent-neon--thread--agent-orange?style=flat-square)

An autonomous **Proof-Based Talent Matching and Project Ecosystem Agent** (Project Loom) built with Google Gemini (`gemini-2.0-flash` / `@google/genai`), Express, React, TypeScript, and Vite.

Connects student engineering talent with employer challenges, verifies repository portfolio evidence, guides mentor-backed sprint milestones, and delivers bias-free hiring match explanations.

---

## Key Capabilities

| Capability | Purpose |
|---|---|
| **Talent & Challenge Matching** | Computes normalized skill match quotients between candidates and industry project briefs. |
| **Portfolio Evidence Verification** | Audits linked code repositories, commit histories, and test suites to verify claimed competencies. |
| **Sprint Milestone Evaluation** | Tracks multi-week deliverables (RFCs, APIs, test suites, demos) and mints verified proof upon mentor sign-off. |
| **Skill Gap & Growth Projection** | Pinpoints exact unverified skills and outlines targeted sprint challenges to bridge them into proof. |

---

## Tech Stack

- **AI Model**: Google Gemini (`gemini-2.0-flash`) via `@google/genai`
- **Backend**: Node.js & Express (`server.ts`)
- **Frontend**: React, TypeScript, Vite, Lucide Icons, Tailwind CSS
- **Protocol**: OpenGAP Specification v0.1.0

---

## Repository Structure

```text
Neon-thread/
├── agent.yaml                 # OpenGAP spec 0.1.0 root definition
├── SOUL.md                    # Core persona, proof-over-pedigree philosophy, EEOC alignment
├── EXPLAINABILITY.md          # 5-section transparency report satisfying Checkpoint 2
├── RULES.md                   # Immutable boundaries (MUST ALWAYS / MUST NEVER)
├── DUTIES.md                  # Segregation of duties (Maker, Executor, Checker, Auditor)
├── README.md                  # Detailed documentation with GitAgent Passport badges
├── package.json               # Full-stack dependencies
├── server.ts                  # Express backend & Gemini API integration
├── src/                       # React frontend source code
├── skills/
│   ├── talent-challenge-matcher/SKILL.md
│   ├── portfolio-evidence-verifier/SKILL.md
│   ├── sprint-milestone-evaluator/SKILL.md
│   └── skill-gap-analyzer/SKILL.md
└── tools/
    ├── match-evaluator.yaml
    ├── evidence-auditor.yaml
    ├── milestone-tracker.yaml
    └── gap-analyzer.yaml
```

---

## Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Configure API Key**:
   Copy `.env.example` to `.env` and set your `GEMINI_API_KEY`:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. **Start Platform**:
   ```bash
   npm run dev
   ```

---

## HiDevs GitAgent Passport Submission

- **Portal**: [HiDevs GitAgent Passport](https://app.hidevs.xyz/passport/submit)
- **Repository**: `Chithra582/Neon-thread`
- **Category**: **HR & recruiting**
