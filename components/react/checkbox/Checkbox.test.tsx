import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Checkbox } from './Checkbox';

expect.extend(toHaveNoViolations);

describe('Checkbox (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<Checkbox label="Accept" />);
            expect(screen.getByRole('checkbox')).toBeInTheDocument();
            expect(screen.getByText('Accept')).toBeInTheDocument();
        });

        it('renders description', () => {
            render(<Checkbox label="Terms" description="Read the terms" />);
            expect(screen.getByText('Read the terms')).toBeInTheDocument();
        });

        it('merges custom className', () => {
            const { container } = render(<Checkbox label="Test" className="custom" />);
            expect(container.firstChild).toHaveClass('custom');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<Checkbox label="Accept terms" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when checked', async () => {
            const { container } = render(<Checkbox label="Accept" defaultChecked />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
