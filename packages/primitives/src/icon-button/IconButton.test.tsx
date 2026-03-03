import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';
import { IconButtonPrimitive } from './IconButton';

expect.extend(toHaveNoViolations);

const TestIcon = () => <svg data-testid="icon" aria-hidden="true"><circle cx="12" cy="12" r="10" /></svg>;

describe('IconButtonPrimitive', () => {
    describe('rendering', () => {
        it('renders as a button with icon', () => {
            render(<IconButtonPrimitive icon={<TestIcon />} aria-label="Close" />);
            expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
            expect(screen.getByTestId('icon')).toBeInTheDocument();
        });

        it('forwards ref', () => {
            const ref = createRef<HTMLButtonElement>();
            render(<IconButtonPrimitive ref={ref} icon={<TestIcon />} aria-label="Close" />);
            expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        });
    });

    describe('interactions', () => {
        it('calls onClick when clicked', async () => {
            const onClick = vi.fn();
            const user = userEvent.setup();
            render(<IconButtonPrimitive icon={<TestIcon />} aria-label="Close" onClick={onClick} />);
            await user.click(screen.getByRole('button'));
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it('does not call onClick when disabled', async () => {
            const onClick = vi.fn();
            const user = userEvent.setup();
            render(<IconButtonPrimitive icon={<TestIcon />} aria-label="Close" isDisabled onClick={onClick} />);
            await user.click(screen.getByRole('button'));
            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<IconButtonPrimitive icon={<TestIcon />} aria-label="Close" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has aria-label', () => {
            render(<IconButtonPrimitive icon={<TestIcon />} aria-label="Delete item" />);
            expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Delete item');
        });
    });
});
