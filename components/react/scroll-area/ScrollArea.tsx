import React, { forwardRef } from 'react';
import { cn } from '@ds0/primitives';
import type { StyledScrollAreaProps, ScrollAreaScrollbarProps } from '@ds0/primitives';

/**
 * Styled ScrollArea component.
 * A custom-styled scrollable container with consistent scrollbar appearance.
 *
 * @example
 * ```tsx
 * <ScrollArea className="h-72 w-48 rounded-md border">
 *   <div className="p-4">{longContent}</div>
 * </ScrollArea>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/scroll-area | Documentation}
 */
const ScrollArea = forwardRef<HTMLDivElement, StyledScrollAreaProps>(
    ({ children, className, type: _type, scrollHideDelay: _delay, ...props }, ref) => {
        return (
            <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
                <div className="h-full w-full overflow-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                    {children}
                </div>
            </div>
        );
    },
) as ScrollAreaComponent;

ScrollArea.displayName = 'ScrollArea';

/**
 * Styled ScrollArea scrollbar.
 */
const ScrollAreaScrollbar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(
    ({ className, orientation = 'vertical', ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'flex touch-none select-none transition-colors',
                    orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-px',
                    orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-px',
                    className,
                )}
                {...props}
            />
        );
    },
);

ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar';

interface ScrollAreaComponent extends React.ForwardRefExoticComponent<
    StyledScrollAreaProps & React.RefAttributes<HTMLDivElement>
> {
    Scrollbar: typeof ScrollAreaScrollbar;
}

ScrollArea.Scrollbar = ScrollAreaScrollbar;

export { ScrollArea, ScrollAreaScrollbar };
