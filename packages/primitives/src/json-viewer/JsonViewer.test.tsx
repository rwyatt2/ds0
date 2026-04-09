import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { JsonViewerPrimitive } from './JsonViewer';
expect.extend(toHaveNoViolations);

describe('JsonViewerPrimitive', () => {
    const data = { name: 'Test', count: 42, nested: { a: 1, b: [1, 2, 3] } };
    it('renders with role="tree"', () => { render(<JsonViewerPrimitive data={data} />); expect(screen.getByRole('tree')).toBeInTheDocument(); });
    it('renders string values', () => { render(<JsonViewerPrimitive data={data} defaultExpandDepth={3} />); expect(screen.getByText(/"Test"/)).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<JsonViewerPrimitive data={data} />); expect(await axe(container)).toHaveNoViolations(); });
    it('forwards ref', () => { const ref = vi.fn(); render(<JsonViewerPrimitive ref={ref} data={{}} />); expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement)); });
});
