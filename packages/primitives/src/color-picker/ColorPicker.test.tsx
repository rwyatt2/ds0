import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ColorPickerPrimitive } from './ColorPicker';
expect.extend(toHaveNoViolations);
describe('ColorPickerPrimitive', () => {
    it('renders trigger', () => { render(<ColorPickerPrimitive />); expect(screen.getByRole('button')).toBeInTheDocument(); });
    it('displays current color', () => { render(<ColorPickerPrimitive value="#FF0000" />); expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#FF0000' }); });
    it('opens on click', async () => { const user = userEvent.setup(); render(<ColorPickerPrimitive><div>Picker open</div></ColorPickerPrimitive>); await user.click(screen.getByRole('button')); expect(screen.getByText('Picker open')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<ColorPickerPrimitive />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<ColorPickerPrimitive ref={ref} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
