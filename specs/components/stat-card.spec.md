# Component Spec: StatCard

## 1. Overview
**Name:** StatCard  **Category:** Data Display
**Description:** A formatted numeric display with label, value, and optional trend indicator for dashboards and analytics views.

## 2. Use Cases
### Use When
* Displaying KPI metrics on dashboards
* Showing summary statistics (revenue, users, conversion)
* Displaying comparison metrics with trend direction
### Don't Use When
* You need a detailed chart → use Chart instead
* You need a full data table → use DataTable instead

## 3. Variants
| Variant | Intent | Example |
|---|---|---|
| `default` | Standard metric display | Revenue card |
| `outlined` | Lighter emphasis | Secondary metrics |

## 4. Sizes
| Size | Token | Use When |
|---|---|---|
| `sm` | p-3 | Dense dashboard grids |
| `md` | p-4 | Default |
| `lg` | p-6 | Featured KPIs |

## 5. States
| State | Visual | Behavior |
|---|---|---|
| Default | Static display | — |
| Loading | Skeleton placeholder | Shows loading state |
| Trend up | Green arrow up | Positive change |
| Trend down | Red arrow down | Negative change |

## 6. Anatomy
```
┌──────────────────────┐
│ Label                │
│ $12,345         ↑12% │
│ vs last period       │
└──────────────────────┘
```

## 7. Props API
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Metric label |
| `value` | `string \| number` | — | Yes | Metric value |
| `trend` | `number` | — | No | Percentage change |
| `trendLabel` | `string` | — | No | Trend description |
| `icon` | `ReactNode` | — | No | Leading icon |
| `variant` | `'default' \| 'outlined'` | `'default'` | No | Variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size |

## 8. Accessibility
### ARIA Role
Uses semantic HTML with `role="group"` and `aria-label`.
### Screen Reader Behavior
* Announces "{label}: {value}, {trend}% {up/down}"

## 9-13. (Standard sections)
