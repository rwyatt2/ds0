import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Stack } from './Stack';
expect.extend(toHaveNoViolations);
describe('Stack (Styled)', () => {
    it('renders vertical by default', () => { render(<Stack data-testid="s">c</Stack>); expect(screen.getByTestId('s')).toHaveClass('flex-col'); });
    it('renders horizontal', () => { render(<Stack data-testid="s" direction="horizontal">c</Stack>); expect(screen.getByTestId('s')).toHaveClass('flex-row'); });
    it('applies gap', () => { render(<Stack data-testid="s" gap="6">c</Stack>); expect(screen.getByTestId('s')).toHaveClass('gap-6'); });
    it('applies align', () => { render(<Stack data-testid="s" align="center">c</Stack>); expect(screen.getByTestId('s')).toHaveClass('items-center'); });
    it('applies justify', () => { render(<Stack data-testid="s" justify="between">c</Stack>); expect(screen.getByTestId('s')).toHaveClass('justify-between'); });
    it('applies wrap', () => { render(<Stack data-testid="s" wrap>c</Stack>); expect(screen.getByTestId('s')).toHaveClass('flex-wrap'); });
    it('merges className', () => { render(<Stack data-testid="s" className="custom">c</Stack>); expect(screen.getByTestId('s')).toHaveClass('custom'); });
    it('has no axe violations', async () => { const { container } = render(<Stack>c</Stack>); expect(await axe(container)).toHaveNoViolations(); });
});
