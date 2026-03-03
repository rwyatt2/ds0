# ProfileSettings

A profile editing form with avatar upload, name, email, bio, and save/cancel actions.

## Usage

```tsx
import { ProfileSettings } from '@ds0/recipes/profile-settings';

<ProfileSettings
  initialValues={{ name: 'John', email: 'john@example.com' }}
  onSubmit={(data) => updateProfile(data)}
  onAvatarChange={(file) => uploadAvatar(file)}
/>
```
