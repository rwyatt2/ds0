import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useChart } from '@ds0/primitives';
import type { StyledChartProps } from '@ds0/primitives';

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
const sizeMap = { sm: { w: 300, h: 180 }, md: { w: 450, h: 280 }, lg: { w: 600, h: 380 } };

const Chart = forwardRef<HTMLDivElement, StyledChartProps>(
    ({ className, variant = 'default', size = 'md', type = 'bar', labels, datasets, title, showLegend = true, showGrid = true, ...props }, ref) => {
        const { chartProps } = useChart({ type, labels, datasets });
        const { w, h } = sizeMap[size];
        const padL = 50, padR = 20, padT = 10, padB = 30;
        const chartW = w - padL - padR, chartH = h - padT - padB;
        const allValues = datasets.flatMap(d => d.data);
        const max = Math.max(...allValues, 1);

        const gridLines = 5;
        return (
            <div ref={ref} className={cn('rounded-lg', variant === 'default' ? 'border bg-card p-4' : '', className)} {...props}>
                {title && <p className="text-sm font-semibold mb-3">{title}</p>}
                <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} {...chartProps}>
                    {showGrid && Array.from({ length: gridLines + 1 }, (_, i) => {
                        const y = padT + (i / gridLines) * chartH;
                        const val = Math.round(max - (i / gridLines) * max);
                        return (<g key={i}><line x1={padL} y1={y} x2={w - padR} y2={y} stroke="currentColor" strokeOpacity={0.08} /><text x={padL - 8} y={y + 4} textAnchor="end" fontSize={10} fill="currentColor" opacity={0.4}>{val}</text></g>);
                    })}
                    {labels.map((l, i) => {
                        const x = padL + (i + 0.5) * (chartW / labels.length);
                        return <text key={i} x={x} y={h - 5} textAnchor="middle" fontSize={10} fill="currentColor" opacity={0.5}>{l}</text>;
                    })}
                    {type === 'bar' && datasets.map((ds, di) => {
                        const bw = (chartW / labels.length / datasets.length) * 0.7;
                        return ds.data.map((v, i) => {
                            const barH = (v / max) * chartH;
                            const x = padL + i * (chartW / labels.length) + di * bw + (chartW / labels.length - bw * datasets.length) / 2;
                            const color = ds.color || DEFAULT_COLORS[di % DEFAULT_COLORS.length];
                            return <rect key={`${di}-${i}`} x={x} y={padT + chartH - barH} width={bw} height={barH} fill={color} rx={3} className="transition-all duration-300 hover:opacity-80" />;
                        });
                    })}
                    {(type === 'line' || type === 'area') && datasets.map((ds, di) => {
                        const pts = ds.data.map((v, i) => ({ x: padL + (i + 0.5) * (chartW / labels.length), y: padT + chartH - (v / max) * chartH }));
                        const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
                        const color = ds.color || DEFAULT_COLORS[di % DEFAULT_COLORS.length];
                        return (<g key={di}>{type === 'area' && <path d={`${d} L${pts[pts.length-1].x},${padT+chartH} L${pts[0].x},${padT+chartH} Z`} fill={color} opacity={0.1} />}<path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />{pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} className="transition-all duration-200" />)}</g>);
                    })}
                </svg>
                {showLegend && datasets.length > 1 && (
                    <div className="flex items-center gap-4 mt-3">{datasets.map((ds, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: ds.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length] }} />{ds.label}</div>
                    ))}</div>
                )}
            </div>
        );
    },
);
Chart.displayName = 'Chart';
export { Chart };
export type { StyledChartProps as ChartProps };
