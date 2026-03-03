import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Slider } from './Slider';

expect.extend(toHaveNoViolations);

describe('Slider (Styled)', () => {
    it('renders with role="slider"', () => {
        render(<Slider label="Volume" />);
        expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('renders label', () => {
        render(<Slider label="Brightness" />);
        expect(screen.getByText('Brightness')).toBeInTheDocument();
    });

    it('has no axe violations', async () => {
        const { container } = render(<Slider label="Volume" />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
