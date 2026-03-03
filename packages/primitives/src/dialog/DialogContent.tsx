import React, { forwardRef, useCallback, useEffect } from 'react';

import { useFocusTrap } from '../utils/useFocusTrap';
import { useScrollLock } from '../utils/useScrollLock';
import { useEscapeKey } from '../utils/useEscapeKey';
import { useDialogContext } from './DialogContext';
import type { DialogContentProps } from './Dialog.types';

/**
 * Headless Dialog.Content primitive.
 * The dialog panel with focus trap, scroll lock, and escape key handling.
 * Focus is trapped inside and returned to trigger on close.
 */
const DialogContentPrimitive = forwardRef<HTMLDivElement, DialogContentProps>(
    ({ onEscapeKeyDown, children, ...props }, ref) => {
        const { isOpen, close, ids, triggerRef, contentRef } = useDialogContext();

        // Focus trap
        useFocusTrap(contentRef, isOpen);

        // Scroll lock
        useScrollLock(isOpen);

        // Escape key
        const handleEscape = useCallback(
            (event: KeyboardEvent) => {
                if (onEscapeKeyDown) {
                    onEscapeKeyDown(event);
                    if (event.defaultPrevented) return;
                }
                close();
            },
            [onEscapeKeyDown, close],
        );
        useEscapeKey(handleEscape, isOpen);

        // Focus restoration on close
        useEffect(() => {
            if (!isOpen && triggerRef.current) {
                triggerRef.current.focus();
            }
        }, [isOpen, triggerRef]);

        if (!isOpen) return null;

        return (
            <div
                ref={(node) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }}
                id={ids.content}
                role="dialog"
                aria-modal={true}
                aria-labelledby={ids.title}
                aria-describedby={ids.description}
                data-state={isOpen ? 'open' : 'closed'}
                {...props}
            >
                {children}
            </div>
        );
    },
);

DialogContentPrimitive.displayName = 'DialogContentPrimitive';

export { DialogContentPrimitive };
