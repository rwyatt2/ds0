import type React from 'react';

export interface UseNotificationProps {
    /** Visual variant */
    variant?: 'info' | 'success' | 'warning' | 'error';
    /** Whether dismissible */
    isDismissible?: boolean;
    /** Dismiss callback */
    onDismiss?: () => void;
}

export interface UseNotificationReturn {
    /** Props for the root element */
    notificationProps: React.HTMLAttributes<HTMLDivElement>;
    /** Props for the dismiss button */
    dismissButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    /** Whether dismissed */
    isDismissed: boolean;
    /** Dismiss programmatically */
    dismiss: () => void;
}

export interface NotificationProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    UseNotificationProps {
    /** Notification title */
    title?: string;
    /** Message content */
    children: React.ReactNode;
}

export interface StyledNotificationProps extends NotificationProps {
    /** Size */
    size?: 'sm' | 'md' | 'lg';
    /** Leading icon */
    icon?: React.ReactNode;
    /** Action buttons */
    actions?: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}
