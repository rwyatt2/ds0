import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Link } from './Link';

expect.extend(toHaveNoViolations);

describe('Link (Styled)', () => {
    it('renders as an anchor', () => { render(<Link href="/about">About</Link>); expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument(); });
    it('applies variant classes', () => { render(<Link href="#" variant="muted">Test</Link>); expect(screen.getByRole('link')).toHaveClass('text-muted-foreground'); });
    it('has no axe violations', async () => { const { container } = render(<Link href="/about">About</Link>); expect(await axe(container)).toHaveNoViolations(); });
});
