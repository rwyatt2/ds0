# Navbar

A responsive top navigation bar with logo, nav links, and user menu.

## Usage

```tsx
import { Navbar } from '@ds0/recipes/navbar';

<Navbar
  logo={<span>MyApp</span>}
  links={[{ label: 'Home', href: '/', isActive: true }]}
  user={{ name: 'John', email: 'john@example.com' }}
  onLogout={() => signOut()}
/>
```
