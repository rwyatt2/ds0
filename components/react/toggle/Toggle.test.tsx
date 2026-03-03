import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Toggle } from './Toggle';

expect.extend(toHaveNoViolations);

describe('Toggle (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<Toggle>Bold</Toggle>);
            expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
        });

        it('applies variant classes', () => {
            render(<Toggle variant="outline">Bold</Toggle>);
            const button = screen.getByRole('button');
            expect(button.className).toContain('border');
        });

        it('applies size classes', () => {
            render(<Toggle size="lg">Bold</Toggle>);
            const button = screen.getByRole('button');
            expect(button.className).toContain('h-12');
        });

        it('merges custom className', () => {
            render(<Toggle className="custom-class">Bold</Toggle>);
            expect(screen.getByRole('button')).toHaveClass('custom-class');
        });
    });

    describe('interactions', () => {
        it('toggles on click', async () => {
            const user = userEvent.setup();
            render(<Toggle>Bold</Toggle>);
            const button = screen.getByRole('button');

            expect(button).toHaveAttribute('data-state', 'off');
            await user.click(button);
            expect(button).toHaveAttribute('data-state', 'on');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<Toggle>Bold</Toggle>);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when pressed', async () => {
            const { container } = render(<Toggle defaultPressed>Bold</Toggle>);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
