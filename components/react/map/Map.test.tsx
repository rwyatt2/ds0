import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Map } from './Map';
expect.extend(toHaveNoViolations);
describe('Map (Styled)', () => {
    it('renders', () => { render(<Map />); expect(screen.getByRole('img')).toBeInTheDocument(); });
    it('has no axe violations', async () => { const { container } = render(<Map />); expect(await axe(container)).toHaveNoViolations(); });
});
