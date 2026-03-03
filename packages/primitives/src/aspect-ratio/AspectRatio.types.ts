import type React from 'react';

export interface AspectRatioPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
    ratio?: number;
    children: React.ReactNode;
}

export interface StyledAspectRatioProps extends AspectRatioPrimitiveProps {
    className?: string;
}
