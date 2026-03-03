import type React from 'react';

/**
 * Element types that Text can render as.
 */
export type TextElement = 'p' | 'span' | 'div' | 'em' | 'strong';

/**
 * Props for the useText hook.
 */
export interface UseTextProps {
    /** The HTML element to render */
    as?: TextElement;
}

/**
 * Return value of the useText hook.
 */
export interface UseTextReturn {
    /** Props to spread onto the text element */
    textProps: React.HTMLAttributes<HTMLElement>;
    /** The resolved element tag */
    Element: TextElement;
}

/**
 * Props for the TextPrimitive component.
 */
export interface TextPrimitiveProps
    extends React.HTMLAttributes<HTMLElement>,
    UseTextProps {
    /** Content to display */
    children: React.ReactNode;
}

/**
 * Props for the styled Text component.
 */
export interface StyledTextProps extends TextPrimitiveProps {
    /** Font size */
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
    /** Font weight */
    weight?: 'regular' | 'medium' | 'semibold' | 'bold';
    /** Text color */
    color?: 'default' | 'muted' | 'primary' | 'destructive' | 'success';
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
    /** Additional CSS classes */
    className?: string;
}
