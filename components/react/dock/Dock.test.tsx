import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Dock } from './Dock';

expect.extend(toHaveNoViolations);

describe('Dock (Styled)', () => {
  it('renders', () => { render(<Dock>Content</Dock>); expect(screen.getByRole('dialog')).toBeInTheDocument(); });
  it('applies variant', () => { render(<Dock variant="glass">Content</Dock>); expect(screen.getByRole('dialog').className).toContain('backdrop-blur'); });
  it('a11y', async () => { const { container } = render(<Dock>Content</Dock>); expect(await axe(container)).toHaveNoViolations(); });
});
