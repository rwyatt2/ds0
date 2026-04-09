import React, { createContext, forwardRef, useContext } from 'react';

import { useCollapsible } from './useCollapsible';
import type {
    CollapsibleProps,
    CollapsibleTriggerProps,
    CollapsibleContentProps,
    UseCollapsibleReturn,
} from './Collapsible.types';

/**
 * Context to share Collapsible state between sub-components.
 */
const CollapsibleContext = createContext<UseCollapsibleReturn | null>(null);

function useCollapsibleContext(): UseCollapsibleReturn {
    const context = useContext(CollapsibleContext);
    if (!context) {
        throw new Error('Collapsible sub-components must be used within a Collapsible.Root');
    }
    return context;
}

/**
 * Headless Collapsible root primitive.
 * Manages open/close state and provides context to sub-components.
 *
 * @example
 * ```tsx
 * <CollapsiblePrimitive>
 *   <CollapsibleTriggerPrimitive>Toggle</CollapsibleTriggerPrimitive>
 *   <CollapsibleContentPrimitive>Content here</CollapsibleContentPrimitive>
 * </CollapsiblePrimitive>
 * ```
 */
const CollapsiblePrimitive = forwardRef<HTMLDivElement, CollapsibleProps>(
    ({ open, defaultOpen, onOpenChange, children, className, ...props }, ref) => {
        const collapsible = useCollapsible({ open, defaultOpen, onOpenChange });

        return (
            <CollapsibleContext.Provider value={collapsible}>
                <div ref={ref} className={className} data-state={collapsible.isOpen ? 'open' : 'closed'} {...props}>
                    {children}
                </div>
            </CollapsibleContext.Provider>
        );
    },
);

CollapsiblePrimitive.displayName = 'CollapsiblePrimitive';

/**
 * Headless Collapsible trigger primitive.
 * A button that toggles the collapsible content open/closed.
 */
const CollapsibleTriggerPrimitive = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
    ({ children, onClick, ...props }, ref) => {
        const { triggerProps } = useCollapsibleContext();

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            triggerProps.onClick?.(event);
            onClick?.(event);
        };

        return (
            <button ref={ref} {...props} {...triggerProps} onClick={handleClick}>
                {children}
            </button>
        );
    },
);

CollapsibleTriggerPrimitive.displayName = 'CollapsibleTriggerPrimitive';

/**
 * Headless Collapsible content primitive.
 * The content area that is shown/hidden.
 */
const CollapsibleContentPrimitive = forwardRef<HTMLDivElement, CollapsibleContentProps>(
    ({ children, forceMount = false, ...props }, ref) => {
        const { isOpen, contentProps } = useCollapsibleContext();

        if (!isOpen && !forceMount) {
            return null;
        }

        return (
            <div ref={ref} {...props} {...contentProps}>
                {children}
            </div>
        );
    },
);

CollapsibleContentPrimitive.displayName = 'CollapsibleContentPrimitive';

export { CollapsiblePrimitive, CollapsibleTriggerPrimitive, CollapsibleContentPrimitive };
