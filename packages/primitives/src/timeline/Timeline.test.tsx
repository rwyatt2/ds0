import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TimelinePrimitive } from './Timeline';
expect.extend(toHaveNoViolations);
describe('TimelinePrimitive', () => {
    it('renders children', () => { render(<TimelinePrimitive><li>Event 1</li></TimelinePrimitive>); expect(screen.getByText('Event 1')).toBeInTheDocument(); });
    it('has list role', () => { render(<TimelinePrimitive><li>E</li></TimelinePrimitive>); expect(screen.getByRole('list')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<TimelinePrimitive><li>E</li></TimelinePrimitive>); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<TimelinePrimitive ref={ref}><li>E</li></TimelinePrimitive>); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
