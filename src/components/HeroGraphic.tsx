import { useState, useMemo } from 'react';
import { m } from 'motion/react';
import { useScrollSync } from '@/hooks/use-scroll-sync';

interface PipelineNode {
  id: string;
  label: string;
  sublabel: string;
  stageNum: string;
  stageName: string;
  x: number; // center x
  y: number; // center y
  width: number;
  height: number;
  realWorldProblem: string;
  telemetry: string;
  tech: string;
  statusColor: string;
}

interface PipelineEdge {
  id: string;
  from: string;
  to: string;
  curve: string;
}

interface StageHeader {
  num: string;
  name: string;
  problem: string;
  x: number;
  id: string;
}

// 4 distinct enterprise AI engineering stages solving real-world production challenges
const STAGE_HEADERS: StageHeader[] = [
  {
    num: '01',
    name: 'INGEST & RAG',
    problem: 'Unstructured Data & Zero-Hallucination Retrieval',
    x: 110,
    id: 'stage-1',
  },
  {
    num: '02',
    name: 'AGENTIC FLOWS',
    problem: 'Multi-Agent Cyclic Reasoning & Reflection',
    x: 318,
    id: 'stage-2',
  },
  {
    num: '03',
    name: 'PROTOCOLS & API',
    problem: 'Safe Tool Execution via MCP & Async Core',
    x: 526,
    id: 'stage-3',
  },
  {
    num: '04',
    name: 'STORAGE & CLOUD',
    problem: 'ACID Persistence, Vector Index & CI/CD',
    x: 734,
    id: 'stage-4',
  },
];

// 8 comprehensive pipeline nodes representing real-world enterprise AI solutions
// Width = 164, Height = 48, rx = 10 (ample text room, zero clipping)
const NODES: PipelineNode[] = [
  // Stage 1: Ingestion & Verification
  {
    id: 'ingest',
    label: 'Data Ingest',
    sublabel: 'PDFs & Webhooks',
    stageNum: '01',
    stageName: 'INGESTION',
    x: 110,
    y: 110,
    width: 164,
    height: 48,
    realWorldProblem: 'Ingests messy enterprise PDFs, Excel sheets & live webhooks without data loss',
    telemetry: 'Multi-Source Parsing • Automated Stream Intake',
    tech: 'pdfplumber • openpyxl • Pandas • Webhooks',
    statusColor: '#38bdf8', // cyan
  },
  {
    id: 'rag',
    label: 'Hybrid RAG',
    sublabel: 'Vector & BM25',
    stageNum: '01',
    stageName: 'RETRIEVAL',
    x: 110,
    y: 240,
    width: 164,
    height: 48,
    realWorldProblem: 'Eliminates LLM hallucinations by combining dense vectors with sparse reranking',
    telemetry: 'Semantic Chunking • pgvector Re-ranking',
    tech: 'RAG Pipelines • Vector Search • Embeddings',
    statusColor: '#10b981', // emerald
  },

  // Stage 2: Agentic Reasoning & Guardrails
  {
    id: 'langgraph',
    label: 'LangGraph Flow',
    sublabel: 'Multi-Agent Flow',
    stageNum: '02',
    stageName: 'ORCHESTRATION',
    x: 318,
    y: 110,
    width: 164,
    height: 48,
    realWorldProblem: 'Orchestrates supervisor-worker agent loops with self-correction & reflection',
    telemetry: 'Cyclic StateGraph • Dynamic Tool Routing',
    tech: 'LangGraph • LangChain • Hermes Agent',
    statusColor: '#c084fc', // purple
  },
  {
    id: 'claude',
    label: 'Claude & Gemini',
    sublabel: 'Structured JSON',
    stageNum: '02',
    stageName: 'FOUNDATION AI',
    x: 318,
    y: 240,
    width: 164,
    height: 48,
    realWorldProblem: 'Enforces strict JSON schemas and tool execution for deterministic output',
    telemetry: 'Tool Calling • Schema-Guided Inference',
    tech: 'Claude API • Gemini API • PyTorch • LoRA',
    statusColor: '#c084fc',
  },

  // Stage 3: Protocols & Backend Execution
  {
    id: 'fastapi',
    label: 'FastAPI Backend',
    sublabel: 'Domain Services',
    stageNum: '03',
    stageName: 'CORE BACKEND',
    x: 526,
    y: 110,
    width: 164,
    height: 48,
    realWorldProblem: 'Delivers high-concurrency async endpoints with Clean Architecture separation',
    telemetry: 'Dependency Injection • Async REST Services',
    tech: 'FastAPI • Python • TypeScript • REST',
    statusColor: '#10b981',
  },
  {
    id: 'mcp',
    label: 'MCP Tool Bus',
    sublabel: 'Context Server',
    stageNum: '03',
    stageName: 'TOOL PROTOCOL',
    x: 526,
    y: 240,
    width: 164,
    height: 48,
    realWorldProblem: 'Standardizes tool and resource access across enterprise services safely',
    telemetry: 'Model Context Protocol • Tool Orchestration',
    tech: 'Model Context Protocol • JSON-RPC • n8n',
    statusColor: '#f59e0b', // amber
  },

  // Stage 4: Persistence & Production Scale
  {
    id: 'postgres',
    label: 'PostgreSQL DB',
    sublabel: 'pgvector & Cache',
    stageNum: '04',
    stageName: 'PERSISTENCE',
    x: 734,
    y: 110,
    width: 164,
    height: 48,
    realWorldProblem: 'Provides ACID transactional persistence, vector storage & Redis caching',
    telemetry: 'Connection Pooling • Low-Latency Redis',
    tech: 'PostgreSQL • SQLAlchemy • Redis • Supabase',
    statusColor: '#38bdf8',
  },
  {
    id: 'docker',
    label: 'Docker & CI/CD',
    sublabel: 'Cloud Deployment',
    stageNum: '04',
    stageName: 'DEPLOYMENT',
    x: 734,
    y: 240,
    width: 164,
    height: 48,
    realWorldProblem: 'Enables zero-downtime containerized deployment and automated test pipelines',
    telemetry: 'Multi-Stage Builds • Cloud Orchestration',
    tech: 'Docker • GitHub Actions • AWS • GCP',
    statusColor: '#10b981',
  },
];

// Complete DAG circuit connectivity: Col 1 (192) -> Col 2 (236) -> Col 3 (444) -> Col 4 (652)
const EDGES: PipelineEdge[] = [
  // Stage 1 intra-stage vertical
  { id: 'e-in-rag', from: 'ingest', to: 'rag', curve: 'M 110 134 L 110 216' },

  // Stage 1 -> Stage 2 connections
  { id: 'e1', from: 'ingest', to: 'langgraph', curve: 'M 192 110 L 236 110' },
  { id: 'e2', from: 'ingest', to: 'claude', curve: 'M 192 110 C 214 110, 214 240, 236 240' },
  { id: 'e3', from: 'rag', to: 'langgraph', curve: 'M 192 240 C 214 240, 214 110, 236 110' },
  { id: 'e4', from: 'rag', to: 'claude', curve: 'M 192 240 L 236 240' },

  // Stage 2 intra-stage vertical
  { id: 'e-lg-cl', from: 'langgraph', to: 'claude', curve: 'M 318 134 L 318 216' },

  // Stage 2 -> Stage 3 connections
  { id: 'e5', from: 'langgraph', to: 'fastapi', curve: 'M 400 110 L 444 110' },
  { id: 'e6', from: 'langgraph', to: 'mcp', curve: 'M 400 110 C 422 110, 422 240, 444 240' },
  { id: 'e7', from: 'claude', to: 'fastapi', curve: 'M 400 240 C 422 240, 422 110, 444 110' },
  { id: 'e8', from: 'claude', to: 'mcp', curve: 'M 400 240 L 444 240' },

  // Stage 3 intra-stage vertical
  { id: 'e-fa-mcp', from: 'fastapi', to: 'mcp', curve: 'M 526 134 L 526 216' },

  // Stage 3 -> Stage 4 connections
  { id: 'e9', from: 'fastapi', to: 'postgres', curve: 'M 608 110 L 652 110' },
  { id: 'e10', from: 'fastapi', to: 'docker', curve: 'M 608 110 C 630 110, 630 240, 652 240' },
  { id: 'e11', from: 'mcp', to: 'postgres', curve: 'M 608 240 C 630 240, 630 110, 652 110' },
  { id: 'e12', from: 'mcp', to: 'docker', curve: 'M 608 240 L 652 240' },

  // Stage 4 intra-stage vertical
  { id: 'e-pg-doc', from: 'postgres', to: 'docker', curve: 'M 734 134 L 734 216' },
];

const SECTION_HIGHLIGHTS: Record<string, string[]> = {
  hero: ['ingest', 'rag', 'langgraph', 'claude'],
  projects: ['langgraph', 'claude', 'fastapi', 'postgres'],
  skills: ['ingest', 'rag', 'fastapi', 'mcp', 'docker'],
  experience: ['fastapi', 'postgres', 'docker', 'mcp'],
  contact: ['mcp', 'docker', 'claude'],
};

export default function HeroGraphic() {
  const { activeSection } = useScrollSync();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const activeNodes = SECTION_HIGHLIGHTS[activeSection] || SECTION_HIGHLIGHTS.hero;

  const nodeMap = useMemo(() => {
    const m = new Map<string, PipelineNode>();
    NODES.forEach((n) => m.set(n.id, n));
    return m;
  }, []);

  // Ambient organic float offsets for each node
  const floatOffsets = [
    { y: [-2.5, 2.5, -2.5], duration: 4.4 },
    { y: [2.5, -2.5, 2.5], duration: 5.0 },
    { y: [-3, 2, -3], duration: 5.2 },
    { y: [2, -3, 2], duration: 4.6 },
    { y: [-2.5, 2.5, -2.5], duration: 4.8 },
    { y: [2.5, -2, 2.5], duration: 5.4 },
    { y: [-2, 2.5, -2], duration: 4.7 },
    { y: [2.5, -2, 2.5], duration: 5.1 },
  ];

  const activeNodeData = hoveredNode ? nodeMap.get(hoveredNode) : null;

  return (
    <div
      aria-hidden="true"
      className="w-full flex flex-col items-center justify-center relative select-none"
    >
      {/* Subtle ambient light glow behind the floating pipeline */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/10 via-[#38bdf8]/6 to-[#10b981]/10 rounded-full blur-3xl opacity-60 pointer-events-none" />

      {/* Floating Canvas */}
      <div className="w-full max-w-[840px] aspect-[840/320] relative">
        <svg
          viewBox="0 0 840 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Luminous node glow filter */}
            <filter id="pipeline-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Edge pulse gradient for active flows */}
            <linearGradient id="edgeFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
            </linearGradient>

            {/* Card backgrounds with subtle depth */}
            <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#181820" />
              <stop offset="100%" stopColor="#0f0f14" />
            </linearGradient>
            <linearGradient id="cardActiveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#241e30" />
              <stop offset="100%" stopColor="#14111c" />
            </linearGradient>
          </defs>

          {/* Stage Column Headers at the top of the canvas */}
          {STAGE_HEADERS.map((stg) => {
            const isStageHovered = hoveredStage === stg.id;
            return (
              <g
                key={stg.id}
                onMouseEnter={() => setHoveredStage(stg.id)}
                onMouseLeave={() => setHoveredStage(null)}
                className="cursor-pointer"
              >
                <text
                  x={stg.x}
                  y={24}
                  fill={isStageHovered ? '#c084fc' : '#737385'}
                  fontSize="9.5"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  textAnchor="middle"
                  className="transition-colors duration-150"
                >
                  {stg.num} // {stg.name}
                </text>
                <line
                  x1={stg.x - 48}
                  y1={34}
                  x2={stg.x + 48}
                  y2={34}
                  stroke={isStageHovered ? '#a855f7' : '#272732'}
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </g>
            );
          })}

          {/* Connected Curved Pipeline Circuits */}
          {EDGES.map((edge, idx) => {
            const isConnectedToHover =
              hoveredNode === edge.from || hoveredNode === edge.to;
            const isBothActive =
              activeNodes.includes(edge.from) && activeNodes.includes(edge.to);
            const isHighlighted = isConnectedToHover || isBothActive;

            // When a node is hovered, dim down unrelated edges to create a laser-focus spotlight
            const isDimmed = hoveredNode !== null && !isConnectedToHover;

            return (
              <g key={edge.id}>
                {/* Background circuit track */}
                <path
                  d={edge.curve}
                  stroke={isDimmed ? '#14141a' : '#22222a'}
                  strokeWidth="2"
                  fill="none"
                />

                {/* Animated illuminated circuit line */}
                <path
                  d={edge.curve}
                  stroke={isHighlighted ? 'url(#edgeFlowGradient)' : '#333340'}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={isHighlighted ? '8 6' : 'none'}
                  fill="none"
                  opacity={isDimmed ? 0.12 : isHighlighted ? 0.95 : 0.4}
                  style={
                    isHighlighted
                      ? {
                          animation: 'circuit-pulse 2.2s linear infinite',
                        }
                      : undefined
                  }
                />

                {/* Flowing luminous data packet along active edges */}
                {isHighlighted && !isDimmed && (
                  <circle r="3.5" fill="#c084fc" filter="url(#pipeline-glow)">
                    <animateMotion
                      dur={`${2 + (idx % 4) * 0.35}s`}
                      repeatCount="indefinite"
                      path={edge.curve}
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Pipeline Node Cards */}
          {NODES.map((node, idx) => {
            const isHovered = hoveredNode === node.id;
            const isActive = activeNodes.includes(node.id);
            const isStageActive = hoveredStage === `stage-${node.stageNum.replace(/^0/, '')}`;
            const floatCfg = floatOffsets[idx % floatOffsets.length];

            const left = node.x - node.width / 2;
            const top = node.y - node.height / 2;

            return (
              <m.g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
                animate={{
                  y: floatCfg.y,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{
                  y: {
                    duration: floatCfg.duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  scale: {
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
              >
                {/* Outer beacon pulse wave when active */}
                {(isActive || isStageActive) && (
                  <m.rect
                    x={left - 4}
                    y={top - 4}
                    width={node.width + 8}
                    height={node.height + 8}
                    rx="14"
                    ry="14"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    animate={{
                      scale: [1, 1.04, 1],
                      opacity: [0.7, 0.15, 0.7],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}

                {/* Main Card Body — sleek rounded rectangle with rx=10 */}
                <rect
                  x={left}
                  y={top}
                  width={node.width}
                  height={node.height}
                  rx="10"
                  ry="10"
                  fill={isActive || isHovered || isStageActive ? 'url(#cardActiveGrad)' : 'url(#cardGrad)'}
                  stroke={isHovered ? '#c084fc' : isActive || isStageActive ? '#a855f7' : '#33333d'}
                  strokeWidth={isHovered ? 2.5 : isActive || isStageActive ? 2 : 1.5}
                  filter={isHovered || isActive ? 'url(#pipeline-glow)' : undefined}
                />

                {/* Status Beacon Dot */}
                <circle
                  cx={left + 16}
                  cy={node.y}
                  r="3.5"
                  fill={node.statusColor}
                />
                <circle
                  cx={left + 16}
                  cy={node.y}
                  r="6.5"
                  fill={node.statusColor}
                  opacity="0.35"
                  className="animate-pulse"
                />

                {/* Main Node Label — fits comfortably with generous margins */}
                <text
                  x={left + 28}
                  y={node.y - 4}
                  fill={isHovered ? '#ffffff' : isActive ? '#fafafa' : '#e0e0ea'}
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                  letterSpacing="-0.02em"
                  dominantBaseline="middle"
                >
                  {node.label}
                </text>

                {/* Subtitle / Classification */}
                <text
                  x={left + 28}
                  y={node.y + 10}
                  fill={isActive || isHovered ? '#c084fc' : '#888899'}
                  fontSize="9"
                  fontWeight="500"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.02em"
                  dominantBaseline="middle"
                >
                  {node.sublabel}
                </text>
              </m.g>
            );
          })}
        </svg>
      </div>

      {/* Floating Real-World Problem Telemetry HUD */}
      <div className="w-full max-w-[840px] mt-2 py-2 px-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-[var(--text-muted)] border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 overflow-hidden w-full sm:w-auto">
          <span className="text-[var(--accent-subtle)] shrink-0">// PROBLEM SOLVED:</span>
          {activeNodeData ? (
            <span className="text-[var(--text-primary)] font-medium truncate">
              <strong className="text-white font-semibold">{activeNodeData.label}</strong>: {activeNodeData.realWorldProblem}
            </span>
          ) : (
            <span className="text-[var(--text-secondary)] truncate">
              Hover any stage to inspect real-world enterprise problem &amp; tech solution
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          {activeNodeData ? (
            <span className="text-[#38bdf8] font-mono hidden md:inline">
              Stack: {activeNodeData.tech}
            </span>
          ) : (
            <span className="text-[#10b981] font-medium">● ENTERPRISE AI ACTIVE</span>
          )}
        </div>
      </div>
    </div>
  );
}
