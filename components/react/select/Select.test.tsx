import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Select } from './index';

expect.extend(toHaveNoViolations);

describe('Select (Styled)', () => {
    it('opens and selects', async () => {
        const user = userEvent.setup();
        render(
            <Select placeholder="Choose">
                <Select.Trigger className="w-[200px]" />
                <Select.Content>
                    <Select.Item value="apple">Apple</Select.Item>
                    <Select.Item value="banana">Banana</Select.Item>
                </Select.Content>
            </Select>,
        );
        await user.click(screen.getByRole('combobox'));
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        await user.click(screen.getByText('Apple'));
        await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    });

    it('has no axe violations', async () => {
        const { container } = render(
            <Select placeholder="Choose">
                <Select.Trigger aria-label="Choose option" />
                <Select.Content><Select.Item value="a">A</Select.Item></Select.Content>
            </Select>,
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
