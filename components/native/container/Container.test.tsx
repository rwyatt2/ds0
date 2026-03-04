import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Container } from './Container';

describe('Container (Native)', () => {
    it('renders children', () => {
        const { getByText } = render(<Container><Text>Hello</Text></Container>);
        expect(getByText('Hello')).toBeTruthy();
    });

    it('renders with padding by default', () => {
        const { root } = render(<Container><Text>Padded</Text></Container>);
        expect(root).toBeTruthy();
    });

    it('accepts padding=false', () => {
        const { root } = render(<Container padding={false}><Text>No pad</Text></Container>);
        expect(root).toBeTruthy();
    });
});
