import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { VirtualizedListPrimitive } from './VirtualizedList';

expect.extend(toHaveNoViolations);

const items = Array.from({ length: 100 }, (_, i) => `Item ${i}`);

describe('VirtualizedListPrimitive', () => {
  it('renders visible items', () => {
    render(<VirtualizedListPrimitive items={items} itemHeight={40} height={200} renderItem={(item) => <div>{item}</div>} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    // Should render ~5 items visible + overscan, not all 100
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBeLessThan(30);
  });

  it('has list role', () => {
    render(<VirtualizedListPrimitive items={items} itemHeight={40} height={200} renderItem={(item) => <div>{item}</div>} />);
    expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'List of 100 items');
  });

  it('a11y', async () => {
    const { container } = render(<VirtualizedListPrimitive items={items.slice(0, 5)} itemHeight={40} height={200} renderItem={(item) => <div>{item}</div>} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
