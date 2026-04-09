import type React from 'react';

export interface HeatMapCell { row: number; col: number; value: number; }
export interface UseHeatMapProps { data: number[][]; rowLabels?: string[]; colLabels?: string[]; minValue?: number; maxValue?: number; }
export interface UseHeatMapReturn { heatMapProps: React.HTMLAttributes<HTMLDivElement>; cells: { row: number; col: number; value: number; intensity: number }[]; computedMin: number; computedMax: number; }

export interface HeatMapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseHeatMapProps { title?: string; showValues?: boolean; }
export interface StyledHeatMapProps extends HeatMapProps { variant?: 'default' | 'dark'; colorScale?: 'blue' | 'green' | 'red' | 'purple'; size?: 'sm' | 'md' | 'lg'; className?: string; }
