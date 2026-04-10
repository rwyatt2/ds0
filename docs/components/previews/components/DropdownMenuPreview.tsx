'use client';

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '../../../../components/react/dropdown-menu';

export function DropdownMenuPreview(): React.ReactElement {
    return (
        <div className="flex items-center justify-center py-4">
            <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Options ▾
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => {}}>Profile</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => {}}>Settings</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => {}}>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => {}}>Team</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => {}}>Invite members</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem isDisabled>API (Coming soon)</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => {}}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
