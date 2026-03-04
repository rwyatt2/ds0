import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Grid } from './Grid';

describe('Grid (Native)', () => {
    it('renders children', () => {
        const { getByText } = render(
            <Grid columns={2}>
                <Text>Cell 1</Text>
                <Text>Cell 2</Text>
            </Grid>,
        );
        expect(getByText('Cell 1')).toBeTruthy();
        expect(getByText('Cell 2')).toBeTruthy();
    });

    it('renders with default single column', () => {
        const { root } = render(<Grid><Text>Item</Text></Grid>);
        expect(root).toBeTruthy();
    });

    it('accepts custom gap', () => {
        const { root } = render(<Grid gap={8}><Text>Item</Text></Grid>);
        expect(root).toBeTruthy();
    });
});
