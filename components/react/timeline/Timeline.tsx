import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useTimeline } from '@ds0/primitives';
import type { StyledTimelineProps, TimelineItemProps } from '@ds0/primitives';

const timelineVariants = cva('relative', {
    variants: {
        variant: { default: '', alternate: '', right: 'items-end' },
        size: { sm: 'text-xs gap-4', md: 'text-sm gap-6', lg: 'text-base gap-8' },
        orientation: { vertical: 'flex flex-col', horizontal: 'flex flex-row items-start' },
    },
    defaultVariants: { variant: 'default', size: 'md', orientation: 'vertical' },
});

const Timeline = forwardRef<HTMLOListElement, StyledTimelineProps>(
    ({ className, variant = 'default', size = 'md', orientation = 'vertical', children, ...props }, ref) => {
        const { timelineProps } = useTimeline({ orientation });
        return (
            <ol ref={ref} className={cn(timelineVariants({ variant, size, orientation }), className)} {...timelineProps} {...props}>
                {children}
            </ol>
        );
    },
);
Timeline.displayName = 'Timeline';

const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
    ({ children, className, ...props }, ref) => (
        <li ref={ref} className={cn('relative flex gap-3', className)} {...props}>{children}</li>
    ),
);
TimelineItem.displayName = 'TimelineItem';

const TimelineDot = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { active?: boolean }>(
    ({ className, active, children, ...props }, ref) => (
        <div ref={ref} className={cn('flex-shrink-0 flex items-center justify-center rounded-full border-2', active ? 'bg-primary border-primary text-primary-foreground h-4 w-4' : 'bg-background border-border h-3 w-3', className)} {...props}>
            {children}
        </div>
    ),
);
TimelineDot.displayName = 'TimelineDot';

const TimelineConnector = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('absolute left-[5px] top-4 bottom-0 w-0.5 bg-border', className)} aria-hidden="true" {...props} />
    ),
);
TimelineConnector.displayName = 'TimelineConnector';

const TimelineContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => (
        <div ref={ref} className={cn('flex flex-col pb-6', className)} {...props}>{children}</div>
    ),
);
TimelineContent.displayName = 'TimelineContent';

export { Timeline, TimelineItem, TimelineDot, TimelineConnector, TimelineContent, timelineVariants };
export type { StyledTimelineProps as TimelineProps };
