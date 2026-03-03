# EmptyState

A placeholder shown when a content area has no data, with optional illustration, heading, description, and action buttons.

## Usage

```tsx
import { EmptyState } from '@ds0/recipes/empty-state';

<EmptyState
  icon={<InboxIcon />}
  title="No messages"
  description="New messages will appear here."
  action={{ label: 'Compose', onClick: () => {} }}
/>
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | Yes | Heading text |
| `description` | `string` | No | Supporting text |
| `icon` | `ReactNode` | No | Illustration or icon |
| `action` | `{ label: string; onClick: () => void }` | No | Primary action button |
| `secondaryAction` | `{ label: string; onClick: () => void }` | No | Secondary action button |
| `className` | `string` | No | Additional CSS classes |
