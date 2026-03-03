import React, { forwardRef, useState, useCallback } from 'react';

import type { AlertProps, AlertTitleProps, AlertDescriptionProps } from './Alert.types';

// ─── Root ─────────────────────────────────────────────────────

/**
 * Headless Alert primitive.
 * A non-modal message that communicates status in context.
 *
 * @example
 * ```tsx
 * <AlertPrimitive variant="info">
 *   <AlertTitlePrimitive>Heads up!</AlertTitlePrimitive>
 *   <AlertDescriptionPrimitive>You can customize this alert.</AlertDescriptionPrimitive>
 * </AlertPrimitive>
 * ```
 */
const AlertPrimitive = forwardRef<HTMLDivElement, AlertProps>(
    ({ variant = 'default', isDismissible = false, onDismiss, children, className, ...props }, ref) => {
        const [isDismissed, setIsDismissed] = useState(false);

        const handleDismiss = useCallback(() => {
            setIsDismissed(true);
            onDismiss?.();
        }, [onDismiss]);

        if (isDismissed) return null;

        return (
            <div
                ref={ref}
                role="alert"
                data-variant={variant}
                className={className}
                {...props}
            >
                {children}
                {isDismissible && (
                    <button
                        type="button"
                        aria-label="Dismiss alert"
                        onClick={handleDismiss}
                    >
                        ×
                    </button>
                )}
            </div>
        );
    },
);

AlertPrimitive.displayName = 'AlertPrimitive';

// ─── Title ───────────────────────────────────────────────────

const AlertTitlePrimitive = forwardRef<HTMLHeadingElement, AlertTitleProps>(
    ({ children, className, ...props }, ref) => (
        <h5 ref={ref} className={className} {...props}>
            {children}
        </h5>
    ),
);

AlertTitlePrimitive.displayName = 'AlertTitlePrimitive';

// ─── Description ─────────────────────────────────────────────

const AlertDescriptionPrimitive = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={className} {...props}>
            {children}
        </div>
    ),
);

AlertDescriptionPrimitive.displayName = 'AlertDescriptionPrimitive';

// ─── Exports ─────────────────────────────────────────────────

export { AlertPrimitive, AlertTitlePrimitive, AlertDescriptionPrimitive };
