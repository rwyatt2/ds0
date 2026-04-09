import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useNotification } from '@ds0/primitives';
import type { StyledNotificationProps } from '@ds0/primitives';

const notificationVariants = cva(
    'relative rounded-lg border p-4',
    {
        variants: {
            variant: {
                info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
                success: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100',
                warning: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100',
                error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
            },
            size: {
                sm: 'p-3 text-sm',
                md: 'p-4 text-sm',
                lg: 'p-5 text-base',
            },
        },
        defaultVariants: { variant: 'info', size: 'md' },
    },
);

const Notification = forwardRef<HTMLDivElement, StyledNotificationProps>(
    ({ className, variant = 'info', size, isDismissible, onDismiss, title, icon, actions, children, ...props }, ref) => {
        const { notificationProps, dismissButtonProps, isDismissed } = useNotification({ variant, isDismissible, onDismiss });

        if (isDismissed) return null;

        return (
            <div ref={ref} className={cn(notificationVariants({ variant, size }), className)} {...props} {...notificationProps}>
                <div className="flex gap-3">
                    {icon && <span className="shrink-0 mt-0.5" aria-hidden="true">{icon}</span>}
                    <div className="flex-1 space-y-1">
                        {title && <p className="font-semibold leading-none tracking-tight">{title}</p>}
                        <div className="text-sm opacity-90">{children}</div>
                        {actions && <div className="flex gap-2 pt-2">{actions}</div>}
                    </div>
                    {isDismissible && (
                        <button {...dismissButtonProps} className="absolute right-3 top-3 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        );
    },
);

Notification.displayName = 'Notification';
export { Notification, notificationVariants };
export type { StyledNotificationProps as NotificationProps };
