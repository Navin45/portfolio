import { useEffect, useRef } from 'react';
import { m } from 'motion/react';
import { useScrollSync } from '@/hooks/use-scroll-sync';

interface NodeItem {
  id: string;
  label: string;
  cx: number;
  cy: number;
  r: number;
}

interface EdgeItem {
  from: string;
  to: string;
}

// 8 prominent nodes with labels >= 12px strictly from resume
const NODES: NodeItem[] = [
  { id: 'rag',        label: 'RAG Pipelines', cx: 100, cy: 90,  r: 32 },
  { id: 'langgraph',  label: 'LangGraph',     cx: 260, cy: 50,  r: 28 },
  { id: 'python',     label: 'Python',        cx: 100, cy: 230, r: 26 },
  { id: 'fastapi',    label: 'FastAPI',       cx: 260, cy: 190, r: 28 },
  { id: 'claude',     label: 'Claude API',    cx: 400, cy: 70,  r: 28 },
  { id: 'n8n',        label: 'n8n',           cx: 400, cy: 210, r: 26 },
  { id: 'postgres',   label: 'PostgreSQL',    cx: 540, cy: 130, r: 30 },
  { id: 'mcp',        label: 'MCP',           cx: 660, cy: 70,  r: 24 },
  { id: 'docker',     label: 'Docker',        cx: 660, cy: 200, r: 24 },
];

const EDGES: EdgeItem[] = [
  { from: 'rag', to: 'langgraph' },
  { from: 'rag', to: 'fastapi' },
  { from: 'python', to: 'fastapi' },
  { from: 'langgraph', to: 'claude' },
  { from: 'fastapi', to: 'postgres' },
  { from: 'fastapi', to: 'n8n' },
  { id: 'claude', to: 'postgres' },
  { from: 'n8n', to: 'postgres' },
  { from: 'postgres', to: 'mcp' },
  { from: 'postgres', to: 'docker' },
];

const SECTION_NODES: Record<string, string[]> = {
  hero: ['rag', 'langgraph', 'claude'],
  projects: ['fastapi', 'postgres', 'claude'],
  skills: ['python', 'rag', 'mcp', 'docker'],
  experience: ['fastapi', 'n8n', 'docker'],
  contact: ['mcp', 'postgres', 'docker'],
};

export default function HeroGraphic() {
  const { activeSection } = useScrollSync();
  const svgRef = useRef<SVGSVGElement>(null);

  const activeNodes = SECTION_NODES[activeSection] || SECTION_NODES.hero;
  const nodeMap = new Map<string, NodeItem>();
  NODES.forEach((n) => nodeMap.set(n.id, n));

  return (
    <div
      aria-hidden="true"
      className="w-full h-full flex items-center justify-center relative min-h-[320px] lg:min-h-[440px]"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 760 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[500px] select-none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Node glow filter */}
          <filter id="hero-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Active node radial gradient */}
          <radialGradient id="nodeActiveGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* Edges */}
        {EDGES.map((edge, idx) => {
          const fromNode = nodeMap.get(edge.from);
          const toNode = nodeMap.get(edge.to);
          if (!fromNode || !toNode) return null;

          const isActive = activeNodes.includes(edge.from) || activeNodes.includes(edge.to);

          return (
            <g key={`edge-${idx}`}>
              {/* Base line with initial draw-in motion */}
              <m.line
                x1={fromNode.cx}
                y1={fromNode.cy}
                x2={toNode.cx}
                y2={toNode.cy}
                stroke={isActive ? '#a855f7' : '#404040'}
                strokeWidth={isActive ? 2 : 1.5}
                strokeDasharray={isActive ? '6 6' : 'none'}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: isActive ? 0.85 : 0.45 }}
                transition={{ duration: 1.2, delay: idx * 0.08, ease: 'easeOut' }}
              />

              {/* Continuous data pulses along active edges */}
              {isActive && (
                <circle r="3" fill="#c084fc">
                  <animateMotion
                    dur={`${2.2 + (idx % 3) * 0.4}s`}
                    repeatCount="indefinite"
                    path={`M${fromNode.cx},${fromNode.cy} L${toNode.cx},${toNode.cy}`}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node, idx) => {
          const isActive = activeNodes.includes(node.id);

          return (
            <m.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Outer active pulse glow */}
              {isActive && (
                <m.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r + 10}
                  fill="url(#nodeActiveGradient)"
                  animate={{
                    r: [node.r + 6, node.r + 14, node.r + 6],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {/* Node background circle */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill={isActive ? '#1c1c1c' : '#141414'}
                stroke={isActive ? '#a855f7' : '#525252'}
                strokeWidth={isActive ? 2.5 : 1.5}
                filter={isActive ? 'url(#hero-glow)' : undefined}
              />

              {/* Node text label: >= 12px, >= 4.5:1 contrast */}
              <text
                x={node.cx}
                y={node.cy + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isActive ? '#fafafa' : '#d4d4d4'}
                fontSize="12"
                fontWeight={isActive ? '600' : '500'}
                fontFamily="var(--font-mono)"
                letterSpacing="-0.02em"
              >
                {node.label}
              </text>
            </m.g>
          );
        })}
      </svg>
    </div>
  );
}
