import React, { forwardRef } from 'react';

import type { ToastProps } from './Toast.types';

/**
 * Headless Toast primitive.
 * A single toast notification element with ARIA attributes.
 * Does NOT include any styling.
 */
const ToastPrimitive = forwardRef<HTMLDivElement, ToastProps>(
    ({ toast, onDismiss, children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                role="status"
                aria-live="polite"
                aria-atomic="true"
                data-variant={toast.variant || 'default'}
                className={className}
                {...props}
            >
                <div>
                    {toast.title && <div>{toast.title}</div>}
                    {toast.description && <div>{toast.description}</div>}
                </div>
                {toast.action}
                <button
                    type="button"
                    aria-label="Close notification"
                    onClick={() => onDismiss(toast.id)}
                >
                    ✕
                </button>
                {children}
            </div>
        );
    },
);

ToastPrimitive.displayName = 'ToastPrimitive';

export { ToastPrimitive };
