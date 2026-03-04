import React from 'react';
import { render } from '@testing-library/react-native';
import { Slider } from './Slider';

describe('Slider (Native)', () => {
    it('renders label', () => {
        const { getByText } = render(<Slider label="Volume" />);
        expect(getByText('Volume')).toBeTruthy();
    });

    it('has accessibilityRole="adjustable"', () => {
        const { getByRole } = render(<Slider label="Brightness" />);
        expect(getByRole('adjustable')).toBeTruthy();
    });

    it('shows value when showValue is true', () => {
        const { getByText } = render(<Slider label="Volume" defaultValue={50} showValue />);
        expect(getByText('50')).toBeTruthy();
    });

    it('renders with custom min/max', () => {
        const { root } = render(<Slider label="Range" min={10} max={200} defaultValue={100} />);
        expect(root).toBeTruthy();
    });
});
