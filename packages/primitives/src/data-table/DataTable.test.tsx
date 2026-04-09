import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { DataTablePrimitive } from './DataTable';

expect.extend(toHaveNoViolations);

const mockData = [
    { name: 'Alice', email: 'alice@test.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@test.com', role: 'User' },
    { name: 'Charlie', email: 'charlie@test.com', role: 'User' },
];

const mockColumns = [
    { accessorKey: 'name' as const, header: 'Name' },
    { accessorKey: 'email' as const, header: 'Email' },
    { accessorKey: 'role' as const, header: 'Role' },
];

describe('DataTablePrimitive', () => {
    describe('rendering', () => {
        it('renders with data and columns', () => {
            render(<DataTablePrimitive data={mockData} columns={mockColumns} />);
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('bob@test.com')).toBeInTheDocument();
        });

        it('renders column headers', () => {
            render(<DataTablePrimitive data={mockData} columns={mockColumns} />);
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Role')).toBeInTheDocument();
        });

        it('renders empty message when no data', () => {
            render(<DataTablePrimitive data={[]} columns={mockColumns} emptyMessage="No records found" />);
            expect(screen.getByText('No records found')).toBeInTheDocument();
        });

        it('renders all rows', () => {
            render(<DataTablePrimitive data={mockData} columns={mockColumns} />);
            const rows = screen.getAllByRole('row');
            // 1 header row + 3 data rows
            expect(rows.length).toBe(4);
        });
    });

    describe('interactions', () => {
        it('sorts data when clicking sortable column header', async () => {
            const user = userEvent.setup();
            render(<DataTablePrimitive data={mockData} columns={mockColumns} sortable />);

            const sortButton = screen.getByRole('button', { name: 'Sort by Name' });
            await user.click(sortButton);

            const rows = screen.getAllByRole('row');
            const firstDataRow = rows[1];
            expect(within(firstDataRow).getByText('Alice')).toBeInTheDocument();
        });

        it('toggles row selection when selectable', async () => {
            const onSelectionChange = vi.fn();
            const user = userEvent.setup();
            render(
                <DataTablePrimitive
                    data={mockData}
                    columns={mockColumns}
                    selectable
                    onSelectionChange={onSelectionChange}
                />,
            );

            const checkboxes = screen.getAllByRole('checkbox');
            await user.click(checkboxes[1]); // First data row checkbox
            expect(onSelectionChange).toHaveBeenCalledWith([0]);
        });

        it('toggles all row selection', async () => {
            const onSelectionChange = vi.fn();
            const user = userEvent.setup();
            render(
                <DataTablePrimitive
                    data={mockData}
                    columns={mockColumns}
                    selectable
                    onSelectionChange={onSelectionChange}
                />,
            );

            const selectAllCheckbox = screen.getByRole('checkbox', { name: 'Select all rows' });
            await user.click(selectAllCheckbox);
            expect(onSelectionChange).toHaveBeenCalledWith([0, 1, 2]);
        });
    });

    describe('keyboard', () => {
        it('sort button is focusable via Tab', async () => {
            const user = userEvent.setup();
            render(<DataTablePrimitive data={mockData} columns={mockColumns} sortable />);

            await user.tab();
            const sortButton = screen.getByRole('button', { name: 'Sort by Name' });
            expect(sortButton).toHaveFocus();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <DataTablePrimitive data={mockData} columns={mockColumns} />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has aria-sort on sorted column', async () => {
            const user = userEvent.setup();
            render(<DataTablePrimitive data={mockData} columns={mockColumns} sortable />);

            const sortButton = screen.getByRole('button', { name: 'Sort by Name' });
            await user.click(sortButton);

            const nameHeader = sortButton.closest('th');
            expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
        });

        it('has aria-selected on selected rows', () => {
            render(
                <DataTablePrimitive
                    data={mockData}
                    columns={mockColumns}
                    selectable
                    selectedRows={[0]}
                />,
            );

            const rows = screen.getAllByRole('row');
            expect(rows[1]).toHaveAttribute('aria-selected', 'true');
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to wrapper element', () => {
            const ref = vi.fn();
            render(<DataTablePrimitive ref={ref} data={mockData} columns={mockColumns} />);
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
