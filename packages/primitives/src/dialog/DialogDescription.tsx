import React, { forwardRef } from 'react';

import { useDialogContext } from './DialogContext';
import type { DialogDescriptionProps } from './Dialog.types';

/**
 * Headless Dialog.Description primitive.
 * Renders the dialog description with the correct id for ARIA describing.
 */
const DialogDescriptionPrimitive = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
    ({ children, ...props }, ref) => {
        const { ids } = useDialogContext();

        return (
            <p ref={ref} id={ids.description} {...props}>
                {children}
            </p>
        );
    },
);

DialogDescriptionPrimitive.displayName = 'DialogDescriptionPrimitive';

export { DialogDescriptionPrimitive };
