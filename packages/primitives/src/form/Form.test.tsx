import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import {
    FormPrimitive,
    FormFieldPrimitive,
    FormLabelPrimitive,
    FormDescriptionPrimitive,
    FormErrorPrimitive,
    FormSectionPrimitive,
    FormActionsPrimitive,
} from './Form';

expect.extend(toHaveNoViolations);

describe('FormPrimitive', () => {
    describe('rendering', () => {
        it('renders form element', () => {
            render(
                <FormPrimitive data-testid="form">
                    <input type="text" />
                </FormPrimitive>,
            );
            expect(screen.getByTestId('form')).toBeInTheDocument();
        });

        it('renders field with label and input', () => {
            render(
                <FormPrimitive>
                    <FormFieldPrimitive name="email">
                        <FormLabelPrimitive>Email</FormLabelPrimitive>
                        <input type="email" />
                    </FormFieldPrimitive>
                </FormPrimitive>,
            );
            expect(screen.getByText('Email')).toBeInTheDocument();
        });

        it('renders required indicator', () => {
            render(
                <FormPrimitive>
                    <FormFieldPrimitive name="email" required>
                        <FormLabelPrimitive>Email</FormLabelPrimitive>
                    </FormFieldPrimitive>
                </FormPrimitive>,
            );
            expect(screen.getByText('*')).toBeInTheDocument();
        });

        it('renders description', () => {
            render(
                <FormPrimitive>
                    <FormFieldPrimitive name="email">
                        <FormDescriptionPrimitive>Enter your email</FormDescriptionPrimitive>
                    </FormFieldPrimitive>
                </FormPrimitive>,
            );
            expect(screen.getByText('Enter your email')).toBeInTheDocument();
        });

        it('renders error with role="alert"', () => {
            render(
                <FormPrimitive>
                    <FormFieldPrimitive name="email" hasError>
                        <FormErrorPrimitive>Email is required</FormErrorPrimitive>
                    </FormFieldPrimitive>
                </FormPrimitive>,
            );
            expect(screen.getByRole('alert')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });

        it('renders form section', () => {
            render(
                <FormPrimitive>
                    <FormSectionPrimitive title="Personal Info" description="Your basic details">
                        <FormFieldPrimitive name="name">
                            <FormLabelPrimitive>Name</FormLabelPrimitive>
                        </FormFieldPrimitive>
                    </FormSectionPrimitive>
                </FormPrimitive>,
            );
            expect(screen.getByText('Personal Info')).toBeInTheDocument();
            expect(screen.getByText('Your basic details')).toBeInTheDocument();
        });

        it('renders form actions', () => {
            render(
                <FormPrimitive>
                    <FormActionsPrimitive>
                        <button type="submit">Submit</button>
                    </FormActionsPrimitive>
                </FormPrimitive>,
            );
            expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('calls onSubmit when submitted', async () => {
            const onSubmit = vi.fn();
            const user = userEvent.setup();
            render(
                <FormPrimitive onSubmit={onSubmit}>
                    <button type="submit">Submit</button>
                </FormPrimitive>,
            );

            await user.click(screen.getByRole('button', { name: 'Submit' }));
            expect(onSubmit).toHaveBeenCalledTimes(1);
        });

        it('prevents default form submission', async () => {
            const onSubmit = vi.fn((e: React.FormEvent) => {
                // If preventDefault was called, this should not reload
                expect(e.defaultPrevented).toBe(true);
            });
            const user = userEvent.setup();
            render(
                <FormPrimitive onSubmit={onSubmit}>
                    <button type="submit">Submit</button>
                </FormPrimitive>,
            );

            await user.click(screen.getByRole('button', { name: 'Submit' }));
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <FormPrimitive>
                    <FormFieldPrimitive name="email">
                        <FormLabelPrimitive>Email</FormLabelPrimitive>
                        <input type="email" aria-label="Email" />
                    </FormFieldPrimitive>
                    <FormActionsPrimitive>
                        <button type="submit">Submit</button>
                    </FormActionsPrimitive>
                </FormPrimitive>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations with error', async () => {
            const { container } = render(
                <FormPrimitive>
                    <FormFieldPrimitive name="email" hasError>
                        <FormLabelPrimitive>Email</FormLabelPrimitive>
                        <input type="email" aria-invalid="true" aria-label="Email" />
                        <FormErrorPrimitive>Email is required</FormErrorPrimitive>
                    </FormFieldPrimitive>
                </FormPrimitive>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has noValidate attribute', () => {
            render(<FormPrimitive data-testid="form">content</FormPrimitive>);
            expect(screen.getByTestId('form')).toHaveAttribute('novalidate');
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to form element', () => {
            const ref = vi.fn();
            render(<FormPrimitive ref={ref}>content</FormPrimitive>);
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
