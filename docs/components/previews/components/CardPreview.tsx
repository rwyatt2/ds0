'use client';

import { Card } from '../../../../components/react/card';
import { Button } from '../../../../components/react/button';
import { Stack } from '../../../../components/react/stack';

export function CardPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
                <Card.Header>
                    <Card.Title>Default</Card.Title>
                    <Card.Description>Card description text.</Card.Description>
                </Card.Header>
                <Card.Content>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Main content area.</p>
                </Card.Content>
                <Card.Footer>
                    <Button size="sm">Action</Button>
                </Card.Footer>
            </Card>

            <Card variant="outline">
                <Card.Header>
                    <Card.Title>Outline</Card.Title>
                    <Card.Description>Card description text.</Card.Description>
                </Card.Header>
                <Card.Content>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Main content area.</p>
                </Card.Content>
                <Card.Footer>
                    <Button size="sm" variant="outline">Action</Button>
                </Card.Footer>
            </Card>

            <Card variant="elevated">
                <Card.Header>
                    <Card.Title>Elevated</Card.Title>
                    <Card.Description>Card description text.</Card.Description>
                </Card.Header>
                <Card.Content>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Main content area.</p>
                </Card.Content>
                <Card.Footer>
                    <Button size="sm" variant="ghost">Action</Button>
                </Card.Footer>
            </Card>
        </div>
    );
}
