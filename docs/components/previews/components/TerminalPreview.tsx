'use client';

import { Terminal } from '../../../../components/react/terminal';

const terminalLines = [
    { type: 'input' as const, content: 'npm install @ds0/react' },
    { type: 'output' as const, content: 'added 42 packages in 3.2s' },
    { type: 'input' as const, content: 'npm run dev' },
    { type: 'output' as const, content: '▶ Starting development server...' },
    { type: 'output' as const, content: '✓ Ready on http://localhost:3000' },
];

export function TerminalPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg">
            <Terminal
                lines={terminalLines}
                title="~/projects/my-app"
                readOnly
            />
        </div>
    );
}
