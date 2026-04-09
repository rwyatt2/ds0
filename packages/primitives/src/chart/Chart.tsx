import { forwardRef } from 'react';
import type { ChartProps } from './Chart.types';
import { useChart } from './useChart';

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const ChartPrimitive = forwardRef<HTMLDivElement, ChartProps>(
    ({ type = 'bar', labels, datasets, width = 400, height = 250, title, showLegend = true, showGrid = true, ...rest }, ref) => {
        const { chartProps } = useChart({ type, labels, datasets, width, height });
        const allValues = datasets.flatMap(d => d.data);
        const max = Math.max(...allValues, 1);

        return (
            <div ref={ref} {...rest} {...chartProps}>
                {title && <div style={{ fontWeight: 600, marginBottom: 8 }}>{title}</div>}
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                    {type === 'bar' && datasets.map((ds, di) => {
                        const barWidth = (width - 60) / labels.length / datasets.length * 0.8;
                        return ds.data.map((v, i) => {
                            const barH = (v / max) * (height - 40);
                            const x = 40 + i * ((width - 60) / labels.length) + di * barWidth;
                            return <rect key={`${di}-${i}`} x={x} y={height - 20 - barH} width={barWidth} height={barH} fill={ds.color || DEFAULT_COLORS[di % DEFAULT_COLORS.length]} rx={2} />;
                        });
                    })}
                    {(type === 'line' || type === 'area') && datasets.map((ds, di) => {
                        const points = ds.data.map((v, i) => ({ x: 40 + i * ((width - 60) / (labels.length - 1 || 1)), y: height - 20 - (v / max) * (height - 40) }));
                        const d = points.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ');
                        const color = ds.color || DEFAULT_COLORS[di % DEFAULT_COLORS.length];
                        return (
                            <g key={di}>
                                {type === 'area' && <path d={`${d} L${points[points.length-1].x},${height-20} L${points[0].x},${height-20} Z`} fill={color} opacity={0.15} />}
                                <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
                            </g>
                        );
                    })}
                </svg>
                {showLegend && datasets.length > 1 && (
                    <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                        {datasets.map((ds, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                                <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: ds.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length] }} />
                                {ds.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    },
);
ChartPrimitive.displayName = 'ChartPrimitive';
export { ChartPrimitive };
