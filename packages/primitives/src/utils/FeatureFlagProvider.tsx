import React, { createContext, useContext, useMemo } from 'react';

/**
 * Feature flag map type.
 */
type FeatureFlags = Record<string, boolean>;

/**
 * Props for the FeatureFlagProvider.
 */
interface FeatureFlagProviderProps {
    /** Map of feature flag names to their enabled state */
    flags: FeatureFlags;
    /** Child components */
    children: React.ReactNode;
}

/**
 * Return value of the useFeatureFlag hook.
 */
interface UseFeatureFlagReturn {
    /** Whether the flag is enabled */
    enabled: boolean;
}

const FeatureFlagContext = createContext<FeatureFlags>({});

/**
 * Provides feature flags to the component tree.
 * Use for progressive rollout of new components or behaviors.
 *
 * @example
 * ```tsx
 * <FeatureFlagProvider flags={{ newSlider: true, experimentalTable: false }}>
 *   <App />
 * </FeatureFlagProvider>
 * ```
 */
export function FeatureFlagProvider({ flags, children }: FeatureFlagProviderProps): React.JSX.Element {
    const value = useMemo(() => flags, [flags]);
    return (
        <FeatureFlagContext.Provider value={value}>
            {children}
        </FeatureFlagContext.Provider>
    );
}

/**
 * Hook to check if a feature flag is enabled.
 *
 * @param flagName - The name of the feature flag to check
 * @returns Object with `enabled` boolean
 *
 * @example
 * ```tsx
 * const { enabled } = useFeatureFlag('newSlider');
 * return enabled ? <NewSlider /> : <OldSlider />;
 * ```
 */
export function useFeatureFlag(flagName: string): UseFeatureFlagReturn {
    const flags = useContext(FeatureFlagContext);
    return { enabled: Boolean(flags[flagName]) };
}

/**
 * Component that conditionally renders children based on a feature flag.
 *
 * @example
 * ```tsx
 * <Feature flag="experimentalTable" fallback={<OldTable />}>
 *   <NewTable />
 * </Feature>
 * ```
 */
export function Feature({
    flag,
    children,
    fallback = null,
}: {
    flag: string;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}): React.JSX.Element {
    const { enabled } = useFeatureFlag(flag);
    return <>{enabled ? children : fallback}</>;
}

export type { FeatureFlags, FeatureFlagProviderProps, UseFeatureFlagReturn };
