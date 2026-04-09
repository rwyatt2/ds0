import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ConfettiPrimitive } from './Confetti';
expect.extend(toHaveNoViolations);

describe('ConfettiPrimitive', () => {
    it('renders nothing when not active', () => { const { container } = render(<ConfettiPrimitive />); expect(container.firstChild).toBeNull(); });
    it('renders when active', () => { const { container } = render(<ConfettiPrimitive isActive />); expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull(); });
    it('is aria-hidden', () => { const { container } = render(<ConfettiPrimitive isActive />); expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument(); });
    it('has no axe violations when active', async () => { const { container } = render(<ConfettiPrimitive isActive />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<ConfettiPrimitive ref={ref} isActive />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
