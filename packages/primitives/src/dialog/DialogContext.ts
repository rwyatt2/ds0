import { createContext, useContext } from 'react';

import type { DialogContextValue } from './Dialog.types';

const DialogContext = createContext<DialogContextValue | null>(null);

/**
 * Hook to access Dialog context from sub-components.
 * Throws if used outside a Dialog provider.
 */
export function useDialogContext(): DialogContextValue {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error(
            'DS0: Dialog sub-components must be used within a <Dialog> parent. ' +
            'See https://ds0.systems/docs/components/dialog',
        );
    }
    return context;
}

export { DialogContext };
