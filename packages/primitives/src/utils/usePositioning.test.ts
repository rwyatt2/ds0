import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePositioning } from '../../src/utils/usePositioning';

function createMockRef<T>(value: T | null = null) {
    return { current: value } as React.RefObject<T | null>;
}


describe('usePositioning', () => {
    beforeEach(() => {
        vi.stubGlobal('innerWidth', 1024);
        vi.stubGlobal('innerHeight', 768);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns default styles when not open', () => {
        const triggerRef = createMockRef<HTMLElement>();
        const contentRef = createMockRef<HTMLElement>();

        const { result } = renderHook(() =>
            usePositioning({ triggerRef, contentRef, isOpen: false }),
        );

        expect(result.current.styles.position).toBe('fixed');
        expect(result.current.actualSide).toBe('bottom');
    });

    it('returns default bottom side', () => {
        const triggerRef = createMockRef<HTMLElement>();
        const contentRef = createMockRef<HTMLElement>();

        const { result } = renderHook(() =>
            usePositioning({ triggerRef, contentRef, side: 'top', isOpen: false }),
        );

        expect(result.current.actualSide).toBe('top');
    });

    it('returns styles with fixed position and z-index', () => {
        const triggerRef = createMockRef<HTMLElement>();
        const contentRef = createMockRef<HTMLElement>();

        const { result } = renderHook(() =>
            usePositioning({ triggerRef, contentRef, isOpen: false }),
        );

        expect(result.current.styles).toMatchObject({
            position: 'fixed',
            zIndex: 50,
        });
    });

    it('accepts all side options', () => {
        const sides = ['top', 'right', 'bottom', 'left'] as const;
        const triggerRef = createMockRef<HTMLElement>();
        const contentRef = createMockRef<HTMLElement>();

        for (const side of sides) {
            const { result } = renderHook(() =>
                usePositioning({ triggerRef, contentRef, side, isOpen: false }),
            );
            expect(result.current.actualSide).toBe(side);
        }
    });
});
