import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Rating } from './Rating';

expect.extend(toHaveNoViolations);

describe('Rating (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<Rating />);
            expect(screen.getByRole('radiogroup')).toBeInTheDocument();
        });

        it('renders correct number of stars', () => {
            render(<Rating maxValue={5} />);
            expect(screen.getAllByRole('radio')).toHaveLength(5);
        });

        it('applies size classes', () => {
            const { container } = render(<Rating size="lg" value={1} />);
            const star = container.querySelector('svg');
            expect(star).toHaveClass('w-6', 'h-6');
        });

        it('merges custom className', () => {
            render(<Rating className="custom-class" />);
            expect(screen.getByRole('radiogroup')).toHaveClass('custom-class');
        });

        it('applies disabled styles', () => {
            render(<Rating isDisabled />);
            expect(screen.getByRole('radiogroup')).toHaveClass('opacity-50');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<Rating value={3} />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when disabled', async () => {
            const { container } = render(<Rating value={2} isDisabled />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when readonly', async () => {
            const { container } = render(<Rating value={4} isReadonly />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
