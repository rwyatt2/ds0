import React, { forwardRef } from 'react';

import { useBreadcrumb } from './useBreadcrumb';
import type {
    BreadcrumbProps,
    BreadcrumbListProps,
    BreadcrumbItemProps,
    BreadcrumbLinkProps,
    BreadcrumbPageProps,
    BreadcrumbSeparatorProps,
    BreadcrumbEllipsisProps,
} from './Breadcrumb.types';

// ─── Root ─────────────────────────────────────────────────────

const BreadcrumbPrimitive = forwardRef<HTMLElement, BreadcrumbProps>(
    ({ children, className, ...props }, ref) => {
        const { navProps } = useBreadcrumb({ 'aria-label': props['aria-label'] });

        return (
            <nav ref={ref} className={className} {...navProps} {...props}>
                {children}
            </nav>
        );
    },
);

BreadcrumbPrimitive.displayName = 'BreadcrumbPrimitive';

// ─── List ─────────────────────────────────────────────────────

const BreadcrumbListPrimitive = forwardRef<HTMLOListElement, BreadcrumbListProps>(
    ({ children, className, ...props }, ref) => (
        <ol ref={ref} className={className} {...props}>
            {children}
        </ol>
    ),
);

BreadcrumbListPrimitive.displayName = 'BreadcrumbListPrimitive';

// ─── Item ─────────────────────────────────────────────────────

const BreadcrumbItemPrimitive = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
    ({ children, className, ...props }, ref) => (
        <li ref={ref} className={className} {...props}>
            {children}
        </li>
    ),
);

BreadcrumbItemPrimitive.displayName = 'BreadcrumbItemPrimitive';

// ─── Link ─────────────────────────────────────────────────────

const BreadcrumbLinkPrimitive = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
    ({ children, className, ...props }, ref) => (
        <a ref={ref} className={className} {...props}>
            {children}
        </a>
    ),
);

BreadcrumbLinkPrimitive.displayName = 'BreadcrumbLinkPrimitive';

// ─── Page (current) ──────────────────────────────────────────

const BreadcrumbPagePrimitive = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
    ({ children, className, ...props }, ref) => (
        <span ref={ref} aria-current="page" className={className} {...props}>
            {children}
        </span>
    ),
);

BreadcrumbPagePrimitive.displayName = 'BreadcrumbPagePrimitive';

// ─── Separator ───────────────────────────────────────────────

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

const BreadcrumbSeparatorPrimitive = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
    ({ children, className, ...props }, ref) => (
        <li ref={ref} role="presentation" aria-hidden="true" className={className} {...props}>
            {children || <ChevronRight />}
        </li>
    ),
);

BreadcrumbSeparatorPrimitive.displayName = 'BreadcrumbSeparatorPrimitive';

// ─── Ellipsis ────────────────────────────────────────────────

const BreadcrumbEllipsisPrimitive = forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
    ({ className, ...props }, ref) => (
        <span ref={ref} aria-hidden="true" className={className} {...props}>
            &#8230;
        </span>
    ),
);

BreadcrumbEllipsisPrimitive.displayName = 'BreadcrumbEllipsisPrimitive';

// ─── Exports ─────────────────────────────────────────────────

export {
    BreadcrumbPrimitive,
    BreadcrumbListPrimitive,
    BreadcrumbItemPrimitive,
    BreadcrumbLinkPrimitive,
    BreadcrumbPagePrimitive,
    BreadcrumbSeparatorPrimitive,
    BreadcrumbEllipsisPrimitive,
};
