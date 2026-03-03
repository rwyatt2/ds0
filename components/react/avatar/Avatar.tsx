import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useAvatar } from '@ds0/primitives';
import type { StyledAvatarProps } from '@ds0/primitives';

const avatarVariants = cva(
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-muted font-medium',
    {
        variants: {
            size: { xs: 'h-6 w-6 text-xs', sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base', xl: 'h-16 w-16 text-lg' },
            shape: { circle: 'rounded-full', square: 'rounded-md' },
        },
        defaultVariants: { size: 'md', shape: 'circle' },
    },
);

type AvatarVariantProps = VariantProps<typeof avatarVariants>;
interface AvatarProps extends StyledAvatarProps, AvatarVariantProps { }

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, size, shape, src, alt, fallback, ...props }, ref) => {
        const { imageProps, imageState } = useAvatar({ src, alt });

        const renderFallback = () => {
            if (typeof fallback === 'string') return <span className="select-none" aria-hidden="true">{fallback.slice(0, 2).toUpperCase()}</span>;
            return fallback ?? <span className="select-none" aria-hidden="true">{alt?.slice(0, 2).toUpperCase()}</span>;
        };

        return (
            <div ref={ref} className={cn(avatarVariants({ size, shape }), className)} role={imageState !== 'loaded' ? 'img' : undefined} aria-label={imageState !== 'loaded' ? alt : undefined} {...props}>
                {imageState === 'loaded' ? <img className="h-full w-full object-cover" {...imageProps} /> : renderFallback()}
            </div>
        );
    },
);

Avatar.displayName = 'Avatar';
export { Avatar, avatarVariants };
export type { AvatarProps };
