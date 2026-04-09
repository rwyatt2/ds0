import { render, screen } from '@testing-library/react-native';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './DropdownMenu';

describe('DropdownMenu (Native)', () => {
    it('renders trigger', () => {
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent><DropdownMenuItem>Item</DropdownMenuItem></DropdownMenuContent>
            </DropdownMenu>,
        );
        expect(screen.getByRole('button')).toBeTruthy();
    });
});
