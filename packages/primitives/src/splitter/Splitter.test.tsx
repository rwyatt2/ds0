import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SplitterGroupPrimitive, SplitterPanelPrimitive, SplitterHandlePrimitive } from './Splitter';

expect.extend(toHaveNoViolations);

describe('SplitterPrimitive', () => {
  const renderSplitter = () =>
    render(
      <SplitterGroupPrimitive>
        <SplitterPanelPrimitive>Panel A</SplitterPanelPrimitive>
        <SplitterHandlePrimitive />
        <SplitterPanelPrimitive>Panel B</SplitterPanelPrimitive>
      </SplitterGroupPrimitive>,
    );

  describe('rendering', () => {
    it('renders panels', () => {
      renderSplitter();
      expect(screen.getByText('Panel A')).toBeInTheDocument();
      expect(screen.getByText('Panel B')).toBeInTheDocument();
    });

    it('renders handle with separator role', () => {
      renderSplitter();
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });

  describe('keyboard', () => {
    it('handle is focusable', async () => {
      const { default: userEvent } = await import('@testing-library/user-event');
      const user = userEvent.setup();
      renderSplitter();
      await user.tab();
      expect(screen.getByRole('separator')).toHaveFocus();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = renderSplitter();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has separator role on handle', () => {
      renderSplitter();
      expect(screen.getByRole('separator')).toHaveAttribute('role', 'separator');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref on group', () => {
      const ref = vi.fn();
      render(<SplitterGroupPrimitive ref={ref}><SplitterPanelPrimitive>A</SplitterPanelPrimitive></SplitterGroupPrimitive>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
  });
});
