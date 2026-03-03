import type React from 'react';

// ─── Component Props ─────────────────────────────────────────

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Visual style/severity */
    variant?: 'default' | 'info' | 'success' | 'warning' | 'destructive';
    /** Whether alert can be dismissed */
    isDismissible?: boolean;
    /** Callback when dismissed */
    onDismiss?: () => void;
    /** Alert content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    className?: string;
}

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    className?: string;
}
