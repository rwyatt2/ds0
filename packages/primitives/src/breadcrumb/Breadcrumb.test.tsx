import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import {
    BreadcrumbPrimitive,
    BreadcrumbListPrimitive,
    BreadcrumbItemPrimitive,
    BreadcrumbLinkPrimitive,
    BreadcrumbPagePrimitive,
    BreadcrumbSeparatorPrimitive,
} from './Breadcrumb';

expect.extend(toHaveNoViolations);

const renderBreadcrumb = () =>
    render(
        <BreadcrumbPrimitive>
            <BreadcrumbListPrimitive>
                <BreadcrumbItemPrimitive>
                    <BreadcrumbLinkPrimitive href="/">Home</BreadcrumbLinkPrimitive>
                </BreadcrumbItemPrimitive>
                <BreadcrumbSeparatorPrimitive />
                <BreadcrumbItemPrimitive>
                    <BreadcrumbLinkPrimitive href="/products">Products</BreadcrumbLinkPrimitive>
                </BreadcrumbItemPrimitive>
                <BreadcrumbSeparatorPrimitive />
                <BreadcrumbItemPrimitive>
                    <BreadcrumbPagePrimitive>Current Page</BreadcrumbPagePrimitive>
                </BreadcrumbItemPrimitive>
            </BreadcrumbListPrimitive>
        </BreadcrumbPrimitive>,
    );

describe('BreadcrumbPrimitive', () => {
    describe('rendering', () => {
        it('renders navigation landmark', () => {
            renderBreadcrumb();
            expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
        });

        it('renders ordered list', () => {
            renderBreadcrumb();
            expect(screen.getByRole('list')).toBeInTheDocument();
        });

        it('renders links', () => {
            renderBreadcrumb();
            expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument();
        });

        it('renders current page', () => {
            renderBreadcrumb();
            expect(screen.getByText('Current Page')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = renderBreadcrumb();
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has aria-label on navigation', () => {
            renderBreadcrumb();
            expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Breadcrumb');
        });

        it('has aria-current="page" on current page', () => {
            renderBreadcrumb();
            expect(screen.getByText('Current Page')).toHaveAttribute('aria-current', 'page');
        });

        it('separator has aria-hidden', () => {
            const { container } = renderBreadcrumb();
            const separators = container.querySelectorAll('[aria-hidden="true"]');
            expect(separators.length).toBeGreaterThan(0);
        });
    });

    describe('ref forwarding', () => {
        it('forwards ref to nav element', () => {
            const ref = vi.fn();
            render(
                <BreadcrumbPrimitive ref={ref}>
                    <BreadcrumbListPrimitive>
                        <BreadcrumbItemPrimitive>
                            <BreadcrumbPagePrimitive>Page</BreadcrumbPagePrimitive>
                        </BreadcrumbItemPrimitive>
                    </BreadcrumbListPrimitive>
                </BreadcrumbPrimitive>,
            );
            expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
        });
    });
});
