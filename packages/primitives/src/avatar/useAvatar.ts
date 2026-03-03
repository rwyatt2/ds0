import { useEffect, useState } from 'react';
import type { UseAvatarProps, UseAvatarReturn } from './Avatar.types';

export function useAvatar(props: UseAvatarProps = {}): UseAvatarReturn {
    const { src, alt } = props;
    const [imageState, setImageState] = useState<UseAvatarReturn['imageState']>(src ? 'loading' : 'error');

    useEffect(() => {
        if (!src) { setImageState('error'); return; }
        setImageState('loading');
        const img = new Image();
        img.src = src;
        img.onload = () => setImageState('loaded');
        img.onerror = () => setImageState('error');
    }, [src]);

    return {
        imageProps: { src, alt, onError: () => setImageState('error') },
        imageState,
    };
}
