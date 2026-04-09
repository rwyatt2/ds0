import React, { forwardRef } from 'react';

import { cn } from '@ds0/primitives';
import type {
    BreadcrumbProps,
    BreadcrumbListProps,
    BreadcrumbItemProps,
    BreadcrumbLinkProps,
    BreadcrumbPageProps,
    BreadcrumbSeparatorProps,
    BreadcrumbEllipsisProps,
} from '@ds0/primitives';

// ─── Icons ───────────────────────────────────────────────────

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

const MoreHorizontal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
    </svg>
);

/** Shorthand item for the `items` prop */
interface BreadcrumbShorthandItem {
    label: string;
    href?: string;
}

/**
 * Styled Breadcrumb component.
 * Shows the user's current location within a navigational hierarchy.
 *
 * @example Compound API
 * ```tsx
 * <Breadcrumb>
 *   <Breadcrumb.List>
 *     <Breadcrumb.Item>
 *       <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
 *     </Breadcrumb.Item>
 *     <Breadcrumb.Separator />
 *     <Breadcrumb.Item>
 *       <Breadcrumb.Page>Current</Breadcrumb.Page>
 *     </Breadcrumb.Item>
 *   </Breadcrumb.List>
 * </Breadcrumb>
 * ```
 *
 * @example Shorthand API
 * ```tsx
 * <Breadcrumb items={[
 *   { label: 'Home', href: '/' },
 *   { label: 'Products', href: '/products' },
 *   { label: 'Current' },
 * ]} />
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/breadcrumb | Documentation}
 */
const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps & { items?: BreadcrumbShorthandItem[] }>(
    ({ children, className, items, ...props }, ref) => (
        <nav ref={ref} aria-label={props['aria-label'] || 'Breadcrumb'} className={className} {...props}>
            {items ? (
                <BreadcrumbList>
                    {items.map((item, index) => (
                        <React.Fragment key={item.label}>
                            {index > 0 && <BreadcrumbSeparator />}
                            <BreadcrumbItem>
                                {item.href ? (
                                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            ) : children}
        </nav>
    ),
);

BreadcrumbRoot.displayName = 'Breadcrumb';

// ─── List ─────────────────────────────────────────────────────

const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
    ({ children, className, ...props }, ref) => (
        <ol
            ref={ref}
            className={cn(
                'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
                className,
            )}
            {...props}
        >
            {children}
        </ol>
    ),
);

BreadcrumbList.displayName = 'BreadcrumbList';

// ─── Item ─────────────────────────────────────────────────────

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
    ({ children, className, ...props }, ref) => (
        <li
            ref={ref}
            className={cn('inline-flex items-center gap-1.5', className)}
            {...props}
        >
            {children}
        </li>
    ),
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

// ─── Link ─────────────────────────────────────────────────────

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
    ({ children, className, ...props }, ref) => (
        <a
            ref={ref}
            className={cn('transition-colors hover:text-foreground', className)}
            {...props}
        >
            {children}
        </a>
    ),
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

// ─── Page (current) ──────────────────────────────────────────

const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
    ({ children, className, ...props }, ref) => (
        <span
            ref={ref}
            aria-current="page"
            className={cn('font-normal text-foreground', className)}
            {...props}
        >
            {children}
        </span>
    ),
);

BreadcrumbPage.displayName = 'BreadcrumbPage';

// ─── Separator ───────────────────────────────────────────────

const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
    ({ children, className, ...props }, ref) => (
        <li
            ref={ref}
            role="presentation"
            aria-hidden="true"
            className={cn('[&>svg]:size-3.5', className)}
            {...props}
        >
            {children || <ChevronRight />}
        </li>
    ),
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

// ─── Ellipsis ────────────────────────────────────────────────

const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
    ({ className, ...props }, ref) => (
        <span
            ref={ref}
            aria-hidden="true"
            className={cn('flex h-9 w-9 items-center justify-center', className)}
            {...props}
        >
            <MoreHorizontal />
        </span>
    ),
);

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

// ─── Compound Export ─────────────────────────────────────────

const Breadcrumb = Object.assign(BreadcrumbRoot, {
    List: BreadcrumbList,
    Item: BreadcrumbItem,
    Link: BreadcrumbLink,
    Page: BreadcrumbPage,
    Separator: BreadcrumbSeparator,
    Ellipsis: BreadcrumbEllipsis,
});

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};
