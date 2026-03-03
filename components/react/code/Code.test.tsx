import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Code } from './Code';

expect.extend(toHaveNoViolations);

describe('Code (Styled)', () => {
    describe('rendering', () => {
        it('renders inline by default', () => {
            render(<Code>code</Code>);
            expect(screen.getByText('code').tagName).toBe('CODE');
            expect(screen.getByText('code')).toHaveClass('bg-muted');
        });

        it('renders block with pre wrapper', () => {
            render(<Code variant="block">code</Code>);
            const code = screen.getByText('code');
            expect(code.tagName).toBe('CODE');
            expect(code.parentElement?.tagName).toBe('PRE');
            expect(code.parentElement).toHaveClass('rounded-lg');
        });

        it('merges custom className', () => {
            render(<Code className="custom">code</Code>);
            expect(screen.getByText('code')).toHaveClass('custom');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<Code>code</Code>);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
