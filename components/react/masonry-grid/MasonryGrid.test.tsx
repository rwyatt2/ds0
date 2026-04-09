import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MasonryGrid } from './MasonryGrid';
expect.extend(toHaveNoViolations);
describe('MasonryGrid (Styled)', () => {
  it('renders', () => { render(<MasonryGrid><div>A</div></MasonryGrid>); expect(screen.getByRole('list')).toBeInTheDocument(); });
  it('a11y', async () => { const { container } = render(<MasonryGrid><div>A</div></MasonryGrid>); expect(await axe(container)).toHaveNoViolations(); });
});
