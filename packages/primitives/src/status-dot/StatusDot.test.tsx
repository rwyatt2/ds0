import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { StatusDotPrimitive } from './StatusDot';

expect.extend(toHaveNoViolations);

describe('StatusDotPrimitive', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<StatusDotPrimitive />);
            expect(screen.getByRole('status')).toBeInTheDocument();
        });

        it('renders with specified variant', () => {
            render(<StatusDotPrimitive variant="online" label="Online" />);
            expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Online');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<StatusDotPrimitive label="Online" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has role="status"', () => {
            render(<StatusDotPrimitive />);
            expect(screen.getByRole('status')).toBeInTheDocument();
        });

        it('uses variant as fallback label', () => {
            render(<StatusDotPrimitive variant="busy" />);
            expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'busy');
        });

        it('uses explicit label over variant', () => {
            render(<StatusDotPrimitive variant="busy" label="In a meeting" />);
            expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'In a meeting');
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to DOM element', () => {
            const ref = vi.fn();
            render(<StatusDotPrimitive ref={ref} />);
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
