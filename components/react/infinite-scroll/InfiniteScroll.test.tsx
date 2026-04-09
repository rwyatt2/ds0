import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { InfiniteScroll } from './InfiniteScroll';
expect.extend(toHaveNoViolations);
const mockObserve = vi.fn(); const mockDisconnect = vi.fn();
beforeEach(() => { vi.stubGlobal('IntersectionObserver', vi.fn(() => ({ observe: mockObserve, disconnect: mockDisconnect, unobserve: vi.fn() }))); });
describe('InfiniteScroll (Styled)', () => {
  it('renders', () => { render(<InfiniteScroll hasMore onLoadMore={vi.fn()}>Content</InfiniteScroll>); expect(screen.getByRole('feed')).toBeInTheDocument(); });
  it('a11y', async () => { const { container } = render(<InfiniteScroll hasMore onLoadMore={vi.fn()}>Content</InfiniteScroll>); expect(await axe(container)).toHaveNoViolations(); });
});
