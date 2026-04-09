import type { UseScrollAreaProps, UseScrollAreaReturn } from './ScrollArea.types';

/**
 * Hook that encapsulates ScrollArea behavior.
 * Manages scrollbar visibility and viewport props.
 *
 * @param props - Configuration options
 * @returns Props for the viewport element
 */
export function useScrollArea(_props: UseScrollAreaProps): UseScrollAreaReturn {
    return {
        viewportProps: {
            style: {
                overflow: 'scroll',
                scrollbarWidth: 'none',
            },
        },
    };
}
