import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from './Badge';

describe('Badge (Native)', () => {
    it('renders children text', () => {
        const { getByText } = render(<Badge>New</Badge>);
        expect(getByText('New')).toBeTruthy();
    });

    it('renders with default variant', () => {
        const { root } = render(<Badge>Label</Badge>);
        expect(root).toBeTruthy();
    });

    it('accepts variant prop', () => {
        const { getByText } = render(<Badge variant="destructive">Error</Badge>);
        expect(getByText('Error')).toBeTruthy();
    });
});
