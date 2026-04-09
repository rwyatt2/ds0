import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useSplitter } from '@ds0/primitives';
import type { StyledSplitterGroupProps, StyledSplitterPanelProps, StyledSplitterHandleProps } from '@ds0/primitives';

const groupVariants = cva('flex w-full h-full', {
  variants: { direction: { horizontal: 'flex-row', vertical: 'flex-col' } },
  defaultVariants: { direction: 'horizontal' },
});

/**
 * Styled SplitterGroup.
 */
const SplitterGroup = forwardRef<HTMLDivElement, StyledSplitterGroupProps>(
  ({ className, direction = 'horizontal', isDisabled, children, ...props }, ref) => {
    const { groupProps } = useSplitter({ direction, isDisabled });
    return (
      <div ref={ref} className={cn(groupVariants({ direction }), className)} {...props} {...groupProps}>
        {children}
      </div>
    );
  },
);
SplitterGroup.displayName = 'SplitterGroup';

/**
 * Styled SplitterPanel.
 */
const SplitterPanel = forwardRef<HTMLDivElement, StyledSplitterPanelProps>(
  ({ className, defaultSize, children, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('min-w-0 min-h-0 overflow-auto', className)}
      style={{ flex: defaultSize ? `${defaultSize} 1 0%` : '1 1 0%', ...style }}
      {...props}
    >
      {children}
    </div>
  ),
);
SplitterPanel.displayName = 'SplitterPanel';

/**
 * Styled SplitterHandle.
 */
const SplitterHandle = forwardRef<HTMLDivElement, StyledSplitterHandleProps>(
  ({ className, isDisabled, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled || undefined}
      className={cn(
        'flex-shrink-0 bg-border transition-colors',
        'hover:bg-primary/20 focus-visible:bg-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'data-[direction=horizontal]:w-1 data-[direction=horizontal]:cursor-col-resize',
        'data-[direction=vertical]:h-1 data-[direction=vertical]:cursor-row-resize',
        isDisabled && 'opacity-50 cursor-default',
        className,
      )}
      {...props}
    />
  ),
);
SplitterHandle.displayName = 'SplitterHandle';

export { SplitterGroup, SplitterPanel, SplitterHandle };
