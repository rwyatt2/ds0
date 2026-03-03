# LoginForm

A complete login form with email/password fields, remember me option, social login divider, and forgot password link.

## Usage

```tsx
import { LoginForm } from '@ds0/recipes/login-form';

<LoginForm
  onSubmit={({ email, password }) => signIn(email, password)}
  onForgotPassword={() => navigate('/forgot-password')}
  onSignUp={() => navigate('/signup')}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `onSubmit` | `(data: { email: string; password: string; rememberMe: boolean }) => void` | — | Yes | Form submission handler |
| `onForgotPassword` | `() => void` | — | No | Forgot password link handler |
| `onSignUp` | `() => void` | — | No | Sign up link handler |
| `onSocialLogin` | `(provider: string) => void` | — | No | Social login handler |
| `socialProviders` | `Array<{ name: string; icon: ReactNode }>` | — | No | Social providers |
| `title` | `string` | `'Welcome back'` | No | Card title |
| `description` | `string` | `'Sign in to your account'` | No | Card description |
| `isLoading` | `boolean` | `false` | No | Loading state |
| `error` | `string` | — | No | Error message |
| `defaultEmail` | `string` | — | No | Pre-filled email |
| `className` | `string` | — | No | Additional CSS classes |
