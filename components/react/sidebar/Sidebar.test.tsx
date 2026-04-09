import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Sidebar } from './Sidebar';

expect.extend(toHaveNoViolations);

describe('Sidebar (Styled)', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Sidebar>Nav</Sidebar>);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('applies variant classes', () => {
      render(<Sidebar variant="floating">Nav</Sidebar>);
      expect(screen.getByRole('navigation').className).toContain('shadow');
    });

    it('merges custom className', () => {
      render(<Sidebar className="custom-class">Nav</Sidebar>);
      expect(screen.getByRole('navigation')).toHaveClass('custom-class');
    });
  });

  describe('collapse', () => {
    it('toggles collapse state', async () => {
      const user = userEvent.setup();
      render(<Sidebar>Nav</Sidebar>);
      const toggle = screen.getByRole('button', { name: /collapse/i });
      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-label', 'Expand sidebar');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<Sidebar>Nav</Sidebar>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
