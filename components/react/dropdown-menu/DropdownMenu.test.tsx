import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DropdownMenu } from './DropdownMenu';

expect.extend(toHaveNoViolations);

const TestMenu = ({ defaultOpen }: { defaultOpen?: boolean }) => (
    <DropdownMenu defaultOpen={defaultOpen}>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Item>Profile</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Sign out</DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu>
);

describe('DropdownMenu (Styled)', () => {
    it('renders trigger', () => {
        render(<TestMenu />);
        expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
    });

    it('opens on click', async () => {
        const user = userEvent.setup();
        render(<TestMenu />);
        await user.click(screen.getByRole('button', { name: 'Open' }));
        expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('applies styled classes to content', () => {
        render(<TestMenu defaultOpen />);
        expect(screen.getByRole('menu')).toHaveClass('rounded-md');
    });

    it('has no axe violations (closed)', async () => {
        const { container } = render(<TestMenu />);
        expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations (open)', async () => {
        const { container } = render(<TestMenu defaultOpen />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
