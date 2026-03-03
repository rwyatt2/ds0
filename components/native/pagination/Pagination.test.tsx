import { render, screen } from '@testing-library/react-native';

import { Pagination } from './Pagination';

describe('Pagination (Native)', () => {
    it('renders with default props', () => {
        render(<Pagination><></></Pagination>);
        expect(screen.getByRole('menu')).toBeTruthy();
    });
});
