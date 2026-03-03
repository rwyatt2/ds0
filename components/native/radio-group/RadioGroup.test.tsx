import { render, screen } from '@testing-library/react-native';

import { RadioGroup, RadioGroupItem } from './RadioGroup';

describe('RadioGroup (Native)', () => {
    it('renders with default props', () => {
        render(
            <RadioGroup label="Test">
                <RadioGroupItem value="a" label="A" />
            </RadioGroup>,
        );
        expect(screen.getByText('Test')).toBeTruthy();
        expect(screen.getByText('A')).toBeTruthy();
    });

    it('has correct accessibility role', () => {
        render(
            <RadioGroup label="Test">
                <RadioGroupItem value="a" label="A" />
            </RadioGroup>,
        );
        expect(screen.getByRole('radiogroup')).toBeTruthy();
    });
});
