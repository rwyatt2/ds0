import React, { useState } from 'react';

import { cn } from '@ds0/primitives';

import { Card } from '../../components/react/card';
import { Stack } from '../../components/react/stack';
import { Text } from '../../components/react/text';
import { Button } from '../../components/react/button';
import { Divider } from '../../components/react/divider';
import { Alert } from '../../components/react/alert';
import { TextField } from '../../components/react/text-field';
import { Checkbox } from '../../components/react/checkbox';
import { Link } from '../../components/react/link';

/**
 * Props for the LoginForm recipe component.
 */
interface LoginFormProps {
    /** Form submission handler */
    onSubmit: (data: { email: string; password: string; rememberMe: boolean }) => void | Promise<void>;
    /** Forgot password link handler */
    onForgotPassword?: () => void;
    /** Sign up link handler */
    onSignUp?: () => void;
    /** Social login handler (shows social buttons when provided) */
    onSocialLogin?: (provider: string) => void;
    /** Social login providers */
    socialProviders?: Array<{ name: string; icon: React.ReactNode }>;
    /** Card title */
    title?: string;
    /** Card description */
    description?: string;
    /** Loading state for submit button */
    isLoading?: boolean;
    /** Form-level error message */
    error?: string;
    /** Pre-filled email */
    defaultEmail?: string;
    /** Additional CSS classes */
    className?: string;
}

/**
 * LoginForm recipe.
 * A complete login form with email/password fields, remember me option,
 * social login divider, and forgot password link.
 *
 * @example
 * ```tsx
 * <LoginForm
 *   onSubmit={({ email, password }) => signIn(email, password)}
 *   onForgotPassword={() => navigate('/forgot-password')}
 *   onSignUp={() => navigate('/signup')}
 * />
 * ```
 */
function LoginForm({
    onSubmit,
    onForgotPassword,
    onSignUp,
    onSocialLogin,
    socialProviders,
    title = 'Welcome back',
    description = 'Sign in to your account',
    isLoading = false,
    error,
    defaultEmail,
    className,
}: LoginFormProps): React.ReactElement {
    const [email, setEmail] = useState(defaultEmail ?? '');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        onSubmit({ email, password, rememberMe });
    };

    return (
        <Card className={cn('w-full max-w-md', className)}>
            <Card.Header>
                <Card.Title>{title}</Card.Title>
                <Card.Description>{description}</Card.Description>
            </Card.Header>
            <Card.Content>
                <Stack gap="6">
                    {/* Social Login */}
                    {socialProviders && socialProviders.length > 0 && onSocialLogin && (
                        <>
                            <Stack gap="3">
                                {socialProviders.map((provider) => (
                                    <Button
                                        key={provider.name}
                                        variant="outline"
                                        className="w-full"
                                        leftIcon={provider.icon}
                                        onClick={() => onSocialLogin(provider.name)}
                                    >
                                        Continue with {provider.name}
                                    </Button>
                                ))}
                            </Stack>

                            <div className="relative">
                                <Divider />
                                <Text
                                    as="span"
                                    size="xs"
                                    color="muted"
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2"
                                >
                                    or continue with email
                                </Text>
                            </div>
                        </>
                    )}

                    {/* Error */}
                    {error && (
                        <Alert variant="destructive">
                            <Alert.Description>{error}</Alert.Description>
                        </Alert>
                    )}

                    {/* Form */}
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

                            <TextField
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                isRequired
                            />

                            <Stack direction="horizontal" justify="between" align="center">
                                <Checkbox
                                    label="Remember me"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                                />
                                {onForgotPassword && (
                                    <Link
                                        variant="muted"
                                        size="sm"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onForgotPassword();
                                        }}
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </Stack>

                            <Button type="submit" className="w-full" isLoading={isLoading}>
                                Sign in
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Card.Content>

            {onSignUp && (
                <Card.Footer className="justify-center">
                    <Text size="sm" color="muted" as="span">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onSignUp();
                            }}
                        >
                            Sign up
                        </Link>
                    </Text>
                </Card.Footer>
            )}
        </Card>
    );
}

LoginForm.displayName = 'LoginForm';

export { LoginForm };
export type { LoginFormProps };
