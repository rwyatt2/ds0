import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import { useAspectRatio } from '@ds0/primitives';
import type { StyledAspectRatioProps } from '@ds0/primitives';

const AspectRatio = forwardRef<HTMLDivElement, StyledAspectRatioProps>(
    ({ ratio = 1, children, className, style, ...props }, ref) => {
        const { containerStyle, innerStyle } = useAspectRatio(ratio);
        return (
            <div ref={ref} className={cn('overflow-hidden', className)} style={{ ...containerStyle, ...style }} {...props}>
                <div style={innerStyle} className="flex items-center justify-center">{children}</div>
            </div>
        );
    },
);

AspectRatio.displayName = 'AspectRatio';
export { AspectRatio };
export type { StyledAspectRatioProps as AspectRatioProps };
