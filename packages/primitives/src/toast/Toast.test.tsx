import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';

import { ToastPrimitive } from './Toast';
import { toastStore } from './toastStore';
import { useToast } from './useToast';

expect.extend(toHaveNoViolations);

// Helper to render a basic Toaster using the hook
function TestToaster() {
    const { toasts, dismiss } = useToast();
    return (
        <div>
            {toasts.map((toast) => (
                <ToastPrimitive key={toast.id} toast={toast} onDismiss={dismiss} />
            ))}
        </div>
    );
}

describe('Toast System', () => {
    beforeEach(() => {
        toastStore._reset();
    });

    describe('toastStore', () => {
        it('adds toasts', () => {
            toastStore.addToast({ title: 'Hello' });
            expect(toastStore.getToasts()).toHaveLength(1);
        });

        it('dismisses a toast', () => {
            const id = toastStore.addToast({ title: 'Hello' });
            toastStore.dismissToast(id);
            expect(toastStore.getToasts()).toHaveLength(0);
        });

        it('dismisses all toasts', () => {
            toastStore.addToast({ title: 'One' });
            toastStore.addToast({ title: 'Two' });
            toastStore.dismissAll();
            expect(toastStore.getToasts()).toHaveLength(0);
        });

        it('calls onDismiss callback', () => {
            const onDismiss = vi.fn();
            const id = toastStore.addToast({ title: 'Hello', onDismiss });
            toastStore.dismissToast(id);
            expect(onDismiss).toHaveBeenCalledTimes(1);
        });

        it('notifies subscribers', () => {
            const listener = vi.fn();
            toastStore.subscribe(listener);
            toastStore.addToast({ title: 'Hello' });
            expect(listener).toHaveBeenCalled();
        });

        it('auto-dismisses after duration', async () => {
            vi.useFakeTimers();
            toastStore.addToast({ title: 'Hello', duration: 100 });
            expect(toastStore.getToasts()).toHaveLength(1);
            vi.advanceTimersByTime(200);
            expect(toastStore.getToasts()).toHaveLength(0);
            vi.useRealTimers();
        });

        it('updates a toast', () => {
            const id = toastStore.addToast({ title: 'Hello' });
            toastStore.updateToast(id, { title: 'Updated' });
            expect(toastStore.getToasts()[0]?.title).toBe('Updated');
        });
    });

    describe('ToastPrimitive', () => {
        it('renders toast content', () => {
            render(
                <ToastPrimitive
                    toast={{ id: '1', title: 'Success', description: 'Operation complete' }}
                    onDismiss={() => { /* noop */ }}
                />,
            );
            expect(screen.getByText('Success')).toBeInTheDocument();
            expect(screen.getByText('Operation complete')).toBeInTheDocument();
        });

        it('calls onDismiss when close is clicked', async () => {
            const onDismiss = vi.fn();
            const user = userEvent.setup();
            render(
                <ToastPrimitive
                    toast={{ id: '1', title: 'Hello' }}
                    onDismiss={onDismiss}
                />,
            );
            await user.click(screen.getByRole('button', { name: 'Close notification' }));
            expect(onDismiss).toHaveBeenCalledWith('1');
        });

        it('has role="status" and aria-live', () => {
            render(
                <ToastPrimitive
                    toast={{ id: '1', title: 'Hello' }}
                    onDismiss={() => { /* noop */ }}
                />,
            );
            const el = screen.getByRole('status');
            expect(el).toHaveAttribute('aria-live', 'polite');
            expect(el).toHaveAttribute('aria-atomic', 'true');
        });
    });

    describe('useToast + Toaster integration', () => {
        it('renders toasts from useToast', () => {
            render(<TestToaster />);
            act(() => {
                toastStore.addToast({ title: 'Test toast', duration: 0 });
            });
            expect(screen.getByText('Test toast')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <ToastPrimitive
                    toast={{ id: '1', title: 'Hello', description: 'World' }}
                    onDismiss={() => { /* noop */ }}
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
