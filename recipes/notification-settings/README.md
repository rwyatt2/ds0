# NotificationSettings

A notification preferences panel with categorized toggle switches.

## Usage

```tsx
import { NotificationSettings } from '@ds0/recipes/notification-settings';

<NotificationSettings
  settings={[{ id: '1', category: 'Email', label: 'Marketing', description: '...', enabled: true }]}
  onSettingChange={(id, enabled) => update(id, enabled)}
/>
```
