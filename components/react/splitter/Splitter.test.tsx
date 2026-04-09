import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SplitterGroup, SplitterPanel, SplitterHandle } from './Splitter';

expect.extend(toHaveNoViolations);

describe('Splitter (Styled)', () => {
  const renderSplitter = () =>
    render(
      <SplitterGroup direction="horizontal">
        <SplitterPanel>Left</SplitterPanel>
        <SplitterHandle />
        <SplitterPanel>Right</SplitterPanel>
      </SplitterGroup>,
    );

  it('renders panels', () => {
    renderSplitter();
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('renders handle with separator role', () => {
    renderSplitter();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = renderSplitter();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
