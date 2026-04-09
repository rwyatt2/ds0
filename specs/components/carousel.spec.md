# Component Spec: Carousel

## 1. Overview

**Name:** Carousel
**Category:** Data Display
**Description:** Displays a series of content panels (slides) that can be navigated via next/previous controls, indicators, swipe gestures, or auto-play.

## 2. Use Cases

### Use When
* Hero banner image rotation
* Product image galleries
* Testimonial displays
* Feature highlights or onboarding screens

### Don't Use When
* Showing all items at once is feasible → use Grid
* Tabbed content sections → use Tabs
* Infinite scrollable feed → use ScrollArea
* Single hero image → use Image directly

## 3. Variants

| Variant | Intent | Example Use |
|---|---|---|
| `default` | Standard carousel with arrows | Product galleries |
| `card` | Card-based slides with peek | Feature highlights |

## 4. Sizes

> Carousel is container-sized — it fills its parent. No explicit size variants.

## 5. States

| State | Visual Treatment | Behavior |
|---|---|---|
| Default | Shows current slide with controls | Navigation available |
| Hover | Controls become visible (if auto-hidden) | Pause auto-play |
| Dragging | Slide follows touch/mouse | Swipe gesture active |
| Auto-playing | Slides transition automatically | Timer-based navigation |
| Paused | Auto-play halted | Hover or focus pauses |

## 6. Anatomy

```
┌─ Carousel ──────────────────────────────────────┐
│                                                   │
│  ┌─ Prev ─┐  ┌─ CarouselContent ─────────┐  ┌─ Next ─┐  │
│  │   ←    │  │  ┌─ CarouselItem ────────┐ │  │   →    │  │
│  │        │  │  │                        │ │  │        │  │
│  │        │  │  │    Slide Content       │ │  │        │  │
│  │        │  │  │                        │ │  │        │  │
│  │        │  │  └────────────────────────┘ │  │        │  │
│  └────────┘  └─────────────────────────────┘  └────────┘  │
│                                                   │
│              ┌─ CarouselIndicators ──────────┐    │
│              │  ● ○ ○ ○ ○                    │    │
│              └──────────────────────────────┘    │
└───────────────────────────────────────────────────┘
```

| Part | Required? | Notes |
|---|---|---|
| Carousel (root) | Yes | Section with `aria-roledescription="carousel"` |
| CarouselContent | Yes | Scrollable slide container |
| CarouselItem | Yes | Individual slide |
| CarouselPrevious | No | Previous slide button |
| CarouselNext | No | Next slide button |
| CarouselIndicators | No | Dot indicators showing position |

## 7. Props API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | No | Scroll direction |
| `autoPlay` | `boolean` | `false` | No | Enable automatic slide transition |
| `autoPlayInterval` | `number` | `5000` | No | Milliseconds between auto-play transitions |
| `loop` | `boolean` | `false` | No | Loop back to start after last slide |
| `slidesToShow` | `number` | `1` | No | Number of visible slides at once |
| `variant` | `'default' \| 'card'` | `'default'` | No | Visual variant |
| `children` | `ReactNode` | — | Yes | CarouselItem children |
| `className` | `string` | — | No | Additional CSS classes |
| `ref` | `Ref<HTMLDivElement>` | — | No | Forwarded ref |

## 8. Accessibility

### ARIA Role
Uses `aria-roledescription="carousel"` on root, `role="group"` on slides.

### Keyboard Interactions

| Key | Action |
|---|---|
| `Tab` | Moves focus to carousel controls |
| `Arrow Left` | Previous slide (horizontal) |
| `Arrow Right` | Next slide (horizontal) |
| `Arrow Up` | Previous slide (vertical) |
| `Arrow Down` | Next slide (vertical) |
| `Enter` / `Space` | Activates focused control |

### Screen Reader Behavior
* Root announces as "carousel"
* Each slide announces "slide X of Y"
* Auto-play pauses when screen reader is active
* Navigation buttons announce their action

### ARIA Attributes
* `aria-roledescription="carousel"` on root
* `role="group"` and `aria-roledescription="slide"` on each slide
* `aria-label="Slide X of Y"` on each slide
* `aria-live="polite"` on slide container (off when auto-playing)

### WAI-ARIA Pattern
https://www.w3.org/WAI/ARIA/apg/patterns/carousel/

## 9. Composition Examples

### Basic Usage
```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem><img src="/hero1.jpg" alt="Hero 1" /></CarouselItem>
    <CarouselItem><img src="/hero2.jpg" alt="Hero 2" /></CarouselItem>
    <CarouselItem><img src="/hero3.jpg" alt="Hero 3" /></CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <CarouselIndicators />
</Carousel>
```

### Auto-playing with Loop
```tsx
<Carousel autoPlay autoPlayInterval={3000} loop>
  <CarouselContent>
    {slides.map((slide) => (
      <CarouselItem key={slide.id}>{slide.content}</CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
```

## 10. Decision Tree

```yaml
- condition: Displaying multiple items that should be viewed one at a time?
  yes:
    - condition: Items are sequential/temporal?
      yes: Use Carousel with auto-play
      no:
        - condition: User should compare items?
          yes: Use Grid or Tabs
          no: Use Carousel
  no:
    - condition: All items visible at once?
      yes: Use Grid
      no: Use ScrollArea
```

## 11. Related Components

| Component | Relationship |
|---|---|
| Tabs | For content sections (not sliding) |
| ScrollArea | For continuous scrollable content |
| Grid | For showing all items simultaneously |

## 12. Design Tokens Used

| Token | Usage |
|---|---|
| `color.primary` | Active indicator dot |
| `color.muted` | Inactive indicator dots |
| `color.background` | Control button background |
| `radius.full` | Indicator dot shape |
| `shadow.md` | Control button shadow |

## 13. Open Questions

* Should Carousel support drag/swipe gestures out of the box?
* Should auto-play respect `prefers-reduced-motion`?
