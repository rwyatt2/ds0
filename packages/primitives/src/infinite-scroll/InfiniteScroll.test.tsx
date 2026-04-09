import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { InfiniteScrollPrimitive } from './InfiniteScroll';

expect.extend(toHaveNoViolations);
const mockObserve = vi.fn(); const mockDisconnect = vi.fn();
beforeEach(() => { vi.stubGlobal('IntersectionObserver', vi.fn(() => ({ observe: mockObserve, disconnect: mockDisconnect, unobserve: vi.fn() }))); });

describe('InfiniteScrollPrimitive', () => {
  it('renders children', () => { render(<InfiniteScrollPrimitive hasMore onLoadMore={vi.fn()}>Content</InfiniteScrollPrimitive>); expect(screen.getByText('Content')).toBeInTheDocument(); });
  it('has feed role', () => { render(<InfiniteScrollPrimitive hasMore onLoadMore={vi.fn()}>Content</InfiniteScrollPrimitive>); expect(screen.getByRole('feed')).toBeInTheDocument(); });
  it('shows loader', () => { render(<InfiniteScrollPrimitive hasMore isLoading onLoadMore={vi.fn()} loader={<span>Loading...</span>}>Content</InfiniteScrollPrimitive>); expect(screen.getByText('Loading...')).toBeInTheDocument(); });
  it('shows end message', () => { render(<InfiniteScrollPrimitive hasMore={false} onLoadMore={vi.fn()} endMessage={<span>No more</span>}>Content</InfiniteScrollPrimitive>); expect(screen.getByText('No more')).toBeInTheDocument(); });
  it('a11y', async () => { const { container } = render(<InfiniteScrollPrimitive hasMore onLoadMore={vi.fn()}>Content</InfiniteScrollPrimitive>); expect(await axe(container)).toHaveNoViolations(); });
});
