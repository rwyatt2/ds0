import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TerminalPrimitive } from './Terminal';
expect.extend(toHaveNoViolations);
describe('TerminalPrimitive', () => {
    it('renders output', () => { render(<TerminalPrimitive lines={[{ type: 'output', content: 'hello' }]} readOnly />); expect(screen.getByText('hello')).toBeInTheDocument(); });
    it('has role="log"', () => { render(<TerminalPrimitive lines={[]} readOnly />); expect(screen.getByRole('log')).toBeInTheDocument(); });
    it('shows input when not readOnly', () => { render(<TerminalPrimitive lines={[]} />); expect(screen.getByLabelText('Terminal input')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<TerminalPrimitive lines={[]} readOnly />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<TerminalPrimitive ref={ref} lines={[]} readOnly />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
