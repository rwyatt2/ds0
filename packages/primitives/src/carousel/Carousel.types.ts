import type React from 'react';
export interface UseCarouselProps { totalSlides: number; orientation?: 'horizontal' | 'vertical'; loop?: boolean; autoPlay?: boolean; autoPlayInterval?: number; }
export interface UseCarouselReturn { carouselProps: React.HTMLAttributes<HTMLDivElement>; currentSlide: number; goToSlide: (index: number) => void; goToNext: () => void; goToPrevious: () => void; canGoNext: boolean; canGoPrevious: boolean; }
export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> { orientation?: 'horizontal' | 'vertical'; loop?: boolean; autoPlay?: boolean; autoPlayInterval?: number; children: React.ReactNode; }
export interface StyledCarouselProps extends CarouselProps { variant?: 'default' | 'card'; className?: string; }
