/**
 * Scrollbar visibility type.
 */
export type ScrollAreaType = 'auto' | 'always' | 'scroll' | 'hover';

/**
 * Scrollbar orientation.
 */
export type ScrollAreaOrientation = 'vertical' | 'horizontal';

/**
 * Props for the useScrollArea hook.
 */
export interface UseScrollAreaProps {
    /** Scrollbar visibility behavior */
    type?: ScrollAreaType;
    /** Delay in ms before hiding scrollbar */
    scrollHideDelay?: number;
}

/**
 * Return value of the useScrollArea hook.
 */
export interface UseScrollAreaReturn {
    /** Props for the viewport element */
    viewportProps: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * Props for the ScrollArea root component.
 */
export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement>, UseScrollAreaProps {
    /** Scrollable content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for the ScrollArea.Scrollbar sub-component.
 */
export interface ScrollAreaScrollbarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Scroll direction */
    orientation?: ScrollAreaOrientation;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Props for the styled ScrollArea.
 */
export type StyledScrollAreaProps = ScrollAreaProps;
