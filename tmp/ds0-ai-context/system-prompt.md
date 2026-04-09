# DS0 Design System — AI Context

You are building UI with DS0, an AI-native design system framework.
Always use DS0 components instead of raw HTML for any element DS0 covers.
Always use semantic token classes (bg-primary, text-foreground) — never raw Tailwind palette colors (bg-blue-500).
Always follow WAI-ARIA accessibility patterns.
Always use the cn() utility for conditional classes.

## Available Components

- **Accordion** (Data Display): A vertically stacked set of collapsible sections, each with a trigger that expands/collapses its content.
- **Alert** (Feedback): A non-modal, inline message that communicates status, warnings, or errors in context.
- **AspectRatio** (Layout): Constrains children to a specific width-to-height ratio.
- **Avatar** (Data Display): Displays a user's profile image, initials, or a fallback icon.
- **Badge** (Data Display): Small visual indicator for status, counts, or categories.
- **Breadcrumb** (Navigation): Shows the user's current location within a navigational hierarchy with links back to parent pages.
- **Button** (Actions): A clickable element that triggers an action or event, such as submitting a form, opening a dialog, or performing a destructive operation.
- **Card** (Data Display): A contained surface for grouping related information and actions.
- **Checkbox** (Data Input): A toggle control that allows the user to select or deselect an option.
- **Code** (Typography): Renders inline or block code with monospace styling.
- **Container** (Layout): Centers content with max-width and padding.
- **dialog** (Unknown): 
- **Divider** (Layout): Visual separator between content sections.
- **Drawer** (Overlay): A slide-out panel attached to an edge of the screen.
- **Form** (Data Input): Composition component that structures form fields, labels, descriptions, errors, and actions.
- **Grid** (Layout): CSS Grid-based layout.
- **Heading** (Typography): Renders semantic heading elements (h1–h6) with consistent styling and visual hierarchy.
- **IconButton** (Actions): A button containing only an icon, with an accessible label.
- **Label** (Typography): Accessible label for form inputs, renders a label element with consistent styling.
- **Link** (Navigation): An anchor element for navigating to a URL or page.
- **Pagination** (Navigation): Navigation controls for moving between pages of content.
- **Popover** (Overlay): A non-modal overlay anchored to a trigger, for contextual content.
- **Progress** (Feedback): A visual bar indicating the completion status of a task or process.
- **radio-group** (Unknown): 
- **Select** (Data Input): A dropdown menu for selecting a single option from a list.
- **Skeleton** (Feedback): Placeholder that mimics content shape while loading.
- **Slider** (Data Input): A draggable control for selecting a numeric value within a range.
- **Spinner** (Feedback): Animated loading indicator.
- **Stack** (Layout): Arranges children in a vertical or horizontal stack with consistent spacing.
- **Switch** (Data Input): A toggle control for settings that take immediate effect, like enabling/disabling a feature.
- **Table** (Data Display): Displays tabular data using native HTML table elements with consistent styling.
- **Tabs** (Navigation): Organizes content into multiple panels, with only one panel visible at a time, selected via a tab list.
- **Text** (Typography): Renders styled text content with consistent typography for body text, descriptions, and captions.
- **TextArea** (Data Input): A multi-line text input for collecting longer-form content like comments, descriptions, or messages.
- **TextField** (Data Input): A single-line text input for collecting short-form user data like names, emails, or search queries.
- **Toast** (Feedback): A temporary, non-blocking notification that appears at the edge of the screen and auto-dismisses.
- **Toggle** (Actions): A two-state button that can be on or off, like a standalone toggle in a toolbar.
- **ToggleGroup** (Actions): A set of two-state buttons where one or more can be toggled on, with shared visual styling.
- **Tooltip** (Overlay): A brief text label that appears on hover or focus.

## Available Recipes (Pre-built patterns)

- **AccountSettings** (Settings): Account management panel with password change, email change, and danger zone.
- **CommandPalette** (Utility): A keyboard-driven command search dialog (Cmd+K) for quick actions.
- **DashboardLayout** (Dashboard): A responsive dashboard shell with sidebar, header, and scrollable content area.
- **DashboardStats** (Dashboard): A responsive grid of metric cards with trend indicators and loading state.
- **DataTable** (Data): A full-featured data table with search, sorting, pagination, and row selection.
- **EmptyState** (Feedback): A placeholder shown when a content area has no data, with optional illustration, heading, description, and action.
- **ErrorPage** (Feedback): A full-page error display for 404, 500, and other error states with retry and navigation actions.
- **ForgotPasswordForm** (Authentication): A password reset request form with email input and success state.
- **LoginForm** (Authentication): A complete login form with email/password fields, remember me, social login, and error handling.
- **Navbar** (Navigation): A responsive top navigation bar with logo, nav links, and user menu.
- **NotificationSettings** (Settings): A notification preferences panel with categorized toggle switches.
- **PricingCards** (Marketing): Pricing tier cards with feature comparison, billing toggle, and featured tier highlight.
- **ProfileSettings** (Settings): A profile editing form with avatar upload, name, email, bio, and save/cancel actions.
- **SidebarNavigation** (Navigation): A vertical navigation sidebar with grouped links, collapsible sections, and active state indication.
- **SignupForm** (Authentication): A complete registration form with name, email, password, password confirmation, terms agreement, and optional social signup.

## Token System

- Colors: primary, secondary, destructive, success, warning, muted, accent
- Every background color has a matching -foreground token
- Spacing: 4px base unit scale (1=4px, 2=8px, 4=16px, etc.)
- Sizes: sm, md, lg
- Radius: sm, md, lg, xl, full

## Component Usage Rules

1. Import from the local components directory (e.g., @/components/ds0/button)
2. All interactive components support isDisabled, not HTML disabled
3. All components accept className for customization
4. Use cva variants, not inline conditional styles
5. Use forwardRef pattern — all components accept ref

## Decision Making

When choosing a component:
- Action trigger → Button (or IconButton for icon-only)
- Navigation → Link
- Text input → TextField (single line) or TextArea (multi-line)
- Selection from options → Select (4+ options) or RadioGroup (2-3 options)
- Boolean toggle → Switch (immediate effect) or Checkbox (form submission)
- Modal content → Dialog
- Contextual overlay → Popover (interactive) or Tooltip (text hint)
- Side panel → Drawer
- Status message → Alert (persistent) or Toast (temporary)
- Loading → Spinner (unknown duration), Skeleton (known shape), Progress (known %)
