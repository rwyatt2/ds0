import { forwardRef } from 'react';

import type { EmptyStateProps } from './EmptyState.types';
import { useEmptyState } from './useEmptyState';

/**
 * Headless EmptyState primitive.
 * Provides semantic structure and ARIA attributes for empty views.
 * Does NOT include any styling.
 *
 * @example
 * ```tsx
 * <EmptyStatePrimitive title="No items" description="Add your first item." />
 * ```
 */
const EmptyStatePrimitive = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, children, isLive, ...rest }, ref) => {
    const { emptyStateProps } = useEmptyState({ isLive });

    return (
      <div ref={ref} {...rest} {...emptyStateProps}>
        {icon && <div>{icon}</div>}
        <div>{title}</div>
        {description && <p>{description}</p>}
        {action && <div>{action}</div>}
        {children}
      </div>
    );
  },
);

EmptyStatePrimitive.displayName = 'EmptyStatePrimitive';

export { EmptyStatePrimitive };
