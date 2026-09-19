import { useEffect, useRef, useMemo } from 'react';
import { useScrollSync } from '@/hooks/use-scroll-sync';

/**
 * Animated node-graph/pipeline SVG illustration for the hero.
 * Represents AI, agentic workflows, RAG, and data pipelines.
 * Decorative: aria-hidden, content not conveyed through motion.
 * Space reserved via aspect-ratio to prevent CLS.
 * Reduced motion: static, well-composed version (still visible).
 */

interface Node {
  id: string;
  label: string;
  cx: number;
  cy: number;
  r: number;
}

interface Edge {
  from: string;
  to: string;
}

// Full nodes for desktop, reduced set for mobile
const NODES_FULL: Node[] = [
  { id: 'data',      label: 'Data',       cx: 80,  cy: 100, r: 22 },
  { id: 'ingest',    label: 'Ingest',     cx: 200, cy: 60,  r: 18 },
  { id: 'retrieval', label: 'RAG',        cx: 200, cy: 160, r: 20 },
  { id: 'agent',     label: 'Agent',      cx: 340, cy: 110, r: 26 },
  { id: 'llm',       label: 'LLM',        cx: 460, cy: 60,  r: 20 },
  { id: 'workflow',  label: 'Workflow',   cx: 460, cy: 160, r: 20 },
  { id: 'api',       label: 'API',        cx: 580, cy: 110, r: 22 },
  { id: 'output',    label: 'Deploy',     cx: 680, cy: 110, r: 18 },
];

const NODES_MOBILE: Node[] = [
  { id: 'data',      label: 'Data',     cx: 50,  cy: 70,  r: 18 },
  { id: 'retrieval', label: 'RAG',      cx: 140, cy: 50,  r: 16 },
  { id: 'agent',     label: 'Agent',    cx: 230, cy: 70,  r: 22 },
  { id: 'workflow',  label: 'Flow',     cx: 140, cy: 110, r: 16 },
  { id: 'api',       label: 'API',      cx: 310, cy: 70,  r: 18 },
];

const EDGES_FULL: Edge[] = [
  { from: 'data', to: 'ingest' },
  { from: 'data', to: 'retrieval' },
  { from: 'ingest', to: 'agent' },
  { from: 'retrieval', to: 'agent' },
  { from: 'agent', to: 'llm' },
  { from: 'agent', to: 'workflow' },
  { from: 'llm', to: 'api' },
  { from: 'workflow', to: 'api' },
  { from: 'api', to: 'output' },
];

const EDGES_MOBILE: Edge[] = [
  { from: 'data', to: 'retrieval' },
  { from: 'retrieval', to: 'agent' },
  { from: 'data', to: 'workflow' },
  { from: 'workflow', to: 'agent' },
  { from: 'agent', to: 'api' },
];

// Map sections to which nodes light up
const SECTION_NODES: Record<string, string[]> = {
  hero: ['agent', 'llm'],
  projects: ['data', 'ingest', 'retrieval', 'workflow'],
  skills: ['llm', 'api', 'agent'],
  experience: ['workflow', 'api', 'output'],
  contact: ['output', 'api'],
};

export default function HeroGraphic() {
  const { activeSection } = useScrollSync();
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => { reducedMotion.current = e.matches; };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Pause animations when tab is hidden
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const onVisChange = () => {
      const paused = document.hidden;
      svg.style.animationPlayState = paused ? 'paused' : 'running';
      svg.querySelectorAll('[style*="animation"]').forEach((el) => {
        (el as HTMLElement).style.animationPlayState = paused ? 'paused' : 'running';
      });
    };

    document.addEventListener('visibilitychange', onVisChange);
    return () => document.removeEventListener('visibilitychange', onVisChange);
  }, []);

  const activeNodes = SECTION_NODES[activeSection] || SECTION_NODES.hero;

  // Detect mobile (using CSS media query result for SSR safety)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 420;
  const nodes = isMobile ? NODES_MOBILE : NODES_FULL;
  const edges = isMobile ? EDGES_MOBILE : EDGES_FULL;
  const viewBox = isMobile ? '0 0 360 150' : '0 0 760 220';

  const nodeMap = useMemo(() => {
    const m = new Map<string, Node>();
    nodes.forEach(n => m.set(n.id, n));
    return m;
  }, [nodes]);

  return (
    <div
      aria-hidden="true"
      className="hero-graphic-container"
      style={{
        width: '100%',
        maxWidth: isMobile ? '360px' : '760px',
        aspectRatio: isMobile ? '360 / 150' : '760 / 220',
        margin: '0 auto',
      }}
    >
      <svg
        ref={svgRef}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse gradient for active nodes */}
          <radialGradient id="activeGlow">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>

          {/* Data flow marker */}
          <marker id="flowDot" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="4" markerHeight="4">
            <circle cx="3" cy="3" r="2" fill="var(--accent)" opacity="0.8" />
          </marker>
        </defs>

        {/* Edges (lines between nodes) */}
        {edges.map((edge, i) => {
          const fromNode = nodeMap.get(edge.from);
          const toNode = nodeMap.get(edge.to);
          if (!fromNode || !toNode) return null;

          const isActive = activeNodes.includes(edge.from) || activeNodes.includes(edge.to);

          return (
            <line
              key={`edge-${i}`}
              x1={fromNode.cx}
              y1={fromNode.cy}
              x2={toNode.cx}
              y2={toNode.cy}
              stroke={isActive ? 'var(--accent)' : 'var(--neutral-600)'}
              strokeWidth={isActive ? 1.5 : 0.75}
              strokeDasharray={isActive ? '4 4' : 'none'}
              opacity={isActive ? 0.7 : 0.3}
              style={isActive && !reducedMotion.current ? {
                animation: `flow-data 1.5s linear infinite`,
                animationDelay: `${i * 200}ms`,
              } : undefined}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isActive = activeNodes.includes(node.id);

          return (
            <g key={node.id}>
              {/* Active glow ring */}
              {isActive && (
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r + 8}
                  fill="url(#activeGlow)"
                  style={!reducedMotion.current ? {
                    animation: `pulse-node 2s ease-in-out infinite`,
                    animationDelay: `${i * 300}ms`,
                  } : undefined}
                />
              )}

              {/* Node circle */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill={isActive ? 'var(--neutral-800)' : 'var(--neutral-900)'}
                stroke={isActive ? 'var(--accent)' : 'var(--neutral-600)'}
                strokeWidth={isActive ? 1.5 : 1}
                opacity={isActive ? 1 : 0.6}
                style={isActive && !reducedMotion.current ? {
                  animation: `float-subtle 4s ease-in-out infinite`,
                  animationDelay: `${i * 500}ms`,
                } : undefined}
              />

              {/* Node label */}
              <text
                x={node.cx}
                y={node.cy + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isActive ? 'var(--accent-subtle)' : 'var(--neutral-400)'}
                fontSize={node.r > 20 ? 10 : 8}
                fontWeight={isActive ? 600 : 400}
                fontFamily="system-ui, sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Floating data particles on active edges */}
        {!reducedMotion.current && edges.map((edge, i) => {
          const fromNode = nodeMap.get(edge.from);
          const toNode = nodeMap.get(edge.to);
          if (!fromNode || !toNode) return null;
          const isActive = activeNodes.includes(edge.from) || activeNodes.includes(edge.to);
          if (!isActive) return null;

          return (
            <circle
              key={`particle-${i}`}
              r="2"
              fill="var(--accent)"
              opacity="0.8"
            >
              <animateMotion
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
                path={`M${fromNode.cx},${fromNode.cy} L${toNode.cx},${toNode.cy}`}
              />
            </circle>
          );
        })}
      </svg>
    </div>
  );
}
