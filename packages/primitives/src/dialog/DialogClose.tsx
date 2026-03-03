import React, { forwardRef } from 'react';

import { useDialogContext } from './DialogContext';
import type { DialogCloseProps } from './Dialog.types';

/**
 * Headless Dialog.Close primitive.
 * Button that closes the dialog.
 */
const DialogClosePrimitive = forwardRef<HTMLButtonElement, DialogCloseProps>(
    ({ children, onClick, ...props }, ref) => {
        const { close } = useDialogContext();

        return (
            <button
                ref={ref}
                type="button"
                onClick={(event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented) {
                        close();
                    }
                }}
                {...props}
            >
                {children}
            </button>
        );
    },
);

DialogClosePrimitive.displayName = 'DialogClosePrimitive';

export { DialogClosePrimitive };
