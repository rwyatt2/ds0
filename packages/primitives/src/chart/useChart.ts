import type { UseChartProps, UseChartReturn } from './Chart.types';

export function useChart(props: UseChartProps): UseChartReturn {
    const { type = 'bar', labels, datasets } = props;
    const totalPoints = datasets.reduce((sum, d) => sum + d.data.length, 0);
    return {
        chartProps: {
            role: 'img',
            'aria-label': `${type} chart with ${datasets.length} dataset${datasets.length !== 1 ? 's' : ''} and ${labels.length} labels`,
        },
    };
}
