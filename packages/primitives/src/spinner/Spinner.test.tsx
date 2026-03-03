import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';
import { SpinnerPrimitive } from './Spinner';

expect.extend(toHaveNoViolations);

describe('SpinnerPrimitive', () => {
    it('renders with role="status"', () => {
        render(<SpinnerPrimitive />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
    it('has default aria-label "Loading"', () => {
        render(<SpinnerPrimitive />);
        expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
    });
    it('accepts custom label', () => {
        render(<SpinnerPrimitive label="Processing" />);
        expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Processing');
    });
    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>();
        render(<SpinnerPrimitive ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
    it('has no axe violations', async () => {
        const { container } = render(<SpinnerPrimitive />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
