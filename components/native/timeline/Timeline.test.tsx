import { render, screen } from '@testing-library/react-native';
import { Timeline } from './Timeline';
describe('Timeline (Native)', () => { it('renders', () => { render(<Timeline items={[{ title: 'Event 1' }]} />); expect(screen.getByText('Event 1')).toBeTruthy(); }); });
