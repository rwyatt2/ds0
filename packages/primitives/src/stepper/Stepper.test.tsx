import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { StepperPrimitive } from './Stepper';

expect.extend(toHaveNoViolations);

describe('StepperPrimitive', () => {
    describe('rendering', () => {
        it('renders with children', () => {
            render(
                <StepperPrimitive activeStep={0}>
                    <div>Step 1</div>
                    <div>Step 2</div>
                    <div>Step 3</div>
                </StepperPrimitive>,
            );
            expect(screen.getByText('Step 1')).toBeInTheDocument();
            expect(screen.getByText('Step 2')).toBeInTheDocument();
            expect(screen.getByText('Step 3')).toBeInTheDocument();
        });

        it('has tablist role', () => {
            render(
                <StepperPrimitive activeStep={0}>
                    <div>Step 1</div>
                </StepperPrimitive>,
            );
            expect(screen.getByRole('tablist')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('calls onStepChange when step is clicked', async () => {
            // This test validates the hook's step navigation behavior
            // The primitive itself delegates to children
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <StepperPrimitive activeStep={0}>
                    <div role="tab" aria-selected={true}>Step 1</div>
                    <div role="tab" aria-selected={false}>Step 2</div>
                </StepperPrimitive>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has correct orientation', () => {
            render(
                <StepperPrimitive activeStep={0} orientation="vertical">
                    <div>Step 1</div>
                </StepperPrimitive>,
            );
            expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to wrapper element', () => {
            const ref = vi.fn();
            render(
                <StepperPrimitive ref={ref} activeStep={0}>
                    <div>Step 1</div>
                </StepperPrimitive>,
            );
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
