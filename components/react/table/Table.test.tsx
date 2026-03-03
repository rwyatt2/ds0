import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Table } from './Table';

expect.extend(toHaveNoViolations);

describe('Table (Styled)', () => {
    describe('rendering', () => {
        it('renders', () => {
            render(
                <Table>
                    <Table.Header><Table.Row><Table.Head>H</Table.Head></Table.Row></Table.Header>
                    <Table.Body><Table.Row><Table.Cell>C</Table.Cell></Table.Row></Table.Body>
                </Table>,
            );
            expect(screen.getByRole('table')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Table>
                    <Table.Header><Table.Row><Table.Head>H</Table.Head></Table.Row></Table.Header>
                    <Table.Body><Table.Row><Table.Cell>C</Table.Cell></Table.Row></Table.Body>
                </Table>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
