import React from 'react';
import { render } from '@testing-library/react-native';
import { Code } from './Code';

describe('Code (Native)', () => {
    it('renders children text', () => {
        const { getByText } = render(<Code>const x = 1;</Code>);
        expect(getByText('const x = 1;')).toBeTruthy();
    });

    it('renders inline variant by default', () => {
        const { root } = render(<Code>code</Code>);
        expect(root).toBeTruthy();
    });

    it('renders block variant', () => {
        const { getByText } = render(<Code variant="block">block code</Code>);
        expect(getByText('block code')).toBeTruthy();
    });
});
