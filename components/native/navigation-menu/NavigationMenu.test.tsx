import { render, screen } from '@testing-library/react-native';
import { NavigationMenu, NavigationMenuLink } from './NavigationMenu';
describe('NavigationMenu (Native)', () => { it('renders', () => { render(<NavigationMenu><NavigationMenuLink>Home</NavigationMenuLink></NavigationMenu>); expect(screen.getByRole('link')).toBeTruthy(); }); });
