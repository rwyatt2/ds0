import React from 'react';
import { render } from '@testing-library/react-native';
import { Label } from './Label';

describe('Label (Native)', () => {
    it('renders children text', () => {
        const { getByText } = render(<Label>Email</Label>);
        expect(getByText('Email')).toBeTruthy();
    });

    it('shows required indicator', () => {
        const { getByText } = render(<Label required>Name</Label>);
        expect(getByText(' *')).toBeTruthy();
    });

    it('renders with sm size', () => {
        const { getByText } = render(<Label size="sm">Small</Label>);
        expect(getByText('Small')).toBeTruthy();
    });

    it('renders disabled state', () => {
        const { root } = render(<Label disabled>Disabled</Label>);
        expect(root).toBeTruthy();
    });
});
