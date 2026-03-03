import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Switch } from './Switch';

expect.extend(toHaveNoViolations);

describe('Switch (Styled)', () => {
    it('renders with role="switch"', () => {
        render(<Switch label="Test" />);
        expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('renders label', () => {
        render(<Switch label="Dark Mode" />);
        expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    });

    it('has no axe violations', async () => {
        const { container } = render(<Switch label="Notifications" />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
