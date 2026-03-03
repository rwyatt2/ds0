import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';

import { Toast, Toaster } from './Toast';
import { toastStore } from '@ds0/primitives';

expect.extend(toHaveNoViolations);

describe('Toast (Styled)', () => {
    beforeEach(() => {
        toastStore._reset();
    });

    describe('rendering', () => {
        it('renders toast with title and description', () => {
            render(
                <Toast
                    toast={{ id: '1', title: 'Success', description: 'Saved' }}
                    onDismiss={() => { /* noop */ }}
                />,
            );
            expect(screen.getByText('Success')).toBeInTheDocument();
            expect(screen.getByText('Saved')).toBeInTheDocument();
        });

        it('renders variant classes', () => {
            render(
                <Toast
                    toast={{ id: '1', title: 'Error', variant: 'destructive' }}
                    onDismiss={() => { /* noop */ }}
                />,
            );
            expect(screen.getByRole('status').className).toContain('destructive');
        });
    });

    describe('Toaster', () => {
        it('renders toasts from store', () => {
            render(<Toaster />);
            act(() => {
                toastStore.addToast({ title: 'Test', duration: 0 });
            });
            expect(screen.getByText('Test')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Toast
                    toast={{ id: '1', title: 'Success', description: 'Saved' }}
                    onDismiss={() => { /* noop */ }}
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
