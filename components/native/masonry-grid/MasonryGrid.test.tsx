import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { MasonryGrid } from './MasonryGrid';
import { Text } from 'react-native';
describe('MasonryGrid (Native)', () => { it('renders', () => { render(<MasonryGrid><Text>A</Text></MasonryGrid>); expect(screen.getByText('A')).toBeTruthy(); }); });
