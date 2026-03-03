# CommandPalette

A keyboard-driven command search dialog (Cmd+K) for quick actions.

## Usage

```tsx
import { CommandPalette } from '@ds0/recipes/command-palette';

const [open, setOpen] = useState(false);

<CommandPalette
  open={open}
  onOpenChange={setOpen}
  commands={[{ id: '1', label: 'Go to Dashboard', group: 'Navigation', onSelect: () => {} }]}
/>
```
