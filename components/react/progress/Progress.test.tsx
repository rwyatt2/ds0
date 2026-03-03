import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Progress } from './Progress';

expect.extend(toHaveNoViolations);

describe('Progress (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<Progress label="Loading" />);
            expect(screen.getByRole('progressbar')).toBeInTheDocument();
        });

        it('applies size classes', () => {
            render(<Progress size="lg" label="Loading" />);
            const bar = screen.getByRole('progressbar');
            expect(bar.className).toContain('h-4');
        });

        it('merges custom className', () => {
            render(<Progress className="custom-class" label="Loading" />);
            expect(screen.getByRole('progressbar').parentElement).toHaveClass('custom-class');
        });

        it('displays percentage when showValue is true', () => {
            render(<Progress value={42} showValue label="Loading" />);
            expect(screen.getByText('42%')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<Progress value={50} label="Loading" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when indeterminate', async () => {
            const { container } = render(<Progress indeterminate label="Loading" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
