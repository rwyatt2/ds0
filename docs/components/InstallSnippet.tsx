'use client';

import { useState } from 'react';

interface InstallSnippetProps {
    component: string;
}

export function InstallSnippet({
    component,
}: InstallSnippetProps): React.ReactElement {
    const [copied, setCopied] = useState(false);
    const command = `npx ds0 add ${component}`;

    const copy = async (): Promise<void> => {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-4 flex items-center justify-between rounded-lg border bg-fd-muted/50 px-4 py-3">
            <code className="font-mono text-sm">{command}</code>
            <button
                onClick={copy}
                className="ml-4 rounded px-2 py-1 text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
}
