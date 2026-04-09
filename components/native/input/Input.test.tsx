import { render, screen } from '@testing-library/react-native';

import { Input } from './Input';

describe('Input (Native)', () => {
    it('renders with default props', () => {
        render(<Input placeholder="Test" />);
        expect(screen.getByPlaceholderText('Test')).toBeTruthy();
    });

    it('handles disabled state', () => {
        render(<Input isDisabled placeholder="Disabled" />);
        const input = screen.getByPlaceholderText('Disabled');
        expect(input.props.editable).toBe(false);
    });

    it('handles read-only state', () => {
        render(<Input isReadOnly placeholder="ReadOnly" />);
        const input = screen.getByPlaceholderText('ReadOnly');
        expect(input.props.editable).toBe(false);
    });
});
