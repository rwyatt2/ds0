import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Card } from './Card';

expect.extend(toHaveNoViolations);

describe('Card (Styled)', () => {
    describe('rendering', () => {
        it('renders with default props', () => {
            render(<Card>Content</Card>);
            expect(screen.getByText('Content')).toBeInTheDocument();
        });

        it('renders all sub-components', () => {
            render(
                <Card>
                    <Card.Header>
                        <Card.Title>Title</Card.Title>
                        <Card.Description>Desc</Card.Description>
                    </Card.Header>
                    <Card.Content>Body</Card.Content>
                    <Card.Footer>Foot</Card.Footer>
                </Card>,
            );
            expect(screen.getByText('Title')).toBeInTheDocument();
            expect(screen.getByText('Desc')).toBeInTheDocument();
            expect(screen.getByText('Body')).toBeInTheDocument();
            expect(screen.getByText('Foot')).toBeInTheDocument();
        });

        it('merges custom className', () => {
            render(<Card className="custom-class">C</Card>);
            expect(document.querySelector('.custom-class')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Card>
                    <Card.Header><Card.Title>Title</Card.Title></Card.Header>
                    <Card.Content>Body</Card.Content>
                </Card>,
            );
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
