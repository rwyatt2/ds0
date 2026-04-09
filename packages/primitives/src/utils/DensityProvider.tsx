'use client';

import React, { createContext, useContext } from 'react';

type Density = 'compact' | 'comfortable' | 'spacious';

interface DensityContextValue {
    density: Density;
}

const DensityContext = createContext<DensityContextValue>({ density: 'comfortable' });

interface DensityProviderProps {
    children: React.ReactNode;
    density: Density;
}

/**
 * DensityProvider sets a density context that components can read
 * to adjust their spacing, padding, and sizing.
 *
 * Components should use `useDensity()` hook to read the density
 * and apply appropriate spacing tokens.
 *
 * Density values:
 * - `compact`: Reduced padding, smaller gaps (data-heavy UIs, tables)
 * - `comfortable`: Default spacing (most interfaces)
 * - `spacious`: Increased padding, larger gaps (marketing, reading)
 */
function DensityProvider({ children, density }: DensityProviderProps) {
    const densityStyles: Record<string, string> = {
        '--ds0-density-px': `var(--ds0-density-${density}-padding-x)`,
        '--ds0-density-py': `var(--ds0-density-${density}-padding-y)`,
        '--ds0-density-gap': `var(--ds0-density-${density}-gap)`,
    };

    return (
        <DensityContext.Provider value={{ density }}>
            <div data-density={density} style={densityStyles as React.CSSProperties}>
                {children}
            </div>
        </DensityContext.Provider>
    );
}

function useDensity(): DensityContextValue {
    return useContext(DensityContext);
}

/** Returns spacing multiplier based on density */
function getDensityScale(density: Density): number {
    switch (density) {
        case 'compact': return 0.75;
        case 'comfortable': return 1;
        case 'spacious': return 1.25;
    }
}

export { DensityProvider, useDensity, getDensityScale };
export type { Density, DensityProviderProps, DensityContextValue };
