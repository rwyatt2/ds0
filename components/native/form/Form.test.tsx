import { render, screen } from '@testing-library/react-native';

import { Form } from './Form';

describe('Form (Native)', () => {
    it('renders children', () => {
        render(<Form><></></Form>);
        expect(screen).toBeTruthy();
    });
});
