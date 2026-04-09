import { render, screen } from '@testing-library/react-native';
import { Combobox } from './Combobox';
describe('Combobox (Native)', () => { it('renders input', () => { render(<Combobox items={['A']} placeholder="Search" />); expect(screen.getByRole('search')).toBeTruthy(); }); });
