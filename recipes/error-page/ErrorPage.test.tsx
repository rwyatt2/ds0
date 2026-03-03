import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { ErrorPage } from './ErrorPage';

expect.extend(toHaveNoViolations);

describe('ErrorPage', () => {
    describe('rendering', () => {
        it('renders with default title', () => {
            render(<ErrorPage />);
            expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        });

        it('renders error code when provided', () => {
            render(<ErrorPage code={404} />);
            expect(screen.getByText('404')).toBeInTheDocument();
        });

        it('renders custom title', () => {
            render(<ErrorPage title="Page not found" />);
            expect(screen.getByText('Page not found')).toBeInTheDocument();
        });

        it('renders description when provided', () => {
            render(
                <ErrorPage description="The page does not exist." />,
            );
            expect(screen.getByText('The page does not exist.')).toBeInTheDocument();
        });

        it('renders retry button when onRetry provided', () => {
            render(<ErrorPage onRetry={vi.fn()} />);
            expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
        });

        it('renders go home button when onGoHome provided', () => {
            render(<ErrorPage onGoHome={vi.fn()} />);
            expect(screen.getByRole('button', { name: 'Go home' })).toBeInTheDocument();
        });

        it('renders both action buttons', () => {
            render(<ErrorPage onRetry={vi.fn()} onGoHome={vi.fn()} />);
            expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Go home' })).toBeInTheDocument();
        });

        it('does not render action buttons when no handlers provided', () => {
            render(<ErrorPage />);
            expect(screen.queryByRole('button')).not.toBeInTheDocument();
        });

        it('merges custom className', () => {
            const { container } = render(<ErrorPage className="custom-class" />);
            expect(container.firstChild).toHaveClass('custom-class');
        });
    });

    describe('interactions', () => {
        it('calls onRetry when retry button clicked', async () => {
            const user = userEvent.setup();
            const onRetry = vi.fn();
            render(<ErrorPage onRetry={onRetry} />);
            await user.click(screen.getByRole('button', { name: 'Try again' }));
            expect(onRetry).toHaveBeenCalledOnce();
        });

        it('calls onGoHome when go home button clicked', async () => {
            const user = userEvent.setup();
            const onGoHome = vi.fn();
            render(<ErrorPage onGoHome={onGoHome} />);
            await user.click(screen.getByRole('button', { name: 'Go home' }));
            expect(onGoHome).toHaveBeenCalledOnce();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations for 404 page', async () => {
            const { container } = render(
                <ErrorPage
                    code={404}
                    title="Page not found"
                    description="The page you are looking for does not exist."
                    onGoHome={vi.fn()}
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations for 500 page', async () => {
            const { container } = render(
                <ErrorPage
                    code={500}
                    title="Server error"
                    description="An unexpected error occurred."
                    onRetry={vi.fn()}
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
