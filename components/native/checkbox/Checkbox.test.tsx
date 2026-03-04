import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Checkbox } from './Checkbox';

describe('Checkbox (Native)', () => {
    it('renders label', () => {
        const { getByText } = render(<Checkbox label="Accept terms" />);
        expect(getByText('Accept terms')).toBeTruthy();
    });

    it('renders description', () => {
        const { getByText } = render(<Checkbox label="Accept" description="Read the terms first" />);
        expect(getByText('Read the terms first')).toBeTruthy();
    });

    it('has accessibilityRole="checkbox"', () => {
        const { getByRole } = render(<Checkbox label="Check" />);
        expect(getByRole('checkbox')).toBeTruthy();
    });

    it('toggles checked state on press', () => {
        const onCheckedChange = vi.fn();
        const { getByRole } = render(<Checkbox label="Toggle" onCheckedChange={onCheckedChange} />);
        fireEvent.press(getByRole('checkbox'));
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('does not toggle when disabled', () => {
        const onCheckedChange = vi.fn();
        const { getByRole } = render(<Checkbox label="Locked" isDisabled onCheckedChange={onCheckedChange} />);
        fireEvent.press(getByRole('checkbox'));
        expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it('shows checkmark when checked', () => {
        const { getByText } = render(<Checkbox label="Checked" defaultChecked />);
        expect(getByText('✓')).toBeTruthy();
    });
});
