import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';

// Inline cn utility — zero external dependencies
function cn(...inputs: (string | boolean | null | undefined)[]): string {
    return inputs.filter(Boolean).join(' ');
}

// ─── Types ────────────────────────────────────────────────────

type ChartType = 'line' | 'bar' | 'area' | 'donut' | 'scatter' | 'sparkline';

interface ChartDataPoint {
    /** X-axis value (label or numeric) */
    x: string | number;
    /** Y-axis value */
    y: number;
}

interface ChartSeries {
    /** Unique series identifier */
    name: string;
    /** Data points for this series */
    data: ChartDataPoint[];
    /** Custom color override (CSS color string) */
    color?: string;
}

/** Donut segment (used only for donut chart type) */
interface DonutSegment {
    /** Segment label */
    label: string;
    /** Segment value */
    value: number;
    /** Custom color override */
    color?: string;
}

interface ChartProps {
    /** Chart type */
    type: ChartType;
    /** Data series (for line, bar, area, scatter, sparkline) */
    series?: ChartSeries[];
    /** Donut segments (for donut chart type) */
    segments?: DonutSegment[];
    /** Chart width (auto-resizes if not set) */
    width?: number;
    /** Chart height */
    height?: number;
    /** Chart title */
    title?: string;
    /** X-axis label */
    xLabel?: string;
    /** Y-axis label */
    yLabel?: string;
    /** Show grid lines */
    grid?: boolean;
    /** Show legend */
    legend?: boolean;
    /** Show tooltips on hover */
    tooltip?: boolean;
    /** Animate entrance */
    animated?: boolean;
    /** Stack series (bar/area) */
    stacked?: boolean;
    /** Horizontal bars (bar chart only) */
    horizontal?: boolean;
    /** Show data points on line/area */
    showPoints?: boolean;
    /** Curve type for line/area */
    curve?: 'linear' | 'smooth';
    /** Center stat label for donut */
    centerLabel?: string;
    /** Center stat value for donut */
    centerValue?: string;
    /** Y-axis min */
    yMin?: number;
    /** Y-axis max */
    yMax?: number;
    /** Number of Y-axis ticks */
    yTicks?: number;
    /** Loading state */
    isLoading?: boolean;
    /** Empty state message */
    emptyMessage?: string;
    /** Additional CSS classes */
    className?: string;
    /** Accessible description */
    ariaLabel?: string;
    /** Color palette override */
    colors?: string[];
}

// ─── Constants ────────────────────────────────────────────────

const DEFAULT_COLORS = [
    '#8b5cf6', // violet-500
    '#3b82f6', // blue-500
    '#22c55e', // green-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#ec4899', // pink-500
    '#06b6d4', // cyan-500
    '#f97316', // orange-500
];

const PADDING = { top: 24, right: 24, bottom: 40, left: 56 };
const SPARKLINE_PAD = { top: 4, right: 4, bottom: 4, left: 4 };
const DONUT_PAD = { top: 16, right: 16, bottom: 16, left: 16 };

// ─── Style Block ──────────────────────────────────────────────
const CHART_STYLES = `
.vc-root {
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    color: var(--fd-foreground, #18181b);
}
.vc-svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
}
.vc-title {
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    fill: var(--fd-foreground, #18181b);
}
.vc-axis-label {
    font-size: 0.6875rem;
    fill: var(--fd-muted-foreground, #71717a);
    font-weight: 500;
}
.vc-tick-label {
    font-size: 0.625rem;
    fill: var(--fd-muted-foreground, #71717a);
}
.vc-grid-line {
    stroke: var(--fd-border, #e4e4e7);
    stroke-width: 1;
    stroke-dasharray: 3 3;
}
.vc-axis-line {
    stroke: var(--fd-border, #e4e4e7);
    stroke-width: 1;
}

/* ─── Line / Area ─────────────────────────────── */
.vc-line {
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}
.vc-area-fill {
    opacity: 0.15;
}
.vc-point {
    stroke-width: 2;
    stroke: var(--fd-card, #ffffff);
    cursor: pointer;
    transition: r 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.vc-point:hover,
.vc-point.vc-point-active {
    r: 6;
}

/* ─── Bar ─────────────────────────────────────── */
.vc-bar {
    rx: 3;
    ry: 3;
    cursor: pointer;
    transition: opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                filter 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.vc-bar:hover {
    opacity: 0.85;
    filter: brightness(1.08);
}

/* ─── Donut ───────────────────────────────────── */
.vc-arc {
    cursor: pointer;
    transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                filter 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    transform-origin: center;
}
.vc-arc:hover {
    opacity: 0.88;
    transform: scale(1.03);
    filter: brightness(1.06);
}
.vc-donut-center-value {
    font-size: 1.5rem;
    font-weight: 700;
    fill: var(--fd-foreground, #18181b);
    text-anchor: middle;
}
.vc-donut-center-label {
    font-size: 0.6875rem;
    fill: var(--fd-muted-foreground, #71717a);
    text-anchor: middle;
}

/* ─── Scatter ─────────────────────────────────── */
.vc-scatter-point {
    opacity: 0.85;
    stroke: var(--fd-card, #ffffff);
    stroke-width: 1.5;
    cursor: pointer;
    transition: r 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.vc-scatter-point:hover {
    r: 8;
    opacity: 1;
}

/* ─── Crosshair ───────────────────────────────── */
.vc-crosshair {
    stroke: var(--fd-muted-foreground, #71717a);
    stroke-width: 1;
    stroke-dasharray: 4 3;
    opacity: 0.4;
    pointer-events: none;
}

/* ─── Tooltip ─────────────────────────────────── */
.vc-tooltip {
    position: absolute;
    pointer-events: none;
    background: var(--fd-popover, #ffffff);
    border: 1px solid var(--fd-border, #e4e4e7);
    border-radius: 10px;
    padding: 8px 12px;
    font-size: 0.75rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04);
    z-index: 50;
    min-width: 100px;
    animation: vc-tooltip-in 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    backdrop-filter: blur(8px);
}
@keyframes vc-tooltip-in {
    from { opacity: 0; transform: translateY(4px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
}
.vc-tooltip-title {
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--fd-foreground, #18181b);
}
.vc-tooltip-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 1px 0;
}
.vc-tooltip-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
}
.vc-tooltip-label {
    color: var(--fd-muted-foreground, #71717a);
    flex: 1;
}
.vc-tooltip-value {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--fd-foreground, #18181b);
}

/* ─── Legend ───────────────────────────────────── */
.vc-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 8px 0 0;
    justify-content: center;
}
.vc-legend-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    cursor: pointer;
    user-select: none;
    color: var(--fd-muted-foreground, #71717a);
    border: none;
    background: none;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: inherit;
    transition: opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                background 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.vc-legend-item:hover {
    background: var(--fd-accent, #f4f4f5);
}
.vc-legend-item[data-hidden="true"] {
    opacity: 0.4;
    text-decoration: line-through;
}
.vc-legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
    transition: background 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.vc-legend-item:hover .vc-legend-dot {
    transform: scale(1.2);
}

/* ─── Skeleton ────────────────────────────────── */
.vc-skeleton {
    border-radius: 8px;
    background: linear-gradient(90deg, var(--fd-accent, #f4f4f5) 25%, var(--fd-muted, #e4e4e7) 50%, var(--fd-accent, #f4f4f5) 75%);
    background-size: 200% 100%;
    animation: vc-shimmer 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes vc-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* ═══════════════════════════════════════════════
   ENTRANCE ANIMATIONS — Apple-level spring curves
   ═══════════════════════════════════════════════ */

/* Line draw — smooth pen stroke */
.vc-animate-line {
    will-change: stroke-dashoffset;
    animation: vc-draw 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes vc-draw {
    from { stroke-dashoffset: var(--vc-path-len); opacity: 0.4; }
    to   { stroke-dashoffset: 0; opacity: 1; }
}

/* Area fill fade-in synced with line */
.vc-animate-area-fill {
    opacity: 0;
    animation: vc-area-reveal 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
}
@keyframes vc-area-reveal {
    from { opacity: 0; }
    to   { opacity: 0.15; }
}

/* Bar grow — elastic spring overshoot */
.vc-animate-bar {
    transform-origin: bottom center;
    will-change: transform, opacity;
    animation: vc-grow-bar 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards;
}
.vc-animate-bar-h {
    transform-origin: left center;
    will-change: transform, opacity;
    animation: vc-grow-bar-h 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards;
}
@keyframes vc-grow-bar {
    0%   { transform: scaleY(0); opacity: 0; }
    40%  { opacity: 1; }
    100% { transform: scaleY(1); opacity: 1; }
}
@keyframes vc-grow-bar-h {
    0%   { transform: scaleX(0); opacity: 0; }
    40%  { opacity: 1; }
    100% { transform: scaleX(1); opacity: 1; }
}

/* Donut arc — rotate in with spring */
.vc-animate-arc {
    transform-origin: center;
    will-change: transform, opacity;
    animation: vc-arc-in 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@keyframes vc-arc-in {
    0%   { opacity: 0; transform: scale(0.6) rotate(-30deg); }
    50%  { opacity: 0.9; }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
}

/* Data point pop — spring bounce */
.vc-animate-point {
    will-change: r, opacity;
    animation: vc-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@keyframes vc-pop {
    0%   { r: 0; opacity: 0; }
    60%  { opacity: 1; }
    100% { opacity: 1; }
}

/* Scatter point entrance — staggered spring */
.vc-animate-scatter {
    will-change: r, opacity;
    animation: vc-scatter-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@keyframes vc-scatter-in {
    0%   { r: 0; opacity: 0; }
    50%  { opacity: 0.85; }
    100% { opacity: 0.85; }
}

/* Donut center text fade-in */
.vc-animate-center {
    opacity: 0;
    animation: vc-center-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
}
@keyframes vc-center-in {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
}

.vc-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8125rem;
    color: var(--fd-muted-foreground, #71717a);
    border: 1px dashed var(--fd-border, #e4e4e7);
    border-radius: 8px;
}

/* Sparkline-specific */
.vc-sparkline-line {
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
}
.vc-sparkline-area {
    opacity: 0.1;
}

/* Reduced motion — respect accessibility */
@media (prefers-reduced-motion: reduce) {
    .vc-animate-line,
    .vc-animate-bar,
    .vc-animate-bar-h,
    .vc-animate-arc,
    .vc-animate-point,
    .vc-animate-scatter,
    .vc-animate-center,
    .vc-animate-area-fill {
        animation: none !important;
        opacity: 1 !important;
    }
    .vc-skeleton {
        animation: none !important;
    }
    .vc-tooltip {
        animation: none !important;
        opacity: 1 !important;
    }
}
`;

// ─── Helpers ──────────────────────────────────────────────────

/** Linear interpolation */
function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

/** Format number with locale */
function fmt(n: number): string {
    return n.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

/** Compute nice axis bounds and ticks */
function computeScale(
    dataMin: number,
    dataMax: number,
    tickCount: number,
    forcedMin?: number,
    forcedMax?: number,
): { min: number; max: number; ticks: number[] } {
    const min = forcedMin ?? dataMin;
    const max = forcedMax ?? dataMax;
    const range = max - min || 1;
    const step = range / Math.max(tickCount - 1, 1);
    const ticks: number[] = [];
    for (let i = 0; i < tickCount; i++) {
        ticks.push(min + step * i);
    }
    return { min, max, ticks };
}

/** Map a value from data space to pixel space */
function scaleValue(value: number, domainMin: number, domainMax: number, rangeMin: number, rangeMax: number): number {
    const domain = domainMax - domainMin;
    if (domain === 0) return (rangeMin + rangeMax) / 2;
    return rangeMin + ((value - domainMin) / domain) * (rangeMax - rangeMin);
}

/** Generate smooth curve SVG path using Catmull-Rom → cubic Bezier */
function smoothPath(points: { x: number; y: number }[]): string {
    if (points.length < 2) return '';
    if (points.length === 2) {
        return `M${points[0]!.x},${points[0]!.y}L${points[1]!.x},${points[1]!.y}`;
    }
    let d = `M${points[0]!.x},${points[0]!.y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(0, i - 1)]!;
        const p1 = points[i]!;
        const p2 = points[i + 1]!;
        const p3 = points[Math.min(points.length - 1, i + 2)]!;
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        d += `C${cp1x},${cp1y},${cp2x},${cp2y},${p2.x},${p2.y}`;
    }
    return d;
}

/** Generate linear SVG path */
function linearPath(points: { x: number; y: number }[]): string {
    if (points.length === 0) return '';
    return points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join('');
}

/** Compute SVG arc path segment for donut */
function arcPath(
    cx: number,
    cy: number,
    outerR: number,
    innerR: number,
    startAngle: number,
    endAngle: number,
): string {
    const angleSpan = endAngle - startAngle;
    const largeArc = angleSpan > Math.PI ? 1 : 0;
    const sx1 = cx + outerR * Math.cos(startAngle);
    const sy1 = cy + outerR * Math.sin(startAngle);
    const ex1 = cx + outerR * Math.cos(endAngle);
    const ey1 = cy + outerR * Math.sin(endAngle);
    const sx2 = cx + innerR * Math.cos(endAngle);
    const sy2 = cy + innerR * Math.sin(endAngle);
    const ex2 = cx + innerR * Math.cos(startAngle);
    const ey2 = cy + innerR * Math.sin(startAngle);
    return [
        `M${sx1},${sy1}`,
        `A${outerR},${outerR},0,${largeArc},1,${ex1},${ey1}`,
        `L${sx2},${sy2}`,
        `A${innerR},${innerR},0,${largeArc},0,${ex2},${ey2}`,
        'Z',
    ].join('');
}

/** Get approximate path length for animation */
function approxPathLength(points: { x: number; y: number }[]): number {
    let len = 0;
    for (let i = 1; i < points.length; i++) {
        const dx = points[i]!.x - points[i - 1]!.x;
        const dy = points[i]!.y - points[i - 1]!.y;
        len += Math.sqrt(dx * dx + dy * dy);
    }
    return len;
}

// ─── Style injector (singleton) ──────────────────────────────

let stylesInjected = false;
function injectStyles(): void {
    if (stylesInjected || typeof document === 'undefined') return;
    const style = document.createElement('style');
    style.setAttribute('data-vc-styles', '');
    style.textContent = CHART_STYLES;
    document.head.appendChild(style);
    stylesInjected = true;
}

// ─── Tooltip Component ────────────────────────────────────────

const ChartTooltip = React.memo(function ChartTooltip({
    x,
    y,
    title,
    items,
    containerRef,
}: {
    x: number;
    y: number;
    title: string;
    items: { label: string; value: string; color: string }[];
    containerRef: React.RefObject<HTMLDivElement | null>;
}) {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ left: 0, top: 0 });

    useEffect(() => {
        if (!tooltipRef.current || !containerRef.current) return;
        const container = containerRef.current.getBoundingClientRect();
        const tt = tooltipRef.current.getBoundingClientRect();
        let left = x - container.left + 12;
        let top = y - container.top - tt.height / 2;
        // Flip if overflowing right
        if (left + tt.width > container.width) {
            left = x - container.left - tt.width - 12;
        }
        // Clamp vertical
        if (top < 0) top = 4;
        if (top + tt.height > container.height) top = container.height - tt.height - 4;
        setPos({ left, top });
    }, [x, y, containerRef]);

    return (
        <div
            ref={tooltipRef}
            className="vc-tooltip"
            style={{ left: pos.left, top: pos.top }}
        >
            <div className="vc-tooltip-title">{title}</div>
            {items.map((item, i) => (
                <div key={i} className="vc-tooltip-row">
                    <span className="vc-tooltip-dot" style={{ background: item.color }} />
                    <span className="vc-tooltip-label">{item.label}</span>
                    <span className="vc-tooltip-value">{item.value}</span>
                </div>
            ))}
        </div>
    );
});

// ─── Legend Component ─────────────────────────────────────────

const ChartLegend = React.memo(function ChartLegend({
    items,
    hiddenSeries,
    onToggle,
}: {
    items: { name: string; color: string }[];
    hiddenSeries: Set<string>;
    onToggle: (name: string) => void;
}) {
    return (
        <div className="vc-legend" role="toolbar" aria-label="Chart legend">
            {items.map((item) => (
                <button
                    key={item.name}
                    type="button"
                    className="vc-legend-item"
                    data-hidden={hiddenSeries.has(item.name) ? 'true' : undefined}
                    onClick={() => onToggle(item.name)}

                    aria-label={`${item.name}${hiddenSeries.has(item.name) ? ' (hidden)' : ''}`}
                >
                    <span
                        className="vc-legend-dot"
                        style={{ background: hiddenSeries.has(item.name) ? 'var(--fd-muted, #d4d4d8)' : item.color }}
                    />
                    {item.name}
                </button>
            ))}
        </div>
    );
});

// ─── Main Chart Component ─────────────────────────────────────

function Chart({
    type,
    series = [],
    segments = [],
    width: propWidth,
    height: propHeight = 300,
    title,
    xLabel,
    yLabel,
    grid = true,
    legend = true,
    tooltip = true,
    animated = true,
    stacked = false,
    horizontal = false,
    showPoints = true,
    curve = 'smooth',
    centerLabel,
    centerValue,
    yMin,
    yMax,
    yTicks = 5,
    isLoading = false,
    emptyMessage = 'No data available.',
    className,
    ariaLabel,
    colors = DEFAULT_COLORS,
}: ChartProps): React.ReactElement {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(propWidth ?? 600);
    const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());
    const [hoverState, setHoverState] = useState<{
        clientX: number;
        clientY: number;
        dataIndex: number;
        seriesName?: string;
        segmentIndex?: number;
    } | null>(null);

    // Inject styles
    useEffect(() => { injectStyles(); }, []);

    // ResizeObserver for responsive width
    useEffect(() => {
        if (propWidth) return;
        const el = containerRef.current;
        if (!el) return;
        const obs = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });
        obs.observe(el);
        return () => obs.disconnect();
    }, [propWidth]);

    const chartWidth = propWidth ?? containerWidth;
    const chartHeight = propHeight;

    const toggleSeries = useCallback((name: string): void => {
        setHiddenSeries((prev) => {
            const next = new Set(prev);
            if (next.has(name)) next.delete(name);
            else next.add(name);
            return next;
        });
    }, []);

    const getColor = useCallback((index: number): string => {
        return colors[index % colors.length]!;
    }, [colors]);

    // ── Filter visible series ─────────────────────────────────
    const visibleSeries = useMemo(
        () => series.filter((s) => !hiddenSeries.has(s.name)),
        [series, hiddenSeries],
    );

    // ── Determine unique X labels ─────────────────────────────
    const xLabels = useMemo(() => {
        const labelSet = new Set<string>();
        for (const s of series) {
            for (const d of s.data) {
                labelSet.add(String(d.x));
            }
        }
        return Array.from(labelSet);
    }, [series]);

    // ── Y Scale ───────────────────────────────────────────────
    const yScale = useMemo(() => {
        if (type === 'donut' || type === 'sparkline') return { min: 0, max: 1, ticks: [] };

        let dataMin = Infinity;
        let dataMax = -Infinity;

        if (stacked && (type === 'bar' || type === 'area')) {
            // Compute stacked max
            for (let xi = 0; xi < xLabels.length; xi++) {
                let sum = 0;
                for (const s of visibleSeries) {
                    const pt = s.data.find((d) => String(d.x) === xLabels[xi]);
                    if (pt) sum += Math.max(0, pt.y);
                }
                if (sum > dataMax) dataMax = sum;
                if (0 < dataMin) dataMin = 0;
            }
        } else {
            for (const s of visibleSeries) {
                for (const d of s.data) {
                    if (d.y < dataMin) dataMin = d.y;
                    if (d.y > dataMax) dataMax = d.y;
                }
            }
        }

        if (dataMin === Infinity) { dataMin = 0; dataMax = 100; }
        // Add padding
        const range = dataMax - dataMin || 1;
        const paddedMin = yMin ?? dataMin - range * 0.05;
        const paddedMax = yMax ?? dataMax + range * 0.05;

        return computeScale(paddedMin, paddedMax, yTicks, yMin, yMax);
    }, [type, visibleSeries, xLabels, stacked, yMin, yMax, yTicks]);

    // ── Chart area bounds ─────────────────────────────────────
    const pad = type === 'sparkline' ? SPARKLINE_PAD : type === 'donut' ? DONUT_PAD : PADDING;
    const plotLeft = pad.left;
    const plotRight = chartWidth - pad.right;
    const plotTop = pad.top + (title ? 20 : 0);
    const plotBottom = chartHeight - pad.bottom;
    const plotWidth = plotRight - plotLeft;
    const plotHeight = plotBottom - plotTop;

    // ── Point coordinate mappers ──────────────────────────────
    const mapX = useCallback(
        (index: number, total: number): number => {
            if (total <= 1) return plotLeft + plotWidth / 2;
            return plotLeft + (index / (total - 1)) * plotWidth;
        },
        [plotLeft, plotWidth],
    );

    const mapY = useCallback(
        (value: number): number => {
            return scaleValue(value, yScale.min, yScale.max, plotBottom, plotTop);
        },
        [yScale.min, yScale.max, plotBottom, plotTop],
    );

    // ── Handlebar X for bar chart ─────────────────────────────
    const barWidth = useMemo(() => {
        if (type !== 'bar') return 0;
        const groupCount = xLabels.length || 1;
        const seriesCount = stacked ? 1 : Math.max(visibleSeries.length, 1);
        const availableWidth = (horizontal ? plotHeight : plotWidth) * 0.7;
        return Math.min(availableWidth / groupCount / seriesCount, 48);
    }, [type, xLabels.length, visibleSeries.length, stacked, plotWidth, plotHeight, horizontal]);

    // ── Mouse interaction handler ─────────────────────────────
    const handleMouseMove = useCallback(
        (e: React.MouseEvent<SVGSVGElement>): void => {
            if (!tooltip) return;
            const svg = e.currentTarget;
            const rect = svg.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;

            if (type === 'donut') return; // donut uses per-segment hover

            // Find nearest X index
            const total = xLabels.length;
            if (total === 0) return;

            let closestIndex = 0;
            let minDist = Infinity;
            for (let i = 0; i < total; i++) {
                const px = mapX(i, total);
                const dist = Math.abs(mouseX - px);
                if (dist < minDist) {
                    minDist = dist;
                    closestIndex = i;
                }
            }

            setHoverState({
                clientX: e.clientX,
                clientY: e.clientY,
                dataIndex: closestIndex,
            });
        },
        [tooltip, type, xLabels.length, mapX],
    );

    const handleMouseLeave = useCallback((): void => {
        setHoverState(null);
    }, []);

    // ── Donut segment hover ───────────────────────────────────
    const handleDonutHover = useCallback(
        (e: React.MouseEvent, index: number): void => {
            if (!tooltip) return;
            setHoverState({
                clientX: e.clientX,
                clientY: e.clientY,
                dataIndex: index,
                segmentIndex: index,
            });
        },
        [tooltip],
    );

    // ── Build tooltip data ────────────────────────────────────
    const tooltipData = useMemo(() => {
        if (!hoverState) return null;

        if (type === 'donut' && hoverState.segmentIndex !== undefined) {
            const seg = segments[hoverState.segmentIndex];
            if (!seg) return null;
            const total = segments.reduce((s, seg2) => s + seg2.value, 0);
            const pct = total > 0 ? ((seg.value / total) * 100).toFixed(1) : '0';
            return {
                title: seg.label,
                items: [{ label: `${pct}%`, value: fmt(seg.value), color: seg.color ?? getColor(hoverState.segmentIndex) }],
            };
        }

        const label = xLabels[hoverState.dataIndex];
        if (!label) return null;

        return {
            title: String(label),
            items: visibleSeries.map((s, _si) => {
                const pt = s.data.find((d) => String(d.x) === label);
                return {
                    label: s.name,
                    value: pt ? fmt(pt.y) : '—',
                    color: s.color ?? getColor(series.indexOf(s)),
                };
            }),
        };
    }, [hoverState, type, segments, xLabels, visibleSeries, series, getColor]);

    // ── Render helpers ────────────────────────────────────────

    const renderGrid = (): React.ReactNode => {
        if (!grid || type === 'sparkline' || type === 'donut') return null;
        return (
            <g aria-hidden="true">
                {yScale.ticks.map((tick, i) => {
                    const y = mapY(tick);
                    return (
                        <line key={`grid-${i}`} x1={plotLeft} x2={plotRight} y1={y} y2={y} className="vc-grid-line" />
                    );
                })}
            </g>
        );
    };

    const renderAxes = (): React.ReactNode => {
        if (type === 'sparkline' || type === 'donut') return null;

        return (
            <g aria-hidden="true">
                {/* Y-axis line */}
                <line x1={plotLeft} x2={plotLeft} y1={plotTop} y2={plotBottom} className="vc-axis-line" />
                {/* X-axis line */}
                <line x1={plotLeft} x2={plotRight} y1={plotBottom} y2={plotBottom} className="vc-axis-line" />
                {/* Y-axis ticks */}
                {yScale.ticks.map((tick, i) => {
                    const y = mapY(tick);
                    return (
                        <text key={`ytick-${i}`} x={plotLeft - 8} y={y + 4} textAnchor="end" className="vc-tick-label">
                            {fmt(tick)}
                        </text>
                    );
                })}
                {/* X-axis ticks */}
                {xLabels.map((label, i) => {
                    const x = type === 'bar'
                        ? plotLeft + ((i + 0.5) / xLabels.length) * plotWidth
                        : mapX(i, xLabels.length);
                    return (
                        <text key={`xtick-${i}`} x={x} y={plotBottom + 16} textAnchor="middle" className="vc-tick-label">
                            {label.length > 8 ? label.slice(0, 8) + '…' : label}
                        </text>
                    );
                })}
                {/* Axis labels */}
                {xLabel && (
                    <text
                        x={plotLeft + plotWidth / 2}
                        y={chartHeight - 4}
                        textAnchor="middle"
                        className="vc-axis-label"
                    >
                        {xLabel}
                    </text>
                )}
                {yLabel && (
                    <text
                        x={14}
                        y={plotTop + plotHeight / 2}
                        textAnchor="middle"
                        className="vc-axis-label"
                        transform={`rotate(-90, 14, ${plotTop + plotHeight / 2})`}
                    >
                        {yLabel}
                    </text>
                )}
            </g>
        );
    };

    const renderCrosshair = (): React.ReactNode => {
        if (!hoverState || type === 'donut' || type === 'sparkline') return null;
        const x = type === 'bar'
            ? plotLeft + ((hoverState.dataIndex + 0.5) / xLabels.length) * plotWidth
            : mapX(hoverState.dataIndex, xLabels.length);
        return (
            <line x1={x} x2={x} y1={plotTop} y2={plotBottom} className="vc-crosshair" />
        );
    };

    const renderLine = (): React.ReactNode => {
        return visibleSeries.map((s, _si) => {
            const color = s.color ?? getColor(series.indexOf(s));
            const pts = s.data.map((d, i) => ({
                x: mapX(i, s.data.length),
                y: mapY(d.y),
            }));
            const pathD = curve === 'smooth' ? smoothPath(pts) : linearPath(pts);
            const pathLen = approxPathLength(pts);

            return (
                <g key={s.name}>
                    <path
                        d={pathD}
                        className={cn('vc-line', animated && 'vc-animate-line')}
                        stroke={color}
                        style={animated ? { strokeDasharray: pathLen, '--vc-path-len': pathLen, animationDelay: `${_si * 0.15}s` } as React.CSSProperties : undefined}
                    />
                    {showPoints &&
                        pts.map((pt, i) => (
                            <circle
                                key={i}
                                cx={pt.x}
                                cy={pt.y}
                                r={hoverState?.dataIndex === i ? 5 : 3.5}
                                fill={color}
                                className={cn('vc-point', animated && 'vc-animate-point', hoverState?.dataIndex === i && 'vc-point-active')}
                                style={animated ? { animationDelay: `${0.8 + i * 0.08}s` } : undefined}
                            />
                        ))}
                </g>
            );
        });
    };

    const renderArea = (): React.ReactNode => {
        if (stacked) {
            // Stacked area
            const cumulativeY: number[][] = [];
            for (let si = 0; si < visibleSeries.length; si++) {
                cumulativeY.push([]);
                for (let xi = 0; xi < xLabels.length; xi++) {
                    const prev = si > 0 ? cumulativeY[si - 1]![xi]! : 0;
                    const pt = visibleSeries[si]!.data.find((d) => String(d.x) === xLabels[xi]);
                    cumulativeY[si]!.push(prev + (pt?.y ?? 0));
                }
            }

            return visibleSeries.map((s, si) => {
                const color = s.color ?? getColor(series.indexOf(s));
                const topPts = cumulativeY[si]!.map((y, xi) => ({
                    x: mapX(xi, xLabels.length),
                    y: mapY(y),
                }));
                const bottomPts = (si > 0 ? cumulativeY[si - 1]! : new Array(xLabels.length).fill(0)).map((y: number, xi: number) => ({
                    x: mapX(xi, xLabels.length),
                    y: mapY(y),
                }));

                const topPath = curve === 'smooth' ? smoothPath(topPts) : linearPath(topPts);
                const bottomReversed = [...bottomPts].reverse();
                const bottomPath = bottomReversed.map((p, i) => (i === 0 ? `L${p.x},${p.y}` : `L${p.x},${p.y}`)).join('');
                const areaD = `${topPath}${bottomPath}Z`;
                const pathLen = approxPathLength(topPts);

                return (
                    <g key={s.name}>
                        <path d={areaD} fill={color} className="vc-area-fill" />
                        <path
                            d={topPath}
                            className={cn('vc-line', animated && 'vc-animate-line')}
                            stroke={color}
                            style={animated ? { strokeDasharray: pathLen, '--vc-path-len': pathLen } as React.CSSProperties : undefined}
                        />
                        {showPoints &&
                            topPts.map((pt, i) => (
                                <circle
                                    key={i}
                                    cx={pt.x}
                                    cy={pt.y}
                                    r={hoverState?.dataIndex === i ? 5 : 3.5}
                                    fill={color}
                                    className={cn('vc-point', hoverState?.dataIndex === i && 'vc-point-active')}
                                />
                            ))}
                    </g>
                );
            });
        }

        return visibleSeries.map((s, _si) => {
            const color = s.color ?? getColor(series.indexOf(s));
            const pts = s.data.map((d, i) => ({
                x: mapX(i, s.data.length),
                y: mapY(d.y),
            }));
            const pathD = curve === 'smooth' ? smoothPath(pts) : linearPath(pts);
            const areaPathD = `${pathD}L${pts[pts.length - 1]!.x},${mapY(yScale.min)}L${pts[0]!.x},${mapY(yScale.min)}Z`;
            const pathLen = approxPathLength(pts);

            return (
                <g key={s.name}>
                    <path d={areaPathD} fill={color} className="vc-area-fill" />
                    <path
                        d={pathD}
                        className={cn('vc-line', animated && 'vc-animate-line')}
                        stroke={color}
                        style={animated ? { strokeDasharray: pathLen, '--vc-path-len': pathLen } as React.CSSProperties : undefined}
                    />
                    {showPoints &&
                        pts.map((pt, i) => (
                            <circle
                                key={i}
                                cx={pt.x}
                                cy={pt.y}
                                r={hoverState?.dataIndex === i ? 5 : 3.5}
                                fill={color}
                                className={cn('vc-point', hoverState?.dataIndex === i && 'vc-point-active')}
                            />
                        ))}
                </g>
            );
        });
    };

    const renderBars = (): React.ReactNode => {
        const groupCount = xLabels.length;
        const seriesCount = stacked ? 1 : visibleSeries.length;
        const groupWidth = (horizontal ? plotHeight : plotWidth) / groupCount;
        const barGap = Math.max(2, groupWidth * 0.1);
        const effectiveBarWidth = Math.min(barWidth, (groupWidth - barGap) / seriesCount - 2);

        if (stacked) {
            return xLabels.map((label, xi) => {
                let cumY = 0;
                return visibleSeries.map((s, _si) => {
                    const pt = s.data.find((d) => String(d.x) === label);
                    const val = pt?.y ?? 0;
                    const startY = cumY;
                    cumY += val;
                    const color = s.color ?? getColor(series.indexOf(s));

                    if (horizontal) {
                        const x = scaleValue(startY, yScale.min, yScale.max, plotLeft, plotRight);
                        const w = scaleValue(startY + val, yScale.min, yScale.max, plotLeft, plotRight) - x;
                        const barY = plotTop + (xi + 0.5) * groupWidth - effectiveBarWidth / 2;
                        return (
                            <rect
                                key={`${label}-${s.name}`}
                                x={x}
                                y={barY}
                                width={Math.max(0, w)}
                                height={effectiveBarWidth}
                                fill={color}
                                className={cn('vc-bar', animated && 'vc-animate-bar-h')}
                                style={animated ? { animationDelay: `${xi * 0.06}s` } : undefined}
                            />
                        );
                    }

                    const barX = plotLeft + (xi + 0.5) * groupWidth - effectiveBarWidth / 2;
                    const barTop = mapY(startY + val);
                    const barBottom = mapY(startY);
                    const h = Math.max(0, barBottom - barTop);
                    return (
                        <rect
                            key={`${label}-${s.name}`}
                            x={barX}
                            y={barTop}
                            width={effectiveBarWidth}
                            height={h}
                            fill={color}
                            className={cn('vc-bar', animated && 'vc-animate-bar')}
                            style={animated ? { animationDelay: `${xi * 0.06}s` } : undefined}
                        />
                    );
                });
            });
        }

        return xLabels.map((label, xi) =>
            visibleSeries.map((s, si) => {
                const pt = s.data.find((d) => String(d.x) === label);
                const val = pt?.y ?? 0;
                const color = s.color ?? getColor(series.indexOf(s));
                const totalBarsWidth = seriesCount * effectiveBarWidth + (seriesCount - 1) * 2;
                const groupCenter = plotLeft + (xi + 0.5) * groupWidth;

                if (horizontal) {
                    const x = plotLeft;
                    const w = scaleValue(val, yScale.min, yScale.max, plotLeft, plotRight) - plotLeft;
                    const barY = plotTop + (xi + 0.5) * groupWidth - totalBarsWidth / 2 + si * (effectiveBarWidth + 2);
                    return (
                        <rect
                            key={`${label}-${s.name}`}
                            x={x}
                            y={barY}
                            width={Math.max(0, w)}
                            height={effectiveBarWidth}
                            fill={color}
                            className={cn('vc-bar', animated && 'vc-animate-bar-h')}
                            style={animated ? { animationDelay: `${(xi * seriesCount + si) * 0.06}s` } : undefined}
                        />
                    );
                }

                const barTop = mapY(val);
                const barBottom = mapY(Math.max(yScale.min, 0));
                const h = Math.max(0, barBottom - barTop);
                const barX = groupCenter - totalBarsWidth / 2 + si * (effectiveBarWidth + 2);

                return (
                    <rect
                        key={`${label}-${s.name}`}
                        x={barX}
                        y={barTop}
                        width={effectiveBarWidth}
                        height={h}
                        fill={color}
                        className={cn('vc-bar', animated && 'vc-animate-bar')}
                        style={animated ? { animationDelay: `${(xi * seriesCount + si) * 0.06}s` } : undefined}
                    />
                );
            }),
        );
    };

    const renderDonut = (): React.ReactNode => {
        const visibleSegments = segments; // Donut doesn't use series hiding for now
        const total = visibleSegments.reduce((s, seg) => s + seg.value, 0);
        if (total === 0) return null;

        const cx = chartWidth / 2;
        const cy = chartHeight / 2;
        const outerR = Math.min(chartWidth, chartHeight) / 2 - Math.max(pad.top, pad.left);
        const innerR = outerR * 0.6;
        const gapAngle = 0.02; // Small gap between segments

        let currentAngle = -Math.PI / 2;

        return (
            <g>
                {visibleSegments.map((seg, i) => {
                    const fraction = seg.value / total;
                    const sweepAngle = fraction * Math.PI * 2 - gapAngle;
                    const startAngle = currentAngle + gapAngle / 2;
                    const endAngle = startAngle + sweepAngle;
                    currentAngle += fraction * Math.PI * 2;
                    const color = seg.color ?? getColor(i);

                    return (
                        <path
                            key={i}
                            d={arcPath(cx, cy, outerR, innerR, startAngle, endAngle)}
                            fill={color}
                            className={cn('vc-arc', animated && 'vc-animate-arc')}
                            style={animated ? { animationDelay: `${i * 0.12}s` } : undefined}
                            onMouseMove={(e) => handleDonutHover(e, i)}
                            onMouseLeave={handleMouseLeave}
                        />
                    );
                })}
                {/* Center text */}
                {(centerValue || centerLabel) && (
                    <g className={animated ? 'vc-animate-center' : undefined}>
                        {centerValue && (
                            <text x={cx} y={cy + (centerLabel ? -4 : 6)} className="vc-donut-center-value">
                                {centerValue}
                            </text>
                        )}
                        {centerLabel && (
                            <text x={cx} y={cy + (centerValue ? 18 : 6)} className="vc-donut-center-label">
                                {centerLabel}
                            </text>
                        )}
                    </g>
                )}
            </g>
        );
    };

    const renderScatter = (): React.ReactNode => {
        return visibleSeries.map((s, _si) => {
            const color = s.color ?? getColor(series.indexOf(s));
            // For scatter, x can be numeric
            const xValues = s.data.map((d) => (typeof d.x === 'number' ? d.x : parseFloat(String(d.x)) || 0));
            const xMin = Math.min(...xValues);
            const xMax = Math.max(...xValues);

            return s.data.map((d, i) => {
                const xVal = typeof d.x === 'number' ? d.x : parseFloat(String(d.x)) || 0;
                const px = scaleValue(xVal, xMin, xMax, plotLeft, plotRight);
                const py = mapY(d.y);

                return (
                    <circle
                        key={`${s.name}-${i}`}
                        cx={px}
                        cy={py}
                        r={5}
                        fill={color}
                        className={cn('vc-scatter-point', animated && 'vc-animate-scatter')}
                        style={animated ? { animationDelay: `${i * 0.04}s` } : undefined}
                    />
                );
            });
        });
    };

    const renderSparkline = (): React.ReactNode => {
        if (visibleSeries.length === 0) return null;
        const s = visibleSeries[0]!;
        const color = s.color ?? getColor(0);

        const yValues = s.data.map((d) => d.y);
        const sparkMin = Math.min(...yValues);
        const sparkMax = Math.max(...yValues);
        const sparkRange = sparkMax - sparkMin || 1;

        const pts = s.data.map((d, i) => ({
            x: lerp(SPARKLINE_PAD.left, chartWidth - SPARKLINE_PAD.right, s.data.length <= 1 ? 0.5 : i / (s.data.length - 1)),
            y: lerp(chartHeight - SPARKLINE_PAD.bottom, SPARKLINE_PAD.top, (d.y - sparkMin) / sparkRange),
        }));

        const pathD = smoothPath(pts);
        const areaPathD = pts.length > 0
            ? `${pathD}L${pts[pts.length - 1]!.x},${chartHeight - SPARKLINE_PAD.bottom}L${pts[0]!.x},${chartHeight - SPARKLINE_PAD.bottom}Z`
            : '';

        return (
            <g>
                <path d={areaPathD} fill={color} className="vc-sparkline-area" />
                <path d={pathD} stroke={color} className="vc-sparkline-line" />
                {/* End dot */}
                {pts.length > 0 && (
                    <circle
                        cx={pts[pts.length - 1]!.x}
                        cy={pts[pts.length - 1]!.y}
                        r={2.5}
                        fill={color}
                    />
                )}
            </g>
        );
    };

    // ── Legend items ───────────────────────────────────────────
    const legendItems = useMemo(() => {
        if (type === 'donut') {
            return segments.map((seg, i) => ({
                name: seg.label,
                color: seg.color ?? getColor(i),
            }));
        }
        return series.map((s, i) => ({
            name: s.name,
            color: s.color ?? getColor(i),
        }));
    }, [type, segments, series, getColor]);

    // ── Loading skeleton ──────────────────────────────────────
    if (isLoading) {
        return (
            <div className={cn('vc-root', className)}>
                <div className="vc-skeleton" style={{ width: '100%', height: chartHeight }} />
            </div>
        );
    }

    // ── Empty state ───────────────────────────────────────────
    const hasData = type === 'donut' ? segments.length > 0 : series.length > 0 && series.some((s) => s.data.length > 0);
    if (!hasData) {
        return (
            <div className={cn('vc-root', className)}>
                <div className="vc-empty" style={{ width: '100%', height: chartHeight }}>
                    {emptyMessage}
                </div>
            </div>
        );
    }

    // ── Build accessible data table for screen readers ────────
    const accessibleTable = type !== 'sparkline' && (
        <table style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            <caption>{ariaLabel ?? title ?? 'Chart data'}</caption>
            {type === 'donut' ? (
                <tbody>
                    {segments.map((seg) => (
                        <tr key={seg.label}>
                            <td>{seg.label}</td>
                            <td>{seg.value}</td>
                        </tr>
                    ))}
                </tbody>
            ) : (
                <>
                    <thead>
                        <tr>
                            <th scope="col">Category</th>
                            {series.map((s) => (
                                <th key={s.name} scope="col">{s.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {xLabels.map((label) => (
                            <tr key={label}>
                                <td>{label}</td>
                                {series.map((s) => {
                                    const pt = s.data.find((d) => String(d.x) === label);
                                    return <td key={s.name}>{pt ? fmt(pt.y) : '—'}</td>;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </>
            )}
        </table>
    );


    // ── Render chart body ─────────────────────────────────────
    const renderChartBody = (): React.ReactNode => {
        switch (type) {
            case 'line':
                return renderLine();
            case 'area':
                return renderArea();
            case 'bar':
                return renderBars();
            case 'donut':
                return renderDonut();
            case 'scatter':
                return renderScatter();
            case 'sparkline':
                return renderSparkline();
            default:
                return null;
        }
    };

    return (
        <div ref={containerRef} className={cn('vc-root', className)} style={{ position: 'relative' }}>
            <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="vc-svg"
                role="img"
                aria-label={ariaLabel ?? title ?? 'Chart'}
                onMouseMove={type !== 'donut' && type !== 'sparkline' ? handleMouseMove : undefined}
                onMouseLeave={handleMouseLeave}
            >
                {/* Title */}
                {title && type !== 'sparkline' && (
                    <text x={plotLeft} y={pad.top + 2} className="vc-title">{title}</text>
                )}
                {/* Grid */}
                {renderGrid()}
                {/* Axes */}
                {renderAxes()}
                {/* Chart data */}
                {renderChartBody()}
                {/* Crosshair */}
                {tooltip && renderCrosshair()}
            </svg>

            {/* Tooltip overlay */}
            {tooltip && hoverState && tooltipData && (
                <ChartTooltip
                    x={hoverState.clientX}
                    y={hoverState.clientY}
                    title={tooltipData.title}
                    items={tooltipData.items}
                    containerRef={containerRef}
                />
            )}

            {/* Legend */}
            {legend && type !== 'sparkline' && legendItems.length > 1 && (
                <ChartLegend
                    items={legendItems}
                    hiddenSeries={hiddenSeries}
                    onToggle={type === 'donut' ? () => { } : toggleSeries}
                />
            )}

            {/* Screen reader data table */}
            {accessibleTable}
        </div>
    );
}

Chart.displayName = 'Chart';

export { Chart };
export type {
    ChartProps,
    ChartType,
    ChartSeries,
    ChartDataPoint,
    DonutSegment,
};
