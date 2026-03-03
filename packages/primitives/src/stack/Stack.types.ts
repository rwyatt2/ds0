import type React from 'react';
export interface UseStackProps { as?: React.ElementType; }
export interface UseStackReturn { Element: React.ElementType; }
export interface StackPrimitiveProps extends React.HTMLAttributes<HTMLElement>, UseStackProps { children: React.ReactNode; }
export interface StyledStackProps extends StackPrimitiveProps {
    direction?: 'vertical' | 'horizontal'; gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    wrap?: boolean; className?: string;
}
