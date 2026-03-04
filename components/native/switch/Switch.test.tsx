import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Switch } from './Switch';

describe('Switch (Native)', () => {
    it('renders with label', () => {
        const { getByText } = render(<Switch label="Dark mode" />);
        expect(getByText('Dark mode')).toBeTruthy();
    });

    it('toggles on press', () => {
        const onCheckedChange = vi.fn();
        const { getByRole } = render(<Switch label="Notifications" onCheckedChange={onCheckedChange} />);
        fireEvent.press(getByRole('switch'));
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('has accessibilityRole="switch"', () => {
        const { getByRole } = render(<Switch label="Toggle" />);
        expect(getByRole('switch')).toBeTruthy();
    });

    it('does not toggle when disabled', () => {
        const onCheckedChange = vi.fn();
        const { getByRole } = render(<Switch label="Locked" isDisabled onCheckedChange={onCheckedChange} />);
        fireEvent.press(getByRole('switch'));
        expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it('renders description', () => {
        const { getByText } = render(<Switch label="Emails" description="Receive email notifications" />);
        expect(getByText('Receive email notifications')).toBeTruthy();
    });
});
