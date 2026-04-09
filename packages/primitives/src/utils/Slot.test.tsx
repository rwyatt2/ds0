import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Slot } from '../../src/utils/Slot';

describe('Slot', () => {
    it('renders child element with merged props', () => {
        render(
            <Slot data-testid="slot-child" className="parent-class">
                <button className="child-class">Click me</button>
            </Slot>,
        );
        const button = screen.getByTestId('slot-child');
        expect(button.tagName).toBe('BUTTON');
        expect(button.className).toContain('parent-class');
        expect(button.className).toContain('child-class');
        expect(button.textContent).toBe('Click me');
    });

    it('returns null when no valid child', () => {
        const { container } = render(<Slot>plain text</Slot>);
        expect(container.innerHTML).toBe('');
    });

    it('merges event handlers', () => {
        const parentHandler = vi.fn();
        const childHandler = vi.fn();

        render(
            <Slot onClick={parentHandler}>
                <button onClick={childHandler}>Click</button>
            </Slot>,
        );

        screen.getByText('Click').click();
        expect(childHandler).toHaveBeenCalledTimes(1);
        expect(parentHandler).toHaveBeenCalledTimes(1);
    });

    it('merges styles', () => {
        render(
            <Slot style={{ color: 'red' }}>
                <div data-testid="styled" style={{ fontSize: '14px' }}>
                    Styled
                </div>
            </Slot>,
        );
        const el = screen.getByTestId('styled');
        expect(el.style.color).toBe('red');
        expect(el.style.fontSize).toBe('14px');
    });
});
