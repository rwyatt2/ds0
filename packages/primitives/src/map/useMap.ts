import type { UseMapProps, UseMapReturn } from './Map.types';

export function useMap(props: UseMapProps = {}): UseMapReturn {
    const { center = { lat: 0, lng: 0 }, zoom = 10, markers = [] } = props;
    return {
        mapProps: {
            role: 'img',
            'aria-label': `Map centered at ${center.lat.toFixed(2)}, ${center.lng.toFixed(2)} with ${markers.length} markers`,
        },
    };
}
