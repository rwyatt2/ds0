import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useMap } from '@ds0/primitives';
import type { StyledMapProps } from '@ds0/primitives';

const Map = forwardRef<HTMLDivElement, StyledMapProps>(
    ({ className, variant = 'default', center, zoom, markers = [], onMarkerClick, width = '100%', height = 400, ...props }, ref) => {
        const { mapProps } = useMap({ center, zoom, markers, onMarkerClick });
        const isDark = variant === 'dark';
        return (
            <div ref={ref} className={cn('relative overflow-hidden rounded-lg border', isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-100 border-border', className)} style={{ width, height }} {...props} {...mapProps}>
                <div className={cn('absolute inset-0 flex items-center justify-center', isDark ? 'text-zinc-600' : 'text-slate-400')}>
                    <div className="text-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto opacity-50"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        <p className="text-sm font-medium">Map Container</p>
                        <p className="text-xs opacity-60">Connect your map provider (Mapbox, Google Maps, Leaflet)</p>
                    </div>
                </div>
                {markers.length > 0 && (
                    <div className="absolute bottom-3 left-3 right-3">
                        <div className={cn('rounded-md p-2 text-xs', isDark ? 'bg-zinc-800/90 text-zinc-300' : 'bg-white/90 text-slate-700 shadow-sm')}>
                            {markers.length} marker{markers.length !== 1 ? 's' : ''} • {center ? `${center.lat.toFixed(2)}, ${center.lng.toFixed(2)}` : 'No center set'}
                        </div>
                    </div>
                )}
            </div>
        );
    },
);
Map.displayName = 'Map';
export { Map };
export type { StyledMapProps as MapProps };
