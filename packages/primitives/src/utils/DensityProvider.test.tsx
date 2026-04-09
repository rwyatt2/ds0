import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DensityProvider, useDensity, getDensityScale } from '../../src/utils/DensityProvider';

function DensityDisplay() {
    const { density } = useDensity();
    return <span data-testid="density">{density}</span>;
}

describe('DensityProvider', () => {
    it('provides compact density', () => {
        render(
            <DensityProvider density="compact">
                <DensityDisplay />
            </DensityProvider>,
        );
        expect(screen.getByTestId('density').textContent).toBe('compact');
    });

    it('provides comfortable density (default)', () => {
        render(
            <DensityProvider density="comfortable">
                <DensityDisplay />
            </DensityProvider>,
        );
        expect(screen.getByTestId('density').textContent).toBe('comfortable');
    });

    it('provides spacious density', () => {
        render(
            <DensityProvider density="spacious">
                <DensityDisplay />
            </DensityProvider>,
        );
        expect(screen.getByTestId('density').textContent).toBe('spacious');
    });

    it('sets data-density attribute on wrapper', () => {
        const { container } = render(
            <DensityProvider density="compact">
                <span>content</span>
            </DensityProvider>,
        );
        const wrapper = container.querySelector('[data-density="compact"]');
        expect(wrapper).toBeTruthy();
    });

    it('defaults to comfortable without provider', () => {
        render(<DensityDisplay />);
        expect(screen.getByTestId('density').textContent).toBe('comfortable');
    });
});

describe('getDensityScale', () => {
    it('returns 0.75 for compact', () => {
        expect(getDensityScale('compact')).toBe(0.75);
    });

    it('returns 1 for comfortable', () => {
        expect(getDensityScale('comfortable')).toBe(1);
    });

    it('returns 1.25 for spacious', () => {
        expect(getDensityScale('spacious')).toBe(1.25);
    });
});
