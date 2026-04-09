import { render, screen } from '@testing-library/react';
import { Tour } from './Tour';
describe('Tour (Styled)', () => { it('renders when active', () => { render(<Tour steps={[{ id: '1', title: 'Hi', content: 'X' }]} active />); expect(screen.getByText('Hi')).toBeInTheDocument(); }); });
