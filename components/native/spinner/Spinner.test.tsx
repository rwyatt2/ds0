import React from 'react';
import { render } from '@testing-library/react-native';
import { Spinner } from './Spinner';

describe('Spinner (Native)', () => {
    it('renders with default props', () => {
        const { root } = render(<Spinner />);
        expect(root).toBeTruthy();
    });

    it('has accessibilityRole="progressbar"', () => {
        const { getByRole } = render(<Spinner />);
        expect(getByRole('progressbar')).toBeTruthy();
    });

    it('has default accessibilityLabel', () => {
        const { getByLabelText } = render(<Spinner />);
        expect(getByLabelText('Loading')).toBeTruthy();
    });

    it('has custom accessibilityLabel', () => {
        const { getByLabelText } = render(<Spinner label="Fetching data" />);
        expect(getByLabelText('Fetching data')).toBeTruthy();
    });
});
