// DS0 Primitives
// Headless, accessible UI components

// Utils
export { cn } from './utils/cn';
export { invariant } from './utils/invariant';
export { useControllable } from './utils/useControllable';
export { Portal } from './utils/Portal';
export type { PortalProps } from './utils/Portal';
export { useFocusTrap } from './utils/useFocusTrap';
export { useScrollLock } from './utils/useScrollLock';
export { useClickOutside } from './utils/useClickOutside';
export { useEscapeKey } from './utils/useEscapeKey';
export { usePositioning } from './utils/usePositioning';
export type { Side, Align, UsePositioningProps, UsePositioningReturn } from './utils/usePositioning';

// Theme & Density
export { ThemeProvider, useTheme } from './utils/ThemeProvider';
export type { Theme, ResolvedTheme, ThemeProviderProps, ThemeContextValue } from './utils/ThemeProvider';
export { DensityProvider, useDensity, getDensityScale } from './utils/DensityProvider';
export type { Density, DensityProviderProps, DensityContextValue } from './utils/DensityProvider';

// Composition
export { Slot } from './utils/Slot';
export type { SlotProps } from './utils/Slot';

// Feature Flags
export { FeatureFlagProvider, useFeatureFlag, Feature } from './utils/FeatureFlagProvider';
export type { FeatureFlags, FeatureFlagProviderProps, UseFeatureFlagReturn } from './utils/FeatureFlagProvider';

// Components
export * from './button';
export * from './heading';
export * from './text';
export * from './label';
export * from './code';
export * from './icon-button';
export * from './badge';
export * from './spinner';
export * from './skeleton';
export * from './stack';
export * from './grid';
export * from './container';
export * from './divider';

// Wave 2
export * from './text-field';
export * from './text-area';
export * from './checkbox';
export * from './switch';
export * from './slider';
export * from './link';
export * from './avatar';
export * from './aspect-ratio';

// Wave 3A
export * from './radio-group';
export * from './dialog';
export * from './drawer';
export * from './select';
export * from './popover';
export * from './tooltip';

// Wave 3B
export * from './tabs';
export * from './card';
export * from './accordion';
export * from './table';
export * from './alert';
export * from './toggle-group';

// Wave 4
export * from './toggle';
export * from './progress';
export * from './breadcrumb';
export * from './pagination';
export * from './toast';
export * from './form';

// Tier 2 — Advanced Components
export * from './data-table';
export * from './carousel';
export * from './stepper';
export * from './timeline';
export * from './tree-view';
export * from './color-picker';
export * from './date-picker';
export * from './file-upload';
export * from './rich-text';

// Gap components — Phase 1
export * from './input';
export * from './collapsible';
export * from './tag';
export * from './scroll-area';
export * from './dropdown-menu';
export * from './context-menu';
export * from './alert-dialog';
export * from './menubar';
export * from './navigation-menu';
export * from './combobox';

// Gap components — Phase 3
export * from './back-to-top';
export * from './empty-state';
export * from './sticky';

// Layout components — Phase 3 Batch 2
export * from './sidebar';
export * from './app-shell';
export * from './splitter';

// Advanced components — Phase 3 Batch 3
export * from './dock';
export * from './masonry-grid';
export * from './virtualized-list';
export * from './infinite-scroll';

// Feedback & Status — Phase 4
export * from './status-dot';
export * from './rating';
export * from './banner';
export * from './notification';
export * from './stat-card';
export * from './countdown-timer';
export * from './confetti';

// Data Viz & Utilities — Phase 5
export * from './code-block';
export * from './json-viewer';
export * from './diff-viewer';
export * from './sparkline';
export * from './calendar';
export * from './kanban-board';
export * from './terminal';
export * from './chart';
export * from './heat-map';
export * from './map';

// Commerce & Domain — Phase 6 (Recipes)
export * from './pricing-table';
export * from './cart';
export * from './product-card';
export * from './cookie-consent';
export * from './chat-bubble';
export * from './avatar-group';
export * from './tour';
export * from './command-palette';
export * from './changelog';
export * from './error-boundary';
