import { render, screen } from '@testing-library/react-native';
import { Accordion } from './Accordion';

describe('Accordion (Native)', () => {
    it('renders with default props', () => {
        render(<Accordion><></></Accordion>);
        expect(screen.root).toBeTruthy();
    });
});
