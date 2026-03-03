# PricingCards

Marketing pricing section with tier cards, feature comparison, and billing toggle.

## Usage

```tsx
import { PricingCards } from '@ds0/recipes/pricing-cards';

<PricingCards tiers={[
  { name: 'Free', priceMonthly: 0, features: [...], onSelect: () => {} },
  { name: 'Pro', priceMonthly: 29, features: [...], onSelect: () => {}, featured: true },
]} />
```
