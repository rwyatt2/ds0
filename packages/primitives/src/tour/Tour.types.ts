import type React from 'react';
export interface TourStep { id: string; title: string; content: string; target?: string; placement?: 'top' | 'bottom' | 'left' | 'right'; }
export interface UseTourProps { steps: TourStep[]; active?: boolean; onComplete?: () => void; onSkip?: () => void; }
export interface UseTourReturn { tourProps: React.HTMLAttributes<HTMLDivElement>; currentStep: number; setCurrentStep: (n: number) => void; isLastStep: boolean; next: () => void; prev: () => void; }
export interface TourProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseTourProps {}
export interface StyledTourProps extends TourProps { variant?: 'default' | 'minimal'; className?: string; }
