# ErrorPage

A full-page error display for 404, 500, and other error states.

## Usage

```tsx
import { ErrorPage } from '@ds0/recipes/error-page';

<ErrorPage
  code={404}
  title="Page not found"
  description="The page you're looking for doesn't exist."
  onGoHome={() => navigate('/')}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `code` | `number \| string` | — | No | Error code (404, 500, etc.) |
| `title` | `string` | `'Something went wrong'` | No | Error heading |
| `description` | `string` | — | No | Error description |
| `onRetry` | `() => void` | — | No | Retry action |
| `onGoHome` | `() => void` | — | No | Go to homepage action |
| `className` | `string` | — | No | Additional CSS classes |
