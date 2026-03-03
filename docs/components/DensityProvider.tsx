'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Density = 'normal' | 'dense';

interface DensityContextValue {
    density: Density;
    setDensity: (d: Density) => void;
    toggleDensity: () => void;
}

const DensityContext = createContext<DensityContextValue>({
    density: 'normal',
    setDensity: () => { },
    toggleDensity: () => { },
});

const STORAGE_KEY = 'ds0-density';

export function DensityProvider({ children }: { children: ReactNode }): React.ReactElement {
    const [density, setDensityState] = useState<Density>('normal');

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'dense' || stored === 'normal') {
            setDensityState(stored);
        }
    }, []);

    const setDensity = (d: Density) => {
        setDensityState(d);
        localStorage.setItem(STORAGE_KEY, d);
    };

    const toggleDensity = () => {
        setDensity(density === 'normal' ? 'dense' : 'normal');
    };

    return (
        <DensityContext.Provider value={{ density, setDensity, toggleDensity }}>
            {children}
        </DensityContext.Provider>
    );
}

export function useDensity(): DensityContextValue {
    return useContext(DensityContext);
}
