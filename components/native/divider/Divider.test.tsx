import React from 'react';
import { render } from '@testing-library/react-native';
import { Divider } from './Divider';

describe('Divider (Native)', () => {
    it('renders with default horizontal orientation', () => {
        const { root } = render(<Divider />);
        expect(root).toBeTruthy();
    });

    it('renders with vertical orientation', () => {
        const { root } = render(<Divider orientation="vertical" />);
        expect(root).toBeTruthy();
    });

    it('has accessibilityRole="none"', () => {
        const { root } = render(<Divider />);
        expect(root.props.accessibilityRole).toBe('none');
    });
});
