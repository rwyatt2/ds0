import { render, screen } from '@testing-library/react-native';
import { Table } from './Table';

describe('Table (Native)', () => {
    it('renders', () => {
        render(<Table><></></Table>);
        expect(screen.root).toBeTruthy();
    });
});
