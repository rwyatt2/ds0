import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Stack } from './Stack';

describe('Stack (Native)', () => {
    it('renders children', () => {
        const { getByText } = render(
            <Stack>
                <Text>One</Text>
                <Text>Two</Text>
            </Stack>,
        );
        expect(getByText('One')).toBeTruthy();
        expect(getByText('Two')).toBeTruthy();
    });

    it('renders with default vertical direction', () => {
        const { root } = render(<Stack><Text>Item</Text></Stack>);
        expect(root).toBeTruthy();
    });

    it('renders horizontal direction', () => {
        const { root } = render(<Stack direction="horizontal"><Text>A</Text><Text>B</Text></Stack>);
        expect(root).toBeTruthy();
    });

    it('accepts custom gap', () => {
        const { root } = render(<Stack gap={8}><Text>A</Text></Stack>);
        expect(root).toBeTruthy();
    });
});
