import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MasonryGridPrimitive } from './MasonryGrid';

expect.extend(toHaveNoViolations);

describe('MasonryGridPrimitive', () => {
  it('renders children', () => { render(<MasonryGridPrimitive><div>A</div><div>B</div></MasonryGridPrimitive>); expect(screen.getByText('A')).toBeInTheDocument(); });
  it('has list role', () => { render(<MasonryGridPrimitive><div>A</div></MasonryGridPrimitive>); expect(screen.getByRole('list')).toBeInTheDocument(); });
  it('items have listitem role', () => { render(<MasonryGridPrimitive><div>A</div></MasonryGridPrimitive>); expect(screen.getAllByRole('listitem')).toHaveLength(1); });
  it('a11y', async () => { const { container } = render(<MasonryGridPrimitive><div>A</div></MasonryGridPrimitive>); expect(await axe(container)).toHaveNoViolations(); });
  it('ref', () => { const ref = vi.fn(); render(<MasonryGridPrimitive ref={ref}><div>A</div></MasonryGridPrimitive>); expect(ref).toHaveBeenCalled(); });
});
