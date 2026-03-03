import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AccountSettings } from './AccountSettings';

expect.extend(toHaveNoViolations);

const defaultProps = {
    email: 'john@example.com',
    onChangePassword: vi.fn(),
    onChangeEmail: vi.fn(),
    onDeleteAccount: vi.fn(),
};

describe('AccountSettings', () => {
    describe('rendering', () => {
        it('renders email, password, and danger zone sections', () => {
            render(<AccountSettings {...defaultProps} />);
            expect(screen.getByText('Email address')).toBeInTheDocument();
            expect(screen.getByText('Password')).toBeInTheDocument();
            expect(screen.getByText('Danger zone')).toBeInTheDocument();
        });

        it('renders pre-filled email', () => {
            render(<AccountSettings {...defaultProps} />);
            expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
        });

        it('renders update email and password buttons', () => {
            render(<AccountSettings {...defaultProps} />);
            expect(screen.getByRole('button', { name: /update email/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /update password/i })).toBeInTheDocument();
        });

        it('renders delete account button', () => {
            render(<AccountSettings {...defaultProps} />);
            expect(screen.getByRole('button', { name: /delete account/i })).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('calls onChangeEmail when email form submitted', async () => {
            const user = userEvent.setup();
            const onChangeEmail = vi.fn();
            render(<AccountSettings {...defaultProps} onChangeEmail={onChangeEmail} />);

            const emailInput = screen.getByDisplayValue('john@example.com');
            await user.clear(emailInput);
            await user.type(emailInput, 'new@example.com');
            await user.click(screen.getByRole('button', { name: /update email/i }));

            expect(onChangeEmail).toHaveBeenCalledWith('new@example.com');
        });

        it('shows error when passwords do not match', async () => {
            const user = userEvent.setup();
            render(<AccountSettings {...defaultProps} />);

            await user.type(screen.getByLabelText(/current password/i), 'old123');
            await user.type(screen.getByLabelText(/^new password/i), 'new123');
            await user.type(screen.getByLabelText(/confirm new password/i), 'different');
            await user.click(screen.getByRole('button', { name: /update password/i }));

            expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
        });

        it('opens delete confirmation dialog', async () => {
            const user = userEvent.setup();
            render(<AccountSettings {...defaultProps} />);

            await user.click(screen.getByRole('button', { name: /delete account/i }));
            expect(screen.getByText('Are you sure?')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<AccountSettings {...defaultProps} />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
