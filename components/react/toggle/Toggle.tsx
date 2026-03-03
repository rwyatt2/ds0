import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useToggle } from '@ds0/primitives';
import type { StyledToggleProps } from '@ds0/primitives';

const toggleVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
    {
        variants: {
            variant: {
                default: 'bg-transparent',
                outline:
                    'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
            },
            size: {
                sm: 'h-8 px-2',
                md: 'h-10 px-3',
                lg: 'h-12 px-4',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    },
);

type ToggleVariants = VariantProps<typeof toggleVariants>;

/**
 * Styled Toggle component.
 * A two-state button that can be on or off, like a standalone toggle in a toolbar.
 *
 * @example
 * ```tsx
 * <Toggle aria-label="Toggle bold">
 *   <BoldIcon />
 * </Toggle>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/toggle | Documentation}
 */
const Toggle = forwardRef<HTMLButtonElement, StyledToggleProps & ToggleVariants>(
    ({ className, variant, size, pressed, defaultPressed, onPressedChange, isDisabled, children, ...props }, ref) => {
        const { toggleProps, isPressed } = useToggle({
            pressed,
            defaultPressed,
            onPressedChange,
            isDisabled,
        });

        return (
            <button
                ref={ref}
                className={cn(
                    toggleVariants({ variant, size }),
                    isDisabled && 'opacity-50 pointer-events-none',
                    className,
                )}
                {...props}
                {...toggleProps}
                data-state={isPressed ? 'on' : 'off'}
            >
                {children}
            </button>
        );
    },
);

Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants };
export type { StyledToggleProps as ToggleProps };
