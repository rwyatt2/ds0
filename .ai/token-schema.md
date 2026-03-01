# DS0 Token Schema

> This document defines the token architecture, format, naming, and pipeline.
> AI agents: read this before creating or modifying any token.

## 1. Token Format

All source tokens use the **W3C Design Token Community Group (DTCG)** format.

### 1.1 Basic Structure

```json
{
  "group": {
    "token-name": {
      "$type": "color",
      "$value": "#3B82F6",
      "$description": "Human-readable description of this token's purpose"
    }
  }
}
```

### 1.2 Supported Types

| DTCG Type | Used For | Example Value |
|---|---|---|
| `color` | All colors | `#3B82F6`, `rgba(0,0,0,0.5)` |
| `dimension` | Spacing, sizing, radius | `4px`, `0.5rem` |
| `fontFamily` | Font stacks | `"Inter, system-ui, sans-serif"` |
| `fontWeight` | Font weights | `400`, `600`, `700` |
| `duration` | Animation timing | `150ms`, `300ms` |
| `cubicBezier` | Easing curves | `[0.4, 0, 0.2, 1]` |
| `shadow` | Box shadows | `{ "offsetX": "0px", "offsetY": "4px", "blur": "6px", "spread": "-1px", "color": "rgba(0,0,0,0.1)" }` |
| `number` | Unitless values | `1.5`, `0` |

### 1.3 Referencing Other Tokens

Use curly braces to reference other tokens:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "{color.blue.600}",
      "$description": "Primary brand color, references core blue 600"
    }
  }
}
```

References can cross files. A semantic token in `_semantic/color.json` can reference a core token in `_core/color.json`. StyleDictionary resolves all references at build time.

## 2. Token Layers

### 2.1 Layer Overview

```
tokens/
├── _core/              Layer 1 — Raw values, no semantic meaning
├── _semantic/          Layer 2 — Intent-based, references _core
├── themes/             Layer 3 — Theme overrides, references _semantic or _core
└── brands/             Layer 4 — Brand overrides, extends a theme
```

### 2.2 Resolution Cascade

```
Request: "What is the primary color?"

Step 1: Check brands/acme.json       → primary = {color.indigo.600}  ✓ FOUND
Step 2: (skipped — brand resolved it)
Step 3: Resolve {color.indigo.600}    → _core/color.json → #4F46E5
Result: #4F46E5

If no brand override:
Step 1: Check brands/                 → (no override)
Step 2: Check themes/default.json     → (no override)  
Step 3: Check _semantic/color.json    → primary = {color.blue.600}
Step 4: Resolve {color.blue.600}      → _core/color.json → #2563EB
Result: #2563EB
```

## 3. Core Tokens (`tokens/_core/`)

Core tokens are the mathematical foundation. They have NO semantic meaning.

### 3.1 `_core/color.json`

```json
{
  "color": {
    "white": {
      "$type": "color",
      "$value": "#FFFFFF",
      "$description": "Pure white"
    },
    "black": {
      "$type": "color",
      "$value": "#000000",
      "$description": "Pure black"
    },
    "gray": {
      "50":  { "$type": "color", "$value": "#F9FAFB", "$description": "Gray 50 — lightest" },
      "100": { "$type": "color", "$value": "#F3F4F6", "$description": "Gray 100" },
      "200": { "$type": "color", "$value": "#E5E7EB", "$description": "Gray 200" },
      "300": { "$type": "color", "$value": "#D1D5DB", "$description": "Gray 300" },
      "400": { "$type": "color", "$value": "#9CA3AF", "$description": "Gray 400" },
      "500": { "$type": "color", "$value": "#6B7280", "$description": "Gray 500 — mid" },
      "600": { "$type": "color", "$value": "#4B5563", "$description": "Gray 600" },
      "700": { "$type": "color", "$value": "#374151", "$description": "Gray 700" },
      "800": { "$type": "color", "$value": "#1F2937", "$description": "Gray 800" },
      "900": { "$type": "color", "$value": "#111827", "$description": "Gray 900" },
      "950": { "$type": "color", "$value": "#030712", "$description": "Gray 950 — darkest" }
    },
    "blue": {
      "50":  { "$type": "color", "$value": "#EFF6FF", "$description": "Blue 50" },
      "100": { "$type": "color", "$value": "#DBEAFE", "$description": "Blue 100" },
      "200": { "$type": "color", "$value": "#BFDBFE", "$description": "Blue 200" },
      "300": { "$type": "color", "$value": "#93C5FD", "$description": "Blue 300" },
      "400": { "$type": "color", "$value": "#60A5FA", "$description": "Blue 400" },
      "500": { "$type": "color", "$value": "#3B82F6", "$description": "Blue 500" },
      "600": { "$type": "color", "$value": "#2563EB", "$description": "Blue 600" },
      "700": { "$type": "color", "$value": "#1D4ED8", "$description": "Blue 700" },
      "800": { "$type": "color", "$value": "#1E40AF", "$description": "Blue 800" },
      "900": { "$type": "color", "$value": "#1E3A8A", "$description": "Blue 900" },
      "950": { "$type": "color", "$value": "#172554", "$description": "Blue 950" }
    },
    "red": {
      "50":  { "$type": "color", "$value": "#FEF2F2", "$description": "Red 50" },
      "100": { "$type": "color", "$value": "#FEE2E2", "$description": "Red 100" },
      "200": { "$type": "color", "$value": "#FECACA", "$description": "Red 200" },
      "300": { "$type": "color", "$value": "#FCA5A5", "$description": "Red 300" },
      "400": { "$type": "color", "$value": "#F87171", "$description": "Red 400" },
      "500": { "$type": "color", "$value": "#EF4444", "$description": "Red 500" },
      "600": { "$type": "color", "$value": "#DC2626", "$description": "Red 600" },
      "700": { "$type": "color", "$value": "#B91C1C", "$description": "Red 700" },
      "800": { "$type": "color", "$value": "#991B1B", "$description": "Red 800" },
      "900": { "$type": "color", "$value": "#7F1D1D", "$description": "Red 900" },
      "950": { "$type": "color", "$value": "#450A0A", "$description": "Red 950" }
    },
    "green": {
      "50":  { "$type": "color", "$value": "#F0FDF4", "$description": "Green 50" },
      "100": { "$type": "color", "$value": "#DCFCE7", "$description": "Green 100" },
      "200": { "$type": "color", "$value": "#BBF7D0", "$description": "Green 200" },
      "300": { "$type": "color", "$value": "#86EFAC", "$description": "Green 300" },
      "400": { "$type": "color", "$value": "#4ADE80", "$description": "Green 400" },
      "500": { "$type": "color", "$value": "#22C55E", "$description": "Green 500" },
      "600": { "$type": "color", "$value": "#16A34A", "$description": "Green 600" },
      "700": { "$type": "color", "$value": "#15803D", "$description": "Green 700" },
      "800": { "$type": "color", "$value": "#166534", "$description": "Green 800" },
      "900": { "$type": "color", "$value": "#14532D", "$description": "Green 900" },
      "950": { "$type": "color", "$value": "#052E16", "$description": "Green 950" }
    },
    "amber": {
      "50":  { "$type": "color", "$value": "#FFFBEB", "$description": "Amber 50" },
      "100": { "$type": "color", "$value": "#FEF3C7", "$description": "Amber 100" },
      "200": { "$type": "color", "$value": "#FDE68A", "$description": "Amber 200" },
      "300": { "$type": "color", "$value": "#FCD34D", "$description": "Amber 300" },
      "400": { "$type": "color", "$value": "#FBBF24", "$description": "Amber 400" },
      "500": { "$type": "color", "$value": "#F59E0B", "$description": "Amber 500" },
      "600": { "$type": "color", "$value": "#D97706", "$description": "Amber 600" },
      "700": { "$type": "color", "$value": "#B45309", "$description": "Amber 700" },
      "800": { "$type": "color", "$value": "#92400E", "$description": "Amber 800" },
      "900": { "$type": "color", "$value": "#78350F", "$description": "Amber 900" },
      "950": { "$type": "color", "$value": "#451A03", "$description": "Amber 950" }
    }
  }
}
```

Additional core color palettes to include: `violet`, `indigo`, `cyan`, `teal`, `pink`, `orange`. Follow the exact same 50–950 scale pattern.

### 3.2 `_core/spacing.json`

```json
{
  "spacing": {
    "0":    { "$type": "dimension", "$value": "0px",   "$description": "No spacing" },
    "px":   { "$type": "dimension", "$value": "1px",   "$description": "1 pixel — borders, fine adjustments" },
    "0.5":  { "$type": "dimension", "$value": "2px",   "$description": "2px — micro spacing" },
    "1":    { "$type": "dimension", "$value": "4px",   "$description": "4px — base unit" },
    "1.5":  { "$type": "dimension", "$value": "6px",   "$description": "6px" },
    "2":    { "$type": "dimension", "$value": "8px",   "$description": "8px — compact padding" },
    "2.5":  { "$type": "dimension", "$value": "10px",  "$description": "10px" },
    "3":    { "$type": "dimension", "$value": "12px",  "$description": "12px — standard gap" },
    "3.5":  { "$type": "dimension", "$value": "14px",  "$description": "14px" },
    "4":    { "$type": "dimension", "$value": "16px",  "$description": "16px — standard padding" },
    "5":    { "$type": "dimension", "$value": "20px",  "$description": "20px" },
    "6":    { "$type": "dimension", "$value": "24px",  "$description": "24px — section padding" },
    "7":    { "$type": "dimension", "$value": "28px",  "$description": "28px" },
    "8":    { "$type": "dimension", "$value": "32px",  "$description": "32px — large padding" },
    "9":    { "$type": "dimension", "$value": "36px",  "$description": "36px" },
    "10":   { "$type": "dimension", "$value": "40px",  "$description": "40px" },
    "11":   { "$type": "dimension", "$value": "44px",  "$description": "44px — touch target min" },
    "12":   { "$type": "dimension", "$value": "48px",  "$description": "48px" },
    "14":   { "$type": "dimension", "$value": "56px",  "$description": "56px" },
    "16":   { "$type": "dimension", "$value": "64px",  "$description": "64px — large sections" },
    "20":   { "$type": "dimension", "$value": "80px",  "$description": "80px" },
    "24":   { "$type": "dimension", "$value": "96px",  "$description": "96px" },
    "28":   { "$type": "dimension", "$value": "112px", "$description": "112px" },
    "32":   { "$type": "dimension", "$value": "128px", "$description": "128px" },
    "36":   { "$type": "dimension", "$value": "144px", "$description": "144px" },
    "40":   { "$type": "dimension", "$value": "160px", "$description": "160px" },
    "44":   { "$type": "dimension", "$value": "176px", "$description": "176px" },
    "48":   { "$type": "dimension", "$value": "192px", "$description": "192px" },
    "52":   { "$type": "dimension", "$value": "208px", "$description": "208px" },
    "56":   { "$type": "dimension", "$value": "224px", "$description": "224px" },
    "60":   { "$type": "dimension", "$value": "240px", "$description": "240px" },
    "64":   { "$type": "dimension", "$value": "256px", "$description": "256px" },
    "72":   { "$type": "dimension", "$value": "288px", "$description": "288px" },
    "80":   { "$type": "dimension", "$value": "320px", "$description": "320px" },
    "96":   { "$type": "dimension", "$value": "384px", "$description": "384px" }
  }
}
```

### 3.3 `_core/typography.json`

```json
{
  "fontFamily": {
    "sans": {
      "$type": "fontFamily",
      "$value": "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      "$description": "Primary sans-serif font stack"
    },
    "mono": {
      "$type": "fontFamily",
      "$value": "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
      "$description": "Monospace font stack for code"
    }
  },
  "fontWeight": {
    "regular": { "$type": "fontWeight", "$value": 400, "$description": "Regular — body text" },
    "medium":  { "$type": "fontWeight", "$value": 500, "$description": "Medium — emphasis, labels" },
    "semibold": { "$type": "fontWeight", "$value": 600, "$description": "Semibold — headings, buttons" },
    "bold":    { "$type": "fontWeight", "$value": 700, "$description": "Bold — strong emphasis" }
  },
  "fontSize": {
    "xs":   { "$type": "dimension", "$value": "12px", "$description": "Extra small — captions, badges" },
    "sm":   { "$type": "dimension", "$value": "14px", "$description": "Small — secondary text, labels" },
    "base": { "$type": "dimension", "$value": "16px", "$description": "Base — body text" },
    "lg":   { "$type": "dimension", "$value": "18px", "$description": "Large — lead text" },
    "xl":   { "$type": "dimension", "$value": "20px", "$description": "Extra large — h4" },
    "2xl":  { "$type": "dimension", "$value": "24px", "$description": "2XL — h3" },
    "3xl":  { "$type": "dimension", "$value": "30px", "$description": "3XL — h2" },
    "4xl":  { "$type": "dimension", "$value": "36px", "$description": "4XL — h1" },
    "5xl":  { "$type": "dimension", "$value": "48px", "$description": "5XL — display" },
    "6xl":  { "$type": "dimension", "$value": "60px", "$description": "6XL — hero" }
  },
  "lineHeight": {
    "none":    { "$type": "number", "$value": 1,    "$description": "Line height 1 — headings, single line" },
    "tight":   { "$type": "number", "$value": 1.25, "$description": "Line height 1.25 — headings" },
    "snug":    { "$type": "number", "$value": 1.375,"$description": "Line height 1.375 — subheadings" },
    "normal":  { "$type": "number", "$value": 1.5,  "$description": "Line height 1.5 — body text" },
    "relaxed": { "$type": "number", "$value": 1.625,"$description": "Line height 1.625 — long-form text" },
    "loose":   { "$type": "number", "$value": 2,    "$description": "Line height 2 — spacious text" }
  },
  "letterSpacing": {
    "tighter": { "$type": "dimension", "$value": "-0.05em", "$description": "Tighter tracking — large headings" },
    "tight":   { "$type": "dimension", "$value": "-0.025em","$description": "Tight tracking — headings" },
    "normal":  { "$type": "dimension", "$value": "0em",     "$description": "Normal tracking — body" },
    "wide":    { "$type": "dimension", "$value": "0.025em", "$description": "Wide tracking — uppercase labels" },
    "wider":   { "$type": "dimension", "$value": "0.05em",  "$description": "Wider tracking — small caps" },
    "widest":  { "$type": "dimension", "$value": "0.1em",   "$description": "Widest tracking — all caps" }
  }
}
```

### 3.4 `_core/radius.json`

```json
{
  "radius": {
    "none": { "$type": "dimension", "$value": "0px",   "$description": "No rounding — sharp corners" },
    "sm":   { "$type": "dimension", "$value": "2px",   "$description": "Small — subtle rounding" },
    "md":   { "$type": "dimension", "$value": "6px",   "$description": "Medium — default for most components" },
    "lg":   { "$type": "dimension", "$value": "8px",   "$description": "Large — cards, dialogs" },
    "xl":   { "$type": "dimension", "$value": "12px",  "$description": "Extra large — prominent containers" },
    "2xl":  { "$type": "dimension", "$value": "16px",  "$description": "2XL — large cards" },
    "3xl":  { "$type": "dimension", "$value": "24px",  "$description": "3XL — very rounded" },
    "full": { "$type": "dimension", "$value": "9999px","$description": "Full — pills, circles, avatars" }
  }
}
```

### 3.5 `_core/elevation.json`

```json
{
  "elevation": {
    "none": {
      "$type": "shadow",
      "$value": { "offsetX": "0px", "offsetY": "0px", "blur": "0px", "spread": "0px", "color": "rgba(0,0,0,0)" },
      "$description": "No shadow"
    },
    "xs": {
      "$type": "shadow",
      "$value": { "offsetX": "0px", "offsetY": "1px", "blur": "2px", "spread": "0px", "color": "rgba(0,0,0,0.05)" },
      "$description": "Extra small — subtle lift"
    },
    "sm": {
      "$type": "shadow",
      "$value": { "offsetX": "0px", "offsetY": "1px", "blur": "3px", "spread": "0px", "color": "rgba(0,0,0,0.1)" },
      "$description": "Small — buttons, inputs"
    },
    "md": {
      "$type": "shadow",
      "$value": { "offsetX": "0px", "offsetY": "4px", "blur": "6px", "spread": "-1px", "color": "rgba(0,0,0,0.1)" },
      "$description": "Medium — cards, dropdowns"
    },
    "lg": {
      "$type": "shadow",
      "$value": { "offsetX": "0px", "offsetY": "10px", "blur": "15px", "spread": "-3px", "color": "rgba(0,0,0,0.1)" },
      "$description": "Large — modals, popovers"
    },
    "xl": {
      "$type": "shadow",
      "$value": { "offsetX": "0px", "offsetY": "20px", "blur": "25px", "spread": "-5px", "color": "rgba(0,0,0,0.1)" },
      "$description": "Extra large — floating panels"
    },
    "2xl": {
      "$type": "shadow",
      "$value": { "offsetX": "0px", "offsetY": "25px", "blur": "50px", "spread": "-12px", "color": "rgba(0,0,0,0.25)" },
      "$description": "2XL — dramatic lift, hero elements"
    }
  }
}
```

### 3.6 `_core/motion.json`

```json
{
  "duration": {
    "instant":  { "$type": "duration", "$value": "0ms",   "$description": "No animation" },
    "fastest":  { "$type": "duration", "$value": "50ms",  "$description": "Micro-interactions" },
    "fast":     { "$type": "duration", "$value": "100ms", "$description": "Quick feedback — hover, focus" },
    "normal":   { "$type": "duration", "$value": "150ms", "$description": "Standard transitions" },
    "moderate":  { "$type": "duration", "$value": "200ms", "$description": "Noticeable transitions" },
    "slow":     { "$type": "duration", "$value": "300ms", "$description": "Deliberate transitions — modals, drawers" },
    "slower":   { "$type": "duration", "$value": "500ms", "$description": "Slow transitions — page elements" },
    "slowest":  { "$type": "duration", "$value": "1000ms","$description": "Very slow — skeleton loaders, progress" }
  },
  "easing": {
    "linear":     { "$type": "cubicBezier", "$value": [0, 0, 1, 1],       "$description": "Linear — progress bars, loaders" },
    "ease-in":    { "$type": "cubicBezier", "$value": [0.4, 0, 1, 1],     "$description": "Ease in — elements exiting" },
    "ease-out":   { "$type": "cubicBezier", "$value": [0, 0, 0.2, 1],     "$description": "Ease out — elements entering" },
    "ease-in-out":{ "$type": "cubicBezier", "$value": [0.4, 0, 0.2, 1],   "$description": "Ease in-out — elements moving, resizing" },
    "spring":     { "$type": "cubicBezier", "$value": [0.175, 0.885, 0.32, 1.275], "$description": "Spring — playful overshoot, toggles" }
  }
}
```

## 4. Semantic Tokens (`tokens/_semantic/`)

Semantic tokens express **intent**. Components reference these, never core tokens.

### 4.1 `_semantic/color.json`

```json
{
  "color": {
    "background":           { "$type": "color", "$value": "{color.white}",    "$description": "Default page background" },
    "foreground":           { "$type": "color", "$value": "{color.gray.950}", "$description": "Default text color" },

    "muted":                { "$type": "color", "$value": "{color.gray.100}", "$description": "Muted backgrounds — disabled, secondary areas" },
    "muted-foreground":     { "$type": "color", "$value": "{color.gray.500}", "$description": "Text on muted backgrounds" },

    "card":                 { "$type": "color", "$value": "{color.white}",    "$description": "Card background" },
    "card-foreground":      { "$type": "color", "$value": "{color.gray.950}", "$description": "Text on cards" },

    "popover":              { "$type": "color", "$value": "{color.white}",    "$description": "Popover/dropdown background" },
    "popover-foreground":   { "$type": "color", "$value": "{color.gray.950}", "$description": "Text in popovers" },

    "primary":              { "$type": "color", "$value": "{color.blue.600}", "$description": "Primary actions, links, active states" },
    "primary-foreground":   { "$type": "color", "$value": "{color.white}",    "$description": "Text on primary backgrounds" },

    "secondary":            { "$type": "color", "$value": "{color.gray.100}", "$description": "Secondary actions, less prominent" },
    "secondary-foreground": { "$type": "color", "$value": "{color.gray.900}", "$description": "Text on secondary backgrounds" },

    "accent":               { "$type": "color", "$value": "{color.gray.100}", "$description": "Accent highlights, hover states" },
    "accent-foreground":    { "$type": "color", "$value": "{color.gray.900}", "$description": "Text on accent backgrounds" },

    "destructive":          { "$type": "color", "$value": "{color.red.600}",  "$description": "Destructive actions — delete, remove, error" },
    "destructive-foreground":{ "$type": "color", "$value": "{color.white}",   "$description": "Text on destructive backgrounds" },

    "success":              { "$type": "color", "$value": "{color.green.600}","$description": "Success states — saved, complete, valid" },
    "success-foreground":   { "$type": "color", "$value": "{color.white}",    "$description": "Text on success backgrounds" },

    "warning":              { "$type": "color", "$value": "{color.amber.500}","$description": "Warning states — caution, attention needed" },
    "warning-foreground":   { "$type": "color", "$value": "{color.amber.950}","$description": "Text on warning backgrounds" },

    "border":               { "$type": "color", "$value": "{color.gray.200}", "$description": "Default border color" },
    "input":                { "$type": "color", "$value": "{color.gray.200}", "$description": "Input borders" },
    "ring":                 { "$type": "color", "$value": "{color.blue.400}", "$description": "Focus ring color" }
  }
}
```

### 4.2 `_semantic/spacing.json`

```json
{
  "density": {
    "compact": {
      "padding-x":  { "$type": "dimension", "$value": "{spacing.2}",  "$description": "Horizontal padding in compact mode" },
      "padding-y":  { "$type": "dimension", "$value": "{spacing.1}",  "$description": "Vertical padding in compact mode" },
      "gap":        { "$type": "dimension", "$value": "{spacing.1.5}","$description": "Gap between elements in compact mode" }
    },
    "comfortable": {
      "padding-x":  { "$type": "dimension", "$value": "{spacing.4}",  "$description": "Horizontal padding in comfortable mode" },
      "padding-y":  { "$type": "dimension", "$value": "{spacing.2}",  "$description": "Vertical padding in comfortable mode" },
      "gap":        { "$type": "dimension", "$value": "{spacing.2}",  "$description": "Gap between elements in comfortable mode" }
    },
    "spacious": {
      "padding-x":  { "$type": "dimension", "$value": "{spacing.6}",  "$description": "Horizontal padding in spacious mode" },
      "padding-y":  { "$type": "dimension", "$value": "{spacing.3}",  "$description": "Vertical padding in spacious mode" },
      "gap":        { "$type": "dimension", "$value": "{spacing.3}",  "$description": "Gap between elements in spacious mode" }
    }
  }
}
```

## 5. Themes (`tokens/themes/`)

Themes override semantic tokens to change the visual character.

### 5.1 `themes/default.json`

```json
{
  "$description": "DS0 default theme — clean, professional, accessible",
  "radius": {
    "component": { "$type": "dimension", "$value": "{radius.md}", "$description": "Default component border radius" }
  },
  "density": {
    "default": { "$type": "string", "$value": "comfortable", "$description": "Default density mode" }
  }
}
```

The default theme intentionally has few overrides — it relies on the semantic layer.

### 5.2 `themes/enterprise.json`

```json
{
  "$description": "Enterprise theme — denser, more neutral, conservative",
  "color": {
    "primary":            { "$type": "color", "$value": "{color.blue.700}",  "$description": "Slightly darker primary" },
    "ring":               { "$type": "color", "$value": "{color.blue.500}",  "$description": "More prominent focus ring" }
  },
  "radius": {
    "component": { "$type": "dimension", "$value": "{radius.sm}", "$description": "Smaller radius — more corporate feel" }
  },
  "density": {
    "default": { "$type": "string", "$value": "compact", "$description": "Compact by default for data-dense UIs" }
  }
}
```

## 6. Brands (`tokens/brands/`)

### 6.1 `brands/_template.json`

```json
{
  "$description": "Brand template — copy this file and modify for a new brand",
  "$extends": "themes/default",
  "color": {
    "primary":              { "$type": "color", "$value": "{color.blue.600}",  "$description": "CHANGE: Your primary brand color" },
    "primary-foreground":   { "$type": "color", "$value": "{color.white}",     "$description": "CHANGE: Text on your primary color" },
    "destructive":          { "$type": "color", "$value": "{color.red.600}",   "$description": "Usually keep red for destructive" }
  },
  "fontFamily": {
    "sans": { "$type": "fontFamily", "$value": "Inter, system-ui, sans-serif", "$description": "CHANGE: Your brand font" }
  }
}
```

## 7. Generated Outputs

StyleDictionary produces these files. **NEVER hand-edit them.**

### 7.1 CSS Custom Properties (`packages/tokens/css/variables.css`)

```css
:root {
  /* Core */
  --ds0-color-gray-50: #F9FAFB;
  --ds0-color-gray-100: #F3F4F6;
  /* ... all core tokens ... */

  /* Semantic */
  --ds0-color-background: var(--ds0-color-white);
  --ds0-color-foreground: var(--ds0-color-gray-950);
  --ds0-color-primary: var(--ds0-color-blue-600);
  /* ... all semantic tokens ... */

  /* Spacing */
  --ds0-spacing-1: 4px;
  --ds0-spacing-2: 8px;
  /* ... */
}
```

### 7.2 Tailwind Preset (`packages/tokens/tailwind/preset.ts`)

```typescript
import type { Config } from 'tailwindcss';

const ds0Preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        background: 'var(--ds0-color-background)',
        foreground: 'var(--ds0-color-foreground)',
        primary: {
          DEFAULT: 'var(--ds0-color-primary)',
          foreground: 'var(--ds0-color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--ds0-color-secondary)',
          foreground: 'var(--ds0-color-secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--ds0-color-destructive)',
          foreground: 'var(--ds0-color-destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--ds0-color-muted)',
          foreground: 'var(--ds0-color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--ds0-color-accent)',
          foreground: 'var(--ds0-color-accent-foreground)',
        },
        card: {
          DEFAULT: 'var(--ds0-color-card)',
          foreground: 'var(--ds0-color-card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--ds0-color-popover)',
          foreground: 'var(--ds0-color-popover-foreground)',
        },
        border: 'var(--ds0-color-border)',
        input: 'var(--ds0-color-input)',
        ring: 'var(--ds0-color-ring)',
      },
      borderRadius: {
        sm: 'var(--ds0-radius-sm)',
        md: 'var(--ds0-radius-md)',
        lg: 'var(--ds0-radius-lg)',
        xl: 'var(--ds0-radius-xl)',
      },
      // ... spacing, typography, shadows, motion mapped similarly
    },
  },
};

export default ds0Preset;
```

## 8. Rules for AI

### 8.1 Adding a New Token

1. Add to the correct source file in `tokens/`
2. Follow the DTCG format exactly
3. Include `$description` — this is not optional
4. If semantic, reference a core token (never hardcode a value)
5. Run `pnpm build:tokens` to regenerate outputs
6. Verify no broken references
7. Commit both the source token AND the generated outputs

### 8.2 Referencing Tokens in Components

```
✅ bg-primary                          — Tailwind class using semantic token
✅ text-muted-foreground               — Tailwind class using semantic token
✅ var(--ds0-color-primary)            — CSS custom property in Web Components
✅ tokens.color.primary                — RN StyleSheet value

❌ bg-blue-600                         — raw palette color in a component
❌ #2563EB                             — hardcoded hex value
❌ var(--ds0-color-blue-600)           — core token in a component (use semantic)
```

### 8.3 When to Create a New Token vs. Use Existing

Create a new **core** token when:
- A new base color is needed in the palette
- The spacing scale needs extension

Create a new **semantic** token when:
- A new UI intent emerges (e.g., "info" state in addition to success/warning/destructive)
- A new component category needs its own semantic mapping

**NEVER** create:
- Component-specific tokens at the core/semantic level (e.g., `color.button-primary`)
- One-off values that don't fit the established scales
- Tokens that duplicate existing ones under a different name
