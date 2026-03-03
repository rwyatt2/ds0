import type React from 'react';
export interface UseDividerProps { orientation?: 'horizontal' | 'vertical'; decorative?: boolean; }
export interface UseDividerReturn { dividerProps: React.HTMLAttributes<HTMLElement>; }
export interface DividerPrimitiveProps extends React.HTMLAttributes<HTMLElement>, UseDividerProps {}
export interface StyledDividerProps extends DividerPrimitiveProps { className?: string; }
