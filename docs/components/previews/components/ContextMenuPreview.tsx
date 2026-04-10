'use client';

import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '../../../../components/react/context-menu';

export function ContextMenuPreview(): React.ReactElement {
    return (
        <div className="flex items-center justify-center py-4">
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="flex h-40 w-72 items-center justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-700 text-sm text-muted-foreground select-none">
                        Right-click here
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onSelect={() => {}}>Cut</ContextMenuItem>
                    <ContextMenuItem onSelect={() => {}}>Copy</ContextMenuItem>
                    <ContextMenuItem onSelect={() => {}}>Paste</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onSelect={() => {}}>Select All</ContextMenuItem>
                    <ContextMenuItem onSelect={() => {}}>Find...</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem isDisabled>Share (disabled)</ContextMenuItem>
                    <ContextMenuItem onSelect={() => {}}>Delete</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    );
}
