import type React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UseBadgeProps { }
export interface UseBadgeReturn { badgeProps: React.HTMLAttributes<HTMLSpanElement>; }
export interface BadgePrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> { children: React.ReactNode; }
export interface StyledBadgeProps extends BadgePrimitiveProps {
    variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'outline';
    size?: 'sm' | 'md';
    className?: string;
}
