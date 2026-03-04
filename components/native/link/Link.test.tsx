import React from 'react';
import { render } from '@testing-library/react-native';
import { Link } from './Link';

describe('Link (Native)', () => {
    it('renders children text', () => {
        const { getByText } = render(<Link href="https://example.com">Visit</Link>);
        expect(getByText('Visit')).toBeTruthy();
    });

    it('has accessibilityRole="link"', () => {
        const { getByRole } = render(<Link href="https://example.com">Link</Link>);
        expect(getByRole('link')).toBeTruthy();
    });

    it('renders disabled state', () => {
        const { getByRole } = render(<Link href="https://example.com" isDisabled>Disabled</Link>);
        const link = getByRole('link');
        expect(link.props.accessibilityState).toEqual(
            expect.objectContaining({ disabled: true }),
        );
    });
});
