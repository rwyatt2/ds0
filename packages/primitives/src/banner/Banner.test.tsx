import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { BannerPrimitive } from './Banner';

expect.extend(toHaveNoViolations);

describe('BannerPrimitive', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<BannerPrimitive>Test message</BannerPrimitive>);
            expect(screen.getByRole('banner')).toBeInTheDocument();
        });

        it('renders children', () => {
            render(<BannerPrimitive>Test message</BannerPrimitive>);
            expect(screen.getByText('Test message')).toBeInTheDocument();
        });

        it('renders dismiss button when dismissible', () => {
            render(<BannerPrimitive isDismissible>Test</BannerPrimitive>);
            expect(screen.getByLabelText('Dismiss banner')).toBeInTheDocument();
        });

        it('does not render dismiss button when not dismissible', () => {
            render(<BannerPrimitive>Test</BannerPrimitive>);
            expect(screen.queryByLabelText('Dismiss banner')).not.toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('dismisses on button click', async () => {
            const onDismiss = vi.fn();
            const user = userEvent.setup();
            render(<BannerPrimitive isDismissible onDismiss={onDismiss}>Test</BannerPrimitive>);
            await user.click(screen.getByLabelText('Dismiss banner'));
            expect(onDismiss).toHaveBeenCalledTimes(1);
            expect(screen.queryByText('Test')).not.toBeInTheDocument();
        });
    });

    describe('keyboard', () => {
        it('dismisses on Escape when dismissible', async () => {
            const onDismiss = vi.fn();
            const user = userEvent.setup();
            render(<BannerPrimitive isDismissible onDismiss={onDismiss}>Test</BannerPrimitive>);
            const banner = screen.getByRole('banner');
            banner.focus();
            await user.keyboard('{Escape}');
            expect(onDismiss).toHaveBeenCalledTimes(1);
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<BannerPrimitive>Test message</BannerPrimitive>);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('uses role="banner" for info variant', () => {
            render(<BannerPrimitive variant="info">Test</BannerPrimitive>);
            expect(screen.getByRole('banner')).toBeInTheDocument();
        });

        it('uses role="alert" for error variant', () => {
            render(<BannerPrimitive variant="error">Test</BannerPrimitive>);
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        it('uses role="alert" for warning variant', () => {
            render(<BannerPrimitive variant="warning">Test</BannerPrimitive>);
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to DOM element', () => {
            const ref = vi.fn();
            render(<BannerPrimitive ref={ref}>Test</BannerPrimitive>);
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
