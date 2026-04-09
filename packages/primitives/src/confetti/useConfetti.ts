import { useCallback, useEffect, useRef, useState } from 'react';
import type { UseConfettiProps, UseConfettiReturn } from './Confetti.types';

export function useConfetti(props: UseConfettiProps = {}): UseConfettiReturn {
    const { duration = 3000, isActive = false, onComplete, respectReducedMotion = true } = props;
    const [isAnimating, setIsAnimating] = useState(isActive);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    const fire = useCallback(() => {
        if (respectReducedMotion && prefersReducedMotion) {
            onComplete?.();
            return;
        }
        setIsAnimating(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsAnimating(false);
            onComplete?.();
        }, duration);
    }, [duration, onComplete, respectReducedMotion, prefersReducedMotion]);

    const stop = useCallback(() => {
        setIsAnimating(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => { if (isActive) fire(); }, [isActive, fire]);

    useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

    return { isAnimating, fire, stop, prefersReducedMotion };
}
