import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MapPrimitive } from './Map';
expect.extend(toHaveNoViolations);
describe('MapPrimitive', () => {
    it('renders with role="img"', () => { render(<MapPrimitive />); expect(screen.getByRole('img')).toBeInTheDocument(); });
    it('has accessible label', () => { render(<MapPrimitive center={{ lat: 40.71, lng: -74 }} />); expect(screen.getByRole('img')).toHaveAttribute('aria-label', expect.stringMatching(/Map centered/)); });
    it('has no axe violations', async () => { const { container } = render(<MapPrimitive />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<MapPrimitive ref={ref} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
