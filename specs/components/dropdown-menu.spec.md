# Component Spec: DropdownMenu

## 1. Overview
**Name:** DropdownMenu  
**Category:** Navigation  
**Description:** Displays a menu of actions or options triggered by a button. Supports keyboard navigation, sub-menus, checkable items, and grouping.

## 2. Use Cases
### Use When
* Presenting a list of actions triggered by a button (user menu, settings, etc.)
* Need sub-menus for hierarchical actions
* Providing checkable/radio menu options
* Overflow "more actions" menus

### Don't Use When
* Actions are associated with right-click → use **ContextMenu** instead
* Need a form select dropdown → use **Select** instead
* Need an autocomplete input → use **Combobox** instead
* Navigation between pages → use **NavigationMenu** instead

## 3. Variants
No visual variants — DropdownMenu follows the Menu ARIA pattern with consistent styling.

## 4. Sizes
No size variants — content determines dimensions.

## 5. States
| State | Visual |
|---|---|
| Closed | Menu hidden |
| Open | Menu visible with focus on first item |
| Item highlighted | Active background |
| Item disabled | Muted, non-interactive |

## 6. Anatomy
```
Trigger (button)
  └─ Content (portal)
       ├─ Label (group heading)
       ├─ Item
       ├─ Item (with icon)
       ├─ Separator
       ├─ CheckboxItem
       ├─ RadioGroup
       │   ├─ RadioItem
       │   └─ RadioItem
       └─ Sub (sub-menu)
            └─ SubContent
```

## 7. Props API
### Root
| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled state |
| `defaultOpen` | `boolean` | `false` | Default state |
| `onOpenChange` | `(open: boolean) => void` | — | Change callback |

### Trigger
| Prop | Type | Default | Description |
|---|---|---|---|
| `asChild` | `boolean` | `false` | Slot pattern |

### Content
| Prop | Type | Default | Description |
|---|---|---|---|
| `align` | `'start'\|'center'\|'end'` | `'start'` | Alignment |
| `side` | `'top'\|'bottom'\|'left'\|'right'` | `'bottom'` | Side |
| `sideOffset` | `number` | `4` | Gap between trigger and menu |

### Item
| Prop | Type | Default | Description |
|---|---|---|---|
| `isDisabled` | `boolean` | `false` | Disabled state |
| `onSelect` | `() => void` | — | Selection handler |

## 8. Accessibility
### ARIA Role
* Content: `role="menu"`, Trigger: `aria-haspopup="menu"`, Items: `role="menuitem"`
### Keyboard
| Key | Action |
|---|---|
| `Enter`/`Space` | Open menu / select item |
| `ArrowDown`/`ArrowUp` | Navigate items |
| `ArrowRight` | Open sub-menu |
| `ArrowLeft` | Close sub-menu |
| `Escape` | Close menu |
| `Home`/`End` | Focus first/last item |
### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/menubar/

## 9. Composition Examples
```tsx
<DropdownMenu>
  <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item onSelect={() => {}}>Profile</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Settings</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onSelect={() => {}}>Sign out</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
```

## 10. Decision Tree
```yaml
- condition: Need a menu of actions?
  yes:
    - condition: Triggered by right-click?
      yes: Use ContextMenu
      no:
        - condition: Is it a form select?
          yes: Use Select
          no:
            - condition: Is it navigation?
              yes: Use NavigationMenu
              no: Use DropdownMenu
  no: DropdownMenu is not the right component.
```

## 11. Related Components
| Component | Relationship |
|---|---|
| ContextMenu | Right-click triggered menu |
| Select | Form select dropdown |
| NavigationMenu | Page navigation |
| Menubar | Horizontal menu bar |

## 12. Design Tokens Used
| Token | Usage |
|---|---|
| `color.popover/popover-foreground` | Content background/text |
| `color.accent/accent-foreground` | Item hover state |
| `color.muted-foreground` | Disabled items |
| `radius.md` | Content border radius |
| `shadow.md` | Content elevation |

## 13. Open Questions
None.
