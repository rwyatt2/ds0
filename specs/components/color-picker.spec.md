# Component Spec: ColorPicker

## 1. Overview

**Name:** ColorPicker
**Category:** Data Input
**Description:** An interactive color selection component with a spectrum area, hue/alpha sliders, color format inputs (hex/RGB/HSL), and optional preset swatches.

## 2. Use Cases

### Use When
* Theme customization interfaces
* Branding/design tool color selection
* Chart/visualization color configuration
* Any UI where users need to pick a color value

### Don't Use When
* Predefined color selection from a small set → use Select or RadioGroup
* Displaying a color without interaction → use a Badge or swatch div

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Popover-based picker triggered by swatch | Most settings forms |
| `inline` | Picker rendered inline (no popover) | Dedicated color tools |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | Swatch h-8 w-8 | Compact toolbars |
| `md` | Swatch h-10 w-10 | Default |
| `lg` | Swatch h-12 w-12 | Prominent color selection |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Color swatch showing current value | Click to open picker |
| Open | Picker popover visible | Full interaction available |
| Hover | Swatch border highlight | Cursor pointer |
| Focus | Focus ring on swatch or slider | Keyboard accessible |
| Disabled | Reduced opacity, no interaction | `aria-disabled="true"` |

## 6. Anatomy

```
┌─ ColorPicker ──────────────────────────────────┐
│  ┌─ Trigger (swatch) ─┐                        │
│  │  ████████████████   │                        │
│  └─────────────────────┘                        │
│                                                  │
│  ┌─ Popover ────────────────────────────────┐   │
│  │  ┌─ Spectrum Area ─────────────────────┐ │   │
│  │  │  ┌─ Thumb ●                         │ │   │
│  │  │  │  Saturation × Lightness          │ │   │
│  │  └─────────────────────────────────────┘ │   │
│  │  ┌─ Hue Slider ───────────────────────┐ │   │
│  │  │  ────●──────────────────────────    │ │   │
│  │  └─────────────────────────────────────┘ │   │
│  │  ┌─ Alpha Slider ─────────────────────┐ │   │
│  │  │  ──────●────────────────────────    │ │   │
│  │  └─────────────────────────────────────┘ │   │
│  │  ┌─ Input ────────────────────────────┐ │   │
│  │  │  #FF5733  [R][G][B]  Format ▼      │ │   │
│  │  └─────────────────────────────────────┘ │   │
│  │  ┌─ Swatches ──────────────────────┐    │   │
│  │  │  ██ ██ ██ ██ ██ ██ ██ ██        │    │   │
│  │  └─────────────────────────────────┘    │   │
│  └──────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| ColorPicker (root) | Yes | Context provider |
| ColorPickerTrigger | Yes | Swatch button to open picker |
| ColorPickerContent | Yes | Popover content |
| ColorPickerArea | Yes | 2D spectrum for saturation/lightness |
| ColorPickerAreaThumb | Yes | Draggable point on spectrum |
| ColorPickerSlider (hue) | Yes | Hue selection slider |
| ColorPickerSlider (alpha) | No | Opacity slider |
| ColorPickerInput | No | Hex/RGB/HSL text input |
| ColorPickerSwatches | No | Preset color swatches |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `string` | — | No | Controlled color value (hex) |
| `defaultValue` | `string` | `'#000000'` | No | Initial color value |
| `onChange` | `(color: string) => void` | — | No | Color change handler |
| `format` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | No | Color format for input/output |
| `showAlpha` | `boolean` | `false` | No | Show alpha/opacity slider |
| `swatches` | `string[]` | — | No | Preset swatch colors |
| `variant` | `'default' \| 'inline'` | `'default'` | No | Popover vs inline display |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Trigger swatch size |
| `isDisabled` | `boolean` | `false` | No | Disable the picker |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLDivElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Uses `role="application"` for the spectrum area, `role="slider"` for sliders.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Enter` / `Space` | Open/close picker popover |
| `Arrow keys` | Move spectrum thumb or slider |
| `Page Up/Down` | Larger increments on sliders |
| `Home` / `End` | Min/max on sliders |
| `Escape` | Close picker popover |
| `Tab` | Navigate between picker controls |

### Screen Reader Behavior
* Trigger announces current color value
* Spectrum area announces hue, saturation, lightness
* Sliders announce their current value and range
* Value changes announced via aria-live

### ARIA Attributes
* `aria-label` on spectrum area and sliders
* `aria-valuemin`, `aria-valuemax`, `aria-valuenow` on sliders
* `aria-expanded` on trigger
* `aria-disabled` when disabled

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/slider/

## 9. Composition Examples

### Basic Usage
```tsx
<ColorPicker value={color} onChange={setColor} />
```

### With Swatches
```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  swatches={['#FF0000', '#00FF00', '#0000FF', '#FFFF00']}
/>
```

### Inline Variant
```tsx
<ColorPicker variant="inline" value={color} onChange={setColor} showAlpha />
```

## 10. Decision Tree

```yaml
- condition: Does the user need to select a custom color?
  yes:
    - condition: From a small predefined set?
      yes: Use Select or RadioGroup with color swatches
      no: Use ColorPicker
  no:
    - condition: Displaying a color?
      yes: Use a Badge or styled div
      no: No color component needed
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Popover | Used for the picker popover |
| Slider | Hue/alpha sliders |
| Input | Color format text input |
| Select | For predefined color lists |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.border` | Picker border, swatch borders |
| `radius.md` | Spectrum area corners |
| `shadow.lg` | Popover shadow |
| `spacing.2` | Gap between picker sections |

## 13. Open Questions

* Should ColorPicker support eyedropper (EyeDropper API)?
* Should format switching be built-in or external?
