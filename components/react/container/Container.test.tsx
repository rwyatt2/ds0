import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Container } from './Container';
expect.extend(toHaveNoViolations);
describe('Container (Styled)', () => {
    it('applies default classes', () => { render(<Container data-testid="c">c</Container>); const el = screen.getByTestId('c'); expect(el).toHaveClass('max-w-screen-lg', 'mx-auto'); });
    it('applies size', () => { render(<Container data-testid="c" size="sm">c</Container>); expect(screen.getByTestId('c')).toHaveClass('max-w-screen-sm'); });
    it('renders custom element', () => { render(<Container data-testid="c" as="main">c</Container>); expect(screen.getByTestId('c').tagName).toBe('MAIN'); });
    it('merges className', () => { render(<Container data-testid="c" className="custom">c</Container>); expect(screen.getByTestId('c')).toHaveClass('custom'); });
    it('has no axe violations', async () => { const { container } = render(<Container>c</Container>); expect(await axe(container)).toHaveNoViolations(); });
});
