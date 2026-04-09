# Component Spec: ScrollArea

## 1. Overview
**Name:** ScrollArea  
**Category:** Layout  
**Description:** A custom-styled scrollable container with cross-browser consistent scrollbar appearance, supporting both vertical and horizontal scrolling.

## 2. Use Cases
### Use When
* Need consistent scrollbar styling across browsers
* Building scrollable panels, sidebars, or dropdown content
* Need to control scrollbar visibility and size
* Creating mobile-friendly scrollable areas

### Don't Use When
* Standard browser scrolling is sufficient → use native overflow
* Need virtualized/windowed lists → use a virtualization library

## 3. Variants
No visual variants — scrollbar style is determined by theme tokens.

## 4. Sizes
Scrollbar thumb width: thin (4px), default (8px).

## 5. States
| State | Behavior |
|---|---|
| Idle | Scrollbar may auto-hide |
| Scrolling | Scrollbar is visible |
| Hover | Scrollbar track visible on hover |

## 6. Anatomy
```
┌─────────────────────────────────────┐
│ ScrollArea.Root                      │
│   ┌──────────────────────────────┐  │
│   │ ScrollArea.Viewport          │  │
│   │   (scrollable content)       │  │
│   └──────────────────────────────┘  │
│   │ ScrollArea.Scrollbar         │  │
│   │   └─ ScrollArea.Thumb        │  │
└─────────────────────────────────────┘
```

## 7. Props API
### Root
| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `'auto'\|'always'\|'scroll'\|'hover'` | `'hover'` | Scrollbar visibility |
| `scrollHideDelay` | `number` | `600` | ms before scrollbar hides |

### Scrollbar
| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `'vertical'\|'horizontal'` | `'vertical'` | Scroll direction |

## 8. Accessibility
Uses native scrolling behavior — no special ARIA roles needed. Keyboard scrolling works natively.
### Keyboard
| Key | Action |
|---|---|
| `ArrowUp/Down` | Scroll vertically |
| `ArrowLeft/Right` | Scroll horizontally |
| `Page Up/Down` | Scroll by page |
| `Home/End` | Scroll to start/end |
### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/

## 9. Composition Examples
```tsx
<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">{longContent}</div>
</ScrollArea>
```

## 10. Decision Tree
```yaml
- condition: Need custom scrollbar styling?
  yes: Use ScrollArea
  no:
    - condition: Need virtualized scrolling?
      yes: Use a virtualization library
      no: Use native CSS overflow
```

## 11. Related Components
| Component | Relationship |
|---|---|
| Dialog/Drawer | Often use ScrollArea for long content |
| DropdownMenu | Uses ScrollArea for long option lists |

## 12. Design Tokens Used
| Token | Usage |
|---|---|
| `color.border` | Scrollbar track |
| `color.foreground` | Scrollbar thumb |
| `radius.full` | Thumb border radius |

## 13. Open Questions
None.
