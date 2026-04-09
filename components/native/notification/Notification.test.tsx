import { render, screen } from '@testing-library/react-native';
import { Notification } from './Notification';

describe('Notification (Native)', () => {
    it('renders with default props', () => { render(<Notification>Test</Notification>); expect(screen.getByText('Test')).toBeTruthy(); });
    it('has correct accessibility role', () => { render(<Notification>Test</Notification>); expect(screen.getByRole('alert')).toBeTruthy(); });
    it('renders dismiss button when dismissible', () => { render(<Notification isDismissible>Test</Notification>); expect(screen.getByLabelText('Dismiss notification')).toBeTruthy(); });
});
