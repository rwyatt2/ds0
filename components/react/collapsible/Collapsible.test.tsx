import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Collapsible } from './Collapsible';

expect.extend(toHaveNoViolations);

const TestCollapsible = ({ defaultOpen }: { defaultOpen?: boolean }) => (
    <Collapsible defaultOpen={defaultOpen}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>
            <p>Content</p>
        </Collapsible.Content>
    </Collapsible>
);

describe('Collapsible (Styled)', () => {
    describe('rendering', () => {
        it('renders with trigger visible', () => {
            render(<TestCollapsible />);
            expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
        });

        it('hides content by default', () => {
            render(<TestCollapsible />);
            expect(screen.queryByText('Content')).not.toBeInTheDocument();
        });

        it('shows content when defaultOpen', () => {
            render(<TestCollapsible defaultOpen />);
            expect(screen.getByText('Content')).toBeInTheDocument();
        });

        it('applies trigger styling classes', () => {
            render(<TestCollapsible />);
            const trigger = screen.getByRole('button', { name: 'Toggle' });
            expect(trigger).toHaveClass('flex');
            expect(trigger).toHaveClass('font-medium');
        });
    });

    describe('interactions', () => {
        it('toggles content on click', async () => {
            const user = userEvent.setup();
            render(<TestCollapsible />);

            await user.click(screen.getByRole('button', { name: 'Toggle' }));
            expect(screen.getByText('Content')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations (closed)', async () => {
            const { container } = render(<TestCollapsible />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations (open)', async () => {
            const { container } = render(<TestCollapsible defaultOpen />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
