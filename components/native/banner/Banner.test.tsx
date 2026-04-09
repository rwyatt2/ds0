import { render, screen } from '@testing-library/react-native';

import { Banner } from './Banner';

describe('Banner (Native)', () => {
    it('renders with default props', () => {
        render(<Banner>Test message</Banner>);
        expect(screen.getByText('Test message')).toBeTruthy();
    });

    it('has correct accessibility role', () => {
        render(<Banner>Test</Banner>);
        expect(screen.getByRole('alert')).toBeTruthy();
    });

    it('renders dismiss button when dismissible', () => {
        render(<Banner isDismissible>Test</Banner>);
        expect(screen.getByLabelText('Dismiss banner')).toBeTruthy();
    });
});
