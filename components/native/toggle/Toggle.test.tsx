import { render, screen } from '@testing-library/react-native';

import { Toggle } from './Toggle';

describe('Toggle (Native)', () => {
    it('renders with default props', () => {
        render(<Toggle>Bold</Toggle>);
        expect(screen.getByText('Bold')).toBeTruthy();
    });

    it('has correct accessibility role', () => {
        render(<Toggle>Bold</Toggle>);
        expect(screen.getByRole('button')).toBeTruthy();
    });

    it('handles disabled state', () => {
        render(<Toggle isDisabled>Bold</Toggle>);
        expect(screen.getByRole('button')).toBeDisabled();
    });
});
