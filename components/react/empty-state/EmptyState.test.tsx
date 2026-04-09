import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { EmptyState } from './EmptyState';

expect.extend(toHaveNoViolations);

describe('EmptyState (Styled)', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<EmptyState title="No items" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('No items')).toBeInTheDocument();
    });

    it('applies variant classes', () => {
      const { container } = render(<EmptyState title="No items" variant="card" />);
      expect(container.firstChild).toHaveClass('border');
    });

    it('applies size classes', () => {
      const { container } = render(<EmptyState title="No items" size="lg" />);
      expect(container.firstChild).toHaveClass('gap-6');
    });

    it('merges custom className', () => {
      render(<EmptyState title="No items" className="custom-class" />);
      expect(screen.getByRole('status')).toHaveClass('custom-class');
    });

    it('renders icon, description, and action', () => {
      render(
        <EmptyState
          title="No projects"
          description="Create your first project."
          icon={<span data-testid="icon">📁</span>}
          action={<button>Create</button>}
        />,
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Create your first project.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<EmptyState title="No items" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no axe violations for card variant', async () => {
      const { container } = render(<EmptyState title="No items" variant="card" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
