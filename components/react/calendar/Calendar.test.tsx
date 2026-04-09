import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Calendar } from './Calendar';
expect.extend(toHaveNoViolations);
describe('Calendar (Styled)', () => {
    it('renders', () => { render(<Calendar />); expect(screen.getByRole('grid')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<Calendar />); expect(await axe(container)).toHaveNoViolations(); });
});
