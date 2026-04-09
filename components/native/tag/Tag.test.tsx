import { render, screen } from '@testing-library/react-native';
import { Tag } from './Tag';

describe('Tag (Native)', () => {
    it('renders text', () => { render(<Tag>React</Tag>); expect(screen.getByText('React')).toBeTruthy(); });
    it('renders remove button when removable', () => { render(<Tag isRemovable onRemove={() => {}}>Tag</Tag>); expect(screen.getByRole('button')).toBeTruthy(); });
});
