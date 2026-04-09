import type React from 'react';

/**
 * Props for the useBanner hook.
 */
export interface UseBannerProps {
    /** Visual variant */
    variant?: 'info' | 'warning' | 'error' | 'success' | 'promotional';
    /** Whether the banner can be dismissed */
    isDismissible?: boolean;
    /** Called when dismiss button is clicked */
    onDismiss?: () => void;
}

/**
 * Return value of the useBanner hook.
 */
export interface UseBannerReturn {
    /** Props to spread onto the root element */
    bannerProps: React.HTMLAttributes<HTMLDivElement>;
    /** Props for the dismiss button */
    dismissButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    /** Whether the banner has been dismissed */
    isDismissed: boolean;
    /** Dismiss the banner programmatically */
    dismiss: () => void;
}

/**
 * Props for the Banner primitive component.
 */
export interface BannerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    UseBannerProps {
    /** Banner message content */
    children: React.ReactNode;
}

/**
 * Props for the styled Banner component.
 */
export interface StyledBannerProps extends BannerProps {
    /** Size of the banner */
    size?: 'sm' | 'md' | 'lg';
    /** Leading icon */
    icon?: React.ReactNode;
    /** CTA element */
    action?: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}
