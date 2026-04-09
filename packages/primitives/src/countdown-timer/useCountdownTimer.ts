import { useCallback, useEffect, useRef, useState } from 'react';
import type { UseCountdownTimerProps, UseCountdownTimerReturn } from './CountdownTimer.types';

function calcRemaining(target: number): { days: number; hours: number; minutes: number; seconds: number; totalMs: number } {
    const totalMs = Math.max(0, target - Date.now());
    const seconds = Math.floor((totalMs / 1000) % 60);
    const minutes = Math.floor((totalMs / 1000 / 60) % 60);
    const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds, totalMs };
}

export function useCountdownTimer(props: UseCountdownTimerProps): UseCountdownTimerReturn {
    const { targetDate, onComplete, autoStart = true } = props;
    const target = new Date(targetDate).getTime();
    const [time, setTime] = useState(() => calcRemaining(target));
    const completedRef = useRef(false);

    useEffect(() => {
        if (!autoStart) return;
        const interval = setInterval(() => {
            const remaining = calcRemaining(target);
            setTime(remaining);
            if (remaining.totalMs <= 0 && !completedRef.current) {
                completedRef.current = true;
                clearInterval(interval);
                onComplete?.();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [target, autoStart, onComplete]);

    return {
        ...time,
        isComplete: time.totalMs <= 0,
        countdownProps: {
            role: 'timer',
            'aria-label': `${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds remaining`,
            'aria-live': 'polite',
        },
    };
}
