import type React from 'react';

/**
 * Heading level type.
 */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Props for the useHeading hook.
 */
export interface UseHeadingProps {
    /** The heading level */
    as?: HeadingLevel;
}

/**
 * Return value of the useHeading hook.
 */
export interface UseHeadingReturn {
    /** Props to spread onto the heading element */
    headingProps: React.HTMLAttributes<HTMLHeadingElement>;
    /** The resolved heading element tag */
    Element: HeadingLevel;
}

/**
 * Props for the HeadingPrimitive component.
 */
export interface HeadingPrimitiveProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
    UseHeadingProps {
    /** Content to display inside the heading */
    children: React.ReactNode;
}

/**
 * Props for the styled Heading component.
 */
export interface StyledHeadingProps extends HeadingPrimitiveProps {
    /** Override visual size (decoupled from semantic level) */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    /** Font weight */
    weight?: 'regular' | 'medium' | 'semibold' | 'bold';
    /** Letter spacing */
    tracking?: 'tighter' | 'tight' | 'normal';
    /** Additional CSS classes */
    className?: string;
}
