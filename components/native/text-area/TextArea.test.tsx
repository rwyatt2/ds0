import React from 'react';
import { render } from '@testing-library/react-native';
import { TextArea } from './TextArea';

describe('TextArea (Native)', () => {
    it('renders label', () => {
        const { getByText } = render(<TextArea label="Description" />);
        expect(getByText('Description')).toBeTruthy();
    });

    it('has accessibilityLabel', () => {
        const { getByLabelText } = render(<TextArea label="Notes" />);
        expect(getByLabelText('Notes')).toBeTruthy();
    });

    it('shows required indicator', () => {
        const { getByText } = render(<TextArea label="Bio" isRequired />);
        expect(getByText(' *')).toBeTruthy();
    });

    it('shows error message when invalid', () => {
        const { getByText } = render(<TextArea label="Bio" isInvalid errorMessage="Too short" />);
        expect(getByText('Too short')).toBeTruthy();
    });

    it('shows helper text', () => {
        const { getByText } = render(<TextArea label="Bio" helperText="Max 500 characters" />);
        expect(getByText('Max 500 characters')).toBeTruthy();
    });

    it('renders with custom rows', () => {
        const { root } = render(<TextArea label="Notes" rows={5} />);
        expect(root).toBeTruthy();
    });
});
