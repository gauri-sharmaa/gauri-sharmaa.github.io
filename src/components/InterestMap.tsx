import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Maximize2, Minus, Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  interestColors,
  mapEdges,
  mapNodes,
  type MapNode,
  type MapNodeKind,
} from "@/data/interestMap";

interface SimNode extends MapNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  // Pinned position while dragging (or for the center node).
  fx?: number;
  fy?: number;
  // Interests are pulled back to a fixed spot on the ring.
  home?: { x: number; y: number };
}

interface View {
  x: number;
  y: number;
  k: number;
}

const RADIUS: Record<MapNodeKind, number> = {
  me: 44,
  interest: 15,
  topic: 5,
  project: 8,
  experience: 8,
  writing: 7,
};

const KIND_LABEL: Record<MapNodeKind, string> = {
  me: "Overview",
  interest: "Interest",
  topic: "Topic",
  project: "Project",
  experience: "Experience",
  writing: "Writing",
};

// Interests sit on an ellipse stretched to match the container's shape.
const RING = 270;
const CLEAR = 130;
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 3;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Builds the simulation nodes, seeding interests on a ring and every other
// node near the interests it belongs to, so the layout settles quickly.
const buildSimulation = (portrait: boolean) => {
  const stretch = portrait ? { x: 0.75, y: 1.9 } : { x: 1.45, y: 1 };
  const interestIds = mapNodes.filter((n) => n.kind === "interest").map((n) => n.id);
  const interestAngle = new Map(interestIds.map((id, i) => [id, (i / interestIds.length) * Math.PI * 2]));

  const neighbors = new Map<string, Set<string>>();
  mapNodes.forEach((n) => neighbors.set(n.id, new Set()));
  mapEdges.forEach(([a, b]) => {
    neighbors.get(a)?.add(b);
    neighbors.get(b)?.add(a);
  });

  const nodes: SimNode[] = mapNodes.map((n) => {
    const parents = mapEdges
      .filter(([a, b]) => (a === n.id && interestAngle.has(b)) || (b === n.id && interestAngle.has(a)))
      .map(([a, b]) => (a === n.id ? b : a));
    const colorKey = n.kind === "interest" ? n.id : parents[0];
    const ringPoint = (id: string, r = RING) => ({
      x: Math.cos(interestAngle.get(id)!) * r * stretch.x,
      y: Math.sin(interestAngle.get(id)!) * r * stretch.y,
    });
    let x = 0;
    let y = 0;
    if (n.kind === "interest") {
      ({ x, y } = ringPoint(n.id));
    } else if (n.kind !== "me" && parents.length) {
      // Start between the interests this node belongs to; single-interest
      // nodes start just outside their interest.
      const pts = parents.map((id) => ringPoint(id, parents.length === 1 ? RING * 1.45 : RING));
      x = pts.reduce((s, p) => s + p.x, 0) / pts.length + (Math.random() - 0.5) * 30;
      y = pts.reduce((s, p) => s + p.y, 0) / pts.length + (Math.random() - 0.5) * 30;
    }
    return {
      ...n,
      x,
      y,
      vx: 0,
      vy: 0,
      r: RADIUS[n.kind],
      color: n.kind === "me" ? "hsl(215 14% 55%)" : interestColors[colorKey] ?? interestColors.writing,
      ...(n.kind === "me" ? { fx: 0, fy: 0 } : {}),
      ...(n.kind === "interest" ? { home: { x, y } } : {}),
    };
  });

  return { nodes, neighbors };
};

// One step of a small force-directed layout: node repulsion, edge springs and
// a gentle pull toward the center. Cheap enough for a few dozen nodes.
const tick = (nodes: SimNode[], byId: Map<string, SimNode>, alpha: number) => {
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let d2 = dx * dx + dy * dy;
      if (d2 < 1) {
        dx = Math.random() - 0.5;
        dy = Math.random() - 0.5;
        d2 = 1;
      }
      const d = Math.sqrt(d2);
      // Labels are wide, so leave extra room between nodes side to side.
      const minDist = a.r + b.r + 60 + Math.min(30, Math.abs(dx / d) * 30);
      const strength = (9000 / d2 + (d < minDist ? (minDist - d) * 0.5 : 0)) * alpha;
      const fx = (dx / d) * strength;
      const fy = (dy / d) * strength;
      a.vx -= fx;
      a.vy -= fy;
      b.vx += fx;
      b.vy += fy;
    }
  }

  for (const [aId, bId] of mapEdges) {
    const a = byId.get(aId)!;
    const b = byId.get(bId)!;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 1;
    const hubLink = a.kind === "me" || b.kind === "me";
    if (hubLink) continue; // Interests are held on a ring instead (below).
    const rest = a.kind === "interest" || b.kind === "interest" ? 110 : 80;
    const k = 0.035 * alpha;
    const f = (d - rest) * k;
    const fx = (dx / d) * f;
    const fy = (dy / d) * f;
    a.vx += fx;
    a.vy += fy;
    b.vx -= fx;
    b.vy -= fy;
  }

  for (const n of nodes) {
    if (n.home) {
      // Interests hold their spot on the ring so each gets its own territory.
      n.vx += (n.home.x - n.x) * 0.3 * alpha;
      n.vy += (n.home.y - n.y) * 0.3 * alpha;
    } else if (n.kind !== "me") {
      n.vx -= n.x * 0.003 * alpha;
      n.vy -= n.y * 0.003 * alpha;
      // Keep a clear zone around the center node.
      const d = Math.sqrt(n.x * n.x + n.y * n.y) || 1;
      if (d < CLEAR) {
        n.vx += (n.x / d) * (CLEAR - d) * 0.2 * alpha;
        n.vy += (n.y / d) * (CLEAR - d) * 0.2 * alpha;
      }
    }
    n.vx *= 0.6;
    n.vy *= 0.6;
    if (n.fx !== undefined && n.fy !== undefined) {
      n.x = n.fx;
      n.y = n.fy;
      n.vx = 0;
      n.vy = 0;
    } else {
      n.x += n.vx;
      n.y += n.vy;
    }
  }
};

// Breaks a label into short lines so it takes less room on the map.
const wrapLabel = (label: string, maxChars: number) => {
  const lines: string[] = [];
  for (const word of label.split(" ")) {
    const last = lines[lines.length - 1];
    if (last !== undefined && (last + " " + word).length <= maxChars) lines[lines.length - 1] = last + " " + word;
    else lines.push(word);
  }
  return lines;
};

// A color with transparency, from an "hsl(h s% l%)" string.
const tint = (color: string, alpha: number) => color.replace(")", ` / ${alpha})`);

const NodeShape = ({ node, dimmed }: { node: SimNode; dimmed: boolean }) => {
  const common = { opacity: dimmed ? 0.2 : 1, style: { transition: "opacity 200ms" } };
  const c = node.color;
  switch (node.kind) {
    case "me":
      return (
        <g {...common}>
          <circle r={node.r + 8} fill="none" stroke="hsl(var(--muted-foreground) / 0.35)" strokeDasharray="2 4" />
          <circle r={node.r} fill="hsl(var(--card))" stroke="hsl(var(--foreground) / 0.7)" strokeWidth={1.25} />
          <text textAnchor="middle" fill="hsl(var(--foreground))" fontSize={13.5} fontWeight={500} letterSpacing="0.01em">
            <tspan x={0} dy="-0.2em">My</tspan>
            <tspan x={0} dy="1.2em">Experience</tspan>
          </text>
        </g>
      );
    case "interest":
      return (
        <g {...common}>
          <circle r={node.r + 10} fill={tint(c, 0.1)} />
          <circle r={node.r} fill={tint(c, 0.25)} stroke={c} strokeWidth={1.25} />
          <circle r={4} fill={c} />
        </g>
      );
    case "project":
      return <circle {...common} r={node.r} fill="hsl(var(--card))" stroke={c} strokeWidth={1.75} />;
    case "experience":
      return <circle {...common} r={node.r} fill={tint(c, 0.55)} stroke={c} strokeWidth={1} />;
    case "writing":
      return <circle {...common} r={node.r} fill="hsl(var(--card))" stroke={c} strokeWidth={1.5} strokeDasharray="2.5 2" />;
    default:
      return <circle {...common} r={node.r} fill={c} />;
  }
};

export const KindGlyph = ({ kind, color = "hsl(215 14% 55%)" }: { kind: MapNodeKind; color?: string }) => (
  <svg width={14} height={14} viewBox="-8 -8 16 16" aria-hidden="true">
    {kind === "interest" && (
      <>
        <circle r={6} fill={tint(color, 0.25)} stroke={color} strokeWidth={1.25} />
        <circle r={2} fill={color} />
      </>
    )}
    {kind === "topic" && <circle r={3} fill={color} />}
    {kind === "project" && <circle r={5} fill="none" stroke={color} strokeWidth={1.75} />}
    {kind === "experience" && <circle r={5} fill={tint(color, 0.55)} stroke={color} strokeWidth={1} />}
    {kind === "writing" && <circle r={5} fill="none" stroke={color} strokeWidth={1.5} strokeDasharray="2.5 2" />}
    {kind === "me" && <circle r={5} fill="none" stroke={color} strokeWidth={1.25} />}
  </svg>
);

const InterestMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const portrait = size.h > size.w * 1.1;
  const compact = size.w < 640;
  const sim = useMemo(() => buildSimulation(portrait), [portrait]);
  const byId = useMemo(() => new Map(sim.nodes.map((n) => [n.id, n])), [sim]);

  const [, setFrame] = useState(0);
  const [view, setView] = useState<View>({ x: 400, y: 300, k: 1 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const viewRef = useRef(view);
  viewRef.current = view;
  const alphaRef = useRef(1);
  const rafRef = useRef(0);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<
    | { type: "node"; id: string; moved: boolean; startX: number; startY: number }
    | { type: "pan"; lastX: number; lastY: number; startX: number; startY: number }
    | { type: "pinch"; dist: number; midX: number; midY: number }
    | null
  >(null);

  // Animation loop: runs while the layout is "hot" and stops once it settles.
  const run = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const step = () => {
      tick(sim.nodes, byId, alphaRef.current);
      alphaRef.current = Math.max(0, alphaRef.current * 0.985);
      setFrame((f) => f + 1);
      if (alphaRef.current > 0.02 || gesture.current?.type === "node") {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [sim, byId]);

  const reheat = useCallback(
    (alpha = 0.5) => {
      alphaRef.current = Math.max(alphaRef.current, alpha);
      run();
    },
    [run],
  );

  // Fits the whole graph in view.
  const fit = useCallback(() => {
    const { w, h } = size;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of sim.nodes) {
      minX = Math.min(minX, n.x - n.r);
      maxX = Math.max(maxX, n.x + n.r);
      minY = Math.min(minY, n.y - n.r);
      maxY = Math.max(maxY, n.y + n.r);
    }
    // Leave room for labels, and for the interest chips along the top.
    const pad = 60;
    const top = w < 768 ? 50 : 80;
    const k = clamp(Math.min(w / (maxX - minX + pad * 2), (h - top) / (maxY - minY + pad * 2)), MIN_ZOOM, 1.4);
    setView({ k, x: w / 2 - ((minX + maxX) / 2) * k, y: top + (h - top) / 2 - ((minY + maxY) / 2) * k });
  }, [sim, size]);

  useEffect(() => {
    // Settle most of the layout up front so the first paint isn't a tangle.
    alphaRef.current = 1;
    for (let i = 0; i < 250; i++) {
      tick(sim.nodes, byId, alphaRef.current);
      alphaRef.current *= 0.985;
    }
    run();
    return () => cancelAnimationFrame(rafRef.current);
  }, [sim, byId, run]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Re-fit whenever the container size or layout changes (including first measure).
  useEffect(() => {
    fit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.w, size.h, sim]);

  const zoomAt = useCallback((factor: number, cx: number, cy: number) => {
    setView((v) => {
      const k = clamp(v.k * factor, MIN_ZOOM, MAX_ZOOM);
      const ratio = k / v.k;
      return { k, x: cx - (cx - v.x) * ratio, y: cy - (cy - v.y) * ratio };
    });
  }, []);

  // Wheel zoom needs a non-passive listener so the page doesn't scroll.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX - rect.left, e.clientY - rect.top);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const toLocal = (e: React.PointerEvent) => {
    const rect = svgRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const toWorld = (p: { x: number; y: number }) => {
    const v = viewRef.current;
    return { x: (p.x - v.x) / v.k, y: (p.y - v.y) / v.k };
  };

  const startPinch = () => {
    const [a, b] = [...pointers.current.values()];
    gesture.current = {
      type: "pinch",
      dist: Math.hypot(a.x - b.x, a.y - b.y),
      midX: (a.x + b.x) / 2,
      midY: (a.y + b.y) / 2,
    };
  };

  const releaseNode = () => {
    if (gesture.current?.type !== "node") return;
    const node = byId.get(gesture.current.id)!;
    if (node.kind !== "me") {
      node.fx = undefined;
      node.fy = undefined;
    }
  };

  const onPointerDown = (e: React.PointerEvent, nodeId?: string) => {
    const p = toLocal(e);
    pointers.current.set(e.pointerId, p);
    svgRef.current?.setPointerCapture(e.pointerId);

    if (pointers.current.size === 2) {
      releaseNode();
      startPinch();
      return;
    }
    if (nodeId) {
      e.stopPropagation();
      const node = byId.get(nodeId)!;
      node.fx = node.x;
      node.fy = node.y;
      gesture.current = { type: "node", id: nodeId, moved: false, startX: p.x, startY: p.y };
      reheat(0.3);
    } else {
      gesture.current = { type: "pan", lastX: p.x, lastY: p.y, startX: p.x, startY: p.y };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    const p = toLocal(e);
    pointers.current.set(e.pointerId, p);
    const g = gesture.current;
    if (!g) return;

    if (g.type === "node") {
      if (Math.hypot(p.x - g.startX, p.y - g.startY) > 4) g.moved = true;
      const node = byId.get(g.id)!;
      const w = toWorld(p);
      node.fx = w.x;
      node.fy = w.y;
      alphaRef.current = Math.max(alphaRef.current, 0.3);
    } else if (g.type === "pan") {
      const dx = p.x - g.lastX;
      const dy = p.y - g.lastY;
      g.lastX = p.x;
      g.lastY = p.y;
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
    } else if (g.type === "pinch" && pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;
      setView((v) => {
        const k = clamp(v.k * (dist / g.dist), MIN_ZOOM, MAX_ZOOM);
        const ratio = k / v.k;
        return {
          k,
          x: midX - (g.midX - v.x) * ratio,
          y: midY - (g.midY - v.y) * ratio,
        };
      });
      g.dist = dist;
      g.midX = midX;
      g.midY = midY;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    const g = gesture.current;
    if (g?.type === "node") {
      releaseNode();
      if (!g.moved) setSelected((s) => (s === g.id ? null : g.id));
      reheat(0.2);
    } else if (g?.type === "pan" && e.type === "pointerup") {
      // A tap on empty space clears the selection.
      const p = toLocal(e);
      if (Math.hypot(p.x - g.startX, p.y - g.startY) < 4) setSelected(null);
    }
    if (pointers.current.size === 1) {
      const [p] = [...pointers.current.values()];
      gesture.current = { type: "pan", lastX: p.x, lastY: p.y, startX: -Infinity, startY: -Infinity };
    } else if (pointers.current.size === 0) {
      gesture.current = null;
    }
  };

  const focusId = hovered ?? selected;
  const focusSet = useMemo(() => {
    if (!focusId) return null;
    return new Set([focusId, ...(sim.neighbors.get(focusId) ?? [])]);
  }, [focusId, sim]);

  const selectedNode = selected ? byId.get(selected) : undefined;
  const selectedNeighbors = selected
    ? [...(sim.neighbors.get(selected) ?? [])].map((id) => byId.get(id)!).sort((a, b) => a.r === b.r ? a.label.localeCompare(b.label) : b.r - a.r)
    : [];

  const interests = sim.nodes.filter((n) => n.kind === "interest");
  // Labels shrink with the map but stay readable when zoomed out.
  const labelScale = Math.max(1, 0.9 / view.k);
  const labelSize = (n: SimNode) => (n.kind === "interest" ? 12 : 10) * labelScale;
  const labelOffset = (n: SimNode) => n.r + (n.kind === "interest" ? 20 : 11) * labelScale;



  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="absolute inset-0 overflow-hidden rounded-lg border border-border bg-card"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      >
        <svg
          ref={svgRef}
          width={size.w}
          height={size.h}
          className="block select-none cursor-grab active:cursor-grabbing"
          style={{ touchAction: "none" }}
          onPointerDown={(e) => onPointerDown(e)}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="application"
          aria-label="Interactive map of my interests, projects, and experiences. Drag to pan, scroll to zoom, select a node for details."
        >
          <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>
            <g>
              {mapEdges.map(([aId, bId]) => {
                const a = byId.get(aId)!;
                const b = byId.get(bId)!;
                const active = focusSet ? focusSet.has(aId) && focusSet.has(bId) && (aId === focusId || bId === focusId) : false;
                const fromMe = a.kind === "me" || b.kind === "me";
                const color = fromMe
                  ? "hsl(var(--muted-foreground))"
                  : a.kind === "interest" ? a.color : b.kind === "interest" ? b.color : "hsl(var(--muted-foreground))";
                // Bend each link slightly to one side so the web reads as organic.
                const mx = (a.x + b.x) / 2 - (b.y - a.y) * 0.12;
                const my = (a.y + b.y) / 2 + (b.x - a.x) * 0.12;
                return (
                  <path
                    key={`${aId}-${bId}`}
                    d={`M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`}
                    fill="none"
                    stroke={color}
                    strokeOpacity={focusSet ? (active ? 0.85 : 0.05) : fromMe ? 0.25 : 0.4}
                    strokeWidth={active ? 1.75 : 1}
                    strokeDasharray={fromMe && !active ? "3 4" : undefined}
                    style={{ transition: "stroke-opacity 200ms" }}
                  />
                );
              })}
            </g>
            <g>
              {sim.nodes.map((n) => {
                const dimmed = focusSet ? !focusSet.has(n.id) : false;
                const isSelected = selected === n.id;
                // On small screens, leaf labels wait until you zoom in or tap nearby.
                const showLabel =
                  n.kind !== "me" && (n.kind === "interest" || !compact || view.k >= 0.75 || (focusSet?.has(n.id) ?? false));
                return (
                  <g
                    key={n.id}
                    transform={`translate(${n.x},${n.y})`}
                    className="cursor-pointer outline-none"
                    tabIndex={0}
                    role="button"
                    aria-label={`${KIND_LABEL[n.kind]}: ${n.label}`}
                    aria-pressed={isSelected}
                    onPointerDown={(e) => onPointerDown(e, n.id)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(n.id)}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={() => setHovered(n.id)}
                    onBlur={() => setHovered(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected((s) => (s === n.id ? null : n.id));
                      }
                    }}
                  >
                    {isSelected && (
                      <circle r={n.r + 9} fill="none" stroke="hsl(var(--foreground))" strokeWidth={1.5} strokeDasharray="3 3" />
                    )}
                    <NodeShape node={n} dimmed={dimmed} />
                    {showLabel && (
                      <text
                        y={labelOffset(n)}
                        textAnchor="middle"
                        fontSize={labelSize(n)}
                        fontWeight={n.kind === "interest" ? 600 : 400}
                        letterSpacing={n.kind === "interest" ? undefined : "0.01em"}
                        fill={n.kind === "interest" ? "hsl(var(--foreground) / 0.85)" : "hsl(var(--muted-foreground) / 0.85)"}
                        stroke="hsl(var(--card))"
                        strokeWidth={4 * labelScale}
                        strokeLinejoin="round"
                        paintOrder="stroke"
                        opacity={dimmed ? 0.2 : 1}
                        style={{ transition: "opacity 200ms", pointerEvents: "none" }}
                      >
                        {wrapLabel(n.label, n.kind === "interest" ? (compact ? 12 : 16) : 12).map((line, i) => (
                          <tspan key={i} x={0} dy={i === 0 ? 0 : "1.15em"}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </g>
        </svg>
      </div>

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-1 rounded-md border border-border bg-background/90 backdrop-blur p-1 shadow-sm">
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Zoom in" onClick={() => zoomAt(1.25, size.w / 2, size.h / 2)}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Zoom out" onClick={() => zoomAt(0.8, size.w / 2, size.h / 2)}>
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Fit map to view" onClick={fit}>
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Interest legend: tap to jump to an interest */}
      <div className="absolute top-3 left-3 right-16 flex md:flex-wrap gap-1.5 overflow-x-auto md:overflow-visible pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {interests.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setSelected((s) => (s === n.id ? null : n.id))}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            className={`shrink-0 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs bg-background/90 backdrop-blur transition-colors hover:border-foreground/40 ${
              selected === n.id ? "border-foreground/60" : "border-border"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: n.color }} />
            {n.label}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {selectedNode && (
        <div className="absolute bottom-3 left-3 right-3 md:left-auto md:w-80 max-h-[45%] md:max-h-[60%] overflow-y-auto rounded-lg border border-border bg-background/95 backdrop-blur p-4 shadow-lg">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <KindGlyph kind={selectedNode.kind} color={selectedNode.color} />
                {KIND_LABEL[selectedNode.kind]}
                {selectedNode.period && <span>· {selectedNode.period}</span>}
              </div>
              <h3 className="font-semibold leading-snug">{selectedNode.label}</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 -mr-1 -mt-1 shrink-0" aria-label="Close details" onClick={() => setSelected(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{selectedNode.blurb}</p>

          {selectedNeighbors.length > 0 && (
            <div className="mb-3">
              <div className="text-xs font-medium text-muted-foreground mb-1.5">Connected to</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedNeighbors.map((nb) => (
                  <button
                    key={nb.id}
                    type="button"
                    onClick={() => setSelected(nb.id)}
                    className="flex items-center gap-1 rounded-full bg-secondary text-secondary-foreground px-2 py-0.5 text-xs hover:bg-secondary/70"
                  >
                    <KindGlyph kind={nb.kind === "me" ? "topic" : nb.kind} color={nb.color} />
                    {nb.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedNode.link &&
            (selectedNode.link.external ? (
              <Button size="sm" asChild>
                <a href={selectedNode.link.href} target="_blank" rel="noopener noreferrer">
                  {selectedNode.link.label} <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            ) : (
              <Button size="sm" asChild>
                <Link to={selectedNode.link.href}>
                  {selectedNode.link.label} <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            ))}
        </div>
      )}
    </div>
  );
};

export default InterestMap;
