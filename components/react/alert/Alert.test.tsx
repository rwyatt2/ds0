import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Alert } from './Alert';

expect.extend(toHaveNoViolations);

describe('Alert (Styled)', () => {
    describe('rendering', () => {
        it('renders with default variant', () => {
            render(<Alert><Alert.Title>Title</Alert.Title></Alert>);
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        it('renders with variant classes', () => {
            render(<Alert variant="destructive"><Alert.Title>Error</Alert.Title></Alert>);
            expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'destructive');
        });
    });

    describe('dismiss', () => {
        it('dismisses on click', async () => {
            const user = userEvent.setup();
            render(<Alert isDismissible><Alert.Title>Title</Alert.Title></Alert>);
            await user.click(screen.getByRole('button', { name: 'Dismiss alert' }));
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Alert variant="info"><Alert.Title>Info</Alert.Title><Alert.Description>Msg</Alert.Description></Alert>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
