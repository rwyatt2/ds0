import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { SignupForm } from './SignupForm';

expect.extend(toHaveNoViolations);

describe('SignupForm', () => {
    const defaultProps = { onSubmit: vi.fn() };

    describe('rendering', () => {
        it('renders with default title and description', () => {
            render(<SignupForm {...defaultProps} />);
            expect(screen.getByText('Create an account')).toBeInTheDocument();
            expect(screen.getByText('Get started in seconds')).toBeInTheDocument();
        });

        it('renders name, email, password, and confirm password fields', () => {
            render(<SignupForm {...defaultProps} />);
            expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        });

        it('renders create account button', () => {
            render(<SignupForm {...defaultProps} />);
            expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
        });

        it('renders error message when provided', () => {
            render(<SignupForm {...defaultProps} error="Email already in use" />);
            expect(screen.getByText('Email already in use')).toBeInTheDocument();
        });

        it('renders sign in link when onLogin provided', () => {
            render(<SignupForm {...defaultProps} onLogin={vi.fn()} />);
            expect(screen.getByText(/sign in/i)).toBeInTheDocument();
        });

        it('renders password requirements when provided', () => {
            render(
                <SignupForm
                    {...defaultProps}
                    passwordRequirements={['At least 8 characters', 'One uppercase letter']}
                />,
            );
            expect(screen.getByText('• At least 8 characters')).toBeInTheDocument();
            expect(screen.getByText('• One uppercase letter')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('calls onSubmit with form data', async () => {
            const user = userEvent.setup();
            const onSubmit = vi.fn();
            render(<SignupForm onSubmit={onSubmit} />);

            await user.type(screen.getByLabelText(/full name/i), 'John Doe');
            await user.type(screen.getByLabelText(/email/i), 'john@example.com');
            await user.type(screen.getByLabelText(/^password/i), 'password123');
            await user.type(screen.getByLabelText(/confirm password/i), 'password123');
            await user.click(screen.getByRole('button', { name: /create account/i }));

            expect(onSubmit).toHaveBeenCalledWith({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            });
        });

        it('shows error when passwords do not match', async () => {
            const user = userEvent.setup();
            const onSubmit = vi.fn();
            render(<SignupForm onSubmit={onSubmit} />);

            await user.type(screen.getByLabelText(/^password/i), 'password123');
            await user.type(screen.getByLabelText(/confirm password/i), 'different');
            await user.click(screen.getByRole('button', { name: /create account/i }));

            expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
            expect(onSubmit).not.toHaveBeenCalled();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <SignupForm {...defaultProps} onLogin={vi.fn()} />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
