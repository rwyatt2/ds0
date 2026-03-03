import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { ForgotPasswordForm } from './ForgotPasswordForm';

expect.extend(toHaveNoViolations);

describe('ForgotPasswordForm', () => {
    const defaultProps = { onSubmit: vi.fn() };

    describe('rendering', () => {
        it('renders form view by default', () => {
            render(<ForgotPasswordForm {...defaultProps} />);
            expect(screen.getByText('Forgot password')).toBeInTheDocument();
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
        });

        it('renders success view when isSuccess is true', () => {
            render(<ForgotPasswordForm {...defaultProps} isSuccess />);
            expect(screen.getByText('Check your email')).toBeInTheDocument();
            expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
        });

        it('renders error message when provided', () => {
            render(<ForgotPasswordForm {...defaultProps} error="Email not found" />);
            expect(screen.getByText('Email not found')).toBeInTheDocument();
        });

        it('renders back to login link when onBack provided', () => {
            render(<ForgotPasswordForm {...defaultProps} onBack={vi.fn()} />);
            expect(screen.getByText(/back to login/i)).toBeInTheDocument();
        });

        it('renders back to login button in success state', () => {
            render(<ForgotPasswordForm {...defaultProps} isSuccess onBack={vi.fn()} />);
            expect(screen.getByRole('button', { name: /back to login/i })).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('calls onSubmit with email on form submit', async () => {
            const user = userEvent.setup();
            const onSubmit = vi.fn();
            render(<ForgotPasswordForm onSubmit={onSubmit} />);

            await user.type(screen.getByLabelText(/email/i), 'john@example.com');
            await user.click(screen.getByRole('button', { name: /send reset link/i }));

            expect(onSubmit).toHaveBeenCalledWith({ email: 'john@example.com' });
        });

        it('calls onBack when back link clicked', async () => {
            const user = userEvent.setup();
            const onBack = vi.fn();
            render(<ForgotPasswordForm {...defaultProps} onBack={onBack} />);

            await user.click(screen.getByText(/back to login/i));
            expect(onBack).toHaveBeenCalledOnce();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations in form view', async () => {
            const { container } = render(
                <ForgotPasswordForm {...defaultProps} onBack={vi.fn()} />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations in success view', async () => {
            const { container } = render(
                <ForgotPasswordForm {...defaultProps} isSuccess onBack={vi.fn()} />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
