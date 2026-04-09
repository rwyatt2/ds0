'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'ds0-theme';

function getSystemTheme(): ResolvedTheme {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(theme: Theme): ResolvedTheme {
    return theme === 'system' ? getSystemTheme() : theme;
}

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
    attribute?: 'class' | 'data-theme';
}

function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = STORAGE_KEY,
    attribute = 'class',
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(defaultTheme));

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(storageKey) as Theme | null;
            if (stored && ['light', 'dark', 'system'].includes(stored)) {
                setThemeState(stored);
            }
        } catch {
            // localStorage unavailable
        }
    }, [storageKey]);

    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
        try {
            localStorage.setItem(storageKey, newTheme);
        } catch {
            // localStorage unavailable
        }
    }, [storageKey]);

    // Apply theme to document
    useEffect(() => {
        const resolved = resolveTheme(theme);
        setResolvedTheme(resolved);

        const root = document.documentElement;
        if (attribute === 'class') {
            root.classList.remove('light', 'dark');
            root.classList.add(resolved);
        } else {
            root.setAttribute('data-theme', resolved);
        }
    }, [theme, attribute]);

    // Listen for system theme changes
    useEffect(() => {
        if (theme !== 'system') return;
        if (typeof window.matchMedia !== 'function') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => setResolvedTheme(getSystemTheme());

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('DS0: useTheme must be used within a <ThemeProvider>. Docs: https://ds0.dev/docs/guides/theming');
    }
    return context;
}

export { ThemeProvider, useTheme };
export type { Theme, ResolvedTheme, ThemeProviderProps, ThemeContextValue };
