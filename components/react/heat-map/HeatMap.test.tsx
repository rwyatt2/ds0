import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HeatMap } from './HeatMap';
expect.extend(toHaveNoViolations);
describe('HeatMap (Styled)', () => {
    it('renders', () => { render(<HeatMap data={[[1,2],[3,4]]} />); expect(screen.getByRole('img')).toBeInTheDocument(); });
    it('renders title', () => { render(<HeatMap data={[[1]]} title="Test" />); expect(screen.getByText('Test')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<HeatMap data={[[1]]} />); expect(await axe(container)).toHaveNoViolations(); });
});
