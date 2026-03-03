import { useCallback, useMemo } from 'react';

import type { UsePaginationProps, UsePaginationReturn } from './Pagination.types';

/**
 * Computes the visible page range given pagination parameters.
 */
function getPageRange(
    totalPages: number,
    currentPage: number,
    siblingCount: number,
    showEdges: boolean,
): (number | 'ellipsis')[] {
    const totalNumbers = siblingCount * 2 + 3; // siblings + current + 2 edges
    const totalBlocks = totalNumbers + 2; // + 2 ellipses

    if (totalPages <= totalBlocks) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    const result: (number | 'ellipsis')[] = [];

    if (showEdges) result.push(1);

    if (showLeftEllipsis) {
        result.push('ellipsis');
    } else if (showEdges) {
        for (let i = 2; i < leftSiblingIndex; i++) result.push(i);
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        if (i !== 1 && i !== totalPages) result.push(i);
    }

    if (showRightEllipsis) {
        result.push('ellipsis');
    } else if (showEdges) {
        for (let i = rightSiblingIndex + 1; i < totalPages; i++) result.push(i);
    }

    if (showEdges && totalPages > 1) result.push(totalPages);

    return result;
}

/**
 * Hook that encapsulates Pagination behavior.
 * Computes the page range, handles navigation, and provides state.
 *
 * @param props - Configuration options
 * @returns Page range array, navigation functions, and boundary state
 *
 * @example
 * ```tsx
 * const { pages, hasPrevious, hasNext, goToPage, goToPrevious, goToNext } = usePagination({
 *   totalPages: 20,
 *   currentPage: 5,
 *   onPageChange: setPage,
 * });
 * ```
 */
export function usePagination(props: UsePaginationProps): UsePaginationReturn {
    const {
        totalPages,
        currentPage,
        onPageChange,
        siblingCount = 1,
        showEdges = true,
    } = props;

    const pages = useMemo(
        () => getPageRange(totalPages, currentPage, siblingCount, showEdges),
        [totalPages, currentPage, siblingCount, showEdges],
    );

    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < totalPages;

    const goToPrevious = useCallback(() => {
        if (hasPrevious) onPageChange(currentPage - 1);
    }, [hasPrevious, currentPage, onPageChange]);

    const goToNext = useCallback(() => {
        if (hasNext) onPageChange(currentPage + 1);
    }, [hasNext, currentPage, onPageChange]);

    const goToPage = useCallback(
        (page: number) => {
            if (page >= 1 && page <= totalPages && page !== currentPage) {
                onPageChange(page);
            }
        },
        [totalPages, currentPage, onPageChange],
    );

    return {
        pages,
        hasPrevious,
        hasNext,
        goToPrevious,
        goToNext,
        goToPage,
    };
}
