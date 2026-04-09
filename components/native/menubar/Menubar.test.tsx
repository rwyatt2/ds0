import { render, screen } from '@testing-library/react-native';
import { Menubar, MenubarTrigger } from './Menubar';
describe('Menubar (Native)', () => { it('renders', () => { render(<Menubar><MenubarTrigger>File</MenubarTrigger></Menubar>); expect(screen.getByRole('button')).toBeTruthy(); }); });
