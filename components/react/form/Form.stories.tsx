import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Form } from './Form';

const meta: Meta<typeof Form> = {
    title: 'Components/Data Input/Form',
    component: Form,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const SimpleForm: Story = {
    render: () => (
        <Form onSubmit={() => alert('Submitted!')} style={{ maxWidth: 400 }}>
            <Form.Field name="name" required>
                <Form.Label>Name</Form.Label>
                <input type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="John Doe" />
            </Form.Field>
            <Form.Field name="email" required>
                <Form.Label>Email</Form.Label>
                <input type="email" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="john@example.com" />
            </Form.Field>
            <Form.Actions>
                <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Submit</button>
            </Form.Actions>
        </Form>
    ),
};

export const WithValidation: Story = {
    render: () => {
        const [errors, setErrors] = useState<Record<string, string>>({});
        const handleSubmit = () => {
            setErrors({ email: 'Email is required', password: 'Password must be at least 8 characters' });
        };
        return (
            <Form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                <Form.Field name="email" required hasError={!!errors.email}>
                    <Form.Label>Email</Form.Label>
                    <input type="email" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                    {errors.email && <Form.Error>{errors.email}</Form.Error>}
                </Form.Field>
                <Form.Field name="password" required hasError={!!errors.password}>
                    <Form.Label>Password</Form.Label>
                    <input type="password" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                    {errors.password && <Form.Error>{errors.password}</Form.Error>}
                </Form.Field>
                <Form.Actions>
                    <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Submit</button>
                </Form.Actions>
            </Form>
        );
    },
};

export const WithSections: Story = {
    render: () => (
        <Form onSubmit={() => { /* noop */ }} style={{ maxWidth: 500 }}>
            <Form.Section title="Personal Information" description="Your basic contact details.">
                <Form.Field name="firstName" required>
                    <Form.Label>First Name</Form.Label>
                    <input type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </Form.Field>
                <Form.Field name="lastName" required>
                    <Form.Label>Last Name</Form.Label>
                    <input type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </Form.Field>
            </Form.Section>
            <Form.Section title="Account Details">
                <Form.Field name="username" required>
                    <Form.Label>Username</Form.Label>
                    <input type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                    <Form.Description>This will be your public display name.</Form.Description>
                </Form.Field>
            </Form.Section>
            <Form.Actions>
                <button type="button" className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium">Cancel</button>
                <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Create Account</button>
            </Form.Actions>
        </Form>
    ),
};

export const HorizontalLayout: Story = {
    render: () => (
        <Form layout="horizontal" onSubmit={() => { /* noop */ }} style={{ maxWidth: 500 }}>
            <Form.Field name="name" layout="horizontal">
                <Form.Label>Name</Form.Label>
                <input type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </Form.Field>
            <Form.Field name="email" layout="horizontal">
                <Form.Label>Email</Form.Label>
                <input type="email" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </Form.Field>
            <Form.Actions align="right">
                <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Save</button>
            </Form.Actions>
        </Form>
    ),
};
