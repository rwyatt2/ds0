import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { AspectRatio } from './AspectRatio';

describe('AspectRatio (Native)', () => {
    it('renders children', () => {
        const { getByText } = render(
            <AspectRatio ratio={16 / 9}><Text>Content</Text></AspectRatio>,
        );
        expect(getByText('Content')).toBeTruthy();
    });

    it('renders with default ratio of 1', () => {
        const { root } = render(<AspectRatio><Text>Square</Text></AspectRatio>);
        expect(root).toBeTruthy();
    });

    it('accepts custom ratio', () => {
        const { root } = render(<AspectRatio ratio={4 / 3}><Text>4:3</Text></AspectRatio>);
        expect(root).toBeTruthy();
    });
});
