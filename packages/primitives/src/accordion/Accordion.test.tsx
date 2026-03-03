import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import {
    AccordionPrimitive,
    AccordionItemPrimitive,
    AccordionTriggerPrimitive,
    AccordionContentPrimitive,
} from './Accordion';

expect.extend(toHaveNoViolations);

function renderAccordion(props = {}) {
    return render(
        <AccordionPrimitive type="single" defaultValue="item-1" {...props}>
            <AccordionItemPrimitive value="item-1">
                <AccordionTriggerPrimitive>Section 1</AccordionTriggerPrimitive>
                <AccordionContentPrimitive>Content 1</AccordionContentPrimitive>
            </AccordionItemPrimitive>
            <AccordionItemPrimitive value="item-2">
                <AccordionTriggerPrimitive>Section 2</AccordionTriggerPrimitive>
                <AccordionContentPrimitive>Content 2</AccordionContentPrimitive>
            </AccordionItemPrimitive>
            <AccordionItemPrimitive value="item-3" isDisabled>
                <AccordionTriggerPrimitive>Section 3</AccordionTriggerPrimitive>
                <AccordionContentPrimitive>Content 3</AccordionContentPrimitive>
            </AccordionItemPrimitive>
        </AccordionPrimitive>,
    );
}

describe('AccordionPrimitive', () => {
    describe('rendering', () => {
        it('renders trigger buttons', () => {
            renderAccordion();
            expect(screen.getByRole('button', { name: 'Section 1' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Section 2' })).toBeInTheDocument();
        });

        it('renders expanded content', () => {
            renderAccordion();
            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
        });
    });

    describe('interactions — single mode', () => {
        it('expands on trigger click', async () => {
            const user = userEvent.setup();
            renderAccordion();

            await user.click(screen.getByRole('button', { name: 'Section 2' }));
            expect(screen.getByText('Content 2')).toBeInTheDocument();
            // Single mode — item 1 should be closed
            expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        });

        it('collapses when collapsible', async () => {
            const user = userEvent.setup();
            renderAccordion({ collapsible: true });

            await user.click(screen.getByRole('button', { name: 'Section 1' }));
            expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        });

        it('does not collapse when not collapsible', async () => {
            const user = userEvent.setup();
            renderAccordion({ collapsible: false });

            await user.click(screen.getByRole('button', { name: 'Section 1' }));
            // Should still be expanded
            expect(screen.getByText('Content 1')).toBeInTheDocument();
        });

        it('does not expand disabled item', async () => {
            const user = userEvent.setup();
            renderAccordion();

            await user.click(screen.getByRole('button', { name: 'Section 3' }));
            expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
        });
    });

    describe('interactions — multiple mode', () => {
        it('expands multiple items', async () => {
            const user = userEvent.setup();
            renderAccordion({ type: 'multiple', defaultValue: ['item-1'] });

            await user.click(screen.getByRole('button', { name: 'Section 2' }));
            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.getByText('Content 2')).toBeInTheDocument();
        });

        it('toggles items independently', async () => {
            const user = userEvent.setup();
            renderAccordion({ type: 'multiple', defaultValue: ['item-1', 'item-2'] });

            await user.click(screen.getByRole('button', { name: 'Section 1' }));
            expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
            expect(screen.getByText('Content 2')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = renderAccordion();
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('trigger has aria-expanded', () => {
            renderAccordion();
            expect(screen.getByRole('button', { name: 'Section 1' })).toHaveAttribute('aria-expanded', 'true');
            expect(screen.getByRole('button', { name: 'Section 2' })).toHaveAttribute('aria-expanded', 'false');
        });

        it('trigger has aria-controls', () => {
            renderAccordion();
            const trigger = screen.getByRole('button', { name: 'Section 1' });
            expect(trigger).toHaveAttribute('aria-controls');
        });

        it('content has role region', () => {
            renderAccordion();
            expect(screen.getByRole('region')).toBeInTheDocument();
        });

        it('content has aria-labelledby', () => {
            renderAccordion();
            const region = screen.getByRole('region');
            expect(region).toHaveAttribute('aria-labelledby');
        });

        it('disabled item has aria-disabled', () => {
            renderAccordion();
            expect(screen.getByRole('button', { name: 'Section 3' })).toHaveAttribute('aria-disabled', 'true');
        });
    });

    describe('controlled', () => {
        it('calls onValueChange', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();
            renderAccordion({ onValueChange });

            await user.click(screen.getByRole('button', { name: 'Section 2' }));
            expect(onValueChange).toHaveBeenCalledWith('item-2');
        });
    });
});
