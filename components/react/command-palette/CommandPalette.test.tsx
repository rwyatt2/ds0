import { render, screen } from '@testing-library/react';
import { CommandPalette } from './CommandPalette';
describe('CommandPalette (Styled)', () => { it('renders when open', () => { render(<CommandPalette items={[{ id: '1', label: 'Test' }]} open />); expect(screen.getByRole('dialog')).toBeInTheDocument(); }); });
