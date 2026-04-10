import { useCallback, useState } from 'react';
import type { UseNotificationProps, UseNotificationReturn } from './Notification.types';

export function useNotification(props: UseNotificationProps = {}): UseNotificationReturn {
    const { variant = 'info', isDismissible = false, onDismiss } = props;
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
        notificationProps: {
            role: isUrgent ? 'alert' : 'status',
            tabIndex: isDismissible ? -1 : undefined,
            onKeyDown: handleKeyDown,
        },
        dismissButtonProps: {
            type: 'button' as const,
            'aria-label': 'Dismiss notification',
            onClick: dismiss,
            tabIndex: isDismissible ? 0 : -1,
        },
        isDismissed,
        dismiss,
    };
}
