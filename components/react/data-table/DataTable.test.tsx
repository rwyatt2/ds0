import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { DataTable } from './DataTable';

expect.extend(toHaveNoViolations);

const mockData = [
    { name: 'Alice', email: 'alice@test.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@test.com', role: 'User' },
];

const mockColumns = [
    { accessorKey: 'name' as const, header: 'Name' },
    { accessorKey: 'email' as const, header: 'Email' },
    { accessorKey: 'role' as const, header: 'Role' },
];

describe('DataTable (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<DataTable data={mockData} columns={mockColumns} />);
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('bob@test.com')).toBeInTheDocument();
        });

        it('applies striped variant classes', () => {
            const { container } = render(
                <DataTable data={mockData} columns={mockColumns} variant="striped" />,
            );
            expect(container.firstChild).toHaveClass('[&_tbody_tr:nth-child(even)]:bg-muted/50');
        });

        it('applies size classes', () => {
            const { container } = render(
                <DataTable data={mockData} columns={mockColumns} size="lg" />,
            );
            expect(container.firstChild).toHaveClass('[&_th]:py-3');
        });

        it('merges custom className', () => {
            const { container } = render(
                <DataTable data={mockData} columns={mockColumns} className="custom-class" />,
            );
            expect(container.firstChild).toHaveClass('custom-class');
        });

        it('shows empty message when no data', () => {
            render(<DataTable data={[]} columns={mockColumns} emptyMessage="Empty" />);
            expect(screen.getByText('Empty')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('sorts data on column header click', async () => {
            const user = userEvent.setup();
            render(<DataTable data={mockData} columns={mockColumns} sortable />);
            await user.click(screen.getByRole('button', { name: 'Sort by Name' }));
            // After ascending sort, Alice should be first
            const rows = screen.getAllByRole('row');
            expect(rows[1]).toHaveTextContent('Alice');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <DataTable data={mockData} columns={mockColumns} />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations with selection', async () => {
            const { container } = render(
                <DataTable data={mockData} columns={mockColumns} selectable />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
