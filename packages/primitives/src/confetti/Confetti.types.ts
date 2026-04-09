export interface UseConfettiProps {
    /** Number of confetti pieces */ count?: number;
    /** Duration in ms */ duration?: number;
    /** Whether confetti is active */ isActive?: boolean;
    /** Colors for confetti pieces */ colors?: string[];
    /** Callback when animation completes */ onComplete?: () => void;
    /** Whether to respect reduced-motion preferences */ respectReducedMotion?: boolean;
}

export interface UseConfettiReturn {
    /** Whether confetti is currently animating */ isAnimating: boolean;
    /** Trigger the confetti */ fire: () => void;
    /** Stop the confetti */ stop: () => void;
    /** Whether user prefers reduced motion */ prefersReducedMotion: boolean;
}

export interface ConfettiProps extends UseConfettiProps {
    /** Additional CSS classes */ className?: string;
}

export interface StyledConfettiProps extends ConfettiProps {
    /** Size of confetti pieces */ pieceSize?: 'sm' | 'md' | 'lg';
    /** Spread angle in degrees */ spread?: number;
}
