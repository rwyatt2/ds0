# Component Spec: Text

## 1. Overview

**Name:** Text
**Category:** Typography
**Description:** Renders styled text content with consistent typography for body text, descriptions, and captions.

## 2. Use Cases

### Use When
* Body text, paragraphs, and descriptions
* Helper text, captions, secondary information
* Inline text with specific styling

### Don't Use When
* Section titles or headings → use Heading instead
* Form field labels → use Label instead
* Code or monospace content → use Code instead

## 3. Variants

| Variant | Intent | Example |
|---|---|---|
| `size` | — | — |

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `'p' | 'span' | 'div' | 'em' | 'strong'` | `'p'` | HTML element to render |
| `size` | `'xs' | 'sm' | 'base' | 'lg' | 'xl'` | `'base'` | Font size |
| `weight` | `'regular' | 'medium' | 'semibold' | 'bold'` | `'regular'` | Font weight |
| `color` | `'default' | 'muted' | 'primary' | 'destructive' | 'success'` | `'default'` | Text color |
| `align` | `'left' | 'center' | 'right'` | `'left'` | Text alignment |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** implicit via semantic HTML elements

### Requirements
* Use semantic elements (p for paragraphs, em for emphasis, strong for importance)
* Color alone should not convey meaning

## 6. Related Components

| Component | Relationship |
|---|---|
| Heading | For section titles and headings |
| Label | For form input labels |
| Code | For code snippets and monospace content |
