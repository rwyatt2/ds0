import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RatingPrimitive } from './Rating';

expect.extend(toHaveNoViolations);

describe('RatingPrimitive', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<RatingPrimitive />);
            expect(screen.getByRole('radiogroup')).toBeInTheDocument();
        });

        it('renders correct number of stars', () => {
            render(<RatingPrimitive maxValue={5} />);
            const stars = screen.getAllByRole('radio');
            expect(stars).toHaveLength(5);
        });

        it('renders custom maxValue', () => {
            render(<RatingPrimitive maxValue={10} />);
            const stars = screen.getAllByRole('radio');
            expect(stars).toHaveLength(10);
        });

        it('fills stars up to value', () => {
            render(<RatingPrimitive value={3} maxValue={5} />);
            const stars = screen.getAllByRole('radio');
            expect(stars[0]).toHaveTextContent('★');
            expect(stars[1]).toHaveTextContent('★');
            expect(stars[2]).toHaveTextContent('★');
            expect(stars[3]).toHaveTextContent('☆');
            expect(stars[4]).toHaveTextContent('☆');
        });
    });

    describe('interactions', () => {
        it('calls onChange when star is clicked', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<RatingPrimitive value={0} onChange={onChange} />);
            const stars = screen.getAllByRole('radio');
            await user.click(stars[2]);
            expect(onChange).toHaveBeenCalledWith(3);
        });

        it('does not respond when disabled', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<RatingPrimitive value={0} isDisabled onChange={onChange} />);
            const stars = screen.getAllByRole('radio');
            await user.click(stars[2]);
            expect(onChange).not.toHaveBeenCalled();
        });

        it('does not respond when readonly', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<RatingPrimitive value={3} isReadonly onChange={onChange} />);
            const stars = screen.getAllByRole('radio');
            await user.click(stars[0]);
            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe('keyboard', () => {
        it('increases value with ArrowRight', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<RatingPrimitive value={2} onChange={onChange} />);
            const group = screen.getByRole('radiogroup');
            group.focus();
            await user.keyboard('{ArrowRight}');
            expect(onChange).toHaveBeenCalledWith(3);
        });

        it('decreases value with ArrowLeft', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<RatingPrimitive value={3} onChange={onChange} />);
            const group = screen.getByRole('radiogroup');
            group.focus();
            await user.keyboard('{ArrowLeft}');
            expect(onChange).toHaveBeenCalledWith(2);
        });

        it('sets max with End key', async () => {
            const onChange = vi.fn();
            const user = userEvent.setup();
            render(<RatingPrimitive value={2} maxValue={5} onChange={onChange} />);
            const group = screen.getByRole('radiogroup');
            group.focus();
            await user.keyboard('{End}');
            expect(onChange).toHaveBeenCalledWith(5);
        });

        it('is not focusable when disabled', () => {
            render(<RatingPrimitive isDisabled />);
            expect(screen.getByRole('radiogroup')).toHaveAttribute('tabindex', '-1');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<RatingPrimitive value={3} />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has radiogroup role', () => {
            render(<RatingPrimitive />);
            expect(screen.getByRole('radiogroup')).toBeInTheDocument();
        });

        it('has aria-disabled when disabled', () => {
            render(<RatingPrimitive isDisabled />);
            expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-disabled', 'true');
        });

        it('has descriptive aria-label', () => {
            render(<RatingPrimitive value={3} maxValue={5} />);
            expect(screen.getByRole('radiogroup')).toHaveAttribute(
                'aria-label',
                'Rating: 3 out of 5 stars',
            );
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to DOM element', () => {
            const ref = vi.fn();
            render(<RatingPrimitive ref={ref} />);
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
