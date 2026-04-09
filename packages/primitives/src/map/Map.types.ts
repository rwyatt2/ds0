import type React from 'react';

export interface MapMarker { id: string; lat: number; lng: number; label?: string; }
export interface UseMapProps { center?: { lat: number; lng: number }; zoom?: number; markers?: MapMarker[]; onMarkerClick?: (marker: MapMarker) => void; }
export interface UseMapReturn { mapProps: React.HTMLAttributes<HTMLDivElement>; }

export interface MapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseMapProps { width?: number | string; height?: number | string; }
export interface StyledMapProps extends MapProps { variant?: 'default' | 'dark'; className?: string; }
