import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AppShellPrimitive } from './AppShell';

expect.extend(toHaveNoViolations);

describe('AppShellPrimitive', () => {
  describe('rendering', () => {
    it('renders children as main content', () => {
      render(<AppShellPrimitive>Main Content</AppShellPrimitive>);
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByText('Main Content')).toBeInTheDocument();
    });

    it('renders header slot', () => {
      render(<AppShellPrimitive header={<span>Header</span>}>Content</AppShellPrimitive>);
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText('Header')).toBeInTheDocument();
    });

    it('renders footer slot', () => {
      render(<AppShellPrimitive footer={<span>Footer</span>}>Content</AppShellPrimitive>);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders sidebar slot', () => {
      render(<AppShellPrimitive sidebar={<nav>Sidebar</nav>}>Content</AppShellPrimitive>);
      expect(screen.getByText('Sidebar')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(
        <AppShellPrimitive header={<span>H</span>} footer={<span>F</span>}>Content</AppShellPrimitive>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = vi.fn();
      render(<AppShellPrimitive ref={ref}>Content</AppShellPrimitive>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
  });
});
