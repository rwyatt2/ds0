import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
    title: 'Components/Navigation/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    argTypes: {
        totalPages: { control: { type: 'number', min: 1, max: 200 } },
        currentPage: { control: { type: 'number', min: 1 } },
        siblingCount: { control: { type: 'number', min: 0, max: 5 } },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
    },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationDemo = ({ totalPages = 20, initialPage = 1, ...props }: { totalPages?: number; initialPage?: number; siblingCount?: number; showEdges?: boolean; size?: 'sm' | 'md' | 'lg' }) => {
    const [page, setPage] = useState(initialPage);
    return <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} {...props} />;
};

export const Default: Story = {
    render: () => <PaginationDemo />,
};

export const FewPages: Story = {
    render: () => <PaginationDemo totalPages={5} />,
};

export const ManyPages: Story = {
    render: () => <PaginationDemo totalPages={100} initialPage={50} />,
};

export const FirstPage: Story = {
    render: () => <PaginationDemo totalPages={20} initialPage={1} />,
};

export const MiddlePage: Story = {
    render: () => <PaginationDemo totalPages={20} initialPage={10} />,
};

export const LastPage: Story = {
    render: () => <PaginationDemo totalPages={20} initialPage={20} />,
};

export const WithSiblingCount2: Story = {
    render: () => <PaginationDemo totalPages={50} initialPage={25} siblingCount={2} />,
};

export const WithoutEdges: Story = {
    render: () => <PaginationDemo totalPages={30} initialPage={15} showEdges={false} />,
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <PaginationDemo totalPages={10} size="sm" />
            <PaginationDemo totalPages={10} size="md" />
            <PaginationDemo totalPages={10} size="lg" />
        </div>
    ),
};
