'use client';

import React from 'react';

export function NavigationPatternPreview(): React.ReactElement {
    const tabs = ['Overview', 'Analytics', 'Reports', 'Notifications'];
    return (
        <div className="w-full max-w-md">
            <div className="rounded-lg border bg-card overflow-hidden">
                <div className="flex border-b">
                    {tabs.map((t, i) => (
                        <button key={t} className={`px-4 py-2.5 text-sm font-medium transition-colors ${i === 0 ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}>{t}</button>
                    ))}
                </div>
                <div className="p-4">
                    <p className="text-sm text-muted-foreground">Tab content area — switch between views without page navigation.</p>
                </div>
            </div>
        </div>
    );
}
