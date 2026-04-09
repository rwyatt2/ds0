import React, { createContext, forwardRef, useCallback, useContext, useRef } from 'react';
import { cn } from '@ds0/primitives';
import { useDropdownMenu } from '@ds0/primitives';
import type {
    StyledDropdownMenuProps,
    StyledDropdownMenuContentProps,
    StyledDropdownMenuItemProps,
    DropdownMenuSeparatorProps,
    DropdownMenuLabelProps,
    UseDropdownMenuReturn,
    DropdownMenuTriggerProps,
} from '@ds0/primitives';

const DropdownMenuContext = createContext<UseDropdownMenuReturn | null>(null);
function useCtx(): UseDropdownMenuReturn {
    const ctx = useContext(DropdownMenuContext);
    if (!ctx) throw new Error('DropdownMenu sub-components must be within a DropdownMenu');
    return ctx;
}

/**
 * Styled DropdownMenu component.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
 *   <DropdownMenu.Content>
 *     <DropdownMenu.Item onSelect={handleProfile}>Profile</DropdownMenu.Item>
 *     <DropdownMenu.Separator />
 *     <DropdownMenu.Item onSelect={handleSignOut}>Sign out</DropdownMenu.Item>
 *   </DropdownMenu.Content>
 * </DropdownMenu>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/dropdown-menu | Documentation}
 */
const DropdownMenu = forwardRef<HTMLDivElement, StyledDropdownMenuProps>(
    ({ open, defaultOpen, onOpenChange, children, ...props }, ref) => {
        const menu = useDropdownMenu({ open, defaultOpen, onOpenChange });
        return (
            <DropdownMenuContext.Provider value={menu}>
                <div ref={ref} className="relative inline-block" {...props}>{children}</div>
            </DropdownMenuContext.Provider>
        );
    },
) as DropdownMenuComponent;
DropdownMenu.displayName = 'DropdownMenu';

const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
    ({ children, className, onClick, ...props }, ref) => {
        const { triggerProps } = useCtx();
        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { triggerProps.onClick?.(e); onClick?.(e); };
        return (
            <button ref={ref} className={cn('inline-flex items-center justify-center', className)} {...props} {...triggerProps} onClick={handleClick}>
                {children}
            </button>
        );
    },
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = forwardRef<HTMLDivElement, StyledDropdownMenuContentProps>(
    ({ children, className, align: _align, side: _side, sideOffset: _offset, ...props }, ref) => {
        const { isOpen, contentProps, closeMenu } = useCtx();
        const contentRef = useRef<HTMLDivElement>(null);

        const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
            const items = contentRef.current?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])');
            if (!items) return;
            const arr = Array.from(items) as HTMLElement[];
            const idx = arr.indexOf(document.activeElement as HTMLElement);
            switch (event.key) {
                case 'ArrowDown': { event.preventDefault(); arr[idx < arr.length - 1 ? idx + 1 : 0]?.focus(); break; }
                case 'ArrowUp': { event.preventDefault(); arr[idx > 0 ? idx - 1 : arr.length - 1]?.focus(); break; }
                case 'Home': { event.preventDefault(); arr[0]?.focus(); break; }
                case 'End': { event.preventDefault(); arr[arr.length - 1]?.focus(); break; }
            }
        }, []);

        React.useEffect(() => {
            if (!isOpen) return;
            const handle = (e: MouseEvent) => {
                if (contentRef.current && !contentRef.current.contains(e.target as Node)) closeMenu();
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
                className={cn(
                    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
                    'animate-in fade-in-0 zoom-in-95',
                    className,
                )}
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
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = forwardRef<HTMLDivElement, StyledDropdownMenuItemProps>(
    ({ children, className, isDisabled, onSelect, onClick, ...props }, ref) => {
        const { closeMenu } = useCtx();
        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (isDisabled) return;
            onSelect?.(); closeMenu(); onClick?.(e);
        };
        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (isDisabled) return;
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect?.(); closeMenu(); }
        };
        return (
            <div
                ref={ref}
                role="menuitem"
                tabIndex={isDisabled ? -1 : 0}
                aria-disabled={isDisabled || undefined}
                className={cn(
                    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                    'focus:bg-accent focus:text-accent-foreground',
                    isDisabled && 'pointer-events-none opacity-50',
                    className,
                )}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
            </div>
        );
    },
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} role="separator" className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
    ),
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props}>{children}</div>
    ),
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

interface DropdownMenuComponent extends React.ForwardRefExoticComponent<StyledDropdownMenuProps & React.RefAttributes<HTMLDivElement>> {
    Trigger: typeof DropdownMenuTrigger;
    Content: typeof DropdownMenuContent;
    Item: typeof DropdownMenuItem;
    Separator: typeof DropdownMenuSeparator;
    Label: typeof DropdownMenuLabel;
}

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.Label = DropdownMenuLabel;

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel };
