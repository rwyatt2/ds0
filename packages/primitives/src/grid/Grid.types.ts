import type React from 'react';
export interface UseGridProps { as?: React.ElementType; }
export interface UseGridReturn { Element: React.ElementType; }
export interface GridPrimitiveProps extends React.HTMLAttributes<HTMLElement>, UseGridProps { children: React.ReactNode; }
export interface StyledGridProps extends GridPrimitiveProps {
    columns?: 1 | 2 | 3 | 4 | 5 | 6 | 12; gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8'; className?: string;
}
