import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Badge } from './Badge';

expect.extend(toHaveNoViolations);

describe('Badge (Styled)', () => {
    it('renders children', () => {
        render(<Badge>New</Badge>);
        expect(screen.getByText('New')).toBeInTheDocument();
    });
    it('applies variant classes', () => {
        render(<Badge variant="destructive">Error</Badge>);
        expect(screen.getByText('Error')).toHaveClass('bg-destructive');
    });
    it('applies size classes', () => {
        render(<Badge size="sm">SM</Badge>);
        expect(screen.getByText('SM')).toHaveClass('px-2');
    });
    it('merges className', () => {
        render(<Badge className="custom">Test</Badge>);
        expect(screen.getByText('Test')).toHaveClass('custom');
    });
    it('has no axe violations', async () => {
        const { container } = render(<Badge>Badge</Badge>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
