import { useCallback, useState } from 'react';

import type { UseBannerProps, UseBannerReturn } from './Banner.types';

/**
 * Hook that encapsulates Banner behavior.
 * Manages dismiss state, keyboard interactions, and ARIA attributes.
 *
 * @param props - Configuration options
 * @returns Props for the banner and dismiss button
 *
 * @example
 * ```tsx
 * const { bannerProps, dismissButtonProps, isDismissed } = useBanner({
 *   variant: 'info',
 *   isDismissible: true,
 *   onDismiss: () => console.log('dismissed'),
 * });
 * ```
 */
export function useBanner(props: UseBannerProps = {}): UseBannerReturn {
    const {
        variant = 'info',
        isDismissible = false,
        onDismiss,
    } = props;

    const [isDismissed, setIsDismissed] = useState(false);

    const dismiss = useCallback(() => {
        setIsDismissed(true);
        onDismiss?.();
    }, [onDismiss]);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Escape' && isDismissible) {
                event.preventDefault();
                dismiss();
            }
        },
        [isDismissible, dismiss],
    );

    const isUrgent = variant === 'error' || variant === 'warning';

    return {
        bannerProps: {
            role: isUrgent ? 'alert' : 'banner',
            tabIndex: isDismissible ? -1 : undefined,
            onKeyDown: handleKeyDown,
        },
        dismissButtonProps: {
            type: 'button' as const,
            'aria-label': 'Dismiss banner',
            onClick: dismiss,
            tabIndex: isDismissible ? 0 : -1,
        },
        isDismissed,
        dismiss,
    };
}
