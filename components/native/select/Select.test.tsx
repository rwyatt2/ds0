import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Select, SelectTrigger, SelectContent, SelectItem } from './Select';

describe('Select (Native)', () => {
    const renderSelect = (props: Record<string, unknown> = {}) =>
        render(
            <Select placeholder="Pick one" {...props}>
                <SelectTrigger />
                <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="cherry">Cherry</SelectItem>
                </SelectContent>
            </Select>,
        );

    it('renders trigger with placeholder text', () => {
        renderSelect();
        expect(screen.getByText('Pick one')).toBeTruthy();
    });

    it('does not show options by default', () => {
        renderSelect();
        expect(screen.queryByText('Apple')).toBeNull();
    });

    it('shows options when trigger is pressed', () => {
        renderSelect();
        fireEvent.press(screen.getByText('Pick one'));
        expect(screen.getByText('Apple')).toBeTruthy();
        expect(screen.getByText('Banana')).toBeTruthy();
        expect(screen.getByText('Cherry')).toBeTruthy();
    });

    it('selects an item and closes the menu', () => {
        renderSelect();
        fireEvent.press(screen.getByText('Pick one'));
        fireEvent.press(screen.getByText('Banana'));
        expect(screen.getByText('Banana')).toBeTruthy();
        expect(screen.queryByText('Apple')).toBeNull();
    });

    it('calls onValueChange when an item is selected', () => {
        const onValueChange = vi.fn();
        renderSelect({ onValueChange });
        fireEvent.press(screen.getByText('Pick one'));
        fireEvent.press(screen.getByText('Cherry'));
        expect(onValueChange).toHaveBeenCalledWith('cherry');
    });

    it('does not open when disabled', () => {
        renderSelect({ isDisabled: true });
        fireEvent.press(screen.getByText('Pick one'));
        expect(screen.queryByText('Apple')).toBeNull();
    });

    it('has correct accessibility attributes on trigger', () => {
        renderSelect();
        const trigger = screen.getByLabelText('Open select menu');
        expect(trigger).toBeTruthy();
    });

    it('shows checkmark on selected item', () => {
        renderSelect({ defaultValue: 'banana' });
        fireEvent.press(screen.getByText('▾'));
        expect(screen.getByText('✓')).toBeTruthy();
    });
});
