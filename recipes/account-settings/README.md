# AccountSettings

Account management panel with password change, email change, and danger zone (delete account).

## Usage

```tsx
import { AccountSettings } from '@ds0/recipes/account-settings';

<AccountSettings
  email="john@example.com"
  onChangePassword={({ current, newPassword }) => changePassword(current, newPassword)}
  onChangeEmail={(email) => changeEmail(email)}
  onDeleteAccount={() => deleteAccount()}
/>
```
