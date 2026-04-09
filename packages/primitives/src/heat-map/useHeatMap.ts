import type { UseHeatMapProps, UseHeatMapReturn } from './HeatMap.types';

export function useHeatMap(props: UseHeatMapProps): UseHeatMapReturn {
    const { data, minValue, maxValue } = props;
    const allValues = data.flat();
    const computedMin = minValue ?? Math.min(...allValues);
    const computedMax = maxValue ?? Math.max(...allValues);
    const range = computedMax - computedMin || 1;

    const cells = data.flatMap((row, ri) =>
        row.map((value, ci) => ({
            row: ri, col: ci, value,
            intensity: (value - computedMin) / range,
        }))
    );

    return {
        heatMapProps: {
            role: 'img',
            'aria-label': `Heat map with ${data.length} rows and ${data[0]?.length || 0} columns`,
        },
        cells, computedMin, computedMax,
    };
}
