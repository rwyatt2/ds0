import { render, screen } from '@testing-library/react-native';

import { DataTable } from './DataTable';

const mockData = [
    { name: 'Alice', email: 'alice@test.com' },
    { name: 'Bob', email: 'bob@test.com' },
];

const mockColumns = [
    { accessorKey: 'name' as const, header: 'Name' },
    { accessorKey: 'email' as const, header: 'Email' },
];

describe('DataTable (Native)', () => {
    it('renders with default props', () => {
        render(<DataTable data={mockData} columns={mockColumns} />);
        expect(screen.getByText('Alice')).toBeTruthy();
    });

    it('renders column headers', () => {
        render(<DataTable data={mockData} columns={mockColumns} />);
        expect(screen.getByText('Name')).toBeTruthy();
        expect(screen.getByText('Email')).toBeTruthy();
    });

    it('renders all data rows', () => {
        render(<DataTable data={mockData} columns={mockColumns} />);
        expect(screen.getByText('Alice')).toBeTruthy();
        expect(screen.getByText('Bob')).toBeTruthy();
    });
});
