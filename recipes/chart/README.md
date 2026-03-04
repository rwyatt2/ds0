# Chart

A zero-dependency, SVG-based data visualization recipe for DS0.

## Chart Types

- **Line** — Time series, trends
- **Bar** — Categorical comparison (vertical + horizontal, stacked)
- **Area** — Volume over time (stacked supported)
- **Donut** — Part-to-whole with center stat
- **Scatter** — Correlation between variables
- **Sparkline** — Tiny inline trend (no axes)

## Usage

```tsx
import { Chart } from '@/recipes/chart';

<Chart
  type="line"
  series={[
    {
      name: 'Revenue',
      data: [
        { x: 'Jan', y: 4000 },
        { x: 'Feb', y: 5200 },
        { x: 'Mar', y: 4800 },
      ],
    },
  ]}
  title="Monthly Revenue"
  height={300}
/>
```

## Features

- Pure SVG rendering — no D3, Recharts, or Chart.js
- Hover tooltips with crosshair
- Animated entrance transitions
- Toggle series via legend
- Responsive resizing (ResizeObserver)
- Loading skeleton & empty state
- ARIA accessible (hidden data table for screen readers)
- Dark/light mode via CSS custom properties
