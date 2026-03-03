import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { RadioGroup } from './index';

expect.extend(toHaveNoViolations);

describe('RadioGroup (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(
                <RadioGroup label="Test">
                    <RadioGroup.Item value="a" label="A" />
                    <RadioGroup.Item value="b" label="B" />
                </RadioGroup>,
            );
            expect(screen.getByRole('radiogroup')).toBeInTheDocument();
            expect(screen.getAllByRole('radio')).toHaveLength(2);
        });

        it('renders descriptions', () => {
            render(
                <RadioGroup label="Test">
                    <RadioGroup.Item value="a" label="A" description="Desc A" />
                </RadioGroup>,
            );
            expect(screen.getByText('Desc A')).toBeInTheDocument();
        });

        it('renders error message when invalid', () => {
            render(
                <RadioGroup label="Test" isInvalid errorMessage="Required">
                    <RadioGroup.Item value="a" label="A" />
                </RadioGroup>,
            );
            expect(screen.getByText('Required')).toBeInTheDocument();
        });

        it('renders required indicator', () => {
            render(
                <RadioGroup label="Test" isRequired>
                    <RadioGroup.Item value="a" label="A" />
                </RadioGroup>,
            );
            expect(screen.getByText('*')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('selects on click', async () => {
            const onValueChange = vi.fn();
            const user = userEvent.setup();
            render(
                <RadioGroup label="Test" onValueChange={onValueChange}>
                    <RadioGroup.Item value="a" label="A" />
                    <RadioGroup.Item value="b" label="B" />
                </RadioGroup>,
            );
            await user.click(screen.getByText('A'));
            expect(onValueChange).toHaveBeenCalledWith('a');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <RadioGroup label="Test" defaultValue="a">
                    <RadioGroup.Item value="a" label="A" />
                    <RadioGroup.Item value="b" label="B" />
                </RadioGroup>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
