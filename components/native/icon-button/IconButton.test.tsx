import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { IconButton } from './IconButton';

describe('IconButton (Native)', () => {
    it('renders icon', () => {
        const { getByText } = render(
            <IconButton icon={<Text>★</Text>} accessibilityLabel="Favorite" />,
        );
        expect(getByText('★')).toBeTruthy();
    });

    it('has accessibilityRole="button"', () => {
        const { getByRole } = render(
            <IconButton icon={<Text>×</Text>} accessibilityLabel="Close" />,
        );
        expect(getByRole('button')).toBeTruthy();
    });

    it('has correct accessibilityLabel', () => {
        const { getByLabelText } = render(
            <IconButton icon={<Text>+</Text>} accessibilityLabel="Add item" />,
        );
        expect(getByLabelText('Add item')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const onPress = vi.fn();
        const { getByLabelText } = render(
            <IconButton icon={<Text>×</Text>} accessibilityLabel="Close" onPress={onPress} />,
        );
        fireEvent.press(getByLabelText('Close'));
        expect(onPress).toHaveBeenCalledOnce();
    });

    it('does not call onPress when disabled', () => {
        const onPress = vi.fn();
        const { getByLabelText } = render(
            <IconButton icon={<Text>×</Text>} accessibilityLabel="Close" isDisabled onPress={onPress} />,
        );
        fireEvent.press(getByLabelText('Close'));
        expect(onPress).not.toHaveBeenCalled();
    });
});
