import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Stepper, StepperItem } from './Stepper';

expect.extend(toHaveNoViolations);

describe('Stepper (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(
                <Stepper activeStep={0}>
                    <StepperItem title="Step 1" />
                    <StepperItem title="Step 2" />
                </Stepper>,
            );
            expect(screen.getByText('Step 1')).toBeInTheDocument();
            expect(screen.getByText('Step 2')).toBeInTheDocument();
        });

        it('shows checkmark for completed steps', () => {
            render(
                <Stepper activeStep={1}>
                    <StepperItem title="Step 1" />
                    <StepperItem title="Step 2" />
                </Stepper>,
            );
            expect(screen.getByText('✓')).toBeInTheDocument();
        });

        it('merges custom className', () => {
            const { container } = render(
                <Stepper activeStep={0} className="custom">
                    <StepperItem title="Step 1" />
                </Stepper>,
            );
            expect(container.firstChild).toHaveClass('custom');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Stepper activeStep={0}>
                    <StepperItem title="Step 1" />
                    <StepperItem title="Step 2" />
                </Stepper>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has tablist role', () => {
            render(
                <Stepper activeStep={0}>
                    <StepperItem title="Step 1" />
                </Stepper>,
            );
            expect(screen.getByRole('tablist')).toBeInTheDocument();
        });
    });
});
