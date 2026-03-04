import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from './Text';

describe('Text (Native)', () => {
    it('renders children', () => {
        const { getByText } = render(<Text>Hello world</Text>);
        expect(getByText('Hello world')).toBeTruthy();
    });

    it('renders with different sizes', () => {
        const { getByText } = render(<Text size="lg">Large</Text>);
        expect(getByText('Large')).toBeTruthy();
    });

    it('renders with weight prop', () => {
        const { getByText } = render(<Text weight="bold">Bold text</Text>);
        expect(getByText('Bold text')).toBeTruthy();
    });

    it('renders with color prop', () => {
        const { getByText } = render(<Text color="muted">Muted</Text>);
        expect(getByText('Muted')).toBeTruthy();
    });

    it('renders with alignment', () => {
        const { getByText } = render(<Text align="center">Centered</Text>);
        expect(getByText('Centered')).toBeTruthy();
    });
});
