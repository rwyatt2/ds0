import React, { useRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useFocusTrap } from '../../src/utils/useFocusTrap';

function TrapFixture({ isActive }: { isActive: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    useFocusTrap(ref, isActive);

    return (
        <div ref={ref} data-testid="trap">
            <button data-testid="first">First</button>
            <input data-testid="middle" />
            <button data-testid="last">Last</button>
        </div>
    );
}

describe('useFocusTrap', () => {
    it('focuses the first focusable element when active', async () => {
        render(<TrapFixture isActive={true} />);

        // useFocusTrap uses setTimeout(0) so we wait a tick
        await new Promise((r) => setTimeout(r, 10));

        const first = document.querySelector('[data-testid="first"]');
        expect(document.activeElement).toBe(first);
    });

    it('does not focus anything when inactive', async () => {
        render(<TrapFixture isActive={false} />);

        await new Promise((r) => setTimeout(r, 10));

        const first = document.querySelector('[data-testid="first"]');
        expect(document.activeElement).not.toBe(first);
    });

    it('wraps focus from last to first on Tab', async () => {
        render(<TrapFixture isActive={true} />);

        await new Promise((r) => setTimeout(r, 10));

        const last = document.querySelector('[data-testid="last"]') as HTMLElement;
        const first = document.querySelector('[data-testid="first"]') as HTMLElement;

        // Focus the last element
        last.focus();
        expect(document.activeElement).toBe(last);

        // Press Tab — should cycle to first
        const trap = document.querySelector('[data-testid="trap"]') as HTMLElement;
        fireEvent.keyDown(trap, { key: 'Tab', shiftKey: false });

        expect(document.activeElement).toBe(first);
    });

    it('wraps focus from first to last on Shift+Tab', async () => {
        render(<TrapFixture isActive={true} />);

        await new Promise((r) => setTimeout(r, 10));

        const first = document.querySelector('[data-testid="first"]') as HTMLElement;
        const last = document.querySelector('[data-testid="last"]') as HTMLElement;

        // Focus stays on first (set by the trap)
        expect(document.activeElement).toBe(first);

        // Press Shift+Tab — should cycle to last
        const trap = document.querySelector('[data-testid="trap"]') as HTMLElement;
        fireEvent.keyDown(trap, { key: 'Tab', shiftKey: true });

        expect(document.activeElement).toBe(last);
    });
});
