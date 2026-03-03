import type React from 'react';
export interface UseSpinnerProps { label?: string; }
export interface UseSpinnerReturn { spinnerProps: React.HTMLAttributes<HTMLDivElement>; }
export interface SpinnerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement>, UseSpinnerProps { children?: React.ReactNode; }
export interface StyledSpinnerProps extends SpinnerPrimitiveProps { size?: 'sm' | 'md' | 'lg'; className?: string; }
