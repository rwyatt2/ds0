import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Sticky } from './Sticky';

expect.extend(toHaveNoViolations);

const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: vi.fn(),
  })));
  mockObserve.mockClear();
  mockDisconnect.mockClear();
});

describe('Sticky (Styled)', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Sticky>Sticky Content</Sticky>);
      expect(screen.getByText('Sticky Content')).toBeInTheDocument();
    });

    it('applies position sticky', () => {
      render(<Sticky>Content</Sticky>);
      const el = screen.getByText('Content');
      expect(el.style.position).toBe('sticky');
    });

    it('renders as custom element', () => {
      render(<Sticky as="nav">Nav</Sticky>);
      expect(screen.getByText('Nav').tagName).toBe('NAV');
    });

    it('merges custom className', () => {
      render(<Sticky className="custom-class">Content</Sticky>);
      expect(screen.getByText('Content')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<Sticky>Content</Sticky>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
