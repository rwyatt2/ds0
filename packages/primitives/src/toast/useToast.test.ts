import { describe, it, expect, beforeEach, vi } from 'vitest';
import { toastStore } from '../../src/toast/toastStore';

describe('toastStore', () => {
    beforeEach(() => {
        toastStore._reset();
    });

    it('starts with an empty toasts array', () => {
        expect(toastStore.getToasts()).toEqual([]);
    });

    it('adds a toast and returns an id', () => {
        const id = toastStore.addToast({ title: 'Hello' });

        expect(typeof id).toBe('string');
        expect(toastStore.getToasts()).toHaveLength(1);
        expect(toastStore.getToasts()[0]?.title).toBe('Hello');
    });

    it('sets default duration to 5000ms', () => {
        toastStore.addToast({ title: 'Timed' });

        expect(toastStore.getToasts()[0]?.duration).toBe(5000);
    });

    it('respects custom duration', () => {
        toastStore.addToast({ title: 'Quick', duration: 1000 });

        expect(toastStore.getToasts()[0]?.duration).toBe(1000);
    });

    it('dismisses a toast by id', () => {
        const id = toastStore.addToast({ title: 'Dismissable' });
        expect(toastStore.getToasts()).toHaveLength(1);

        toastStore.dismissToast(id);
        expect(toastStore.getToasts()).toHaveLength(0);
    });

    it('calls onDismiss callback when dismissed', () => {
        const onDismiss = vi.fn();
        const id = toastStore.addToast({ title: 'Callback', onDismiss });

        toastStore.dismissToast(id);
        expect(onDismiss).toHaveBeenCalledOnce();
    });

    it('dismisses all toasts', () => {
        toastStore.addToast({ title: 'One' });
        toastStore.addToast({ title: 'Two' });
        toastStore.addToast({ title: 'Three' });
        expect(toastStore.getToasts()).toHaveLength(3);

        toastStore.dismissAll();
        expect(toastStore.getToasts()).toHaveLength(0);
    });

    it('updates an existing toast', () => {
        const id = toastStore.addToast({ title: 'Original' });

        toastStore.updateToast(id, { title: 'Updated' });
        expect(toastStore.getToasts()[0]?.title).toBe('Updated');
    });

    it('notifies subscribers on add', () => {
        const listener = vi.fn();
        toastStore.subscribe(listener);

        toastStore.addToast({ title: 'Notify' });
        expect(listener).toHaveBeenCalledOnce();
    });

    it('notifies subscribers on dismiss', () => {
        const listener = vi.fn();
        const id = toastStore.addToast({ title: 'Notify' });

        toastStore.subscribe(listener);
        toastStore.dismissToast(id);

        expect(listener).toHaveBeenCalledOnce();
    });

    it('unsubscribes correctly', () => {
        const listener = vi.fn();
        const unsubscribe = toastStore.subscribe(listener);

        unsubscribe();
        toastStore.addToast({ title: 'No notify' });

        expect(listener).not.toHaveBeenCalled();
    });

    it('prepends new toasts (most recent first)', () => {
        toastStore.addToast({ title: 'First' });
        toastStore.addToast({ title: 'Second' });

        expect(toastStore.getToasts()[0]?.title).toBe('Second');
        expect(toastStore.getToasts()[1]?.title).toBe('First');
    });
});
