import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';
import { TagPrimitive } from './Tag';

expect.extend(toHaveNoViolations);

describe('TagPrimitive', () => {
    describe('rendering', () => {
        it('renders children', () => {
            render(<TagPrimitive>React</TagPrimitive>);
            expect(screen.getByText('React')).toBeInTheDocument();
        });

        it('renders remove button when isRemovable', () => {
            render(<TagPrimitive isRemovable onRemove={() => {}}>Tag</TagPrimitive>);
            expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
        });

        it('does not render remove button when not removable', () => {
            render(<TagPrimitive>Tag</TagPrimitive>);
            expect(screen.queryByRole('button')).not.toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('calls onRemove when remove button clicked', async () => {
            const onRemove = vi.fn();
            const user = userEvent.setup();
            render(<TagPrimitive isRemovable onRemove={onRemove}>Tag</TagPrimitive>);
            await user.click(screen.getByRole('button', { name: 'Remove' }));
            expect(onRemove).toHaveBeenCalledTimes(1);
        });

        it('does not call onRemove when disabled', async () => {
            const onRemove = vi.fn();
            const user = userEvent.setup();
            render(<TagPrimitive isRemovable isDisabled onRemove={onRemove}>Tag</TagPrimitive>);
            await user.click(screen.getByRole('button', { name: 'Remove' }));
            expect(onRemove).not.toHaveBeenCalled();
        });
    });

    describe('keyboard', () => {
        it('remove button is focusable via Tab', async () => {
            const user = userEvent.setup();
            render(<TagPrimitive isRemovable onRemove={() => {}}>Tag</TagPrimitive>);
            await user.tab();
            expect(screen.getByRole('button', { name: 'Remove' })).toHaveFocus();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<TagPrimitive>Tag</TagPrimitive>);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations (removable)', async () => {
            const { container } = render(<TagPrimitive isRemovable onRemove={() => {}}>Tag</TagPrimitive>);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref', () => {
            const ref = createRef<HTMLSpanElement>();
            render(<TagPrimitive ref={ref}>Tag</TagPrimitive>);
            expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        });
    });
});
