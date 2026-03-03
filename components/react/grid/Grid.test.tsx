import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Grid } from './Grid';
expect.extend(toHaveNoViolations);
describe('Grid (Styled)', () => {
    it('applies grid class', () => { render(<Grid data-testid="g">c</Grid>); expect(screen.getByTestId('g')).toHaveClass('grid'); });
    it('applies columns', () => { render(<Grid data-testid="g" columns={3}>c</Grid>); expect(screen.getByTestId('g')).toHaveClass('grid-cols-3'); });
    it('applies gap', () => { render(<Grid data-testid="g" gap="6">c</Grid>); expect(screen.getByTestId('g')).toHaveClass('gap-6'); });
    it('merges className', () => { render(<Grid data-testid="g" className="custom">c</Grid>); expect(screen.getByTestId('g')).toHaveClass('custom'); });
    it('has no axe violations', async () => { const { container } = render(<Grid>c</Grid>); expect(await axe(container)).toHaveNoViolations(); });
});
