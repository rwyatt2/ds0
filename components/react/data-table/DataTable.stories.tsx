import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from './DataTable';

const sampleData = [
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
    { name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Inactive' },
    { name: 'Diana Ross', email: 'diana@example.com', role: 'Editor', status: 'Active' },
    { name: 'Eve Wilson', email: 'eve@example.com', role: 'User', status: 'Active' },
];

const sampleColumns = [
    { accessorKey: 'name' as const, header: 'Name' },
    { accessorKey: 'email' as const, header: 'Email' },
    { accessorKey: 'role' as const, header: 'Role' },
    { accessorKey: 'status' as const, header: 'Status' },
];

const meta: Meta<typeof DataTable> = {
    title: 'Components/Data Display/DataTable',
    component: DataTable,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'striped'],
            description: 'The visual style',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Cell padding size',
        },
        sortable: {
            control: 'boolean',
            description: 'Enable column sorting',
        },
        selectable: {
            control: 'boolean',
            description: 'Enable row selection',
        },
    },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
    args: {
        data: sampleData,
        columns: sampleColumns,
    },
};

export const Striped: Story = {
    args: {
        data: sampleData,
        columns: sampleColumns,
        variant: 'striped',
    },
};

export const Small: Story = {
    args: {
        data: sampleData,
        columns: sampleColumns,
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        data: sampleData,
        columns: sampleColumns,
        size: 'lg',
    },
};

export const WithSelection: Story = {
    args: {
        data: sampleData,
        columns: sampleColumns,
        selectable: true,
    },
};

export const Sortable: Story = {
    args: {
        data: sampleData,
        columns: sampleColumns,
        sortable: true,
    },
};

export const Empty: Story = {
    args: {
        data: [],
        columns: sampleColumns,
        emptyMessage: 'No users found.',
    },
};

export const RealWorldUsage: Story = {
    name: 'Admin Dashboard',
    args: {
        data: sampleData,
        columns: sampleColumns,
        variant: 'striped',
        selectable: true,
        sortable: true,
    },
};
