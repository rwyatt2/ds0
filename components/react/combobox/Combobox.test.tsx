import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Combobox } from './Combobox';
expect.extend(toHaveNoViolations);
describe('Combobox (Styled)', () => {
    it('renders input', () => { render(<Combobox items={['A', 'B']} placeholder="Search" />); expect(screen.getByRole('combobox')).toBeInTheDocument(); });
    it('filters on input', async () => { const user = userEvent.setup(); render(<Combobox items={['Apple', 'Banana']} />); await user.click(screen.getByRole('combobox')); await user.type(screen.getByRole('combobox'), 'App'); expect(screen.getByText('Apple')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<Combobox items={['A', 'B']} placeholder="Search" />); expect(await axe(container)).toHaveNoViolations(); });
});
