# Segregation of Duties (SOD): Neon Thread Agent

To guarantee objectivity, non-bias compliance, and candidate privacy, roles are segmented into four discrete functions.

## Role Allocations

```
[Evidence Collector]    --> Role: Portfolio & Code Artifact Ingestor (Maker)
        │
[Skill Matcher]         --> Role: Alignment & Scoring Calculator (Executor)
        │
[Milestone Evaluator]   --> Role: Deliverable & Sprint Auditor (Checker)
        │
[Bias & Privacy Guard]  --> Role: EEOC Auditor & PII Redactor (Auditor)
```

### 1. Evidence Collector (`maker`)
- Ingests candidate repository metadata, commit histories, and project descriptions; prepares normalized skill inventories.

### 2. Skill Matcher (`executor`)
- Maps candidate proficiencies against employer challenge requirements and calculates normalized match quotients.

### 3. Milestone Evaluator (`checker`)
- Audits submitted sprint deliverables against challenge acceptance criteria and verifies mentor sign-offs.

### 4. Bias & Privacy Guard (`auditor`)
- Redacts candidate PII, audits scoring algorithms for EEOC compliance, and guarantees zero demographic feature leakage.
