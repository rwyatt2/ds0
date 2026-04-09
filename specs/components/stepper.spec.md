# Component Spec: Stepper

## 1. Overview

**Name:** Stepper
**Category:** Navigation
**Description:** Guides users through a multi-step process by displaying numbered steps with their completion status, supporting both horizontal and vertical layouts.

## 2. Use Cases

### Use When
* Multi-step wizards (checkout, onboarding, registration)
* Form flows broken into logical sections
* Progress indication through a sequential process
* Setup guides with ordered steps

### Don't Use When
* Navigating a page hierarchy → use Breadcrumb
* Tab-based content switching → use Tabs
* Non-sequential task list → use a checklist
* Simple progress indication → use Progress

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Standard numbered steps | Multi-step forms |
| `dot` | Minimal dot indicators | Compact wizard UIs |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | Step icon h-6 w-6, text-xs | Compact spaces, mobile |
| `md` | Step icon h-8 w-8, text-sm | Default, most contexts |
| `lg` | Step icon h-10 w-10, text-base | Prominent wizard headers |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Incomplete | Muted circle with step number | Not yet reached |
| Active | Primary-colored circle, bold label | Currently on this step |
| Completed | Checkmark icon, accent background | Step finished |
| Error | Destructive color circle with X | Step has validation errors |
| Disabled | Reduced opacity | Cannot navigate to step |

## 6. Anatomy

```
Horizontal:
┌─ Stepper ──────────────────────────────────────────────┐
│  ┌─Step─┐  ──Connector──  ┌─Step─┐  ──Connector──  ┌─Step─┐  │
│  │ (1)  │  ────────────   │ (2)  │  ────────────   │ (3)  │  │
│  │Info  │                 │Cart  │                 │Pay   │  │
│  │      │                 │      │                 │      │  │
│  └──────┘                 └──────┘                 └──────┘  │
└──────────────────────────────────────────────────────────┘

Vertical:
┌─ Stepper ──────────────┐
│  ┌─Step─────────────┐  │
│  │ (1) Personal Info │  │
│  │     Description   │  │
│  └──────────────────┘  │
│  │ (connector line)    │
│  ┌─Step─────────────┐  │
│  │ (2) Payment       │  │
│  └──────────────────┘  │
└────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Stepper (root) | Yes | Container with orientation |
| StepperItem | Yes | Individual step wrapper |
| StepperTrigger | No | Clickable step indicator (if navigable) |
| StepperIndicator | Yes | Number/icon circle |
| StepperTitle | Yes | Step label text |
| StepperDescription | No | Optional step description |
| StepperSeparator | Yes | Connector line between steps |
| StepperContent | No | Content panel for active step |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `activeStep` | `number` | `0` | Yes | Current active step (0-indexed) |
| `onStepChange` | `(step: number) => void` | — | No | Step change handler |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | No | Layout direction |
| `variant` | `'default' \| 'dot'` | `'default'` | No | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Step indicator size |
| `isLinear` | `boolean` | `true` | No | Must complete steps in order |
| `children` | `ReactNode` | — | Yes | StepperItem children |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLDivElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Uses `role="tablist"` for the step indicators.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus to step indicators |
| `Arrow Left/Up` | Focus previous step (if navigable) |
| `Arrow Right/Down` | Focus next step (if navigable) |
| `Enter` / `Space` | Activates focused step |
| `Home` | Focus first step |
| `End` | Focus last step |

### Screen Reader Behavior
* Announces "Step X of Y: [title]"
* Announces completion status ("completed", "current", "incomplete")
* Error steps announce "error"

### ARIA Attributes
* `role="tablist"` on step indicators container
* `role="tab"` on each step trigger
* `role="tabpanel"` on step content
* `aria-selected` on active step
* `aria-disabled` on non-navigable steps
* `aria-current="step"` on active step

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/

## 9. Composition Examples

### Basic Usage
```tsx
<Stepper activeStep={1} onStepChange={setStep}>
  <StepperItem>
    <StepperIndicator />
    <StepperTitle>Account</StepperTitle>
  </StepperItem>
  <StepperSeparator />
  <StepperItem>
    <StepperIndicator />
    <StepperTitle>Details</StepperTitle>
  </StepperItem>
  <StepperSeparator />
  <StepperItem>
    <StepperIndicator />
    <StepperTitle>Confirm</StepperTitle>
  </StepperItem>
</Stepper>
```

### Vertical with Content
```tsx
<Stepper orientation="vertical" activeStep={activeStep}>
  <StepperItem>
    <StepperIndicator />
    <StepperTitle>Personal Info</StepperTitle>
    <StepperDescription>Fill in your details</StepperDescription>
    <StepperContent>
      <Form>{/* Step 1 form fields */}</Form>
    </StepperContent>
  </StepperItem>
</Stepper>
```

## 10. Decision Tree

```yaml
- condition: Is the user completing ordered sequential tasks?
  yes:
    - condition: More than 2 steps?
      yes: Use Stepper
      no: Use simple buttons with Progress
  no:
    - condition: Navigating content sections?
      yes: Use Tabs
      no:
        - condition: Showing position in hierarchy?
          yes: Use Breadcrumb
          no: No stepper needed
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Tabs | For non-sequential content switching |
| Progress | For simple percentage-based progress |
| Breadcrumb | For hierarchical navigation |
| Form | Often contains forms within steps |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.primary` | Active step indicator |
| `color.primary-foreground` | Active step number/icon |
| `color.muted` | Incomplete step indicator |
| `color.muted-foreground` | Incomplete step text |
| `color.destructive` | Error step indicator |
| `border.default` | Connector line color |

## 13. Open Questions

* Should completed steps be clickable to go back?
* Should Stepper support async step validation before proceeding?
