import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DockPrimitive } from './Dock';

expect.extend(toHaveNoViolations);

describe('DockPrimitive', () => {
  it('renders children', () => {
    render(<DockPrimitive>Panel Content</DockPrimitive>);
    expect(screen.getByText('Panel Content')).toBeInTheDocument();
  });

  it('has dialog role', () => {
    render(<DockPrimitive>Content</DockPrimitive>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has fixed position', () => {
    render(<DockPrimitive>Content</DockPrimitive>);
    expect(screen.getByRole('dialog').style.position).toBe('fixed');
  });

  it('has no axe violations', async () => {
    const { container } = render(<DockPrimitive>Content</DockPrimitive>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<DockPrimitive ref={ref}>Content</DockPrimitive>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
  });
});
