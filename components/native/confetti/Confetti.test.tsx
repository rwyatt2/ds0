import { render } from '@testing-library/react-native';
import { Confetti } from './Confetti';
describe('Confetti (Native)', () => {
    it('renders nothing when not active', () => { const { toJSON } = render(<Confetti />); expect(toJSON()).toBeNull(); });
});
