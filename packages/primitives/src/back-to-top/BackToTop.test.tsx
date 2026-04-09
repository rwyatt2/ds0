import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { BackToTopPrimitive } from './BackToTop';

expect.extend(toHaveNoViolations);

// Mock window.scrollTo
const scrollToMock = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: scrollToMock, writable: true });

describe('BackToTopPrimitive', () => {
  beforeEach(() => {
    scrollToMock.mockClear();
  });

  describe('rendering', () => {
    it('renders when visible', () => {
      render(<BackToTopPrimitive isVisible>Back to top</BackToTopPrimitive>);
      expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument();
    });

    it('does not render when not visible', () => {
      render(<BackToTopPrimitive isVisible={false}>Back to top</BackToTopPrimitive>);
      expect(screen.queryByRole('button', { name: 'Back to top' })).not.toBeInTheDocument();
    });

    it('renders children', () => {
      render(<BackToTopPrimitive isVisible>↑ Top</BackToTopPrimitive>);
      expect(screen.getByText('↑ Top')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls scrollTo on click', async () => {
      const user = userEvent.setup();
      render(<BackToTopPrimitive isVisible>Top</BackToTopPrimitive>);
      await user.click(screen.getByRole('button', { name: 'Back to top' }));
      expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('uses instant scroll when smooth is false', async () => {
      const user = userEvent.setup();
      render(<BackToTopPrimitive isVisible smooth={false}>Top</BackToTopPrimitive>);
      await user.click(screen.getByRole('button', { name: 'Back to top' }));
      expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
    });

    it('does not scroll when disabled', async () => {
      const user = userEvent.setup();
      render(<BackToTopPrimitive isVisible isDisabled>Top</BackToTopPrimitive>);
      await user.click(screen.getByRole('button', { name: 'Back to top' }));
      expect(scrollToMock).not.toHaveBeenCalled();
    });
  });

  describe('keyboard', () => {
    it('is focusable via Tab when visible', async () => {
      const user = userEvent.setup();
      render(<BackToTopPrimitive isVisible>Top</BackToTopPrimitive>);
      await user.tab();
      expect(screen.getByRole('button', { name: 'Back to top' })).toHaveFocus();
    });

    it('is not focusable when disabled', async () => {
      const user = userEvent.setup();
      render(<BackToTopPrimitive isVisible isDisabled>Top</BackToTopPrimitive>);
      await user.tab();
      expect(screen.getByRole('button', { name: 'Back to top' })).not.toHaveFocus();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<BackToTopPrimitive isVisible>Top</BackToTopPrimitive>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has aria-label', () => {
      render(<BackToTopPrimitive isVisible>Top</BackToTopPrimitive>);
      expect(screen.getByRole('button', { name: 'Back to top' })).toHaveAttribute('aria-label', 'Back to top');
    });

    it('has aria-disabled when disabled', () => {
      render(<BackToTopPrimitive isVisible isDisabled>Top</BackToTopPrimitive>);
      expect(screen.getByRole('button', { name: 'Back to top' })).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to DOM element', () => {
      const ref = vi.fn();
      render(<BackToTopPrimitive isVisible ref={ref}>Top</BackToTopPrimitive>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
  });
});
