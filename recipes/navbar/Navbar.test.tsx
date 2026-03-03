import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Navbar } from './Navbar';

expect.extend(toHaveNoViolations);

describe('Navbar', () => {
    describe('rendering', () => {
        it('renders logo', () => {
            render(<Navbar logo={<span>MyApp</span>} />);
            expect(screen.getByText('MyApp')).toBeInTheDocument();
        });

        it('renders navigation links', () => {
            render(<Navbar logo={<span>App</span>} links={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]} />);
            expect(screen.getByText('Home')).toBeInTheDocument();
            expect(screen.getByText('About')).toBeInTheDocument();
        });

        it('marks active link with aria-current', () => {
            render(<Navbar logo={<span>App</span>} links={[{ label: 'Home', href: '/', isActive: true }]} />);
            const homeLinks = screen.getAllByText('Home');
            const desktopLink = homeLinks.find(el => el.getAttribute('aria-current') === 'page');
            expect(desktopLink).toBeTruthy();
        });

        it('renders main navigation landmark', () => {
            render(<Navbar logo={<span>App</span>} links={[{ label: 'Home', href: '/' }]} />);
            expect(screen.getByRole('navigation', { name: /main/i })).toBeInTheDocument();
        });

        it('renders mobile menu button', () => {
            render(<Navbar logo={<span>App</span>} />);
            expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Navbar
                    logo={<span>App</span>}
                    links={[{ label: 'Home', href: '/', isActive: true }]}
                />,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
