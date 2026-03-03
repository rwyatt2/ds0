import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Breadcrumb } from './Breadcrumb';

expect.extend(toHaveNoViolations);

describe('Breadcrumb (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(
                <Breadcrumb>
                    <Breadcrumb.List>
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <Breadcrumb.Page>Current</Breadcrumb.Page>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb>,
            );
            expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
        });

        it('merges custom className on list', () => {
            render(
                <Breadcrumb>
                    <Breadcrumb.List className="custom-class">
                        <Breadcrumb.Item>
                            <Breadcrumb.Page>Page</Breadcrumb.Page>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb>,
            );
            expect(screen.getByRole('list')).toHaveClass('custom-class');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Breadcrumb>
                    <Breadcrumb.List>
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <Breadcrumb.Page>Current</Breadcrumb.Page>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
