import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Avatar } from './Avatar';

describe('Avatar (Native)', () => {
    it('renders with fallback initials when no src', () => {
        const { getByText } = render(<Avatar alt="John Doe" />);
        expect(getByText('JO')).toBeTruthy();
    });

    it('renders custom fallback text', () => {
        const { getByText } = render(<Avatar alt="John" fallback="JD" />);
        expect(getByText('JD')).toBeTruthy();
    });

    it('has accessibilityLabel', () => {
        const { getByLabelText } = render(<Avatar alt="User Photo" />);
        expect(getByLabelText('User Photo')).toBeTruthy();
    });

    it('renders with different sizes', () => {
        const { root } = render(<Avatar alt="Test" size="lg" />);
        expect(root).toBeTruthy();
    });
});
