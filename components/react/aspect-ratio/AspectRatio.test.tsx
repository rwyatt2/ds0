import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AspectRatio } from './AspectRatio';

expect.extend(toHaveNoViolations);

describe('AspectRatio (Styled)', () => {
    it('renders children with overflow-hidden class', () => {
        const { container } = render(<AspectRatio ratio={16 / 9}><img src="/test.jpg" alt="Test" /></AspectRatio>);
        expect(container.firstChild).toHaveClass('overflow-hidden');
    });
    it('has no axe violations', async () => {
        const { container } = render(<AspectRatio ratio={16 / 9}><img src="/test.jpg" alt="Test" /></AspectRatio>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
