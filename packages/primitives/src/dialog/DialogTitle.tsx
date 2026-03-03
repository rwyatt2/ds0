import React, { forwardRef } from 'react';

import { useDialogContext } from './DialogContext';
import type { DialogTitleProps } from './Dialog.types';

/**
 * Headless Dialog.Title primitive.
 * Renders the dialog title with the correct id for ARIA labelling.
 */
const DialogTitlePrimitive = forwardRef<HTMLHeadingElement, DialogTitleProps>(
    ({ children, ...props }, ref) => {
        const { ids } = useDialogContext();

        return (
            <h2 ref={ref} id={ids.title} {...props}>
                {children}
            </h2>
        );
    },
);

DialogTitlePrimitive.displayName = 'DialogTitlePrimitive';

export { DialogTitlePrimitive };
