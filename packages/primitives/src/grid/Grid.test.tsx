import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GridPrimitive } from './Grid';

expect.extend(toHaveNoViolations);

describe('GridPrimitive', () => {
    it('renders as div by default', () => {
        render(<GridPrimitive data-testid="grid">content</GridPrimitive>);
        expect(screen.getByTestId('grid').tagName).toBe('DIV');
    });
    it('renders children', () => {
        render(<GridPrimitive>Items</GridPrimitive>);
        expect(screen.getByText('Items')).toBeInTheDocument();
    });
    it('has no axe violations', async () => {
        const { container } = render(<GridPrimitive>content</GridPrimitive>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
