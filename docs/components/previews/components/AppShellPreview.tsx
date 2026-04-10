'use client';

import { AppShell } from '../../../../components/react/app-shell';

export function AppShellPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-2xl border rounded-lg overflow-hidden h-64">
            <AppShell
                header={
                    <div className="flex items-center justify-between px-4 py-2">
                        <span className="text-sm font-bold">My App</span>
                        <div className="flex gap-2">
                            <span className="text-xs text-muted-foreground">Docs</span>
                            <span className="text-xs text-muted-foreground">Settings</span>
                        </div>
                    </div>
                }
                sidebar={
                    <nav className="w-48 p-3 border-r text-sm space-y-1">
                        <div className="px-2 py-1.5 rounded bg-accent font-medium">Dashboard</div>
                        <div className="px-2 py-1.5 text-muted-foreground">Analytics</div>
                        <div className="px-2 py-1.5 text-muted-foreground">Users</div>
                        <div className="px-2 py-1.5 text-muted-foreground">Settings</div>
                    </nav>
                }
                footer={
                    <div className="px-4 py-2 text-xs text-muted-foreground text-center border-t">
                        © 2026 My App. All rights reserved.
                    </div>
                }
            >
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Welcome back</h2>
                    <p className="text-sm text-muted-foreground">This is the main content area of the AppShell layout.</p>
                </div>
            </AppShell>
        </div>
    );
}
