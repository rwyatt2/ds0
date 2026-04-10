'use client';

import { SplitterGroup, SplitterPanel, SplitterHandle } from '../../../../components/react/splitter';

export function SplitterPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg border rounded-lg overflow-hidden h-48">
            <SplitterGroup direction="horizontal">
                <SplitterPanel defaultSize={40} minSize={20}>
                    <div className="h-full p-3 bg-muted/30">
                        <p className="text-xs font-medium mb-1">Sidebar</p>
                        <p className="text-xs text-muted-foreground">Drag the handle →</p>
                    </div>
                </SplitterPanel>
                <SplitterHandle />
                <SplitterPanel defaultSize={60} minSize={30}>
                    <div className="h-full p-3">
                        <p className="text-xs font-medium mb-1">Main Content</p>
                        <p className="text-xs text-muted-foreground">Resizable panel layout</p>
                    </div>
                </SplitterPanel>
            </SplitterGroup>
        </div>
    );
}
