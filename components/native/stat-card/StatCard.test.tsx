import { render, screen } from '@testing-library/react-native';
import { StatCard } from './StatCard';
describe('StatCard (Native)', () => {
    it('renders label and value', () => { render(<StatCard label="Revenue" value="$12K" />); expect(screen.getByText('Revenue')).toBeTruthy(); expect(screen.getByText('$12K')).toBeTruthy(); });
});
