import type React from 'react';

export interface UseSparklineProps { data: number[]; width?: number; height?: number; strokeWidth?: number; color?: string; fillOpacity?: number; showDot?: boolean; }
export interface UseSparklineReturn { sparklineProps: React.SVGAttributes<SVGSVGElement>; pathD: string; fillD: string; lastPoint: { x: number; y: number } | null; }

export interface SparklineProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'children' | 'width' | 'height' | 'fillOpacity' | 'strokeWidth' | 'color'>, UseSparklineProps {}
export interface StyledSparklineProps extends SparklineProps { variant?: 'default' | 'success' | 'danger'; size?: 'sm' | 'md' | 'lg'; animated?: boolean; className?: string; }
