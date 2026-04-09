import { render, screen } from '@testing-library/react-native';
import { CountdownTimer } from './CountdownTimer';
describe('CountdownTimer (Native)', () => {
    it('renders', () => { render(<CountdownTimer targetDate={new Date(Date.now() + 60000)} />); expect(screen.getByRole('timer')).toBeTruthy(); });
});
