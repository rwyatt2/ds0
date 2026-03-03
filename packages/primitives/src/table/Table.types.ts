import type React from 'react';

// ─── Component Props ─────────────────────────────────────────

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    children: React.ReactNode;
    className?: string;
}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
    className?: string;
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
    className?: string;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children: React.ReactNode;
    className?: string;
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    /** Sortable state */
    sortDirection?: 'ascending' | 'descending' | 'none';
    children: React.ReactNode;
    className?: string;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children?: React.ReactNode;
    className?: string;
}

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
    children: React.ReactNode;
    className?: string;
}

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
    className?: string;
}

// Table is presentational — no hook or context types needed
