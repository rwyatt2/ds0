import { forwardRef } from 'react';
import type { AvatarPrimitiveProps } from './Avatar.types';
import { useAvatar } from './useAvatar';

const AvatarPrimitive = forwardRef<HTMLDivElement, AvatarPrimitiveProps>(
    ({ src, alt, fallback, ...rest }, ref) => {
        const { imageProps, imageState } = useAvatar({ src, alt });

        const renderFallback = () => {
            if (typeof fallback === 'string') {
                return <span aria-hidden="true">{fallback.slice(0, 2).toUpperCase()}</span>;
            }
            return fallback ?? <span aria-hidden="true">{alt?.slice(0, 2).toUpperCase()}</span>;
        };

        return (
            <div ref={ref} role={imageState !== 'loaded' ? 'img' : undefined} aria-label={imageState !== 'loaded' ? alt : undefined} {...rest}>
                {imageState === 'loaded' ? <img {...imageProps} /> : renderFallback()}
            </div>
        );
    },
);

AvatarPrimitive.displayName = 'AvatarPrimitive';
export { AvatarPrimitive };
