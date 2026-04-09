import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { JsonViewer } from './JsonViewer';
expect.extend(toHaveNoViolations);
describe('JsonViewer (Styled)', () => {
    it('renders', () => { render(<JsonViewer data={{ a: 1 }} />); expect(screen.getByRole('tree')).toBeInTheDocument(); });
    it('renders expand/collapse buttons', () => { render(<JsonViewer data={{ a: 1 }} />); expect(screen.getByText('Expand All')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<JsonViewer data={{ a: 1 }} />); expect(await axe(container)).toHaveNoViolations(); });
});
