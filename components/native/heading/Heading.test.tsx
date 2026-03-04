import React from 'react';
import { render } from '@testing-library/react-native';
import { Heading } from './Heading';

describe('Heading (Native)', () => {
    it('renders children text', () => {
        const { getByText } = render(<Heading>Title</Heading>);
        expect(getByText('Title')).toBeTruthy();
    });

    it('has accessibilityRole="header"', () => {
        const { getByRole } = render(<Heading>Header</Heading>);
        expect(getByRole('header')).toBeTruthy();
    });

    it('renders with different heading levels', () => {
        const { getByText } = render(<Heading as="h1">Big Title</Heading>);
        expect(getByText('Big Title')).toBeTruthy();
    });

    it('accepts size override', () => {
        const { getByText } = render(<Heading size="xl">Custom</Heading>);
        expect(getByText('Custom')).toBeTruthy();
    });

    it('accepts weight prop', () => {
        const { getByText } = render(<Heading weight="semibold">Semi</Heading>);
        expect(getByText('Semi')).toBeTruthy();
    });
});
