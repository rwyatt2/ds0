import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Form } from './Form';

expect.extend(toHaveNoViolations);

describe('Form (Styled)', () => {
    describe('rendering', () => {
        it('renders form with field', () => {
            render(
                <Form>
                    <Form.Field name="email">
                        <Form.Label>Email</Form.Label>
                        <input type="email" />
                    </Form.Field>
                </Form>,
            );
            expect(screen.getByText('Email')).toBeInTheDocument();
        });

        it('renders error message', () => {
            render(
                <Form>
                    <Form.Field name="email" hasError>
                        <Form.Label>Email</Form.Label>
                        <Form.Error>Required</Form.Error>
                    </Form.Field>
                </Form>,
            );
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('submits form', async () => {
            const onSubmit = vi.fn();
            const user = userEvent.setup();
            render(
                <Form onSubmit={onSubmit}>
                    <button type="submit">Submit</button>
                </Form>,
            );
            await user.click(screen.getByRole('button'));
            expect(onSubmit).toHaveBeenCalledTimes(1);
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Form>
                    <Form.Field name="email">
                        <Form.Label>Email</Form.Label>
                        <input type="email" aria-label="Email" />
                    </Form.Field>
                </Form>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
