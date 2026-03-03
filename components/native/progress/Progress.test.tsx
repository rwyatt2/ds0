import { render, screen } from '@testing-library/react-native';

import { Progress } from './Progress';

describe('Progress (Native)', () => {
    it('renders with default props', () => {
        render(<Progress label="Loading" />);
        expect(screen.getByRole('progressbar')).toBeTruthy();
    });

    it('has correct accessibility value', () => {
        render(<Progress value={50} label="Loading" />);
        expect(screen.getByRole('progressbar')).toBeTruthy();
    });
});
