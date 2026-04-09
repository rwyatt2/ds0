import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import type {
    CardProps as PrimitiveCardProps,
    CardHeaderProps,
    CardTitleProps,
    CardDescriptionProps,
    CardContentProps,
    CardFooterProps,
} from '@ds0/primitives';

// ─── Variants ────────────────────────────────────────────────

const cardVariants = cva(
    'rounded-lg text-card-foreground',
    {
        variants: {
            variant: {
                default: 'border bg-card shadow-sm',
                outline: 'border bg-transparent',
                ghost: 'bg-transparent',
                elevated: 'bg-card shadow-md',
            },
            padding: {
                none: '',
                sm: 'p-4',
                md: 'p-6',
                lg: 'p-8',
            },
            maxWidth: {
                sm: 'max-w-sm',
                md: 'max-w-md',
                lg: 'max-w-lg',
                xl: 'max-w-xl',
                full: 'max-w-full',
            },
        },
        defaultVariants: {
            variant: 'default',
            padding: 'none',
        },
    },
);

type CardVariants = VariantProps<typeof cardVariants>;
interface CardProps extends Omit<PrimitiveCardProps, keyof CardVariants>, CardVariants { }

// ─── Root ─────────────────────────────────────────────────────

/**
 * Styled Card component.
 * A contained surface for grouping related information and actions.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *     <Card.Description>Card description</Card.Description>
 *   </Card.Header>
 *   <Card.Content>Main content</Card.Content>
 *   <Card.Footer>Footer actions</Card.Footer>
 * </Card>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/card | Documentation}
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ as: Component = 'div', variant, padding, maxWidth, className, children, ...props }, ref) => (
        <Component ref={ref} className={cn(cardVariants({ variant, padding, maxWidth }), className)} {...props}>
            {children}
        </Component>
    ),
);

Card.displayName = 'Card';

// ─── Header ──────────────────────────────────────────────────

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, children, ...props }, ref) => (
        <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
            {children}
        </div>
    ),
);

CardHeader.displayName = 'CardHeader';

// ─── Title ───────────────────────────────────────────────────

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ as: Component = 'h3', className, children, ...props }, ref) => (
        <Component ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props}>
            {children}
        </Component>
    ),
);

CardTitle.displayName = 'CardTitle';

// ─── Description ─────────────────────────────────────────────

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, children, ...props }, ref) => (
        <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props}>
            {children}
        </p>
    ),
);

CardDescription.displayName = 'CardDescription';

// ─── Content ─────────────────────────────────────────────────

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, children, ...props }, ref) => (
        <div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
            {children}
        </div>
    ),
);

CardContent.displayName = 'CardContent';

// ─── Footer ──────────────────────────────────────────────────

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, children, ...props }, ref) => (
        <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props}>
            {children}
        </div>
    ),
);

CardFooter.displayName = 'CardFooter';

// ─── Compound Export ─────────────────────────────────────────

const CardCompound = Object.assign(Card, {
    Header: CardHeader,
    Title: CardTitle,
    Description: CardDescription,
    Content: CardContent,
    Footer: CardFooter,
});

export { CardCompound as Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
