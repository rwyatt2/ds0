import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DiffViewer } from './DiffViewer';
expect.extend(toHaveNoViolations);
describe('DiffViewer (Styled)', () => {
    it('renders', () => { render(<DiffViewer oldValue="a" newValue="b" />); expect(screen.getByRole('region')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<DiffViewer oldValue="" newValue="" />); expect(await axe(container)).toHaveNoViolations(); });
});
