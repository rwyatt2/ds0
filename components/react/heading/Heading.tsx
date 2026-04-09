import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { useHeading } from '@ds0/primitives';
import type { StyledHeadingProps, HeadingLevel } from '@ds0/primitives';

const headingVariants = cva('scroll-m-20', {
    variants: {
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl',
            '4xl': 'text-4xl',
        },
        weight: {
            regular: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
        },
        tracking: {
            tighter: 'tracking-tighter',
            tight: 'tracking-tight',
            normal: 'tracking-normal',
        },
    },
    defaultVariants: {
        size: 'xl',
        weight: 'bold',
        tracking: 'tight',
    },
});

type HeadingVariants = VariantProps<typeof headingVariants>;

/** Default size mapping per heading level when size prop is not provided */
const levelSizeMap: Record<HeadingLevel, HeadingVariants['size']> = {
    h1: '4xl',
    h2: '3xl',
    h3: '2xl',
    h4: 'xl',
    h5: 'lg',
    h6: 'md',
};

/**
 * Props for the styled Heading component.
 */
interface HeadingProps extends Omit<StyledHeadingProps, keyof HeadingVariants>, HeadingVariants { }

/**
 * Styled Heading component.
 * Renders semantic heading elements (h1–h6) with consistent typography.
 *
 * @example
 * ```tsx
 * <Heading as="h1">Page Title</Heading>
 * ```
 *
 * @example
 * ```tsx
 * <Heading as="h2" size="4xl">
 *   Visually Large Section Title
 * </Heading>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/heading | Documentation}
 */
const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    (
        {
            className,
            as = 'h2',
            size,
            weight,
            tracking,
            children,
            ...props
        },
        ref,
    ) => {
        const { headingProps, Element } = useHeading({ as });

        const resolvedSize = size ?? levelSizeMap[as];

        return (
            <Element
                ref={ref}
                className={cn(
                    headingVariants({
                        size: resolvedSize,
                        weight,
                        tracking,
                    }),
                    className,
                )}
                {...props}
                {...headingProps}
            >
                {children}
            </Element>
        );
    },
);

Heading.displayName = 'Heading';

export { Heading, headingVariants };
export type { HeadingProps };
