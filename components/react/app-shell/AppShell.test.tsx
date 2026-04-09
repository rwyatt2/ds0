import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AppShell } from './AppShell';

expect.extend(toHaveNoViolations);

describe('AppShell (Styled)', () => {
  describe('rendering', () => {
    it('renders main content', () => {
      render(<AppShell>Content</AppShell>);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('renders header', () => {
      render(<AppShell header={<span>Header</span>}>Content</AppShell>);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders footer', () => {
      render(<AppShell footer={<span>Footer</span>}>Content</AppShell>);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('merges custom className', () => {
      const { container } = render(<AppShell className="custom">Content</AppShell>);
      expect(container.firstChild).toHaveClass('custom');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<AppShell header={<span>H</span>}>Content</AppShell>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
