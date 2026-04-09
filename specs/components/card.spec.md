# Component Spec: Card

## 1. Overview

**Name:** Card
**Category:** Data Display
**Description:** A contained surface for grouping related information and actions.

## 2. Use Cases

### Use When
* Displaying a summary of content (product, user, article)
* Grouping related information with a visual boundary
* Dashboard widgets and tiles

### Don't Use When
* Simple container without visual boundary → use div or Stack instead
* Interactive list items → use a list component instead
* Full-page content sections → use layout components instead

## 3. Variants

| Variant | Intent | Example |
|---|---|---|
| `default` | Standard card with border and subtle shadow | <Card>Content</Card> |
| `outline` | Border only, no background fill | <Card variant="outline">Content</Card> |
| `ghost` | No border or background — structural grouping only | <Card variant="ghost">Content</Card> |
| `elevated` | Raised surface with heavier shadow | <Card variant="elevated">Content</Card> |

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' | 'outline' | 'ghost' | 'elevated'` | `'default'` | Visual style of the card |
| `padding` | `'none' | 'sm' | 'md' | 'lg'` | `'none'` | Internal padding |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** No special role needed (structural container)

### Requirements
* Use article role if standalone content
* Use appropriate heading level for Card.Title
* If clickable, add role="link" or role="button" and keyboard support

## 6. Related Components

| Component | Relationship |
|---|---|
| Stack | When you just need spacing/layout without visual boundary |
| Container | For page-level content constraints |
