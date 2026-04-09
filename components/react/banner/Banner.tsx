import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useBanner } from '@ds0/primitives';
import type { StyledBannerProps } from '@ds0/primitives';

const bannerVariants = cva(
    'relative flex w-full items-center justify-center gap-3 px-4',
    {
        variants: {
            variant: {
                info: 'bg-blue-600 text-white',
                warning: 'bg-amber-500 text-white',
                error: 'bg-destructive text-destructive-foreground',
                success: 'bg-emerald-600 text-white',
                promotional: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white',
            },
            size: {
                sm: 'py-2 text-xs',
                md: 'py-3 text-sm',
                lg: 'py-4 text-base',
            },
        },
        defaultVariants: {
            variant: 'info',
            size: 'md',
        },
    },
);

type _BannerVariants = VariantProps<typeof bannerVariants>;

/**
 * Styled Banner component.
 * A full-width announcement bar for system-wide messages.
 *
 * @example
 * ```tsx
 * <Banner variant="info">
 *   We're launching a new feature next week!
 * </Banner>
 * ```
 *
 * @example
 * ```tsx
 * <Banner variant="warning" isDismissible onDismiss={() => setVisible(false)}>
 *   Scheduled maintenance on Sunday
 * </Banner>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/banner | Documentation}
 */
const Banner = forwardRef<HTMLDivElement, StyledBannerProps>(
    (
        {
            className,
            variant = 'info',
            size,
            isDismissible,
            onDismiss,
            icon,
            action,
            children,
            ...props
        },
        ref,
    ) => {
        const { bannerProps, dismissButtonProps, isDismissed } = useBanner({
            variant,
            isDismissible,
            onDismiss,
        });

        if (isDismissed) return null;

        return (
            <div
                ref={ref}
                className={cn(bannerVariants({ variant, size }), className)}
                {...props}
                {...bannerProps}
            >
                {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
                <span className="font-medium">{children}</span>
                {action && <span className="shrink-0">{action}</span>}
                {isDismissible && (
                    <button
                        {...dismissButtonProps}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                )}
            </div>
        );
    },
);

Banner.displayName = 'Banner';

export { Banner, bannerVariants };
export type { StyledBannerProps as BannerProps };
