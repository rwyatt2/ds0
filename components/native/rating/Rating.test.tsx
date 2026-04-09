import { render, screen } from '@testing-library/react-native';

import { Rating } from './Rating';

describe('Rating (Native)', () => {
    it('renders with default props', () => {
        render(<Rating />);
        expect(screen.getByRole('radiogroup')).toBeTruthy();
    });

    it('renders correct number of stars', () => {
        render(<Rating maxValue={5} />);
        expect(screen.getAllByRole('radio')).toHaveLength(5);
    });

    it('handles disabled state', () => {
        render(<Rating isDisabled />);
        const stars = screen.getAllByRole('radio');
        expect(stars[0].props.accessibilityState.disabled).toBe(true);
    });
});
