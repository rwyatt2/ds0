import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import {
    TablePrimitive,
    TableHeaderPrimitive,
    TableBodyPrimitive,
    TableRowPrimitive,
    TableHeadPrimitive,
    TableCellPrimitive,
    TableCaptionPrimitive,
    TableFooterPrimitive,
} from './Table';

expect.extend(toHaveNoViolations);

function renderTable() {
    return render(
        <TablePrimitive>
            <TableCaptionPrimitive>A list of users</TableCaptionPrimitive>
            <TableHeaderPrimitive>
                <TableRowPrimitive>
                    <TableHeadPrimitive>Name</TableHeadPrimitive>
                    <TableHeadPrimitive>Email</TableHeadPrimitive>
                </TableRowPrimitive>
            </TableHeaderPrimitive>
            <TableBodyPrimitive>
                <TableRowPrimitive>
                    <TableCellPrimitive>Alice</TableCellPrimitive>
                    <TableCellPrimitive>alice@example.com</TableCellPrimitive>
                </TableRowPrimitive>
            </TableBodyPrimitive>
            <TableFooterPrimitive>
                <TableRowPrimitive>
                    <TableCellPrimitive colSpan={2}>1 user total</TableCellPrimitive>
                </TableRowPrimitive>
            </TableFooterPrimitive>
        </TablePrimitive>,
    );
}

describe('TablePrimitive', () => {
    describe('rendering', () => {
        it('renders table structure', () => {
            renderTable();
            expect(screen.getByRole('table')).toBeInTheDocument();
        });

        it('renders header', () => {
            renderTable();
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
        });

        it('renders body', () => {
            renderTable();
            expect(screen.getByText('Alice')).toBeInTheDocument();
        });

        it('renders caption', () => {
            renderTable();
            expect(screen.getByText('A list of users')).toBeInTheDocument();
        });

        it('renders footer', () => {
            renderTable();
            expect(screen.getByText('1 user total')).toBeInTheDocument();
        });
    });

    describe('sort', () => {
        it('supports aria-sort on header', () => {
            render(
                <TablePrimitive>
                    <TableHeaderPrimitive>
                        <TableRowPrimitive>
                            <TableHeadPrimitive sortDirection="ascending">Name</TableHeadPrimitive>
                        </TableRowPrimitive>
                    </TableHeaderPrimitive>
                    <TableBodyPrimitive>
                        <TableRowPrimitive>
                            <TableCellPrimitive>Alice</TableCellPrimitive>
                        </TableRowPrimitive>
                    </TableBodyPrimitive>
                </TablePrimitive>,
            );
            expect(screen.getByText('Name').closest('th')).toHaveAttribute('aria-sort', 'ascending');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = renderTable();
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref', () => {
            const ref = vi.fn();
            render(
                <TablePrimitive ref={ref}>
                    <TableBodyPrimitive>
                        <TableRowPrimitive>
                            <TableCellPrimitive>Cell</TableCellPrimitive>
                        </TableRowPrimitive>
                    </TableBodyPrimitive>
                </TablePrimitive>,
            );
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
