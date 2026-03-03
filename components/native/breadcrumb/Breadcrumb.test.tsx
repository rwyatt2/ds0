import { render, screen } from '@testing-library/react-native';

import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb (Native)', () => {
    it('renders with default props', () => {
        render(<Breadcrumb><></></Breadcrumb>);
        expect(screen.getByRole('header')).toBeTruthy();
    });
});
