import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Banner } from './Banner';

expect.extend(toHaveNoViolations);

describe('Banner (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<Banner>Test message</Banner>);
            expect(screen.getByRole('banner')).toBeInTheDocument();
        });

        it('applies variant classes', () => {
            render(<Banner variant="error">Error</Banner>);
            expect(screen.getByRole('alert')).toHaveClass('bg-destructive');
        });

        it('applies size classes', () => {
            render(<Banner size="lg">Large</Banner>);
            expect(screen.getByRole('banner')).toHaveClass('py-4');
        });

        it('merges custom className', () => {
            render(<Banner className="custom-class">Test</Banner>);
            expect(screen.getByRole('banner')).toHaveClass('custom-class');
        });

        it('renders icon when provided', () => {
            render(<Banner icon={<span data-testid="icon">📢</span>}>Test</Banner>);
            expect(screen.getByTestId('icon')).toBeInTheDocument();
        });

        it('renders action when provided', () => {
            render(<Banner action={<button>Action</button>}>Test</Banner>);
            expect(screen.getByText('Action')).toBeInTheDocument();
        });
    });

    describe('dismiss', () => {
        it('removes banner on dismiss click', async () => {
            const user = userEvent.setup();
            render(<Banner isDismissible>Test</Banner>);
            await user.click(screen.getByLabelText('Dismiss banner'));
            expect(screen.queryByText('Test')).not.toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<Banner>Test message</Banner>);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when dismissible', async () => {
            const { container } = render(<Banner isDismissible>Test</Banner>);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
