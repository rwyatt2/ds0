import React, { createContext, forwardRef, useContext } from 'react';

import { cn } from '@ds0/primitives';
import { useCollapsible } from '@ds0/primitives';
import type {
    StyledCollapsibleProps,
    StyledCollapsibleTriggerProps,
    StyledCollapsibleContentProps,
    UseCollapsibleReturn,
} from '@ds0/primitives';

/**
 * Context to share Collapsible state between styled sub-components.
 */
const CollapsibleContext = createContext<UseCollapsibleReturn | null>(null);

function useCollapsibleContext(): UseCollapsibleReturn {
    const context = useContext(CollapsibleContext);
    if (!context) {
        throw new Error('Collapsible sub-components must be used within a Collapsible');
    }
    return context;
}

/**
 * Styled Collapsible component.
 * A show/hide container with animated expand/collapse transitions.
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <Collapsible.Trigger>Toggle Details</Collapsible.Trigger>
 *   <Collapsible.Content>
 *     <p>Hidden content revealed on toggle.</p>
 *   </Collapsible.Content>
 * </Collapsible>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/collapsible | Documentation}
 */
const Collapsible = forwardRef<HTMLDivElement, StyledCollapsibleProps>(
    ({ open, defaultOpen, onOpenChange, children, className, ...props }, ref) => {
        const collapsible = useCollapsible({ open, defaultOpen, onOpenChange });

        return (
            <CollapsibleContext.Provider value={collapsible}>
                <div
                    ref={ref}
                    className={cn(className)}
                    data-state={collapsible.isOpen ? 'open' : 'closed'}
                    {...props}
                >
                    {children}
                </div>
            </CollapsibleContext.Provider>
        );
    },
) as CollapsibleComponent;

Collapsible.displayName = 'Collapsible';

/**
 * Styled Collapsible trigger.
 * A button that toggles the content visibility.
 */
const CollapsibleTrigger = forwardRef<HTMLButtonElement, StyledCollapsibleTriggerProps>(
    ({ children, className, onClick, ...props }, ref) => {
        const { triggerProps } = useCollapsibleContext();

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            triggerProps.onClick?.(event);
            onClick?.(event);
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'flex items-center justify-between w-full text-sm font-medium transition-colors hover:text-foreground/80',
                    className,
                )}
                {...props}
                {...triggerProps}
                onClick={handleClick}
            >
                {children}
            </button>
        );
    },
);

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

/**
 * Styled Collapsible content.
 * The content area with expand/collapse animation.
 */
const CollapsibleContent = forwardRef<HTMLDivElement, StyledCollapsibleContentProps>(
    ({ children, className, forceMount = false, ...props }, ref) => {
        const { isOpen, contentProps } = useCollapsibleContext();

        if (!isOpen && !forceMount) {
            return null;
        }

        return (
            <div
                ref={ref}
                className={cn(
                    'overflow-hidden transition-all duration-200 ease-in-out',
                    isOpen ? 'animate-in fade-in-0' : 'animate-out fade-out-0',
                    className,
                )}
                {...props}
                {...contentProps}
            >
                {children}
            </div>
        );
    },
);

CollapsibleContent.displayName = 'CollapsibleContent';

// Attach sub-components
interface CollapsibleComponent extends React.ForwardRefExoticComponent<
    StyledCollapsibleProps & React.RefAttributes<HTMLDivElement>
> {
    Trigger: typeof CollapsibleTrigger;
    Content: typeof CollapsibleContent;
}

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
