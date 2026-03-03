import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import {
    TabsPrimitive,
    TabsListPrimitive,
    TabsTriggerPrimitive,
    TabsContentPrimitive,
} from './Tabs';

expect.extend(toHaveNoViolations);

function renderTabs(props = {}) {
    return render(
        <TabsPrimitive defaultValue="tab1" {...props}>
            <TabsListPrimitive>
                <TabsTriggerPrimitive value="tab1">Tab 1</TabsTriggerPrimitive>
                <TabsTriggerPrimitive value="tab2">Tab 2</TabsTriggerPrimitive>
                <TabsTriggerPrimitive value="tab3" isDisabled>Tab 3</TabsTriggerPrimitive>
            </TabsListPrimitive>
            <TabsContentPrimitive value="tab1">Content 1</TabsContentPrimitive>
            <TabsContentPrimitive value="tab2">Content 2</TabsContentPrimitive>
            <TabsContentPrimitive value="tab3">Content 3</TabsContentPrimitive>
        </TabsPrimitive>,
    );
}

describe('TabsPrimitive', () => {
    describe('rendering', () => {
        it('renders tab triggers', () => {
            renderTabs();
            expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
            expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
            expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
        });

        it('renders tablist', () => {
            renderTabs();
            expect(screen.getByRole('tablist')).toBeInTheDocument();
        });

        it('renders active content', () => {
            renderTabs();
            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
        });

        it('renders tabpanel', () => {
            renderTabs();
            expect(screen.getByRole('tabpanel')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('switches tabs on click', async () => {
            const user = userEvent.setup();
            renderTabs();

            await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
            expect(screen.getByText('Content 2')).toBeInTheDocument();
            expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        });

        it('does not switch to disabled tab on click', async () => {
            const user = userEvent.setup();
            renderTabs();

            await user.click(screen.getByRole('tab', { name: 'Tab 3' }));
            expect(screen.getByText('Content 1')).toBeInTheDocument();
        });

        it('calls onValueChange', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();
            renderTabs({ onValueChange });

            await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
            expect(onValueChange).toHaveBeenCalledWith('tab2');
        });
    });

    describe('keyboard', () => {
        it('navigates with arrow keys (automatic mode)', async () => {
            const user = userEvent.setup();
            renderTabs();

            // Focus the active tab
            screen.getByRole('tab', { name: 'Tab 1' }).focus();
            await user.keyboard('{ArrowRight}');

            expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
            // In automatic mode, tab 2 should now be active
            expect(screen.getByText('Content 2')).toBeInTheDocument();
        });

        it('wraps around with arrow keys', async () => {
            const user = userEvent.setup();
            renderTabs();

            screen.getByRole('tab', { name: 'Tab 1' }).focus();
            await user.keyboard('{ArrowLeft}');

            // Should wrap to tab 2 (skipping disabled tab 3)
            expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
        });

        it('supports Home and End keys', async () => {
            const user = userEvent.setup();
            renderTabs();

            screen.getByRole('tab', { name: 'Tab 1' }).focus();
            await user.keyboard('{End}');
            // Last enabled tab is Tab 2
            expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();

            await user.keyboard('{Home}');
            expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
        });

        it('supports Enter key to activate in manual mode', async () => {
            const user = userEvent.setup();
            renderTabs({ activationMode: 'manual' });

            screen.getByRole('tab', { name: 'Tab 1' }).focus();
            await user.keyboard('{ArrowRight}');

            // In manual mode, arrow key should NOT activate tab
            expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
            expect(screen.getByText('Content 1')).toBeInTheDocument();

            // Enter activates
            await user.keyboard('{Enter}');
            expect(screen.getByText('Content 2')).toBeInTheDocument();
        });

        it('active tab has tabIndex 0, others -1', () => {
            renderTabs();
            expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('tabindex', '0');
            expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('tabindex', '-1');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = renderTabs();
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has correct ARIA attributes on trigger', () => {
            renderTabs();
            const trigger = screen.getByRole('tab', { name: 'Tab 1' });
            expect(trigger).toHaveAttribute('aria-selected', 'true');
            expect(trigger).toHaveAttribute('aria-controls');
        });

        it('tabpanel has aria-labelledby', () => {
            renderTabs();
            const panel = screen.getByRole('tabpanel');
            expect(panel).toHaveAttribute('aria-labelledby');
        });

        it('disabled trigger has aria-disabled', () => {
            renderTabs();
            const trigger = screen.getByRole('tab', { name: 'Tab 3' });
            expect(trigger).toHaveAttribute('aria-disabled', 'true');
        });

        it('tablist has aria-orientation', () => {
            renderTabs({ orientation: 'vertical' });
            expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
        });
    });
});
