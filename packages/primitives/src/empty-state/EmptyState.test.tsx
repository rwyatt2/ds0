import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { EmptyStatePrimitive } from './EmptyState';

expect.extend(toHaveNoViolations);

describe('EmptyStatePrimitive', () => {
  describe('rendering', () => {
    it('renders with title', () => {
      render(<EmptyStatePrimitive title="No items" />);
      expect(screen.getByText('No items')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<EmptyStatePrimitive title="No items" description="Add your first item." />);
      expect(screen.getByText('Add your first item.')).toBeInTheDocument();
    });

    it('renders icon when provided', () => {
      render(<EmptyStatePrimitive title="No items" icon={<span data-testid="icon">📭</span>} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders action when provided', () => {
      render(
        <EmptyStatePrimitive title="No items" action={<button>Add Item</button>} />,
      );
      expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument();
    });

    it('renders children', () => {
      render(
        <EmptyStatePrimitive title="No items">
          <span>Custom content</span>
        </EmptyStatePrimitive>,
      );
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<EmptyStatePrimitive title="No items" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has role status', () => {
      render(<EmptyStatePrimitive title="No items" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has aria-live polite by default', () => {
      render(<EmptyStatePrimitive title="No items" />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to DOM element', () => {
      const ref = vi.fn();
      render(<EmptyStatePrimitive title="No items" ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
  });
});
