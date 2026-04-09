import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { BackToTop } from './BackToTop';

expect.extend(toHaveNoViolations);

const scrollToMock = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: scrollToMock, writable: true });

describe('BackToTop (Styled)', () => {
  beforeEach(() => {
    scrollToMock.mockClear();
  });

  describe('rendering', () => {
    it('renders with default props when visible', () => {
      render(<BackToTop isVisible />);
      expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument();
    });

    it('applies variant classes', () => {
      render(<BackToTop isVisible variant="outline" />);
      const button = screen.getByRole('button', { name: 'Back to top' });
      expect(button.className).toContain('border');
    });

    it('applies size classes', () => {
      render(<BackToTop isVisible size="lg" />);
      const button = screen.getByRole('button', { name: 'Back to top' });
      expect(button.className).toContain('h-12');
    });

    it('merges custom className', () => {
      render(<BackToTop isVisible className="custom-class" />);
      expect(screen.getByRole('button', { name: 'Back to top' })).toHaveClass('custom-class');
    });

    it('does not render when not visible', () => {
      render(<BackToTop isVisible={false} />);
      expect(screen.queryByRole('button', { name: 'Back to top' })).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<BackToTop isVisible />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no axe violations for outline variant', async () => {
      const { container } = render(<BackToTop isVisible variant="outline" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
