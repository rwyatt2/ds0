import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@ds0/primitives';
import { usePagination } from '@ds0/primitives';
import type {
    StyledPaginationProps,
    PaginationContentProps,
    PaginationItemProps,
    PaginationLinkProps,
    PaginationNavProps,
    PaginationEllipsisProps,
} from '@ds0/primitives';

// ─── Icons ───────────────────────────────────────────────────

const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

// ─── Variants ────────────────────────────────────────────────

const paginationLinkVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    {
        variants: {
            isActive: {
                true: 'bg-primary text-primary-foreground hover:bg-primary/90',
                false: 'hover:bg-accent hover:text-accent-foreground',
            },
            size: {
                sm: 'h-8 w-8',
                md: 'h-10 w-10',
                lg: 'h-12 w-12',
            },
        },
        defaultVariants: {
            isActive: false,
            size: 'md',
        },
    },
);

// ─── Root ─────────────────────────────────────────────────────

/**
 * Styled Pagination component.
 * Navigation controls for moving between pages of content.
 *
 * @example
 * ```tsx
 * <Pagination totalPages={20} currentPage={5} onPageChange={setPage} />
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/pagination | Documentation}
 */
const PaginationRoot = forwardRef<HTMLElement, StyledPaginationProps>(
    ({ totalPages, currentPage, onPageChange, siblingCount, showEdges, size = 'md', className, ...props }, ref) => {
        const { pages, hasPrevious, hasNext, goToPrevious, goToNext, goToPage } = usePagination({
            totalPages,
            currentPage,
            onPageChange,
            siblingCount,
            showEdges,
        });

        return (
            <nav ref={ref} aria-label="Pagination" className={className} {...props}>
                <ul className={cn('flex flex-row items-center gap-1')}>
                    <li>
                        <button
                            className={cn(
                                'inline-flex items-center justify-center gap-1 rounded-md px-3 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground',
                                size === 'sm' ? 'h-8' : size === 'lg' ? 'h-12' : 'h-10',
                                !hasPrevious && 'opacity-50 pointer-events-none',
                            )}
                            onClick={goToPrevious}
                            aria-disabled={!hasPrevious || undefined}
                            aria-label="Go to previous page"
                        >
                            <ChevronLeft />
                            <span>Previous</span>
                        </button>
                    </li>
                    {pages.map((page, index) => (
                        <li key={page === 'ellipsis' ? `ellipsis-${index}` : page}>
                            {page === 'ellipsis' ? (
                                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center text-sm text-muted-foreground">
                                    &#8230;
                                </span>
                            ) : (
                                <button
                                    className={cn(paginationLinkVariants({ isActive: page === currentPage, size }))}
                                    onClick={() => goToPage(page)}
                                    aria-current={page === currentPage ? 'page' : undefined}
                                    aria-label={`Go to page ${page}`}
                                >
                                    {page}
                                </button>
                            )}
                        </li>
                    ))}
                    <li>
                        <button
                            className={cn(
                                'inline-flex items-center justify-center gap-1 rounded-md px-3 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground',
                                size === 'sm' ? 'h-8' : size === 'lg' ? 'h-12' : 'h-10',
                                !hasNext && 'opacity-50 pointer-events-none',
                            )}
                            onClick={goToNext}
                            aria-disabled={!hasNext || undefined}
                            aria-label="Go to next page"
                        >
                            <span>Next</span>
                            <ChevronRight />
                        </button>
                    </li>
                </ul>
            </nav>
        );
    },
);

PaginationRoot.displayName = 'Pagination';

// ─── Sub-components for composability ─────────────────────────

const PaginationContent = forwardRef<HTMLUListElement, PaginationContentProps>(
    ({ children, className, ...props }, ref) => (
        <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props}>
            {children}
        </ul>
    ),
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
    ({ children, className, ...props }, ref) => (
        <li ref={ref} className={className} {...props}>{children}</li>
    ),
);
PaginationItem.displayName = 'PaginationItem';

const PaginationLink = forwardRef<HTMLButtonElement, PaginationLinkProps>(
    ({ isActive, size = 'md', children, className, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(paginationLinkVariants({ isActive, size }), className)}
            aria-current={isActive ? 'page' : undefined}
            {...props}
        >
            {children}
        </button>
    ),
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = forwardRef<HTMLButtonElement, PaginationNavProps>(
    ({ children, className, ...props }, ref) => (
        <button
            ref={ref}
            className={cn('inline-flex items-center justify-center gap-1 rounded-md px-3 h-10 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground', className)}
            aria-label="Go to previous page"
            {...props}
        >
            <ChevronLeft />
            {children || <span>Previous</span>}
        </button>
    ),
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = forwardRef<HTMLButtonElement, PaginationNavProps>(
    ({ children, className, ...props }, ref) => (
        <button
            ref={ref}
            className={cn('inline-flex items-center justify-center gap-1 rounded-md px-3 h-10 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground', className)}
            aria-label="Go to next page"
            {...props}
        >
            {children || <span>Next</span>}
            <ChevronRight />
        </button>
    ),
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
    ({ className, ...props }, ref) => (
        <span ref={ref} aria-hidden="true" className={cn('flex h-10 w-10 items-center justify-center text-sm text-muted-foreground', className)} {...props}>
            &#8230;
        </span>
    ),
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

// ─── Compound Export ─────────────────────────────────────────

const Pagination = Object.assign(PaginationRoot, {
    Content: PaginationContent,
    Item: PaginationItem,
    Link: PaginationLink,
    Previous: PaginationPrevious,
    Next: PaginationNext,
    Ellipsis: PaginationEllipsis,
});

export {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    paginationLinkVariants,
};
