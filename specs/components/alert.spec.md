# Component Spec: Alert

## 1. Overview

**Name:** Alert
**Category:** Feedback
**Description:** A non-modal, inline message that communicates status, warnings, or errors in context.

## 2. Use Cases

### Use When
* Form validation feedback
* System status messages (maintenance, outages)
* Informational banners
* Success confirmations
* Warning notices

### Don't Use When
* Transient notifications → use Toast
* Modal confirmations → use Dialog
* Long-running progress → use Progress

## 3. Variants

| Variant | Intent | Example |
|---|---|---|
| `default` | Neutral information | <Alert>Content</Alert> |
| `info` | Informational message | <Alert variant="info">Info</Alert> |
| `success` | Positive outcome | <Alert variant="success">Success</Alert> |
| `warning` | Caution or attention required | <Alert variant="warning">Warning</Alert> |
| `destructive` | Error or destructive action | <Alert variant="destructive">Error</Alert> |

## 4. Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' | 'info' | 'success' | 'warning' | 'destructive'` | `'default'` | Visual severity |
| `isDismissible` | `boolean` | `false` | Show dismiss button |
| `onDismiss` | `() => void` | `undefined` | Callback on dismiss |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

## 5. Accessibility

**Role:** alert

### Requirements
* role="alert" for assertive announcement
* Dismiss button has aria-label
* Icon is aria-hidden

## 6. Related Components

| Component | Relationship |
|---|---|
| Toast | Transient popup notifications |
