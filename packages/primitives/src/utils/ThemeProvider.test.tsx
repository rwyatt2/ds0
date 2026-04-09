import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../src/utils/ThemeProvider';

function ThemeDisplay() {
    const { theme, resolvedTheme, setTheme } = useTheme();
    return (
        <div>
            <span data-testid="theme">{theme}</span>
            <span data-testid="resolved">{resolvedTheme}</span>
            <button data-testid="set-dark" onClick={() => setTheme('dark')}>Dark</button>
            <button data-testid="set-light" onClick={() => setTheme('light')}>Light</button>
            <button data-testid="set-system" onClick={() => setTheme('system')}>System</button>
        </div>
    );
}

describe('ThemeProvider', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.removeAttribute('data-theme');
    });

    it('defaults to system theme', () => {
        render(
            <ThemeProvider>
                <ThemeDisplay />
            </ThemeProvider>,
        );
        expect(screen.getByTestId('theme').textContent).toBe('system');
    });

    it('respects defaultTheme prop', async () => {
        render(
            <ThemeProvider defaultTheme="dark">
                <ThemeDisplay />
            </ThemeProvider>,
        );
        expect(screen.getByTestId('theme').textContent).toBe('dark');
        await waitFor(() => {
            expect(screen.getByTestId('resolved').textContent).toBe('dark');
        });
    });

    it('switches theme on setTheme', async () => {
        render(
            <ThemeProvider>
                <ThemeDisplay />
            </ThemeProvider>,
        );

        fireEvent.click(screen.getByTestId('set-dark'));
        await waitFor(() => {
            expect(screen.getByTestId('theme').textContent).toBe('dark');
            expect(screen.getByTestId('resolved').textContent).toBe('dark');
            expect(document.documentElement.classList.contains('dark')).toBe(true);
        });
    });

    it('persists to localStorage', () => {
        render(
            <ThemeProvider>
                <ThemeDisplay />
            </ThemeProvider>,
        );

        fireEvent.click(screen.getByTestId('set-dark'));
        expect(localStorage.getItem('ds0-theme')).toBe('dark');
    });

    it('applies class to document', async () => {
        render(
            <ThemeProvider defaultTheme="dark">
                <ThemeDisplay />
            </ThemeProvider>,
        );
        await waitFor(() => {
            expect(document.documentElement.classList.contains('dark')).toBe(true);
        });
    });

    it('applies data-theme attribute when configured', async () => {
        render(
            <ThemeProvider defaultTheme="dark" attribute="data-theme">
                <ThemeDisplay />
            </ThemeProvider>,
        );
        await waitFor(() => {
            expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        });
    });

    it('throws when useTheme is used outside provider', () => {
        expect(() => render(<ThemeDisplay />)).toThrow(
            'DS0: useTheme must be used within a <ThemeProvider>. Docs: https://ds0.dev/docs/guides/theming',
        );
    });
});
