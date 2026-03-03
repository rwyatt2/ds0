import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ProfileSettings } from './ProfileSettings';

expect.extend(toHaveNoViolations);

const defaultValues = { name: 'John Doe', email: 'john@example.com', bio: 'Hello world' };

describe('ProfileSettings', () => {
    describe('rendering', () => {
        it('renders profile heading', () => {
            render(<ProfileSettings initialValues={defaultValues} onSubmit={vi.fn()} />);
            expect(screen.getByText('Profile')).toBeInTheDocument();
        });

        it('renders pre-filled fields', () => {
            render(<ProfileSettings initialValues={defaultValues} onSubmit={vi.fn()} />);
            expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
            expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
        });

        it('renders save button', () => {
            render(<ProfileSettings initialValues={defaultValues} onSubmit={vi.fn()} />);
            expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
        });

        it('renders cancel button when onCancel provided', () => {
            render(<ProfileSettings initialValues={defaultValues} onSubmit={vi.fn()} onCancel={vi.fn()} />);
            expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
        });

        it('renders change avatar button when onAvatarChange provided', () => {
            render(<ProfileSettings initialValues={defaultValues} onSubmit={vi.fn()} onAvatarChange={vi.fn()} />);
            expect(screen.getByRole('button', { name: /change avatar/i })).toBeInTheDocument();
        });

        it('renders error message', () => {
            render(<ProfileSettings initialValues={defaultValues} onSubmit={vi.fn()} error="Save failed" />);
            expect(screen.getByText('Save failed')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('calls onSubmit with updated values', async () => {
            const user = userEvent.setup();
            const onSubmit = vi.fn();
            render(<ProfileSettings initialValues={defaultValues} onSubmit={onSubmit} />);

            const nameInput = screen.getByDisplayValue('John Doe');
            await user.clear(nameInput);
            await user.type(nameInput, 'Jane Doe');
            await user.click(screen.getByRole('button', { name: /save changes/i }));

            expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Jane Doe' }));
        });

        it('calls onCancel when cancel button clicked', async () => {
            const user = userEvent.setup();
            const onCancel = vi.fn();
            render(<ProfileSettings initialValues={defaultValues} onSubmit={vi.fn()} onCancel={onCancel} />);
            await user.click(screen.getByRole('button', { name: /cancel/i }));
            expect(onCancel).toHaveBeenCalledOnce();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <ProfileSettings initialValues={defaultValues} onSubmit={vi.fn()} onCancel={vi.fn()} onAvatarChange={vi.fn()} />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
