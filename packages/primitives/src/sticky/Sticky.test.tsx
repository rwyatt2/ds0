import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { StickyPrimitive } from './Sticky';

expect.extend(toHaveNoViolations);

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  const MockIntersectionObserver = vi.fn(function (this: Record<string, unknown>) {
    this.observe = mockObserve;
    this.disconnect = mockDisconnect;
    this.unobserve = vi.fn();
  });
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  mockObserve.mockClear();
  mockDisconnect.mockClear();
});

describe('StickyPrimitive', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<StickyPrimitive>Sticky Content</StickyPrimitive>);
      expect(screen.getByText('Sticky Content')).toBeInTheDocument();
    });

    it('renders with custom element', () => {
      render(<StickyPrimitive as="header">Header</StickyPrimitive>);
      expect(screen.getByText('Header').tagName).toBe('HEADER');
    });

    it('applies position sticky style', () => {
      render(<StickyPrimitive>Content</StickyPrimitive>);
      const el = screen.getByText('Content');
      expect(el.style.position).toBe('sticky');
    });
  });

  describe('interactions', () => {
    it('sets up IntersectionObserver', () => {
      render(<StickyPrimitive>Content</StickyPrimitive>);
      expect(IntersectionObserver).toHaveBeenCalled();
    });

    it('observes sentinel element', () => {
      render(<StickyPrimitive>Content</StickyPrimitive>);
      expect(mockObserve).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<StickyPrimitive>Content</StickyPrimitive>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('sentinel is aria-hidden', () => {
      const { container } = render(<StickyPrimitive>Content</StickyPrimitive>);
      const sentinel = container.querySelector('[aria-hidden="true"]');
      expect(sentinel).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to DOM element', () => {
      const ref = vi.fn();
      render(<StickyPrimitive ref={ref}>Content</StickyPrimitive>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
  });
});
