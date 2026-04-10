'use client';

import { ErrorBoundary } from '../../../../components/react/error-boundary';

function BuggyChild() {
    return (
        <div className="p-4 text-sm text-center">
            <p className="text-muted-foreground">This component is wrapped in an ErrorBoundary.</p>
            <p className="text-muted-foreground mt-1">If a runtime error occurs, a friendly fallback is shown.</p>
        </div>
    );
}

export function ErrorBoundaryPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md">
            <ErrorBoundary>
                <BuggyChild />
            </ErrorBoundary>
        </div>
    );
}
