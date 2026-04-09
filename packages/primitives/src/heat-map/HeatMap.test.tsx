import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HeatMapPrimitive } from './HeatMap';
expect.extend(toHaveNoViolations);
describe('HeatMapPrimitive', () => {
    const data = [[1, 2], [3, 4]];
    it('renders with role="img"', () => { render(<HeatMapPrimitive data={data} />); expect(screen.getByRole('img')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<HeatMapPrimitive data={data} />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<HeatMapPrimitive ref={ref} data={data} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
