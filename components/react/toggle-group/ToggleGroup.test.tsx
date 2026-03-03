import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { ToggleGroup } from './ToggleGroup';

expect.extend(toHaveNoViolations);

describe('ToggleGroup (Styled)', () => {
    describe('rendering', () => {
        it('renders', () => {
            render(
                <ToggleGroup type="single" defaultValue="a">
                    <ToggleGroup.Item value="a">A</ToggleGroup.Item>
                    <ToggleGroup.Item value="b">B</ToggleGroup.Item>
                </ToggleGroup>,
            );
            expect(screen.getByRole('group')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('toggles on click', async () => {
            const user = userEvent.setup();
            render(
                <ToggleGroup type="single" defaultValue="a">
                    <ToggleGroup.Item value="a">A</ToggleGroup.Item>
                    <ToggleGroup.Item value="b">B</ToggleGroup.Item>
                </ToggleGroup>,
            );
            await user.click(screen.getByRole('radio', { name: 'B' }));
            expect(screen.getByRole('radio', { name: 'B' })).toHaveAttribute('data-state', 'on');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <ToggleGroup type="single" defaultValue="a">
                    <ToggleGroup.Item value="a">A</ToggleGroup.Item>
                    <ToggleGroup.Item value="b">B</ToggleGroup.Item>
                </ToggleGroup>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
