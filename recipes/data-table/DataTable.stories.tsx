import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { Badge } from '../../components/react/badge';

const meta: Meta = {
    title: 'Recipes/Data/DataTable',
    tags: ['autodocs'],
};
export default meta;

interface User { id: string; name: string; email: string; role: string; status: string }

const users: User[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', status: 'Inactive' },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active' },
    { id: '5', name: 'Eve Wilson', email: 'eve@example.com', role: 'User', status: 'Active' },
    { id: '6', name: 'Frank Castle', email: 'frank@example.com', role: 'Editor', status: 'Inactive' },
];

const columns = [
    { key: 'name', header: 'Name', accessor: (r: User) => r.name, sortable: true },
    { key: 'email', header: 'Email', accessor: (r: User) => r.email, sortable: true },
    { key: 'role', header: 'Role', accessor: (r: User) => r.role },
    { key: 'status', header: 'Status', accessor: (r: User) => <Badge variant={r.status === 'Active' ? 'default' : 'secondary'}>{r.status}</Badge> },
];

function DataTableWithSearch() {
    return (
        <DataTable
            columns={columns}
            data={users}
            getRowKey={(r) => r.id}
            searchable
            onSearch={(q) => users.filter((u) => u.name.toLowerCase().includes(q.toLowerCase()))}
        />
    );
}

function DataTableWithSelection() {
    const [selected, setSelected] = useState(new Set<string>());
    return (
        <DataTable columns={columns} data={users} getRowKey={(r) => r.id} selectable selectedKeys={selected} onSelectionChange={setSelected} />
    );
}

export const Default = { render: () => <DataTable columns={columns} data={users} getRowKey={(r) => r.id} /> };
export const WithSearch = { render: () => <DataTableWithSearch /> };
export const WithSelection = { render: () => <DataTableWithSelection /> };
export const WithPagination = { render: () => <DataTable columns={columns} data={users} getRowKey={(r) => r.id} pageSize={3} /> };
export const Loading = { render: () => <DataTable columns={columns} data={[]} getRowKey={(r: User) => r.id} isLoading pageSize={5} /> };
export const Empty = { render: () => <DataTable columns={columns} data={[]} getRowKey={(r: User) => r.id} emptyMessage="No users found." /> };
