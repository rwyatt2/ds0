# Component Spec: TreeView

## 1. Overview

**Name:** TreeView
**Category:** Data Display
**Description:** Displays hierarchical data in an expandable/collapsible tree structure with support for selection, keyboard navigation, and custom node rendering.

## 2. Use Cases

### Use When
* File/folder navigation (file explorers)
* Category hierarchies (product taxonomy)
* Organizational charts or department trees
* Nested settings or configuration panels

### Don't Use When
* Flat list of items → use List
* Breadcrumb-style navigation → use Breadcrumb
* Menu with submenus → use NavigationMenu or DropdownMenu
* Accordion-style content → use Accordion

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Standard tree with indent lines | File explorers, settings |
| `compact` | Minimal tree without indent guides | Sidebar navigation |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | py-0.5 text-xs, indent-4 | Dense explorer panels |
| `md` | py-1 text-sm, indent-6 | Default |
| `lg` | py-1.5 text-base, indent-8 | Spacious tree displays |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Node label, expand icon if has children | Static display |
| Hover | Background highlight on node | Visual feedback |
| Focus | Focus ring on focused node | Keyboard focus indicator |
| Selected | Accent background | Node selected |
| Expanded | Rotate expand icon, show children | Subtree visible |
| Collapsed | Expand icon pointing right | Subtree hidden |
| Disabled | Reduced opacity | No interaction |
| Loading | Spinner replacing expand icon | Async children loading |

## 6. Anatomy

```
┌─ TreeView ────────────────────────────────┐
│                                            │
│  ┌─ TreeNode ────────────────────────┐    │
│  │  ▼ 📁 Documents                   │    │
│  │    │                               │    │
│  │    ├─ TreeNode ──────────────────┐ │    │
│  │    │  ▶ 📁 Projects              │ │    │
│  │    └──────────────────────────────┘ │    │
│  │    │                               │    │
│  │    ├─ TreeNode ──────────────────┐ │    │
│  │    │    📄 readme.md              │ │    │
│  │    └──────────────────────────────┘ │    │
│  └────────────────────────────────────┘    │
│                                            │
│  ┌─ TreeNode ────────────────────────┐    │
│  │  ▶ 📁 Images                      │    │
│  └────────────────────────────────────┘    │
│                                            │
└────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| TreeView (root) | Yes | `role="tree"` container |
| TreeNode | Yes | `role="treeitem"` for each node |
| TreeNodeContent | Yes | Label, icon, actions for a node |
| TreeNodeIndicator | No | Expand/collapse icon (auto if children) |
| TreeNodeIcon | No | Custom icon per node |
| TreeNodeGroup | Yes (with children) | `role="group"` for child nodes |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `data` | `TreeNodeData[]` | — | Yes | Tree data structure |
| `expandedKeys` | `string[]` | — | No | Controlled expanded node keys |
| `defaultExpandedKeys` | `string[]` | `[]` | No | Initially expanded nodes |
| `selectedKeys` | `string[]` | — | No | Controlled selected node keys |
| `onExpandedChange` | `(keys: string[]) => void` | — | No | Expand state change handler |
| `onSelectedChange` | `(keys: string[]) => void` | — | No | Selection change handler |
| `selectionMode` | `'none' \| 'single' \| 'multiple'` | `'none'` | No | Selection behavior |
| `variant` | `'default' \| 'compact'` | `'default'` | No | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Node size |
| `renderNode` | `(node: TreeNodeData) => ReactNode` | — | No | Custom node renderer |
| `onLoadChildren` | `(node: TreeNodeData) => Promise<TreeNodeData[]>` | — | No | Async child loading |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLDivElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Uses `role="tree"` on root, `role="treeitem"` on nodes, `role="group"` on subtrees.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Arrow Down` | Focus next visible node |
| `Arrow Up` | Focus previous visible node |
| `Arrow Right` | Expand focused node (or move to first child) |
| `Arrow Left` | Collapse focused node (or move to parent) |
| `Enter` / `Space` | Select/activate focused node |
| `Home` | Focus first node in tree |
| `End` | Focus last visible node |
| `*` (asterisk) | Expand all siblings at current level |
| Type-ahead | Focus node starting with typed characters |

### Screen Reader Behavior
* Root announces as "tree"
* Each node announces: label, expanded/collapsed state, level, position in set
* Selection state announced per node
* Loading state announced

### ARIA Attributes
* `role="tree"` on root
* `role="treeitem"` on each node
* `role="group"` on child node containers
* `aria-expanded` on nodes with children
* `aria-selected` on selected nodes
* `aria-level` indicating depth
* `aria-setsize` and `aria-posinset` for position
* `aria-busy` during async loading

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/treeview/

## 9. Composition Examples

### Basic Usage
```tsx
<TreeView
  data={[
    { key: '1', label: 'Documents', children: [
      { key: '1.1', label: 'readme.md' },
      { key: '1.2', label: 'Projects', children: [...] },
    ]},
    { key: '2', label: 'Images' },
  ]}
/>
```

### With Selection
```tsx
<TreeView
  data={fileTree}
  selectionMode="multiple"
  selectedKeys={selected}
  onSelectedChange={setSelected}
/>
```

### With Custom Rendering
```tsx
<TreeView
  data={fileTree}
  renderNode={(node) => (
    <div className="flex items-center gap-2">
      <FileIcon type={node.type} />
      <span>{node.label}</span>
      <Badge size="sm">{node.count}</Badge>
    </div>
  )}
/>
```

## 10. Decision Tree

```yaml
- condition: Is the data hierarchical with parent-child relationships?
  yes:
    - condition: Do users need to expand/collapse branches?
      yes: Use TreeView
      no:
        - condition: Is it flat navigation?
          yes: Use NavigationMenu or List
          no: Use Accordion for content sections
  no:
    - condition: Sequential steps?
      yes: Use Stepper
      no: Use List or Table
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Accordion | For collapsible content sections (not hierarchical) |
| NavigationMenu | For site navigation menus |
| Collapsible | For single collapsible sections |
| Checkbox | Used for multi-select tree nodes |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.primary` | Selected node background |
| `color.muted` | Hover node background |
| `color.border` | Indent guide lines |
| `color.muted-foreground` | Expand/collapse icon |
| `spacing.4` | Default indent per level |
| `spacing.1` | Node vertical padding |

## 13. Open Questions

* Should TreeView support drag-and-drop reordering?
* Should async loading show inline spinners or skeleton nodes?
