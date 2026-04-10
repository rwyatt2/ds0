import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { InfiniteScroll } from './InfiniteScroll';
expect.extend(toHaveNoViolations);
const mockObserve = vi.fn(); const mockDisconnect = vi.fn();
beforeEach(() => {
  const MockIO = vi.fn(function (this: Record<string, unknown>) { this.observe = mockObserve; this.disconnect = mockDisconnect; this.unobserve = vi.fn(); });
  vi.stubGlobal('IntersectionObserver', MockIO);
});
describe('InfiniteScroll (Styled)', () => {
  it('renders', () => { render(<InfiniteScroll hasMore onLoadMore={vi.fn()}>Content</InfiniteScroll>); expect(screen.getByRole('feed')).toBeInTheDocument(); });
  it('a11y', async () => { const { container } = render(<InfiniteScroll hasMore onLoadMore={vi.fn()}><article>Item 1</article></InfiniteScroll>); expect(await axe(container)).toHaveNoViolations(); });
});
