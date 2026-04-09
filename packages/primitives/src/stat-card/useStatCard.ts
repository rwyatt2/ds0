import type { UseStatCardProps, UseStatCardReturn } from './StatCard.types';

export function useStatCard(props: UseStatCardProps): UseStatCardReturn {
    const { label, value, trend, trendLabel } = props;
    const trendDirection = trend === undefined || trend === 0 ? 'neutral' : trend > 0 ? 'up' : 'down';
    const trendText = trend !== undefined ? `${trend > 0 ? '+' : ''}${trend}%${trendLabel ? ` ${trendLabel}` : ''}` : '';
    return {
        statCardProps: {
            role: 'group',
            'aria-label': `${label}: ${value}${trendText ? `, ${trendText}` : ''}`,
        },
        trendDirection,
    };
}
