import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { ProgressPrimitive } from './Progress';

expect.extend(toHaveNoViolations);

describe('ProgressPrimitive', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<ProgressPrimitive label="Loading" />);
            expect(screen.getByRole('progressbar')).toBeInTheDocument();
        });

        it('renders label text', () => {
            render(<ProgressPrimitive label="Uploading files" />);
            expect(screen.getByText('Uploading files')).toBeInTheDocument();
        });

        it('renders percentage when showValue is true', () => {
            render(<ProgressPrimitive value={42} showValue label="Loading" />);
            expect(screen.getByText('42%')).toBeInTheDocument();
        });

        it('does not render percentage when indeterminate', () => {
            render(<ProgressPrimitive indeterminate showValue label="Loading" />);
            expect(screen.queryByText('%')).not.toBeInTheDocument();
        });
    });

    describe('aria attributes', () => {
        it('has correct aria-valuenow', () => {
            render(<ProgressPrimitive value={50} label="Loading" />);
            expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
        });

        it('has correct aria-valuemin and aria-valuemax', () => {
            render(<ProgressPrimitive value={50} max={200} label="Loading" />);
            const bar = screen.getByRole('progressbar');
            expect(bar).toHaveAttribute('aria-valuemin', '0');
            expect(bar).toHaveAttribute('aria-valuemax', '200');
        });

        it('has correct aria-valuetext', () => {
            render(<ProgressPrimitive value={42} label="Loading" />);
            expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', '42 percent');
        });

        it('omits aria-valuenow when indeterminate', () => {
            render(<ProgressPrimitive indeterminate label="Loading" />);
            expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
        });

        it('has aria-valuetext "Loading" when indeterminate', () => {
            render(<ProgressPrimitive indeterminate label="Loading" />);
            expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', 'Loading');
        });

        it('has aria-label', () => {
            render(<ProgressPrimitive label="File upload" />);
            expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'File upload');
        });
    });

    describe('value clamping', () => {
        it('clamps value below 0 to 0%', () => {
            render(<ProgressPrimitive value={-10} showValue label="Loading" />);
            expect(screen.getByText('0%')).toBeInTheDocument();
        });

        it('clamps value above max to 100%', () => {
            render(<ProgressPrimitive value={150} max={100} showValue label="Loading" />);
            expect(screen.getByText('100%')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<ProgressPrimitive value={50} label="Loading" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when indeterminate', async () => {
            const { container } = render(<ProgressPrimitive indeterminate label="Loading" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to DOM element', () => {
            const ref = vi.fn();
            render(<ProgressPrimitive ref={ref} label="Loading" />);
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
