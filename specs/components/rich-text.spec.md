# Component Spec: RichText

## 1. Overview

**Name:** RichText
**Category:** Data Input
**Description:** A headless rich text editing interface that provides a formatting toolbar and an editable content area, allowing consumers to bring their own editor engine (contentEditable, ProseMirror, etc.).

## 2. Use Cases

### Use When
* Content authoring with formatting (bold, italic, lists, headings)
* Blog post or article editors
* Comment fields with rich formatting
* Internal tools requiring structured text input

### Don't Use When
* Plain text input → use TextArea
* Markdown-only editing → use a Markdown editor
* Code editing → use CodeBlock or code editor
* Displaying formatted content → use MarkdownRenderer

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Full toolbar with all formatting options | Article editors |
| `minimal` | Limited toolbar (bold, italic, link only) | Comments, short messages |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | min-h-24, toolbar text-xs | Compact comment fields |
| `md` | min-h-40, toolbar text-sm | Default editing contexts |
| `lg` | min-h-64, toolbar text-base | Full page editors |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Border, toolbar, editable area | Full editing |
| Focus | Focus ring on editor area | Editor is active |
| Hover | Border color change | Visual feedback |
| Disabled | Reduced opacity, non-editable | No interaction |
| Read-only | Normal appearance, non-editable | Content viewable but not editable |
| Error | Destructive border | Validation failed |

## 6. Anatomy

```
┌─ RichText ──────────────────────────────────────┐
│                                                   │
│  ┌─ Toolbar ──────────────────────────────────┐  │
│  │  [B] [I] [U] [S] │ [H1] [H2] │ [•] [1.]   │  │
│  │  [🔗] [📷] [Code] │ [↩] [↪]                 │  │
│  └────────────────────────────────────────────┘  │
│                                                   │
│  ┌─ EditorContent ────────────────────────────┐  │
│  │                                             │  │
│  │  This is **bold** and _italic_ text.       │  │
│  │                                             │  │
│  │  • List item one                           │  │
│  │  • List item two                           │  │
│  │                                             │  │
│  └────────────────────────────────────────────┘  │
│                                                   │
│  ┌─ Footer (optional) ───────────────────────┐  │
│  │  128 / 500 characters                      │  │
│  └────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| RichText (root) | Yes | Context provider |
| RichTextToolbar | Yes | Formatting action buttons |
| RichTextToolbarGroup | No | Group related actions |
| RichTextToolbarButton | Yes | Individual format action |
| RichTextContent | Yes | Editable content area |
| RichTextFooter | No | Character count, status |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `string` | — | No | Controlled HTML content |
| `defaultValue` | `string` | `''` | No | Initial content |
| `onChange` | `(html: string) => void` | — | No | Content change handler |
| `onTextChange` | `(text: string) => void` | — | No | Plain text change handler |
| `placeholder` | `string` | — | No | Placeholder text |
| `maxLength` | `number` | — | No | Max character count |
| `variant` | `'default' \| 'minimal'` | `'default'` | No | Toolbar configuration |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Editor size |
| `isDisabled` | `boolean` | `false` | No | Disable editing |
| `isReadOnly` | `boolean` | `false` | No | Read-only mode |
| `toolbarActions` | `ToolbarAction[]` | — | No | Custom toolbar configuration |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLDivElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Uses `role="textbox"` with `aria-multiline="true"` on the editor area.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Ctrl/Cmd+B` | Toggle bold |
| `Ctrl/Cmd+I` | Toggle italic |
| `Ctrl/Cmd+U` | Toggle underline |
| `Ctrl/Cmd+Shift+S` | Toggle strikethrough |
| `Ctrl/Cmd+K` | Insert/edit link |
| `Ctrl/Cmd+Z` | Undo |
| `Ctrl/Cmd+Shift+Z` | Redo |
| `Tab` | Indent list item (in lists) |
| `Shift+Tab` | Outdent list item (in lists) |
| `Enter` | New line / continue list |

### Screen Reader Behavior
* Editor announces as "Rich text editor"
* Toolbar buttons announce their action and toggle state
* Formatting changes announced via aria-live
* Character count announced when near limit

### ARIA Attributes
* `role="textbox"` on editor
* `aria-multiline="true"` on editor
* `aria-label="Rich text editor"` on editor
* `aria-disabled` when disabled
* `aria-readonly` when read-only
* `aria-pressed` on toggle toolbar buttons (bold, italic, etc.)
* `contenteditable="true"` on editor

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/

## 9. Composition Examples

### Basic Usage
```tsx
<RichText value={content} onChange={setContent} placeholder="Start writing..." />
```

### Minimal Variant (Comments)
```tsx
<RichText
  variant="minimal"
  size="sm"
  maxLength={500}
  onChange={setComment}
  placeholder="Add a comment..."
/>
```

### In a Form
```tsx
<FormField>
  <FormLabel>Article Body</FormLabel>
  <FormControl>
    <RichText
      value={body}
      onChange={setBody}
      size="lg"
    />
  </FormControl>
  <FormMessage />
</FormField>
```

## 10. Decision Tree

```yaml
- condition: Does the user need to format text content?
  yes:
    - condition: Full formatting (headings, lists, links)?
      yes: Use RichText variant="default"
      no:
        - condition: Basic formatting (bold, italic)?
          yes: Use RichText variant="minimal"
          no: Use TextArea
  no:
    - condition: Is it code?
      yes: Use CodeBlock
      no: Use TextArea or Input
```

## 11. Related Components

| Component | Relationship |
|---|---|
| TextArea | For plain text input |
| Input | For single-line text |
| CodeBlock | For code editing/display |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.border` | Editor border |
| `color.muted` | Toolbar background |
| `color.foreground` | Content text |
| `color.muted-foreground` | Placeholder text |
| `spacing.2` | Toolbar button gaps |
| `radius.md` | Editor corners |

## 13. Open Questions

* Should RichText include a built-in contentEditable implementation or require an engine?
* Image upload integration — built-in or consumer-provided?
* Should output support HTML, Markdown, and JSON (ProseMirror doc format)?
