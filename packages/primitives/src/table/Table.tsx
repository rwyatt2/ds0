import React, { forwardRef } from 'react';

import type {
    TableProps,
    TableHeaderProps,
    TableBodyProps,
    TableRowProps,
    TableHeadProps,
    TableCellProps,
    TableCaptionProps,
    TableFooterProps,
} from './Table.types';

// ─── Root ─────────────────────────────────────────────────────

const TablePrimitive = forwardRef<HTMLTableElement, TableProps>(
    ({ children, className, ...props }, ref) => (
        <table ref={ref} className={className} {...props}>
            {children}
        </table>
    ),
);

TablePrimitive.displayName = 'TablePrimitive';

// ─── Header ──────────────────────────────────────────────────

const TableHeaderPrimitive = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
    ({ children, className, ...props }, ref) => (
        <thead ref={ref} className={className} {...props}>
            {children}
        </thead>
    ),
);

TableHeaderPrimitive.displayName = 'TableHeaderPrimitive';

// ─── Body ────────────────────────────────────────────────────

const TableBodyPrimitive = forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ children, className, ...props }, ref) => (
        <tbody ref={ref} className={className} {...props}>
            {children}
        </tbody>
    ),
);

TableBodyPrimitive.displayName = 'TableBodyPrimitive';

// ─── Row ─────────────────────────────────────────────────────

const TableRowPrimitive = forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ children, className, ...props }, ref) => (
        <tr ref={ref} className={className} {...props}>
            {children}
        </tr>
    ),
);

TableRowPrimitive.displayName = 'TableRowPrimitive';

// ─── Head Cell ───────────────────────────────────────────────

const TableHeadPrimitive = forwardRef<HTMLTableCellElement, TableHeadProps>(
    ({ sortDirection, children, className, ...props }, ref) => (
        <th
            ref={ref}
            aria-sort={sortDirection || undefined}
            className={className}
            {...props}
        >
            {children}
        </th>
    ),
);

TableHeadPrimitive.displayName = 'TableHeadPrimitive';

// ─── Cell ────────────────────────────────────────────────────

const TableCellPrimitive = forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ children, className, ...props }, ref) => (
        <td ref={ref} className={className} {...props}>
            {children}
        </td>
    ),
);

TableCellPrimitive.displayName = 'TableCellPrimitive';

// ─── Caption ─────────────────────────────────────────────────

const TableCaptionPrimitive = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
    ({ children, className, ...props }, ref) => (
        <caption ref={ref} className={className} {...props}>
            {children}
        </caption>
    ),
);

TableCaptionPrimitive.displayName = 'TableCaptionPrimitive';

// ─── Footer ──────────────────────────────────────────────────

const TableFooterPrimitive = forwardRef<HTMLTableSectionElement, TableFooterProps>(
    ({ children, className, ...props }, ref) => (
        <tfoot ref={ref} className={className} {...props}>
            {children}
        </tfoot>
    ),
);

TableFooterPrimitive.displayName = 'TableFooterPrimitive';

// ─── Exports ─────────────────────────────────────────────────

export {
    TablePrimitive,
    TableHeaderPrimitive,
    TableBodyPrimitive,
    TableRowPrimitive,
    TableHeadPrimitive,
    TableCellPrimitive,
    TableCaptionPrimitive,
    TableFooterPrimitive,
};
