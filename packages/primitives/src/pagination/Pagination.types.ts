import React from 'react';

/**
 * Props for the usePagination hook.
 */
export interface UsePaginationProps {
    /** Total number of pages */
    totalPages: number;
    /** Current active page (1-indexed) */
    currentPage: number;
    /** Page change handler */
    onPageChange: (page: number) => void;
    /** Pages shown on each side of current */
    siblingCount?: number;
    /** Always show first and last page */
    showEdges?: boolean;
}

/**
 * Return value of the usePagination hook.
 */
export interface UsePaginationReturn {
    /** Computed page range with ellipsis markers */
    pages: (number | 'ellipsis')[];
    /** Whether previous button is disabled */
    hasPrevious: boolean;
    /** Whether next button is disabled */
    hasNext: boolean;
    /** Go to previous page */
    goToPrevious: () => void;
    /** Go to next page */
    goToNext: () => void;
    /** Go to specific page */
    goToPage: (page: number) => void;
}

/**
 * Props for the Pagination root component.
 */
export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
    /** Total number of pages */
    totalPages: number;
    /** Current active page (1-indexed) */
    currentPage: number;
    /** Page change handler */
    onPageChange: (page: number) => void;
    /** Pages shown on each side of current */
    siblingCount?: number;
    /** Always show first and last page */
    showEdges?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Page link/button size */
    size?: 'sm' | 'md' | 'lg';
    children?: React.ReactNode;
}

/**
 * Props for the styled Pagination component.
 */
export type StyledPaginationProps = PaginationProps;

/**
 * Props for Pagination.Content.
 */
export interface PaginationContentProps extends React.HTMLAttributes<HTMLUListElement> {
    children: React.ReactNode;
    className?: string;
}

/**
 * Props for Pagination.Item.
 */
export interface PaginationItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    children: React.ReactNode;
    className?: string;
}

/**
 * Props for Pagination.Link.
 */
export interface PaginationLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Whether this is the active/current page */
    isActive?: boolean;
    /** Page link size */
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    className?: string;
}

/**
 * Props for Pagination.Previous / Pagination.Next.
 */
export interface PaginationNavProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children?: React.ReactNode;
}

/**
 * Props for Pagination.Ellipsis.
 */
export interface PaginationEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
    className?: string;
}
