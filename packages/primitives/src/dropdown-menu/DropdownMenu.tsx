import React, { createContext, forwardRef, useCallback, useContext, useRef } from 'react';
import { useDropdownMenu } from './useDropdownMenu';
import type {
    DropdownMenuProps,
    DropdownMenuTriggerProps,
    DropdownMenuContentProps,
    DropdownMenuItemProps,
    DropdownMenuSeparatorProps,
    DropdownMenuLabelProps,
    UseDropdownMenuReturn,
} from './DropdownMenu.types';

const DropdownMenuContext = createContext<UseDropdownMenuReturn | null>(null);

function useDropdownMenuContext(): UseDropdownMenuReturn {
    const ctx = useContext(DropdownMenuContext);
    if (!ctx) throw new Error('DropdownMenu sub-components must be within a DropdownMenu');
    return ctx;
}

/**
 * Headless DropdownMenu root.
 */
const DropdownMenuPrimitive = forwardRef<HTMLDivElement, DropdownMenuProps>(
    ({ open, defaultOpen, onOpenChange, children, ...props }, ref) => {
        const menu = useDropdownMenu({ open, defaultOpen, onOpenChange });
        return (
            <DropdownMenuContext.Provider value={menu}>
                <div ref={ref} style={{ position: 'relative', display: 'inline-block' }} {...props}>
                    {children}
                </div>
            </DropdownMenuContext.Provider>
        );
    },
);
DropdownMenuPrimitive.displayName = 'DropdownMenuPrimitive';

/**
 * Headless DropdownMenu trigger.
 */
const DropdownMenuTriggerPrimitive = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
    ({ children, onClick, ...props }, ref) => {
        const { triggerProps } = useDropdownMenuContext();
        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            triggerProps.onClick?.(e);
            onClick?.(e);
        };
        return (
            <button ref={ref} {...props} {...triggerProps} onClick={handleClick}>
                {children}
            </button>
        );
    },
);
DropdownMenuTriggerPrimitive.displayName = 'DropdownMenuTriggerPrimitive';

/**
 * Headless DropdownMenu content.
 */
const DropdownMenuContentPrimitive = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
    ({ children, className, ...props }, ref) => {
        const { isOpen, contentProps, closeMenu } = useDropdownMenuContext();
        const contentRef = useRef<HTMLDivElement>(null);

        const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
            const items = contentRef.current?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])');
            if (!items) return;
            const itemsArr = Array.from(items) as HTMLElement[];
            const current = document.activeElement as HTMLElement;
            const idx = itemsArr.indexOf(current);

            switch (event.key) {
                case 'ArrowDown': {
                    event.preventDefault();
                    const next = idx < itemsArr.length - 1 ? idx + 1 : 0;
                    itemsArr[next]?.focus();
                    break;
                }
                case 'ArrowUp': {
                    event.preventDefault();
                    const prev = idx > 0 ? idx - 1 : itemsArr.length - 1;
                    itemsArr[prev]?.focus();
                    break;
                }
                case 'Home': {
                    event.preventDefault();
                    itemsArr[0]?.focus();
                    break;
                }
                case 'End': {
                    event.preventDefault();
                    itemsArr[itemsArr.length - 1]?.focus();
                    break;
                }
            }
        }, []);

        // Click outside to close
        React.useEffect(() => {
            if (!isOpen) return;
            const handle = (e: MouseEvent) => {
                if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
                    closeMenu();
                }
            };
            document.addEventListener('mousedown', handle);
            return () => document.removeEventListener('mousedown', handle);
        }, [isOpen, closeMenu]);

        if (!isOpen) return null;

        return (
            <div
                ref={(el) => {
                    (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
                    if (typeof ref === 'function') ref(el);
                    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
                }}
                className={className}
                onKeyDown={handleKeyDown}
                tabIndex={-1}
                {...props}
                {...contentProps}
            >
                {children}
            </div>
        );
    },
);
DropdownMenuContentPrimitive.displayName = 'DropdownMenuContentPrimitive';

/**
 * Headless DropdownMenu item.
 */
const DropdownMenuItemPrimitive = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
    ({ children, isDisabled, onSelect, onClick, ...props }, ref) => {
        const { closeMenu } = useDropdownMenuContext();
        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (isDisabled) return;
            onSelect?.();
            closeMenu();
            onClick?.(e);
        };
        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (isDisabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect?.();
                closeMenu();
            }
        };
        return (
            <div
                ref={ref}
                role="menuitem"
                tabIndex={isDisabled ? -1 : 0}
                aria-disabled={isDisabled || undefined}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
            </div>
        );
    },
);
DropdownMenuItemPrimitive.displayName = 'DropdownMenuItemPrimitive';

/**
 * Headless DropdownMenu separator.
 */
const DropdownMenuSeparatorPrimitive = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
    (props, ref) => <div ref={ref} role="separator" {...props} />,
);
DropdownMenuSeparatorPrimitive.displayName = 'DropdownMenuSeparatorPrimitive';

/**
 * Headless DropdownMenu label.
 */
const DropdownMenuLabelPrimitive = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
    ({ children, ...props }, ref) => <div ref={ref} {...props}>{children}</div>,
);
DropdownMenuLabelPrimitive.displayName = 'DropdownMenuLabelPrimitive';

export {
    DropdownMenuPrimitive,
    DropdownMenuTriggerPrimitive,
    DropdownMenuContentPrimitive,
    DropdownMenuItemPrimitive,
    DropdownMenuSeparatorPrimitive,
    DropdownMenuLabelPrimitive,
};
