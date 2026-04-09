import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useCountdownTimer } from '@ds0/primitives';
import type { StyledCountdownTimerProps } from '@ds0/primitives';

const countdownVariants = cva('inline-flex items-center gap-1 font-mono tabular-nums', {
    variants: { variant: { default: '', compact: '' }, size: { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' } },
    defaultVariants: { variant: 'default', size: 'md' },
});

const Segment = ({ value, label, size }: { value: number; label: string; size: string }) => (
    <div className="flex flex-col items-center">
        <span className={cn('font-bold bg-muted rounded-md px-2 py-1', size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-4xl px-4 py-2' : 'text-2xl px-3 py-1.5')}>{String(value).padStart(2, '0')}</span>
        <span className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</span>
    </div>
);

const Separator = ({ size }: { size: string }) => (
    <span className={cn('font-bold text-muted-foreground self-start', size === 'sm' ? 'text-lg mt-1' : size === 'lg' ? 'text-4xl mt-2' : 'text-2xl mt-1.5')}>:</span>
);

const CountdownTimer = forwardRef<HTMLDivElement, StyledCountdownTimerProps>(
    ({ className, variant, size = 'md', showLabels = true, targetDate, onComplete, autoStart, children, ...props }, ref) => {
        const { days, hours, minutes, seconds, isComplete, countdownProps } = useCountdownTimer({ targetDate, onComplete, autoStart });
        if (children) return <div ref={ref} className={cn(countdownVariants({ variant, size }), className)} {...props} {...countdownProps}>{children({ days, hours, minutes, seconds, isComplete })}</div>;
        return (
            <div ref={ref} className={cn('inline-flex items-start gap-2', className)} {...props} {...countdownProps}>
                {days > 0 && <><Segment value={days} label={showLabels ? 'Days' : ''} size={size} /><Separator size={size} /></>}
                <Segment value={hours} label={showLabels ? 'Hours' : ''} size={size} /><Separator size={size} />
                <Segment value={minutes} label={showLabels ? 'Min' : ''} size={size} /><Separator size={size} />
                <Segment value={seconds} label={showLabels ? 'Sec' : ''} size={size} />
            </div>
        );
    },
);
CountdownTimer.displayName = 'CountdownTimer';
export { CountdownTimer, countdownVariants };
export type { StyledCountdownTimerProps as CountdownTimerProps };
