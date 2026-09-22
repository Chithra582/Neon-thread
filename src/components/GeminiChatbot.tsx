import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import { useApp } from '../context/AppContext';
import { SkillThread } from '../types';
import {
  Sparkles,
  Send,
  User,
  Bot,
  RefreshCw,
  Copy,
  Check,
  Zap,
  Cpu,
  Brain,
  ShieldCheck,
  Award,
  ArrowRight,
  RotateCcw,
  MessageSquare,
  HelpCircle,
  Code2,
  Briefcase,
  Terminal,
  ChevronDown
} from 'lucide-react';

export type ChatbotRoleId = 'mentor' | 'career_coach' | 'code_evaluator' | 'loom_architect';
export type TaskComplexity = 'fast' | 'general' | 'complex';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
  roleId?: ChatbotRoleId;
  taskComplexity?: TaskComplexity;
  source?: string;
}

interface ChatRoleDefinition {
  id: ChatbotRoleId;
  name: string;
  title: string;
  avatarText: string;
  avatarBg: string;
  description: string;
  badge: string;
  starterPrompts: string[];
}

const CHAT_ROLES: ChatRoleDefinition[] = [
  {
    id: 'mentor',
    name: 'Alex Chen',
    title: 'Principal Distributed Systems & AI Architect',
    avatarText: 'AC',
    avatarBg: 'from-cyan-500 to-blue-600',
    description: 'Specializes in high-throughput FastAPI backends, PyTorch pipelines, WebSockets, and P95 latency optimizations.',
    badge: 'Industry Mentor',
    starterPrompts: [
      'How do I maintain <120ms P95 latency with PyTorch BERT inference under load?',
      'Review my async event bus decoupling strategy between workers and WebSockets.',
      'How can I structure my Git commits to anchor verifiable proof criteria?'
    ]
  },
  {
    id: 'career_coach',
    name: 'Sarah Lin',
    title: 'Senior Technical Talent Strategist & Career Bridge Director',
    avatarText: 'SL',
    avatarBg: 'from-purple-500 to-indigo-600',
    description: 'Helps students articulate verified sprint evidence, system design trade-offs, and innovation scores to employer hiring managers.',
    badge: 'Career Strategist',
    starterPrompts: [
      'How do I present my verified Git lineage instead of resume bullet points?',
      'How do I explain my Top 3% Innovation score in a technical interview?',
      'Help me prep for questions about degraded network handling in our sprint.'
    ]
  },
  {
    id: 'code_evaluator',
    name: 'Marcus Brody',
    title: 'Staff Site Reliability Engineer & Code Reviewer',
    avatarText: 'MB',
    avatarBg: 'from-emerald-500 to-teal-600',
    description: 'Audits code snippets for race conditions, container health probes, test coverage benchmarks, and production resilience.',
    badge: 'Staff SRE',
    starterPrompts: [
      'What container health probes should I add to my Docker compose setup?',
      'How can I achieve >90% automated test coverage on async Python workers?',
      'Audit my WebSocket connection teardown logic for potential memory leaks.'
    ]
  },
  {
    id: 'loom_architect',
    name: 'Loom AI',
    title: 'Autonomous System Intelligence',
    avatarText: 'AI',
    avatarBg: 'from-amber-500 to-orange-600',
    description: 'Explains the cryptographic verification layers of Project Loom, multivariate matching scores, and skill thread proofs.',
    badge: 'System Core',
    starterPrompts: [
      'How does Project Loom compute verified skill percentages from Git commits?',
      'Explain the difference between keyword matching and Loom multivariate score.',
      'How does the team synergy weaver resolve skill overlaps in sprints?'
    ]
  }
];

const COMPLEXITY_TIERS: { id: TaskComplexity; label: string; model: string; icon: any; hint: string }[] = [
  {
    id: 'fast',
    label: 'Fast Response',
    model: 'gemini-3.1-flash-lite',
    icon: Zap,
    hint: 'Instant replies for syntax questions, definitions & quick feedback'
  },
  {
    id: 'general',
    label: 'General Tasks',
    model: 'gemini-3.5-flash',
    icon: Brain,
    hint: 'Balanced reasoning for sprint guidance, portfolio advice & code reviews'
  },
  {
    id: 'complex',
    label: 'Complex Architecture',
    model: 'gemini-3.1-pro-preview',
    icon: Cpu,
    hint: 'Deep multi-step reasoning for distributed systems & subtle concurrency'
  }
];

export const GeminiChatbot: React.FC = () => {
  const { currentRole, currentStudent, sprintWorkspace, setActiveTab } = useApp();

  const [activeRoleId, setActiveRoleId] = useState<ChatbotRoleId>('mentor');
  const [taskComplexity, setTaskComplexity] = useState<TaskComplexity>('general');
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [hasCopiedTranscript, setHasCopiedTranscript] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const activeRoleConfig = CHAT_ROLES.find((r) => r.id === activeRoleId) || CHAT_ROLES[0];
  const activeComplexityConfig = COMPLEXITY_TIERS.find((c) => c.id === taskComplexity) || COMPLEXITY_TIERS[1];

  // Conversation history state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg-1',
      role: 'assistant',
      content: `Hello! I'm **${activeRoleConfig.name}**, your **${activeRoleConfig.title}** on Neon Thread.\n\nI'm here to guide your engineering sprint on **"${sprintWorkspace?.challengeTitle || 'AI Customer Support Analytics'}"**, review architecture decisions, and help you translate authentic code commits into verified proof tokens.\n\nWhat engineering challenge or career question can we tackle right now?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: activeComplexityConfig.model,
      roleId: activeRoleId,
      taskComplexity: 'general',
      source: 'gemini-api'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  // When changing role, append a contextual role transition message
  const handleRoleChange = (newRole: ChatbotRoleId) => {
    if (newRole === activeRoleId) return;
    setActiveRoleId(newRole);
    const roleDef = CHAT_ROLES.find((r) => r.id === newRole) || CHAT_ROLES[0];

    const transitionMsg: ChatMessage = {
      id: `role-switch-${Date.now()}`,
      role: 'assistant',
      content: `Switched active persona to **${roleDef.name}** (*${roleDef.title}*).\n\n${roleDef.description}\n\nHow can I help you from this perspective?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: activeComplexityConfig.model,
      roleId: newRole,
      taskComplexity,
      source: 'system'
    };

    setMessages((prev) => [...prev, transitionMsg]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend !== undefined ? textToSend : inputText).trim();
    if (!messageContent || isSending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      roleId: activeRoleId,
      taskComplexity
    };

    // Optimistically append user message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsSending(true);

    try {
      // Build conversation payload for the server
      const payloadMessages = updatedMessages
        .filter((m) => m.source !== 'system')
        .map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          roleId: activeRoleId,
          taskComplexity,
          contextData: {
            studentName: currentStudent?.name || 'Chithra R',
            skills: currentStudent?.skills?.map((s: SkillThread) => `${s.name} (${s.verifiedPercentage}%)`) || [
              'Python (87%)',
              'React (82%)',
              'ML (68%)'
            ],
            currentSprint: sprintWorkspace?.challengeTitle || 'AI Customer Support Analytics',
            userRole: currentRole
          }
        })
      });

      const data = await res.json();

      if (data && data.response) {
        const botResponse: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          model: data.model || activeComplexityConfig.model,
          roleId: activeRoleId,
          taskComplexity,
          source: data.source || 'gemini-api'
        };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        throw new Error(data.error || 'Empty response received');
      }
    } catch (err: any) {
      console.warn('Chat error, using fallback answer:', err);
      const fallbackResponse: ChatMessage = {
        id: `fallback-${Date.now()}`,
        role: 'assistant',
        content: `**${activeRoleConfig.name}:**\n\nI received your query regarding *"${messageContent}"*.\n\nKey architectural guidance for Project Loom:\n1. **Decouple Concurrency**: Ensure batch vectorization queues don't starve WebSocket broadcast channels.\n2. **Proof Anchor**: Ensure your commit metadata explicitly lists the verified criteria (e.g. \`perf: P95 latency 112ms\`).\n3. **Interview Readiness**: Point hiring managers directly to your cryptographic mentor certificate.\n\nLet me know which specific component you want to explore next!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: activeComplexityConfig.model,
        roleId: activeRoleId,
        taskComplexity,
        source: 'loom-fallback'
      };
      setMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsSending(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Reset this conversation history?')) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: 'assistant',
          content: `Conversation reset. I'm ready as **${activeRoleConfig.name}** (*${activeRoleConfig.title}*). What would you like to discuss?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          model: activeComplexityConfig.model,
          roleId: activeRoleId,
          taskComplexity,
          source: 'system'
        }
      ]);
    }
  };

  const handleCopyTranscript = () => {
    const transcript = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.role === 'user' ? 'YOU' : activeRoleConfig.name} (${m.model || 'Gemini'}):\n${m.content}\n`
      )
      .join('\n---\n\n');

    navigator.clipboard.writeText(transcript);
    setHasCopiedTranscript(true);
    setTimeout(() => setHasCopiedTranscript(false), 2000);
  };

  const handleCopyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner & Persona Description */}
      <div className="bg-gradient-to-r from-[#0c1220] via-[#0f172a] to-[#0c1220] border border-cyan-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Gemini Multi-Turn Intelligence
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-800/60 font-mono font-bold">
                SYSTEM INSTRUCTION ENABLED
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Gemini Engineering & Career Assistant
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl font-light">
              Interactive multi-turn AI advisors tailored to industry sprint challenges, distributed architecture design, Git evidence proofing, and technical hiring interviews.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              id="btn-copy-transcript"
              onClick={handleCopyTranscript}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Copy complete chat transcript"
            >
              {hasCopiedTranscript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{hasCopiedTranscript ? 'Copied' : 'Export Transcript'}</span>
            </button>

            <button
              id="btn-clear-chat"
              onClick={handleClearChat}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-300 border border-slate-800 hover:border-red-900/60 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Reset chat conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Role Selector Cards */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 font-bold">
            Select Chatbot Persona & System Role:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CHAT_ROLES.map((role) => {
              const isSelected = activeRoleId === role.id;
              return (
                <button
                  key={role.id}
                  id={`role-btn-${role.id}`}
                  onClick={() => handleRoleChange(role.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all relative overflow-hidden flex items-start gap-3 ${
                    isSelected
                      ? 'bg-gradient-to-b from-cyan-950/60 to-slate-900 text-white border-cyan-500/60 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${role.avatarBg} text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-md`}
                  >
                    {role.avatarText}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-white truncate">{role.name}</h4>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">
                        {role.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{role.title}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Chat Interface Window */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[700px]">
        {/* Chat Header Toolbar: Active Persona & Model/Complexity Switcher */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${activeRoleConfig.avatarBg} text-white font-extrabold text-sm flex items-center justify-center shadow-lg`}
            >
              {activeRoleConfig.avatarText}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-white">{activeRoleConfig.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-bold">
                  {activeRoleConfig.badge}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">{activeRoleConfig.title}</p>
            </div>
          </div>

          {/* Model / Task Complexity Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
            {COMPLEXITY_TIERS.map((tier) => {
              const IconComp = tier.icon;
              const isTierSelected = taskComplexity === tier.id;
              return (
                <button
                  key={tier.id}
                  id={`btn-tier-${tier.id}`}
                  onClick={() => setTaskComplexity(tier.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isTierSelected
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                  title={`${tier.label}: ${tier.hint} (Model: ${tier.model})`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tier.label}</span>
                  <span className="text-[9px] font-mono opacity-80 border-l border-current pl-1.5">
                    {tier.id === 'fast' ? '3.1-Lite' : tier.id === 'general' ? '3.5-Flash' : '3.1-Pro'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Message Thread Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const roleDef = CHAT_ROLES.find((r) => r.id === msg.roleId) || activeRoleConfig;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 sm:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center shrink-0 text-xs font-extrabold shadow-md ${
                    isUser
                      ? 'bg-gradient-to-tr from-cyan-400 to-blue-500 text-slate-950'
                      : `bg-gradient-to-tr ${roleDef.avatarBg} text-white`
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : roleDef.avatarText}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 shadow-lg relative group ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border border-cyan-500/40 text-slate-100 rounded-tr-sm'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-sm'
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center justify-between gap-3 mb-2 pb-1.5 border-b border-white/5 text-[11px] font-mono">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      {isUser ? 'You (Candidate Engineer)' : roleDef.name}
                    </span>

                    <div className="flex items-center gap-2 text-slate-400">
                      {msg.model && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/80 text-cyan-300 font-mono border border-slate-800">
                          {msg.model}
                        </span>
                      )}
                      <span>{msg.timestamp}</span>

                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.content)}
                        className="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity p-0.5"
                        title="Copy message text"
                      >
                        {copiedMessageId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Message Content with Markdown Support */}
                  <div className="text-xs sm:text-sm leading-relaxed prose prose-invert max-w-none prose-p:my-1.5 prose-pre:my-2 prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-code:text-cyan-300 prose-code:font-mono prose-ul:my-1.5 prose-li:my-0.5">
                    <div className="markdown-body">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isSending && (
            <div className="flex items-start gap-3 sm:gap-4">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-tr ${activeRoleConfig.avatarBg} text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-md`}
              >
                {activeRoleConfig.avatarText}
              </div>
              <div className="bg-slate-900/90 border border-cyan-500/40 rounded-3xl rounded-tl-sm p-4 text-xs text-cyan-300 flex items-center gap-3 shadow-lg animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span className="font-mono">
                  {activeRoleConfig.name} is reasoning with {activeComplexityConfig.model}...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Prompts Carousel */}
        <div className="px-4 py-2.5 bg-slate-950/40 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 font-bold">
            <HelpCircle className="w-3 h-3 text-cyan-400" />
            Suggested Prompts:
          </span>
          {activeRoleConfig.starterPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isSending}
              className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-[11px] whitespace-nowrap transition-colors shrink-0 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar & Actions */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800">
          <div className="flex items-end gap-3 bg-slate-900 rounded-2xl p-2 border border-slate-700/80 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400/20 transition-all">
            <textarea
              id="gemini-chat-input"
              ref={textareaRef}
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${activeRoleConfig.name} about architecture, code, test SLAs, or interview prep... (Press Enter to send)`}
              className="flex-1 bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm px-2 py-1.5 focus:outline-none resize-none"
            />

            <button
              id="btn-send-gemini-chat"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isSending}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Footnote with Active Model Tier Confirmation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-2 px-1 text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>
                Active Mode: <strong className="text-cyan-300">{activeComplexityConfig.label}</strong> ({activeComplexityConfig.model})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('innovation-check')}
                className="hover:text-cyan-300 transition-colors"
              >
                Innovation Checker &rarr;
              </button>
              <button
                onClick={() => setActiveTab('proof-graph')}
                className="hover:text-cyan-300 transition-colors"
              >
                Proof Graph &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
