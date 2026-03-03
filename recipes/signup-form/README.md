# SignupForm

A complete registration form with name, email, password, password confirmation, terms agreement, and optional social signup.

## Usage

```tsx
import { SignupForm } from '@ds0/recipes/signup-form';

<SignupForm
  onSubmit={({ name, email, password }) => register(name, email, password)}
  onLogin={() => navigate('/login')}
  termsUrl="/terms"
  privacyUrl="/privacy"
/>
```

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `onSubmit` | `(data: { name: string; email: string; password: string }) => void` | — | Yes | Form submission handler |
| `onLogin` | `() => void` | — | No | Switch to login handler |
| `onSocialSignup` | `(provider: string) => void` | — | No | Social signup handler |
| `socialProviders` | `Array<{ name: string; icon: ReactNode }>` | — | No | Social providers |
| `title` | `string` | `'Create an account'` | No | Card title |
| `description` | `string` | `'Get started in seconds'` | No | Card description |
| `isLoading` | `boolean` | `false` | No | Loading state |
| `error` | `string` | — | No | Error message |
| `termsUrl` | `string` | — | No | Terms of service URL |
| `privacyUrl` | `string` | — | No | Privacy policy URL |
| `passwordRequirements` | `string[]` | — | No | Password requirements |
| `className` | `string` | — | No | Additional CSS classes |
