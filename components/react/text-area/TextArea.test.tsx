import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { TextArea } from './TextArea';

expect.extend(toHaveNoViolations);

describe('TextArea (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<TextArea label="Description" />);
            expect(screen.getByRole('textbox')).toBeInTheDocument();
            expect(screen.getByText('Description')).toBeInTheDocument();
        });

        it('applies size classes', () => {
            const { unmount } = render(
                <TextArea label="Bio" size="lg" />,
            );
            expect(screen.getByRole('textbox')).toHaveClass('text-base');
            unmount();
        });

        it('applies resize classes', () => {
            render(<TextArea label="Bio" resize="none" />);
            expect(screen.getByRole('textbox')).toHaveClass('resize-none');
        });

        it('merges custom className on wrapper', () => {
            const { container } = render(
                <TextArea label="Bio" className="custom-class" />,
            );
            expect(container.firstChild).toHaveClass('custom-class');
        });

        it('applies invalid state classes', () => {
            render(
                <TextArea label="Bio" isInvalid errorMessage="Required" />,
            );
            expect(screen.getByRole('textbox')).toHaveClass(
                'border-destructive',
            );
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<TextArea label="Description" />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no axe violations when invalid', async () => {
            const { container } = render(
                <TextArea
                    label="Bio"
                    isInvalid
                    errorMessage="Bio is required"
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
