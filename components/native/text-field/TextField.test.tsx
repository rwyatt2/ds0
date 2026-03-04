import React from 'react';
import { render } from '@testing-library/react-native';
import { TextField } from './TextField';

describe('TextField (Native)', () => {
    it('renders label', () => {
        const { getByText } = render(<TextField label="Email" />);
        expect(getByText('Email')).toBeTruthy();
    });

    it('has accessibilityLabel', () => {
        const { getByLabelText } = render(<TextField label="Username" />);
        expect(getByLabelText('Username')).toBeTruthy();
    });

    it('shows required indicator', () => {
        const { getByText } = render(<TextField label="Password" isRequired />);
        expect(getByText(' *')).toBeTruthy();
    });

    it('shows error message when invalid', () => {
        const { getByText } = render(<TextField label="Email" isInvalid errorMessage="Invalid email" />);
        expect(getByText('Invalid email')).toBeTruthy();
    });

    it('shows helper text', () => {
        const { getByText } = render(<TextField label="Email" helperText="We'll never share your email" />);
        expect(getByText("We'll never share your email")).toBeTruthy();
    });

    it('renders with different sizes', () => {
        const { root } = render(<TextField label="Name" size="lg" />);
        expect(root).toBeTruthy();
    });
});
