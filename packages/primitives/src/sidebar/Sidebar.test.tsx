import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { SidebarPrimitive } from './Sidebar';

expect.extend(toHaveNoViolations);

describe('SidebarPrimitive', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<SidebarPrimitive>Nav Items</SidebarPrimitive>);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders children', () => {
      render(<SidebarPrimitive>Nav Items</SidebarPrimitive>);
      expect(screen.getByText('Nav Items')).toBeInTheDocument();
    });

    it('renders header and footer slots', () => {
      render(
        <SidebarPrimitive header={<span>Logo</span>} footer={<span>Footer</span>}>
          Content
        </SidebarPrimitive>,
      );
      expect(screen.getByText('Logo')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<SidebarPrimitive>Content</SidebarPrimitive>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has navigation role', () => {
      render(<SidebarPrimitive>Content</SidebarPrimitive>);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('has aria-label', () => {
      render(<SidebarPrimitive>Content</SidebarPrimitive>);
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Sidebar');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to DOM element', () => {
      const ref = vi.fn();
      render(<SidebarPrimitive ref={ref}>Content</SidebarPrimitive>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
  });
});
