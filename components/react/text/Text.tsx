import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useText } from '@ds0/primitives';
import type { StyledTextProps } from '@ds0/primitives';

const textVariants = cva('', {
    variants: {
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            base: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
        },
        weight: {
            regular: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
        },
        color: {
            default: 'text-foreground',
            muted: 'text-muted-foreground',
            primary: 'text-primary',
            destructive: 'text-destructive',
            success: 'text-success',
        },
        align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
        },
    },
    defaultVariants: {
        size: 'base',
        weight: 'regular',
        color: 'default',
        align: 'left',
    },
});

type TextVariants = VariantProps<typeof textVariants>;

/**
 * Props for the styled Text component.
 */
interface TextProps extends Omit<StyledTextProps, keyof TextVariants>, TextVariants { }

/**
 * Styled Text component.
 * Renders styled text content with consistent typography.
 *
 * @example
 * ```tsx
 * <Text size="lg" weight="medium">
 *   Important body text
 * </Text>
 * ```
 *
 * @example
 * ```tsx
 * <Text as="span" color="muted" size="sm">
 *   Secondary information
 * </Text>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/text | Documentation}
 */
const Text = forwardRef<HTMLElement, TextProps>(
    (
        {
            className,
            as = 'p',
            size,
            weight,
            color,
            align,
            children,
            ...props
        },
        ref,
    ) => {
        const { textProps, Element } = useText({ as });

        return (
            <Element
                ref={ref as React.Ref<never>}
                className={cn(
                    textVariants({ size, weight, color, align }),
                    className,
                )}
                {...props}
                {...textProps}
            >
                {children}
            </Element>
        );
    },
);

Text.displayName = 'Text';

export { Text, textVariants };
export type { TextProps };
