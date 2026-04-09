import { forwardRef } from 'react';
import type { StatCardProps } from './StatCard.types';
import { useStatCard } from './useStatCard';

const StatCardPrimitive = forwardRef<HTMLDivElement, StatCardProps>(
    ({ label, value, trend, trendLabel, ...rest }, ref) => {
        const { statCardProps, trendDirection } = useStatCard({ label, value, trend, trendLabel });
        return (
            <div ref={ref} {...rest} {...statCardProps}>
                <div>{label}</div>
                <div>{value}</div>
                {trend !== undefined && (
                    <div>{trendDirection === 'up' ? '↑' : trendDirection === 'down' ? '↓' : '→'} {trend}%{trendLabel && ` ${trendLabel}`}</div>
                )}
            </div>
        );
    },
);
StatCardPrimitive.displayName = 'StatCardPrimitive';
export { StatCardPrimitive };
