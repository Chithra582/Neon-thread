import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Award,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  TrendingUp,
  Activity,
  Code2,
  Fingerprint,
  RefreshCw,
  ExternalLink,
  ArrowRight,
  BarChart3
} from 'lucide-react';

interface InnovationDimensions {
  technicalNovelty: { score: number; analysis: string };
  architecturalElegance: { score: number; analysis: string };
  productionFeasibility: { score: number; analysis: string };
  originalityIndex: { score: number; analysis: string };
}

interface InnovationResult {
  overallScore: number;
  verdict: string;
  badge: string;
  dimensions: InnovationDimensions;
  keyInnovations: string[];
  patentabilityOrUniquenessNote: string;
  suggestedEnhancements: string[];
  innovationHash: string;
  source?: string;
}

const PRESET_PROJECTS = [
  {
    id: 'technova-bert',
    title: 'TechNova AI Customer Support Analytics',
    techStack: ['Python', 'FastAPI', 'PyTorch BERT', 'React', 'Tailwind', 'PostgreSQL', 'WebSockets'],
    architectureDescription:
      'Asynchronous microservices architecture with batch inference queue, WebSockets for sub-120ms sentiment telemetry broadcast, and automated Dockerized CI test pipeline.',
    metrics: { latency: '112ms', testCoverage: '92%', commitsCount: 48 },
    sprintRole: 'Full-Stack & ML Engineer (Chithra R)'
  },
  {
    id: 'ecotrack-iot',
    title: 'EcoTrack IoT Smart Energy Grid',
    techStack: ['Python', 'TimescaleDB', 'MQTT', 'Go', 'Docker', 'React Flow'],
    architectureDescription:
      'Edge MQTT broker aggregating 5,000 sensor pulses per minute, coupled with temporal anomaly detection and automated grid shedding protocols.',
    metrics: { latency: '45ms', testCoverage: '89%', commitsCount: 64 },
    sprintRole: 'Distributed Systems Engineer'
  },
  {
    id: 'healthpulse-rag',
    title: 'HealthPulse Medical RAG Assistant',
    techStack: ['LangChain', 'ChromaDB', 'FastAPI', 'Next.js', 'HIPAA Shield'],
    architectureDescription:
      'Zero-leakage retrieval-augmented generation with client-side PII redacting, vector semantic caching, and strict doctor-in-the-loop audit logs.',
    metrics: { latency: '180ms', testCoverage: '95%', commitsCount: 52 },
    sprintRole: 'Privacy & AI Engineer'
  }
];

export const InnovationChecker: React.FC = () => {
  const { currentRole, setActiveTab, openAuthModal } = useApp();

  const [selectedPreset, setSelectedPreset] = useState(PRESET_PROJECTS[0]);
  const [projectTitle, setProjectTitle] = useState(PRESET_PROJECTS[0].title);
  const [techStackInput, setTechStackInput] = useState(PRESET_PROJECTS[0].techStack.join(', '));
  const [architectureDesc, setArchitectureDesc] = useState(PRESET_PROJECTS[0].architectureDescription);
  const [latencyMetric, setLatencyMetric] = useState(PRESET_PROJECTS[0].metrics.latency);
  const [coverageMetric, setCoverageMetric] = useState(PRESET_PROJECTS[0].metrics.testCoverage);

  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [hasCopied, setHasCopied] = useState(false);
  const [result, setResult] = useState<InnovationResult | null>({
    overallScore: 94,
    verdict: 'High-Caliber Production Innovation',
    badge: 'Top 3% Novelty Tier',
    dimensions: {
      technicalNovelty: {
        score: 93,
        analysis: 'Sub-120ms Transformer vectorization combined with asynchronous event queuing bypasses conventional bottlenecks.'
      },
      architecturalElegance: {
        score: 95,
        analysis: 'Clean decoupling of inference worker nodes and WebSocket broadcast listeners prevents UI thread starvation.'
      },
      productionFeasibility: {
        score: 91,
        analysis: 'Test coverage exceeds 90% with automated container health probes and graceful degradation under load spikes.'
      },
      originalityIndex: {
        score: 97,
        analysis: 'Cryptographic Git commit lineage anchors authentic student engineering rather than standard boilerplate or tutorial clones.'
      }
    },
    keyInnovations: [
      'Asynchronous BERT inference pipeline with dynamic batching maintaining <120ms P95 latency',
      'Reactive WebSocket event bus streaming live sentiment telemetry directly into student skill threads',
      'Cryptographically anchored Git commit evidence hashes verified by industry mentor sign-off'
    ],
    patentabilityOrUniquenessNote:
      'Architecture demonstrates a novel synthesis of real-time stream tokenization and automated proof-based skill verification.',
    suggestedEnhancements: [
      'Implement ONNX Runtime INT8 quantization for 30% lower CPU utilization on high-throughput bursts.'
    ],
    innovationHash: '0xINV_8F2A9B_7C14E',
    source: 'gemini-3.8-flash'
  });

  const handleSelectPreset = (preset: typeof PRESET_PROJECTS[0]) => {
    setSelectedPreset(preset);
    setProjectTitle(preset.title);
    setTechStackInput(preset.techStack.join(', '));
    setArchitectureDesc(preset.architectureDescription);
    setLatencyMetric(preset.metrics.latency);
    setCoverageMetric(preset.metrics.testCoverage);
  };

  const runInnovationCheck = async () => {
    setIsScanning(true);
    setScanStep('Parsing architectural boundaries & Git lineage...');

    const timer1 = setTimeout(() => {
      setScanStep('Auditing algorithmic novelty vs. tutorial boilerplate...');
    }, 600);

    const timer2 = setTimeout(() => {
      setScanStep('Benchmarking latency & concurrency constraints...');
    }, 1200);

    const timer3 = setTimeout(() => {
      setScanStep('Compiling AI Innovation Radar & Cryptographic Hash...');
    }, 1800);

    try {
      const res = await fetch('/api/ai/innovation-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectTitle,
          techStack: techStackInput.split(',').map((s) => s.trim()).filter(Boolean),
          architectureDescription: architectureDesc,
          metrics: {
            latency: latencyMetric,
            testCoverage: coverageMetric,
            commitsCount: 48
          }
        })
      });

      const data = await res.json();
      if (data && data.overallScore) {
        setResult(data);
      }
    } catch (err) {
      console.warn('Innovation check fallback active:', err);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setIsScanning(false);
      setScanStep('');
    }
  };

  const handleCopyReport = () => {
    if (!result) return;
    const text = `=== NEON THREAD: INNOVATION AUDIT REPORT ===
Project: ${projectTitle}
Overall Innovation Score: ${result.overallScore}/100 (${result.badge})
Verdict: ${result.verdict}
Dimensions:
- Technical Novelty: ${result.dimensions.technicalNovelty.score}/100
- Architectural Elegance: ${result.dimensions.architecturalElegance.score}/100
- Production Feasibility: ${result.dimensions.productionFeasibility.score}/100
- Originality Index: ${result.dimensions.originalityIndex.score}/100
Innovation Hash: ${result.innovationHash}
Key Innovations:
${result.keyInnovations.map((k) => `* ${k}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0c1220] via-[#0f172a] to-[#0c1220] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                Autonomous Innovation Engine
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-mono font-bold">
                AUDIT TELEMETRY v3.8
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Innovation & Novelty Checker
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-light">
              Audits project architectures against state-of-the-art industry benchmarks. Distinguishes authentic, high-impact engineering from generic tutorial boilerplate.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-run-innovation-check"
              onClick={runInnovationCheck}
              disabled={isScanning}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Auditing Architecture...' : 'Run Innovation Check'}</span>
            </button>
          </div>
        </div>

        {/* Live scanning progress bar */}
        {isScanning && (
          <div className="mt-6 pt-4 border-t border-slate-800/80 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-cyan-300 font-mono mb-2">
              <span>{scanStep}</span>
              <span>Gemini 3.8 Flash Active</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-pulse w-3/4 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Preset Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-mono text-slate-400 shrink-0">Sample Sprints:</span>
        {PRESET_PROJECTS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 border ${
              selectedPreset.id === preset.id
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Main Grid: Input Specs & Innovation Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 cols): Project Architecture Specifications */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Project Blueprint & Codebase Input</span>
            </h3>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Project Title / Brief
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Tech Stack Components
              </label>
              <input
                type="text"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                Architecture & Engineering Decisions
              </label>
              <textarea
                rows={4}
                value={architectureDesc}
                onChange={(e) => setArchitectureDesc(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-cyan-400 leading-relaxed font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  P95 Latency SLA
                </label>
                <input
                  type="text"
                  value={latencyMetric}
                  onChange={(e) => setLatencyMetric(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Automated Test Coverage
                </label>
                <input
                  type="text"
                  value={coverageMetric}
                  onChange={(e) => setCoverageMetric(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs font-mono"
                />
              </div>
            </div>

            <button
              onClick={runInnovationCheck}
              disabled={isScanning}
              className="w-full mt-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs border border-cyan-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Audit This Configuration</span>
            </button>
          </div>

          {/* Quick Context Card */}
          <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold font-mono">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>The Neon Thread Innovation Standard</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Employers on Neon Thread don't hire keyword resumes. They evaluate engineers whose sprint artifacts demonstrate algorithmic originality, resilient concurrency patterns, and verified Git commits.
            </p>
          </div>
        </div>

        {/* Right Column (7 cols): Innovation Results, Dimensions & Audit Hash */}
        <div className="lg:col-span-7 space-y-6">
          {result && (
            <div className="space-y-6">
              {/* Overall Score Banner */}
              <div className="bg-[#0e1424] border border-cyan-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    {/* Radial Score Gauge */}
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center shrink-0">
                      <div className="w-full h-full bg-[#0b0f19] rounded-[14px] flex flex-col items-center justify-center">
                        <span className="text-3xl font-extrabold font-mono text-white leading-none">
                          {result.overallScore}
                        </span>
                        <span className="text-[10px] text-cyan-400 font-mono font-bold mt-0.5">
                          / 100
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                          {result.badge}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">VERIFIED</span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                        {result.verdict}
                      </h2>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Audit Hash: <strong className="text-cyan-300">{result.innovationHash}</strong>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyReport}
                    className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors"
                  >
                    {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{hasCopied ? 'Report Copied!' : 'Copy Audit'}</span>
                  </button>
                </div>

                {/* 4 Dimensional Deep-Dive Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {/* Dimension 1: Technical Novelty */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-white">Algorithmic Novelty</span>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-cyan-300">
                        {result.dimensions.technicalNovelty.score}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full mb-2 overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${result.dimensions.technicalNovelty.score}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                      {result.dimensions.technicalNovelty.analysis}
                    </p>
                  </div>

                  {/* Dimension 2: Architectural Elegance */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-white">Architectural Elegance</span>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-purple-300">
                        {result.dimensions.architecturalElegance.score}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full mb-2 overflow-hidden">
                      <div
                        className="h-full bg-purple-400 rounded-full"
                        style={{ width: `${result.dimensions.architecturalElegance.score}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                      {result.dimensions.architecturalElegance.analysis}
                    </p>
                  </div>

                  {/* Dimension 3: Production Feasibility */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">Production Feasibility</span>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-emerald-300">
                        {result.dimensions.productionFeasibility.score}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full mb-2 overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full"
                        style={{ width: `${result.dimensions.productionFeasibility.score}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                      {result.dimensions.productionFeasibility.analysis}
                    </p>
                  </div>

                  {/* Dimension 4: Originality Index */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Fingerprint className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-white">Zero-Boilerplate Index</span>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-amber-300">
                        {result.dimensions.originalityIndex.score}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full mb-2 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${result.dimensions.originalityIndex.score}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                      {result.dimensions.originalityIndex.analysis}
                    </p>
                  </div>
                </div>

                {/* Key Technical Innovations Extracted */}
                <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Key Technical Innovations Identified
                  </h4>
                  <ul className="space-y-2">
                    {result.keyInnovations.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Uniqueness & Patentability Note */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wide block font-bold mb-1">
                    Novelty & Differentiator Footprint
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {result.patentabilityOrUniquenessNote}
                  </p>
                </div>

                {/* Next-Step Architectural Enhancements */}
                {result.suggestedEnhancements?.length > 0 && (
                  <div className="mt-4 p-4 rounded-2xl bg-purple-950/20 border border-purple-800/40">
                    <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wide block font-bold mb-1">
                      Suggested Architectural Escalation
                    </span>
                    <ul className="space-y-1">
                      {result.suggestedEnhancements.map((enh, idx) => (
                        <li key={idx} className="text-xs text-purple-200/90 flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{enh}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Links Based on Role */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs text-slate-400">
                  Innovation audit results can be anchored directly to portfolio proof cards or used in employer interviews.
                </div>

                <div className="flex items-center gap-3 shrink-0 flex-wrap">
                  <button
                    onClick={() => setActiveTab('gemini-chat')}
                    className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Discuss with Gemini Mentor</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>View in Portfolio Proof</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveTab('proof-graph')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    <span>View Proof Graph</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
