import React, { forwardRef } from 'react';

import { cn } from '@ds0/primitives';
import type {
    TableProps,
    TableHeaderProps,
    TableBodyProps,
    TableRowProps,
    TableHeadProps,
    TableCellProps,
    TableCaptionProps,
    TableFooterProps,
} from '@ds0/primitives';

// ─── Root ─────────────────────────────────────────────────────

/**
 * Styled Table component.
 * Wraps a native HTML table with consistent DS0 styling.
 *
 * @example
 * ```tsx
 * <Table>
 *   <Table.Header>
 *     <Table.Row>
 *       <Table.Head>Name</Table.Head>
 *       <Table.Head>Email</Table.Head>
 *     </Table.Row>
 *   </Table.Header>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>Alice</Table.Cell>
 *       <Table.Cell>alice@example.com</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/table | Documentation}
 */
const Table = forwardRef<HTMLTableElement, TableProps>(
    ({ children, className, ...props }, ref) => (
        <div className="relative w-full overflow-auto">
            <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props}>
                {children}
            </table>
        </div>
    ),
);

Table.displayName = 'Table';

// ─── Header ──────────────────────────────────────────────────

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
    ({ children, className, ...props }, ref) => (
        <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props}>
            {children}
        </thead>
    ),
);

TableHeader.displayName = 'TableHeader';

// ─── Body ────────────────────────────────────────────────────

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ children, className, ...props }, ref) => (
        <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props}>
            {children}
        </tbody>
    ),
);

TableBody.displayName = 'TableBody';

// ─── Row ─────────────────────────────────────────────────────

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ children, className, ...props }, ref) => (
        <tr
            ref={ref}
            className={cn(
                'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
                className,
            )}
            {...props}
        >
            {children}
        </tr>
    ),
);

TableRow.displayName = 'TableRow';

// ─── Head Cell ───────────────────────────────────────────────

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
    ({ sortDirection, children, className, ...props }, ref) => (
        <th
            ref={ref}
            aria-sort={sortDirection || undefined}
            className={cn(
                'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
                className,
            )}
            {...props}
        >
            {children}
        </th>
    ),
);

TableHead.displayName = 'TableHead';

// ─── Cell ────────────────────────────────────────────────────

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ children, className, ...props }, ref) => (
        <td
            ref={ref}
            className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
            {...props}
        >
            {children}
        </td>
    ),
);

TableCell.displayName = 'TableCell';

// ─── Caption ─────────────────────────────────────────────────

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
    ({ children, className, ...props }, ref) => (
        <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props}>
            {children}
        </caption>
    ),
);

TableCaption.displayName = 'TableCaption';

// ─── Footer ──────────────────────────────────────────────────

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
    ({ children, className, ...props }, ref) => (
        <tfoot
            ref={ref}
            className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
            {...props}
        >
            {children}
        </tfoot>
    ),
);

TableFooter.displayName = 'TableFooter';

// ─── Compound Export ─────────────────────────────────────────

const TableCompound = Object.assign(Table, {
    Header: TableHeader,
    Body: TableBody,
    Row: TableRow,
    Head: TableHead,
    Cell: TableCell,
    Caption: TableCaption,
    Footer: TableFooter,
});

export { TableCompound as Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableFooter };
