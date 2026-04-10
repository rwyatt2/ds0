'use client';

import React from 'react';

export function FeedbackPatternPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/5 p-3">
                <span className="text-green-600 mt-0.5">✓</span>
                <div><p className="text-sm font-medium">Success</p><p className="text-xs text-muted-foreground">Your changes have been saved.</p></div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                <span className="text-amber-600 mt-0.5">⚠</span>
                <div><p className="text-sm font-medium">Warning</p><p className="text-xs text-muted-foreground">Your session will expire in 5 minutes.</p></div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                <span className="text-red-600 mt-0.5">✕</span>
                <div><p className="text-sm font-medium">Error</p><p className="text-xs text-muted-foreground">Failed to save. Please try again.</p></div>
            </div>
        </div>
    );
}
