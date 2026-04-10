'use client';

import { BackToTop } from '../../../../components/react/back-to-top';

export function BackToTopPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-sm">
            <p className="text-sm text-muted-foreground mb-3">The BackToTop button appears as a fixed FAB when the user scrolls past a threshold. Below is a static preview:</p>
            <div className="relative h-16 border rounded-lg">
                <BackToTop threshold={0} className="!position-static !relative !bottom-auto !right-auto m-auto" />
            </div>
        </div>
    );
}
