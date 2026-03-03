# SidebarNavigation

A vertical navigation sidebar with grouped links, collapsible sections, and active state indication.

## Usage

```tsx
import { SidebarNavigation } from '@ds0/recipes/sidebar-navigation';

<SidebarNavigation
  groups={[{ label: 'Main', items: [{ label: 'Dashboard', href: '/' }] }]}
  currentPath="/"
/>
```
