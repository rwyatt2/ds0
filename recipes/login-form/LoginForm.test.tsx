import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { LoginForm } from './LoginForm';

expect.extend(toHaveNoViolations);

describe('LoginForm', () => {
    const defaultProps = {
        onSubmit: vi.fn(),
    };

    describe('rendering', () => {
        it('renders with default title and description', () => {
            render(<LoginForm {...defaultProps} />);
            expect(screen.getByText('Welcome back')).toBeInTheDocument();
            expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
        });

        it('renders email and password fields', () => {
            render(<LoginForm {...defaultProps} />);
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        });

        it('renders sign in button', () => {
            render(<LoginForm {...defaultProps} />);
            expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
        });

        it('renders remember me checkbox', () => {
            render(<LoginForm {...defaultProps} />);
            expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
        });

        it('renders forgot password link when handler provided', () => {
            render(<LoginForm {...defaultProps} onForgotPassword={vi.fn()} />);
            expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
        });

        it('renders sign up link when handler provided', () => {
            render(<LoginForm {...defaultProps} onSignUp={vi.fn()} />);
            expect(screen.getByText(/sign up/i)).toBeInTheDocument();
        });

        it('renders error message when provided', () => {
            render(<LoginForm {...defaultProps} error="Invalid credentials" />);
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });

        it('renders social login buttons when providers given', () => {
            render(
                <LoginForm
                    {...defaultProps}
                    onSocialLogin={vi.fn()}
                    socialProviders={[
                        { name: 'Google', icon: <span>G</span> },
                        { name: 'GitHub', icon: <span>GH</span> },
                    ]}
                />,
            );
            expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /continue with github/i })).toBeInTheDocument();
        });

        it('renders custom title and description', () => {
            render(
                <LoginForm
                    {...defaultProps}
                    title="Login"
                    description="Enter your credentials"
                />,
            );
            expect(screen.getByText('Login')).toBeInTheDocument();
            expect(screen.getByText('Enter your credentials')).toBeInTheDocument();
        });

        it('pre-fills email when defaultEmail provided', () => {
            render(<LoginForm {...defaultProps} defaultEmail="test@example.com" />);
            expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('calls onSubmit with email, password, and rememberMe on form submit', async () => {
            const user = userEvent.setup();
            const onSubmit = vi.fn();
            render(<LoginForm onSubmit={onSubmit} />);

            await user.type(screen.getByLabelText(/email/i), 'john@example.com');
            await user.type(screen.getByLabelText(/password/i), 'password123');
            await user.click(screen.getByRole('button', { name: /sign in/i }));

            expect(onSubmit).toHaveBeenCalledWith({
                email: 'john@example.com',
                password: 'password123',
                rememberMe: false,
            });
        });

        it('calls onForgotPassword when forgot password link clicked', async () => {
            const user = userEvent.setup();
            const onForgotPassword = vi.fn();
            render(<LoginForm {...defaultProps} onForgotPassword={onForgotPassword} />);

            await user.click(screen.getByText(/forgot password/i));
            expect(onForgotPassword).toHaveBeenCalledOnce();
        });

        it('calls onSignUp when sign up link clicked', async () => {
            const user = userEvent.setup();
            const onSignUp = vi.fn();
            render(<LoginForm {...defaultProps} onSignUp={onSignUp} />);

            await user.click(screen.getByText(/sign up/i));
            expect(onSignUp).toHaveBeenCalledOnce();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <LoginForm
                    {...defaultProps}
                    onForgotPassword={vi.fn()}
                    onSignUp={vi.fn()}
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations with error', async () => {
            const { container } = render(
                <LoginForm
                    {...defaultProps}
                    error="Invalid email or password"
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
