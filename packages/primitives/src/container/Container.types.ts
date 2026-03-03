import type React from 'react';
export interface UseContainerProps { as?: React.ElementType; }
export interface UseContainerReturn { Element: React.ElementType; }
export interface ContainerPrimitiveProps extends React.HTMLAttributes<HTMLElement>, UseContainerProps { children: React.ReactNode; }
export interface StyledContainerProps extends ContainerPrimitiveProps {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'; padding?: boolean; center?: boolean; className?: string;
}
