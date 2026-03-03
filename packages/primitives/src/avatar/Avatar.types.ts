import type React from 'react';

export interface UseAvatarProps { src?: string; alt?: string; }
export interface UseAvatarReturn { imageProps: React.ImgHTMLAttributes<HTMLImageElement>; imageState: 'loading' | 'loaded' | 'error'; }

export interface AvatarPrimitiveProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    src?: string;
    alt: string;
    fallback?: string | React.ReactNode;
}

export interface StyledAvatarProps extends AvatarPrimitiveProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    shape?: 'circle' | 'square';
    className?: string;
}
