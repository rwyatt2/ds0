# Component Spec: DatePicker

## 1. Overview

**Name:** DatePicker
**Category:** Data Input
**Description:** A date selection component with a calendar grid popover, month/year navigation, and text input for manual date entry.

## 2. Use Cases

### Use When
* Selecting a specific date (booking, scheduling)
* Date of birth entry
* Date range filtering (with DateRangePicker variant)
* Any form field requiring a date value

### Don't Use When
* Selecting date and time together → use DateTimePicker
* Selecting only month/year → use MonthPicker
* Continuous time range → use a timeline or slider

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Single date selection | Booking dates, DOB |
| `range` | Start and end date selection | Date range filters, hotel booking |

## 4. Sizes

| Size | Token | Use When |
|---|---|---|
| `sm` | h-8 text-xs | Dense forms, filters |
| `md` | h-10 text-sm | Default, most forms |
| `lg` | h-12 text-base | Prominent date fields |

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Input with calendar icon | Click to open calendar |
| Open | Calendar popover visible | Date selection available |
| Hover | Date cell highlight | Visual feedback |
| Focus | Focus ring on input or date cell | Keyboard navigation |
| Selected | Primary-colored date cell | Date value set |
| Today | Outlined/dotted date cell | Visual anchor |
| Disabled | Reduced opacity | No interaction, `aria-disabled` |
| Error | Destructive border on input | Invalid date entered |
| Range (start/end) | Range start/end highlighted | Range selection mode |
| Range (between) | Muted background fill | Days between start and end |

## 6. Anatomy

```
┌─ DatePicker ─────────────────────────────────────┐
│  ┌─ Input ──────────────────────────────────┐    │
│  │  03/25/2026                    📅         │    │
│  └──────────────────────────────────────────┘    │
│                                                   │
│  ┌─ Calendar Popover ──────────────────────────┐ │
│  │  ┌─ Header ───────────────────────────────┐ │ │
│  │  │  ← March 2026 →                        │ │ │
│  │  └────────────────────────────────────────┘ │ │
│  │  ┌─ Grid ─────────────────────────────────┐ │ │
│  │  │  Su  Mo  Tu  We  Th  Fr  Sa            │ │ │
│  │  │   1   2   3   4   5   6   7            │ │ │
│  │  │   8   9  10  11  12  13  14            │ │ │
│  │  │  15  16  17  18  19  20  21            │ │ │
│  │  │  22  23  24 [25] 26  27  28            │ │ │
│  │  │  29  30  31                             │ │ │
│  │  └────────────────────────────────────────┘ │ │
│  │  ┌─ Footer ──────────────────────────────┐ │ │
│  │  │  [Today] [Clear]                       │ │ │
│  │  └────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| DatePicker (root) | Yes | Context provider |
| DatePickerInput | Yes | Text input with date format |
| DatePickerTrigger | Yes | Calendar icon button |
| DatePickerContent | Yes | Calendar popover |
| DatePickerHeader | Yes | Month/year navigation |
| DatePickerGrid | Yes | Calendar grid with dates |
| DatePickerCell | Yes | Individual date cell |
| DatePickerFooter | No | Today/Clear quick actions |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `Date \| null` | — | No | Controlled selected date |
| `defaultValue` | `Date` | — | No | Initial date value |
| `onChange` | `(date: Date \| null) => void` | — | No | Date change handler |
| `min` | `Date` | — | No | Minimum selectable date |
| `max` | `Date` | — | No | Maximum selectable date |
| `disabledDates` | `Date[] \| (date: Date) => boolean` | — | No | Specific disabled dates |
| `locale` | `string` | `'en-US'` | No | Locale for formatting |
| `format` | `string` | `'MM/dd/yyyy'` | No | Display format string |
| `placeholder` | `string` | `'Select date'` | No | Input placeholder |
| `variant` | `'default' \| 'range'` | `'default'` | No | Single or range mode |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Input size |
| `isDisabled` | `boolean` | `false` | No | Disable the picker |
| `isRequired` | `boolean` | `false` | No | Mark as required |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLDivElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Calendar grid uses `role="grid"` with `role="gridcell"` for dates.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Enter` / `Space` | Select focused date, open/close popover |
| `Arrow Left` | Previous day |
| `Arrow Right` | Next day |
| `Arrow Up` | Same day previous week |
| `Arrow Down` | Same day next week |
| `Page Up` | Previous month |
| `Page Down` | Next month |
| `Shift+Page Up` | Previous year |
| `Shift+Page Down` | Next year |
| `Home` | First day of month |
| `End` | Last day of month |
| `Escape` | Close calendar |

### Screen Reader Behavior
* Input announces selected date value
* Calendar grid announces "March 2026" etc.
* Date cells announce day, selected state, today indicator
* Disabled dates announced as "not available"

### ARIA Attributes
* `role="grid"` on calendar
* `role="gridcell"` on each date
* `aria-selected` on selected date
* `aria-disabled` on unavailable dates
* `aria-current="date"` on today
* `aria-label` with full date on each cell
* `aria-live="polite"` on month/year display

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/

## 9. Composition Examples

### Basic Usage
```tsx
<DatePicker value={date} onChange={setDate} />
```

### With Min/Max Range
```tsx
<DatePicker
  value={date}
  onChange={setDate}
  min={new Date('2026-01-01')}
  max={new Date('2026-12-31')}
/>
```

### In a Form
```tsx
<Form onSubmit={handleSubmit}>
  <FormField>
    <FormLabel htmlFor="dob">Date of Birth</FormLabel>
    <FormControl>
      <DatePicker
        id="dob"
        value={dob}
        onChange={setDob}
        max={new Date()}
      />
    </FormControl>
  </FormField>
</Form>
```

## 10. Decision Tree

```yaml
- condition: Does the user need to select a date?
  yes:
    - condition: Single date or date range?
      yes (single): Use DatePicker
      yes (range): Use DatePicker variant="range"
  no:
    - condition: Selecting time only?
      yes: Use TimePicker
      no: No date component needed
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Input | Text input for manual date entry |
| Popover | Calendar popover container |
| Button | Month navigation buttons |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.primary` | Selected date background |
| `color.primary-foreground` | Selected date text |
| `color.accent` | Today indicator |
| `color.muted` | Hover date background |
| `radius.md` | Calendar corners |
| `shadow.lg` | Calendar popover shadow |

## 13. Open Questions

* Should DatePicker include time selection (DateTimePicker)?
* Should month/year have dropdown selection for quick navigation?
