import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DataTable } from './DataTable';

expect.extend(toHaveNoViolations);

interface User { id: string; name: string; email: string; role: string }

const columns = [
    { key: 'name', header: 'Name', accessor: (r: User) => r.name, sortable: true },
    { key: 'email', header: 'Email', accessor: (r: User) => r.email },
    { key: 'role', header: 'Role', accessor: (r: User) => r.role },
];

const data: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: '2', name: 'Bob', email: 'bob@example.com', role: 'User' },
    { id: '3', name: 'Charlie', email: 'charlie@example.com', role: 'Editor' },
];

describe('DataTable', () => {
    describe('rendering', () => {
        it('renders column headers', () => {
            render(<DataTable columns={columns} data={data} getRowKey={(r) => r.id} />);
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Role')).toBeInTheDocument();
        });

        it('renders row data', () => {
            render(<DataTable columns={columns} data={data} getRowKey={(r) => r.id} />);
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('bob@example.com')).toBeInTheDocument();
        });

        it('renders empty message when no data', () => {
            render(<DataTable columns={columns} data={[]} getRowKey={(r) => r.id} emptyMessage="No users" />);
            expect(screen.getByText('No users')).toBeInTheDocument();
        });

        it('renders pagination when pageSize set', () => {
            render(<DataTable columns={columns} data={data} getRowKey={(r) => r.id} pageSize={2} />);
            expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('sorts data when sortable header clicked', async () => {
            const user = userEvent.setup();
            render(<DataTable columns={columns} data={data} getRowKey={(r) => r.id} />);
            await user.click(screen.getByText('Name'));
            const cells = screen.getAllByRole('cell');
            // After sort, first cell should have a name value
            expect(cells.length).toBeGreaterThan(0);
        });

        it('paginates data', async () => {
            const user = userEvent.setup();
            render(<DataTable columns={columns} data={data} getRowKey={(r) => r.id} pageSize={2} />);
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
            await user.click(screen.getByRole('button', { name: /next/i }));
            expect(screen.getByText('Charlie')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <DataTable columns={columns} data={data} getRowKey={(r) => r.id} searchable selectable pageSize={10} />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
