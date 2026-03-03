import React, { forwardRef } from 'react';

import { useDialogContext } from './DialogContext';
import type { DialogTriggerProps } from './Dialog.types';

/**
 * Headless Dialog.Trigger primitive.
 * Button that opens the dialog.
 */
const DialogTriggerPrimitive = forwardRef<HTMLButtonElement, DialogTriggerProps>(
    ({ children, onClick, ...props }, ref) => {
        const { open, isOpen, ids, triggerRef } = useDialogContext();

        return (
            <button
                ref={(node) => {
                    // Forward both refs
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                    (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                }}
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls={isOpen ? ids.content : undefined}
                onClick={(event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented) {
                        open();
                    }
                }}
                {...props}
            >
                {children}
            </button>
        );
    },
);

DialogTriggerPrimitive.displayName = 'DialogTriggerPrimitive';

export { DialogTriggerPrimitive };
