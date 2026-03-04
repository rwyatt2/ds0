import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button (Native)', () => {
    it('renders children text', () => {
        const { getByText } = render(<Button>Click me</Button>);
        expect(getByText('Click me')).toBeTruthy();
    });

    it('has accessibilityRole="button"', () => {
        const { getByRole } = render(<Button>Submit</Button>);
        expect(getByRole('button')).toBeTruthy();
    });

    it('has correct accessibilityState when disabled', () => {
        const { getByRole } = render(<Button isDisabled>Disabled</Button>);
        const btn = getByRole('button');
        expect(btn.props.accessibilityState).toEqual(
            expect.objectContaining({ disabled: true }),
        );
    });

    it('has correct accessibilityState when loading', () => {
        const { getByRole } = render(<Button isLoading>Loading</Button>);
        const btn = getByRole('button');
        expect(btn.props.accessibilityState).toEqual(
            expect.objectContaining({ busy: true }),
        );
    });

    it('calls onPress when pressed', () => {
        const onPress = vi.fn();
        const { getByText } = render(<Button onPress={onPress}>Press</Button>);
        fireEvent.press(getByText('Press'));
        expect(onPress).toHaveBeenCalledOnce();
    });

    it('does not call onPress when disabled', () => {
        const onPress = vi.fn();
        const { getByText } = render(<Button isDisabled onPress={onPress}>No</Button>);
        fireEvent.press(getByText('No'));
        expect(onPress).not.toHaveBeenCalled();
    });

    it('shows loading text', () => {
        const { getByText } = render(<Button isLoading loadingText="Saving…">Save</Button>);
        expect(getByText('Saving…')).toBeTruthy();
    });
});
