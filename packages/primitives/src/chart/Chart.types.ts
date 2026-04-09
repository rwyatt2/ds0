import type React from 'react';

export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'donut';
export interface ChartDataset { label: string; data: number[]; color?: string; }
export interface UseChartProps { type?: ChartType; labels: string[]; datasets: ChartDataset[]; width?: number; height?: number; }
export interface UseChartReturn { chartProps: React.HTMLAttributes<HTMLDivElement>; }

export interface ChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseChartProps { title?: string; showLegend?: boolean; showGrid?: boolean; }
export interface StyledChartProps extends ChartProps { variant?: 'default' | 'minimal'; size?: 'sm' | 'md' | 'lg'; className?: string; }
