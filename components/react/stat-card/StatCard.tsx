import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useStatCard } from '@ds0/primitives';
import type { StyledStatCardProps } from '@ds0/primitives';

const statCardVariants = cva('rounded-xl', {
    variants: {
        variant: { default: 'bg-card text-card-foreground shadow-sm border', outlined: 'border-2 bg-transparent' },
        size: { sm: 'p-3', md: 'p-4', lg: 'p-6' },
    },
    defaultVariants: { variant: 'default', size: 'md' },
});

const TrendArrow = ({ direction }: { direction: 'up' | 'down' | 'neutral' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={direction === 'up' ? 'rotate-0' : direction === 'down' ? 'rotate-180' : 'rotate-90'}>
        <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
    </svg>
);

const StatCard = forwardRef<HTMLDivElement, StyledStatCardProps>(
    ({ className, variant, size, label, value, trend, trendLabel, icon, ...props }, ref) => {
        const { statCardProps, trendDirection } = useStatCard({ label, value, trend, trendLabel });
        return (
            <div ref={ref} className={cn(statCardVariants({ variant, size }), className)} {...props} {...statCardProps}>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    {icon && <span className="text-muted-foreground" aria-hidden="true">{icon}</span>}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                    <p className="text-2xl font-bold tracking-tight">{value}</p>
                    {trend !== undefined && (
                        <span className={cn('inline-flex items-center gap-0.5 text-xs font-medium', trendDirection === 'up' ? 'text-emerald-600' : trendDirection === 'down' ? 'text-red-600' : 'text-muted-foreground')}>
                            <TrendArrow direction={trendDirection} />
                            {Math.abs(trend)}%
                        </span>
                    )}
                </div>
                {trendLabel && <p className="mt-1 text-xs text-muted-foreground">{trendLabel}</p>}
            </div>
        );
    },
);
StatCard.displayName = 'StatCard';
export { StatCard, statCardVariants };
export type { StyledStatCardProps as StatCardProps };
