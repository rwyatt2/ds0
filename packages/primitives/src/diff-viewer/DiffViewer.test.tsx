import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DiffViewerPrimitive } from './DiffViewer';
expect.extend(toHaveNoViolations);
describe('DiffViewerPrimitive', () => {
    it('renders diff', () => { render(<DiffViewerPrimitive oldValue="a\nb" newValue="a\nc" />); expect(screen.getByRole('region')).toBeInTheDocument(); });
    it('shows stats', () => { render(<DiffViewerPrimitive oldValue="old" newValue="new" />); expect(screen.getByText(/\+1/)).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<DiffViewerPrimitive oldValue="" newValue="" />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<DiffViewerPrimitive ref={ref} oldValue="" newValue="" />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
