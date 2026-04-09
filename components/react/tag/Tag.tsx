import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ds0/primitives';
import { useTag } from '@ds0/primitives';
import type { StyledTagProps } from '@ds0/primitives';

const tagVariants = cva(
    'inline-flex items-center rounded-md font-medium transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-secondary text-secondary-foreground',
                primary: 'bg-primary text-primary-foreground',
                secondary: 'bg-secondary text-secondary-foreground',
                destructive: 'bg-destructive text-destructive-foreground',
                outline: 'border border-input bg-background text-foreground',
            },
            size: {
                sm: 'h-6 px-2 text-xs gap-1',
                md: 'h-7 px-2.5 text-xs gap-1',
                lg: 'h-8 px-3 text-sm gap-1.5',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    },
);

type _TagVariants = VariantProps<typeof tagVariants>;

/**
 * Styled Tag component.
 * A small labeled element for categorizing, filtering, or displaying metadata.
 *
 * @example
 * ```tsx
 * <Tag variant="primary">React</Tag>
 * <Tag isRemovable onRemove={() => {}}>TypeScript</Tag>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/tag | Documentation}
 */
const Tag = forwardRef<HTMLSpanElement, StyledTagProps>(
    (
        {
            className,
            variant,
            size,
            isRemovable,
            isDisabled,
            onRemove,
            children,
            ...props
        },
        ref,
    ) => {
        const { removeButtonProps } = useTag({ isRemovable, isDisabled, onRemove });

        return (
            <span
                ref={ref}
                className={cn(
                    tagVariants({ variant, size }),
                    isDisabled && 'opacity-50 pointer-events-none',
                    className,
                )}
                {...props}
            >
                {children}
                {isRemovable && (
                    <button
                        {...removeButtonProps}
                        className="ml-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
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
            </span>
        );
    },
);

Tag.displayName = 'Tag';

export { Tag, tagVariants };
export type { StyledTagProps as TagProps };
