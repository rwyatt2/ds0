import type React from 'react';

export interface UseCountdownTimerProps {
    /** Target date/time to count down to */ targetDate: Date | string | number;
    /** Callback when countdown reaches zero */ onComplete?: () => void;
    /** Whether to auto-start */ autoStart?: boolean;
}

export interface UseCountdownTimerReturn {
    /** Remaining time segments */ days: number; hours: number; minutes: number; seconds: number;
    /** Whether the countdown has completed */ isComplete: boolean;
    /** Total remaining milliseconds */ totalMs: number;
    /** Props for the root element */ countdownProps: React.HTMLAttributes<HTMLDivElement>;
}

export interface CountdownTimerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, UseCountdownTimerProps {
    /** Optional custom render */ children?: (time: { days: number; hours: number; minutes: number; seconds: number; isComplete: boolean }) => React.ReactNode;
}

export interface StyledCountdownTimerProps extends CountdownTimerProps {
    /** Visual variant */ variant?: 'default' | 'compact';
    /** Size */ size?: 'sm' | 'md' | 'lg';
    /** Show labels */ showLabels?: boolean;
    className?: string;
}
