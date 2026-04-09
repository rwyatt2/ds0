import React, { useState } from 'react';

import { cn } from '@ds0/primitives';

import { Card } from '@ds0/components/react/card';
import { Stack } from '@ds0/components/react/stack';
import { Text } from '@ds0/components/react/text';
import { Heading } from '@ds0/components/react/heading';
import { Button } from '@ds0/components/react/button';
import { Alert } from '@ds0/components/react/alert';
import { TextField } from '@ds0/components/react/text-field';
import { Link } from '@ds0/components/react/link';

/**
 * Props for the ForgotPasswordForm recipe component.
 */
interface ForgotPasswordFormProps {
    /** Submit handler */
    onSubmit: (data: { email: string }) => void | Promise<void>;
    /** Back to login handler */
    onBack?: () => void;
    /** Loading state */
    isLoading?: boolean;
    /** Shows success message when true */
    isSuccess?: boolean;
    /** Error message */
    error?: string;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Check icon for success state.
 */
function CheckCircleIcon(): React.ReactElement {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-green-600">
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

/**
 * ForgotPasswordForm recipe.
 * A password reset request form with email input and success state.
 *
 * @example
 * ```tsx
 * <ForgotPasswordForm
 *   onSubmit={({ email }) => sendResetEmail(email)}
 *   onBack={() => navigate('/login')}
 * />
 * ```
 */
function ForgotPasswordForm({
    onSubmit,
    onBack,
    isLoading = false,
    isSuccess = false,
    error,
    className,
}: ForgotPasswordFormProps): React.ReactElement {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        onSubmit({ email });
    };

    return (
        <Card className={cn('w-full max-w-md', className)}>
            {isSuccess ? (
                <>
                    <Card.Header>
                        <Stack align="center" gap="4">
                            <CheckCircleIcon />
                            <Card.Title className="text-center">Check your email</Card.Title>
                            <Card.Description className="text-center">
                                We sent a password reset link to your email address. Please check your inbox and follow the instructions.
                            </Card.Description>
                        </Stack>
                    </Card.Header>
                    <Card.Content>
                        {onBack && (
                            <Button variant="outline" className="w-full" onClick={onBack}>
                                Back to login
                            </Button>
                        )}
                    </Card.Content>
                </>
            ) : (
                <>
                    <Card.Header>
                        <Card.Title>Forgot password</Card.Title>
                        <Card.Description>
                            Enter your email address and we&apos;ll send you a link to reset your password.
                        </Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="4">
                            {error && (
                                <Alert variant="destructive">
                                    <Alert.Description>{error}</Alert.Description>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit}>
                                <Stack gap="4">
                                    <TextField
                                        label="Email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        isRequired
                                    />

                                    <Button type="submit" className="w-full" isLoading={isLoading}>
                                        Send reset link
                                    </Button>
                                </Stack>
                            </form>

                            {onBack && (
                                <Stack align="center">
                                    <Link
                                        variant="muted"
                                        size="sm"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onBack();
                                        }}
                                    >
                                        ← Back to login
                                    </Link>
                                </Stack>
                            )}
                        </Stack>
                    </Card.Content>
                </>
            )}
        </Card>
    );
}

ForgotPasswordForm.displayName = 'ForgotPasswordForm';

export { ForgotPasswordForm };
export type { ForgotPasswordFormProps };
