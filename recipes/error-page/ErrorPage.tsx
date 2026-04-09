import React from 'react';

import { cn } from '@ds0/primitives';

import { Container } from '@ds0/components/react/container';
import { Stack } from '@ds0/components/react/stack';
import { Heading } from '@ds0/components/react/heading';
import { Text } from '@ds0/components/react/text';
import { Button } from '@ds0/components/react/button';

/**
 * Props for the ErrorPage recipe component.
 */
interface ErrorPageProps {
    /** Error code (404, 500, etc.) */
    code?: number | string;
    /** Error heading */
    title?: string;
    /** Error description */
    description?: string;
    /** Retry action handler */
    onRetry?: () => void;
    /** Go to homepage handler */
    onGoHome?: () => void;
    /** Additional CSS classes */
    className?: string;
}

/**
 * ErrorPage recipe.
 * A full-page error display for 404, 500, and other error states.
 *
 * @example
 * ```tsx
 * <ErrorPage
 *   code={404}
 *   title="Page not found"
 *   description="The page you're looking for doesn't exist."
 *   onGoHome={() => navigate('/')}
 * />
 * ```
 */
function ErrorPage({
    code,
    title = 'Something went wrong',
    description,
    onRetry,
    onGoHome,
    className,
}: ErrorPageProps): React.ReactElement {
    return (
        <Container size="sm" className={cn('flex min-h-[60vh] items-center justify-center', className)}>
            <Stack align="center" gap="6">
                {code && (
                    <Text
                        as="span"
                        size="xl"
                        weight="bold"
                        color="muted"
                        className="text-8xl tabular-nums"
                    >
                        {code}
                    </Text>
                )}
                <Stack align="center" gap="2">
                    <Heading as="h1" size="2xl" className="text-center">
                        {title}
                    </Heading>
                    {description && (
                        <Text color="muted" align="center" className="max-w-md">
                            {description}
                        </Text>
                    )}
                </Stack>
                {(onRetry || onGoHome) && (
                    <Stack direction="horizontal" gap="3">
                        {onRetry && (
                            <Button onClick={onRetry}>Try again</Button>
                        )}
                        {onGoHome && (
                            <Button variant="outline" onClick={onGoHome}>
                                Go home
                            </Button>
                        )}
                    </Stack>
                )}
            </Stack>
        </Container>
    );
}

ErrorPage.displayName = 'ErrorPage';

export { ErrorPage };
export type { ErrorPageProps };
