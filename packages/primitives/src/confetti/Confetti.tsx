import { forwardRef, useMemo } from 'react';
import type { ConfettiProps } from './Confetti.types';
import { useConfetti } from './useConfetti';

const DEFAULT_COLORS = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const ConfettiPrimitive = forwardRef<HTMLDivElement, ConfettiProps>(
    ({ count = 50, duration, isActive, colors = DEFAULT_COLORS, onComplete, respectReducedMotion, className, ...rest }, ref) => {
        const { isAnimating } = useConfetti({ count, duration, isActive, onComplete, respectReducedMotion });

        const pieces = useMemo(() =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                color: colors[i % colors.length],
                left: `${Math.random() * 100}%`,
                delay: `${Math.random() * 0.5}s`,
                rotation: `${Math.random() * 360}deg`,
            })),
        [count, colors]);

        if (!isAnimating) return null;

        return (
            <div ref={ref} className={className} aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 9999 }} {...rest}>
                {pieces.map((p) => (
                    <div key={p.id} style={{ position: 'absolute', top: '-10px', left: p.left, width: '8px', height: '8px', backgroundColor: p.color, transform: `rotate(${p.rotation})`, animationDelay: p.delay }} />
                ))}
            </div>
        );
    },
);
ConfettiPrimitive.displayName = 'ConfettiPrimitive';
export { ConfettiPrimitive };
