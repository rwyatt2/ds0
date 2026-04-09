import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Notification } from './Notification';

expect.extend(toHaveNoViolations);

describe('Notification (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<Notification>Test</Notification>);
            expect(screen.getByRole('status')).toBeInTheDocument();
        });
        it('renders title', () => {
            render(<Notification title="Title">Body</Notification>);
            expect(screen.getByText('Title')).toBeInTheDocument();
        });
        it('applies variant classes', () => {
            render(<Notification variant="error">Error</Notification>);
            expect(screen.getByRole('alert')).toHaveClass('border-red-200');
        });
        it('merges custom className', () => {
            render(<Notification className="custom">Test</Notification>);
            expect(screen.getByRole('status')).toHaveClass('custom');
        });
    });

    describe('dismiss', () => {
        it('removes on dismiss click', async () => {
            const user = userEvent.setup();
            render(<Notification isDismissible>Test</Notification>);
            await user.click(screen.getByLabelText('Dismiss notification'));
            expect(screen.queryByText('Test')).not.toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<Notification>Test</Notification>);
            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
