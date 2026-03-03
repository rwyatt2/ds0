import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Tabs } from './Tabs';

expect.extend(toHaveNoViolations);

function renderTabs(props = {}) {
    return render(
        <Tabs defaultValue="tab1" {...props}>
            <Tabs.List>
                <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">Content 1</Tabs.Content>
            <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs>,
    );
}

describe('Tabs (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            renderTabs();
            expect(screen.getByRole('tablist')).toBeInTheDocument();
            expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
        });

        it('renders active content', () => {
            renderTabs();
            expect(screen.getByText('Content 1')).toBeInTheDocument();
        });

        it('merges custom className', () => {
            render(
                <Tabs defaultValue="t" className="custom-class">
                    <Tabs.List><Tabs.Trigger value="t">T</Tabs.Trigger></Tabs.List>
                    <Tabs.Content value="t">C</Tabs.Content>
                </Tabs>,
            );
            expect(document.querySelector('.custom-class')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('switches tabs on click', async () => {
            const user = userEvent.setup();
            renderTabs();
            await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
            expect(screen.getByText('Content 2')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = renderTabs();
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
