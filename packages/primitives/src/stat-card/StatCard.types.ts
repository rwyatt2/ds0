import type React from 'react';

export interface UseStatCardProps {
    /** Metric label */ label: string;
    /** Metric value */ value: string | number;
    /** Percentage change */ trend?: number;
    /** Trend description */ trendLabel?: string;
}

export interface UseStatCardReturn {
    statCardProps: React.HTMLAttributes<HTMLDivElement>;
    trendDirection: 'up' | 'down' | 'neutral';
}

export interface StatCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'value'>, UseStatCardProps {}

export interface StyledStatCardProps extends StatCardProps {
    variant?: 'default' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    className?: string;
}
