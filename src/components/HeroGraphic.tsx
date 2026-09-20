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
  x: number;
  id: string;
}

// 4 distinct architecture stages covering Navin's entire AI Engineering expertise
const STAGE_HEADERS: StageHeader[] = [
  { num: '01', name: 'INGEST & RAG', x: 115, id: 'stage-1' },
  { num: '02', name: 'AGENT FLOWS', x: 305, id: 'stage-2' },
  { num: '03', name: 'API & PROTOCOL', x: 495, id: 'stage-3' },
  { num: '04', name: 'STORAGE & CLOUD', x: 685, id: 'stage-4' },
];

// 8 comprehensive pipeline nodes strictly matching resume skills and architecture
const NODES: PipelineNode[] = [
  // Stage 1: Ingestion & RAG
  {
    id: 'ingest',
    label: 'Data Ingest',
    sublabel: 'Webhooks & Pandas',
    stageNum: '01',
    stageName: 'INGEST & RAG',
    x: 115,
    y: 105,
    width: 152,
    height: 46,
    telemetry: 'Multi-Source Document & API Stream Ingestion',
    tech: 'pdfplumber • openpyxl • Pandas • Webhooks',
    statusColor: '#38bdf8', // cyan
  },
  {
    id: 'rag',
    label: 'RAG Retrieval',
    sublabel: 'Hybrid Vector Search',
    stageNum: '01',
    stageName: 'INGEST & RAG',
    x: 115,
    y: 235,
    width: 152,
    height: 46,
    telemetry: 'Semantic Chunking & Re-ranking Pipeline',
    tech: 'RAG Pipelines • Vector Search • Embeddings',
    statusColor: '#10b981', // emerald
  },

  // Stage 2: Agentic Orchestration
  {
    id: 'langgraph',
    label: 'LangGraph Flow',
    sublabel: 'Cyclic StateGraph',
    stageNum: '02',
    stageName: 'AGENT FLOWS',
    x: 305,
    y: 105,
    width: 152,
    height: 46,
    telemetry: 'Multi-Agent Dynamic Routing & Checkpointing',
    tech: 'LangGraph • LangChain • Hermes Agent',
    statusColor: '#c084fc', // purple
  },
  {
    id: 'claude',
    label: 'Claude & Gemini',
    sublabel: 'Tool Calling & LLMs',
    stageNum: '02',
    stageName: 'AGENT FLOWS',
    x: 305,
    y: 235,
    width: 152,
    height: 46,
    telemetry: 'Structured JSON Schemas & Function Execution',
    tech: 'Claude API • Gemini API • PyTorch • LoRA',
    statusColor: '#c084fc',
  },

  // Stage 3: Backend & Protocols
  {
    id: 'fastapi',
    label: 'FastAPI Service',
    sublabel: 'Clean Architecture',
    stageNum: '03',
    stageName: 'API & PROTOCOL',
    x: 495,
    y: 105,
    width: 152,
    height: 46,
    telemetry: 'Async High-Throughput Domain Services',
    tech: 'FastAPI • Python • TypeScript • REST',
    statusColor: '#10b981',
  },
  {
    id: 'mcp',
    label: 'MCP Protocol',
    sublabel: 'Context Server Bus',
    stageNum: '03',
    stageName: 'API & PROTOCOL',
    x: 495,
    y: 235,
    width: 152,
    height: 46,
    telemetry: 'Model Context Protocol Client & Server Tools',
    tech: 'MCP • Tool Calling • n8n Workflows',
    statusColor: '#f59e0b', // amber
  },

  // Stage 4: Storage & Cloud Infrastructure
  {
    id: 'postgres',
    label: 'PostgreSQL DB',
    sublabel: 'SQLAlchemy & Cache',
    stageNum: '04',
    stageName: 'STORAGE & CLOUD',
    x: 685,
    y: 105,
    width: 152,
    height: 46,
    telemetry: 'Relational ACID Store & Vector Indexing',
    tech: 'PostgreSQL • SQLAlchemy • Redis • Supabase',
    statusColor: '#38bdf8',
  },
  {
    id: 'docker',
    label: 'Docker & CI/CD',
    sublabel: 'Cloud Deployment',
    stageNum: '04',
    stageName: 'STORAGE & CLOUD',
    x: 685,
    y: 235,
    width: 152,
    height: 46,
    telemetry: 'Automated Build, Test & Deployment Clusters',
    tech: 'Docker • GitHub Actions • AWS • GCP',
    statusColor: '#10b981',
  },
];

// Complete DAG circuit connectivity: intra-stage and inter-stage
// Node width = 152 (half-width = 76). Row 1 y = 105 (half-height = 23), Row 2 y = 235.
const EDGES: PipelineEdge[] = [
  // Stage 1 intra-stage
  { id: 'e-in-rag', from: 'ingest', to: 'rag', curve: 'M 115 128 L 115 212' },

  // Stage 1 -> Stage 2 connections
  { id: 'e1', from: 'ingest', to: 'langgraph', curve: 'M 191 105 L 229 105' },
  { id: 'e2', from: 'ingest', to: 'claude', curve: 'M 191 105 C 210 105, 210 235, 229 235' },
  { id: 'e3', from: 'rag', to: 'langgraph', curve: 'M 191 235 C 210 235, 210 105, 229 105' },
  { id: 'e4', from: 'rag', to: 'claude', curve: 'M 191 235 L 229 235' },

  // Stage 2 intra-stage
  { id: 'e-lg-cl', from: 'langgraph', to: 'claude', curve: 'M 305 128 L 305 212' },

  // Stage 2 -> Stage 3 connections
  { id: 'e5', from: 'langgraph', to: 'fastapi', curve: 'M 381 105 L 419 105' },
  { id: 'e6', from: 'langgraph', to: 'mcp', curve: 'M 381 105 C 400 105, 400 235, 419 235' },
  { id: 'e7', from: 'claude', to: 'fastapi', curve: 'M 381 235 C 400 235, 400 105, 419 105' },
  { id: 'e8', from: 'claude', to: 'mcp', curve: 'M 381 235 L 419 235' },

  // Stage 3 intra-stage
  { id: 'e-fa-mcp', from: 'fastapi', to: 'mcp', curve: 'M 495 128 L 495 212' },

  // Stage 3 -> Stage 4 connections
  { id: 'e9', from: 'fastapi', to: 'postgres', curve: 'M 571 105 L 609 105' },
  { id: 'e10', from: 'fastapi', to: 'docker', curve: 'M 571 105 C 590 105, 590 235, 609 235' },
  { id: 'e11', from: 'mcp', to: 'postgres', curve: 'M 571 235 C 590 235, 590 105, 609 105' },
  { id: 'e12', from: 'mcp', to: 'docker', curve: 'M 571 235 L 609 235' },

  // Stage 4 intra-stage
  { id: 'e-pg-doc', from: 'postgres', to: 'docker', curve: 'M 685 128 L 685 212' },
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
    { y: [-3, 3, -3], duration: 4.4 },
    { y: [3, -3, 3], duration: 5.0 },
    { y: [-3.5, 2.5, -3.5], duration: 5.2 },
    { y: [2.5, -3.5, 2.5], duration: 4.6 },
    { y: [-3, 3, -3], duration: 4.8 },
    { y: [3, -2.5, 3], duration: 5.4 },
    { y: [-2.5, 3, -2.5], duration: 4.7 },
    { y: [3, -2.5, 3], duration: 5.1 },
  ];

  const activeNodeData = hoveredNode ? nodeMap.get(hoveredNode) : null;

  return (
    <div
      aria-hidden="true"
      className="w-full flex flex-col items-center justify-center relative select-none"
    >
      {/* Subtle ambient light glow behind the floating pipeline */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/12 via-[#38bdf8]/8 to-[#10b981]/12 rounded-full blur-3xl opacity-60 pointer-events-none" />

      {/* Floating Canvas */}
      <div className="w-full max-w-[800px] aspect-[800/310] relative">
        <svg
          viewBox="0 0 800 310"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Luminous node glow filter */}
            <filter id="pipeline-glow" x="-40%" y="-40%" width="180%" height="180%">
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

            {/* High-contrast pill backgrounds */}
            <linearGradient id="pillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#18181f" />
              <stop offset="100%" stopColor="#0e0e13" />
            </linearGradient>
            <linearGradient id="pillActiveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#251e33" />
              <stop offset="100%" stopColor="#14111d" />
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
                  stroke={isDimmed ? '#16161c' : '#22222a'}
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
                          animation: 'marquee-scroll 7s linear infinite',
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

          {/* Pipeline Node Pills */}
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
                    x={left - 5}
                    y={top - 5}
                    width={node.width + 10}
                    height={node.height + 10}
                    rx="26"
                    ry="26"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 0.15, 0.7],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}

                {/* Main Pill Body — sleek rounded capsule */}
                <rect
                  x={left}
                  y={top}
                  width={node.width}
                  height={node.height}
                  rx="23"
                  ry="23"
                  fill={isActive || isHovered || isStageActive ? 'url(#pillActiveGrad)' : 'url(#pillGrad)'}
                  stroke={isHovered ? '#c084fc' : isActive || isStageActive ? '#a855f7' : '#33333d'}
                  strokeWidth={isHovered ? 2.5 : isActive || isStageActive ? 2 : 1.5}
                  filter={isHovered || isActive ? 'url(#pipeline-glow)' : undefined}
                />

                {/* Status Beacon Dot */}
                <circle
                  cx={left + 20}
                  cy={node.y}
                  r="4.5"
                  fill={node.statusColor}
                />
                <circle
                  cx={left + 20}
                  cy={node.y}
                  r="7.5"
                  fill={node.statusColor}
                  opacity="0.35"
                  className="animate-pulse"
                />

                {/* Main Node Label — generous width with zero clipping */}
                <text
                  x={left + 36}
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
                  x={left + 36}
                  y={node.y + 10}
                  fill={isActive || isHovered ? '#c084fc' : '#888899'}
                  fontSize="9.5"
                  fontWeight="500"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.03em"
                  dominantBaseline="middle"
                >
                  {node.sublabel}
                </text>
              </m.g>
            );
          })}
        </svg>
      </div>

      {/* Floating Minimal Telemetry HUD Indicator */}
      <div className="w-full max-w-[800px] mt-2 py-2 px-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-[var(--text-muted)] border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-[var(--accent-subtle)] shrink-0">// PIPELINE:</span>
          {activeNodeData ? (
            <span className="text-[var(--text-primary)] font-semibold truncate">
              {activeNodeData.label} [{activeNodeData.stageName}] — {activeNodeData.telemetry}
            </span>
          ) : (
            <span className="truncate">
              01. Ingestion &amp; RAG → 02. Agent Orchestration → 03. FastAPI &amp; MCP → 04. Cloud &amp; DB
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          {activeNodeData ? (
            <span className="text-[#38bdf8] font-mono hidden md:inline">
              Tech: {activeNodeData.tech}
            </span>
          ) : (
            <span className="text-[#10b981] font-medium">● ACTIVE</span>
          )}
        </div>
      </div>
    </div>
  );
}
