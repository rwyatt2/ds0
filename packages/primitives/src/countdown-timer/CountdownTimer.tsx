import { forwardRef } from 'react';
import type { CountdownTimerProps } from './CountdownTimer.types';
import { useCountdownTimer } from './useCountdownTimer';

const CountdownTimerPrimitive = forwardRef<HTMLDivElement, CountdownTimerProps>(
    ({ targetDate, onComplete, autoStart, children, ...rest }, ref) => {
        const { days, hours, minutes, seconds, isComplete, countdownProps } = useCountdownTimer({ targetDate, onComplete, autoStart });
        return (
            <div ref={ref} {...rest} {...countdownProps}>
                {children ? children({ days, hours, minutes, seconds, isComplete }) : (
                    <span>{String(days).padStart(2,'0')}:{String(hours).padStart(2,'0')}:{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}</span>
                )}
            </div>
        );
    },
);
CountdownTimerPrimitive.displayName = 'CountdownTimerPrimitive';
export { CountdownTimerPrimitive };
