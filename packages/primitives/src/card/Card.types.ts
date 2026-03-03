import type React from 'react';

// ─── Component Props ─────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Visual style */
    variant?: 'default' | 'outline' | 'ghost' | 'elevated';
    /** Internal padding */
    padding?: 'none' | 'sm' | 'md' | 'lg';
    /** HTML element */
    as?: React.ElementType;
    /** Card content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    /** HTML element to render */
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    className?: string;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

// Card is presentational — no hook or context types needed
