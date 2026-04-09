# Component Spec: TextField

## 1. Overview

**Name:** TextField
**Category:** Data Input
**Description:** A single-line text input for collecting short-form user data like names, emails, or search queries.

## 2. Use Cases

### Use When
* Collecting short text input (names, emails, URLs, phone numbers)
* Search fields
* Single-line form fields
* Any scenario requiring a labeled text input

### Don't Use When
* Multi-line text input → use TextArea instead
* Selecting from predefined options → use Select instead
* Boolean toggle → use Checkbox or Switch instead
* Rich text editing → use a third-party editor

## 3. Variants

| Variant | Intent | Example |
|---|---|---|
| `size` | — | — |

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `—` | Visible label text (required, renders Label component) |
| `type` | `'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'` | `'text'` | HTML input type |
| `placeholder` | `string` | `—` | Placeholder text |
| `value` | `string` | `—` | Controlled value |
| `isDisabled` | `boolean` | `false` | Disables the input |
| `isRequired` | `boolean` | `false` | Marks as required, shows indicator on label |
| `isReadOnly` | `boolean` | `false` | Makes input read-only |
| `isInvalid` | `boolean` | `false` | Shows error state |
| `helperText` | `string` | `—` | Hint text below input |
| `errorMessage` | `string` | `—` | Error text shown when isInvalid |
| `leftIcon` | `ReactNode` | `—` | Icon inside input, left side |
| `rightIcon` | `ReactNode` | `—` | Icon inside input, right side |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | Input size |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** textbox (implicit via native <input> element)

### Requirements
* Label connected via htmlFor/id
* aria-describedby points to helper text or error message
* aria-invalid set when isInvalid
* aria-required set when isRequired
* aria-disabled set when isDisabled (not HTML disabled)

## 6. Related Components

| Component | Relationship |
|---|---|
| TextArea | Multi-line variant of text input |
| Select | When input choices are predefined |
| Label | Used internally for the input label |
| Form | Parent container for groups of inputs |
