import React, { forwardRef, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import type { AlertProps, AlertTitleProps, AlertDescriptionProps } from '@ds0/primitives';

// ─── Variant Icons (Inline SVG) ──────────────────────────────

function InfoIcon(): React.JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
        </svg>
    );
}

function SuccessIcon(): React.JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
        </svg>
    );
}

function WarningIcon(): React.JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" />
        </svg>
    );
}

function DestructiveIcon(): React.JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
        </svg>
    );
}

function CloseIcon(): React.JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
    );
}

const variantIcons: Record<string, React.FC> = {
    info: InfoIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    destructive: DestructiveIcon,
};

// ─── Variants ────────────────────────────────────────────────

const alertVariants = cva(
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    {
        variants: {
            variant: {
                default: 'bg-background text-foreground',
                info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100 [&>svg]:text-blue-600',
                success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100 [&>svg]:text-green-600',
                warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100 [&>svg]:text-yellow-600',
                destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

// ─── Root ─────────────────────────────────────────────────────

/**
 * Styled Alert component.
 * A non-modal message for communicating status, warnings, or errors.
 *
 * @example
 * ```tsx
 * <Alert variant="info">
 *   <Alert.Title>Heads up!</Alert.Title>
 *   <Alert.Description>You can add components to your app using the CLI.</Alert.Description>
 * </Alert>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/alert | Documentation}
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
    ({ variant = 'default', isDismissible = false, onDismiss, children, className, ...props }, ref) => {
        const [isDismissed, setIsDismissed] = useState(false);

        const handleDismiss = useCallback(() => {
            setIsDismissed(true);
            onDismiss?.();
        }, [onDismiss]);

        if (isDismissed) return null;

        const Icon = variantIcons[variant];

        return (
            <div
                ref={ref}
                role="alert"
                data-variant={variant}
                className={cn(alertVariants({ variant }), className)}
                {...props}
            >
                {Icon && <Icon />}
                {children}
                {isDismissible && (
                    <button
                        type="button"
                        aria-label="Dismiss alert"
                        className="absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        onClick={handleDismiss}
                    >
                        <CloseIcon />
                    </button>
                )}
            </div>
        );
    },
);

Alert.displayName = 'Alert';

// ─── Title ───────────────────────────────────────────────────

const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
    ({ children, className, ...props }, ref) => (
        <h5
            ref={ref}
            className={cn('mb-1 font-medium leading-none tracking-tight', className)}
            {...props}
        >
            {children}
        </h5>
    ),
);

AlertTitle.displayName = 'AlertTitle';

// ─── Description ─────────────────────────────────────────────

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
    ({ children, className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('text-sm [&_p]:leading-relaxed', className)}
            {...props}
        >
            {children}
        </div>
    ),
);

AlertDescription.displayName = 'AlertDescription';

// ─── Compound Export ─────────────────────────────────────────

const AlertCompound = Object.assign(Alert, {
    Title: AlertTitle,
    Description: AlertDescription,
});

export { AlertCompound as Alert, AlertTitle, AlertDescription, alertVariants };
