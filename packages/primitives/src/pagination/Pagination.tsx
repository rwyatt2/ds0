import React, { forwardRef } from 'react';

import type { PaginationProps } from './Pagination.types';

/**
 * Headless Pagination primitive.
 * Navigation controls for moving between pages of content.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <PaginationPrimitive totalPages={20} currentPage={5} onPageChange={setPage} />
 * ```
 */
const PaginationPrimitive = forwardRef<HTMLElement, PaginationProps>(
    ({ totalPages: _totalPages, currentPage: _currentPage, onPageChange: _onPageChange, siblingCount: _siblingCount, showEdges: _showEdges, children, className, ...props }, ref) => {
        return (
            <nav
                ref={ref}
                aria-label="Pagination"
                className={className}
                {...props}
            >
                {children}
            </nav>
        );
    },
);

PaginationPrimitive.displayName = 'PaginationPrimitive';

export { PaginationPrimitive };
