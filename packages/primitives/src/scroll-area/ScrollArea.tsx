import React, { forwardRef } from 'react';
import type { ScrollAreaProps } from './ScrollArea.types';

/**
 * Headless ScrollArea primitive.
 * A scrollable container with hidden native scrollbars.
 */
const ScrollAreaPrimitive = forwardRef<HTMLDivElement, ScrollAreaProps>(
    ({ children, className, type: _type, scrollHideDelay: _delay, ...props }, ref) => {
        return (
            <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden' }} {...props}>
                <div style={{ overflow: 'scroll', scrollbarWidth: 'none', height: '100%', width: '100%' }}>
                    {children}
                </div>
            </div>
        );
    },
);

ScrollAreaPrimitive.displayName = 'ScrollAreaPrimitive';

export { ScrollAreaPrimitive };
