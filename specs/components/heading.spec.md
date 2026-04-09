# Component Spec: Heading

## 1. Overview

**Name:** Heading
**Category:** Typography
**Description:** Renders semantic heading elements (h1–h6) with consistent styling and visual hierarchy.

## 2. Use Cases

### Use When
* Displaying page titles, section titles, or subsection titles
* Creating visual hierarchy in content
* Labeling major sections of a page or form

### Don't Use When
* Styling non-heading text to look like a heading → use Text with appropriate weight instead
* Labels for form fields → use Label instead
* Body text or paragraphs → use Text instead

## 3. Variants

| Variant | Intent | Example |
|---|---|---|
| `size` | — | — |

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'` | `'h2'` | The semantic heading level |
| `size` | `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'` | `auto (mapped from heading level)` | Override visual size (decoupled from semantic level) |
| `weight` | `'regular' | 'medium' | 'semibold' | 'bold'` | `'bold'` | Font weight |
| `tracking` | `'tighter' | 'tight' | 'normal'` | `'tight'` | Letter spacing |
| `children` | `ReactNode` | `—` | Heading text content (required) |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** heading (implicit via native h1–h6 elements)

### Requirements
* Always renders the correct semantic element (h1 through h6)
* Heading levels must not skip (h1 → h3) — this is the consumers responsibility

## 6. Related Components

| Component | Relationship |
|---|---|
| Text | For body text, paragraphs, and non-heading content |
| Label | For form input labels |
