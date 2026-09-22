import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// AI Endpoint 1: Match Analysis Explanation
app.post("/api/ai/match-explanation", async (req, res) => {
  try {
    const { studentName, studentSkills, challengeTitle, requiredSkills } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `You are the AI engine for "Neon Thread – Project Loom", a proof-based talent matching platform.
Explain why student "${studentName || 'Chithra R'}" has a high match for challenge "${challengeTitle || 'AI Customer Support Analytics'}".
Student verified skills: ${JSON.stringify(studentSkills || ['Python (87%)', 'React (82%)', 'SQL (74%)', 'ML (68%)'])}.
Challenge required skills: ${JSON.stringify(requiredSkills || ['Python', 'React', 'SQL', 'Machine Learning', 'FastAPI'])}.

Provide a concise, 2-sentence explanation highlighting:
1. Why their verified project evidence makes them strong.
2. The remaining skill gap and how the sprint will help them bridge it into proof.
Keep the tone encouraging, professional, and proof-focused.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
        });

        if (response.text) {
          return res.json({ explanation: response.text.trim(), source: "gemini-3.8-flash" });
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to smart heuristic:", geminiErr);
      }
    }

    // High quality deterministic fallback
    const fallbackText = `You match 4/5 required skills with verified project proof. Your strongest evidence comes from your previous FastAPI microservice and real-time sentiment analytics repository. Participating in this sprint will bridge your FastAPI skill into mentor-verified proof.`;
    return res.json({ explanation: fallbackText, source: "mock-ai-engine" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to generate match explanation" });
  }
});

// AI Endpoint 2: Team Weaver Synergy Analysis
app.post("/api/ai/team-weaver", async (req, res) => {
  try {
    const { challengeTitle, members, requiredSkills } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `You are the AI Team Weaver for "Neon Thread – Project Loom".
Analyze this team composition for "${challengeTitle}":
Members: ${JSON.stringify(members)}
Required Skills: ${JSON.stringify(requiredSkills)}

Generate a 2-sentence assessment on why these complementary threads weave into a high-synergy squad and one strategic recommendation for the sprint.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
        });

        if (response.text) {
          return res.json({ analysis: response.text.trim(), source: "gemini-3.8-flash" });
        }
      } catch (geminiErr) {
        console.warn("Gemini Team Weaver failed, fallback active:", geminiErr);
      }
    }

    return res.json({
      analysis: "High-synergy complementary thread: Frontend architecture (React/Tailwind) seamlessly pairs with backend data indexing (SQL) and NLP model inference (Python). Recommended sprint focus: Lock API contracts on Day 2 to allow parallel client/server execution.",
      source: "mock-ai-engine"
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to analyze team" });
  }
});

// AI Endpoint 3: Mentor Feedback Summarizer
app.post("/api/ai/summarize-feedback", async (req, res) => {
  try {
    const { rawFeedback, ratings } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `You are an AI Mentor Assistant for Neon Thread.
Summarize this sprint review feedback into 3 bullet points: Action Items, Verified Evidence Generated, and Next Step:
Feedback: "${rawFeedback}"
Ratings: Progress ${ratings?.progress}/5, Technical ${ratings?.technical}/5, Collaboration ${ratings?.collaboration}/5`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
        });

        if (response.text) {
          return res.json({ summary: response.text.trim(), source: "gemini-3.8-flash" });
        }
      } catch (geminiErr) {
        console.warn("Gemini summarization failed, fallback active:", geminiErr);
      }
    }

    return res.json({
      summary: `• Action Item: Enhance FastAPI CORS authorization & add Bearer token middleware before final release.\n• Verified Evidence: Successfully validated Python async pipeline and PostgreSQL GIN indexing.\n• Next Step: Final 500 req/s load test and presentation deck compilation.`,
      source: "mock-ai-engine"
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to summarize feedback" });
  }
});

// AI Endpoint 4: Portfolio Proof Generation
app.post("/api/ai/generate-proof", async (req, res) => {
  try {
    const { projectTitle, role, skillsProven, sprintDays } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `Write a verified portfolio project proof narrative for "${projectTitle}" completed in a ${sprintDays || 7}-day sprint.
Role: ${role}
Skills Proven: ${JSON.stringify(skillsProven)}
Write a crisp 2-sentence executive summary emphasizing demonstrated engineering capabilities, tangible impact, and mentor sign-off.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
        });

        if (response.text) {
          return res.json({ narrative: response.text.trim(), source: "gemini-3.8-flash" });
        }
      } catch (geminiErr) {
        console.warn("Gemini proof narrative failed, fallback active:", geminiErr);
      }
    }

    return res.json({
      narrative: `Demonstrated production-grade full-stack and NLP capabilities by engineering a sub-200ms customer sentiment classification service and interactive analytics console. Formally verified by mentor Dr. Aris Thorne through repository inspection, test coverage benchmarks, and sprint milestones.`,
      source: "mock-ai-engine"
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to generate proof" });
  }
});

// AI Endpoint 5: Innovation & Novelty Check
app.post("/api/ai/innovation-check", async (req, res) => {
  try {
    const { projectTitle, techStack, architectureDescription, metrics } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `You are the Lead Innovation & Systems Evaluator for "Neon Thread – Project Loom".
Evaluate the innovation and engineering novelty of the following project solution:
Project Title: "${projectTitle || 'AI Customer Support Analytics'}"
Tech Stack: ${JSON.stringify(techStack || ['Python', 'FastAPI', 'PyTorch BERT', 'React', 'Tailwind', 'PostgreSQL'])}
Architecture Description: "${architectureDescription || 'Asynchronous microservices architecture with batch inference queue, WebSocket streaming to reactive dashboard, and verified CI/CD pipeline.'}"
Reported Metrics: ${JSON.stringify(metrics || { latency: '112ms', testCoverage: '92%', commitsCount: 48 })}

Respond in valid JSON only with this structure:
{
  "overallScore": number (85-98),
  "verdict": "string",
  "badge": "string",
  "dimensions": {
    "technicalNovelty": { "score": number, "analysis": "string" },
    "architecturalElegance": { "score": number, "analysis": "string" },
    "productionFeasibility": { "score": number, "analysis": "string" },
    "originalityIndex": { "score": number, "analysis": "string" }
  },
  "keyInnovations": ["string", "string", "string"],
  "patentabilityOrUniquenessNote": "string",
  "suggestedEnhancements": ["string"]
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json"
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({
            ...parsed,
            innovationHash: "0xINV_" + Math.random().toString(16).substring(2, 10).toUpperCase(),
            source: "gemini-3.8-flash"
          });
        }
      } catch (geminiErr) {
        console.warn("Gemini Innovation Check failed, using fallback:", geminiErr);
      }
    }

    // High quality deterministic fallback evaluation
    return res.json({
      overallScore: 94,
      verdict: "High-Caliber Production Innovation",
      badge: "Top 3% Novelty Tier",
      dimensions: {
        technicalNovelty: {
          score: 93,
          analysis: "Sub-120ms Transformer vectorization combined with asynchronous event queuing bypasses conventional bottlenecks."
        },
        architecturalElegance: {
          score: 95,
          analysis: "Clean decoupling of inference worker nodes and WebSocket broadcast listeners prevents UI thread starvation."
        },
        productionFeasibility: {
          score: 91,
          analysis: "Test coverage exceeds 90% with automated container health probes and graceful degradation under load spikes."
        },
        originalityIndex: {
          score: 97,
          analysis: "Cryptographic Git commit lineage anchors authentic student engineering rather than standard boilerplate or tutorial clones."
        }
      },
      keyInnovations: [
        "Asynchronous BERT inference pipeline with dynamic batching maintaining <120ms P95 latency",
        "Reactive WebSocket event bus streaming live sentiment telemetry directly into student skill threads",
        "Cryptographically anchored Git commit evidence hashes verified by industry mentor sign-off"
      ],
      patentabilityOrUniquenessNote: "Architecture demonstrates a novel synthesis of real-time stream tokenization and automated proof-based skill verification.",
      suggestedEnhancements: [
        "Implement ONNX Runtime INT8 quantization for 30% lower CPU utilization on high-throughput bursts."
      ],
      innovationHash: "0xINV_8F2A9B_7C14E",
      source: "mock-ai-engine"
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to execute innovation check" });
  }
});

// AI Endpoint 6: Multi-turn Chatbot with Role System Instructions and Dynamic Model Selection
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { messages, roleId = 'mentor', taskComplexity = 'general', contextData } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required and must not be empty." });
    }

    // Map system instruction by selected chatbot role
    let systemInstruction = "";
    if (roleId === 'mentor') {
      systemInstruction = `You are Alex Chen, a Principal Distributed Systems & AI Architect and Senior Technical Mentor on "Neon Thread – Project Loom".
Your purpose is to mentor students through production-grade engineering challenges, distributed architecture design, FastAPI/Python backends, PyTorch ML pipelines, WebSockets, Git lineage verification, and latency optimizations.
Provide rigorous, practical engineering advice with high technical fidelity. You encourage testing, containerization, clear trade-offs, and verifiable proof over resume buzzwords. Use Markdown formatting for code snippets and architectural diagrams where appropriate.`;
    } else if (roleId === 'career_coach') {
      systemInstruction = `You are Sarah Lin, Senior Technical Talent Strategist and Career Bridge Director on "Neon Thread – Project Loom".
Your purpose is to coach engineering students on presenting verified project proof, GitHub commit lineage, and innovation scores to employer hiring managers.
You help craft interview talking points, explain architectural decisions with confidence, prepare for technical design rounds, and highlight why proof-backed sprint artifacts beat unverified resume claims. Maintain an encouraging, strategic, and professional coaching tone.`;
    } else if (roleId === 'code_evaluator') {
      systemInstruction = `You are Marcus Brody, Staff Site Reliability Engineer and Code Evaluator on "Neon Thread – Project Loom".
Your purpose is to audit code snippets, architecture proposals, test coverage, and latency SLAs.
You identify edge cases, concurrency hazards, race conditions, memory leaks, security vulnerabilities, and deployment reliability bottlenecks. Provide clear, bulleted recommendations and hardened code patterns.`;
    } else {
      // Default: loom_architect
      systemInstruction = `You are Loom AI, the Autonomous System Assistant for "Neon Thread – Project Loom".
Neon Thread is a proof-based talent matching ecosystem that connects student talent with enterprise challenges, mentor-guided sprints, cryptographic proof graphs, and direct interview opportunities.
Explain platform mechanisms, how skill proofs are calculated from Git commit hashes and mentor sign-offs, multivariate challenge matching weights, and team synergy weaving. Be concise, insightful, and supportive.`;
    }

    if (contextData) {
      systemInstruction += `\n\nActive Platform Context:
- Current Student/User: ${contextData.studentName || 'Student Engineer'}
- Active Sprint: ${contextData.currentSprint || 'AI Customer Support Analytics'}
- Verified Skills: ${JSON.stringify(contextData.skills || ['Python (87%)', 'React (82%)', 'SQL (74%)', 'ML (68%)'])}
- Platform Role: ${contextData.userRole || 'student'}`;
    }

    // Determine target model based on user requirement:
    // "Use gemini-3.1-pro-preview for particularly complex tasks, gemini-3.5-flash for general tasks, and gemini-3.1-flash-lite for tasks that should happen fast."
    let targetModel = "gemini-3.5-flash";
    if (taskComplexity === "fast") {
      targetModel = "gemini-3.1-flash-lite";
    } else if (taskComplexity === "complex") {
      targetModel = "gemini-3.1-pro-preview";
    }

    const ai = getGeminiClient();

    if (ai) {
      // Format messages into Google GenAI contents format
      const formattedContents = messages.map((m: any) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: String(m.content || m.text || '') }]
      }));

      // Ensure the conversation starts with a user turn if needed
      if (formattedContents.length > 0 && formattedContents[0].role !== 'user') {
        formattedContents.unshift({
          role: 'user',
          parts: [{ text: 'Hello!' }]
        });
      }

      try {
        const response = await ai.models.generateContent({
          model: targetModel,
          contents: formattedContents,
          config: {
            systemInstruction,
          }
        });

        if (response.text) {
          return res.json({
            response: response.text.trim(),
            model: targetModel,
            roleId,
            taskComplexity,
            source: "gemini-api"
          });
        }
      } catch (geminiError: any) {
        console.warn(`Primary model ${targetModel} call failed:`, geminiError);
        // Fallback to gemini-3.5-flash if gemini-3.1-pro-preview encountered paid tier or quota constraint
        if (targetModel === "gemini-3.1-pro-preview") {
          try {
            console.log("Attempting fallback to gemini-3.5-flash...");
            const fallbackResponse = await ai.models.generateContent({
              model: "gemini-3.5-flash",
              contents: formattedContents,
              config: {
                systemInstruction,
              }
            });
            if (fallbackResponse.text) {
              return res.json({
                response: fallbackResponse.text.trim(),
                model: "gemini-3.5-flash",
                roleId,
                taskComplexity,
                note: "Processed via gemini-3.5-flash resilience channel",
                source: "gemini-api"
              });
            }
          } catch (fallbackErr) {
            console.warn("Fallback to gemini-3.5-flash also failed:", fallbackErr);
          }
        }
      }
    }

    // High quality conversational fallback if API key is not configured or offline
    const latestUserMessage = [...messages].reverse().find((m: any) => m.role === 'user')?.content || 'hello';
    let fallbackText = "";

    if (roleId === 'mentor') {
      fallbackText = `**Alex Chen (Principal Architect):**\n\nI reviewed your query regarding: *"${latestUserMessage}"*.\n\nFrom a systems perspective in Project Loom:\n1. **Decouple Concurrency**: Ensure your asynchronous request queue (e.g. Celery/RabbitMQ or FastAPI async workers) is isolated from your live WebSocket broadcast threads so inference latency spikes don't block telemetry.\n2. **Verification Trail**: When committing your changes, make sure your Git commit messages reference the specific SLA criteria (e.g., \`perf: P95 latency reduced to 112ms via batch vectorization\`). This anchors directly to your verified skill score.\n3. **Test Harness**: Add automated test cases covering edge cases under concurrent load.\n\nWhat component would you like us to deep-dive into next?`;
    } else if (roleId === 'career_coach') {
      fallbackText = `**Sarah Lin (Career & Talent Strategist):**\n\nGreat question regarding *"${latestUserMessage}"*.\n\nHere is how to frame this to an engineering hiring manager:\n- **Lead with Proof, Not Claims**: Rather than saying "I know Python and Machine Learning", highlight your verified **94% Innovation Audit** and **P95 <120ms latency benchmark** on the TechNova challenge.\n- **Mention Mentor Sign-Off**: Point them directly to your verified cryptographic certificate signed off by industry architects.\n- **Interview Tip**: Expect them to ask how you handled degraded network states—be ready to discuss your WebSocket fallback.\n\nWould you like to practice an interview response for your next employer round?`;
    } else if (roleId === 'code_evaluator') {
      fallbackText = `**Marcus Brody (Staff SRE / Code Reviewer):**\n\nAnalyzing your request regarding *"${latestUserMessage}"*:\n\n- **Reliability Audit**: High-throughput inference pipelines require graceful backpressure. Ensure your worker pool has active container health probes (\`/healthz\` / \`/readyz\`).\n- **Test Coverage**: Keep your test suite above the 90% threshold to maintain your "Top 3% Novelty" badge in the proof graph.\n- **Memory Footprint**: If using PyTorch BERT models, enable \`torch.inference_mode()\` and dynamic batching to avoid VRAM fragmentation.\n\nReady to benchmark your next pull request?`;
    } else {
      fallbackText = `**Loom AI Assistant:**\n\nI'm your guide across Neon Thread – Project Loom!\n\nRegarding *"${latestUserMessage}"*:\n- **Proof Lineage**: Every sprint commit and mentor evaluation updates your verified skill threads in real-time.\n- **Employer Bridge**: Employers discover candidates through authentic challenge deliverables rather than filtered resume buzzwords.\n- **Innovation Audit**: Use the Innovation Checker to verify that your architecture demonstrates algorithmic novelty and production feasibility.\n\nHow else can I assist your sprint or talent search today?`;
    }

    return res.json({
      response: fallbackText,
      model: targetModel,
      roleId,
      taskComplexity,
      source: "loom-fallback-engine"
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Chat processing failed" });
  }
});

// Vite Middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Neon Thread server running on http://localhost:${PORT}`);
  });
}

startServer();
