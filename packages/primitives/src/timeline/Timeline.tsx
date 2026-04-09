import React, { forwardRef } from 'react';
import { useTimeline } from './useTimeline';
import type { TimelineProps } from './Timeline.types';
const TimelinePrimitive = forwardRef<HTMLOListElement, TimelineProps>(
    ({ orientation = 'vertical', children, ...props }, ref) => {
        const { timelineProps } = useTimeline({ orientation });
        return (<ol ref={ref} {...timelineProps} {...props}>{children}</ol>);
    },
);
TimelinePrimitive.displayName = 'TimelinePrimitive';
export { TimelinePrimitive };
