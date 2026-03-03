# DashboardLayout

A responsive dashboard shell with sidebar, header, and scrollable content area.

## Usage

```tsx
import { DashboardLayout } from '@ds0/recipes/dashboard-layout';
import { SidebarNavigation } from '@ds0/recipes/sidebar-navigation';

<DashboardLayout sidebar={<SidebarNavigation ... />}>
  <DashboardStats ... />
  <DataTable ... />
</DashboardLayout>
```
