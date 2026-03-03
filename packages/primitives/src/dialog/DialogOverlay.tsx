import React, { forwardRef } from 'react';

import { useDialogContext } from './DialogContext';
import type { DialogOverlayProps } from './Dialog.types';

/**
 * Headless Dialog.Overlay primitive.
 * Backdrop overlay behind the dialog. Clicking closes the dialog.
 */
const DialogOverlayPrimitive = forwardRef<HTMLDivElement, DialogOverlayProps>(
    ({ onClick, ...props }, ref) => {
        const { close, isOpen } = useDialogContext();

        return (
            <div
                ref={ref}
                aria-hidden="true"
                data-state={isOpen ? 'open' : 'closed'}
                onClick={(event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented) {
                        close();
                    }
                }}
                {...props}
            />
        );
    },
);

DialogOverlayPrimitive.displayName = 'DialogOverlayPrimitive';

export { DialogOverlayPrimitive };
