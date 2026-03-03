import { render, screen } from '@testing-library/react-native';
import { Alert } from './Alert';

describe('Alert (Native)', () => {
    it('renders', () => {
        render(<Alert><></></Alert>);
        expect(screen.root).toBeTruthy();
    });
});
