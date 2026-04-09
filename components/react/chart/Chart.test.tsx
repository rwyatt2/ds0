import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Chart } from './Chart';
expect.extend(toHaveNoViolations);
const p = { labels: ['A', 'B'], datasets: [{ label: 'T', data: [1, 2] }] };
describe('Chart (Styled)', () => {
    it('renders', () => { render(<Chart {...p} />); expect(screen.getByRole('img')).toBeInTheDocument(); });
    it('renders title', () => { render(<Chart {...p} title="Test" />); expect(screen.getByText('Test')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<Chart {...p} />); expect(await axe(container)).toHaveNoViolations(); });
});
