import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import React, { useState } from 'react';

import { PaginationPrimitive } from './Pagination';
import { usePagination } from './usePagination';

expect.extend(toHaveNoViolations);

// Helper component for testing
function TestPagination({ totalPages = 20, initialPage = 1, siblingCount = 1, showEdges = true }: {
    totalPages?: number;
    initialPage?: number;
    siblingCount?: number;
    showEdges?: boolean;
}) {
    const [page, setPage] = useState(initialPage);
    const { pages, hasPrevious, hasNext, goToPrevious, goToNext, goToPage } = usePagination({
        totalPages,
        currentPage: page,
        onPageChange: setPage,
        siblingCount,
        showEdges,
    });

    return (
        <PaginationPrimitive totalPages={totalPages} currentPage={page} onPageChange={setPage}>
            <button onClick={goToPrevious} disabled={!hasPrevious} aria-label="Go to previous page">Prev</button>
            {pages.map((p, i) =>
                p === 'ellipsis' ? (
                    <span key={`ellipsis-${i}`} aria-hidden="true">...</span>
                ) : (
                    <button
                        key={p}
                        onClick={() => goToPage(p)}
                        aria-current={p === page ? 'page' : undefined}
                        aria-label={`Go to page ${p}`}
                    >
                        {p}
                    </button>
                ),
            )}
            <button onClick={goToNext} disabled={!hasNext} aria-label="Go to next page">Next</button>
        </PaginationPrimitive>
    );
}

describe('PaginationPrimitive', () => {
    describe('rendering', () => {
        it('renders navigation landmark', () => {
            render(<TestPagination />);
            expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
        });

        it('renders all pages for small total', () => {
            render(<TestPagination totalPages={3} />);
            expect(screen.getByRole('button', { name: 'Go to page 1' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Go to page 2' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Go to page 3' })).toBeInTheDocument();
        });

        it('marks current page with aria-current', () => {
            render(<TestPagination initialPage={3} totalPages={5} />);
            expect(screen.getByRole('button', { name: 'Go to page 3' })).toHaveAttribute('aria-current', 'page');
        });
    });

    describe('interactions', () => {
        it('navigates to next page', async () => {
            const user = userEvent.setup();
            render(<TestPagination initialPage={1} totalPages={5} />);

            await user.click(screen.getByRole('button', { name: 'Go to next page' }));
            expect(screen.getByRole('button', { name: 'Go to page 2' })).toHaveAttribute('aria-current', 'page');
        });

        it('navigates to previous page', async () => {
            const user = userEvent.setup();
            render(<TestPagination initialPage={3} totalPages={5} />);

            await user.click(screen.getByRole('button', { name: 'Go to previous page' }));
            expect(screen.getByRole('button', { name: 'Go to page 2' })).toHaveAttribute('aria-current', 'page');
        });

        it('disables previous on first page', () => {
            render(<TestPagination initialPage={1} />);
            expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeDisabled();
        });

        it('disables next on last page', () => {
            render(<TestPagination initialPage={20} totalPages={20} />);
            expect(screen.getByRole('button', { name: 'Go to next page' })).toBeDisabled();
        });

        it('navigates to a specific page', async () => {
            const user = userEvent.setup();
            render(<TestPagination totalPages={5} />);

            await user.click(screen.getByRole('button', { name: 'Go to page 3' }));
            expect(screen.getByRole('button', { name: 'Go to page 3' })).toHaveAttribute('aria-current', 'page');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<TestPagination totalPages={5} />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to nav element', () => {
            const ref = vi.fn();
            render(
                <PaginationPrimitive ref={ref} totalPages={5} currentPage={1} onPageChange={() => { /* noop */ }}>
                    <span>Pages</span>
                </PaginationPrimitive>,
            );
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
