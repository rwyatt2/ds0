import { forwardRef } from 'react';
import type { NotificationProps } from './Notification.types';
import { useNotification } from './useNotification';

const NotificationPrimitive = forwardRef<HTMLDivElement, NotificationProps>(
    ({ variant, isDismissible, onDismiss, title, children, ...rest }, ref) => {
        const { notificationProps, dismissButtonProps, isDismissed } = useNotification({
            variant, isDismissible, onDismiss,
        });

        if (isDismissed) return null;

        return (
            <div ref={ref} {...rest} {...notificationProps}>
                {title && <strong>{title}</strong>}
                <div>{children}</div>
                {isDismissible && <button {...dismissButtonProps}>✕</button>}
            </div>
        );
    },
);

NotificationPrimitive.displayName = 'NotificationPrimitive';
export { NotificationPrimitive };
