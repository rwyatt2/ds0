import React from 'react';

import { cn } from '@ds0/primitives';

import { Card } from '@ds0/components/react/card';
import { Stack } from '@ds0/components/react/stack';
import { Heading } from '@ds0/components/react/heading';
import { Text } from '@ds0/components/react/text';
import { Badge } from '@ds0/components/react/badge';
import { Skeleton } from '@ds0/components/react/skeleton';

/**
 * A single stat item.
 */
interface StatItem {
    /** Stat label */
    label: string;
    /** Stat value */
    value: string | number;
    /** Change percentage (positive = up, negative = down) */
    change?: number;
    /** Change period description */
    changePeriod?: string;
    /** Icon to display */
    icon?: React.ReactNode;
}

/**
 * Props for the DashboardStats recipe component.
 */
interface DashboardStatsProps {
    /** Array of stat items */
    stats: StatItem[];
    /** Number of columns (1-4) */
    columns?: 1 | 2 | 3 | 4;
    /** Loading state */
    isLoading?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Trend arrow SVGs.
 */
function TrendUp(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-green-600">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
        </svg>
    );
}

function TrendDown(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-red-600">
            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" />
        </svg>
    );
}

/**
 * DashboardStats recipe.
 * A row of metric cards with trend indicators, responsive grid layout.
 *
 * @example
 * ```tsx
 * <DashboardStats
 *   stats={[
 *     { label: 'Revenue', value: '$45,231', change: 12.5, changePeriod: 'from last month' },
 *     { label: 'Users', value: '2,350', change: -3.1, changePeriod: 'from last month' },
 *   ]}
 * />
 * ```
 */
function DashboardStats({
    stats,
    columns = 4,
    isLoading = false,
    className,
}: DashboardStatsProps): React.ReactElement {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    };

    if (isLoading) {
        return (
            <div className={cn('grid gap-4', gridCols[columns], className)}>
                {Array.from({ length: columns }).map((_, i) => (
                    <Card key={i}>
                        <Card.Content className="p-6">
                            <Stack gap="3">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-32" />
                                <Skeleton className="h-4 w-20" />
                            </Stack>
                        </Card.Content>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className={cn('grid gap-4', gridCols[columns], className)}>
            {stats.map((stat) => (
                <Card key={stat.label}>
                    <Card.Content className="p-6">
                        <Stack gap="1">
                            <Stack direction="horizontal" justify="between" align="center">
                                <Text size="sm" color="muted" weight="medium">
                                    {stat.label}
                                </Text>
                                {stat.icon && (
                                    <span className="text-muted-foreground">{stat.icon}</span>
                                )}
                            </Stack>
                            <Heading as="h3" size="2xl" weight="bold" tracking="tight">
                                {stat.value}
                            </Heading>
                            {stat.change !== undefined && (
                                <Stack direction="horizontal" gap="1" align="center">
                                    {stat.change >= 0 ? <TrendUp /> : <TrendDown />}
                                    <Text
                                        as="span"
                                        size="xs"
                                        className={stat.change >= 0 ? 'text-green-600' : 'text-red-600'}
                                    >
                                        {stat.change >= 0 ? '+' : ''}{stat.change}%
                                    </Text>
                                    {stat.changePeriod && (
                                        <Text as="span" size="xs" color="muted">
                                            {stat.changePeriod}
                                        </Text>
                                    )}
                                </Stack>
                            )}
                        </Stack>
                    </Card.Content>
                </Card>
            ))}
        </div>
    );
}

DashboardStats.displayName = 'DashboardStats';

export { DashboardStats };
export type { DashboardStatsProps, StatItem };
