import { render, screen } from '@testing-library/react-native';
import { Carousel } from './Carousel';
import { Text } from 'react-native';
describe('Carousel (Native)', () => { it('renders', () => { render(<Carousel><Text>Slide 1</Text></Carousel>); expect(screen.getByText('Slide 1')).toBeTruthy(); }); });
