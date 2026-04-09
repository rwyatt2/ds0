import { render, screen } from '@testing-library/react-native';

import { StatusDot } from './StatusDot';

describe('StatusDot (Native)', () => {
    it('renders with default props', () => {
        render(<StatusDot label="Status" />);
        expect(screen.getByLabelText('Status')).toBeTruthy();
    });

    it('has correct accessibility label', () => {
        render(<StatusDot variant="online" label="Online" />);
        expect(screen.getByLabelText('Online')).toBeTruthy();
    });

    it('uses variant as fallback label', () => {
        render(<StatusDot variant="busy" />);
        expect(screen.getByLabelText('busy')).toBeTruthy();
    });
});
