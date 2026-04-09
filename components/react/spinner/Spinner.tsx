import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import type { StyledSpinnerProps } from '@ds0/primitives';

const spinnerVariants = cva('animate-spin text-current', {
    variants: {
        size: { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' },
    },
    defaultVariants: { size: 'md' },
});

type SpinnerVariants = VariantProps<typeof spinnerVariants>;
interface SpinnerProps extends Omit<StyledSpinnerProps, keyof SpinnerVariants>, SpinnerVariants { }

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
    ({ className, size, label = 'Loading', ...props }, ref) => (
        <div ref={ref} role="status" aria-label={label} className={cn('inline-flex', className)} {...props}>
            <svg className={cn(spinnerVariants({ size }))} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
        </div>
    ),
);
Spinner.displayName = 'Spinner';
export { Spinner, spinnerVariants };
export type { SpinnerProps };
