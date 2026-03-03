import React from 'react';

/**
 * Props for the useBreadcrumb hook.
 */
export interface UseBreadcrumbProps {
    /** Custom aria-label for the navigation landmark */
    'aria-label'?: string;
}

/**
 * Return value of the useBreadcrumb hook.
 */
export interface UseBreadcrumbReturn {
    /** Props to spread onto the nav element */
    navProps: React.HTMLAttributes<HTMLElement>;
}

/**
 * Props for the Breadcrumb root component.
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    /** Custom separator element between items */
    separator?: React.ReactNode;
    /** Breadcrumb content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for Breadcrumb.List.
 */
export interface BreadcrumbListProps extends React.OlHTMLAttributes<HTMLOListElement> {
    children: React.ReactNode;
    className?: string;
}

/**
 * Props for Breadcrumb.Item.
 */
export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    children: React.ReactNode;
    className?: string;
}

/**
 * Props for Breadcrumb.Link.
 */
export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** URL to navigate to */
    href: string;
    /** Use Slot pattern for router Links */
    asChild?: boolean;
    children: React.ReactNode;
    className?: string;
}

/**
 * Props for Breadcrumb.Page (current page).
 */
export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    className?: string;
}

/**
 * Props for Breadcrumb.Separator.
 */
export interface BreadcrumbSeparatorProps extends React.LiHTMLAttributes<HTMLLIElement> {
    children?: React.ReactNode;
    className?: string;
}

/**
 * Props for Breadcrumb.Ellipsis.
 */
export interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
    className?: string;
}
