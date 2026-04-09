import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useIconButton } from '@ds0/primitives';
import type { StyledIconButtonProps } from '@ds0/primitives';

const iconButtonVariants = cva(
    'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            },
            size: {
                sm: 'h-8 w-8',
                md: 'h-10 w-10',
                lg: 'h-12 w-12',
            },
        },
        defaultVariants: { variant: 'ghost', size: 'md' },
    },
);

type IconButtonVariants = VariantProps<typeof iconButtonVariants>;
interface IconButtonProps extends Omit<StyledIconButtonProps, keyof IconButtonVariants>, IconButtonVariants {}

const Spinner = ({ className }: { className?: string }) => (
    <svg className={cn('animate-spin', className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
);

const iconSizeMap: Record<string, string> = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ className, variant, size = 'md', icon, isLoading, isDisabled, 'aria-label': ariaLabel, ...props }, ref) => {
        const { buttonProps } = useIconButton({ isDisabled, isLoading, onClick: props.onClick });
        return (
            <button
                ref={ref}
                className={cn(iconButtonVariants({ variant, size }), isDisabled && 'pointer-events-none opacity-50', className)}
                aria-label={ariaLabel}
                {...props}
                {...buttonProps}
            >
                {isLoading ? <Spinner className={iconSizeMap[size ?? 'md']} /> : <span className={iconSizeMap[size ?? 'md']}>{icon}</span>}
            </button>
        );
    },
);
IconButton.displayName = 'IconButton';
export { IconButton, iconButtonVariants };
export type { IconButtonProps };
