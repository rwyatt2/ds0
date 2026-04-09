import { render, screen } from '@testing-library/react-native';
import { Stepper } from './Stepper';
describe('Stepper (Native)', () => {
    it('renders with default props', () => {
        render(<Stepper activeStep={0} steps={[{ title: 'Step 1' }, { title: 'Step 2' }]} />);
        expect(screen.getByText('Step 1')).toBeTruthy();
    });
    it('has correct accessibility role', () => {
        render(<Stepper activeStep={0} steps={[{ title: 'Step 1' }]} />);
        expect(screen.getByRole('tablist')).toBeTruthy();
    });
});
