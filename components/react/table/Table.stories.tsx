import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Table } from './Table';

const meta: Meta<typeof Table> = {
    title: 'Components/Data Display/Table',
    component: Table,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const invoices = [
    { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    { invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
    { invoice: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
    { invoice: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
];

export const Default: Story = {
    render: () => (
        <Table>
            <Table.Caption>A list of your recent invoices.</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head className="w-[100px]">Invoice</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Method</Table.Head>
                    <Table.Head className="text-right">Amount</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {invoices.map((invoice) => (
                    <Table.Row key={invoice.invoice}>
                        <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
                        <Table.Cell>{invoice.status}</Table.Cell>
                        <Table.Cell>{invoice.method}</Table.Cell>
                        <Table.Cell className="text-right">{invoice.amount}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.Cell colSpan={3}>Total</Table.Cell>
                    <Table.Cell className="text-right">$1,750.00</Table.Cell>
                </Table.Row>
            </Table.Footer>
        </Table>
    ),
};

export const Simple: Story = {
    render: () => (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Name</Table.Head>
                    <Table.Head>Email</Table.Head>
                    <Table.Head>Role</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>Alice Johnson</Table.Cell>
                    <Table.Cell>alice@example.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Bob Smith</Table.Cell>
                    <Table.Cell>bob@example.com</Table.Cell>
                    <Table.Cell>Editor</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    ),
};

export const WithSortableHeaders: Story = {
    render: () => (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.Head sortDirection="ascending" className="cursor-pointer">Name ↑</Table.Head>
                    <Table.Head className="cursor-pointer">Date</Table.Head>
                    <Table.Head>Status</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>Alice</Table.Cell>
                    <Table.Cell>2024-01-15</Table.Cell>
                    <Table.Cell>Active</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Bob</Table.Cell>
                    <Table.Cell>2024-02-20</Table.Cell>
                    <Table.Cell>Inactive</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    ),
};

export const Striped: Story = {
    render: () => (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Name</Table.Head>
                    <Table.Head>Value</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'].map((name, i) => (
                    <Table.Row key={name} className={i % 2 === 0 ? 'bg-muted/50' : ''}>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{(i + 1) * 100}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    ),
};
