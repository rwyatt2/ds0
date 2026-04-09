import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useButton } from '@ds0/primitives';
import { Slot } from '@ds0/primitives';
import type { StyledButtonProps } from '@ds0/primitives';

/**
 * Loading spinner component for the Button loading state.
 * Uses currentColor to inherit the button's text color.
 */
const Spinner = ({ className }: { className?: string }) => (
    <svg
        className={cn('animate-spin h-4 w-4', className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
    </svg>
);

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            },
            size: {
                sm: 'h-8 px-3 text-xs gap-1.5',
                md: 'h-10 px-4 text-sm gap-2',
                lg: 'h-12 px-6 text-base gap-2',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

/**
 * Props for the styled Button component.
 */
interface ButtonProps extends Omit<StyledButtonProps, keyof ButtonVariants>, ButtonVariants {
    /** When true, renders as the child element using the Slot pattern */
    asChild?: boolean;
}

/**
 * Styled Button component.
 * Built on the headless ButtonPrimitive with Tailwind CSS styling via cva.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Save Changes
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * <Button variant="destructive" leftIcon={<TrashIcon />}>
 *   Delete Account
 * </Button>
 * ```
 *
 * @example asChild — render as a Link
 * ```tsx
 * <Button asChild>
 *   <a href="/home">Go Home</a>
 * </Button>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/button | Documentation}
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            asChild,
            variant,
            size,
            isDisabled,
            isLoading,
            loadingText,
            leftIcon,
            rightIcon,
            children,
            ...props
        },
        ref,
    ) => {
        const { buttonProps } = useButton({
            isDisabled,
            isLoading,
            type: props.type,
            onClick: props.onClick,
            onKeyDown: props.onKeyDown,
            onKeyUp: props.onKeyUp,
        });

        const combinedClassName = cn(
            buttonVariants({ variant, size }),
            isDisabled && 'opacity-50 pointer-events-none',
            isLoading && 'opacity-80 pointer-events-none',
            className,
        );

        const content = (
            <>
                {isLoading && <Spinner />}
                {!isLoading && leftIcon}
                {isLoading && loadingText ? (
                    <span aria-live="polite">{loadingText}</span>
                ) : (
                    children
                )}
                {!isLoading && rightIcon}
            </>
        );

        if (asChild) {
            return (
                <Slot ref={ref} className={combinedClassName} {...props} {...buttonProps}>
                    {React.isValidElement(children)
                        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {}, content)
                        : children
                    }
                </Slot>
            );
        }

        return (
            <button
                ref={ref}
                className={combinedClassName}
                {...props}
                {...buttonProps}
            >
                {content}
            </button>
        );
    },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
