import React, { forwardRef, cloneElement, isValidElement, type ReactNode, type ReactElement } from 'react';

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: ReactNode;
}

/**
 * Slot merges its props onto its single child element.
 * Used to implement the `asChild` pattern where a component
 * renders as its child element while forwarding all props.
 *
 * @example
 * ```tsx
 * // Button renders as a Link
 * <Button asChild>
 *   <Link href="/home">Go Home</Link>
 * </Button>
 * ```
 */
const Slot = forwardRef<HTMLElement, SlotProps>(({ children, ...props }, ref) => {
    if (!isValidElement(children)) {
        return null;
    }

    const child = children as ReactElement<Record<string, unknown>>;
    const childProps = child.props || {};

    // Merge classNames
    const mergedClassName = [props.className, childProps.className as string]
        .filter(Boolean)
        .join(' ') || undefined;

    // Merge styles
    const mergedStyle = {
        ...(props.style || {}),
        ...((childProps.style as React.CSSProperties) || {}),
    };

    // Merge event handlers
    const mergedProps: Record<string, unknown> = { ...props };
    for (const key of Object.keys(childProps)) {
        if (key.startsWith('on') && typeof childProps[key] === 'function') {
            const parentHandler = mergedProps[key] as ((...args: unknown[]) => void) | undefined;
            const childHandler = childProps[key] as (...args: unknown[]) => void;
            if (parentHandler) {
                mergedProps[key] = (...args: unknown[]) => {
                    childHandler(...args);
                    parentHandler(...args);
                };
            } else {
                mergedProps[key] = childHandler;
            }
        }
    }

    return cloneElement(child, {
        ...mergedProps,
        ...(mergedClassName ? { className: mergedClassName } : {}),
        ...(Object.keys(mergedStyle).length ? { style: mergedStyle } : {}),
        ref,
    } as Record<string, unknown>);
});

Slot.displayName = 'Slot';

export { Slot };
export type { SlotProps };
