import type { UseSparklineProps, UseSparklineReturn } from './Sparkline.types';

export function useSparkline(props: UseSparklineProps): UseSparklineReturn {
    const { data, width = 120, height = 32, strokeWidth = 1.5 } = props;

    if (!data.length) return { sparklineProps: { role: 'img', 'aria-label': 'Sparkline: no data' }, pathD: '', fillD: '', lastPoint: null };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = strokeWidth;

    const points = data.map((v, i) => ({
        x: padding + (i / (data.length - 1 || 1)) * (width - padding * 2),
        y: padding + (1 - (v - min) / range) * (height - padding * 2),
    }));

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
    const fillD = `${pathD} L ${points[points.length - 1].x.toFixed(2)} ${height} L ${points[0].x.toFixed(2)} ${height} Z`;
    const lastPoint = points[points.length - 1] || null;

    const trend = data.length >= 2 ? (data[data.length - 1] >= data[0] ? 'up' : 'down') : 'flat';

    return {
        sparklineProps: {
            role: 'img',
            'aria-label': `Sparkline: ${data.length} data points, trend ${trend}`,
        },
        pathD, fillD, lastPoint,
    };
}
