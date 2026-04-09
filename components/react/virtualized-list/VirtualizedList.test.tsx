import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { VirtualizedList } from './VirtualizedList';
expect.extend(toHaveNoViolations);
const items = Array.from({ length: 100 }, (_, i) => `Item ${i}`);
describe('VirtualizedList (Styled)', () => {
  it('renders', () => { render(<VirtualizedList items={items} itemHeight={40} height={200} renderItem={(item: string) => <div>{item}</div>} />); expect(screen.getByRole('list')).toBeInTheDocument(); });
  it('a11y', async () => { const { container } = render(<VirtualizedList items={items.slice(0, 5)} itemHeight={40} height={200} renderItem={(item: string) => <div>{item}</div>} />); expect(await axe(container)).toHaveNoViolations(); });
});
