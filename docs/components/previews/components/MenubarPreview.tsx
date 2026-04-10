'use client';

import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from '../../../../components/react/menubar';

export function MenubarPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onSelect={() => {}}>New File</MenubarItem>
                        <MenubarItem onSelect={() => {}}>Open</MenubarItem>
                        <MenubarItem onSelect={() => {}}>Save</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onSelect={() => {}}>Exit</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onSelect={() => {}}>Undo</MenubarItem>
                        <MenubarItem onSelect={() => {}}>Redo</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onSelect={() => {}}>Cut</MenubarItem>
                        <MenubarItem onSelect={() => {}}>Copy</MenubarItem>
                        <MenubarItem onSelect={() => {}}>Paste</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onSelect={() => {}}>Zoom In</MenubarItem>
                        <MenubarItem onSelect={() => {}}>Zoom Out</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onSelect={() => {}}>Toggle Sidebar</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
}
