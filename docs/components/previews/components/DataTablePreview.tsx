'use client';

import { DataTable } from '../../../../components/react/data-table';

const data = [
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
    { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
    { name: 'Dan Brown', email: 'dan@example.com', role: 'Editor', status: 'Active' },
    { name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
];

const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'status', header: 'Status' },
];

export function DataTablePreview(): React.ReactElement {
    return (
        <div className="w-full max-w-2xl">
            <DataTable
                data={data}
                columns={columns}
                variant="striped"
                sortable
            />
        </div>
    );
}
