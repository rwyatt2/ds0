import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';

import {
    CollapsiblePrimitive,
    CollapsibleTriggerPrimitive,
    CollapsibleContentPrimitive,
} from './Collapsible';

expect.extend(toHaveNoViolations);

const TestCollapsible = (props: { defaultOpen?: boolean; forceMount?: boolean }) => (
    <CollapsiblePrimitive defaultOpen={props.defaultOpen}>
        <CollapsibleTriggerPrimitive>Toggle</CollapsibleTriggerPrimitive>
        <CollapsibleContentPrimitive forceMount={props.forceMount}>
            <p>Hidden content</p>
        </CollapsibleContentPrimitive>
    </CollapsiblePrimitive>
);

describe('CollapsiblePrimitive', () => {
    describe('rendering', () => {
        it('renders trigger and hides content by default', () => {
            render(<TestCollapsible />);
            expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
            expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
        });

        it('renders content when defaultOpen is true', () => {
            render(<TestCollapsible defaultOpen />);
            expect(screen.getByText('Hidden content')).toBeInTheDocument();
        });

        it('keeps content mounted when forceMount is true', () => {
            render(<TestCollapsible forceMount />);
            const content = screen.getByText('Hidden content');
            expect(content).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('toggles content on click', async () => {
            const user = userEvent.setup();
            render(<TestCollapsible />);

            expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();

            await user.click(screen.getByRole('button', { name: 'Toggle' }));
            expect(screen.getByText('Hidden content')).toBeInTheDocument();

            await user.click(screen.getByRole('button', { name: 'Toggle' }));
            expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
        });

        it('calls onOpenChange when toggled', async () => {
            const onOpenChange = vi.fn();
            const user = userEvent.setup();
            render(
                <CollapsiblePrimitive onOpenChange={onOpenChange}>
                    <CollapsibleTriggerPrimitive>Toggle</CollapsibleTriggerPrimitive>
                    <CollapsibleContentPrimitive>Content</CollapsibleContentPrimitive>
                </CollapsiblePrimitive>,
            );

            await user.click(screen.getByRole('button', { name: 'Toggle' }));
            expect(onOpenChange).toHaveBeenCalledWith(true);
        });
    });

    describe('keyboard', () => {
        it('toggles on Enter', async () => {
            const user = userEvent.setup();
            render(<TestCollapsible />);

            screen.getByRole('button', { name: 'Toggle' }).focus();
            await user.keyboard('{Enter}');
            expect(screen.getByText('Hidden content')).toBeInTheDocument();
        });

        it('toggles on Space', async () => {
            const user = userEvent.setup();
            render(<TestCollapsible />);

            screen.getByRole('button', { name: 'Toggle' }).focus();
            await user.keyboard(' ');
            expect(screen.getByText('Hidden content')).toBeInTheDocument();
        });

        it('is focusable via Tab', async () => {
            const user = userEvent.setup();
            render(<TestCollapsible />);
            await user.tab();
            expect(screen.getByRole('button', { name: 'Toggle' })).toHaveFocus();
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

        it('sets aria-expanded on trigger', async () => {
            const user = userEvent.setup();
            render(<TestCollapsible />);
            const trigger = screen.getByRole('button', { name: 'Toggle' });

            expect(trigger).toHaveAttribute('aria-expanded', 'false');
            await user.click(trigger);
            expect(trigger).toHaveAttribute('aria-expanded', 'true');
        });

        it('sets aria-controls pointing to content id', () => {
            render(<TestCollapsible defaultOpen />);
            const trigger = screen.getByRole('button', { name: 'Toggle' });
            const ariaControls = trigger.getAttribute('aria-controls');
            expect(ariaControls).toBeTruthy();
            expect(document.getElementById(ariaControls!)).toBeInTheDocument();
        });

        it('sets data-state on root', async () => {
            const user = userEvent.setup();
            const { container } = render(<TestCollapsible />);
            const root = container.firstChild as HTMLElement;

            expect(root).toHaveAttribute('data-state', 'closed');
            await user.click(screen.getByRole('button', { name: 'Toggle' }));
            expect(root).toHaveAttribute('data-state', 'open');
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref on root', () => {
            const ref = createRef<HTMLDivElement>();
            render(
                <CollapsiblePrimitive ref={ref}>
                    <CollapsibleTriggerPrimitive>Toggle</CollapsibleTriggerPrimitive>
                    <CollapsibleContentPrimitive>Content</CollapsibleContentPrimitive>
                </CollapsiblePrimitive>,
            );
            expect(ref.current).toBeInstanceOf(HTMLDivElement);
        });

        it('forwards ref on trigger', () => {
            const ref = createRef<HTMLButtonElement>();
            render(
                <CollapsiblePrimitive>
                    <CollapsibleTriggerPrimitive ref={ref}>Toggle</CollapsibleTriggerPrimitive>
                    <CollapsibleContentPrimitive>Content</CollapsibleContentPrimitive>
                </CollapsiblePrimitive>,
            );
            expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        });
    });
});
