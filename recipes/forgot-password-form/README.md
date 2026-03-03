# ForgotPasswordForm

A password reset request form with email input and success state.

## Usage

```tsx
import { ForgotPasswordForm } from '@ds0/recipes/forgot-password-form';

<ForgotPasswordForm
  onSubmit={({ email }) => sendResetEmail(email)}
  onBack={() => navigate('/login')}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `onSubmit` | `(data: { email: string }) => void` | — | Yes | Submit handler |
| `onBack` | `() => void` | — | No | Back to login handler |
| `isLoading` | `boolean` | `false` | No | Loading state |
| `isSuccess` | `boolean` | `false` | No | Shows success message |
| `error` | `string` | — | No | Error message |
| `className` | `string` | — | No | Additional CSS classes |
