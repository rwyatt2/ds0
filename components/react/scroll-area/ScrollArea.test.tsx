import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ScrollArea } from './ScrollArea';

expect.extend(toHaveNoViolations);

describe('ScrollArea (Styled)', () => {
    it('renders children', () => {
        render(<ScrollArea><p>Content</p></ScrollArea>);
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies overflow-hidden to root', () => {
        const { container } = render(<ScrollArea><p>Content</p></ScrollArea>);
        const root = container.firstChild as HTMLElement;
        expect(root).toHaveClass('overflow-hidden');
    });

    it('merges custom className', () => {
        const { container } = render(<ScrollArea className="h-72"><p>Content</p></ScrollArea>);
        expect(container.firstChild).toHaveClass('h-72');
    });

    it('has no axe violations', async () => {
        const { container } = render(<ScrollArea><p>Content</p></ScrollArea>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
