import React from 'react';

import { cn } from '@ds0/primitives';

import { Stack } from '../../components/react/stack';
import { Heading } from '../../components/react/heading';
import { Text } from '../../components/react/text';
import { Button } from '../../components/react/button';

/**
 * Props for the EmptyState recipe component.
 */
interface EmptyStateProps {
    /** Illustration or icon displayed above the heading */
    icon?: React.ReactNode;
    /** Heading text */
    title: string;
    /** Supporting description text */
    description?: string;
    /** Primary action button */
    action?: { label: string; onClick: () => void };
    /** Secondary action button */
    secondaryAction?: { label: string; onClick: () => void };
    /** Additional CSS classes */
    className?: string;
}

/**
 * EmptyState recipe.
 * A placeholder shown when a content area has no data, with optional
 * illustration, heading, description, and action buttons.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   title="No results found"
 *   description="Try adjusting your search or filters."
 *   action={{ label: 'Clear filters', onClick: handleClear }}
 * />
 * ```
 */
function EmptyState({
    icon,
    title,
    description,
    action,
    secondaryAction,
    className,
}: EmptyStateProps): React.ReactElement {
    return (
        <Stack align="center" gap="4" className={cn('py-12 px-4', className)}>
            {icon && (
                <div className="text-muted-foreground">{icon}</div>
            )}
            <Stack align="center" gap="2">
                <Heading as="h3" size="lg" className="text-center">
                    {title}
                </Heading>
                {description && (
                    <Text color="muted" align="center" className="max-w-md">
                        {description}
                    </Text>
                )}
            </Stack>
            {(action || secondaryAction) && (
                <Stack direction="horizontal" gap="3">
                    {action && (
                        <Button onClick={action.onClick}>{action.label}</Button>
                    )}
                    {secondaryAction && (
                        <Button variant="outline" onClick={secondaryAction.onClick}>
                            {secondaryAction.label}
                        </Button>
                    )}
                </Stack>
            )}
        </Stack>
    );
}

EmptyState.displayName = 'EmptyState';

export { EmptyState };
export type { EmptyStateProps };
