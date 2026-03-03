import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import React, { useState } from 'react';

import { Pagination } from './Pagination';

expect.extend(toHaveNoViolations);

function TestPagination({ totalPages = 10, initialPage = 1 }: { totalPages?: number; initialPage?: number }) {
    const [page, setPage] = useState(initialPage);
    return <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />;
}

describe('Pagination (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<TestPagination />);
            expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
        });

        it('renders page numbers', () => {
            render(<TestPagination totalPages={5} />);
            expect(screen.getByRole('button', { name: 'Go to page 1' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Go to page 5' })).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('changes page on click', async () => {
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
});
