import React, { forwardRef } from 'react';

import type {
    CardProps,
    CardHeaderProps,
    CardTitleProps,
    CardDescriptionProps,
    CardContentProps,
    CardFooterProps,
} from './Card.types';

// ─── Root ─────────────────────────────────────────────────────

/**
 * Headless Card primitive.
 * A presentational container for grouping related information.
 * No behavior, keyboard, or ARIA — purely structural.
 *
 * @example
 * ```tsx
 * <CardPrimitive>
 *   <CardHeaderPrimitive>
 *     <CardTitlePrimitive>Title</CardTitlePrimitive>
 *   </CardHeaderPrimitive>
 *   <CardContentPrimitive>Body</CardContentPrimitive>
 * </CardPrimitive>
 * ```
 */
const CardPrimitive = forwardRef<HTMLDivElement, CardProps>(
    ({ as: Component = 'div', children, className, variant: _v, padding: _p, ...props }, ref) => {
        return (
            <Component ref={ref} className={className} {...props}>
                {children}
            </Component>
        );
    },
);

CardPrimitive.displayName = 'CardPrimitive';

// ─── Header ──────────────────────────────────────────────────

const CardHeaderPrimitive = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={className} {...props}>
            {children}
        </div>
    ),
);

CardHeaderPrimitive.displayName = 'CardHeaderPrimitive';

// ─── Title ───────────────────────────────────────────────────

const CardTitlePrimitive = forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ as: Component = 'h3', children, className, ...props }, ref) => (
        <Component ref={ref} className={className} {...props}>
            {children}
        </Component>
    ),
);

CardTitlePrimitive.displayName = 'CardTitlePrimitive';

// ─── Description ─────────────────────────────────────────────

const CardDescriptionPrimitive = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ children, className, ...props }, ref) => (
        <p ref={ref} className={className} {...props}>
            {children}
        </p>
    ),
);

CardDescriptionPrimitive.displayName = 'CardDescriptionPrimitive';

// ─── Content ─────────────────────────────────────────────────

const CardContentPrimitive = forwardRef<HTMLDivElement, CardContentProps>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={className} {...props}>
            {children}
        </div>
    ),
);

CardContentPrimitive.displayName = 'CardContentPrimitive';

// ─── Footer ──────────────────────────────────────────────────

const CardFooterPrimitive = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={className} {...props}>
            {children}
        </div>
    ),
);

CardFooterPrimitive.displayName = 'CardFooterPrimitive';

// ─── Exports ─────────────────────────────────────────────────

export {
    CardPrimitive,
    CardHeaderPrimitive,
    CardTitlePrimitive,
    CardDescriptionPrimitive,
    CardContentPrimitive,
    CardFooterPrimitive,
};
