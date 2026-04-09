# Component Spec: InfiniteScroll

## 1. Overview
**Name:** InfiniteScroll  
**Category:** Layout  
**Description:** A scroll-triggered pagination component that loads more content as the user scrolls to the bottom, using IntersectionObserver for efficient detection.

## 2. Use Cases
### Use When
- Social feeds with paginated API data
- Search results that load on scroll
- Chat histories loading older messages
- Image galleries with lazy-loaded pages

### Don't Use When
- Small datasets that fit on one page → just render them
- When explicit pagination is preferred → use Pagination component

## 3. Props API
| Prop | Type | Default | Description |
|---|---|---|---|
| `hasMore` | `boolean` | — | Whether more data exists |
| `isLoading` | `boolean` | `false` | Whether data is currently loading |
| `onLoadMore` | `() => void` | — | Callback to load more data |
| `threshold` | `number` | `0.8` | IntersectionObserver threshold |
| `loader` | `ReactNode` | — | Loading indicator element |
| `endMessage` | `ReactNode` | — | Shown when no more data |
| `children` | `ReactNode` | — | Scrollable content |

## 4. Accessibility
- `aria-busy="true"` while loading
- `role="feed"` on container
- `aria-label` for the feed region
- Announces loading state to screen readers via `aria-live="polite"`
