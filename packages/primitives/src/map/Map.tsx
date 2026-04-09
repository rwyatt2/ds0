import { forwardRef } from 'react';
import type { MapProps } from './Map.types';
import { useMap } from './useMap';

const MapPrimitive = forwardRef<HTMLDivElement, MapProps>(
    ({ center, zoom, markers, onMarkerClick, width = '100%', height = 400, ...rest }, ref) => {
        const { mapProps } = useMap({ center, zoom, markers, onMarkerClick });
        return (
            <div ref={ref} style={{ width, height, position: 'relative', overflow: 'hidden', backgroundColor: '#e5e7eb', borderRadius: 8 }} {...rest} {...mapProps}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: 14 }}>
                    Map Container — Connect your map provider
                </div>
                {markers?.map(m => (
                    <div key={m.id} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -100%)', cursor: 'pointer' }} onClick={() => onMarkerClick?.(m)} role="button" aria-label={m.label || `Marker at ${m.lat}, ${m.lng}`}>
                        📍 {m.label || ''}
                    </div>
                ))}
            </div>
        );
    },
);
MapPrimitive.displayName = 'MapPrimitive';
export { MapPrimitive };
