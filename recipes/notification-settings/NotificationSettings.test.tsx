import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { NotificationSettings } from './NotificationSettings';

expect.extend(toHaveNoViolations);

const mockSettings = [
    { id: '1', category: 'Email', label: 'Marketing emails', description: 'Receive marketing updates', enabled: true },
    { id: '2', category: 'Email', label: 'Product updates', description: 'New features and releases', enabled: false },
    { id: '3', category: 'Push', label: 'Messages', description: 'Notify on new messages', enabled: true },
];

describe('NotificationSettings', () => {
    describe('rendering', () => {
        it('renders heading', () => {
            render(<NotificationSettings settings={mockSettings} onSettingChange={vi.fn()} />);
            expect(screen.getByText('Notifications')).toBeInTheDocument();
        });

        it('renders all settings grouped by category', () => {
            render(<NotificationSettings settings={mockSettings} onSettingChange={vi.fn()} />);
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Push')).toBeInTheDocument();
            expect(screen.getByText('Marketing emails')).toBeInTheDocument();
            expect(screen.getByText('Messages')).toBeInTheDocument();
        });

        it('renders save button when onSave provided', () => {
            render(<NotificationSettings settings={mockSettings} onSettingChange={vi.fn()} onSave={vi.fn()} />);
            expect(screen.getByRole('button', { name: /save preferences/i })).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('calls onSettingChange when a switch is toggled', async () => {
            const user = userEvent.setup();
            const onSettingChange = vi.fn();
            render(<NotificationSettings settings={mockSettings} onSettingChange={onSettingChange} />);

            const switches = screen.getAllByRole('switch');
            await user.click(switches[0]!);
            expect(onSettingChange).toHaveBeenCalled();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <NotificationSettings settings={mockSettings} onSettingChange={vi.fn()} onSave={vi.fn()} />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
