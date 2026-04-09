import React, { useState } from 'react';

import { cn } from '@ds0/primitives';

import { Card } from '@ds0/components/react/card';
import { Stack } from '@ds0/components/react/stack';
import { Text } from '@ds0/components/react/text';
import { Button } from '@ds0/components/react/button';
import { Alert } from '@ds0/components/react/alert';
import { TextField } from '@ds0/components/react/text-field';
import { Checkbox } from '@ds0/components/react/checkbox';
import { Link } from '@ds0/components/react/link';
import { Divider } from '@ds0/components/react/divider';

/**
 * Props for the SignupForm recipe component.
 */
interface SignupFormProps {
    /** Form submission handler */
    onSubmit: (data: { name: string; email: string; password: string }) => void | Promise<void>;
    /** Switch to login handler */
    onLogin?: () => void;
    /** Social signup handler */
    onSocialSignup?: (provider: string) => void;
    /** Social providers */
    socialProviders?: Array<{ name: string; icon: React.ReactNode }>;
    /** Card title */
    title?: string;
    /** Card description */
    description?: string;
    /** Loading state */
    isLoading?: boolean;
    /** Form-level error */
    error?: string;
    /** Terms of service URL (shows checkbox when provided) */
    termsUrl?: string;
    /** Privacy policy URL */
    privacyUrl?: string;
    /** Password requirements shown below password field */
    passwordRequirements?: string[];
    /** Additional CSS classes */
    className?: string;
}

/**
 * SignupForm recipe.
 * A complete registration form with name, email, password, password confirmation,
 * terms agreement, and optional social signup.
 *
 * @example
 * ```tsx
 * <SignupForm
 *   onSubmit={({ name, email, password }) => register(name, email, password)}
 *   onLogin={() => navigate('/login')}
 *   termsUrl="/terms"
 *   privacyUrl="/privacy"
 * />
 * ```
 */
function SignupForm({
    onSubmit,
    onLogin,
    onSocialSignup,
    socialProviders,
    title = 'Create an account',
    description = 'Get started in seconds',
    isLoading = false,
    error,
    termsUrl,
    privacyUrl,
    passwordRequirements,
    className,
}: SignupFormProps): React.ReactElement {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        setPasswordError('');
        onSubmit({ name, email, password });
    };

    return (
        <Card className={cn('w-full max-w-md', className)}>
            <Card.Header>
                <Card.Title>{title}</Card.Title>
                <Card.Description>{description}</Card.Description>
            </Card.Header>
            <Card.Content>
                <Stack gap="6">
                    {/* Social Signup */}
                    {socialProviders && socialProviders.length > 0 && onSocialSignup && (
                        <>
                            <Stack gap="3">
                                {socialProviders.map((provider) => (
                                    <Button
                                        key={provider.name}
                                        variant="outline"
                                        className="w-full"
                                        leftIcon={provider.icon}
                                        onClick={() => onSocialSignup(provider.name)}
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
                                label="Full name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                isRequired
                            />

                            <TextField
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                isRequired
                            />

                            <div>
                                <TextField
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    isRequired
                                />
                                {passwordRequirements && passwordRequirements.length > 0 && (
                                    <ul className="mt-1.5 space-y-1">
                                        {passwordRequirements.map((req) => (
                                            <li key={req} className="text-xs text-muted-foreground">
                                                • {req}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <TextField
                                label="Confirm password"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                                isInvalid={!!passwordError}
                                errorMessage={passwordError}
                                isRequired
                            />

                            {termsUrl && (
                                <Checkbox
                                    label="I agree to the Terms of Service and Privacy Policy"
                                    checked={termsAccepted}
                                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                                />
                            )}

                            <Button type="submit" className="w-full" isLoading={isLoading}>
                                Create account
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Card.Content>

            {onLogin && (
                <Card.Footer className="justify-center">
                    <Text size="sm" color="muted" as="span">
                        Already have an account?{' '}
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onLogin();
                            }}
                        >
                            Sign in
                        </Link>
                    </Text>
                </Card.Footer>
            )}
        </Card>
    );
}

SignupForm.displayName = 'SignupForm';

export { SignupForm };
export type { SignupFormProps };
