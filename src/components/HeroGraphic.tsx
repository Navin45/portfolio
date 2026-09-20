import { useState, useMemo } from 'react';
import { m } from 'motion/react';
import { useScrollSync } from '@/hooks/use-scroll-sync';
import { Activity, Cpu, Sparkles, Database, Layers, Network, ShieldCheck, Terminal } from 'lucide-react';

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
  metrics: string;
  statusColor: string;
  iconName: string;
}

interface PipelineEdge {
  id: string;
  from: string;
  to: string;
  curve: string; // SVG path
}

// 4 Architectural Stages
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
    width: 148,
    height: 54,
    telemetry: 'Multi-Tenant Ingestion • Real-Time Stream',
    metrics: '5.2k req/s • 0.01% err',
    statusColor: '#38bdf8', // cyan
    iconName: 'Network',
  },
  {
    id: 'rag',
    label: 'RAG Retrieval',
    stage: 'STAGE 01',
    sublabel: 'Vector Search',
    x: 110,
    y: 235,
    width: 148,
    height: 54,
    telemetry: 'Hybrid Reranking • Semantic Search',
    metrics: '1536 dim • 18ms latency',
    statusColor: '#10b981', // emerald
    iconName: 'Layers',
  },

  // Stage 2: Reasoning & Multi-Agent
  {
    id: 'langgraph',
    label: 'LangGraph Flow',
    stage: 'STAGE 02',
    sublabel: 'Agentic StateGraph',
    x: 310,
    y: 95,
    width: 148,
    height: 54,
    telemetry: 'Multi-Agent StateFlow • Cyclic Routing',
    metrics: '4 Agents • 100% Deterministic',
    statusColor: '#c084fc', // purple
    iconName: 'Cpu',
  },
  {
    id: 'claude',
    label: 'Claude API',
    stage: 'STAGE 02',
    sublabel: 'Structured Output',
    x: 310,
    y: 235,
    width: 148,
    height: 54,
    telemetry: 'Tool Calling • JSON Schema Validation',
    metrics: '94 tokens/s • 99.8% precision',
    statusColor: '#c084fc',
    iconName: 'Sparkles',
  },

  // Stage 3: Services & Data Persistence
  {
    id: 'fastapi',
    label: 'FastAPI Backend',
    stage: 'STAGE 03',
    sublabel: 'Clean Architecture',
    x: 510,
    y: 95,
    width: 148,
    height: 54,
    telemetry: 'Domain Entity Layer • Dependency Injection',
    metrics: 'AsyncIO • < 12ms P95',
    statusColor: '#10b981',
    iconName: 'Activity',
  },
  {
    id: 'postgres',
    label: 'PostgreSQL DB',
    stage: 'STAGE 03',
    sublabel: 'SQLAlchemy & Vector',
    x: 510,
    y: 235,
    width: 148,
    height: 54,
    telemetry: 'PgBouncer Pool • Row-Level Security',
    metrics: 'ACID • pgvector indexing',
    statusColor: '#38bdf8',
    iconName: 'Database',
  },

  // Stage 4: Protocol & Infrastructure
  {
    id: 'mcp',
    label: 'MCP Protocol',
    stage: 'STAGE 04',
    sublabel: 'Context Server',
    x: 710,
    y: 95,
    width: 148,
    height: 54,
    telemetry: 'Model Context Protocol Server • Tool Bus',
    metrics: 'Standard Spec • JSON-RPC',
    statusColor: '#f59e0b', // amber
    iconName: 'Terminal',
  },
  {
    id: 'docker',
    label: 'Docker & CI/CD',
    stage: 'STAGE 04',
    sublabel: 'Cloud Deployment',
    x: 710,
    y: 235,
    width: 148,
    height: 54,
    telemetry: 'GitHub Actions • Containerized Runtime',
    metrics: 'Multi-Arch • Auto-healing',
    statusColor: '#10b981',
    iconName: 'ShieldCheck',
  },
];

// Meaningful architectural connections
const EDGES: PipelineEdge[] = [
  { id: 'e1', from: 'ingest', to: 'rag', curve: 'M 110 122 L 110 208' },
  { id: 'e2', from: 'ingest', to: 'langgraph', curve: 'M 184 95 C 215 95, 205 95, 236 95' },
  { id: 'e3', from: 'rag', to: 'langgraph', curve: 'M 184 235 C 215 235, 205 95, 236 95' },
  { id: 'e4', from: 'langgraph', to: 'claude', curve: 'M 310 122 L 310 208' },
  { id: 'e5', from: 'langgraph', to: 'fastapi', curve: 'M 384 95 C 415 95, 405 95, 436 95' },
  { id: 'e6', from: 'claude', to: 'fastapi', curve: 'M 384 235 C 415 235, 405 95, 436 95' },
  { id: 'e7', from: 'fastapi', to: 'postgres', curve: 'M 510 122 L 510 208' },
  { id: 'e8', from: 'fastapi', to: 'mcp', curve: 'M 584 95 C 615 95, 605 95, 636 95' },
  { id: 'e9', from: 'postgres', to: 'docker', curve: 'M 584 235 C 615 235, 605 235, 636 235' },
  { id: 'e10', from: 'mcp', to: 'docker', curve: 'M 710 122 L 710 208' },
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

  // Ambient organic float offsets
  const floatOffsets = [
    { y: [-3.5, 3.5, -3.5], duration: 4.2 },
    { y: [3, -3.5, 3], duration: 4.8 },
    { y: [-4, 2.5, -4], duration: 5.1 },
    { y: [2.5, -4, 2.5], duration: 4.5 },
    { y: [-3, 3, -3], duration: 4.9 },
    { y: [3.5, -2.5, 3.5], duration: 5.3 },
    { y: [-2.5, 3, -2.5], duration: 4.6 },
    { y: [3, -2.5, 3], duration: 5.0 },
  ];

  const activeNodeData = hoveredNode ? nodeMap.get(hoveredNode) : null;

  return (
    <div
      aria-hidden="true"
      className="w-full flex flex-col items-center justify-center relative select-none"
    >
      {/* Ambient background glow behind the panel */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#a855f7]/15 via-[#38bdf8]/10 to-[#10b981]/15 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* Glassmorphic Cybernetic Terminal Panel */}
      <div className="w-full max-w-[840px] rounded-2xl p-[1px] bg-gradient-to-b from-white/20 via-[#a855f7]/30 to-white/5 shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)] relative z-10 backdrop-blur-xl">
        <div className="w-full bg-[#0d0d12]/95 rounded-2xl overflow-hidden border border-white/5">
          {/* Cybernetic Window Header */}
          <div className="w-full px-4 py-3 bg-[#13131a]/90 border-b border-white/5 flex items-center justify-between text-[11px] font-mono">
            {/* Terminal Window Controls & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 inline-block shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 inline-block shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80 inline-block shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                <span className="text-[#c084fc] font-semibold">// LIVE PIPELINE DAG</span>
                <span className="text-[var(--text-muted)] text-[10px] hidden sm:inline">v2.6_ACTIVE</span>
              </div>
            </div>

            {/* Real-time system telemetry metrics */}
            <div className="flex items-center gap-4 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-[#a3a3a3]">LATENCY:</span>
                <span className="text-white font-semibold">12ms</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="text-[#a3a3a3]">THROUGHPUT:</span>
                <span className="text-[#38bdf8] font-semibold">5.2k req/s</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5">
                <span className="text-[#a3a3a3]">STATUS:</span>
                <span className="text-[#10b981] font-semibold">OPTIMAL</span>
              </div>
            </div>
          </div>

          {/* Main SVG Pipeline Canvas */}
          <div className="w-full aspect-[820/340] relative p-2 sm:p-4">
            <svg
              viewBox="0 0 820 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Cyber Grid Pattern */}
                <pattern id="cyber-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                </pattern>

                {/* Ambient node glow */}
                <filter id="node-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Laser scan beam gradient */}
                <linearGradient id="scannerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                  <stop offset="50%" stopColor="#c084fc" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>

                {/* Edge active gradient */}
                <linearGradient id="edgeFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
                </linearGradient>

                {/* Capsule fills with subtle specular gradient */}
                <linearGradient id="capsuleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22222e" />
                  <stop offset="100%" stopColor="#121218" />
                </linearGradient>
                <linearGradient id="capsuleActiveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2e253e" />
                  <stop offset="100%" stopColor="#191524" />
                </linearGradient>
              </defs>

              {/* Background Grid Pattern */}
              <rect x="0" y="0" width="820" height="330" fill="url(#cyber-grid)" />

              {/* Animated Luminous Vertical Scanner Line */}
              <m.line
                x1="0"
                y1="30"
                x2="0"
                y2="310"
                stroke="url(#scannerGradient)"
                strokeWidth="2"
                strokeDasharray="4 2"
                animate={{
                  x: [0, 820, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Stage Column Backdrop Guides */}
              {STAGES.map((stg) => (
                <g key={stg.id}>
                  <line
                    x1={stg.x}
                    y1={30}
                    x2={stg.x}
                    y2={305}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />
                  <text
                    x={stg.x}
                    y={22}
                    fill="#888899"
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
                      stroke="#22222e"
                      strokeWidth="2"
                      fill="none"
                    />

                    {/* Illuminated circuit line */}
                    <path
                      d={edge.curve}
                      stroke={isHighlighted ? 'url(#edgeFlowGradient)' : '#333344'}
                      strokeWidth={isHighlighted ? 2.5 : 1.5}
                      strokeDasharray={isHighlighted ? '8 6' : 'none'}
                      fill="none"
                      opacity={isHighlighted ? 0.95 : 0.45}
                      style={
                        isHighlighted
                          ? {
                              animation: 'marquee-scroll 8s linear infinite',
                            }
                          : undefined
                      }
                    />

                    {/* Luminous flowing data particle packet with trailing glow */}
                    {isHighlighted && (
                      <circle r="4" fill="#c084fc" filter="url(#node-glow)">
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
                    {/* Outer pulse beacon ring */}
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
                          opacity: [0.7, 0.15, 0.7],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}

                    {/* Main Capsule Body */}
                    <rect
                      x={left}
                      y={top}
                      width={node.width}
                      height={node.height}
                      rx="12"
                      ry="12"
                      fill={isActive || isHovered ? 'url(#capsuleActiveGrad)' : 'url(#capsuleGrad)'}
                      stroke={isHovered ? '#c084fc' : isActive ? '#a855f7' : '#3a3a4c'}
                      strokeWidth={isHovered ? 2.5 : isActive ? 2 : 1.5}
                      filter={isHovered || isActive ? 'url(#node-glow)' : undefined}
                    />

                    {/* Status Beacon Dot */}
                    <circle
                      cx={left + 18}
                      cy={node.y}
                      r="4.5"
                      fill={node.statusColor}
                    />
                    <circle
                      cx={left + 18}
                      cy={node.y}
                      r="8"
                      fill={node.statusColor}
                      opacity="0.35"
                      className="animate-pulse"
                    />

                    {/* Main Node Label */}
                    <text
                      x={left + 32}
                      y={node.y - 5}
                      fill={isHovered ? '#ffffff' : isActive ? '#fafafa' : '#e2e2ec'}
                      fontSize="12.5"
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
                      fill={isActive || isHovered ? '#c084fc' : '#888899'}
                      fontSize="9.5"
                      fontWeight="500"
                      fontFamily="var(--font-mono)"
                      letterSpacing="0.05em"
                      dominantBaseline="middle"
                    >
                      {node.sublabel}
                    </text>
                  </m.g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Live Telemetry HUD Bar */}
          <div className="w-full px-4 py-2.5 bg-[#101016] border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[#c084fc] font-semibold">STAGE_TELEMETRY:</span>
              {activeNodeData ? (
                <span className="text-white font-medium">
                  {activeNodeData.label} [{activeNodeData.stage}] — {activeNodeData.telemetry}
                </span>
              ) : (
                <span className="text-[#888899]">
                  Hover any stage to inspect live architecture &amp; real-time telemetry
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0 text-[11px]">
              {activeNodeData ? (
                <span className="text-[#10b981] font-semibold">{activeNodeData.metrics}</span>
              ) : (
                <span className="text-[#888899]">PIPELINE HEALTH: 100%</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
