import React, { forwardRef, useMemo } from 'react';
import { cn } from '@ds0/primitives';
import { useConfetti } from '@ds0/primitives';
import type { StyledConfettiProps } from '@ds0/primitives';

const DEFAULT_COLORS = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const pieceSizes = { sm: 6, md: 10, lg: 14 };

/**
 * Styled Confetti component with CSS keyframe animations.
 * Celebrates user achievements with a colorful particle burst.
 *
 * @example
 * ```tsx
 * <Confetti isActive={showConfetti} onComplete={() => setShowConfetti(false)} />
 * ```
 */
const Confetti = forwardRef<HTMLDivElement, StyledConfettiProps>(
    ({ className, count = 80, duration = 3000, isActive, colors = DEFAULT_COLORS, onComplete, respectReducedMotion, pieceSize = 'md', spread = 60, ...props }, ref) => {
        const { isAnimating } = useConfetti({ count, duration, isActive, onComplete, respectReducedMotion });

        const pieces = useMemo(() =>
            Array.from({ length: count }, (_, i) => {
                const size = pieceSizes[pieceSize];
                const angle = (Math.random() - 0.5) * spread * 2;
                const velocity = 50 + Math.random() * 80;
                return {
                    id: i,
                    color: colors[i % colors.length],
                    size: size + Math.random() * (size * 0.5),
                    left: 40 + Math.random() * 20,
                    delay: Math.random() * 0.8,
                    duration: 2 + Math.random() * 1.5,
                    xEnd: angle * velocity * 0.15,
                    yEnd: velocity + Math.random() * 40,
                    rotation: Math.random() * 720 - 360,
                    shape: Math.random() > 0.5 ? 'rect' : 'circle',
                };
            }),
        [count, colors, pieceSize, spread]);

        if (!isAnimating) return null;

        return (
            <div
                ref={ref}
                className={cn('fixed inset-0 pointer-events-none overflow-hidden z-[9999]', className)}
                aria-hidden="true"
                {...props}
            >
                <style>{`
                    @keyframes ds0-confetti-fall {
                        0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
                        100% { transform: translate(var(--cx), var(--cy)) rotate(var(--cr)); opacity: 0; }
                    }
                `}</style>
                {pieces.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            left: `${p.left}%`,
                            top: '-2%',
                            width: `${p.size}px`,
                            height: p.shape === 'rect' ? `${p.size * 0.6}px` : `${p.size}px`,
                            backgroundColor: p.color,
                            borderRadius: p.shape === 'circle' ? '50%' : '2px',
                            '--cx': `${p.xEnd}vw`,
                            '--cy': `${p.yEnd}vh`,
                            '--cr': `${p.rotation}deg`,
                            animation: `ds0-confetti-fall ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}s forwards`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>
        );
    },
);

Confetti.displayName = 'Confetti';
export { Confetti };
export type { StyledConfettiProps as ConfettiProps };
