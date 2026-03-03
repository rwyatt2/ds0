import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Accordion } from './Accordion';

expect.extend(toHaveNoViolations);

function renderAccordion(props = {}) {
    return render(
        <Accordion type="single" defaultValue="item-1" {...props}>
            <Accordion.Item value="item-1">
                <Accordion.Trigger>Section 1</Accordion.Trigger>
                <Accordion.Content>Content 1</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
                <Accordion.Trigger>Section 2</Accordion.Trigger>
                <Accordion.Content>Content 2</Accordion.Content>
            </Accordion.Item>
        </Accordion>,
    );
}

describe('Accordion (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            renderAccordion();
            expect(screen.getByRole('button', { name: 'Section 1' })).toBeInTheDocument();
        });

        it('renders expanded content', () => {
            renderAccordion();
            expect(screen.getByText('Content 1')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('switches expanded item on click', async () => {
            const user = userEvent.setup();
            renderAccordion();
            await user.click(screen.getByRole('button', { name: 'Section 2' }));
            expect(screen.getByText('Content 2')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = renderAccordion();
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
