import React from 'react';
import { render } from '@testing-library/react-native';
import { Skeleton } from './Skeleton';

describe('Skeleton (Native)', () => {
    it('renders with default dimensions', () => {
        const { root } = render(<Skeleton />);
        expect(root).toBeTruthy();
    });

    it('renders with custom dimensions', () => {
        const { root } = render(<Skeleton width={100} height={20} />);
        expect(root).toBeTruthy();
    });

    it('renders circular variant', () => {
        const { root } = render(<Skeleton variant="circular" width={40} height={40} />);
        expect(root).toBeTruthy();
    });

    it('renders rectangular variant', () => {
        const { root } = render(<Skeleton variant="rectangular" width={200} height={100} />);
        expect(root).toBeTruthy();
    });
});
