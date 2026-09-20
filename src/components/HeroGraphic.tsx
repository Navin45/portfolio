import { useState, useMemo } from 'react';
import { m } from 'motion/react';
import { useScrollSync } from '@/hooks/use-scroll-sync';

interface PipelineNode {
  id: string;
  label: string;
  stage: string;
  sublabel: string;
  x: number; // center x
  y: number; // center y
  width: number;
  height: number;
  telemetry: string;
  statusColor: string;
}

interface PipelineEdge {
  id: string;
  from: string;
  to: string;
  curve: string; // SVG path
}

// 4 Architectural Stages: Ingestion -> Reasoning -> Services -> Infrastructure
const STAGES = [
  { id: 'stage-1', name: '01 // INGESTION', x: 110 },
  { id: 'stage-2', name: '02 // REASONING', x: 310 },
  { id: 'stage-3', name: '03 // BACKEND',   x: 510 },
  { id: 'stage-4', name: '04 // RUNTIME',   x: 710 },
];

const NODES: PipelineNode[] = [
  // Stage 1: Ingestion & Retrieval
  {
    id: 'ingest',
    label: 'Data Ingestion',
    stage: 'STAGE 01',
    sublabel: 'Webhooks & APIs',
    x: 110,
    y: 95,
    width: 146,
    height: 52,
    telemetry: 'Multi-Tenant Ingestion • Real-Time Stream',
    statusColor: '#38bdf8', // blue
  },
  {
    id: 'rag',
    label: 'RAG Retrieval',
    stage: 'STAGE 01',
    sublabel: 'Vector Search',
    x: 110,
    y: 235,
    width: 146,
    height: 52,
    telemetry: 'Hybrid Reranking • Semantic Search',
    statusColor: '#10b981', // green
  },

  // Stage 2: Reasoning & Multi-Agent
  {
    id: 'langgraph',
    label: 'LangGraph Flow',
    stage: 'STAGE 02',
    sublabel: 'Agentic StateGraph',
    x: 310,
    y: 95,
    width: 146,
    height: 52,
    telemetry: 'Multi-Agent StateFlow • Cyclic Routing',
    statusColor: '#c084fc', // purple
  },
  {
    id: 'claude',
    label: 'Claude API',
    stage: 'STAGE 02',
    sublabel: 'Structured Output',
    x: 310,
    y: 235,
    width: 146,
    height: 52,
    telemetry: 'Tool Use • Function Calling • JSON Schema',
    statusColor: '#c084fc',
  },

  // Stage 3: Services & Data Persistence
  {
    id: 'fastapi',
    label: 'FastAPI Backend',
    stage: 'STAGE 03',
    sublabel: 'Clean Architecture',
    x: 510,
    y: 95,
    width: 146,
    height: 52,
    telemetry: 'Domain Entity Layer • Dependency Injection',
    statusColor: '#10b981',
  },
  {
    id: 'postgres',
    label: 'PostgreSQL DB',
    stage: 'STAGE 03',
    sublabel: 'SQLAlchemy & Vector',
    x: 510,
    y: 235,
    width: 146,
    height: 52,
    telemetry: 'PgBouncer Pool • Row-Level Security',
    statusColor: '#38bdf8',
  },

  // Stage 4: Protocol & Infrastructure
  {
    id: 'mcp',
    label: 'MCP Protocol',
    stage: 'STAGE 04',
    sublabel: 'Context Server',
    x: 710,
    y: 95,
    width: 146,
    height: 52,
    telemetry: 'Model Context Protocol Server • Tool Bus',
    statusColor: '#f59e0b', // amber
  },
  {
    id: 'docker',
    label: 'Docker & CI/CD',
    stage: 'STAGE 04',
    sublabel: 'Cloud Deployment',
    x: 710,
    y: 235,
    width: 146,
    height: 52,
    telemetry: 'GitHub Actions • Containerized Runtime',
    statusColor: '#10b981',
  },
];

// Meaningful architectural connections flowing left-to-right
const EDGES: PipelineEdge[] = [
  // Stage 1 Ingestion flows
  { id: 'e1', from: 'ingest', to: 'rag', curve: 'M 110 121 L 110 209' },
  { id: 'e2', from: 'ingest', to: 'langgraph', curve: 'M 183 95 C 215 95, 205 95, 237 95' },
  { id: 'e3', from: 'rag', to: 'langgraph', curve: 'M 183 235 C 215 235, 205 95, 237 95' },

  // Stage 2 Reasoning flows
  { id: 'e4', from: 'langgraph', to: 'claude', curve: 'M 310 121 L 310 209' },
  { id: 'e5', from: 'langgraph', to: 'fastapi', curve: 'M 383 95 C 415 95, 405 95, 437 95' },
  { id: 'e6', from: 'claude', to: 'fastapi', curve: 'M 383 235 C 415 235, 405 95, 437 95' },

  // Stage 3 Services & Data flows
  { id: 'e7', from: 'fastapi', to: 'postgres', curve: 'M 510 121 L 510 209' },
  { id: 'e8', from: 'fastapi', to: 'mcp', curve: 'M 583 95 C 615 95, 605 95, 637 95' },
  { id: 'e9', from: 'postgres', to: 'docker', curve: 'M 583 235 C 615 235, 605 235, 637 235' },

  // Stage 4 Protocol to Infrastructure flow
  { id: 'e10', from: 'mcp', to: 'docker', curve: 'M 710 121 L 710 209' },
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

  const activeNodes = SECTION_HIGHLIGHTS[activeSection] || SECTION_HIGHLIGHTS.hero;

  const nodeMap = useMemo(() => {
    const m = new Map<string, PipelineNode>();
    NODES.forEach((n) => m.set(n.id, n));
    return m;
  }, []);

  // Subtle ambient float offsets
  const floatOffsets = [
    { y: [-3, 3, -3], duration: 4.2 },
    { y: [3, -3, 3], duration: 4.8 },
    { y: [-4, 2, -4], duration: 5.1 },
    { y: [2, -4, 2], duration: 4.5 },
    { y: [-3, 3, -3], duration: 4.9 },
    { y: [3, -3, 3], duration: 5.3 },
    { y: [-2, 3, -2], duration: 4.6 },
    { y: [3, -2, 3], duration: 5.0 },
  ];

  return (
    <div
      aria-hidden="true"
      className="w-full h-full flex flex-col items-center justify-center relative select-none"
    >
      {/* Telemetry Header */}
      <div className="w-full max-w-[820px] flex items-center justify-between pb-3 px-2 text-[11px] font-mono border-b border-[var(--border-subtle)] text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-[var(--text-secondary)] font-semibold">
            AI PIPELINE ARCHITECTURE // DAG
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[10px]">
          <span>4 STAGES</span>
          <span>8 CONNECTED NODES</span>
          <span className="text-[var(--accent-subtle)]">HOVER STAGE TO INSPECT</span>
        </div>
      </div>

      {/* Main SVG Pipeline Canvas */}
      <div className="w-full max-w-[820px] aspect-[820/350] relative">
        <svg
          viewBox="0 0 820 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Luminous glow filter */}
            <filter id="pipeline-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Edge active gradient */}
            <linearGradient id="edgeFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
            </linearGradient>

            {/* Capsule fills */}
            <linearGradient id="capsuleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1c1c1c" />
              <stop offset="100%" stopColor="#121212" />
            </linearGradient>
            <linearGradient id="capsuleActiveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#242424" />
              <stop offset="100%" stopColor="#161616" />
            </linearGradient>
          </defs>

          {/* Stage Column Backdrop Guides */}
          {STAGES.map((stg) => (
            <g key={stg.id}>
              <line
                x1={stg.x}
                y1={30}
                x2={stg.x}
                y2={305}
                stroke="#1c1c1c"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <text
                x={stg.x}
                y={22}
                fill="#737373"
                fontSize="10"
                fontWeight="600"
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
                textAnchor="middle"
              >
                {stg.name}
              </text>
            </g>
          ))}

          {/* Connected Curved Pipeline Circuits */}
          {EDGES.map((edge, idx) => {
            const isConnectedToHover =
              hoveredNode === edge.from || hoveredNode === edge.to;
            const isBothActive =
              activeNodes.includes(edge.from) && activeNodes.includes(edge.to);
            const isHighlighted = isConnectedToHover || isBothActive;

            return (
              <g key={edge.id}>
                {/* Background circuit track */}
                <path
                  d={edge.curve}
                  stroke="#262626"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Animated illuminated circuit line */}
                <path
                  d={edge.curve}
                  stroke={isHighlighted ? 'url(#edgeFlowGradient)' : '#383838'}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={isHighlighted ? '8 6' : 'none'}
                  fill="none"
                  opacity={isHighlighted ? 0.95 : 0.45}
                  style={
                    isHighlighted
                      ? {
                          animation: 'marquee-scroll 10s linear infinite',
                        }
                      : undefined
                  }
                />

                {/* Traveling glowing data packet */}
                {isHighlighted && (
                  <circle r="3.5" fill="#c084fc" filter="url(#pipeline-glow)">
                    <animateMotion
                      dur={`${2.2 + (idx % 4) * 0.3}s`}
                      repeatCount="indefinite"
                      path={edge.curve}
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Pipeline Node Capsules */}
          {NODES.map((node, idx) => {
            const isHovered = hoveredNode === node.id;
            const isActive = activeNodes.includes(node.id);
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
                }}
                transition={{
                  y: {
                    duration: floatCfg.duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              >
                {/* Outer beacon pulse wave when active */}
                {isActive && (
                  <m.rect
                    x={left - 5}
                    y={top - 5}
                    width={node.width + 10}
                    height={node.height + 10}
                    rx="14"
                    ry="14"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    animate={{
                      scale: [1, 1.06, 1],
                      opacity: [0.6, 0.1, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}

                {/* Main Capsule Body with generous width */}
                <rect
                  x={left}
                  y={top}
                  width={node.width}
                  height={node.height}
                  rx="10"
                  ry="10"
                  fill={isActive || isHovered ? 'url(#capsuleActiveGrad)' : 'url(#capsuleGrad)'}
                  stroke={isHovered ? '#c084fc' : isActive ? '#a855f7' : '#383838'}
                  strokeWidth={isHovered ? 2.5 : isActive ? 2 : 1.5}
                  filter={isHovered || isActive ? 'url(#pipeline-glow)' : undefined}
                />

                {/* Status Beacon Dot */}
                <circle
                  cx={left + 18}
                  cy={node.y}
                  r="4"
                  fill={node.statusColor}
                />
                <circle
                  cx={left + 18}
                  cy={node.y}
                  r="7"
                  fill={node.statusColor}
                  opacity="0.3"
                  className="animate-pulse"
                />

                {/* Main Node Label — fully contained inside capsule with generous margins */}
                <text
                  x={left + 32}
                  y={node.y - 5}
                  fill={isHovered ? '#ffffff' : isActive ? '#fafafa' : '#e5e5e5'}
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
                  x={left + 32}
                  y={node.y + 11}
                  fill={isActive || isHovered ? '#c084fc' : '#737373'}
                  fontSize="9.5"
                  fontWeight="500"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.04em"
                  dominantBaseline="middle"
                >
                  {node.sublabel}
                </text>
              </m.g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Telemetry HUD Bar */}
      <div className="w-full max-w-[820px] mt-2 py-2 px-3 bg-[#121212] border border-[var(--border-subtle)] rounded flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent-subtle)]">TELEMETRY:</span>
          {hoveredNode ? (
            <span className="text-[var(--text-primary)] font-semibold">
              {nodeMap.get(hoveredNode)?.label} [{nodeMap.get(hoveredNode)?.stage}] — {nodeMap.get(hoveredNode)?.telemetry}
            </span>
          ) : (
            <span className="text-[var(--text-muted)]">
              Hover any stage to inspect end-to-end data flow &amp; telemetry
            </span>
          )}
        </div>
        <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline">
          END-TO-END FLOW: OK
        </span>
      </div>
    </div>
  );
}
