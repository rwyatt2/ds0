import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useHeatMap } from '@ds0/primitives';
import type { StyledHeatMapProps } from '@ds0/primitives';

const colorScales: Record<string, [number, number, number]> = {
    blue: [59, 130, 246], green: [16, 185, 129], red: [239, 68, 68], purple: [139, 92, 246],
};
const cellSizes = { sm: 'w-6 h-6 text-[9px]', md: 'w-8 h-8 text-[10px]', lg: 'w-10 h-10 text-xs' };

const HeatMap = forwardRef<HTMLDivElement, StyledHeatMapProps>(
    ({ className, variant = 'default', colorScale = 'blue', size = 'md', data, rowLabels, colLabels, minValue, maxValue, title, showValues = true, ...props }, ref) => {
        const { heatMapProps, cells } = useHeatMap({ data, rowLabels, colLabels, minValue, maxValue });
        const cols = data[0]?.length || 0;
        const rgb = colorScales[colorScale] || colorScales.blue;
        const isDark = variant === 'dark';

        return (
            <div ref={ref} className={cn('rounded-lg', isDark ? 'bg-zinc-950 border border-zinc-800 p-4' : 'bg-card border p-4', className)} {...heatMapProps} {...props}>
                {title && <p className="text-sm font-semibold mb-3">{title}</p>}
                <div className="overflow-auto">
                    {colLabels && (
                        <div className="flex" style={{ marginLeft: rowLabels ? '3rem' : 0 }}>
                            {colLabels.map((l, i) => <div key={i} className={cn('text-center text-[10px] text-muted-foreground', cellSizes[size])}>{l}</div>)}
                        </div>
                    )}
                    {data.map((row, ri) => (
                        <div key={ri} className="flex items-center">
                            {rowLabels && <span className="w-12 text-right pr-2 text-[10px] text-muted-foreground shrink-0">{rowLabels[ri]}</span>}
                            {row.map((v, ci) => {
                                const cell = cells.find(c => c.row === ri && c.col === ci)!;
                                return (
                                    <div
                                        key={ci}
                                        className={cn('flex items-center justify-center rounded-sm m-0.5 font-medium transition-colors', cellSizes[size])}
                                        style={{ backgroundColor: `rgba(${rgb.join(',')}, ${0.1 + cell.intensity * 0.85})`, color: cell.intensity > 0.5 ? 'white' : isDark ? '#d4d4d8' : '#374151' }}
                                        title={`${rowLabels?.[ri] || `Row ${ri}`}, ${colLabels?.[ci] || `Col ${ci}`}: ${v}`}
                                    >
                                        {showValues ? v : ''}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div className={cn('flex items-center gap-1 mt-3', isDark ? 'text-zinc-500' : 'text-muted-foreground')}>
                    <span className="text-[10px]">Low</span>
                    <div className="flex gap-px">{[0.1, 0.3, 0.5, 0.7, 0.9].map(o => <div key={o} className="w-4 h-3 rounded-sm" style={{ backgroundColor: `rgba(${rgb.join(',')}, ${o})` }} />)}</div>
                    <span className="text-[10px]">High</span>
                </div>
            </div>
        );
    },
);
HeatMap.displayName = 'HeatMap';
export { HeatMap };
export type { StyledHeatMapProps as HeatMapProps };
