import React, { useMemo, useRef } from 'react';

import { useDialog } from './useDialog';
import { DialogContext } from './DialogContext';
import type { DialogProps } from './Dialog.types';

/**
 * Headless Dialog root primitive.
 * Provides context to all Dialog sub-components.
 * Does NOT render any DOM element — it's a context-only provider.
 *
 * @example
 * ```tsx
 * <DialogPrimitive onOpenChange={(open) => console.log(open)}>
 *   <DialogTriggerPrimitive>Open</DialogTriggerPrimitive>
 *   <DialogPortalPrimitive>
 *     <DialogOverlayPrimitive />
 *     <DialogContentPrimitive>
 *       <DialogTitlePrimitive>Title</DialogTitlePrimitive>
 *       <DialogDescriptionPrimitive>Description</DialogDescriptionPrimitive>
 *       <DialogClosePrimitive>Close</DialogClosePrimitive>
 *     </DialogContentPrimitive>
 *   </DialogPortalPrimitive>
 * </DialogPrimitive>
 * ```
 */
function DialogPrimitive({ open, defaultOpen, onOpenChange, children }: DialogProps): React.JSX.Element {
    const dialog = useDialog({ open, defaultOpen, onOpenChange });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const contextValue = useMemo(
        () => ({
            isOpen: dialog.isOpen,
            open: dialog.open,
            close: dialog.close,
            ids: dialog.ids,
            triggerRef,
            contentRef,
        }),
        [dialog.isOpen, dialog.open, dialog.close, dialog.ids],
    );

    return (
        <DialogContext.Provider value={contextValue}>
            {children}
        </DialogContext.Provider>
    );
}

DialogPrimitive.displayName = 'DialogPrimitive';

export { DialogPrimitive };
