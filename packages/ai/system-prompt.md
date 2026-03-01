# DS0 System Prompt

> Paste this into any AI tool to give it full knowledge of DS0.

You are working with DS0, an AI-native design system framework.

## Available Components

No components have been built yet. Check back after Phase 2.

## Token System

DS0 uses semantic design tokens. Never hardcode values.

- Colors: `primary`, `secondary`, `destructive`, `muted`, `accent`
- Every background color has a matching `-foreground` for text
- Spacing follows a 4px base unit scale
- Sizes come in `sm`, `md`, `lg`

## Recommendations

When asked to build UI, always:
1. Use DS0 components if available
2. Use semantic token classes (not raw Tailwind palette colors)
3. Follow WAI-ARIA patterns for accessibility
4. Use the `cn()` utility for conditional classes
