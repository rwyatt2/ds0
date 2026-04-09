import { render, screen } from '@testing-library/react';
import { Terminal } from './Terminal';
describe('Terminal (Styled)', () => {
    it('renders', () => { render(<Terminal lines={[{ type: 'output', content: 'hello' }]} readOnly />); expect(screen.getByText('hello')).toBeInTheDocument(); });
    it('renders title', () => { render(<Terminal lines={[]} readOnly title="Test" />); expect(screen.getByText('Test')).toBeInTheDocument(); });
});
