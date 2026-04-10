'use client';

import { Dock } from '../../../../components/react/dock';

export function DockPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-md relative h-24">
            <Dock className="!static !transform-none">
                <div className="flex items-center gap-3 text-sm">
                    <span>📁</span>
                    <span>📝</span>
                    <span>🎨</span>
                    <span>⚙️</span>
                    <span>🔍</span>
                </div>
            </Dock>
        </div>
    );
}
