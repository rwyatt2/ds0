import { forwardRef } from 'react';
import type { HeatMapProps } from './HeatMap.types';
import { useHeatMap } from './useHeatMap';

const HeatMapPrimitive = forwardRef<HTMLDivElement, HeatMapProps>(
    ({ data, rowLabels, colLabels, minValue, maxValue, title, showValues, ...rest }, ref) => {
        const { heatMapProps, cells } = useHeatMap({ data, rowLabels, colLabels, minValue, maxValue });
        const cols = data[0]?.length || 0;
        return (
            <div ref={ref} {...rest} {...heatMapProps}>
                {title && <div>{title}</div>}
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 1 }}>
                    {cells.map((c, i) => (
                        <div key={i} style={{ backgroundColor: `rgba(59, 130, 246, ${c.intensity})`, padding: 4, textAlign: 'center', fontSize: 12 }}>
                            {showValues ? c.value : ''}
                        </div>
                    ))}
                </div>
            </div>
        );
    },
);
HeatMapPrimitive.displayName = 'HeatMapPrimitive';
export { HeatMapPrimitive };
