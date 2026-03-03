import React from 'react';

import { Portal } from '../utils/Portal';
import { useDialogContext } from './DialogContext';
import type { DialogPortalProps } from './Dialog.types';

/**
 * Headless Dialog.Portal primitive.
 * Renders children in a portal when the dialog is open.
 */
function DialogPortalPrimitive({ children, container }: DialogPortalProps): React.JSX.Element | null {
    const { isOpen } = useDialogContext();

    if (!isOpen) return null;

    return <Portal container={container}>{children}</Portal>;
}

DialogPortalPrimitive.displayName = 'DialogPortalPrimitive';

export { DialogPortalPrimitive };
