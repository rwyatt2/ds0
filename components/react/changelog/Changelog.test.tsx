import { render, screen } from '@testing-library/react';
import { Changelog } from './Changelog';
describe('Changelog (Styled)', () => { it('renders', () => { render(<Changelog entries={[{ id: '1', version: '1.0', date: '2024', title: 'Init', type: 'feature' }]} />); expect(screen.getByRole('feed')).toBeInTheDocument(); }); });
