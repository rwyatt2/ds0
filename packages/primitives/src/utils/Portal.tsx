import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Props for the Portal component.
 */
interface PortalProps {
    /** Content to render in the portal */
    children: React.ReactNode;
    /** Optional container element to portal into. Defaults to document.body. */
    container?: HTMLElement;
}

/**
 * Renders children into a portal container outside the normal DOM tree.
 * Creates a `div[data-ds0-portal]` element appended to `document.body`
 * (or a custom container).
 *
 * Used by Dialog, Drawer, Popover, Tooltip, and Select for overlay rendering.
 *
 * @example
 * ```tsx
 * <Portal>
 *   <div className="overlay">Portal content</div>
 * </Portal>
 * ```
 */
function Portal({ children, container }: PortalProps): React.ReactPortal | null {
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (container) {
            setPortalContainer(container);
            return;
        }

        const el = document.createElement('div');
        el.setAttribute('data-ds0-portal', '');
        document.body.appendChild(el);
        setPortalContainer(el);

        return () => {
            document.body.removeChild(el);
        };
    }, [container]);

    if (!portalContainer) return null;
    return createPortal(children, portalContainer);
}

Portal.displayName = 'Portal';

export { Portal };
export type { PortalProps };
