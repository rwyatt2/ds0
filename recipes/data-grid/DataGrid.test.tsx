/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DataGrid } from './DataGrid';
import type { DataGridColumn } from './types';

expect.extend(toHaveNoViolations);

afterEach(() => {
    cleanup();
});

interface TestRow {
    id: string;
    name: string;
    email: string;
    role: string;
    age: number;
}

const testColumns: DataGridColumn<TestRow>[] = [
    { key: 'name', header: 'Name', accessor: (r) => r.name, sortable: true, filterable: true },
    { key: 'email', header: 'Email', accessor: (r) => r.email, sortable: true },
    { key: 'role', header: 'Role', accessor: (r) => r.role },
    { key: 'age', header: 'Age', accessor: (r) => r.age, rawValue: (r) => r.age, sortable: true },
];

const testData: TestRow[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin', age: 30 },
    { id: '2', name: 'Bob', email: 'bob@example.com', role: 'User', age: 25 },
    { id: '3', name: 'Charlie', email: 'charlie@example.com', role: 'User', age: 35 },
    { id: '4', name: 'Diana', email: 'diana@example.com', role: 'Admin', age: 28 },
];

const getRowKey = (row: TestRow) => row.id;

describe('DataGrid', () => {
    describe('rendering', () => {
        it('renders column headers', () => {
            render(<DataGrid columns={testColumns} data={testData} getRowKey={getRowKey} />);
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Role')).toBeInTheDocument();
            expect(screen.getByText('Age')).toBeInTheDocument();
        });

        it('renders data rows', () => {
            render(<DataGrid columns={testColumns} data={testData} getRowKey={getRowKey} />);
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('Bob')).toBeInTheDocument();
            expect(screen.getByText('charlie@example.com')).toBeInTheDocument();
        });

        it('renders empty state when no data', () => {
            render(<DataGrid columns={testColumns} data={[]} getRowKey={getRowKey} emptyMessage="No results found." />);
            expect(screen.getByText('No results found.')).toBeInTheDocument();
        });

        it('renders loading state', () => {
            const { container } = render(
                <DataGrid columns={testColumns} data={testData} getRowKey={getRowKey} isLoading />,
            );
            const skeletons = container.querySelectorAll('.dg-skeleton');
            expect(skeletons.length).toBeGreaterThanOrEqual(1);
        });

        it('renders caption for accessibility', () => {
            render(<DataGrid columns={testColumns} data={testData} getRowKey={getRowKey} caption="User List" />);
            expect(screen.getByText('User List')).toBeInTheDocument();
        });

        it('renders with striped rows', () => {
            const { container } = render(
                <DataGrid columns={testColumns} data={testData} getRowKey={getRowKey} striped />,
            );
            expect(container.querySelector('.dg-striped')).toBeInTheDocument();
        });
    });

    describe('sorting', () => {
        it('sorts by column when header is clicked', async () => {
            const user = userEvent.setup();
            render(<DataGrid columns={testColumns} data={testData} getRowKey={getRowKey} sortable />);

            const nameHeader = screen.getByText('Name');
            await user.click(nameHeader);

            const rows = screen.getAllByRole('row');
            // First row after header is the first data row (sorted ascending)
            expect(rows[1]).toHaveTextContent('Alice');
        });
    });

    describe('search', () => {
        it('renders search input when searchable', () => {
            render(<DataGrid columns={testColumns} data={testData} getRowKey={getRowKey} searchable />);
            expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
        });

        it('filters rows by search term', async () => {
            const user = userEvent.setup();
            render(<DataGrid columns={testColumns} data={testData} getRowKey={getRowKey} searchable />);

            const searchInput = screen.getByPlaceholderText('Search…');
            await user.type(searchInput, 'Alice');

            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.queryByText('Bob')).not.toBeInTheDocument();
        });
    });

    describe('selection', () => {
        it('renders checkboxes when selectable', () => {
            render(<DataGrid columns={testColumns} data={testData} getRowKey={getRowKey} selectable />);
            const checkboxes = screen.getAllByRole('checkbox');
            // 1 header + 4 data rows
            expect(checkboxes.length).toBe(5);
        });

        it('toggles row selection on checkbox click', async () => {
            const user = userEvent.setup();
            const onSelectionChange = vi.fn();
            render(
                <DataGrid
                    columns={testColumns}
                    data={testData}
                    getRowKey={getRowKey}
                    selectable
                    onSelectionChange={onSelectionChange}
                />,
            );

            const checkboxes = screen.getAllByRole('checkbox');
            // Click the first row checkbox (index 1, since 0 is the header)
            await user.click(checkboxes[1]!);
            expect(onSelectionChange).toHaveBeenCalled();
        });
    });

    describe('pagination', () => {
        it('paginates data when pageSize is set', () => {
            render(
                <DataGrid columns={testColumns} data={testData} getRowKey={getRowKey} pageSize={2} />,
            );
            // Only first 2 rows should be visible
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('Bob')).toBeInTheDocument();
            expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
        });

        it('navigates to next page', async () => {
            const user = userEvent.setup();
            render(
                <DataGrid columns={testColumns} data={testData} getRowKey={getRowKey} pageSize={2} />,
            );

            const nextBtn = screen.getByLabelText(/next/i);
            await user.click(nextBtn);
            expect(screen.getByText('Charlie')).toBeInTheDocument();
            expect(screen.queryByText('Alice')).not.toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <DataGrid
                    columns={testColumns}
                    data={testData}
                    getRowKey={getRowKey}
                    caption="Accessible Grid"
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations with selection', async () => {
            const { container } = render(
                <DataGrid
                    columns={testColumns}
                    data={testData}
                    getRowKey={getRowKey}
                    selectable
                    caption="Selectable Grid"
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
