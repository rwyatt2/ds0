import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SliderPrimitive } from './Slider';

expect.extend(toHaveNoViolations);

describe('SliderPrimitive', () => {
    it('renders with role="slider"', () => {
        render(<SliderPrimitive label="Volume" />);
        expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('renders label', () => {
        render(<SliderPrimitive label="Brightness" />);
        expect(screen.getByText('Brightness')).toBeInTheDocument();
    });

    it('shows value when showValue is true', () => {
        render(<SliderPrimitive label="Volume" showValue defaultValue={[42]} />);
        expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('sets aria-valuemin, aria-valuemax, aria-valuenow', () => {
        render(<SliderPrimitive label="Vol" min={0} max={100} defaultValue={[50]} />);
        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('aria-valuemin', '0');
        expect(slider).toHaveAttribute('aria-valuemax', '100');
        expect(slider).toHaveAttribute('aria-valuenow', '50');
    });

    it('increases value on ArrowRight', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<SliderPrimitive label="Vol" defaultValue={[50]} onValueChange={onChange} />);
        screen.getByRole('slider').focus();
        await user.keyboard('{ArrowRight}');
        expect(onChange).toHaveBeenCalledWith([51]);
    });

    it('decreases value on ArrowLeft', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<SliderPrimitive label="Vol" defaultValue={[50]} onValueChange={onChange} />);
        screen.getByRole('slider').focus();
        await user.keyboard('{ArrowLeft}');
        expect(onChange).toHaveBeenCalledWith([49]);
    });

    it('sets to min on Home', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<SliderPrimitive label="Vol" defaultValue={[50]} onValueChange={onChange} />);
        screen.getByRole('slider').focus();
        await user.keyboard('{Home}');
        expect(onChange).toHaveBeenCalledWith([0]);
    });

    it('sets to max on End', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<SliderPrimitive label="Vol" defaultValue={[50]} onValueChange={onChange} />);
        screen.getByRole('slider').focus();
        await user.keyboard('{End}');
        expect(onChange).toHaveBeenCalledWith([100]);
    });

    it('has no axe violations', async () => {
        const { container } = render(<SliderPrimitive label="Volume" />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
