import { render, screen } from '@testing-library/react-native';
import { ToggleGroup } from './ToggleGroup';

describe('ToggleGroup (Native)', () => {
    it('renders', () => {
        render(<ToggleGroup><></></ToggleGroup>);
        expect(screen.root).toBeTruthy();
    });
});
