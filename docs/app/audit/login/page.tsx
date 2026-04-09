'use client';

/**
 * TaskFlow — Login Page
 * 
 * AUDIT TEST: Tests the following DS0 components in composition:
 * - Card (compound: Card, Card.Header, Card.Title, Card.Description, Card.Content, Card.Footer)
 * - Button (primary, ghost variants + loading state)
 * - TextField (email, password types + validation)
 * - Checkbox (remember me)
 * - Link (forgot password, sign up)
 * - Stack (vertical + horizontal layout)
 * - Text (muted helper text)
 * - Heading (page title)
 * - Divider (social login separator)
 * - Alert (error state)
 * 
 * FRICTION LOG is documented inline with 🔥 markers.
 */

import { useState } from 'react';

// 🔥 FRICTION #1: Import paths are uncertain.
// The components live at ../../components/react/[name] from recipes,
// but from the docs app there's no clear package import path.
// A real user would expect: import { Button } from '@ds0/react/button'
// Instead we must use relative paths from wherever we are.
// The CLI is supposed to copy components into your project, but it's not published.

// Using the same import pattern as recipes (relative paths from monorepo root)
import { Card } from '../../../../components/react/card';
import { Button } from '../../../../components/react/button';
import { TextField } from '../../../../components/react/text-field';
import { Checkbox } from '../../../../components/react/checkbox';
import { Link } from '../../../../components/react/link';
import { Stack } from '../../../../components/react/stack';
import { Text } from '../../../../components/react/text';
import { Heading } from '../../../../components/react/heading';
import { Divider } from '../../../../components/react/divider';
import { Alert } from '../../../../components/react/alert';

export default function LoginPage(): React.ReactElement {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (email === 'test@example.com' && password === 'password') {
                setSuccess(true);
            } else {
                setError('Invalid email or password. Try test@example.com / password');
            }
        }, 1500);
    };

    if (success) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <Card.Header>
                        <Card.Title>Welcome to TaskFlow! ✅</Card.Title>
                        <Card.Description>You are now signed in.</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <Stack gap="4">
                            <Text color="muted">Navigate to the dashboard or settings to test more components.</Text>
                            <Stack direction="horizontal" gap="3">
                                <Button variant="primary" className="flex-1" onClick={() => window.location.href = '/audit/dashboard'}>
                                    Dashboard →
                                </Button>
                                <Button variant="outline" className="flex-1" onClick={() => window.location.href = '/audit/settings'}>
                                    Settings
                                </Button>
                            </Stack>
                        </Stack>
                    </Card.Content>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            {/* 🔥 FRICTION #2: Card doesn't accept padding/spacing props directly.
                You have to use className="w-full max-w-md" which is fine for Tailwind users
                but not as discoverable as a `maxWidth` prop would be. */}
            <Card className="w-full max-w-md">
                <Card.Header>
                    <Card.Title>Welcome to TaskFlow</Card.Title>
                    <Card.Description>Sign in to manage your projects</Card.Description>
                </Card.Header>
                <Card.Content>
                    <Stack gap="6">
                        {/* Social Login Buttons */}
                        <Stack gap="3">
                            <Button variant="outline" className="w-full">
                                {/* 🔥 FRICTION #3: No icon library included.
                                    The system mentions icons but provides no guidance on which icon lib to use.
                                    leftIcon prop requires a ReactNode but no icons are exported. */}
                                Continue with Google
                            </Button>
                            <Button variant="outline" className="w-full">
                                Continue with GitHub
                            </Button>
                        </Stack>

                        {/* Divider */}
                        <div className="relative">
                            <Divider />
                            {/* 🔥 FRICTION #4: There's no "text divider" variant.
                                You have to manually absolute-position text over the Divider.
                                Many design systems offer <Divider>or</Divider> pattern. */}
                            <Text
                                as="span"
                                size="xs"
                                color="muted"
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 dark:bg-gray-950"
                            >
                                or continue with email
                            </Text>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <Alert variant="destructive">
                                <Alert.Description>{error}</Alert.Description>
                            </Alert>
                        )}

                        {/* Login Form */}
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
                                    <Link variant="muted" size="sm" href="#">
                                        Forgot password?
                                    </Link>
                                </Stack>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    isLoading={isLoading}
                                    loadingText="Signing in..."
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Card.Content>

                <Card.Footer className="justify-center">
                    <Text size="sm" color="muted" as="span">
                        Don&apos;t have an account?{' '}
                        <Link href="#">Sign up</Link>
                    </Text>
                </Card.Footer>
            </Card>
        </div>
    );
}
