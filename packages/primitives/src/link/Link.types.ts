import type React from 'react';

export interface UseLinkProps { isExternal?: boolean; isDisabled?: boolean; href?: string; }
export interface UseLinkReturn { linkProps: React.AnchorHTMLAttributes<HTMLAnchorElement>; }

export interface LinkPrimitiveProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>, UseLinkProps {
    href: string;
    children: React.ReactNode;
}

export interface StyledLinkProps extends LinkPrimitiveProps {
    variant?: 'default' | 'muted' | 'underline';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
    className?: string;
}
