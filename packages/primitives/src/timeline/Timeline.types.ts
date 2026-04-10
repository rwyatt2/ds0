import type React from 'react';
export interface UseTimelineProps { orientation?: 'vertical' | 'horizontal'; }
export interface UseTimelineReturn { timelineProps: React.HTMLAttributes<HTMLOListElement> & { 'data-orientation'?: string }; }
export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> { orientation?: 'vertical' | 'horizontal'; children: React.ReactNode; }
export interface StyledTimelineProps extends TimelineProps { variant?: 'default' | 'alternate' | 'right'; size?: 'sm' | 'md' | 'lg'; className?: string; }
export interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> { children: React.ReactNode; }
