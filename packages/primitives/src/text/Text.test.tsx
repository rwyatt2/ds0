import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createRef } from 'react';

import { TextPrimitive } from './Text';

expect.extend(toHaveNoViolations);

describe('TextPrimitive', () => {
    describe('rendering', () => {
        it('renders as a <p> element by default', () => {
            render(<TextPrimitive>Content</TextPrimitive>);
            const element = screen.getByText('Content');
            expect(element.tagName).toBe('P');
        });

        it('renders children', () => {
            render(<TextPrimitive>Hello World</TextPrimitive>);
            expect(screen.getByText('Hello World')).toBeInTheDocument();
        });

        it('renders as span when as="span"', () => {
            render(<TextPrimitive as="span">Content</TextPrimitive>);
            expect(screen.getByText('Content').tagName).toBe('SPAN');
        });

        it('renders as div when as="div"', () => {
            render(<TextPrimitive as="div">Content</TextPrimitive>);
            expect(screen.getByText('Content').tagName).toBe('DIV');
        });

        it('renders as em when as="em"', () => {
            render(<TextPrimitive as="em">Content</TextPrimitive>);
            expect(screen.getByText('Content').tagName).toBe('EM');
        });

        it('renders as strong when as="strong"', () => {
            render(<TextPrimitive as="strong">Content</TextPrimitive>);
            expect(screen.getByText('Content').tagName).toBe('STRONG');
        });

        it('forwards ref', () => {
            const ref = createRef<HTMLElement>();
            render(<TextPrimitive ref={ref}>Content</TextPrimitive>);
            expect(ref.current).toBeInstanceOf(HTMLElement);
        });

        it('spreads additional props', () => {
            render(
                <TextPrimitive data-testid="custom" id="my-text">
                    Content
                </TextPrimitive>,
            );
            expect(screen.getByTestId('custom')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <TextPrimitive>Content</TextPrimitive>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
