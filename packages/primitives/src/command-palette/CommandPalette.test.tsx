import { render, screen } from '@testing-library/react';
import { CommandPalettePrimitive } from './CommandPalette';
describe('CommandPalettePrimitive', () => {
    const items = [{ id: '1', label: 'Save' }, { id: '2', label: 'Open' }];
    it('renders', () => { render(<CommandPalettePrimitive items={items} open />); expect(screen.getByRole('dialog')).toBeInTheDocument(); });
    it('hidden when closed', () => { const { container } = render(<CommandPalettePrimitive items={items} open={false} />); expect(container.innerHTML).toBe(''); });
});
